"use client"

import { useState } from "react"
import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New schedule published", time: "2 hours ago" },
    { id: 2, message: "Your time-off request was approved", time: "Yesterday" },
    { id: 3, message: "Team meeting reminder: Friday 2 PM", time: "Yesterday" },
  ])

  return (
    <header className="border-b p-4 flex items-center justify-between">
      <div className="flex items-center w-full max-w-sm">
        <Search className="w-4 h-4 mr-2 text-muted-foreground" />
        <Input placeholder="Search..." className="border-none shadow-none focus-visible:ring-0" />
      </div>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 transform translate-x-1 -translate-y-1" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="flex flex-col items-start py-2">
                <span>{notification.message}</span>
                <span className="text-xs text-muted-foreground">{notification.time}</span>
              </DropdownMenuItem>
            ))}
            {notifications.length === 0 && <DropdownMenuItem disabled>No new notifications</DropdownMenuItem>}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-sm">View all notifications</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
