"use client"
import { useRef } from "react"

export const World = ({ data, globeConfig }: any) => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
      {/* Main globe sphere */}
      <div
        className="relative w-64 h-64 md:w-96 md:h-96"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${globeConfig.globeColor || "#0066cc"}, ${globeConfig.emissive || "#000033"})`,
          animation: "float 3s ease-in-out infinite",
          boxShadow: `0 0 40px ${globeConfig.ambientLight || "#38bdf8"}80, inset -20px -20px 40px rgba(0, 0, 0, 0.5)`,
        }}
      >
        {/* Latitude lines */}
        <div className="absolute inset-0 rounded-full border-4 border-cyan-500 opacity-20"></div>
        <div
          className="absolute inset-1/4 left-0 right-0 border-4 border-cyan-500 opacity-20"
          style={{ borderRadius: "50%", top: "50%", transform: "translateY(-50%)" }}
        ></div>
      </div>

      {/* Rotating rings */}
      <div
        className="absolute inset-0 rounded-full border border-cyan-400 opacity-30"
        style={{
          animation: "spin 20s linear infinite",
        }}
      ></div>

      {/* Arc connections visualization */}
      {data &&
        data.slice(0, 5).map((arc: any, idx: number) => (
          <div
            key={idx}
            className="absolute rounded-full"
            style={{
              width: "100%",
              height: "100%",
              border: `2px solid ${arc.color || "#3b82f6"}`,
              opacity: 0.4,
              animation: `pulse ${2 + idx * 0.5}s ease-in-out infinite`,
              borderRadius: "50%",
              transform: `rotateX(${arc.startLat}deg) rotateY(${arc.startLng}deg)`,
            }}
          ></div>
        ))}

      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-full blur-xl opacity-50"
        style={{
          background: `radial-gradient(circle, ${globeConfig.ambientLight || "#38bdf8"} 0%, transparent 70%)`,
        }}
      ></div>
    </div>
  )
}
