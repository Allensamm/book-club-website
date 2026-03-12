"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, Sun, Moon } from "lucide-react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
    e.preventDefault()
    setIsOpen(false)

    if (pathname === "/") {
      // On homepage - scroll directly to section
      const element = document.querySelector(anchor)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      // Not on homepage - navigate to home with anchor
      router.push(`/?${anchor.slice(1)}`)
      setTimeout(() => {
        const element = document.querySelector(anchor)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    }
  }

  const handleCTAClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsOpen(false)

    if (pathname === "/") {
      const contactSection = document.getElementById("contact")
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      router.push("/?contact")
      setTimeout(() => {
        const contactSection = document.getElementById("contact")
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border animate-fade-in-down">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between bg-gradient-to-r from-primary/5 to-accent/5 rounded-b-lg">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image src="/jointask-logo.png" alt="JOINTASK Agency" width={50} height={50} className="h-12 w-auto" />
          <span className="text-xl font-bold text-foreground hidden sm:inline">JOINTASK</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <a
            href="#services"
            onClick={(e) => handleAnchorClick(e, "#services")}
            className="text-foreground hover:text-primary transition-colors duration-300 cursor-pointer"
          >
            Services
          </a>
          <a
            href="#portfolio"
            onClick={(e) => handleAnchorClick(e, "#portfolio")}
            className="text-foreground hover:text-primary transition-colors duration-300 cursor-pointer"
          >
            Portfolio
          </a>
          <Link href="/blog" className="text-foreground hover:text-primary transition-colors duration-300">
            Blog
          </Link>
          <Link href="/guide-for-authors" className="text-foreground hover:text-primary transition-colors duration-300">
            Guide for Authors
          </Link>
          <Link
            href="/guide-for-non-authors"
            className="text-foreground hover:text-primary transition-colors duration-300"
          >
            Guide for Non-Authors
          </Link>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-md text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 hidden dark:block" />
            <Moon className="h-5 w-5 block dark:hidden" />
          </button>
          <Button
            onClick={handleCTAClick}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white transition-all hover:shadow-lg active:scale-95 whitespace-nowrap"
          >
            Talk to us
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden transition-transform" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border md:hidden animate-slide-in-down">
            <div className="flex flex-col gap-4 p-4">
              <a
                href="#services"
                onClick={(e) => handleAnchorClick(e, "#services")}
                className="text-foreground hover:text-primary transition-colors cursor-pointer"
              >
                Services
              </a>
              <a
                href="#portfolio"
                onClick={(e) => handleAnchorClick(e, "#portfolio")}
                className="text-foreground hover:text-primary transition-colors cursor-pointer"
              >
                Portfolio
              </a>
              <Link href="/blog" className="text-foreground hover:text-primary transition-colors">
                Blog
              </Link>
              <Link href="/guide-for-authors" className="text-foreground hover:text-primary transition-colors pl-2">
                Guide for Authors
              </Link>
              <Link href="/guide-for-non-authors" className="text-foreground hover:text-primary transition-colors pl-2">
                Guide for Non-Authors
              </Link>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
              >
                <Sun className="h-5 w-5 hidden dark:block" />
                <Moon className="h-5 w-5 block dark:hidden" />
                <span className="dark:hidden">Dark Mode</span>
                <span className="hidden dark:inline">Light Mode</span>
              </button>
              <Button
                onClick={handleCTAClick}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
              >
                Talk to us
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
