"use client"

import { useRef, useEffect } from "react"
import { motion, useAnimation, useMotionValue } from "framer-motion"
import Image from "next/image"

export default function Portrait() {
  const controls = useAnimation()
  const containerRef = useRef<HTMLDivElement>(null)
  const y = useMotionValue(0)

  // Floating animation
  useEffect(() => {
    controls.start({
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    })
  }, [controls])

  // Parallax tilt effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      const centerX = left + width / 2
      const centerY = top + height / 2

      const deltaX = (e.clientX - centerX) / 25
      const deltaY = (e.clientY - centerY) / 25

      containerRef.current.style.transform = `perspective(1000px) rotateY(${-deltaX}deg) rotateX(${deltaY}deg)`
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      ref={containerRef}
      className="transition-transform duration-300 ease-out"
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        className="relative h-64 w-64 overflow-hidden rounded-full border-2 border-cyan-500 md:h-80 md:w-80"
        style={{ y }}
        animate={controls}
      >
        <div className="absolute inset-0 z-10 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
        <Image
          src="/placeholder.svg?height=320&width=320"
          alt="Portrait"
          width={320}
          height={320}
          className="h-full w-full object-cover"
        />
      </motion.div>
    </div>
  )
}
