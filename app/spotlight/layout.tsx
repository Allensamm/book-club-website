import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Spotlight - AI Book Discussions | ReadLoungeClub",
  description: "Join AI-powered book discussions. Upload your book and watch 500 readers discuss it in real-time.",
}

export default function SpotlightLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
