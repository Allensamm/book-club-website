"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"
import { useState } from "react"

export default function CTA() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatTheyWant: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setMessage("Thank you! We'll be in touch soon.")
        setFormData({ fullName: "", email: "", whatTheyWant: "" })
      } else {
        setMessage("Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("[v0] Form submission error:", error)
      setMessage("Failed to send. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section id="contact" className="py-24 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-12 text-center space-y-8 animate-fade-in-up">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              Ready to Boost Your Book Sales?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Let's create a marketing strategy tailored to your goals. Schedule a free consultation with our team.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 max-w-2xl mx-auto animate-scale-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="bg-background border-border focus:ring-2 focus:ring-primary transition-all"
              />
              <Input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-background border-border focus:ring-2 focus:ring-primary transition-all"
              />
            </div>

            <textarea
              name="whatTheyWant"
              placeholder="Tell us what you want to achieve"
              value={formData.whatTheyWant}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-all"
              rows={4}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:shadow-lg disabled:opacity-50 active:scale-95"
            >
              {isLoading ? "Sending..." : "Submit"}
            </Button>
          </form>

          {message && (
            <p
              className={`text-sm animate-fade-in-up ${message.includes("Thank you") ? "text-green-600" : "text-red-600"}`}
            >
              {message}
            </p>
          )}

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Mail size={16} />
            <span>Or email us directly at allensamuel569@gmail.com</span>
          </div>
        </div>
      </div>
    </section>
  )
}
