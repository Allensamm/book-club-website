import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/supabase/database"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug)
  if (!project) return {}

  return {
    title: `${project.title} - JOINTASK AGENCY`,
    description: project.details.description,
  }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/50">
      {/* Navigation */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="space-y-4">
            <Badge className="w-fit">{project.category}</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">{project.title}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">{project.details.fullDescription}</p>
          </div>

          {/* Featured Image */}
          <div className="relative w-full h-96 rounded-lg overflow-hidden">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8">Results & Metrics</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.details.metrics.map((metric, idx) => (
              <div key={idx} className="bg-background rounded-lg p-6 border">
                <p className="text-muted-foreground text-sm font-medium mb-2">{metric.label}</p>
                <p className="text-3xl font-bold text-primary">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Images */}
      {project.details.analyticsImages && project.details.analyticsImages.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8">Campaign Analytics</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {project.details.analyticsImages.map((image, idx) => (
                <div key={idx} className="relative w-full h-64 rounded-lg overflow-hidden bg-muted">
                  <Image src={image || "/placeholder.svg"} alt={`Analytics ${idx + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Platforms & Tools */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8">Platforms & Services Used</h2>
          <div className="flex flex-wrap gap-3">
            {project.details.platforms.map((platform, idx) => (
              <Badge key={idx} variant="secondary" className="text-base py-2 px-4">
                {platform}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <p className="text-muted-foreground text-sm font-semibold uppercase tracking-wide">Timeline</p>
            <p className="text-2xl font-bold text-foreground mt-2">{project.details.timeline}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm font-semibold uppercase tracking-wide">Budget</p>
            <p className="text-2xl font-bold text-foreground mt-2">{project.details.budget}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm font-semibold uppercase tracking-wide">Results</p>
            <p className="text-2xl font-bold text-primary mt-2">{project.results}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg mx-4 mb-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Ready to Achieve Similar Results?</h2>
          <p className="text-lg text-muted-foreground">Let's discuss how we can help boost your book sales.</p>
          <Link href="/#contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Start Your Project
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
