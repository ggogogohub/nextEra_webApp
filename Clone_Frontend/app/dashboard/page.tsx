"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { BarChart, Clock, Users } from "lucide-react"
import { motion } from "framer-motion"

export default function Dashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button>Request Time Off</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38.5</div>
            <p className="text-xs text-muted-foreground">+2.5 hours from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Team Coverage</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">+2% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 time-off, 1 shift swap</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="schedule" className="space-y-4">
        <TabsList>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>
        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Schedule</CardTitle>
              <CardDescription>View and manage your upcoming shifts</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Shifts</CardTitle>
              <CardDescription>Your next 3 scheduled shifts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { date: "Monday, May 27", time: "9:00 AM - 5:00 PM", role: "Customer Service" },
                  { date: "Tuesday, May 28", time: "10:00 AM - 6:00 PM", role: "Customer Service" },
                  { date: "Thursday, May 30", time: "9:00 AM - 5:00 PM", role: "Team Lead" },
                ].map((shift, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                    <div>
                      <div className="font-medium">{shift.date}</div>
                      <div className="text-sm text-muted-foreground">{shift.time}</div>
                    </div>
                    <div className="text-sm bg-secondary px-2 py-1 rounded-full">{shift.role}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Time-Off Requests</CardTitle>
              <CardDescription>Manage your time-off requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { date: "June 15-18, 2023", reason: "Vacation", status: "Approved" },
                  { date: "July 3, 2023", reason: "Personal", status: "Pending" },
                  { date: "July 24, 2023", reason: "Medical", status: "Pending" },
                ].map((request, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                    <div>
                      <div className="font-medium">{request.date}</div>
                      <div className="text-sm text-muted-foreground">{request.reason}</div>
                    </div>
                    <div
                      className={`text-sm px-2 py-1 rounded-full ${
                        request.status === "Approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {request.status}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Messages</CardTitle>
              <CardDescription>Recent communications from your team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    sender: "Sarah Johnson",
                    role: "Manager",
                    message: "Team meeting scheduled for Friday at 2 PM to discuss the new scheduling system.",
                    time: "2 hours ago",
                  },
                  {
                    sender: "Operations",
                    role: "System",
                    message: "New schedule for June has been published. Please review and confirm your shifts.",
                    time: "Yesterday",
                  },
                  {
                    sender: "Michael Chen",
                    role: "Team Lead",
                    message:
                      "Looking for someone to cover my shift on Tuesday, May 28. Please let me know if you're available.",
                    time: "2 days ago",
                  },
                ].map((message, index) => (
                  <div key={index} className="border-b pb-3 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center mb-1">
                      <div className="font-medium">
                        {message.sender} <span className="text-xs text-muted-foreground">({message.role})</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{message.time}</div>
                    </div>
                    <p className="text-sm">{message.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
