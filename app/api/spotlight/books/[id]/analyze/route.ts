import { NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/service"
import { extractTextFromPdf, chunkText } from "@/lib/spotlight/pdf-parser"
import { analyzeBook } from "@/lib/spotlight/book-analyzer"

export async function POST(
      _request: Request,
    { params }: { params: Promise<{ id: string }> }
    ) {
      try {
              const supabase = createServiceClient()
              const { id: bookId } = await params

        console.log("[Spotlight] Analyzing book:", bookId)

        // Get book record
        const { data: book, error: bookError } = await supabase
                .from("spotlight_books")
                .select("*")
                .eq("id", bookId)
                .single()

        console.log("[Spotlight] Book query result:", { book: book?.id, bookError: bookError?.message })

        if (bookError || !book) {
                  return NextResponse.json({ error: "Book not found", details: bookError?.message }, { status: 404 })
        }

        // Download file from Supabase Storage
        const fileUrl = book.file_url
              console.log("[Spotlight] Downloading from:", fileUrl)
              const response = await fetch(fileUrl)

        if (!response.ok) {
                  throw new Error("Failed to download book file")
        }

        const arrayBuffer = await response.arrayBuffer()
              const buffer = Buffer.from(arrayBuffer)
              console.log("[Spotlight] File downloaded, size:", buffer.length)

        // Extract text
        let bookText: string
              if (book.file_type === "pdf") {
                        bookText = await extractTextFromPdf(buffer)
              } else {
                        // For EPUB, use the raw text for now
                bookText = buffer.toString("utf-8")
              }
              console.log("[Spotlight] Text extracted, length:", bookText.length)

        // Analyze with Claude
        const analysis = await analyzeBook(bookText, book.title)
              console.log("[Spotlight] Analysis complete")

        // Update book with analysis
        await supabase
                .from("spotlight_books")
                .update({
                            analysis,
                            status: "ready",
                })
                .eq("id", bookId)

        // Create discussion room
        const { data: discussion } = await supabase
                .from("spotlight_discussions")
                .insert({
                            book_id: bookId,
                            is_active: true,
                })
                .select("id")
                .single()

        if (discussion) {
                  // Assign 30-50 random bots as participants
                const botCount = Math.floor(Math.random() * 21) + 30

                            const { data: bots } = await supabase
                    .from("spotlight_bots")
                    .select("id")
                    .limit(500)

                if (bots && bots.length > 0) {
                            const shuffled = bots.sort(() => Math.random() - 0.5)
                            const selectedBots = shuffled.slice(0, Math.min(botCount, bots.length))

                    const participants = selectedBots.map((bot) => ({
                                  discussion_id: discussion.id,
                                  bot_id: bot.id,
                    }))

                    await supabase.from("spotlight_participants").insert(participants)
                }
        }

        return NextResponse.json({ success: true, analysis })
      } catch (error) {
              console.error("[Spotlight] Analysis error:", error)

        // Mark book as error
        try {
                  const supabase = createServiceClient()
                  const { id } = await params
                  await supabase
                    .from("spotlight_books")
                    .update({ status: "error" })
                    .eq("id", id)
        } catch {}

        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Analysis failed" },
            { status: 500 }
                )
      }
}
