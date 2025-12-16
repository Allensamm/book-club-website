import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Users, Calendar, Award, Quote } from "lucide-react"
import { BookFlipSection } from "@/components/book-flip-section"
import { AnimatedCounter } from "@/components/animated-counter"
import { createClient } from "@/lib/supabase/server"

export default async function HomePage() {
  const supabase = await createClient()

  const { data: featuredBookData } = await supabase.from("books").select("*").eq("is_featured", true).single()

  const { data: eventsData } = await supabase.from("events").select("*").order("date", { ascending: true }).limit(3)

  const featuredBook = featuredBookData || {
    title: "The Midnight Library",
    author: "Matt Haig",
    cover_url: "/the-midnight-library-book-cover.jpg",
    description:
      "A dazzling novel about all the choices that go into a life well lived, from the internationally bestselling author of Reasons to Stay Alive and How To Stop Time.",
    genre: "Fiction, Philosophy",
  }

  const upcomingEvents = eventsData || []
  // </CHANGE>

  const features = [
    {
      icon: BookOpen,
      title: "Thoughtful Selections",
      description:
        "Each book is chosen to spark curiosity and inspire discovery. From hidden gems to celebrated works, we explore stories worth discussing.",
    },
    {
      icon: Users,
      title: "Welcoming Community",
      description:
        "Connect with thoughtful readers who share your love of literature. Our discussions are friendly, insightful, and always respectful.",
    },
    {
      icon: Calendar,
      title: "Monthly Gatherings",
      description:
        "Join us for regular book discussions, author conversations, and literary events that bring stories to life.",
    },
    {
      icon: Award,
      title: "Member Perks",
      description:
        "Enjoy exclusive content, early book reveals, special event access, and connections with authors and fellow readers.",
    },
  ]

  const hosts = [
    {
      name: "Sarah Mitchell",
      role: "Lead Curator",
      bio: "With a degree in Comparative Literature and 15 years of facilitating book discussions, Sarah brings passion and insight to every gathering.",
      image: "/woman-smiling-professional-portrait.jpg",
    },
    {
      name: "James Chen",
      role: "Community Director",
      bio: "James creates welcoming spaces where readers connect. His background in education helps foster meaningful literary conversations.",
      image: "/professional-man-in-suit-smiling.jpg",
    },
    {
      name: "Priya Kumar",
      role: "Events Coordinator",
      bio: "Priya organizes author talks and special events that bring our community together around shared love of stories.",
      image: "/indian-woman-smiling.png",
    },
  ]
  // </CHANGE>

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/diverse-readers-enjoying-books-in-warm-cozy-librar.jpg"
            alt="ReadLoungeClub members enjoying literature together"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32 lg:py-40">
          <div className="mx-auto max-w-3xl text-center text-primary-foreground">
            <h1 className="mb-6 font-serif text-4xl font-bold leading-tight text-balance md:text-5xl lg:text-6xl">
              Where curiosity meets the page
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-primary-foreground/90 md:text-xl">
              Discover stories that challenge, inspire, and connect us. Join a community of curious readers exploring
              literature from every corner of the world.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                <Link href="/register">Start Your Journey</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 bg-primary-foreground/10 hover:bg-primary-foreground/20"
              >
                <Link href="/book-club">Explore Our Club</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold text-balance md:text-4xl">
              Why readers love ReadLoungeClub
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              A place where every book becomes a conversation and every member brings something wonderful to discover.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="border-border/50 transition-shadow hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold">Our Reading Community</h2>
          <div className="grid gap-8 md:grid-cols-4">
            <AnimatedCounter end={12000} suffix="+" label="Curious Readers" />
            <AnimatedCounter end={180} suffix="+" label="Books Explored" />
            <AnimatedCounter end={1500} suffix="+" label="Thoughtful Discussions" />
            <AnimatedCounter end={85} suffix="+" label="Author Conversations" />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold text-balance md:text-4xl">Featured Book</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              This month's selection is a journey worth taking
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <Card className="overflow-hidden border-border/50">
              <div className="grid gap-8 md:grid-cols-[300px_1fr]">
                <div className="relative h-[400px] md:h-auto">
                  <img
                    src={featuredBook.cover_url || "/placeholder.svg?height=500&width=350"}
                    alt={featuredBook.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="flex flex-col justify-center p-6 md:p-8">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 font-serif text-2xl font-bold md:text-3xl">{featuredBook.title}</h3>
                  <p className="mb-4 text-sm font-medium text-accent">by {featuredBook.author}</p>
                  <p className="mb-6 leading-relaxed text-muted-foreground">{featuredBook.description}</p>
                  <div className="mb-6">
                    <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-sm text-accent">
                      {featuredBook.genre}
                    </span>
                  </div>
                  <div className="mt-auto">
                    <Button asChild variant="outline" className="w-full md:w-auto bg-transparent">
                      <Link href="/books">View All Books</Link>
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>
      {/* </CHANGE> */}

      {/* Interactive Book Flip Section */}
      <BookFlipSection />

      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold text-balance md:text-4xl">Upcoming Events</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Join us for book discussions and author conversations
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <Card key={event.id} className="border-border/50 transition-shadow hover:shadow-lg">
                  <CardContent className="pt-6">
                    <div className="mb-3 inline-block rounded-md bg-accent/10 px-3 py-1 text-xs font-medium text-accent uppercase">
                      {event.type}
                    </div>
                    <h3 className="mb-3 text-xl font-semibold">{event.title}</h3>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {event.description}
                    </p>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(event.date).toLocaleDateString()} at {event.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center text-muted-foreground">
                <p>Check back soon for upcoming events!</p>
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link href="/events">View All Events</Link>
            </Button>
          </div>
        </div>
      </section>
      {/* </CHANGE> */}

      {/* Author Spotlight Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold text-balance md:text-4xl">Author Spotlight</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Meet the voices behind the stories we love. Each month we celebrate an author who inspires curiosity and
              wonder.
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <Card className="overflow-hidden border-border/50">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="relative h-[300px] md:h-auto">
                  <img
                    src="/elegant-host-reading-book.jpg"
                    alt="Matt Haig - Featured author portrait"
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="flex flex-col justify-center p-6 md:p-8">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Quote className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 font-serif text-2xl font-bold md:text-3xl">Matt Haig</h3>
                  <p className="mb-4 text-sm font-medium text-accent">Author of "The Midnight Library"</p>
                  <p className="mb-6 leading-relaxed text-muted-foreground">
                    Matt Haig writes novels and non-fiction that explore the human condition with warmth and insight.
                    His work delves into mental health, philosophy, and the infinite possibilities of life, resonating
                    with readers worldwide.
                  </p>
                  {/* </CHANGE> */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                      <p className="text-sm leading-relaxed">
                        <span className="font-semibold">Notable Works:</span> The Midnight Library, Reasons to Stay
                        Alive, How to Stop Time
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                      <p className="text-sm leading-relaxed">
                        <span className="font-semibold">Awards:</span> Goodreads Choice Award Winner, Sunday Times
                        Bestseller
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                      <p className="text-sm leading-relaxed">
                        <span className="font-semibold">Upcoming:</span> Join us for a live Q&A on March 15th
                      </p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button asChild variant="outline" className="w-full md:w-auto bg-transparent">
                      <Link href="/events">View Author Events</Link>
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold text-balance md:text-4xl">Meet Our Hosts</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              The passionate team bringing our book club community to life
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {hosts.map((host, index) => (
              <Card key={index} className="border-border/50 text-center transition-shadow hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <div className="relative h-32 w-32 overflow-hidden rounded-full bg-muted">
                      <img
                        src={host.image || "/placeholder.svg"}
                        alt={host.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="mb-1 font-semibold text-xl">{host.name}</h3>
                  <p className="mb-3 text-sm font-medium text-accent">{host.role}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{host.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* </CHANGE> */}

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-primary p-8 text-center text-primary-foreground md:p-12">
            <h2 className="mb-4 font-serif text-3xl font-bold text-balance md:text-4xl">
              Ready to discover your next favorite book?
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-primary-foreground/90">
              Join ReadLoungeClub today and become part of a welcoming community that celebrates stories, ideas, and the
              joy of reading.
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
