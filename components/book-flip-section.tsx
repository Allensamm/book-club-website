"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { BookOpen, Users, Heart, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BookFlipSection() {
  const [currentPage, setCurrentPage] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [showSwipeHint, setShowSwipeHint] = useState(false)
  const totalPages = 4

  const minSwipeDistance = 50

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    if (isMobile) {
      setShowSwipeHint(true)
      const timer = setTimeout(() => {
        setShowSwipeHint(false)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [])

  const pages = [
    {
      title: "Our Story",
      icon: BookOpen,
      content:
        "ReadLoungeClub began with a simple belief: that books have the power to connect us, challenge us, and help us grow. What started as a small gathering of readers has blossomed into a vibrant community of thousands.",
    },
    {
      title: "How It Works",
      icon: Users,
      content:
        "Each month, we carefully select a book that sparks curiosity. Members read at their own pace, then come together for thoughtful discussions online and in person. No pressure, just genuine conversation and shared discovery.",
    },
    {
      title: "What You'll Find",
      icon: Heart,
      content:
        "More than just book discussions, you'll discover a welcoming space where diverse perspectives are celebrated. Access exclusive author events, early book reveals, and a community that truly listens.",
    },
    {
      title: "Join the Journey",
      icon: Sparkles,
      content:
        "Whether you're a lifelong reader or rediscovering your love of books, there's a place for you here. Start your reading journey with a community that celebrates every story and every voice.",
    },
  ]

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      handleNext()
    }
    if (isRightSwipe) {
      handlePrevious()
    }
  }

  return (
    <section className="relative py-32 md:py-48 overflow-hidden bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-balance md:text-4xl">Discover ReadLoungeClub</h2>
        </div>

        <div className="relative mx-auto max-w-4xl" style={{ height: "500px" }}>
          {showSwipeHint && (
            <div className="absolute inset-0 z-[60] flex items-center justify-center pointer-events-none md:hidden">
              <div className="relative animate-swipe">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-accent drop-shadow-lg"
                >
                  <path
                    d="M18 11V6C18 4.34315 16.6569 3 15 3C13.3431 3 12 4.34315 12 6M12 6V4C12 2.34315 10.6569 1 9 1C7.34315 1 6 2.34315 6 4V9M12 6V9M12 9V14M12 9C12 7.34315 10.6569 6 9 6C7.34315 6 6 7.34315 6 9M6 9V18C6 20.2091 7.79086 22 10 22H12.5C15.5376 22 18 19.5376 18 16.5V11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="absolute -right-16 top-1/2 -translate-y-1/2 flex items-center gap-1 animate-swipe-arrow">
                  <ChevronLeft className="h-8 w-8 text-accent" />
                  <ChevronLeft className="h-8 w-8 text-accent -ml-6" />
                </div>
              </div>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-50 h-12 w-12 rounded-full bg-accent/20 hover:bg-accent/30 text-accent disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={handlePrevious}
            disabled={currentPage === 0}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-50 h-12 w-12 rounded-full bg-accent/20 hover:bg-accent/30 text-accent disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            aria-label="Next page"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          <div
            className="relative h-full"
            style={{ perspective: "2000px" }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {pages.map((page, index) => {
              const isFlipped = index < currentPage
              const isCurrent = index === currentPage
              const rotateY = isFlipped ? -180 : 0
              const zIndex = isCurrent ? totalPages : totalPages - index
              const opacity = isCurrent ? 1 : 0
              const pointerEvents = isCurrent ? "auto" : "none"

              return (
                <div
                  key={index}
                  className="absolute inset-0 transition-all duration-700 ease-in-out"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${rotateY}deg)`,
                    transformOrigin: "left center",
                    zIndex,
                    opacity,
                    pointerEvents,
                  }}
                >
                  {/* Front of page */}
                  <div
                    className="absolute inset-0 rounded-r-2xl shadow-2xl bg-card p-8 md:p-12 flex flex-col justify-center border-l-4 border-accent"
                    style={{
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent">
                      <page.icon className="h-8 w-8" />
                    </div>
                    <h3 className="mb-6 font-serif text-3xl md:text-4xl font-bold text-balance">{page.title}</h3>
                    <p className="text-lg md:text-xl leading-relaxed text-foreground/90">{page.content}</p>
                    <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
                      <span>
                        Page {index + 1} of {totalPages}
                      </span>
                    </div>
                  </div>

                  {/* Back of page */}
                  <div
                    className="absolute inset-0 rounded-l-2xl shadow-2xl bg-muted/50"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  />
                </div>
              )
            })}

            {/* Book base */}
            <div
              className="absolute inset-0 rounded-2xl bg-card shadow-xl border-2 border-border"
              style={{ zIndex: -1 }}
            />
          </div>
        </div>

        {/* Page indicators */}
        <div className="mt-12 flex justify-center gap-2">
          {pages.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentPage
                  ? "bg-accent w-8"
                  : index < currentPage
                    ? "bg-accent/50 w-2"
                    : "bg-muted-foreground/30 w-2"
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes swipe {
          0%, 100% {
            transform: translateX(0);
            opacity: 1;
          }
          50% {
            transform: translateX(-40px);
            opacity: 0.6;
          }
        }
        @keyframes swipe-arrow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
        .animate-swipe {
          animation: swipe 2s ease-in-out infinite;
        }
        .animate-swipe-arrow {
          animation: swipe-arrow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
