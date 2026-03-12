import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import StickyCTAButton from "@/components/sticky-cta-button"
import Header from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "JOINTASK - Book Writing, Editing & Marketing Services | Author Support Agency",
  description:
    "Award-winning book agency specializing in ghostwriting, editing, publishing, design, and marketing. We help authors in the US and Europe publish and sell more books. Expert SEO, Amazon KDP, and book cover design.",
  keywords: [
    "book marketing services",
    "ghostwriting services",
    "book editing services",
    "Amazon KDP publishing",
    "book cover design",
    "author marketing",
    "content writing",
    "manuscript editing",
    "book publishing services",
    "author website design",
    "SEO for authors",
    "book promotion",
    "independent publishing",
    "story development",
    "proofreading services",
    "book formatting",
  ],
  authors: [{ name: "JOINTASK" }],
  creator: "JOINTASK",
  publisher: "JOINTASK",
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jointask.com",
    siteName: "JOINTASK - Book Publishing & Marketing Agency",
    title: "JOINTASK - Professional Book Publishing & Marketing Services",
    description:
      "Expert ghostwriting, editing, publishing, and marketing for authors worldwide. Trusted by 100+ companies. Ranked #1 for book services.",
    images: [
      {
        url: "https://jointask.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "JOINTASK - Book Publishing & Marketing Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JOINTASK - Book Publishing & Marketing Services",
    description: "Professional book writing, editing, publishing & marketing for authors",
    images: ["https://jointask.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://jointask.com",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "JOINTASK",
              url: "https://jointask.com",
              logo: "https://jointask.com/logo.png",
              description: "Professional book publishing and marketing agency",
              sameAs: ["https://www.fiverr.com/jointask", "https://www.upwork.com/agencies/~jointask"],
              address: {
                "@type": "PostalAddress",
                addressCountry: "US",
              },
              areaServed: ["US", "GB", "CA", "AU", "IE"],
              serviceType: ["Book Writing", "Book Editing", "Book Publishing", "Book Marketing", "Book Design"],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "JOINTASK",
              description: "Book Publishing & Marketing Agency",
              url: "https://jointask.com",
              telephone: "+1-800-BOOK-123",
              areaServed: ["US", "GB", "CA", "AU", "IE", "Europe"],
              priceRange: "$$",
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Header />
          <StickyCTAButton />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
