"use client"

import { useState, useEffect } from "react"
import { X, MessageCircle } from "lucide-react"

export default function StickyCTAButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 300px down
      if (window.scrollY > 300 && !isDismissed) {
        setIsVisible(true)
      } else if (window.scrollY <= 300) {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isDismissed])

  const handleClick = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
  }

  if (!isVisible || isDismissed) return null

  return (
    <div className="fixed bottom-8 right-8 z-40 animate-fade-in-up">
      <div className="relative">
        {/* Main CTA Button */}
        <button
          onClick={handleClick}
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-full font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 active:scale-95 group"
        >
          <MessageCircle size={20} className="group-hover:animate-bounce" />
          <span className="hidden sm:inline">Tell us what you want</span>
          <span className="sm:hidden">Get Started</span>
        </button>

        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          className="absolute -top-2 -right-2 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 rounded-full p-1 shadow-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>

        {/* Pulse animation ring */}
        <div className="absolute inset-0 bg-orange-500/30 rounded-full animate-pulse -z-10"></div>
      </div>
    </div>
  )
}
