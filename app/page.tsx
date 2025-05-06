"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Inter, Orbitron } from 'next/font/google'
import Navigation from "@/components/navigation"
import Portrait from "@/components/portrait"
import CustomCursor from "@/components/custom-cursor"
import AudioPlayer from "@/components/audio-player"
import Section from "@/components/section"
import Particles from "@/components/particle_background"


// Initialize fonts
const orbitron = Orbitron({ 
  subsets: ['latin'],
  variable: '--font-orbitron'
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

// Define colors
const COLORS = {
  primary: 'text-cyan-400',
  secondary: 'text-emerald-400',
  tertiary: 'text-teal-300', // Neon teal tertiary accent
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const sectionsRef = useRef<Record<string, HTMLDivElement | null>>({
    home: null,
    about: null,
    projects: null,
    skills: null,
    contact: null,
  })

  // Handle cursor movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (const section of Object.keys(sectionsRef.current)) {
        const element = sectionsRef.current[section]
        if (!element) continue

        const { offsetTop, offsetHeight } = element
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to section
  const scrollToSection = (section: string) => {
    const element = sectionsRef.current[section]
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      })
    }
  }

  const setSectionRef = (section: string) => (el: HTMLDivElement | null) => {
    sectionsRef.current[section] = el
  }

  return (
    <main className={`relative min-h-screen overflow-x-hidden bg-black text-white ${orbitron.variable} ${inter.variable}`}>
      <CustomCursor position={cursorPosition} />
      
      <div className="fixed inset-0 z-0 flex items-center justify-center">
        <Particles
          particleColors={['#00ffe1', '#00e5ff']}
          particleCount={200}
          particleSpread={10}
          speed={0.15}
          particleBaseSize={200}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={true}
          randomShapes={true}
        />
      </div>

      <div className="flex min-h-screen">
        <Navigation activeSection={activeSection} onNavigate={scrollToSection} />

        <div className="flex-1 overflow-y-auto">
          <Section
            id="home"
            ref={setSectionRef('home')}
            className="flex min-h-screen items-center justify-center"
          >
            <div className="relative z-10 flex flex-col items-center">
              <Portrait />
              <motion.h1
                className={`${COLORS.primary} mt-8 text-5xl font-extrabold font-orbitron md:text-7xl`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                NABANEET GOGOI
              </motion.h1>
              <motion.p
                className={`${COLORS.secondary} mt-4 text-xl font-light font-inter`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                FULL-STACK DEVELOPER
              </motion.p>
              <motion.div
                className="mt-8 flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <button className={`rounded-full border border-cyan-400 bg-black/50 px-6 py-2 ${COLORS.tertiary} backdrop-blur-sm transition-all hover:bg-cyan-900/30 font-orbitron`}>
                  START MISSION
                </button>
                <button className="rounded-full border border-emerald-400 bg-black/50 px-6 py-2 text-emerald-400 backdrop-blur-sm transition-all hover:bg-emerald-900/30 font-orbitron">
                  VIEW LOGS
                </button>
              </motion.div>
            </div>
          </Section>

          <Section id="about" ref={setSectionRef('about')} className="min-h-screen">
            <div className="mx-auto max-w-4xl p-8">
              <h2 className={`mb-8 text-4xl font-bold ${COLORS.tertiary} font-orbitron`}>ABOUT</h2>
              <div className="rounded-lg border border-emerald-900/50 bg-black/40 p-6 backdrop-blur-md">
                <p className="mb-4 text-lg font-inter">
                Hi, I'm Nabaneet Gogoi — a passionate developer from Guwahati, Assam, with a knack for turning complex problems into clean, functional code. Currently pursuing my MCA at Cotton University, I thrive at the crossroads of web development, machine learning, and creative tech.
                </p>
                <p className="mb-4 text-lg font-inter">
                From building a secure, fingerprint-authenticated library management system to exploring protein sequences for Parkinson's detection, my projects reflect both depth and curiosity. Whether I'm developing sleek front-ends in HTML/CSS/JS, crafting intelligent backends with Python and Django, or tinkering with design in After Effects, I bring precision and passion to every line of code.
                </p>
                <p className="text-lg font-inter">
                Off-screen? You'll find me immersed in gaming, exploring automotive tech, or pushing limits at the gym. I believe in learning fast, building real, and always leveling up — just like in any great game.
                </p>
              </div>
            </div>
          </Section>

          <Section id="projects" ref={setSectionRef('projects')} className="min-h-screen">
            <div className="mx-auto max-w-4xl p-8">
              <h2 className={`mb-8 text-4xl font-bold ${COLORS.tertiary} font-orbitron`}>PROJECTS</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="group relative overflow-hidden rounded-lg border border-emerald-900/50 bg-black/40 backdrop-blur-md"
                    whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(16, 185, 129, 0.3)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="aspect-video bg-gradient-to-br from-cyan-900/40 to-emerald-900/40"></div>
                    <div className="p-4">
                      <h3 className={`text-xl font-bold ${COLORS.primary} font-orbitron`}>Project Alpha {i}</h3>
                      <p className="mt-2 text-gray-300 font-inter">A futuristic interface with advanced capabilities.</p>
                      <div className="mt-4 flex gap-2">
                        <span className="rounded-full bg-cyan-900/50 px-3 py-1 text-xs text-cyan-300 font-inter">React</span>
                        <span className="rounded-full bg-emerald-900/50 px-3 py-1 text-xs text-emerald-300 font-inter">
                          Node.js
                        </span>
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80 opacity-0 transition-opacity group-hover:opacity-100">
                      <button className={`rounded-full border border-cyan-400 bg-black/70 px-4 py-2 ${COLORS.tertiary} backdrop-blur-sm font-orbitron`}>
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Section>

          <Section id="skills" ref={setSectionRef('skills')} className="min-h-screen">
            <div className="mx-auto max-w-4xl p-8">
              <h2 className={`mb-8 text-4xl font-bold ${COLORS.tertiary} font-orbitron`}>SKILLS</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border border-emerald-900/50 bg-black/40 p-6 backdrop-blur-md">
                  <h3 className={`mb-4 text-xl font-bold ${COLORS.secondary} font-orbitron`}>FRONTEND</h3>
                  <div className="space-y-4">
                    {["React", "Next.js", "TypeScript", "Tailwind CSS"].map((skill) => (
                      <div key={skill} className="group">
                        <div className="mb-1 flex justify-between font-inter">
                          <span>{skill}</span>
                          <span className="text-emerald-400">90%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-gray-800">
                          <motion.div
                            className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                            initial={{ width: "0%" }}
                            whileInView={{ width: "90%" }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border border-emerald-900/50 bg-black/40 p-6 backdrop-blur-md">
                  <h3 className={`mb-4 text-xl font-bold ${COLORS.secondary} font-orbitron`}>BACKEND</h3>
                  <div className="space-y-4">
                    {["Node.js", "Express", "PostgreSQL", "GraphQL"].map((skill) => (
                      <div key={skill} className="group">
                        <div className="mb-1 flex justify-between font-inter">
                          <span>{skill}</span>
                          <span className="text-emerald-400">85%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-gray-800">
                          <motion.div
                            className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                            initial={{ width: "0%" }}
                            whileInView={{ width: "85%" }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Section id="contact" ref={setSectionRef('contact')} className="min-h-screen">
            <div className="mx-auto max-w-4xl p-8">
              <h2 className={`mb-8 text-4xl font-bold ${COLORS.tertiary} font-orbitron`}>CONTACT</h2>
              <div className="rounded-lg border border-emerald-900/50 bg-black/40 p-6 backdrop-blur-md">
                <form className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-emerald-400 font-orbitron">
                        NAME
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="w-full rounded-md border border-emerald-900/50 bg-black/60 p-3 text-white outline-none focus:border-cyan-400 font-inter"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-emerald-400 font-orbitron">
                        EMAIL
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-full rounded-md border border-emerald-900/50 bg-black/60 p-3 text-white outline-none focus:border-cyan-400 font-inter"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="mb-2 block text-emerald-400 font-orbitron">
                      SUBJECT
                    </label>
                    <input
                      id="subject"
                      type="text"
                      className="w-full rounded-md border border-emerald-900/50 bg-black/60 p-3 text-white outline-none focus:border-cyan-400 font-inter"
                      placeholder="Message subject"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-2 block text-emerald-400 font-orbitron">
                      MESSAGE
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full rounded-md border border-emerald-900/50 bg-black/60 p-3 text-white outline-none focus:border-cyan-400 font-inter"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className={`w-full rounded-md bg-gradient-to-r from-cyan-600 to-emerald-600 py-3 text-lg font-bold font-orbitron ${COLORS.tertiary} transition-all hover:from-cyan-500 hover:to-emerald-500`}
                  >
                    TRANSMIT MESSAGE
                  </button>
                </form>
              </div>
            </div>
          </Section>
        </div>
      </div>

      <AudioPlayer />
    </main>
  )
}
