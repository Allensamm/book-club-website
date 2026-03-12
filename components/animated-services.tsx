"use client"

import { useEffect, useState } from "react"

const services = [
  "Google Ads",
  "Facebook Ads",
  "Amazon Ads",
  "Email Campaigns",
  "Book Promotions",
  "Author Branding",
  "Content Marketing",
]

export default function AnimatedServices() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="inline-block px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-semibold">
      <span>We are all you need to succeed in </span>
      <div className="relative inline-block w-32 h-6 overflow-hidden align-middle">
        <div
          className="absolute left-0 transition-all duration-500 ease-in-out"
          style={{
            transform: `translateY(${-currentIndex * 24}px)`,
          }}
        >
          {services.map((service, idx) => (
            <div key={idx} className="h-6 flex items-center">
              {service}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
