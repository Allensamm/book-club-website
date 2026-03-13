"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Message } from "@/components/spotlight/message-bubble"

export function useRealtimeMessages(discussionId: string | null) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const supabaseRef = useRef(typeof window !== "undefined" ? createClient() : null)

  // Fetch initial messages
  useEffect(() => {
    if (!discussionId || !supabaseRef.current) return

    const fetchMessages = async () => {
      setLoading(true)
      const { data, error } = await supabaseRef.current!
        .from("spotlight_messages")
        .select("*")
        .eq("discussion_id", discussionId)
        .order("created_at", { ascending: true })

      if (!error && data) {
        setMessages(data)
      }
      setLoading(false)
    }

    fetchMessages()
  }, [discussionId])

  // Subscribe to new messages
  useEffect(() => {
    if (!discussionId || !supabaseRef.current) return

    const channel = supabaseRef.current
      .channel(`spotlight:${discussionId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "spotlight_messages",
          filter: `discussion_id=eq.${discussionId}`,
        },
        (payload) => {
          setMessages((prev) => {
            // Prevent duplicates
            if (prev.some((m) => m.id === payload.new.id)) return prev
            return [...prev, payload.new as Message]
          })
        }
      )
      .subscribe()

    return () => {
      supabaseRef.current?.removeChannel(channel)
    }
  }, [discussionId])

  const addOptimisticMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message])
  }, [])

  return { messages, loading, addOptimisticMessage }
}
