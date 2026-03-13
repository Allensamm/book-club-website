import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    const discussionId = params.id

    // Get authenticated user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { content } = await request.json()
    if (!content?.trim()) {
      return NextResponse.json({ error: "Message content required" }, { status: 400 })
    }

    const displayName = user.user_metadata?.display_name || user.email?.split("@")[0] || "User"

    const { data, error } = await supabase
      .from("spotlight_messages")
      .insert({
        discussion_id: discussionId,
        sender_type: "user",
        sender_id: user.id,
        sender_name: displayName,
        content: content.trim(),
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to send message" },
      { status: 500 }
    )
  }
}
