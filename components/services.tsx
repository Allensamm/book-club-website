"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Chrome,
  Instagram,
  ShoppingCart,
  Globe,
  Zap,
  BarChart3,
  ChevronDown,
  PenTool,
  BookOpen,
  Sparkles,
  Check,
  Palette,
  TrendingUp,
  Share2,
  Users,
  ArrowRight,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const services = [
  // Writing & Content Creating
  {
    category: "Writing & Content Creating",
    icon: PenTool,
    title: "Ghostwriting",
    description:
      "Professional ghostwriters bring your story to life, handling full manuscript creation from concept to completion.",
    features: ["Full manuscript authoring", "Story development", "Character creation", "Narrative structure"],
  },
  {
    category: "Writing & Content Creating",
    icon: BookOpen,
    title: "Book Outlining",
    description:
      "Detailed outlines that serve as your roadmap, ensuring a well-structured and compelling narrative flow.",
    features: ["Chapter-by-chapter outline", "Plot structure planning", "Pacing guidance", "Story arc development"],
  },
  {
    category: "Writing & Content Creating",
    icon: Sparkles,
    title: "Story Development",
    description:
      "Transform your idea into a fully developed story with depth, character arcs, and engaging plot twists.",
    features: ["Concept development", "World-building", "Character backstory", "Plot refinement"],
  },

  // Editing & Manuscript Improvement
  {
    category: "Editing & Manuscript Improvement",
    icon: Check,
    title: "Proofreading",
    description: "Final polish for grammar, spelling, and punctuation to ensure your manuscript is publication-ready.",
    features: ["Grammar correction", "Spelling check", "Punctuation refinement", "Consistency review"],
  },

  // Publishing & Formatting
  {
    category: "Publishing & Formatting",
    icon: Globe,
    title: "Book Formatting",
    description:
      "Professional formatting for print and digital formats, ensuring your book looks polished on every platform.",
    features: ["Print formatting", "eBook formatting", "Layout design", "File preparation"],
  },
  {
    category: "Publishing & Formatting",
    icon: Zap,
    title: "Amazon KDP",
    description:
      "Expert guidance and setup for Kindle Direct Publishing, from file optimization to publishing strategy.",
    features: ["KDP setup", "Cover optimization", "Description optimization", "Publishing guidance"],
  },

  // Book Design & Branding
  {
    category: "Book Design & Branding",
    icon: Palette,
    title: "Book Cover Design",
    description: "Eye-catching cover designs that represent your book's essence and attract your target readers.",
    features: ["Custom design", "Genre-appropriate design", "Thumbnail optimization", "Multiple format covers"],
  },

  // Marketing
  {
    category: "Marketing",
    icon: TrendingUp,
    title: "SEO & Ads",
    description: "Strategic search engine optimization and targeted advertising to maximize book visibility and sales.",
    features: ["Keyword optimization", "Search ads", "Display advertising", "Campaign management"],
  },
  {
    category: "Marketing",
    icon: Share2,
    title: "Content Repurposing",
    description: "Transform your book content into social media posts, blog articles, and marketing materials.",
    features: ["Social media content", "Blog creation", "Email campaigns", "Marketing materials"],
  },
  {
    category: "Marketing",
    icon: Chrome,
    title: "Google Ads",
    description: "Reach readers actively searching for your book genre with targeted search and display campaigns.",
    features: ["Keyword targeting", "Display advertising", "Remarketing campaigns", "Performance tracking"],
  },
  {
    category: "Marketing",
    icon: Instagram,
    title: "Social Media Ads",
    description: "Facebook, Instagram, and Pinterest campaigns designed to build author brand and drive book sales.",
    features: ["Facebook ads", "Instagram ads", "Pinterest promotions", "Audience targeting"],
  },
  {
    category: "Marketing",
    icon: ShoppingCart,
    title: "Amazon Advertising",
    description:
      "Sponsored Product, Brand, and Display ads to maximize visibility on the world's largest book marketplace.",
    features: ["Sponsored products", "Brand ads", "Display ads", "Keyword optimization"],
  },

  // Author Support
  {
    category: "Author Support",
    icon: Users,
    title: "Author Websites",
    description: "Custom-built websites showcasing your books, bio, and connecting directly with your readers.",
    features: ["Custom design", "Mobile responsive", "SEO optimized", "Email integration"],
  },
  {
    category: "Author Support",
    icon: BarChart3,
    title: "Analytics & Reporting",
    description: "Transparent monthly reports showing exactly how your marketing budget is performing.",
    features: ["Monthly reports", "Real-time tracking", "Custom dashboards", "ROI analysis"],
  },
]

