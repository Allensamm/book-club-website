import { NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/service"
import { generateBotMessage, selectBotsForTick } from "@/lib/spotlight/bot-engine"

export const maxDuration = 30

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServiceClient()
    const discussionId = params.id

    let userJustPosted = false
    try {
      const body = await request.json()
      userJustPosted = body?.userPosted === true
    } catch {}

    // Get discussion and check if active
    const { data: discussion } = await supabase
      .from("spotlight_discussions")
      .select("*, spotlight_books(*)")
      .eq("id", discussionId)
      .single()

    if (!discussion || !discussion.is_active) {
      return NextResponse.json({ skipped: true })
    }

    const book = discussion.spotlight_books

    // Check rate limit: max 100 bot messages per hour
    const oneHourAgo = new Date(Date.now() - 3600000).toISOString()
    const { count: recentBotCount } = await supabase
      .from("spotlight_messages")
      .select("*", { count: "exact", head: true })
      .eq("discussion_id", discussionId)
      .eq("sender_type", "bot")
      .gte("created_at", oneHourAgo)

    if ((recentBotCount || 0) >= 100) {
      return NextResponse.json({ skipped: true, reason: "rate_limited" })
    }

    // Get participants with bot details
    const { data: participantData } = await supabase
      .from("spotlight_participants")
      .select(`
        bot_id,
        last_message_at,
        message_count,
        spotlight_bots (
          id,
          name,
          avatar_seed,
          personality_type,
          reading_preferences,
          communication_style,
          backstory,
          quirks
        )
      `)
      .eq("discussion_id", discussionId)

    if (!participantData || participantData.length === 0) {
      return NextResponse.json({ skipped: true, reason: "no_participants" })
    }

    // Build bot list and last message times
    const bots = participantData
      .filter((p) => p.spotlight_bots)
      .map((p) => p.spotlight_bots as unknown as {
        id: string
        name: string
        avatar_seed: string
        personality_type: string
        reading_preferences: string[]
        communication_style: string
        backstory: string
        quirks: string[]
      })

    const lastMessageTimes = new Map<string, Date>()
    participantData.forEach((p) => {
      if (p.last_message_at) {
        lastMessageTimes.set(p.bot_id, new Date(p.last_message_at))
      }
    })

    // Select which bots should post
    const selectedBots = selectBotsForTick(bots, lastMessageTimes, userJustPosted)
    if (selectedBots.length === 0) {
      return NextResponse.json({ skipped: true, reason: "no_bots_ready" })
    }

    // Get recent messages for context
    const { data: recentMessages } = await supabase
      .from("spotlight_messages")
      .select("sender_name, sender_type, content")
      .eq("discussion_id", discussionId)
      .order("created_at", { ascending: false })
      .limit(15)

    const chatContext = (recentMessages || []).reverse()

    // Generate and insert messages
    const generatedMessages = []
    for (const bot of selectedBots) {
      try {
        const content = await generateBotMessage(
          bot,
          {
            title: book.title,
            analysis: book.analysis || {},
          },
          chatContext
        )

        // Insert message
        const { data: msg } = await supabase
          .from("spotlight_messages")
          .insert({
            discussion_id: discussionId,
            sender_type: "bot",
            sender_id: bot.id,
            sender_name: bot.name,
            sender_avatar: bot.avatar_seed,
            content,
          })
          .select("id")
          .single()

        // Update participant stats
        await supabase
          .from("spotlight_participants")
          .update({
            last_message_at: new Date().toISOString(),
            message_count: (participantData.find((p) => p.bot_id === bot.id)?.message_count || 0) + 1,
          })
          .eq("discussion_id", discussionId)
          .eq("bot_id", bot.id)

        if (msg) {
          generatedMessages.push({ botName: bot.name, messageId: msg.id })
          // Add to context for next bot
          chatContext.push({
            sender_name: bot.name,
            sender_type: "bot",
            content,
          })
        }
      } catch (err) {
        console.error(`[Spotlight] Failed to generate message for ${bot.name}:`, err)
      }
    }

    return NextResponse.json({ generated: generatedMessages.length, messages: generatedMessages })
  } catch (error) {
    console.error("[Spotlight] Tick error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Tick failed" },
      { status: 500 }
    )
  }
}
