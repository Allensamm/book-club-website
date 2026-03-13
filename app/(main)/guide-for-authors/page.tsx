import type { Metadata } from "next"
import GuideForAuthorsClient from "./client"

export const metadata: Metadata = {
  title: "Guide for Authors - JOINTASK | 10 Steps to Book Sales Expert",
  description:
    "Learn the 10 essential steps to become a book sales expert. From finding your niche to mastering Amazon advertising and building your author platform.",
  keywords: [
    "book marketing guide",
    "author marketing strategy",
    "book sales tips",
    "amazon advertising for authors",
    "author platform",
  ],
  openGraph: {
    title: "Guide for Authors - 10 Steps to Book Sales Success",
    description:
      "Master book marketing with our comprehensive 10-step guide covering niche selection, keywords, reader targeting, websites, and more.",
    type: "article",
  },
}

export default function GuideForAuthorsPage() {
  return <GuideForAuthorsClient />
}
