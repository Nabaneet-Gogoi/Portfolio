"use client"

import { useRef, useCallback } from "react"

export function useSound(soundUrl: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const play = useCallback(() => {
    if (typeof window === "undefined") return

    if (!audioRef.current) {
      audioRef.current = new Audio(soundUrl)
      audioRef.current.volume = 0.2
    }

    // Reset the audio to the beginning if it's already playing
    audioRef.current.currentTime = 0

    // Play the sound
    audioRef.current.play().catch((error) => {
      console.error("Error playing sound:", error)
    })
  }, [soundUrl])

  return play
}
