"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { Send } from "lucide-react"

interface Conversation {
  id: string
  visitor_name: string
  visitor_email: string
  created_at: string
}

interface Message {
  id: string
  content: string
  sender_type: "visitor" | "admin"
  created_at: string
}

export default function AdminChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchConversations()
  }, [])

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages()
      const channel = supabase
        .channel(`conversation:${selectedConversation.id}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `conversation_id=eq.${selectedConversation.id}`,
          },
          (payload) => {
            console.log("[v0] Admin received new message:", payload.new)
            setMessages((prev) => [...prev, payload.new as Message])
          },
        )
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    }
  }, [selectedConversation, supabase])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const fetchConversations = async () => {
    try {
      const { data, error } = await supabase.from("conversations").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setConversations(data || [])
    } catch (error) {
      console.error("[v0] Error fetching conversations:", error)
    }
  }

  const fetchMessages = async () => {
    if (!selectedConversation) return
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", selectedConversation.id)
        .order("created_at", { ascending: true })

      if (error) throw error
      setMessages(data || [])
    } catch (error) {
      console.error("[v0] Error fetching messages:", error)
    }
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || !selectedConversation) return

    setLoading(true)
    try {
      const { error } = await supabase.from("messages").insert([
        {
          conversation_id: selectedConversation.id,
          sender_type: "admin",
          sender_name: "Support Team",
          content: inputValue,
        },
      ])

      if (error) throw error
      setInputValue("")
      // Message will appear automatically via real-time subscription
    } catch (error) {
      console.error("[v0] Error sending message:", error)
    }
    setLoading(false)
  }

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Conversations List */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Chat Admin</h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConversation(conv)}
              className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                selectedConversation?.id === conv.id ? "bg-blue-50" : ""
              }`}
            >
              <p className="font-semibold text-gray-900">{conv.visitor_name}</p>
              <p className="text-sm text-gray-600">{conv.visitor_email}</p>
              <p className="text-xs text-gray-500 mt-1">{new Date(conv.created_at).toLocaleDateString()}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="bg-white border-b border-gray-200 p-4">
              <h2 className="text-xl font-bold text-gray-900">{selectedConversation.visitor_name}</h2>
              <p className="text-sm text-gray-600">{selectedConversation.visitor_email}</p>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender_type === "admin" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-lg px-4 py-3 rounded-lg ${
                      msg.sender_type === "admin"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-900 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-xs opacity-50 mt-1">{new Date(msg.created_at).toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={sendMessage} className="border-t border-gray-200 p-4 bg-white flex gap-3">
              <input
                type="text"
                placeholder="Type a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={loading || !inputValue.trim()}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors flex items-center gap-2"
              >
                <Send size={18} />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <p>Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  )
}
