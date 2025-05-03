"use client"

import type React from "react"

import { forwardRef } from "react"
import { motion } from "framer-motion"

interface SectionProps {
  id: string
  children: React.ReactNode
  className?: string
}

const Section = forwardRef<HTMLDivElement, SectionProps>(({ id, children, className = "" }, ref) => {
  return (
    <motion.section
      id={id}
      ref={ref}
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.section>
  )
})

Section.displayName = "Section"

export default Section
