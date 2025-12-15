import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight } from "lucide-react"

export const metadata = {
  title: "Blog - Literary Circle",
  description: "Articles, insights, and recommendations from our community of readers.",
}

export default function BlogPage() {
  const posts = [
    {
      slug: "power-of-diverse-voices",
      title: "The Power of Diverse Voices in Literature",
      excerpt:
        "Exploring how reading books from different cultures and perspectives enriches our understanding of the human experience.",
      author: "Sarah Mitchell",
      date: "January 15, 2025",
      image: "/diverse-books-on-shelf.jpg",
      category: "Discussion",
    },
    {
      slug: "building-reading-habit",
      title: "Building a Sustainable Reading Habit",
      excerpt: "Practical tips and strategies to help you read more consistently, even with a busy schedule.",
      author: "James Chen",
      date: "January 10, 2025",
      image: "/person-reading-book-cozy-setting.jpg",
      category: "Tips",
    },
    {
      slug: "great-discussions-guide",
      title: "How to Lead Great Book Discussions",
      excerpt: "A guide for facilitators on creating engaging, inclusive conversations about literature.",
      author: "Maria Rodriguez",
      date: "January 5, 2025",
      image: "/book-club-discussion-group.jpg",
      category: "Guide",
    },
    {
      slug: "winter-reading-list",
      title: "10 Cozy Reads for Winter",
      excerpt: "Our curated list of books perfect for cold winter nights and lazy weekend afternoons.",
      author: "Emily Park",
      date: "December 28, 2024",
      image: "/winter-reading-fireplace.jpg",
      category: "Recommendations",
    },
    {
      slug: "impact-of-book-clubs",
      title: "The Social Impact of Book Clubs",
      excerpt: "How book clubs build community, foster empathy, and create meaningful connections in our digital age.",
      author: "David Thompson",
      date: "December 20, 2024",
      image: "/book-club-community-gathering.jpg",
      category: "Discussion",
    },
    {
      slug: "reading-mindfully",
      title: "Reading Mindfully in a Distracted World",
      excerpt: "Techniques for deep reading and how to fully immerse yourself in a book despite modern distractions.",
      author: "Lisa Wong",
      date: "December 15, 2024",
      image: "/mindful-reading-peaceful.jpg",
      category: "Tips",
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 text-primary-foreground md:py-24">
        <div className="absolute inset-0 z-0">
          <img src="/winter-reading-fireplace.jpg" alt="Cozy Reading" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <h1 className="mb-6 text-center font-serif text-4xl font-bold md:text-5xl">The Literary Circle Blog</h1>
          <p className="mx-auto max-w-2xl text-center text-lg text-primary-foreground/90">
            Insights, recommendations, and stories from our community of readers.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-4 inline-block rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground">
            Featured Article
          </div>
          <Card className="overflow-hidden">
            <div className="grid gap-6 md:grid-cols-2">
              <img
                src={posts[0].image || "/placeholder.svg"}
                alt={posts[0].title}
                className="h-full w-full object-cover"
              />
              <CardContent className="flex flex-col justify-center p-6 md:p-8">
                <div className="mb-3 inline-block w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                  {posts[0].category}
                </div>
                <h2 className="mb-4 font-serif text-3xl font-bold">{posts[0].title}</h2>
                <p className="mb-6 text-lg text-muted-foreground">{posts[0].excerpt}</p>
                <div className="mb-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{posts[0].author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{posts[0].date}</span>
                  </div>
                </div>
                <Button asChild className="w-fit bg-accent hover:bg-accent/90">
                  <Link href={`/blog/${posts[0].slug}`}>
                    Read Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 font-serif text-3xl font-bold">Recent Articles</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.slice(1).map((post, index) => (
              <Card key={index} className="flex flex-col overflow-hidden">
                <img src={post.image || "/placeholder.svg"} alt={post.title} className="h-48 w-full object-cover" />
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="mb-3 inline-block w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                    {post.category}
                  </div>
                  <h3 className="mb-3 font-serif text-xl font-bold">{post.title}</h3>
                  <p className="mb-4 flex-1 text-muted-foreground">{post.excerpt}</p>
                  <div className="mb-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <Button asChild variant="ghost" className="w-fit p-0">
                    <Link href={`/blog/${post.slug}`}>
                      Read more <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
