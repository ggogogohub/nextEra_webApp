"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { Clock, TrendingUp, Download, CalendarIcon } from "lucide-react"

export default function WorkedHoursPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedPeriod, setSelectedPeriod] = useState("current-month")

  const hoursData = [
    { date: "May 22, 2023", scheduled: 8, actual: 8, overtime: 0, status: "Complete" },
    { date: "May 23, 2023", scheduled: 8, actual: 7.5, overtime: 0, status: "Complete" },
    { date: "May 24, 2023", scheduled: 8, actual: 8.5, overtime: 0.5, status: "Complete" },
    { date: "May 25, 2023", scheduled: 8, actual: 8, overtime: 0, status: "Complete" },
    { date: "May 26, 2023", scheduled: 8, actual: 8, overtime: 0, status: "Complete" },
  ]

  const summaryStats = {
    totalScheduled: 168,
    totalWorked: 164.5,
    totalOvertime: 4.5,
    averageDaily: 8.2,
    adherenceRate: 98,
  }

  const monthlyData = [
    { month: "January", scheduled: 176, worked: 172, overtime: 8 },
    { month: "February", scheduled: 160, worked: 158, overtime: 6 },
    { month: "March", scheduled: 184, worked: 180, overtime: 12 },
    { month: "April", scheduled: 168, worked: 165, overtime: 5 },
    { month: "May", scheduled: 168, worked: 164.5, overtime: 4.5 },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Worked Hours History</h1>
        <div className="flex items-center space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-month">Current Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              <SelectItem value="year-to-date">Year to Date</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Scheduled</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryStats.totalScheduled}h</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Worked</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryStats.totalWorked}h</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              {summaryStats.totalWorked - summaryStats.totalScheduled > 0 ? "+" : ""}
              {summaryStats.totalWorked - summaryStats.totalScheduled}h vs scheduled
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Overtime Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryStats.totalOvertime}h</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Adherence Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryStats.adherenceRate}%</div>
            <p className="text-xs text-muted-foreground">Schedule adherence</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="daily" className="space-y-4">
        <TabsList>
          <TabsTrigger value="daily">Daily View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="summary">Monthly Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Hours Breakdown</CardTitle>
              <CardDescription>Detailed view of your daily worked hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hoursData.map((day, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div className="space-y-1">
                      <div className="font-medium">{day.date}</div>
                      <div className="text-sm text-muted-foreground">Status: {day.status}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-sm text-muted-foreground">Scheduled</div>
                        <div className="font-medium">{day.scheduled}h</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Actual</div>
                        <div className="font-medium">{day.actual}h</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Overtime</div>
                        <div className="font-medium">{day.overtime}h</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Select Date
                </CardTitle>
                <CardDescription>Choose a date to view detailed hours</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hours for Selected Date</CardTitle>
                <CardDescription>{date?.toLocaleDateString() || "No date selected"}</CardDescription>
              </CardHeader>
              <CardContent>
                {date && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold">8.0</div>
                        <div className="text-sm text-muted-foreground">Scheduled Hours</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold">8.0</div>
                        <div className="text-sm text-muted-foreground">Actual Hours</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Clock In:</span>
                        <span className="font-medium">9:00 AM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Clock Out:</span>
                        <span className="font-medium">5:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Break Time:</span>
                        <span className="font-medium">1 hour</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Overtime:</span>
                        <span className="font-medium">0 hours</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Hours Summary</CardTitle>
              <CardDescription>Overview of your hours worked each month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.map((month, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div className="font-medium">{month.month}</div>
                    <div className="grid grid-cols-3 gap-6 text-center">
                      <div>
                        <div className="text-sm text-muted-foreground">Scheduled</div>
                        <div className="font-medium">{month.scheduled}h</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Worked</div>
                        <div className="font-medium">{month.worked}h</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Overtime</div>
                        <div className="font-medium">{month.overtime}h</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Year-to-Date Statistics</CardTitle>
              <CardDescription>Your performance metrics for the current year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold">856</div>
                  <div className="text-sm text-muted-foreground">Total Hours Worked</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold">35.5</div>
                  <div className="text-sm text-muted-foreground">Total Overtime</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold">96%</div>
                  <div className="text-sm text-muted-foreground">Average Adherence</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
