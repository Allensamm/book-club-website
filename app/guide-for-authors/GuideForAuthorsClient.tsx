"use client"

import Link from "next/link"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GuideForAuthorsClient() {
  const steps = [
    {
      number: "1",
      title: "Find Your Niche",
      description:
        "Identify your target market and book category. Research existing books in your genre and understand what readers want.",
    },
    {
      number: "2",
      title: "Keyword Research",
      description:
        "Discover high-volume, low-competition keywords relevant to your book. Use these in your title, description, and metadata.",
    },
    {
      number: "3",
      title: "Define Your Ideal Reader",
      description:
        "Create detailed buyer personas. Understand their demographics, preferences, problems, and where they spend their time online.",
    },
    {
      number: "4",
      title: "Target Geographic Locations",
      description:
        "Identify primary markets (US, UK, Europe, etc.) and tailor your marketing strategy to regional preferences and platforms.",
    },
    {
      number: "5",
      title: "Build Your Author Website",
      description:
        "Create a professional website showcasing your books, bio, and newsletter signup. This is your hub for author credibility.",
    },
    {
      number: "6",
      title: "Establish Social Media Presence",
      description:
        "Choose platforms where your readers are active (Instagram, TikTok, Twitter, Facebook). Share engaging content consistently.",
    },
    {
      number: "7",
      title: "Develop Your Email List",
      description:
        "Build an email list of engaged readers. Email marketing has the highest ROI for book sales and reader engagement.",
    },
    {
      number: "8",
      title: "Master Amazon Advertising",
      description: "Learn to run effective Amazon ads targeting book buyers. Start small, test, and scale what works.",
    },
    {
      number: "9",
      title: "Gather Reviews & Ratings",
      description:
        "Implement strategies to get early reviews on Amazon and Goodreads. Reviews build credibility and improve visibility.",
    },
    {
      number: "10",
      title: "Implement Content Marketing",
      description:
        "Create valuable blog posts, articles, and social media content that positions you as an expert in your field.",
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
            10 Steps to Becoming a Book Sales Expert
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A comprehensive guide for authors to master book marketing, reach their ideal readers, and build sustainable
            sales across global markets.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-12 space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Introduction</h2>
            <p className="text-base leading-relaxed text-foreground mb-4">
              Writing a book is an achievement, but turning it into a successful business requires strategy and
              execution. This guide walks you through proven steps to become a book sales expert and build a loyal
              readership.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid gap-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="border border-border rounded-lg p-6 hover:border-accent/50 transition-colors"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-base leading-relaxed text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Context */}
          <div className="bg-accent/5 border border-accent/20 rounded-lg p-8 mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Key Success Factors</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground">Consistency</h3>
                  <p className="text-muted-foreground">
                    Regular marketing efforts compound over time. Maintain consistent presence across channels.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground">Data-Driven Decisions</h3>
                  <p className="text-muted-foreground">
                    Track metrics, analyze what works, and double down on effective strategies.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground">Authentic Connection</h3>
                  <p className="text-muted-foreground">
                    Build genuine relationships with your readers. Authenticity builds loyal communities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-8 text-center mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-3">Ready to Become a Book Sales Expert?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Our team can help you implement these strategies and accelerate your book's success. Let's discuss your
            specific goals.
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
