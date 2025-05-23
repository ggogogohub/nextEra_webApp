"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, TrendingDown, Clock, Users, Calendar, AlertTriangle } from "lucide-react"

export default function AnalyticsPage() {
  const weeklyHoursData = [
    { week: "Week 1", scheduled: 40, actual: 38 },
    { week: "Week 2", scheduled: 42, actual: 41 },
    { week: "Week 3", scheduled: 38, actual: 40 },
    { week: "Week 4", scheduled: 45, actual: 43 },
  ]

  const coverageData = [
    { day: "Mon", coverage: 95 },
    { day: "Tue", coverage: 88 },
    { day: "Wed", coverage: 92 },
    { day: "Thu", coverage: 85 },
    { day: "Fri", coverage: 90 },
    { day: "Sat", coverage: 78 },
    { day: "Sun", coverage: 82 },
  ]

  const departmentData = [
    { name: "Customer Support", hours: 320, color: "#8884d8" },
    { name: "Sales", hours: 240, color: "#82ca9d" },
    { name: "Technical", hours: 180, color: "#ffc658" },
    { name: "Management", hours: 120, color: "#ff7300" },
  ]

  const adherenceData = [
    { month: "Jan", onTime: 94, late: 4, noShow: 2 },
    { month: "Feb", onTime: 96, late: 3, noShow: 1 },
    { month: "Mar", onTime: 92, late: 6, noShow: 2 },
    { month: "Apr", onTime: 95, late: 4, noShow: 1 },
    { month: "May", onTime: 93, late: 5, noShow: 2 },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analytics & Reporting</h1>
        <Select defaultValue="last-30-days">
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last-7-days">Last 7 Days</SelectItem>
            <SelectItem value="last-30-days">Last 30 Days</SelectItem>
            <SelectItem value="last-90-days">Last 90 Days</SelectItem>
            <SelectItem value="last-year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Scheduled Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Coverage</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              -3% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Schedule Adherence</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Open Requests</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingDown className="h-3 w-3 mr-1 text-green-500" />
              -2 from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="workforce-metrics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="workforce-metrics">Workforce Metrics</TabsTrigger>
          <TabsTrigger value="schedule-adherence">Schedule Adherence</TabsTrigger>
          <TabsTrigger value="coverage-analysis">Coverage Analysis</TabsTrigger>
          <TabsTrigger value="department-breakdown">Department Breakdown</TabsTrigger>
        </TabsList>

        <TabsContent value="workforce-metrics" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Hours: Scheduled vs Actual</CardTitle>
                <CardDescription>Comparison of planned and actual worked hours</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyHoursData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="scheduled" fill="#8884d8" name="Scheduled" />
                    <Bar dataKey="actual" fill="#82ca9d" name="Actual" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Daily Coverage Percentage</CardTitle>
                <CardDescription>Coverage levels throughout the week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={coverageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis domain={[70, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="coverage" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Key Performance Indicators</CardTitle>
              <CardDescription>Monthly workforce performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Utilization Rate</div>
                  <div className="text-2xl font-bold">89%</div>
                  <div className="text-xs text-muted-foreground">Target: 85%</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Overtime Hours</div>
                  <div className="text-2xl font-bold">124</div>
                  <div className="text-xs text-muted-foreground">-15% from last month</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Employee Satisfaction</div>
                  <div className="text-2xl font-bold">4.2/5</div>
                  <div className="text-xs text-muted-foreground">Based on recent surveys</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule-adherence" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Schedule Adherence Trends</CardTitle>
              <CardDescription>Monthly breakdown of on-time arrivals, late arrivals, and no-shows</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={adherenceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="onTime" stackId="a" fill="#22c55e" name="On Time %" />
                  <Bar dataKey="late" stackId="a" fill="#f59e0b" name="Late %" />
                  <Bar dataKey="noShow" stackId="a" fill="#ef4444" name="No Show %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Adherence by Employee</CardTitle>
                <CardDescription>Top and bottom performers this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Sarah Johnson", adherence: 98, trend: "up" },
                    { name: "Michael Chen", adherence: 96, trend: "up" },
                    { name: "Emma Wilson", adherence: 94, trend: "stable" },
                    { name: "David Rodriguez", adherence: 89, trend: "down" },
                    { name: "Lisa Thompson", adherence: 87, trend: "down" },
                  ].map((employee, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="font-medium">{employee.name}</div>
                      <div className="flex items-center space-x-2">
                        <div className="text-sm">{employee.adherence}%</div>
                        {employee.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                        {employee.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Exception Reports</CardTitle>
                <CardDescription>Recent attendance exceptions requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { employee: "David Rodriguez", issue: "Late arrival", date: "May 26", time: "15 min" },
                    { employee: "Lisa Thompson", issue: "No show", date: "May 25", time: "Full shift" },
                    { employee: "John Smith", issue: "Early departure", date: "May 24", time: "30 min" },
                  ].map((exception, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-2 last:border-0">
                      <div>
                        <div className="font-medium text-sm">{exception.employee}</div>
                        <div className="text-xs text-muted-foreground">
                          {exception.issue} - {exception.date}
                        </div>
                      </div>
                      <div className="text-sm text-red-600">{exception.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="coverage-analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Coverage Heatmap</CardTitle>
              <CardDescription>Visual representation of staffing levels throughout the week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-8 gap-1 text-xs">
                <div className="font-medium">Time</div>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <div key={day} className="font-medium text-center">
                    {day}
                  </div>
                ))}

                {["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"].map((time) => (
                  <>
                    <div key={time} className="font-medium">
                      {time}
                    </div>
                    {[95, 88, 92, 85, 90, 78, 82].map((coverage, index) => (
                      <div
                        key={index}
                        className={`h-8 rounded text-center leading-8 text-white text-xs ${
                          coverage >= 90 ? "bg-green-500" : coverage >= 80 ? "bg-yellow-500" : "bg-red-500"
                        }`}
                      >
                        {coverage}%
                      </div>
                    ))}
                  </>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Critical Coverage Gaps</CardTitle>
                <CardDescription>Times and days with insufficient staffing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { time: "Saturday 2-4 PM", coverage: "65%", impact: "High" },
                    { time: "Thursday 11 AM-1 PM", coverage: "72%", impact: "Medium" },
                    { time: "Sunday 10 AM-12 PM", coverage: "78%", impact: "Medium" },
                  ].map((gap, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-2 last:border-0">
                      <div>
                        <div className="font-medium text-sm">{gap.time}</div>
                        <div className="text-xs text-muted-foreground">Coverage: {gap.coverage}</div>
                      </div>
                      <div
                        className={`text-sm px-2 py-1 rounded ${
                          gap.impact === "High" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {gap.impact}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Actions</CardTitle>
                <CardDescription>AI-suggested improvements for coverage optimization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    "Add 1 additional staff member for Saturday afternoon shifts",
                    "Consider flexible scheduling for Thursday lunch coverage",
                    "Implement cross-training to improve weekend coverage",
                    "Review time-off policies for peak periods",
                  ].map((recommendation, index) => (
                    <div key={index} className="text-sm p-3 bg-blue-50 rounded-md">
                      {recommendation}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="department-breakdown" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Hours by Department</CardTitle>
                <CardDescription>Distribution of scheduled hours across departments</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="hours"
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>Key metrics by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentData.map((dept, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{dept.name}</div>
                        <div className="text-sm text-muted-foreground">{dept.hours} hours</div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center p-2 bg-secondary rounded">
                          <div className="font-medium">Utilization</div>
                          <div>{85 + index * 3}%</div>
                        </div>
                        <div className="text-center p-2 bg-secondary rounded">
                          <div className="font-medium">Adherence</div>
                          <div>{92 + index * 2}%</div>
                        </div>
                        <div className="text-center p-2 bg-secondary rounded">
                          <div className="font-medium">Satisfaction</div>
                          <div>{4.0 + index * 0.1}/5</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
