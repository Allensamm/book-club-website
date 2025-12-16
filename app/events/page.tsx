import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users } from "lucide-react"
import Link from "next/link"
import EventsClient from "./events-client"
import { createClient } from "@/lib/supabase/server"

export const metadata = {
  title: "Events - ReadLoungeClub",
  description: "Join our upcoming book discussions, author conversations, and literary gatherings.",
}

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  type: string
  description: string
  attendees: number
}

export default async function EventsPage() {
  const supabase = await createClient()

  const { data: eventsData, error } = await supabase.from("events").select("*").order("date", { ascending: true })

  const upcomingEvents: Event[] = []
  if (eventsData && !error) {
    for (const event of eventsData) {
      const { data: registrations } = await supabase
        .from("event_registrations")
        .select("number_of_attendees")
        .eq("event_id", event.id)

      const totalAttendees = registrations?.reduce((sum, reg) => sum + (reg.number_of_attendees || 0), 0) || 0

      upcomingEvents.push({
        id: event.id,
        title: event.title,
        date: event.date,
        time: event.time,
        location: event.location,
        type: event.type,
        description: event.description,
        attendees: totalAttendees,
      })
    }
  }

  const pastEvents = [
    {
      title: "December Book Discussion: The Overstory",
      date: "December 18, 2024",
      attendees: 48,
    },
    {
      title: "Holiday Reading Recommendations",
      date: "December 10, 2024",
      attendees: 75,
    },
    {
      title: "Author Talk with Ocean Vuong",
      date: "November 20, 2024",
      attendees: 150,
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 text-primary-foreground md:py-24">
        <div className="absolute inset-0 z-0">
          <img src="/book-club-community-gathering.jpg" alt="Community Event" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <h1 className="mb-6 text-center font-serif text-4xl font-bold md:text-5xl">Upcoming Events</h1>
          <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-primary-foreground/90">
            Join us for book discussions, author conversations, and gatherings that celebrate the joy of reading
            together.
          </p>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="font-serif text-3xl font-bold">Coming Up</h2>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Add to Calendar
            </Button>
          </div>
          <EventsClient events={upcomingEvents} />
        </div>
      </section>

      {/* Past Events Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 font-serif text-3xl font-bold">Past Events</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {pastEvents.map((event, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <h3 className="mb-2 text-lg font-semibold">{event.title}</h3>
                  <p className="mb-2 text-sm text-muted-foreground">{event.date}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{event.attendees} attended</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-primary p-8 text-center text-primary-foreground md:p-12">
            <h2 className="mb-4 font-serif text-3xl font-bold text-balance">Never Miss an Event</h2>
            <p className="mb-8 text-lg leading-relaxed text-primary-foreground/90">
              Members receive priority registration and exclusive access to all ReadLoungeClub events.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
              <Link href="/register">Become a Member</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
