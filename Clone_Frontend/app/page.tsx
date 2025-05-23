"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(1)
  const totalSlides = 3

  const slides = [
    {
      id: 1,
      title: "Syncing fast-moving workforces with fast-moving businesses.",
      description: "AI-powered workforce management for the modern enterprise.",
    },
    {
      id: 2,
      title: "Intelligent scheduling that adapts to your needs.",
      description: "Our AI algorithms optimize staffing while respecting employee preferences.",
    },
    {
      id: 3,
      title: "Empower your team with self-service tools.",
      description: "Give employees control over their schedules while maintaining operational excellence.",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev % totalSlides) + 1)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleNext = () => {
    setCurrentSlide((prev) => (prev % totalSlides) + 1)
  }

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 1 ? totalSlides : prev - 1))
  }

  const formatSlideNumber = (num: number) => {
    return num.toString().padStart(3, "0")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="fixed top-0 left-0 w-full p-6 z-10 flex justify-between items-center">
        <Link href="/" className="text-xl font-medium">
          NextEra
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/features" className="hover:underline">
            Features
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          <Link href="/login">
            <Button variant="outline" className="rounded-full px-6">
              Login
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 relative">
        {slides.map((slide) => (
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: currentSlide === slide.id ? 1 : 0,
              y: currentSlide === slide.id ? 0 : 20,
            }}
            transition={{ duration: 0.5 }}
            className="absolute max-w-2xl text-center"
            style={{ display: currentSlide === slide.id ? "block" : "none" }}
          >
            <h1 className="text-4xl md:text-5xl font-medium mb-6">{slide.title}</h1>
            <p className="text-lg text-muted-foreground">{slide.description}</p>
          </motion.div>
        ))}

        <div className="fixed bottom-6 left-0 w-full flex justify-between items-center px-6">
          <div className="slide-counter text-sm">
            [ {formatSlideNumber(currentSlide)} / {formatSlideNumber(totalSlides)} ]
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={handlePrev} className="rounded-full h-10 w-10 p-0">
              ←
            </Button>
            <Button variant="ghost" onClick={handleNext} className="rounded-full h-10 w-10 p-0">
              →
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
