"use client"

import { motion } from "framer-motion"

interface CustomCursorProps {
  position: { x: number; y: number }
}

export default function CustomCursor({ position }: CustomCursorProps) {
  return (
    <>
      {/* Outer cursor */}
      <motion.div
        className="pointer-events-none fixed z-50 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400 mix-blend-difference"
        animate={{
          x: position.x,
          y: position.y,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
          mass: 0.5,
        }}
      />

      {/* Inner cursor */}
      <motion.div
        className="pointer-events-none fixed z-50 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 mix-blend-difference"
        animate={{
          x: position.x,
          y: position.y,
        }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 500,
          mass: 0.2,
        }}
      />

      {/* Cursor trail */}
      <motion.div
        className="pointer-events-none fixed z-40 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 mix-blend-screen"
        animate={{
          x: position.x,
          y: position.y,
          opacity: [0.2, 0],
          scale: [0.5, 1.5],
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
      />
    </>
  )
}
