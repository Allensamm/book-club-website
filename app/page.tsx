import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Users, Calendar, Award, Quote } from "lucide-react"
import { BookFlipSection } from "@/components/book-flip-section"
import { AnimatedCounter } from "@/components/animated-counter"

export default function HomePage() {
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

  const communityMembers = [
    {
      name: "Sarah Johnson",
      location: "New York, NY",
      quote: "Every book discussion opens my mind to perspectives I never considered.",
      image: "/woman-smiling-professional-portrait.jpg",
    },
    {
      name: "Michael Chen",
      location: "San Francisco, CA",
      quote: "The most welcoming book club I've ever been part of.",
      image: "/man-smiling-professional-portrait.jpg",
    },
    {
      name: "Aisha Patel",
      location: "Chicago, IL",
      quote: "ReadLoungeClub helped me rediscover my love for reading.",
      image: "/woman-glasses-smiling-portrait.jpg",
    },
    {
      name: "David Martinez",
      location: "Austin, TX",
      quote: "The thoughtful discussions are what keep me coming back.",
      image: "/man-beard-smiling-portrait.jpg",
    },
    {
      name: "Emily Wong",
      location: "Seattle, WA",
      quote: "I've made genuine friendships through our shared love of literature.",
      image: "/smiling-asian-woman-portrait.png",
    },
    {
      name: "James Thompson",
      location: "Boston, MA",
      quote: "The book selections always surprise and delight me.",
      image: "/older-man-smiling.png",
    },
    {
      name: "Priya Sharma",
      location: "Los Angeles, CA",
      quote: "A beautiful community that celebrates diverse voices and stories.",
      image: "/indian-woman-smiling.png",
    },
    {
      name: "Robert Kim",
      location: "Denver, CO",
      quote: "ReadLoungeClub expanded my reading horizons beyond what I imagined.",
      image: "/smiling-asian-man.png",
    },
    {
      name: "Lisa Anderson",
      location: "Portland, OR",
      quote: "The author events are incredible opportunities to learn and connect.",
      image: "/woman-red-hair-smiling-portrait.jpg",
    },
    {
      name: "Carlos Rivera",
      location: "Miami, FL",
      quote: "Every month brings new discoveries and wonderful conversations.",
      image: "/latino-man-smiling-portrait.png",
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/diverse-readers-enjoying-books-in-warm-cozy-librar.jpg"
            alt="ReadLoungeClub members enjoying literature together"
            className="h-full w-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-primary/80" />
        </div>

        {/* Centered Content */}
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
          <h2 className="mb-12 text-center font-serif text-3xl font-bold">Our reading community</h2>
          <div className="grid gap-8 md:grid-cols-4">
            <AnimatedCounter end={12000} suffix="+" label="Curious Readers" />
            <AnimatedCounter end={180} suffix="+" label="Books Explored" />
            <AnimatedCounter end={1500} suffix="+" label="Thoughtful Discussions" />
            <AnimatedCounter end={85} suffix="+" label="Author Conversations" />
          </div>
        </div>
      </section>

      {/* Interactive Book Flip Section */}
      <BookFlipSection />

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
                    src="/professional-author-portrait-warm-lighting.jpg"
                    alt="Featured author portrait"
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="flex flex-col justify-center p-6 md:p-8">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Quote className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 font-serif text-2xl font-bold md:text-3xl">Margaret Chen</h3>
                  <p className="mb-4 text-sm font-medium text-accent">Author of "The Silent Garden"</p>
                  <p className="mb-6 leading-relaxed text-muted-foreground">
                    Margaret Chen weaves intricate tales of family, memory, and belonging. Her latest novel explores the
                    delicate threads that connect us across generations, inviting readers to reflect on their own
                    stories.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                      <p className="text-sm leading-relaxed">
                        <span className="font-semibold">Notable Works:</span> The Silent Garden, Echoes of Home,
                        Borrowed Time
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                      <p className="text-sm leading-relaxed">
                        <span className="font-semibold">Awards:</span> National Book Award Finalist, PEN/Faulkner Award
                        Winner
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

      {/* Community Members Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold text-balance md:text-4xl">Meet Our Community</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Real readers sharing their love of literature and meaningful connections.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {communityMembers.map((member, index) => (
              <Card key={index} className="border-border/50 text-center transition-shadow hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <div className="relative h-20 w-20 overflow-hidden rounded-full bg-muted">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="mb-1 font-semibold text-base">{member.name}</h3>
                  <p className="mb-3 text-xs text-muted-foreground">{member.location}</p>
                  <div className="flex justify-center mb-2">
                    <Quote className="h-4 w-4 text-accent" />
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground italic">"{member.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

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
