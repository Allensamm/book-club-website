import Anthropic from "@anthropic-ai/sdk"

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
})

export interface BookAnalysis {
  summary: string
  themes: string[]
  characters: { name: string; description: string }[]
  notable_quotes: string[]
  discussion_points: string[]
  controversial_elements: string[]
  writing_style: string
  genre: string
  mood: string
}

export async function analyzeBook(bookText: string, title: string): Promise<BookAnalysis> {
  // Use first ~80k chars to stay within context limits
  const textSample = bookText.slice(0, 80000)

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: `Analyze this book titled "${title}" and return a JSON object with exactly these fields:

{
  "summary": "A 150-200 word summary of the book",
  "themes": ["3-5 key themes as strings"],
  "characters": [{"name": "Character Name", "description": "Brief description"}],
  "notable_quotes": ["10-15 memorable or significant quotes from the text"],
  "discussion_points": ["10-15 thought-provoking discussion questions or points"],
  "controversial_elements": ["Any debatable or controversial aspects of the book"],
  "writing_style": "Description of the author's writing style",
  "genre": "The book's genre",
  "mood": "The overall mood/tone of the book"
}

Return ONLY valid JSON, no markdown formatting, no code blocks.

Book text:
${textSample}`,
      },
    ],
  })

  const text = response.content[0].type === "text" ? response.content[0].text : ""

  try {
    return JSON.parse(text) as BookAnalysis
  } catch {
    // Try to extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]) as BookAnalysis
    }
    throw new Error("Failed to parse book analysis response")
  }
}
