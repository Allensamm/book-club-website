import { type NextRequest, NextResponse } from "next/server"
import { emailSignature } from "@/lib/email-signature"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { date, time, visitorName, visitorEmail } = body

    if (!date || !time || !visitorName || !visitorEmail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create Google Meet link (using a fixed format)
    const meetLink = `https://meet.google.com/new`

    // Format date and time for display
    const meetDate = new Date(date)
    const formattedDate = meetDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    // Send email to admin
    if (process.env.RESEND_API_KEY) {
      try {
        const adminEmailContent = `
          <h2>New Google Meet Scheduled</h2>
          <p><strong>Visitor Name:</strong> ${visitorName}</p>
          <p><strong>Visitor Email:</strong> ${visitorEmail}</p>
          <p><strong>Date:</strong> ${formattedDate}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p><strong>Google Meet Link:</strong> <a href="${meetLink}">${meetLink}</a></p>
          <hr />
          <p>Join the meeting at the scheduled time: <a href="${meetLink}">Click here to join</a></p>
          ${emailSignature}
        `

        const adminResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "onboarding@resend.dev",
            to: "allensamuel569@gmail.com",
            subject: `New Meeting Scheduled: ${visitorName} - ${formattedDate} at ${time}`,
            html: adminEmailContent,
          }),
        })

        if (!adminResponse.ok) {
          console.error("[v0] Resend API error:", await adminResponse.text())
        }

        const visitorEmailContent = `
          <h2>Your Google Meet is Scheduled!</h2>
          <p>Hi ${visitorName},</p>
          <p>Your meeting with JOINTASK has been scheduled for:</p>
          <p><strong>Date:</strong> ${formattedDate}<br /><strong>Time:</strong> ${time}</p>
          <p>Join the meeting here: <a href="${meetLink}">${meetLink}</a></p>
          <p>Looking forward to speaking with you!</p>
          <p>Best regards,<br />JOINTASK Team</p>
          ${emailSignature}
        `

        const visitorResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "onboarding@resend.dev",
            to: visitorEmail,
            subject: "Your Google Meet is Scheduled",
            html: visitorEmailContent,
          }),
        })

        if (!visitorResponse.ok) {
          console.error("[v0] Resend API error:", await visitorResponse.text())
        }
      } catch (emailError) {
        console.error("[v0] Failed to send email via Resend:", emailError)
      }
    }

    return NextResponse.json({ success: true, message: "Meeting scheduled successfully", meetLink }, { status: 200 })
  } catch (error) {
    console.error("[v0] Schedule meet error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
