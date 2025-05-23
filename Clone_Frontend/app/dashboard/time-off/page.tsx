"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion } from "framer-motion"
import useStore from "@/lib/store"

export default function TimeOffPage() {
  const { currentUser, timeOffRequests, submitTimeOffRequest, cancelTimeOffRequest } = useStore()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [timeOffType, setTimeOffType] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [reason, setReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const userRequests = timeOffRequests.filter((request) => request.userId === currentUser?.id)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    setSuccess("")

    if (!date || !timeOffType || !startTime || !endTime) {
      setError("Please fill in all required fields")
      setIsSubmitting(false)
      return
    }

    try {
      const success = submitTimeOffRequest({
        dates: date.toLocaleDateString(),
        type: timeOffType,
        reason: reason || undefined,
      })

      if (success) {
        setSuccess("Time off request submitted successfully!")
        // Reset form
        setDate(new Date())
        setTimeOffType("")
        setStartTime("")
        setEndTime("")
        setReason("")
      } else {
        setError("Failed to submit request. Please try again.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = (requestId: string) => {
    const success = cancelTimeOffRequest(requestId)
    if (success) {
      setSuccess("Request cancelled successfully!")
    } else {
      setError("Failed to cancel request.")
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Time Off</h1>
      </div>

      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="request" className="space-y-4">
        <TabsList>
          <TabsTrigger value="request">Request Time Off</TabsTrigger>
          <TabsTrigger value="history">Request History</TabsTrigger>
        </TabsList>

        <TabsContent value="request" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>New Time Off Request</CardTitle>
              <CardDescription>Submit a request for time off. All requests require manager approval.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Select Date(s)</Label>
                    <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Time Off Type *</Label>
                      <Select value={timeOffType} onValueChange={setTimeOffType}>
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vacation">Vacation</SelectItem>
                          <SelectItem value="sick">Sick Leave</SelectItem>
                          <SelectItem value="personal">Personal</SelectItem>
                          <SelectItem value="bereavement">Bereavement</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="start-time">Start Time *</Label>
                        <Select value={startTime} onValueChange={setStartTime}>
                          <SelectTrigger id="start-time">
                            <SelectValue placeholder="Start" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all-day">All Day</SelectItem>
                            <SelectItem value="morning">Morning</SelectItem>
                            <SelectItem value="afternoon">Afternoon</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="end-time">End Time *</Label>
                        <Select value={endTime} onValueChange={setEndTime}>
                          <SelectTrigger id="end-time">
                            <SelectValue placeholder="End" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all-day">All Day</SelectItem>
                            <SelectItem value="morning">Morning</SelectItem>
                            <SelectItem value="afternoon">Afternoon</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reason">Reason (Optional)</Label>
                      <Textarea
                        id="reason"
                        placeholder="Provide additional details if needed"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setDate(new Date())
                    setTimeOffType("")
                    setStartTime("")
                    setEndTime("")
                    setReason("")
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Request History</CardTitle>
              <CardDescription>View all your time off requests and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userRequests.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No time off requests found.</div>
                ) : (
                  userRequests.map((request) => (
                    <div
                      key={request.id}
                      className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="space-y-1">
                        <div className="font-medium">{request.dates}</div>
                        <div className="text-sm text-muted-foreground">{request.type}</div>
                        <div className="text-xs text-muted-foreground">Requested on {request.requestedOn}</div>
                        {request.reason && (
                          <div className="text-xs text-muted-foreground">Reason: {request.reason}</div>
                        )}
                      </div>
                      <div className="flex items-center mt-2 md:mt-0 space-x-2">
                        <div
                          className={`text-sm px-2 py-1 rounded-full ${
                            request.status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : request.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {request.status}
                        </div>
                        {request.status === "Pending" && (
                          <Button variant="outline" size="sm" onClick={() => handleCancel(request.id)}>
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
