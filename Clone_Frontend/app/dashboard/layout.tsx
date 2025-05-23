import type { ReactNode } from "react"
import Sidebar from "@/components/dashboard/sidebar"
import Header from "@/components/dashboard/header"
import SessionManager from "@/components/session-manager"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SessionManager />
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </>
  )
}
