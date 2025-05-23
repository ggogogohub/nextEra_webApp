"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function SchedulePage() {
  const [view, setView] = useState("week")

  // Mock schedule data
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ]

  const scheduleData = [
    { day: "Monday", start: "9:00 AM", end: "5:00 PM", role: "Customer Service" },
    { day: "Tuesday", start: "10:00 AM", end: "6:00 PM", role: "Customer Service" },
    { day: "Thursday", start: "9:00 AM", end: "5:00 PM", role: "Team Lead" },
  ]

  const isScheduled = (day: string, time: string) => {
    return scheduleData.some((shift) => shift.day === day && time >= shift.start && time <= shift.end)
  }

  const getShiftRole = (day: string) => {
    const shift = scheduleData.find((shift) => shift.day === day)
    return shift ? shift.role : null
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Schedule</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Previous
          </Button>
          <div className="font-medium">May 27 - June 2, 2023</div>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>

      <Tabs value={view} onValueChange={setView} className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
          <Button variant="outline">Request Swap</Button>
        </div>

        <TabsContent value="day" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monday, May 27</CardTitle>
              <CardDescription>Your schedule for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeSlots.map((time) => (
                  <div key={time} className="flex items-center border-b pb-2 last:border-0 last:pb-0">
                    <div className="w-20 text-sm">{time}</div>
                    <div
                      className={`flex-1 h-12 rounded-md flex items-center px-3 ${
                        isScheduled("Monday", time)
                          ? "bg-primary/10 text-primary"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {isScheduled("Monday", time) ? getShiftRole("Monday") : "Unscheduled"}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="week" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Week View</CardTitle>
              <CardDescription>May 27 - June 2, 2023</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-8 gap-2">
                <div className="col-span-1"></div>
                {weekDays.map((day) => (
                  <div key={day} className="col-span-1 text-center font-medium">
                    {day}
                  </div>
                ))}

                {timeSlots.map((time) => (
                  <>
                    <div key={time} className="col-span-1 text-sm text-right pr-2 py-2">
                      {time}
                    </div>
                    {weekDays.map((day) => (
                      <div
                        key={`${day}-${time}`}
                        className={`col-span-1 h-10 rounded-md ${
                          isScheduled(day, time) ? "bg-primary/10 text-primary" : "bg-secondary/50"
                        }`}
                      >
                        {isScheduled(day, time) && time === "9:00 AM" && (
                          <div className="text-xs p-1">{getShiftRole(day)}</div>
                        )}
                      </div>
                    ))}
                  </>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="month" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Month View</CardTitle>
              <CardDescription>May 2023</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <div key={day} className="text-center font-medium text-sm py-2">
                    {day}
                  </div>
                ))}

                {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
                  <div
                    key={date}
                    className={`h-24 border rounded-md p-2 ${[1, 3, 9].includes(date) ? "border-primary" : ""}`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-sm">{date}</span>
                      {[1, 3, 9].includes(date) && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                    </div>
                    {[1, 3, 9].includes(date) && (
                      <div className="mt-2 text-xs bg-primary/10 text-primary p-1 rounded">9AM - 5PM</div>
                    )}
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
