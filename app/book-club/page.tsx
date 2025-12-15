import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, MessageCircle, Calendar, Users } from "lucide-react"

export const metadata = {
  title: "Book Club Details - WonderBookClub",
  description: "Learn how WonderBookClub works, what to expect, and how to participate in our thoughtful discussions.",
}

export default function BookClubPage() {
  const howItWorks = [
    {
      icon: BookOpen,
      title: "Monthly Book Selection",
      description: "Each month, our team selects a thought-provoking book from diverse authors and genres.",
    },
    {
      icon: Calendar,
      title: "Reading Period",
      description: "Members have 3-4 weeks to read the book at their own pace before the discussion.",
    },
    {
      icon: MessageCircle,
      title: "Discussion Groups",
      description: "Join in-person or virtual discussion sessions led by experienced moderators.",
    },
    {
      icon: Users,
      title: "Community Connection",
      description: "Continue conversations online and connect with fellow readers throughout the month.",
    },
  ]

  const formats = [
    {
      title: "In-Person Meetups",
      description: "Intimate gatherings at local venues in major cities. Enjoy coffee, conversation, and community.",
      features: ["Limited to 20-30 members", "Refreshments provided", "Casual atmosphere"],
    },
    {
      title: "Virtual Sessions",
      description:
        "Join from anywhere in the world via video call. Perfect for remote members and those with busy schedules.",
      features: ["Open to all members", "Multiple time zones", "Recorded for later viewing"],
    },
    {
      title: "Hybrid Experience",
      description: "Can't make it in person? Most in-person sessions are also streamed online for maximum flexibility.",
      features: ["Best of both worlds", "Interactive participation", "Chat and Q&A"],
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-primary py-16 text-primary-foreground md:py-24">
        <div className="absolute inset-0 z-0">
          <img
            src="/book-club-discussion-group.jpg"
            alt="Book Club Discussion"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <h1 className="mb-6 text-center font-serif text-4xl font-bold text-balance md:text-5xl">
            How WonderBookClub Works
          </h1>
          <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-primary-foreground/90">
            Join a welcoming community of curious readers in thoughtful conversations about books that inspire
            discovery.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold">The Process</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative">
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <step.icon className="h-6 w-6" />
                    </div>
                    <div className="mb-2 text-sm font-semibold text-accent">Step {index + 1}</div>
                    <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
                {index < howItWorks.length - 1 && (
                  <div className="absolute -right-4 top-1/2 hidden h-0.5 w-8 bg-border lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formats Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold">Discussion Formats</h2>
          <div className="grid gap-8 lg:grid-cols-3">
            {formats.map((format, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <h3 className="mb-3 text-xl font-semibold">{format.title}</h3>
                  <p className="mb-4 text-muted-foreground">{format.description}</p>
                  <ul className="space-y-2">
                    {format.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center font-serif text-3xl font-bold">What to Expect</h2>
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-xl font-semibold">Welcoming Environment</h3>
                <p className="text-muted-foreground">
                  Our discussions are moderated to ensure everyone feels comfortable sharing their thoughts. There are
                  no wrong answers—we celebrate diverse perspectives and interpretations.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">Thoughtful Moderation</h3>
                <p className="text-muted-foreground">
                  Our trained moderators guide conversations with discussion questions, historical context, and literary
                  analysis while ensuring everyone gets a chance to participate.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">Flexible Participation</h3>
                <p className="text-muted-foreground">
                  Life gets busy—we get it. Miss a meeting? Catch up with recordings and discussion summaries. Can't
                  finish the book? Join anyway and learn from others' perspectives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-balance">Ready to Start Your Reading Journey?</h2>
          <p className="mb-8 text-lg leading-relaxed text-primary-foreground/90">
            Join WonderBookClub today and become part of a community that celebrates curiosity and conversation.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
            <Link href="/membership">Become a Member</Link>
          </Button>
        </div>
      </section>
    </>
  )
}
