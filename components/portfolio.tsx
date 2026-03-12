"use client"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { projects } from "@/lib/projects"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Portfolio() {
  const handleCTAClick = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="portfolio" className="py-24 px-4 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Click on any project to see detailed analytics and results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {projects.map((project, idx) => (
            <Link
              key={idx}
              href={`/projects/${project.slug}`}
              className="animate-fade-in-up"
              style={{ animationDelay: `${0.08 * idx}s` }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 border-border group h-full">
                <div className="relative h-48 overflow-hidden bg-muted">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div>
                    <p className="text-sm text-primary font-semibold">{project.category}</p>
                    <h3 className="text-lg font-bold text-foreground mt-1">{project.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground font-semibold">{project.results}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="text-xs animate-scale-in"
                        style={{ animationDelay: `${0.05 * i}s` }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-8 animate-fade-in-up">
          <h3 className="text-2xl font-bold text-foreground mb-4">Inspired by our work?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Let's create your success story. Get in touch and tell us about your vision.
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
