"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import SpotlightHeader from "@/components/spotlight/spotlight-header"
import DiscussionSidebar, { type DiscussionSummary } from "@/components/spotlight/discussion-sidebar"
import DiscussionRoom from "@/components/spotlight/discussion-room"
import { Skeleton } from "@/components/ui/skeleton"

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

export default function DiscussionPage() {
  const params = useParams()
  const bookId = params["book-id"] as string
  const [book, setBook] = useState<BookData | null>(null)
  const [discussionId, setDiscussionId] = useState<string | null>(null)
  const [participants, setParticipants] = useState<Participant[]>([])
  const [discussions, setDiscussions] = useState<DiscussionSummary[]>([])
  const [user, setUser] = useState<{ id: string; email: string; display_name: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const init = async () => {
      // Get user
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (authUser) {
        setUser({
          id: authUser.id,
          email: authUser.email || "",
          display_name: authUser.user_metadata?.display_name || authUser.email?.split("@")[0] || "User",
        })
      }

      // Fetch book
      const { data: bookData } = await supabase
        .from("spotlight_books")
        .select("*")
        .eq("id", bookId)
        .single()

      if (bookData) {
        setBook(bookData)
      }

      // Fetch discussion for this book
      const { data: discussionData } = await supabase
        .from("spotlight_discussions")
        .select("id")
        .eq("book_id", bookId)
        .single()

      if (discussionData) {
        setDiscussionId(discussionData.id)

        // Fetch participants with bot info
        const { data: participantData } = await supabase
          .from("spotlight_participants")
          .select(`
            bot_id,
            message_count,
            spotlight_bots (
              name,
              avatar_seed
            )
          `)
          .eq("discussion_id", discussionData.id)

        if (participantData) {
          setParticipants(
            participantData.map((p) => {
              const bot = p.spotlight_bots as unknown as { name: string; avatar_seed: string } | null
              return {
                bot_id: p.bot_id,
                bot_name: bot?.name || "Unknown",
                avatar_seed: bot?.avatar_seed || "unknown",
                message_count: p.message_count,
              }
            })
          )
        }
      }

      // Fetch all discussions for sidebar
      const { data: allDiscussions } = await supabase
        .from("spotlight_discussions")
        .select(`
          id,
          book_id,
          is_active,
          created_at,
          spotlight_books (
            title,
            author_name,
            cover_url
          )
        `)
        .order("created_at", { ascending: false })

      if (allDiscussions) {
        const summaries: DiscussionSummary[] = []
        for (const d of allDiscussions) {
          const { count } = await supabase
            .from("spotlight_messages")
            .select("*", { count: "exact", head: true })
            .eq("discussion_id", d.id)

          const dbBook = d.spotlight_books as unknown as { title: string; author_name: string; cover_url?: string } | null
          summaries.push({
            id: d.id,
            book_id: d.book_id,
            book_title: dbBook?.title || "Unknown",
            book_author: dbBook?.author_name || "Unknown",
            book_cover_url: dbBook?.cover_url,
            message_count: count || 0,
            is_active: d.is_active,
            created_at: d.created_at,
          })
        }
        setDiscussions(summaries)
      }

      setLoading(false)
    }

    init()
  }, [bookId, supabase])

  if (loading) {
    return (
      <div className="h-screen flex flex-col bg-background">
        <div className="h-14 border-b border-border bg-background flex items-center px-4">
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="flex flex-1">
          <div className="w-64 border-r border-border p-4 space-y-3 hidden md:block">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg" />
            ))}
          </div>
          <div className="flex-1 p-4 space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="w-9 h-9 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-full max-w-sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <SpotlightHeader
        userEmail={user?.email}
        displayName={user?.display_name}
      />

      <div className="flex flex-1 min-h-0">
        <DiscussionSidebar discussions={discussions} />

        {book && discussionId && user ? (
          <DiscussionRoom
            discussionId={discussionId}
            book={book}
            participants={participants}
            userId={user.id}
            userName={user.display_name}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <p>Discussion not found or still being set up...</p>
          </div>
        )}
      </div>
    </div>
  )
}
