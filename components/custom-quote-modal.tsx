"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"

interface CustomQuoteModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CustomQuoteModal({ isOpen, onClose }: CustomQuoteModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    budget: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          message: `Custom Quote Request:\n\n${formData.message}\n\nBudget: ${formData.budget}`,
          type: "custom-quote",
        }),
      })

      if (response.ok) {
        setSubmitSuccess(true)
        setFormData({ name: "", email: "", message: "", budget: "" })
        setTimeout(() => {
          setSubmitSuccess(false)
          onClose()
        }, 2000)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white dark:bg-slate-950 rounded-lg shadow-xl max-w-md w-full animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">Get a Custom Quote</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {submitSuccess ? (
            <div className="py-8 text-center">
              <div className="text-primary text-4xl mb-2">✓</div>
              <p className="text-foreground font-semibold">Quote request submitted!</p>
              <p className="text-muted-foreground text-sm mt-2">We'll review your request and get back to you soon.</p>
            </div>
          ) : (
            <>
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">What do you need?</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="Describe your project and what services you're interested in..."
                />
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Budget in mind</label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., $500-$1000"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white py-2 rounded-lg font-semibold transition-colors mt-6"
              >
                {isSubmitting ? "Submitting..." : "Submit Quote Request"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  )
}
