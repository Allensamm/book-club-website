"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import SpotlightHeader from "@/components/spotlight/spotlight-header"
import DiscussionSidebar, { type DiscussionSummary } from "@/components/spotlight/discussion-sidebar"
import BookUploader from "@/components/spotlight/book-uploader"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Plus, Sparkles, Users, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function SpotlightDashboardPage() {
  return (
    <Suspense>
      <SpotlightDashboard />
    </Suspense>
  )
}

function SpotlightDashboard() {
  const [discussions, setDiscussions] = useState<DiscussionSummary[]>([])
  const [user, setUser] = useState<{ id: string; email: string; display_name: string } | null>(null)
  const [showUploader, setShowUploader] = useState(false)
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const supabase = createClient()

  useEffect(() => {
    if (searchParams.get("upload") === "true") {
      setShowUploader(true)
    }
  }, [searchParams])

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

      // Fetch discussions with book info
      const { data: discussionData } = await supabase
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

      if (discussionData) {
        // Get message counts
        const summaries: DiscussionSummary[] = []
        for (const d of discussionData) {
          const { count } = await supabase
            .from("spotlight_messages")
            .select("*", { count: "exact", head: true })
            .eq("discussion_id", d.id)

          const book = d.spotlight_books as unknown as { title: string; author_name: string; cover_url?: string } | null
          summaries.push({
            id: d.id,
            book_id: d.book_id,
            book_title: book?.title || "Unknown",
            book_author: book?.author_name || "Unknown",
            book_cover_url: book?.cover_url,
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
  }, [supabase])

  return (
    <div className="h-screen flex flex-col bg-background">
      <SpotlightHeader
        userEmail={user?.email}
        displayName={user?.display_name}
      />

      <div className="flex flex-1 min-h-0">
        <DiscussionSidebar discussions={discussions} />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6 space-y-8">
            {/* Hero */}
            <div className="text-center space-y-4 py-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Welcome to Spotlight</h1>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Upload a book and watch as 500 AI readers engage in a lively literary discussion.
                Join the conversation yourself!
              </p>
              <Button onClick={() => setShowUploader(true)} size="lg">
                <Plus className="w-5 h-5 mr-2" />
                Upload a Book
              </Button>
            </div>

            {/* Active Discussions */}
            {discussions.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">Active Discussions</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {discussions.map((d) => (
                    <Link key={d.id} href={`/spotlight/${d.book_id}`}>
                      <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex gap-3">
                            <div className="w-12 h-16 rounded bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
                              <BookOpen className="w-5 h-5 text-primary/40" />
                            </div>
                            <div className="min-w-0">
                              <h3 className="font-semibold text-sm truncate">{d.book_title}</h3>
                              <p className="text-xs text-muted-foreground">by {d.book_author}</p>
                              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <MessageSquare className="w-3 h-3" />
                                  {d.message_count} messages
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  Active
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Empty state */}
            {!loading && discussions.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground/30" />
                <p>No discussions yet. Upload a book to get started!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {user && (
        <BookUploader
          open={showUploader}
          onClose={() => setShowUploader(false)}
          userId={user.id}
        />
      )}
    </div>
  )
}
