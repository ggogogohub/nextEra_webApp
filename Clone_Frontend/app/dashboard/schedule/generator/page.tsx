"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { Zap, Settings, Users, Clock, AlertTriangle, CheckCircle } from "lucide-react"

export default function ScheduleGeneratorPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generationComplete, setGenerationComplete] = useState(false)

  const [constraints, setConstraints] = useState({
    staffingLevels: {
      monday: { min: 3, max: 5 },
      tuesday: { min: 3, max: 5 },
      wednesday: { min: 4, max: 6 },
      thursday: { min: 4, max: 6 },
      friday: { min: 5, max: 7 },
      saturday: { min: 2, max: 4 },
      sunday: { min: 2, max: 3 },
    },
    operatingHours: {
      weekdays: { start: "08:00", end: "18:00" },
      weekends: { start: "10:00", end: "16:00" },
    },
    skillRequirements: [
      { skill: "Customer Service", required: 2 },
      { skill: "Technical Support", required: 1 },
      { skill: "Team Lead", required: 1 },
    ],
  })

  const employees = [
    { id: 1, name: "John Doe", skills: ["Customer Service"], availability: "Full-time", maxHours: 40 },
    {
      id: 2,
      name: "Sarah Johnson",
      skills: ["Customer Service", "Team Lead"],
      availability: "Full-time",
      maxHours: 40,
    },
    {
      id: 3,
      name: "Michael Chen",
      skills: ["Technical Support", "Team Lead"],
      availability: "Full-time",
      maxHours: 40,
    },
    { id: 4, name: "Emma Wilson", skills: ["Customer Service"], availability: "Part-time", maxHours: 20 },
    {
      id: 5,
      name: "David Rodriguez",
      skills: ["Customer Service", "Technical Support"],
      availability: "Full-time",
      maxHours: 40,
    },
  ]

  const conflicts = [
    { type: "Availability", employee: "Emma Wilson", details: "Not available Sundays" },
    { type: "Skill Gap", details: "Need 1 more Technical Support on Friday" },
    { type: "Overtime", employee: "John Doe", details: "Scheduled for 42 hours" },
  ]

  const handleGenerateSchedule = async () => {
    setIsGenerating(true)
    setGenerationProgress(0)
    setGenerationComplete(false)

    // Simulate AI schedule generation
    const steps = [
      "Analyzing employee availability...",
      "Processing skill requirements...",
      "Optimizing shift assignments...",
      "Checking for conflicts...",
      "Finalizing schedule...",
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setGenerationProgress((i + 1) * 20)
    }

    setIsGenerating(false)
    setGenerationComplete(true)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">AI Schedule Generator</h1>
        <Button onClick={handleGenerateSchedule} disabled={isGenerating}>
          <Zap className="w-4 h-4 mr-2" />
          {isGenerating ? "Generating..." : "Generate Schedule"}
        </Button>
      </div>

      {isGenerating && (
        <Card>
          <CardHeader>
            <CardTitle>Generating Schedule...</CardTitle>
            <CardDescription>AI is optimizing your workforce schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={generationProgress} className="w-full" />
              <div className="text-sm text-muted-foreground text-center">
                {generationProgress}% complete - Estimated time: {Math.max(0, 5 - Math.floor(generationProgress / 20))}{" "}
                seconds
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {generationComplete && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <CheckCircle className="h-5 w-5" />
              Schedule Generated Successfully
            </CardTitle>
            <CardDescription className="text-green-700">
              Your optimized schedule has been created in 4.2 seconds
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Button>View Schedule</Button>
              <Button variant="outline">Download PDF</Button>
              <Button variant="outline">Publish Schedule</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="constraints" className="space-y-4">
        <TabsList>
          <TabsTrigger value="constraints">Constraints</TabsTrigger>
          <TabsTrigger value="employees">Employee Pool</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="conflicts">Conflict Detection</TabsTrigger>
        </TabsList>

        <TabsContent value="constraints" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Staffing Requirements
                </CardTitle>
                <CardDescription>Set minimum and maximum staffing levels for each day</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(constraints.staffingLevels).map(([day, levels]) => (
                  <div key={day} className="flex items-center justify-between">
                    <Label className="capitalize font-medium">{day}</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        value={levels.min}
                        className="w-16"
                        onChange={(e) => {
                          const value = Number.parseInt(e.target.value)
                          setConstraints((prev) => ({
                            ...prev,
                            staffingLevels: {
                              ...prev.staffingLevels,
                              [day]: { ...prev.staffingLevels[day], min: value },
                            },
                          }))
                        }}
                      />
                      <span className="text-sm text-muted-foreground">to</span>
                      <Input
                        type="number"
                        value={levels.max}
                        className="w-16"
                        onChange={(e) => {
                          const value = Number.parseInt(e.target.value)
                          setConstraints((prev) => ({
                            ...prev,
                            staffingLevels: {
                              ...prev.staffingLevels,
                              [day]: { ...prev.staffingLevels[day], max: value },
                            },
                          }))
                        }}
                      />
                      <span className="text-sm text-muted-foreground">staff</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Operating Hours
                </CardTitle>
                <CardDescription>Define business hours for schedule generation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Weekdays (Monday - Friday)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="time"
                      value={constraints.operatingHours.weekdays.start}
                      onChange={(e) => {
                        setConstraints((prev) => ({
                          ...prev,
                          operatingHours: {
                            ...prev.operatingHours,
                            weekdays: { ...prev.operatingHours.weekdays, start: e.target.value },
                          },
                        }))
                      }}
                    />
                    <span className="text-sm text-muted-foreground">to</span>
                    <Input
                      type="time"
                      value={constraints.operatingHours.weekdays.end}
                      onChange={(e) => {
                        setConstraints((prev) => ({
                          ...prev,
                          operatingHours: {
                            ...prev.operatingHours,
                            weekdays: { ...prev.operatingHours.weekdays, end: e.target.value },
                          },
                        }))
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Weekends (Saturday - Sunday)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="time"
                      value={constraints.operatingHours.weekends.start}
                      onChange={(e) => {
                        setConstraints((prev) => ({
                          ...prev,
                          operatingHours: {
                            ...prev.operatingHours,
                            weekends: { ...prev.operatingHours.weekends, start: e.target.value },
                          },
                        }))
                      }}
                    />
                    <span className="text-sm text-muted-foreground">to</span>
                    <Input
                      type="time"
                      value={constraints.operatingHours.weekends.end}
                      onChange={(e) => {
                        setConstraints((prev) => ({
                          ...prev,
                          operatingHours: {
                            ...prev.operatingHours,
                            weekends: { ...prev.operatingHours.weekends, end: e.target.value },
                          },
                        }))
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Skill Requirements</CardTitle>
              <CardDescription>Specify required skills and minimum coverage levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {constraints.skillRequirements.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="font-medium">{skill.skill}</div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Minimum:</span>
                      <Input
                        type="number"
                        value={skill.required}
                        className="w-16"
                        onChange={(e) => {
                          const value = Number.parseInt(e.target.value)
                          setConstraints((prev) => ({
                            ...prev,
                            skillRequirements: prev.skillRequirements.map((item, i) =>
                              i === index ? { ...item, required: value } : item,
                            ),
                          }))
                        }}
                      />
                      <span className="text-sm text-muted-foreground">per shift</span>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  Add Skill Requirement
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employees" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Available Employees
              </CardTitle>
              <CardDescription>Employee pool for schedule generation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employees.map((employee) => (
                  <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="font-medium">{employee.name}</div>
                      <div className="flex space-x-2">
                        {employee.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="text-sm font-medium">{employee.availability}</div>
                      <div className="text-sm text-muted-foreground">Max: {employee.maxHours}h/week</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Schedule Templates</CardTitle>
              <CardDescription>Save and reuse constraint configurations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded-lg">
                  <div className="font-medium mb-2">Standard Weekday</div>
                  <div className="text-sm text-muted-foreground mb-3">
                    Mon-Fri: 8AM-6PM, 4-6 staff, all skills covered
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      Load
                    </Button>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="font-medium mb-2">Weekend Coverage</div>
                  <div className="text-sm text-muted-foreground mb-3">Sat-Sun: 10AM-4PM, 2-3 staff, basic coverage</div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      Load
                    </Button>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="template-name">Save Current Configuration</Label>
                <div className="flex space-x-2">
                  <Input id="template-name" placeholder="Template name" />
                  <Button>Save Template</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conflicts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Conflict Detection
              </CardTitle>
              <CardDescription>Identify and resolve scheduling conflicts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conflicts.map((conflict, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg border-yellow-200 bg-yellow-50"
                  >
                    <div className="space-y-1">
                      <div className="font-medium text-yellow-800">{conflict.type}</div>
                      <div className="text-sm text-yellow-700">
                        {conflict.employee && `${conflict.employee}: `}
                        {conflict.details}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Resolve
                      </Button>
                      <Button size="sm" variant="outline">
                        Ignore
                      </Button>
                    </div>
                  </div>
                ))}
                {conflicts.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No conflicts detected. Your constraints are compatible.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alternative Solutions</CardTitle>
              <CardDescription>AI-suggested alternatives when conflicts are detected</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-md">
                  <div className="font-medium text-blue-800">Suggestion 1</div>
                  <div className="text-sm text-blue-700">
                    Reduce Friday maximum staff from 7 to 6 to avoid overtime for John Doe
                  </div>
                </div>
                <div className="p-3 bg-blue-50 rounded-md">
                  <div className="font-medium text-blue-800">Suggestion 2</div>
                  <div className="text-sm text-blue-700">
                    Cross-train Emma Wilson in Technical Support to improve Friday coverage
                  </div>
                </div>
                <div className="p-3 bg-blue-50 rounded-md">
                  <div className="font-medium text-blue-800">Suggestion 3</div>
                  <div className="text-sm text-blue-700">Hire 1 additional part-time Technical Support specialist</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
