"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useSound } from "@/hooks/use-sound"

interface NavigationProps {
  activeSection: string
  onNavigate: (section: string) => void
}

export default function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const playHoverSound = useSound("/sounds/hover.mp3")

  const navItems = [
    { id: "home", label: "HOME" },
    { id: "about", label: "ABOUT" },
    { id: "projects", label: "PROJECTS" },
    { id: "skills", label: "SKILLS" },
    { id: "contact", label: "CONTACT" },
  ]

  const handleHover = (id: string) => {
    setHoveredItem(id)
    playHoverSound()
  }

  return (
    <motion.nav
      className="fixed left-0 top-0 z-50 flex h-screen w-20 flex-col items-center justify-center bg-black/30 backdrop-blur-md md:w-64"
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex h-full flex-col items-center justify-center space-y-12">
        {navItems.map(({ id, label }) => (
          <motion.button
            key={id}
            className={`relative flex w-full items-center justify-center md:justify-start ${
              activeSection === id ? "text-cyan-400" : "text-white"
            }`}
            onClick={() => onNavigate(id)}
            onMouseEnter={() => handleHover(id)}
            onMouseLeave={() => setHoveredItem(null)}
            whileHover={{ scale: 1.05 }}
          >
            <span className="relative z-10 text-lg font-bold md:ml-10 md:text-xl">{label}</span>

            {/* Active indicator */}
            {activeSection === id && (
              <motion.div
                className="absolute left-0 top-1/2 h-0.5 w-2 -translate-y-1/2 bg-cyan-400 md:w-4"
                layoutId="activeIndicator"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}

            {/* Hover glow effect */}
            {(hoveredItem === id || activeSection === id) && (
              <motion.div
                className={`absolute inset-0 rounded-r-full ${
                  activeSection === id ? "bg-cyan-900/20" : "bg-cyan-900/10"
                }`}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0, scaleX: 0 }}
                transition={{ duration: 0.2 }}
                style={{ originX: 0 }}
              />
            )}

            {/* Pulsing glow effect for active item */}
            {activeSection === id && (
              <motion.div
                className="absolute inset-0 rounded-r-full bg-cyan-400/5"
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(34, 211, 238, 0)",
                    "0 0 15px rgba(34, 211, 238, 0.3)",
                    "0 0 0px rgba(34, 211, 238, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </motion.nav>
  )
}
