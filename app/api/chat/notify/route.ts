import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { visitorName, visitorEmail, message, conversationId } = await request.json()

    if (process.env.RESEND_API_KEY) {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "onboarding@resend.dev",
            to: "allensamuel569@gmail.com",
            subject: `New Chat Message from ${visitorName}`,
            html: `
              <h2>New Chat Message</h2>
              <p><strong>From:</strong> ${visitorName}</p>
              <p><strong>Email:</strong> ${visitorEmail}</p>
              <p><strong>Message:</strong></p>
              <p>${message}</p>
              <p><a href="${process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}`}/admin/chat?id=${conversationId}">Reply in Admin Dashboard</a></p>
            `,
          }),
        })

        if (!response.ok) {
          console.error("[v0] Resend API error:", await response.text())
        }
      } catch (emailError) {
        console.error("[v0] Failed to send email via Resend:", emailError)
      }
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("[v0] Chat notification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
