"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import useStore from "@/lib/store"

export default function SessionManager() {
  const { isAuthenticated, logout, updateLastActivity, checkSession } = useStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) return

    // Update activity on user interactions
    const handleActivity = () => {
      updateLastActivity()
    }

    // Add event listeners for user activity
    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart", "click"]
    events.forEach((event) => {
      document.addEventListener(event, handleActivity, true)
    })

    // Check session every minute
    const sessionInterval = setInterval(() => {
      if (!checkSession()) {
        logout()
        router.push("/login?expired=true")
      }
    }, 60000) // Check every minute

    // Cleanup
    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity, true)
      })
      clearInterval(sessionInterval)
    }
  }, [isAuthenticated, updateLastActivity, checkSession, logout, router])

  return null
}
