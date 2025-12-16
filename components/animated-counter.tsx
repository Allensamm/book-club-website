"use client"

import { useEffect, useRef, useState } from "react"

interface AnimatedCounterProps {
  end: number
  suffix?: string
  label: string
  duration?: number
}

export function AnimatedCounter({ end, suffix = "", label, duration = 2000 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const counterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)

          // Animation logic
          const startTime = Date.now()
          const endTime = startTime + duration

          const updateCount = () => {
            const now = Date.now()
            const progress = Math.min((now - startTime) / duration, 1)

            // Easing function for smooth animation
            const easeOutQuad = (t: number) => t * (2 - t)
            const easedProgress = easeOutQuad(progress)

            const currentCount = Math.floor(easedProgress * end)
            setCount(currentCount)

            if (now < endTime) {
              requestAnimationFrame(updateCount)
            } else {
              setCount(end)
            }
          }

          requestAnimationFrame(updateCount)
        }
      },
      { threshold: 0.5 },
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current)
      }
    }
  }, [end, duration, hasAnimated])

  return (
    <div ref={counterRef} className="text-center">
      <div className="mb-2 font-serif text-4xl font-bold text-accent md:text-5xl">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-muted-foreground">{label}</div>
    </div>
  )
}
