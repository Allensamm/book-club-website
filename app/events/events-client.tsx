"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  type: string
  attendees: number
  description: string
}

interface EventsClientProps {
  events: Event[]
}

export default function EventsClient({ events }: EventsClientProps) {
  const router = useRouter()
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    numberOfAttendees: "1",
  })

  const handleRegisterClick = (event: Event) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setFormData({ fullName: "", email: "", numberOfAttendees: "1" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const supabase = createClient()

      // Insert registration into database
      const { error } = await supabase.from("event_registrations").insert({
        event_id: selectedEvent?.id,
        full_name: formData.fullName,
        email: formData.email,
        number_of_attendees: Number.parseInt(formData.numberOfAttendees),
      })

      if (error) {
        console.error("Registration error:", error)
        alert("Failed to register. Please try again.")
        return
      }

      alert(`Successfully registered for "${selectedEvent?.title}"!`)
      handleCloseModal()

      // Refresh the page to show updated registration count
      router.refresh()
    } catch (error) {
      console.error("Registration error:", error)
      alert("Failed to register. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="grid gap-8">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden border-muted/40">
            <CardContent className="p-6">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  {/* Event Type Badge */}
                  <div className="mb-3 inline-block rounded-full bg-accent/20 px-4 py-1.5 text-sm font-semibold text-accent">
                    {event.type}
                  </div>

                  {/* Event Title */}
                  <h3 className="mb-4 font-serif text-2xl font-bold md:text-3xl">{event.title}</h3>

                  {/* Event Description */}
                  <p className="mb-6 leading-relaxed text-muted-foreground">{event.description}</p>

                  {/* Event Details */}
                  <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-accent" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-accent" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-accent" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-accent" />
                      <span>{event.attendees} registered</span>
                    </div>
                  </div>
                </div>

                {/* Register Button */}
                <Button
                  onClick={() => handleRegisterClick(event)}
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 md:mt-0"
                >
                  Register Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Registration Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-card sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl font-bold">Register for Event</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="Your name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
                className="bg-background"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-background"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="attendees">Number of Attendees</Label>
              <Select
                value={formData.numberOfAttendees}
                onValueChange={(value) => setFormData({ ...formData, numberOfAttendees: value })}
                disabled={isSubmitting}
              >
                <SelectTrigger id="attendees" className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Person</SelectItem>
                  <SelectItem value="2">2 People</SelectItem>
                  <SelectItem value="3">3 People</SelectItem>
                  <SelectItem value="4">4 People</SelectItem>
                  <SelectItem value="5">5+ People</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Complete Registration"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseModal}
                className="flex-1 bg-transparent"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
