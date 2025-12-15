import { Calendar, User, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "Blog Post - Literary Circle",
  description: "Read our latest insights and recommendations.",
}

export default function BlogPostPage() {
  return (
    <>
      <article className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            {/* Back Link */}
            <Button asChild variant="ghost" className="mb-8 p-0">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>

            {/* Category */}
            <div className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
              Discussion
            </div>

            {/* Title */}
            <h1 className="mb-6 font-serif text-4xl font-bold leading-tight md:text-5xl">
              The Power of Diverse Voices in Literature
            </h1>

            {/* Meta */}
            <div className="mb-8 flex flex-wrap gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Sarah Mitchell</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>January 15, 2025</span>
              </div>
              <span>8 min read</span>
            </div>

            {/* Featured Image */}
            <img src="/diverse-books-on-shelf.jpg" alt="Article cover" className="mb-12 w-full rounded-lg" />

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-xl leading-relaxed text-muted-foreground">
                In an increasingly interconnected world, the importance of reading diverse voices has never been more
                critical. Literature serves as a window into experiences vastly different from our own, offering
                insights that challenge our assumptions and broaden our perspectives.
              </p>

              <h2 className="mb-4 mt-12 font-serif text-3xl font-bold">Why Diversity in Reading Matters</h2>
              <p className="mb-6 leading-relaxed text-muted-foreground">
                When we limit our reading to familiar voices and perspectives, we inadvertently create echo chambers
                that reinforce our existing worldviews. Diverse literature challenges us to step outside these
                comfortable spaces and engage with narratives that might be unfamiliar, uncomfortable, or revelatory.
              </p>
              <p className="mb-6 leading-relaxed text-muted-foreground">
                Reading authors from different cultures, backgrounds, and identities enriches our understanding of the
                human experience. It cultivates empathy, challenges stereotypes, and helps us recognize the common
                threads that connect us all while celebrating what makes each culture unique.
              </p>

              <h2 className="mb-4 mt-12 font-serif text-3xl font-bold">Building a More Inclusive Reading List</h2>
              <p className="mb-6 leading-relaxed text-muted-foreground">
                Creating a diverse reading list doesn't mean abandoning your favorite authors or genres. Instead, it's
                about intentionally seeking out voices that might not naturally cross your path. Here are some
                strategies:
              </p>
              <ul className="mb-6 space-y-2 leading-relaxed text-muted-foreground">
                <li>Explore translated works from different countries and literary traditions</li>
                <li>Read books by authors from marginalized communities</li>
                <li>Seek out stories that center perspectives different from your own</li>
                <li>Support independent publishers who prioritize diverse voices</li>
                <li>Join book clubs that intentionally select diverse reads</li>
              </ul>

              <h2 className="mb-4 mt-12 font-serif text-3xl font-bold">The Impact on Our Community</h2>
              <p className="mb-6 leading-relaxed text-muted-foreground">
                At Literary Circle, we've witnessed firsthand how diverse book selections transform our discussions.
                Members bring their own experiences and perspectives to conversations, creating rich dialogues that
                illuminate different aspects of the same story.
              </p>
              <p className="mb-6 leading-relaxed text-muted-foreground">
                These discussions don't just deepen our appreciation for literature—they help us become more thoughtful,
                empathetic members of our global community. They remind us that while our experiences may differ, our
                humanity connects us all.
              </p>

              <h2 className="mb-4 mt-12 font-serif text-3xl font-bold">Looking Forward</h2>
              <p className="mb-6 leading-relaxed text-muted-foreground">
                As we continue our literary journey together, we remain committed to amplifying diverse voices and
                creating space for conversations that matter. Every book we read is an opportunity to learn, grow, and
                expand our understanding of the world and each other.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                What diverse voices have impacted your reading life? We'd love to hear your recommendations and
                reflections in the comments below.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-12 rounded-lg border border-border bg-muted/30 p-8 text-center">
              <h3 className="mb-4 font-serif text-2xl font-bold">Join the Discussion</h3>
              <p className="mb-6 text-muted-foreground">
                Become a member to participate in our monthly book discussions and connect with fellow readers.
              </p>
              <Button asChild className="bg-accent hover:bg-accent/90">
                <Link href="/membership">Become a Member</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
