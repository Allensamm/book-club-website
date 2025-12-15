import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Video } from "lucide-react"

export const metadata = {
  title: "Events - WonderBookClub",
  description: "Join our upcoming book discussions, author conversations, and literary gatherings.",
}

export default function EventsPage() {
  const upcomingEvents = [
    {
      title: "January Book Discussion: The Midnight Library",
      date: "January 28, 2025",
      time: "7:00 PM EST",
      location: "In-Person & Virtual",
      type: "Book Discussion",
      attendees: 45,
      description:
        "Join us for an engaging discussion about life choices, regrets, and the infinite possibilities between life and death.",
    },
    {
      title: "Author Talk with Emily St. John Mandel",
      date: "February 5, 2025",
      time: "6:30 PM EST",
      location: "Virtual Only",
      type: "Author Event",
      attendees: 120,
      description: "An exclusive virtual conversation with the author of Station Eleven and The Glass Hotel.",
    },
    {
      title: "Literary Trivia Night",
      date: "February 12, 2025",
      time: "8:00 PM EST",
      location: "The Reading Room, NYC",
      type: "Social Event",
      attendees: 60,
      description: "Test your literary knowledge in a fun, casual evening with fellow book lovers. Prizes for winners!",
    },
    {
      title: "February Book Discussion: The Vanishing Half",
      date: "February 25, 2025",
      time: "7:00 PM EST",
      location: "In-Person & Virtual",
      type: "Book Discussion",
      attendees: 52,
      description: "Explore themes of identity, race, and family in this powerful multigenerational story.",
    },
  ]

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
          <div className="grid gap-8">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid gap-6 md:grid-cols-[auto_1fr] md:gap-8">
                    {/* Date Badge */}
                    <div className="bg-accent p-6 text-center text-accent-foreground md:w-32">
                      <div className="font-serif text-3xl font-bold">{new Date(event.date).getDate()}</div>
                      <div className="text-sm">
                        {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="flex flex-col justify-center p-6 md:py-6 md:pr-6 md:pl-0">
                      <div className="mb-2 inline-block w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                        {event.type}
                      </div>
                      <h3 className="mb-3 font-serif text-2xl font-bold">{event.title}</h3>
                      <p className="mb-4 text-muted-foreground">{event.description}</p>

                      <div className="mb-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {event.location.includes("Virtual") ? (
                            <Video className="h-4 w-4" />
                          ) : (
                            <MapPin className="h-4 w-4" />
                          )}
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{event.attendees} registered</span>
                        </div>
                      </div>

                      <Button className="w-fit bg-accent hover:bg-accent/90">Register for Event</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
              Members receive priority registration and exclusive access to all WonderBookClub events.
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90">
              Become a Member
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
