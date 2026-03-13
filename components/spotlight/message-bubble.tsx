"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface Message {
  id: string
  discussion_id: string
  sender_type: "bot" | "user"
  sender_id: string
  sender_name: string
  sender_avatar?: string | null
  content: string
  reply_to?: string | null
  created_at: string
}

interface MessageBubbleProps {
  message: Message
  replyMessage?: Message | null
  isCurrentUser?: boolean
}

export default function MessageBubble({ message, replyMessage, isCurrentUser }: MessageBubbleProps) {
  const avatarUrl = message.sender_type === "bot"
    ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${message.sender_avatar || message.sender_name}`
    : undefined

  const initials = message.sender_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const timeStr = new Date(message.created_at).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className={cn("flex gap-3 px-4 py-2 hover:bg-muted/30 transition-colors group", isCurrentUser && "bg-primary/5")}>
      <Avatar className="w-9 h-9 shrink-0 mt-0.5">
        {avatarUrl && <AvatarImage src={avatarUrl} alt={message.sender_name} />}
        <AvatarFallback className="text-xs">{initials}</AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-foreground">{message.sender_name}</span>
          {message.sender_type === "user" && (
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
              Human
            </Badge>
          )}
          {message.sender_type === "bot" && (
            <span className="text-[10px] text-muted-foreground/60">bot</span>
          )}
          <span className="text-xs text-muted-foreground">{timeStr}</span>
        </div>

        {replyMessage && (
          <div className="mt-1 mb-1 pl-3 border-l-2 border-muted-foreground/30 text-xs text-muted-foreground">
            <span className="font-medium">{replyMessage.sender_name}:</span>{" "}
            {replyMessage.content.slice(0, 80)}
            {replyMessage.content.length > 80 && "..."}
          </div>
        )}

        <p className="text-sm text-foreground/90 leading-relaxed break-words">{message.content}</p>
      </div>
    </div>
  )
}
