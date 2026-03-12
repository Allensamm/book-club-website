import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getBlogPostBySlug, getAllBlogSlugs } from "@/lib/supabase/database"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug)
  if (!post) return {}

  return {
    title: `${post.title} - JOINTASK AGENCY`,
    description: `${post.category} | ${post.read_time}`,
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Navigation */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {post.category}
            </span>
            <span className="text-muted-foreground text-sm">{post.read_time}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{post.title}</h1>
          <time className="text-muted-foreground">
            {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </time>
        </header>

        {/* Featured Image */}
        {post.image && (
          <div className="mb-12 rounded-lg overflow-hidden">
            <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-96 object-cover" />
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-lg max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* CTA */}
        <section className="mt-16 p-8 bg-primary/10 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Ready to boost your book sales?</h2>
          <p className="text-muted-foreground mb-6">Let's discuss how we can help you achieve your publishing goals.</p>
          <Link
            href="/#services"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Talk to us
          </Link>
        </section>
      </article>
    </main>
  )
}
