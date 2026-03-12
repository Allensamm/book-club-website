"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface PortfolioProject {
  title: string
  category: string
  results: string
  image: string
  tags: string[]
  details?: {
    description: string
    metrics: { label: string; value: string }[]
    analyticsImages: string[]
    platforms: string[]
  }
}

interface PortfolioModalProps {
  project: PortfolioProject | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PortfolioModal({ project, open, onOpenChange }: PortfolioModalProps) {
  if (!project) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{project.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="space-y-2">
            <p className="text-sm text-primary font-semibold">{project.category}</p>
            <p className="text-sm text-muted-foreground">{project.details?.description}</p>
          </div>

          <div className="relative h-64 overflow-hidden rounded-lg bg-muted">
            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {project.details?.metrics.map((metric, idx) => (
              <div key={idx} className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="text-2xl font-bold text-primary mt-1">{metric.value}</p>
              </div>
            ))}
          </div>

          {project.details?.analyticsImages && project.details.analyticsImages.length > 0 && (
            <div className="space-y-3">
              <div className="grid gap-4">
                {project.details.analyticsImages.map((img, idx) => (
                  <div key={idx} className="relative h-72 overflow-hidden rounded-lg bg-muted">
                    <Image src={img || "/placeholder.svg"} alt={`Analytics ${idx + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <h4 className="font-semibold">Platforms & Services</h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <Badge key={i} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Key Results</h4>
            <p className="text-lg font-bold text-primary">{project.results}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
