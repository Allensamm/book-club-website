import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const blogPosts = [
  {
    slug: "amazon-kdp-self-publishing-guide",
    title: "Complete Guide to Amazon KDP Self-Publishing in 2024",
    excerpt:
      "Learn everything you need to know about self-publishing on Amazon KDP, from manuscript preparation to maximizing sales.",
    date: "2024-01-15",
    category: "Publishing",
    readTime: "8 min read",
    image: "/amazon-kdp-self-publishing-guide.jpg",
  },
  {
    slug: "book-marketing-strategies-2024",
    title: "Top 10 Book Marketing Strategies to Increase Sales",
    excerpt:
      "Discover proven marketing strategies that help authors reach more readers and increase book sales in competitive markets.",
    date: "2024-01-12",
    category: "Marketing",
    readTime: "10 min read",
    image: "/book-marketing-strategies.jpg",
  },
  {
    slug: "ghostwriting-costs-benefits",
    title: "Ghostwriting for Authors: Costs, Benefits & Process",
    excerpt:
      "A comprehensive guide to hiring a ghostwriter for your book, including costs, what to expect, and how to choose the right writer.",
    date: "2024-01-10",
    category: "Writing",
    readTime: "7 min read",
    image: "/ghostwriting-book-authors.jpg",
  },
  {
    slug: "book-editing-mistakes-avoid",
    title: "5 Critical Book Editing Mistakes Authors Must Avoid",
    excerpt:
      "Learn about the most common editing mistakes that can harm your book's quality and how professional editors prevent them.",
    date: "2024-01-08",
    category: "Editing",
    readTime: "6 min read",
    image: "/book-editing-mistakes.jpg",
  },
  {
    slug: "author-branding-book-cover-design",
    title: "Author Branding: Why Your Book Cover Design Matters",
    excerpt:
      "Explore how professional book cover design impacts your author brand and helps your book stand out in the market.",
    date: "2024-01-05",
    category: "Design",
    readTime: "9 min read",
    image: "/book-cover-design-author-branding.jpg",
  },
  {
    slug: "seo-book-authors-online-visibility",
    title: "SEO for Authors: Improve Your Online Visibility",
    excerpt:
      "Understand SEO fundamentals and how authors can optimize their websites and author platforms for better search engine rankings.",
    date: "2024-01-01",
    category: "SEO",
    readTime: "11 min read",
    image: "/seo-for-authors-online-visibility.jpg",
  },
]

export const metadata: Metadata = {
  title: "Blog - JOINTASK | Book Writing, Editing & Marketing Tips",
  description:
    "Expert tips and guides for authors on book writing, editing, marketing, publishing, and author branding. Learn from industry professionals.",
  keywords: ["book writing blog", "author marketing", "self-publishing tips", "book editing guide", "author branding"],
  openGraph: {
    title: "JOINTASK Blog - Author Resources & Publishing Tips",
    description: "Expert tips and guides for book authors on writing, editing, marketing, and publishing.",
    type: "website",
  },
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b bg-gradient-to-b from-accent/10 to-background py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-4xl font-bold text-foreground md:text-5xl">Author Resources & Publishing Tips</h1>
          <p className="mt-4 text-lg text-muted-foreground">Expert guides and strategies to help your book succeed</p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="rounded-full bg-accent/10 px-3 py-1 text-accent font-medium">{post.category}</span>
                    <span className="text-muted-foreground">{post.readTime}</span>
                  </div>

                  <h2 className="mt-4 text-xl font-bold text-foreground line-clamp-2">{post.title}</h2>
                  <p className="mt-2 flex-1 text-muted-foreground line-clamp-3">{post.excerpt}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <time className="text-sm text-muted-foreground">{new Date(post.date).toLocaleDateString()}</time>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium"
                    >
                      Read More
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
