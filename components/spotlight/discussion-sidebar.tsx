"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { BookOpen, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

export interface DiscussionSummary {
  id: string
  book_id: string
  book_title: string
  book_author: string
  book_cover_url?: string | null
  message_count: number
  is_active: boolean
  created_at: string
}

interface DiscussionSidebarProps {
  discussions: DiscussionSummary[]
}

export default function DiscussionSidebar({ discussions }: DiscussionSidebarProps) {
  const pathname = usePathname()

  return (
    <div className="w-64 border-r border-border bg-background/50 flex flex-col shrink-0 hidden md:flex">
      <div className="p-3 border-b border-border">
        <h2 className="font-semibold text-sm text-foreground flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          Discussions
        </h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {discussions.length === 0 && (
            <div className="p-4 text-center text-sm text-muted-foreground">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-muted-foreground/40" />
              <p>No discussions yet.</p>
              <p className="text-xs mt-1">Upload a book to start one!</p>
            </div>
          )}
          {discussions.map((d) => {
            const isActive = pathname === `/spotlight/${d.book_id}`
            return (
              <Link
                key={d.id}
                href={`/spotlight/${d.book_id}`}
                className={cn(
                  "block p-3 rounded-lg transition-colors",
                  isActive
                    ? "bg-primary/10 text-foreground"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                <p className="text-sm font-medium truncate">{d.book_title}</p>
                <p className="text-xs truncate mt-0.5">by {d.book_author}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                    {d.is_active ? "Active" : "Ended"}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                    <MessageSquare className="w-3 h-3" />
                    {d.message_count}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
