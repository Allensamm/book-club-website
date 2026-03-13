// Use pdf-parse with legacy pdfjs build to avoid DOMMatrix/canvas errors in serverless
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require("pdf-parse/lib/pdf-parse.js")

export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
    const data = await pdfParse(buffer, {
          // Use legacy pdfjs version that doesn't require canvas/DOMMatrix
                                    version: "v1.10.100",
    })
    return data.text
}

export function chunkText(text: string, maxChunkSize: number = 50000): string[] {
    if (text.length <= maxChunkSize) return [text]

  const chunks: string[] = []
      let start = 0

  while (start < text.length) {
        let end = start + maxChunkSize

      // Try to break at a paragraph or sentence boundary
      if (end < text.length) {
              const paragraphBreak = text.lastIndexOf("\n\n", end)
              if (paragraphBreak > start + maxChunkSize * 0.5) {
                        end = paragraphBreak
              } else {
                        const sentenceBreak = text.lastIndexOf(". ", end)
                        if (sentenceBreak > start + maxChunkSize * 0.5) {
                                    end = sentenceBreak + 1
                        }
              }
      }

      chunks.push(text.slice(start, end).trim())
        start = end
  }

  return chunks
}
