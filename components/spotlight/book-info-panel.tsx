"use client"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Users, MessageSquare } from "lucide-react"

interface BookAnalysis {
  summary?: string
  themes?: string[]
  characters?: { name: string; description: string }[]
  genre?: string
  mood?: string
}

interface BookInfo {
  id: string
  title: string
  author_name: string
  cover_url?: string | null
  analysis: BookAnalysis
  status: string
}

interface Participant {
  bot_id: string
  bot_name: string
  avatar_seed: string
  message_count: number
}

interface BookInfoPanelProps {
  book: BookInfo | null
  participants: Participant[]
  messageCount: number
}

export default function BookInfoPanel({ book, participants, messageCount }: BookInfoPanelProps) {
  if (!book) return null

  return (
    <div className="w-72 border-l border-border bg-background hidden lg:flex flex-col shrink-0">
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* Book Cover */}
          {book.cover_url ? (
            <div className="aspect-[2/3] rounded-lg overflow-hidden bg-muted">
              <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="aspect-[2/3] rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-primary/40" />
            </div>
          )}

          {/* Book Details */}
          <div>
            <h3 className="font-bold text-foreground">{book.title}</h3>
            <p className="text-sm text-muted-foreground">by {book.author_name}</p>
          </div>

          {/* Stats */}
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {participants.length} readers
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5" />
              {messageCount}
            </span>
          </div>

          {/* Status */}
          <Badge variant={book.status === "ready" ? "default" : "secondary"}>
            {book.status === "ready" ? "Active Discussion" : book.status === "processing" ? "Processing..." : "Error"}
          </Badge>

          {/* Themes */}
          {book.analysis.themes && book.analysis.themes.length > 0 && (
            <>
              <Separator />
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Themes</h4>
                <div className="flex flex-wrap gap-1.5">
                  {book.analysis.themes.map((theme, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {theme}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Summary */}
          {book.analysis.summary && (
            <>
              <Separator />
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Summary</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{book.analysis.summary}</p>
              </div>
            </>
          )}

          {/* Active Readers */}
          <Separator />
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Active Readers ({participants.length})
            </h4>
            <div className="space-y-2">
              {participants.slice(0, 20).map((p) => (
                <div key={p.bot_id} className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${p.avatar_seed}`}
                      alt={p.bot_name}
                    />
                    <AvatarFallback className="text-[10px]">
                      {p.bot_name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-foreground truncate">{p.bot_name}</span>
                  {p.message_count > 0 && (
                    <span className="text-[10px] text-muted-foreground ml-auto">{p.message_count}</span>
                  )}
                </div>
              ))}
              {participants.length > 20 && (
                <p className="text-xs text-muted-foreground">+{participants.length - 20} more</p>
              )}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
