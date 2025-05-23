"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import useStore from "@/lib/store"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "Employee" | "Manager" | "Administrator"
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, currentUser } = useStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    if (requiredRole && currentUser?.role !== requiredRole && currentUser?.role !== "Administrator") {
      router.push("/dashboard")
      return
    }
  }, [isAuthenticated, currentUser, requiredRole, router])

  if (!isAuthenticated) {
    return <div>Loading...</div>
  }

  if (requiredRole && currentUser?.role !== requiredRole && currentUser?.role !== "Administrator") {
    return <div>Access Denied</div>
  }

  return <>{children}</>
}
