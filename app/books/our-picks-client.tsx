"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { BookOpen, Headphones, Download } from "lucide-react"
import { useState } from "react"
import { useMembership } from "@/components/membership-provider"
import { useRouter } from "next/navigation"

const books = [
  {
    title: "The Evening Garden",
    author: "Sarah Mitchell",
    month: "January 2025",
    image: "/book-evening-garden.jpg",
    summary:
      "A captivating tale of family secrets and redemption set in a small coastal town. When Emma returns to her childhood home, she discovers a hidden garden that holds the key to her grandmother's mysterious past.",
    genre: "Contemporary Fiction",
  },
  {
    title: "Whispers in the Wind",
    author: "Michael Chen",
    month: "February 2025",
    image: "/book-whispers-wind.jpg",
    summary:
      "An epic journey through time as three generations navigate love, loss, and the power of memory. A beautifully woven narrative that explores how our past shapes our present.",
    genre: "Historical Fiction",
  },
  {
    title: "The Last Bookshop",
    author: "Elena Rodriguez",
    month: "March 2025",
    image: "/book-last-bookshop.jpg",
    summary:
      "In a world where physical books are becoming extinct, one woman fights to save her family's century-old bookshop and rediscover the magic of storytelling in a digital age.",
    genre: "Contemporary Fiction",
  },
  {
    title: "Midnight in Paris",
    author: "James Patterson",
    month: "April 2025",
    image: "/book-midnight-paris.jpg",
    summary:
      "A thrilling mystery set in the heart of Paris where an art historian uncovers a conspiracy that connects stolen masterpieces across three centuries.",
    genre: "Mystery & Thriller",
  },
  {
    title: "The Ocean Between Us",
    author: "Amara Johnson",
    month: "May 2025",
    image: "/book-ocean-between.jpg",
    summary:
      "Two sisters separated by an ocean must reconcile their differences and uncover the truth about their mother's disappearance twenty years ago.",
    genre: "Family Drama",
  },
  {
    title: "Songs of the Forest",
    author: "Kenji Yamamoto",
    month: "June 2025",
    image: "/book-songs-forest.jpg",
    summary:
      "A lyrical exploration of nature and humanity as a young botanist discovers an ancient forest that may hold the cure to a devastating illness.",
    genre: "Literary Fiction",
  },
  {
    title: "The Silver Thread",
    author: "Rebecca Thompson",
    month: "July 2025",
    image: "/book-silver-thread.jpg",
    summary:
      "A seamstress in Victorian London stumbles upon a magical needle that can sew together not just fabric, but the very fabric of time itself.",
    genre: "Historical Fantasy",
  },
  {
    title: "Beyond the Horizon",
    author: "Marcus Williams",
    month: "August 2025",
    image: "/book-beyond-horizon.jpg",
    summary:
      "An astronaut's journey of self-discovery on a solo mission to Mars becomes a meditation on what it means to be human in the vastness of space.",
    genre: "Science Fiction",
  },
  {
    title: "The Memory Keeper",
    author: "Priya Patel",
    month: "September 2025",
    image: "/book-memory-keeper.jpg",
    summary:
      "In a small Indian village, an elderly woman with an extraordinary gift for remembering helps villagers recover their lost memories and forgotten dreams.",
    genre: "Magical Realism",
  },
  {
    title: "Winter's Promise",
    author: "Anna Bergman",
    month: "October 2025",
    image: "/book-winters-promise.jpg",
    summary:
      "A Swedish family saga spanning three generations, exploring themes of resilience, tradition, and the unbreakable bonds that hold us together through the harshest winters.",
    genre: "Family Saga",
  },
  {
    title: "The Forgotten Letters",
    author: "David Lawson",
    month: "November 2025",
    image: "/book-forgotten-letters.jpg",
    summary:
      "When a postal worker discovers a cache of undelivered letters from World War II, he embarks on a mission to deliver them and reunite lost loves.",
    genre: "Historical Fiction",
  },
  {
    title: "Echoes of Tomorrow",
    author: "Lisa Zhang",
    month: "December 2024",
    image: "/book-echoes-tomorrow.jpg",
    summary:
      "A thought-provoking novel about artificial intelligence and consciousness as a programmer forms an unexpected bond with her creation.",
    genre: "Science Fiction",
  },
  {
    title: "The Painter's Daughter",
    author: "Sophia Martinez",
    month: "November 2024",
    image: "/book-painters-daughter.jpg",
    summary:
      "Following her famous father's death, an artist must decide between preserving his legacy or forging her own path in the competitive art world.",
    genre: "Contemporary Fiction",
  },
  {
    title: "Beneath the Surface",
    author: "Thomas Anderson",
    month: "October 2024",
    image: "/book-beneath-surface.jpg",
    summary:
      "A marine biologist discovers an underwater civilization that challenges everything we know about evolution and human history.",
    genre: "Adventure",
  },
  {
    title: "The Tea House Chronicles",
    author: "Mei Lin",
    month: "September 2024",
    image: "/book-tea-house.jpg",
    summary:
      "Five women from different walks of life find solace, friendship, and transformation in a traditional tea house in modern-day Shanghai.",
    genre: "Contemporary Fiction",
  },
  {
    title: "Shadows and Light",
    author: "Benjamin Cooper",
    month: "August 2024",
    image: "/book-shadows-light.jpg",
    summary:
      "A photographer's quest to capture the perfect image leads him on a journey through the most remote corners of the world and into his own soul.",
    genre: "Literary Fiction",
  },
  {
    title: "The Clockmaker's Secret",
    author: "Victoria Black",
    month: "July 2024",
    image: "/book-clockmakers-secret.jpg",
    summary:
      "In 1920s London, a clockmaker creates a device that can manipulate time, but soon discovers that every second borrowed must be repaid.",
    genre: "Steampunk",
  },
  {
    title: "River of Stars",
    author: "Kofi Mensah",
    month: "June 2024",
    image: "/book-river-stars.jpg",
    summary:
      "A sweeping African epic following three families across a century as their destinies intertwine along the banks of a mighty river.",
    genre: "Historical Fiction",
  },
  {
    title: "The Language of Flowers",
    author: "Grace Sullivan",
    month: "May 2024",
    image: "/book-language-flowers.jpg",
    summary:
      "A florist with the ability to communicate through flower arrangements helps people express what words cannot in this heartwarming contemporary tale.",
    genre: "Contemporary Romance",
  },
  {
    title: "Desert Winds",
    author: "Fatima Al-Rashid",
    month: "April 2024",
    image: "/book-desert-winds.jpg",
    summary:
      "Set in the Arabian Peninsula, this powerful novel explores the clash between tradition and modernity through the eyes of a young woman seeking her voice.",
    genre: "Cultural Fiction",
  },
]

