"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"

interface MessageInputProps {
  onSend: (content: string) => Promise<void>
  disabled?: boolean
}

export default function MessageInput({ onSend, disabled }: MessageInputProps) {
  const [content, setContent] = useState("")
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || sending) return

    setSending(true)
    try {
      await onSend(content.trim())
      setContent("")
    } finally {
      setSending(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border-t border-border p-4 bg-background">
      <div className="flex gap-2 items-end">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Join the discussion... (Enter to send, Shift+Enter for new line)"
          className="min-h-[44px] max-h-32 resize-none"
          disabled={disabled || sending}
          rows={1}
        />
        <Button
          type="submit"
          size="icon"
          disabled={!content.trim() || sending || disabled}
          className="shrink-0"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </form>
  )
}
