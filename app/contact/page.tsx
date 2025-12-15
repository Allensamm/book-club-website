"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <section className="relative py-16 text-primary-foreground md:py-24">
        <div className="absolute inset-0 z-0">
          <img
            src="/thoughtful-readers-discussing-books-in-cozy-space.jpg"
            alt="Reading Community"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <h1 className="mb-6 text-center font-serif text-4xl font-bold md:text-5xl">Get in Touch</h1>
          <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-primary-foreground/90">
            Questions about ReadLoungeClub? We'd love to hear from you. Send us a message and we'll respond promptly.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="mb-6 font-serif text-3xl font-bold">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="mb-2 block text-sm font-medium">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="membership">Membership Inquiry</option>
                    <option value="events">Events & Discussions</option>
                    <option value="books">Book Suggestions</option>
                    <option value="technical">Technical Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    required
                  />
                </div>
                <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 md:w-auto">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="mb-6 font-serif text-3xl font-bold">Contact Information</h2>
              <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                Whether you're curious about membership, have questions about our book selections, or just want to chat
                about literature, we're here to connect.
              </p>

              <div className="space-y-6">
                <Card>
                  <CardContent className="flex items-start gap-4 pt-6">
                    <div className="rounded-lg bg-accent/10 p-3 text-accent">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">Email</h3>
                      <p className="text-muted-foreground">hello@readloungeclub.com</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-start gap-4 pt-6">
                    <div className="rounded-lg bg-accent/10 p-3 text-accent">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">Phone</h3>
                      <p className="text-muted-foreground">+1 (555) 987-6543</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-start gap-4 pt-6">
                    <div className="rounded-lg bg-accent/10 p-3 text-accent">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">Office</h3>
                      <p className="text-muted-foreground">
                        456 Literary Lane
                        <br />
                        Portland, OR 97209
                        <br />
                        United States
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <h3 className="mb-4 font-semibold">Office Hours</h3>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
