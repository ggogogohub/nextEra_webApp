"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import useStore from "./store"

export const useAuth = () => {
  const router = useRouter()
  const { isAuthenticated, currentUser, logout, checkSession } = useStore()

  useEffect(() => {
    // Check session on mount and periodically
    const interval = setInterval(() => {
      if (isAuthenticated && !checkSession()) {
        router.push("/login?expired=true")
      }
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [isAuthenticated, checkSession, router])

  return {
    isAuthenticated,
    currentUser,
    logout: () => {
      logout()
      router.push("/login")
    },
  }
}

export const useRequireAuth = (requiredRole?: string) => {
  const { isAuthenticated, currentUser } = useStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    if (requiredRole && currentUser?.role !== requiredRole) {
      router.push("/dashboard") // Redirect to dashboard if insufficient permissions
      return
    }
  }, [isAuthenticated, currentUser, requiredRole, router])

  return { isAuthenticated, currentUser }
}
