"use client"
import Link from "next/link"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GuideForNonAuthorsClient() {
  const steps = [
    {
      phase: "Phase 1: Planning & Writing",
      steps: [
        {
          title: "Define Your Story Concept",
          description:
            "Start with a clear idea of what you want to write. Define your book's theme, genre, and target audience.",
        },
        {
          title: "Choose: Write or Hire a Ghostwriter",
          description:
            "Decide if you'll write the book yourself or hire a ghostwriter. Consider time, expertise, and budget.",
        },
      ],
    },
    {
      phase: "Phase 2: Writing & Development",
      steps: [
        {
          title: "Create an Outline",
          description: "Develop a detailed outline organizing your thoughts, chapters, and key points before writing.",
        },
        {
          title: "Write Your First Draft",
          description: "Complete your manuscript. Don't aim for perfection; focus on getting words on the page.",
        },
      ],
    },
    {
      phase: "Phase 3: Quality Assurance",
      steps: [
        {
          title: "Beta Reading",
          description:
            "Have beta readers review your manuscript for feedback on plot, pacing, characters, and overall impact.",
        },
        {
          title: "Professional Proofreading",
          description: "Hire a proofreader to catch grammar, spelling, and formatting errors before publication.",
        },
      ],
    },
    {
      phase: "Phase 4: Design & Branding",
      steps: [
        {
          title: "Create Your Author Brand",
          description: "Develop your author platform, author bio, website, and social media presence.",
        },
        {
          title: "Professional Book Cover Design",
          description:
            "Invest in professional cover design. This is your book's first impression and crucial for sales.",
        },
      ],
    },
    {
      phase: "Phase 5: Publication",
      steps: [
        {
          title: "Choose Publishing Path",
          description:
            "Decide between traditional publishing or self-publishing. Each has benefits and considerations.",
        },
        {
          title: "Format & Prepare Manuscript",
          description:
            "Format your manuscript according to publishing platform requirements (Amazon KDP, IngramSpark, etc.).",
        },
      ],
    },
    {
      phase: "Phase 6: Marketing & Promotion",
      steps: [
        {
          title: "Build Your Email List",
          description: "Start collecting emails from interested readers before launch for your announcement list.",
        },
        {
          title: "Create Content Marketing Strategy",
          description:
            "Plan blog posts, social media content, and articles that promote your book and establish authority.",
        },
        {
          title: "Implement Paid Advertising",
          description: "Use Amazon Ads, Facebook/Instagram ads, and other platforms to reach potential readers.",
        },
      ],
    },
    {
      phase: "Phase 7: Ongoing Growth",
      steps: [
        {
          title: "Gather Reviews & Testimonials",
          description: "Encourage readers to leave reviews on Amazon, Goodreads, and other platforms.",
        },
        {
          title: "Engage Your Community",
          description: "Build relationships with readers through social media, email, and author events.",
        },
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="border-b">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-accent hover:text-accent/80">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Your Complete Journey from Aspiring Author to Published Writer
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A step-by-step guide for first-time authors covering writing, editing, design, and marketing your first
            book.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-12 space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Introduction</h2>
            <p className="text-base leading-relaxed text-foreground mb-4">
              Becoming an author is an exciting journey. This guide breaks down the entire process into manageable
              phases, from your initial idea to a published book in readers' hands. Whether you're writing your first
              book yourself or hiring help, we'll guide you through every step.
            </p>
          </div>

          {/* Phases */}
          <div className="space-y-12">
            {steps.map((phase, phaseIdx) => (
              <div key={phaseIdx} className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground pb-2 border-b border-border">{phase.phase}</h2>
                <div className="grid gap-4">
                  {phase.steps.map((step, stepIdx) => (
                    <div
                      key={stepIdx}
                      className="border border-border rounded-lg p-6 hover:border-accent/50 transition-colors"
                    >
                      <div className="flex gap-4">
                        <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                          <p className="text-base leading-relaxed text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Key Tips */}
          <div className="bg-accent/5 border border-accent/20 rounded-lg p-8 mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Important Tips for First-Time Authors</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground">Don't Rush the Process</h3>
                  <p className="text-muted-foreground">
                    Quality takes time. Rushing to publish an unpolished book can damage your author reputation.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground">Invest in Professional Help</h3>
                  <p className="text-muted-foreground">
                    Quality editing, cover design, and marketing are worth the investment for your book's success.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground">Start Marketing Early</h3>
                  <p className="text-muted-foreground">
                    Don't wait until publication. Build your audience before launch for maximum impact.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground">Build Your Author Platform</h3>
                  <p className="text-muted-foreground">
                    A website and email list are essentials for long-term author success and reader engagement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-8 text-center mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-3">Need Help With Your Book Journey?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            From ghostwriting to editing, design, and marketing – our team is here to support every step of your
            publishing journey. Let's talk about your book.
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              const contactSection = document.getElementById("contact")
              if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" })
            }}
          >
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
              Tell us what you want to achieve
            </Button>
          </a>
        </div>
      </article>
    </main>
  )
}
