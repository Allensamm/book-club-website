import Anthropic from "@anthropic-ai/sdk"

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
})

interface BotPersona {
  id: string
  name: string
  avatar_seed: string
  personality_type: string
  reading_preferences: string[]
  communication_style: string
  backstory: string
  quirks: string[]
}

interface BookContext {
  title: string
  analysis: {
    summary?: string
    themes?: string[]
    notable_quotes?: string[]
    discussion_points?: string[]
    characters?: { name: string; description: string }[]
    writing_style?: string
    genre?: string
  }
}

interface RecentMessage {
  sender_name: string
  sender_type: string
  content: string
}

export async function generateBotMessage(
  bot: BotPersona,
  book: BookContext,
  recentMessages: RecentMessage[]
): Promise<string> {
  const recentChat = recentMessages
    .slice(-15)
    .map((m) => `${m.sender_name}${m.sender_type === "user" ? " (human)" : ""}: ${m.content}`)
    .join("\n")

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 300,
    messages: [
      {
        role: "user",
        content: `You are ${bot.name}, participating in a book discussion about "${book.title}".

YOUR PERSONA:
- Personality: ${bot.personality_type}
- Communication style: ${bot.communication_style}
- Background: ${bot.backstory}
- Quirks: ${bot.quirks.join(", ")}
- Preferred genres: ${bot.reading_preferences.join(", ")}

BOOK CONTEXT:
- Summary: ${book.analysis.summary || "Not available"}
- Themes: ${book.analysis.themes?.join(", ") || "Not available"}
- Key quotes: ${book.analysis.notable_quotes?.slice(0, 5).join(" | ") || "Not available"}
- Writing style: ${book.analysis.writing_style || "Not available"}
- Genre: ${book.analysis.genre || "Not available"}

RECENT MESSAGES:
${recentChat || "(No messages yet - you're starting the discussion!)"}

Write a single, natural discussion message (1-3 sentences). Stay in character. ${
          recentMessages.length === 0
            ? "Share your initial reaction to the book."
            : "Respond naturally to the conversation. You may agree, disagree, ask a question, share a personal connection, or bring up a new point about the book."
        }

Return ONLY the message text, nothing else. No quotation marks around it.`,
      },
    ],
  })

  const text = response.content[0].type === "text" ? response.content[0].text : ""
  return text.trim().replace(/^["']|["']$/g, "")
}

export function selectBotsForTick(
  participants: BotPersona[],
  lastMessageTimes: Map<string, Date>,
  userJustPosted: boolean
): BotPersona[] {
  const now = Date.now()
  const eligibleBots = participants.filter((bot) => {
    const lastMessage = lastMessageTimes.get(bot.id)
    if (!lastMessage) return true
    // Minimum 30 seconds between messages from same bot
    return now - lastMessage.getTime() > 30000
  })

  if (eligibleBots.length === 0) return []

  // More bots respond when a user just posted
  const count = userJustPosted
    ? Math.min(Math.floor(Math.random() * 3) + 1, eligibleBots.length)
    : Math.min(Math.floor(Math.random() * 2) + 1, eligibleBots.length)

  // Shuffle and pick
  const shuffled = [...eligibleBots].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
