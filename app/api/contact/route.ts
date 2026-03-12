import { type NextRequest, NextResponse } from "next/server"
import { emailSignature } from "@/lib/email-signature"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, email, whatTheyWant, message, budget, type } = body

    if (!fullName || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (process.env.RESEND_API_KEY) {
      try {
        const content =
          type === "custom-quote"
            ? `<h2>New Custom Quote Request</h2>
             <p><strong>Name:</strong> ${fullName}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Project Details:</strong></p>
             <p>${message}</p>
             ${emailSignature}`
            : `<h2>New Book Marketing Inquiry</h2>
             <p><strong>Name:</strong> ${fullName}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>What they want:</strong></p>
             <p>${whatTheyWant}</p>
             ${emailSignature}`

        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "onboarding@resend.dev",
            to: "allensamuel569@gmail.com",
            subject: type === "custom-quote" ? `Custom Quote Request from ${fullName}` : `New Inquiry from ${fullName}`,
            html: content,
          }),
        })

        if (!response.ok) {
          console.error("[v0] Resend API error:", await response.text())
        }
      } catch (emailError) {
        console.error("[v0] Failed to send email via Resend:", emailError)
      }
    }

    return NextResponse.json({ success: true, message: "Form submitted successfully" }, { status: 200 })
  } catch (error) {
    console.error("[v0] Contact form error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
