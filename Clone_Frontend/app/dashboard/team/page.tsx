"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Search, Users, MessageSquare, Calendar, Phone, Mail } from "lucide-react"

export default function TeamPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Manager",
      department: "Customer Support",
      email: "sarah.johnson@company.com",
      phone: "+1 (555) 123-4567",
      status: "online",
      skills: ["Leadership", "Customer Service", "Training"],
      schedule: "Mon-Fri 8:00 AM - 5:00 PM",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Team Lead",
      department: "Customer Support",
      email: "michael.chen@company.com",
      phone: "+1 (555) 234-5678",
      status: "offline",
      skills: ["Team Management", "Technical Support", "Problem Solving"],
      schedule: "Mon-Fri 9:00 AM - 6:00 PM",
    },
    {
      id: 3,
      name: "Emma Wilson",
      role: "HR Specialist",
      department: "Human Resources",
      email: "emma.wilson@company.com",
      phone: "+1 (555) 345-6789",
      status: "online",
      skills: ["Recruitment", "Employee Relations", "Policy Development"],
      schedule: "Mon-Fri 8:30 AM - 5:30 PM",
    },
    {
      id: 4,
      name: "David Rodriguez",
      role: "Customer Service Rep",
      department: "Customer Support",
      email: "david.rodriguez@company.com",
      phone: "+1 (555) 456-7890",
      status: "busy",
      skills: ["Customer Service", "Data Entry", "Phone Support"],
      schedule: "Tue-Sat 10:00 AM - 7:00 PM",
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Customer Service Rep",
      department: "Customer Support",
      email: "lisa.thompson@company.com",
      phone: "+1 (555) 567-8901",
      status: "online",
      skills: ["Customer Service", "Email Support", "Documentation"],
      schedule: "Mon-Fri 9:00 AM - 5:00 PM",
    },
  ]

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "busy":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Team</h1>
        <div className="flex items-center space-x-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>
      </div>

      <Tabs defaultValue="directory" className="space-y-4">
        <TabsList>
          <TabsTrigger value="directory">Team Directory</TabsTrigger>
          <TabsTrigger value="org-chart">Organization Chart</TabsTrigger>
          <TabsTrigger value="coverage">Coverage Status</TabsTrigger>
        </TabsList>

        <TabsContent value="directory" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredMembers.map((member) => (
              <Card key={member.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-background ${getStatusColor(member.status)}`}
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <CardDescription>{member.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="w-4 h-4 mr-2" />
                      {member.department}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Mail className="w-4 h-4 mr-2" />
                      {member.email}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone className="w-4 h-4 mr-2" />
                      {member.phone}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      {member.schedule}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-2">Skills</div>
                    <div className="flex flex-wrap gap-1">
                      {member.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Message
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      Schedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="org-chart" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Organization Structure</CardTitle>
              <CardDescription>Team hierarchy and reporting structure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Manager Level */}
                <div className="text-center">
                  <div className="inline-block p-4 border rounded-lg bg-primary/5">
                    <div className="font-medium">Sarah Johnson</div>
                    <div className="text-sm text-muted-foreground">Manager</div>
                  </div>
                </div>

                {/* Team Lead Level */}
                <div className="flex justify-center">
                  <div className="w-px h-8 bg-border"></div>
                </div>
                <div className="text-center">
                  <div className="inline-block p-4 border rounded-lg bg-secondary/50">
                    <div className="font-medium">Michael Chen</div>
                    <div className="text-sm text-muted-foreground">Team Lead</div>
                  </div>
                </div>

                {/* Employee Level */}
                <div className="flex justify-center">
                  <div className="w-px h-8 bg-border"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {teamMembers
                    .filter((m) => m.role === "Customer Service Rep")
                    .map((member) => (
                      <div key={member.id} className="text-center">
                        <div className="p-3 border rounded-lg">
                          <div className="font-medium text-sm">{member.name}</div>
                          <div className="text-xs text-muted-foreground">{member.role}</div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* HR - Separate Branch */}
                <div className="mt-8 text-center">
                  <div className="inline-block p-4 border rounded-lg bg-accent/50">
                    <div className="font-medium">Emma Wilson</div>
                    <div className="text-sm text-muted-foreground">HR Specialist</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coverage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Coverage Status</CardTitle>
              <CardDescription>Real-time team availability and coverage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">4</div>
                    <div className="text-sm text-muted-foreground">Online</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">1</div>
                    <div className="text-sm text-muted-foreground">Busy</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-gray-600">0</div>
                    <div className="text-sm text-muted-foreground">Offline</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium">Current Shift Coverage</h3>
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span
                            className={`absolute bottom-0 right-0 h-2 w-2 rounded-full ring-1 ring-background ${getStatusColor(member.status)}`}
                          />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{member.name}</div>
                          <div className="text-xs text-muted-foreground">{member.role}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium capitalize">{member.status}</div>
                        <div className="text-xs text-muted-foreground">{member.schedule}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
