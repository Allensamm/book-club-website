"use client"

export default function TrustedBy() {
  const logos = [
    { name: "Fiverr", size: "h-12" },
    { name: "Upwork", size: "h-12" },
    { name: "Companies Around the World", size: "h-10" },
    { name: "Fiverr", size: "h-12" },
    { name: "Upwork", size: "h-12" },
    { name: "Companies Around the World", size: "h-10" },
  ]

  return (
    <section className="w-full py-12 md:py-16 bg-accent text-accent-foreground border-y border-border">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl md:text-5xl font-black mb-8 tracking-tight text-balance leading-tight">
          Trusted by Industry Leaders Worldwide
        </h2>

        {/* Scrolling container */}
        <div className="overflow-hidden">
          <div className="flex gap-8 md:gap-12 animate-scroll">
            {/* Fiverr Logo */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <svg className="h-12 w-auto" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="20" y="40" fontSize="32" fontWeight="bold" fill="currentColor">
                  Fiverr
                </text>
              </svg>
            </div>

            {/* Upwork Logo */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <svg className="h-12 w-auto" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="20" y="40" fontSize="32" fontWeight="bold" fill="currentColor">
                  Upwork
                </text>
              </svg>
            </div>

            {/* Global Companies Badge */}
            <div className="flex-shrink-0 flex items-center justify-center px-4 py-2 bg-white/20 rounded-lg">
              <span className="text-sm font-semibold">100+ Companies Worldwide</span>
            </div>

            {/* Duplicate for seamless loop */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <svg className="h-12 w-auto" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="20" y="40" fontSize="32" fontWeight="bold" fill="currentColor">
                  Fiverr
                </text>
              </svg>
            </div>

            <div className="flex-shrink-0 flex items-center justify-center">
              <svg className="h-12 w-auto" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="20" y="40" fontSize="32" fontWeight="bold" fill="currentColor">
                  Upwork
                </text>
              </svg>
            </div>

            <div className="flex-shrink-0 flex items-center justify-center px-4 py-2 bg-white/20 rounded-lg">
              <span className="text-sm font-semibold">100+ Companies Worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
