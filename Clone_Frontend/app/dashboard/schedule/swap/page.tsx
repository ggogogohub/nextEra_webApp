"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { Calendar, Clock, User, ArrowRightLeft } from "lucide-react"

export default function ShiftSwapPage() {
  const [selectedShift, setSelectedShift] = useState<string | null>(null)

  const myShifts = [
    { id: "1", date: "Monday, May 29", time: "9:00 AM - 5:00 PM", role: "Customer Service", canSwap: true },
    { id: "2", date: "Tuesday, May 30", time: "10:00 AM - 6:00 PM", role: "Customer Service", canSwap: true },
    { id: "3", date: "Thursday, June 1", time: "9:00 AM - 5:00 PM", role: "Team Lead", canSwap: false },
  ]

  const availableSwaps = [
    {
      id: "1",
      requester: "David Rodriguez",
      originalShift: { date: "Wednesday, May 31", time: "2:00 PM - 10:00 PM", role: "Customer Service" },
      requestedShift: { date: "Monday, May 29", time: "9:00 AM - 5:00 PM", role: "Customer Service" },
      reason: "Family appointment",
      status: "pending",
    },
    {
      id: "2",
      requester: "Lisa Thompson",
      originalShift: { date: "Friday, June 2", time: "8:00 AM - 4:00 PM", role: "Customer Service" },
      requestedShift: { date: "Tuesday, May 30", time: "10:00 AM - 6:00 PM", role: "Customer Service" },
      reason: "Personal commitment",
      status: "pending",
    },
  ]

  const mySwapRequests = [
    {
      id: "1",
      targetEmployee: "Michael Chen",
      myShift: { date: "Monday, May 29", time: "9:00 AM - 5:00 PM", role: "Customer Service" },
      theirShift: { date: "Wednesday, May 31", time: "9:00 AM - 5:00 PM", role: "Customer Service" },
      status: "pending",
      requestedOn: "May 25, 2023",
    },
  ]

  const eligibleEmployees = [
    { id: "1", name: "David Rodriguez", role: "Customer Service Rep", availability: "Available" },
    { id: "2", name: "Lisa Thompson", role: "Customer Service Rep", availability: "Available" },
    { id: "3", name: "Michael Chen", role: "Team Lead", availability: "Busy" },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Shift Swap</h1>
        <Button>Request New Swap</Button>
      </div>

      <Tabs defaultValue="available" className="space-y-4">
        <TabsList>
          <TabsTrigger value="available">Available Swaps</TabsTrigger>
          <TabsTrigger value="my-requests">My Requests</TabsTrigger>
          <TabsTrigger value="propose">Propose Swap</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Shift Swaps</CardTitle>
              <CardDescription>Colleagues looking to swap shifts with you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableSwaps.map((swap) => (
                  <div key={swap.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {swap.requester
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{swap.requester}</div>
                          <div className="text-sm text-muted-foreground">Wants to swap shifts</div>
                        </div>
                      </div>
                      <Badge variant="outline">{swap.status}</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="text-sm font-medium">They offer:</div>
                        <div className="p-3 bg-green-50 rounded-md">
                          <div className="flex items-center text-sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            {swap.originalShift.date}
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="w-4 h-4 mr-2" />
                            {swap.originalShift.time}
                          </div>
                          <div className="flex items-center text-sm">
                            <User className="w-4 h-4 mr-2" />
                            {swap.originalShift.role}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm font-medium">They want:</div>
                        <div className="p-3 bg-blue-50 rounded-md">
                          <div className="flex items-center text-sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            {swap.requestedShift.date}
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="w-4 h-4 mr-2" />
                            {swap.requestedShift.time}
                          </div>
                          <div className="flex items-center text-sm">
                            <User className="w-4 h-4 mr-2" />
                            {swap.requestedShift.role}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      <strong>Reason:</strong> {swap.reason}
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm">Accept Swap</Button>
                      <Button size="sm" variant="outline">
                        Decline
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my-requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Swap Requests</CardTitle>
              <CardDescription>Track the status of your shift swap requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mySwapRequests.map((request) => (
                  <div key={request.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {request.targetEmployee
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Swap with {request.targetEmployee}</div>
                          <div className="text-sm text-muted-foreground">Requested on {request.requestedOn}</div>
                        </div>
                      </div>
                      <Badge variant={request.status === "pending" ? "outline" : "default"}>{request.status}</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Your shift:</div>
                        <div className="p-3 bg-red-50 rounded-md">
                          <div className="flex items-center text-sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            {request.myShift.date}
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="w-4 h-4 mr-2" />
                            {request.myShift.time}
                          </div>
                          <div className="flex items-center text-sm">
                            <User className="w-4 h-4 mr-2" />
                            {request.myShift.role}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm font-medium">Their shift:</div>
                        <div className="p-3 bg-green-50 rounded-md">
                          <div className="flex items-center text-sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            {request.theirShift.date}
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="w-4 h-4 mr-2" />
                            {request.theirShift.time}
                          </div>
                          <div className="flex items-center text-sm">
                            <User className="w-4 h-4 mr-2" />
                            {request.theirShift.role}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Cancel Request
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="propose" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Select Your Shift</CardTitle>
                <CardDescription>Choose which of your shifts you want to swap</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {myShifts.map((shift) => (
                    <div
                      key={shift.id}
                      onClick={() => shift.canSwap && setSelectedShift(shift.id)}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedShift === shift.id
                          ? "border-primary bg-primary/5"
                          : shift.canSwap
                            ? "hover:bg-secondary/50"
                            : "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{shift.date}</div>
                          <div className="text-sm text-muted-foreground">{shift.time}</div>
                          <div className="text-sm text-muted-foreground">{shift.role}</div>
                        </div>
                        {!shift.canSwap && <Badge variant="secondary">Cannot Swap</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Eligible Colleagues</CardTitle>
                <CardDescription>Team members who can cover your shift</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {eligibleEmployees.map((employee) => (
                    <div key={employee.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {employee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-muted-foreground">{employee.role}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={employee.availability === "Available" ? "default" : "secondary"}>
                          {employee.availability}
                        </Badge>
                        <Button size="sm" disabled={!selectedShift || employee.availability !== "Available"}>
                          <ArrowRightLeft className="w-4 h-4 mr-1" />
                          Propose
                        </Button>
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
