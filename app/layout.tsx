import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Orbitron } from "next/font/google"

// Initialize the Orbitron font
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
})

export const metadata: Metadata = {
  title: "Futuristic Portfolio",
  description: "A portfolio website designed like a futuristic video game main menu",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={orbitron.className}>{children}</body>
    </html>
  )
}