export default function OurPicksClientPage() {
  const [selectedBook, setSelectedBook] = useState<any>(null)
  const { isMember } = useMembership()
  const router = useRouter()

  const handleAction = (actionType: "audio" | "pdf" | "hardcover") => {
    if (!isMember) {
      router.push("/register")
      return
    }

    // If member, perform the action
    switch (actionType) {
      case "audio":
        console.log("[v0] Starting audiobook playback for:", selectedBook.title)
        alert(`Starting audiobook: ${selectedBook.title}`)
        break
      case "pdf":
        console.log("[v0] Downloading PDF for:", selectedBook.title)
        alert(`Downloading PDF: ${selectedBook.title}`)
        // Simulate download
        break
      case "hardcover":
        console.log("[v0] Redirecting to order hardcover for:", selectedBook.title)
        alert(`Redirecting to order: ${selectedBook.title}`)
        // Redirect to external bookstore
        break
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 text-white md:py-24">
        <div className="absolute inset-0 z-0">
          <img src="/diverse-books-on-shelf.jpg" alt="Book Collection" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-accent/80" />
        </div>
        <div className="container relative z-10 mx-auto max-w-4xl px-4">
          <h1 className="mb-6 text-center font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
            Discover Our Latest Picks
          </h1>
          <p className="text-center text-lg leading-relaxed text-white/90 md:text-xl">
            Stories That Spark Wonder, Inspire Curiosity, And Bring Us Together
          </p>
        </div>
      </section>

      {/* Books Grid Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold">The Stories We're Reading</h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Click on any book to learn more and access your reading options
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {books.map((book, index) => (
              <Card
                key={index}
                className="group cursor-pointer overflow-hidden transition-all hover:shadow-xl"
                onClick={() => setSelectedBook(book)}
              >
                <div className="relative">
                  <img
                    src={book.image || "/placeholder.svg?height=400&width=300"}
                    alt={book.title}
                    className="h-[350px] w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                      {book.month}
                    </div>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <h3 className="mb-1 font-serif text-lg font-bold text-balance">{book.title}</h3>
                  <p className="text-sm text-muted-foreground">By {book.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Book Modal */}
      <Dialog open={!!selectedBook} onOpenChange={() => setSelectedBook(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          {selectedBook && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-3xl">{selectedBook.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="md:col-span-1">
                    <img
                      src={selectedBook.image || "/placeholder.svg?height=400&width=300"}
                      alt={selectedBook.title}
                      className="w-full rounded-lg shadow-lg"
                    />
                    <div className="mt-4 space-y-2 text-sm">
                      <p>
                        <span className="font-semibold">Genre:</span> {selectedBook.genre}
                      </p>
                      <p>
                        <span className="font-semibold">Pick Month:</span> {selectedBook.month}
                      </p>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="mb-4">
                      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        Author
                      </h3>
                      <p className="text-xl font-semibold">{selectedBook.author}</p>
                    </div>
                    <div className="mb-6">
                      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        Summary
                      </h3>
                      <p className="leading-relaxed text-muted-foreground">{selectedBook.summary}</p>
                    </div>
                    <div>
                      {!isMember && (
                        <div className="mb-4 rounded-lg border border-accent/50 bg-accent/10 p-4">
                          <p className="text-sm text-muted-foreground">
                            Become a member to access audiobooks, PDFs, and order hardcovers
                          </p>
                        </div>
                      )}
                      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        Start Reading
                      </h3>
                      <div className="flex flex-col gap-3">
                        <Button
                          className="w-full justify-start gap-3 bg-accent hover:bg-accent/90"
                          onClick={() => handleAction("audio")}
                        >
                          <Headphones className="h-5 w-5" />
                          Listen to Audiobook
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start gap-3 bg-transparent"
                          onClick={() => handleAction("pdf")}
                        >
                          <Download className="h-5 w-5" />
                          Download PDF
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start gap-3 bg-transparent"
                          onClick={() => handleAction("hardcover")}
                        >
                          <BookOpen className="h-5 w-5" />
                          Order Hardcover
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
