import Hero from "@/components/hero"
import Services from "@/components/services"
import Portfolio from "@/components/portfolio"
import CTA from "@/components/cta"
import Footer from "@/components/footer"
import Pricing from "@/components/pricing"
import TrustedBy from "@/components/trusted-by"

export const metadata = {
  title: "JOINTASK - Book Writing, Editing & Marketing Services | Expert Author Support",
  description:
    "Professional book agency offering ghostwriting, editing, publishing, design, and marketing. Help your book reach readers in the US and Europe. Trusted by 100+ companies.",
  keywords: [
    "book writing services",
    "book editing services",
    "book marketing",
    "ghostwriting",
    "Amazon KDP",
    "book publishing",
  ],
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background">
      <Hero />
      <TrustedBy />
      <Services />
      <Pricing />
      <Portfolio />
      <CTA />
      <Footer />
    </main>
  )
}
