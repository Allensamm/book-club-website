import type { Metadata } from "next"
import GuideForNonAuthorsClient from "./client"

export const metadata: Metadata = {
  title: "Guide for Non-Authors - JOINTASK | Your Publishing Journey",
  description:
    "Your complete guide to becoming a published author. Learn about writing, ghostwriting, editing, book design, and marketing your first book.",
  keywords: [
    "how to write a book",
    "first time author guide",
    "book publishing steps",
    "ghostwriting guide",
    "book marketing for beginners",
  ],
  openGraph: {
    title: "Guide for Non-Authors - Your Complete Publishing Journey",
    description:
      "Step-by-step guide covering the entire publishing process: writing, editing, design, and marketing your book from start to finish.",
    type: "article",
  },
}

export default function GuideForNonAuthorsPage() {
  return <GuideForNonAuthorsClient />
}