// Get unique categories
const categories = Array.from(new Set(services.map((s) => s.category)))

export default function Services() {
  const [expandedMobile, setExpandedMobile] = useState(0)

  const handleCTAClick = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="services" className="py-24 px-4 bg-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center space-y-4 mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
            Comprehensive Book Publishing Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From concept to bestseller—everything authors need to succeed.
          </p>
        </div>

        {/* Desktop and Tablet layout - Services organized by category with inline details */}
        <div className="hidden md:block mb-16 space-y-12">
          {categories.map((category, catIdx) => (
            <div key={category} className="space-y-4">
              <h3 className="text-2xl font-bold text-primary uppercase tracking-wider">{category}</h3>
              <div className="space-y-6">
                {services
                  .filter((s) => s.category === category)
                  .map((service, idx) => {
                    const ServiceIcon = service.icon
                    return (
                      <Card
                        key={idx}
                        className="border-border hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer animate-fade-in-up"
                        style={{ animationDelay: `${0.05 * idx}s` }}
                      >
                        <CardHeader>
                          <div className="flex gap-6 items-start">
                            {/* Left side: Icon and title */}
                            <div className="flex-shrink-0">
                              <div className="p-3 bg-primary/20 rounded-lg">
                                <ServiceIcon className="w-8 h-8 text-primary" />
                              </div>
                            </div>
                            {/* Right side: Content */}
                            <div className="flex-1">
                              <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                              <p className="text-muted-foreground">{service.description}</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="border-t pt-4">
                          <div className="space-y-3">
                            <h4 className="font-semibold text-foreground">Key Features:</h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {service.features.map((feature, fIdx) => (
                                <li key={fIdx} className="flex items-center gap-2 text-muted-foreground">
                                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile accordion layout */}
        <div className="md:hidden space-y-3 mb-16">
          {categories.map((category) => (
            <div key={category} className="space-y-2">
              <h3 className="text-sm font-semibold text-primary/70 uppercase tracking-wider px-4 pt-2">{category}</h3>
              {services
                .filter((s) => s.category === category)
                .map((service, idx) => {
                  const ServiceIcon = service.icon
                  const serviceIdx = services.indexOf(service)
                  const isExpanded = serviceIdx === expandedMobile
                  return (
                    <div key={serviceIdx} className="animate-fade-in-up" style={{ animationDelay: `${0.05 * idx}s` }}>
                      <button
                        onClick={() => setExpandedMobile(isExpanded ? -1 : serviceIdx)}
                        className={`w-full text-left p-4 rounded-lg transition-all duration-300 border-2 flex items-center justify-between ${
                          isExpanded
                            ? "border-primary bg-primary/5 shadow-lg"
                            : "border-border hover:border-primary/50 hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <ServiceIcon className="w-6 h-6 text-primary flex-shrink-0" />
                          <div>
                            <h3 className="font-semibold text-foreground text-sm">{service.title}</h3>
                          </div>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-primary transition-transform flex-shrink-0 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {/* Accordion content */}
                      {isExpanded && (
                        <div className="px-4 pt-3 pb-4 bg-muted/30 rounded-b-lg border-2 border-t-0 border-primary animate-fade-in-up">
                          <p className="text-muted-foreground text-sm mb-3">{service.description}</p>
                          <div className="space-y-2">
                            <h4 className="font-semibold text-foreground text-sm">Key Features:</h4>
                            <ul className="space-y-2">
                              {service.features.map((feature, fIdx) => (
                                <li key={fIdx} className="flex items-center gap-2 text-muted-foreground text-sm">
                                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
            </div>
          ))}
        </div>

        <div className="mt-20 text-center bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-8 animate-fade-in-up">
          <h3 className="text-2xl font-bold text-foreground mb-4">Ready to explore these services?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Let's discuss which services are perfect for your book and create a custom plan tailored to your goals.
          </p>
          <Button
            onClick={handleCTAClick}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
          >
            Tell us what you want <ArrowRight className="ml-2" size={18} />
          </Button>
        </div>
      </div>
    </section>
  )
}
