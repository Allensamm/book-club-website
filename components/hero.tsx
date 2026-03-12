"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import AnimatedServices from "./animated-services"

export default function Hero() {
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-white">
      {/* Background curved stripes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Left stripe - Orange to Yellow gradient */}
        <div className="absolute -top-40 -left-40 w-96 h-screen bg-gradient-to-br from-orange-400 via-orange-500 to-yellow-400 rounded-full blur-3xl opacity-70 rotate-45" />

        {/* Right stripe - Green to Cyan gradient */}
        <div className="absolute -top-20 -right-32 w-80 h-96 bg-gradient-to-bl from-green-400 via-emerald-500 to-cyan-400 rounded-full blur-3xl opacity-60 -rotate-45" />

        {/* Curved bottom stripe - Yellow to green transition */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-64 bg-gradient-to-r from-yellow-300 via-lime-400 to-green-500 rounded-t-full blur-2xl opacity-40" />
      </div>

      {/* Floating orbs */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute top-32 left-20 w-12 h-12 bg-cyan-400 rounded-full blur-xl opacity-60"
      />

      <motion.div
        animate={{ y: [0, 30, 0], x: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-1/3 right-32 w-8 h-8 bg-pink-400 rounded-full blur-lg opacity-50"
      />

      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-40 w-10 h-10 bg-red-300 rounded-full blur-lg opacity-40"
      />

      <motion.div
        animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.5 }}
        className="absolute top-1/4 left-1/3 w-6 h-6 bg-blue-300 rounded-full blur-md opacity-50"
      />

      {/* Content */}
      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        <div className="animate-fade-in-up">
          <AnimatedServices />
        </div>

        <h1
          className="text-5xl md:text-7xl font-bold text-slate-900 text-balance animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          Amplify Your Book's Reach
        </h1>

        <p
          className="text-xl md:text-2xl text-slate-700 max-w-2xl mx-auto text-balance leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          Strategic ad campaigns across Google, Facebook, Amazon, and Instagram combined with stunning author websites
          to connect your stories with readers worldwide.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <Button
            size="lg"
            onClick={() => handleScrollToSection("contact")}
            className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer transition-all"
          >
            Start Your Project <ArrowRight className="ml-2" size={20} />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => handleScrollToSection("portfolio")}
            className="transition-all hover:shadow-lg hover:scale-105 active:scale-95 bg-white border-slate-300 cursor-pointer"
          >
            View Our Work
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 pt-8 sm:pt-16 border-t border-slate-200 mt-8 sm:mt-16">
          {[
            { value: "200+", label: "Authors Helped", delay: "0.4s" },
            { value: "500M+", label: "Ad Impressions", delay: "0.5s" },
            { value: "$50M+", label: "Sales Generated", delay: "0.6s" },
          ].map((stat, idx) => (
            <div key={idx} className="animate-fade-in-up py-4 sm:py-0" style={{ animationDelay: stat.delay }}>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-600">{stat.value}</div>
              <div className="text-xs sm:text-sm text-slate-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
