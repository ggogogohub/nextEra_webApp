"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart,
  Calendar,
  Clock,
  MessageSquare,
  Settings,
  User,
  Users,
  ArrowRightLeft,
  Zap,
  Shield,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import useStore from "@/lib/store"
import { useAuth } from "@/lib/auth"

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart, roles: ["Employee", "Manager", "Administrator"] },
  { name: "Schedule", href: "/dashboard/schedule", icon: Calendar, roles: ["Employee", "Manager", "Administrator"] },
  { name: "Time Off", href: "/dashboard/time-off", icon: Clock, roles: ["Employee", "Manager", "Administrator"] },
  { name: "Hours History", href: "/dashboard/hours", icon: Clock, roles: ["Employee", "Manager", "Administrator"] },
  {
    name: "Shift Swap",
    href: "/dashboard/schedule/swap",
    icon: ArrowRightLeft,
    roles: ["Employee", "Manager", "Administrator"],
  },
  {
    name: "Messages",
    href: "/dashboard/messages",
    icon: MessageSquare,
    roles: ["Employee", "Manager", "Administrator"],
  },
  { name: "Team", href: "/dashboard/team", icon: Users, roles: ["Employee", "Manager", "Administrator"] },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart, roles: ["Manager", "Administrator"] },
  { name: "AI Generator", href: "/dashboard/schedule/generator", icon: Zap, roles: ["Manager", "Administrator"] },
  { name: "Admin", href: "/dashboard/admin", icon: Shield, roles: ["Administrator"] },
  { name: "Profile", href: "/dashboard/profile", icon: User, roles: ["Employee", "Manager", "Administrator"] },
  { name: "Settings", href: "/dashboard/settings", icon: Settings, roles: ["Employee", "Manager", "Administrator"] },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { currentUser } = useStore()
  const { logout } = useAuth()

  const filteredNavItems = navItems.filter((item) => currentUser && item.roles.includes(currentUser.role))

  return (
    <div className="w-64 border-r h-screen sticky top-0 flex flex-col">
      <div className="p-6">
        <Link href="/" className="text-xl font-medium">
          NextEra
        </Link>
      </div>
      <nav className="flex-1 px-3 py-2 space-y-1">
        {filteredNavItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t space-y-3">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center mr-3">
            {currentUser?.name
              .split(" ")
              .map((n) => n[0])
              .join("") || "U"}
          </div>
          <div>
            <div className="font-medium text-sm">{currentUser?.name}</div>
            <div className="text-xs text-muted-foreground">{currentUser?.role}</div>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full" onClick={logout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  )
}
