"use client"

import { useEffect, useRef, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import MessageBubble, { type Message } from "./message-bubble"
import MessageInput from "./message-input"
import BookInfoPanel from "./book-info-panel"
import { useRealtimeMessages } from "@/hooks/use-realtime-messages"

interface BookData {
  id: string
  title: string
  author_name: string
  cover_url?: string | null
  analysis: Record<string, unknown>
  status: string
}

interface Participant {
  bot_id: string
  bot_name: string
  avatar_seed: string
  message_count: number
}

interface DiscussionRoomProps {
  discussionId: string
  book: BookData
  participants: Participant[]
  userId: string
  userName: string
}

export default function DiscussionRoom({
  discussionId,
  book,
  participants,
  userId,
  userName,
}: DiscussionRoomProps) {
  const { messages, loading, addOptimisticMessage } = useRealtimeMessages(discussionId)
  const scrollRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Trigger bot tick periodically
  useEffect(() => {
    if (book.status !== "ready") return

    const tick = async () => {
      try {
        await fetch(`/api/spotlight/discussions/${discussionId}/tick`, {
          method: "POST",
        })
      } catch {
        // Silently fail - bot messages are supplementary
      }
    }

    // Initial tick after 3 seconds
    const initialTimeout = setTimeout(tick, 3000)
    // Then every 45 seconds
    const interval = setInterval(tick, 45000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [discussionId, book.status])

  const handleSendMessage = useCallback(async (content: string) => {
    const optimisticMessage: Message = {
      id: crypto.randomUUID(),
      discussion_id: discussionId,
      sender_type: "user",
      sender_id: userId,
      sender_name: userName,
      sender_avatar: null,
      content,
      reply_to: null,
      created_at: new Date().toISOString(),
    }

    addOptimisticMessage(optimisticMessage)

    await supabase.from("spotlight_messages").insert({
      discussion_id: discussionId,
      sender_type: "user",
      sender_id: userId,
      sender_name: userName,
      content,
    })

    // Trigger a tick to get bot responses to user message
    fetch(`/api/spotlight/discussions/${discussionId}/tick`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userPosted: true }),
    }).catch(() => {})
  }, [discussionId, userId, userName, supabase, addOptimisticMessage])

  // Build a message map for reply lookups
  const messageMap = new Map(messages.map((m) => [m.id, m]))

  return (
    <div className="flex flex-1 min-h-0">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Book Title Bar */}
        <div className="h-12 border-b border-border px-4 flex items-center gap-3 bg-background shrink-0">
          <h2 className="font-semibold text-sm text-foreground truncate">{book.title}</h2>
          <span className="text-xs text-muted-foreground">by {book.author_name}</span>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-4 space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="w-9 h-9 rounded-full shrink-0" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-full max-w-md" />
                  </div>
                </div>
              ))}
            </div>
          ) : messages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-8 text-center">
              <div>
                <p className="text-muted-foreground">The discussion is starting...</p>
                <p className="text-sm text-muted-foreground/60 mt-1">
                  AI readers are gathering their thoughts about this book.
                </p>
              </div>
            </div>
          ) : (
            <div className="py-2">
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  replyMessage={msg.reply_to ? messageMap.get(msg.reply_to) || null : null}
                  isCurrentUser={msg.sender_type === "user" && msg.sender_id === userId}
                />
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <MessageInput onSend={handleSendMessage} disabled={book.status !== "ready"} />
      </div>

      {/* Right Panel - Book Info */}
      <BookInfoPanel
        book={{
          ...book,
          analysis: book.analysis as { summary?: string; themes?: string[]; characters?: { name: string; description: string }[]; genre?: string; mood?: string },
        }}
        participants={participants}
        messageCount={messages.length}
      />
    </div>
  )
}
