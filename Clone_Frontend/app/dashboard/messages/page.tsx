"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState<string | null>("sarah")

  const contacts = [
    { id: "sarah", name: "Sarah Johnson", role: "Manager", status: "online" },
    { id: "michael", name: "Michael Chen", role: "Team Lead", status: "offline" },
    { id: "emma", name: "Emma Wilson", role: "HR", status: "online" },
    { id: "operations", name: "Operations", role: "System", status: "online" },
  ]

  const messages = {
    sarah: [
      {
        sender: "Sarah Johnson",
        content: "Hi there! Just checking in on your schedule for next week.",
        time: "10:30 AM",
      },
      { sender: "You", content: "Hi Sarah, I've reviewed it and everything looks good!", time: "10:35 AM" },
      {
        sender: "Sarah Johnson",
        content:
          "Great! Also, we have a team meeting scheduled for Friday at 2 PM to discuss the new scheduling system.",
        time: "10:38 AM",
      },
      { sender: "You", content: "Thanks for letting me know. I'll be there.", time: "10:40 AM" },
    ],
    michael: [
      {
        sender: "Michael Chen",
        content: "Hey, I'm looking for someone to cover my shift on Tuesday, May 28. Are you available?",
        time: "Yesterday",
      },
      {
        sender: "You",
        content: "I might be able to help. Let me check my schedule and get back to you.",
        time: "Yesterday",
      },
    ],
    emma: [
      {
        sender: "Emma Wilson",
        content: "Hello! Just a reminder that your annual performance review is scheduled for next month.",
        time: "Monday",
      },
      { sender: "You", content: "Thanks for the reminder, Emma. Is there anything I should prepare?", time: "Monday" },
      {
        sender: "Emma Wilson",
        content:
          "Just come prepared to discuss your achievements and goals for the next year. I'll send you a template next week.",
        time: "Monday",
      },
    ],
    operations: [
      {
        sender: "Operations",
        content: "New schedule for June has been published. Please review and confirm your shifts.",
        time: "Yesterday",
      },
      { sender: "Operations", content: "Your time-off request for June 15-18 has been approved.", time: "2 days ago" },
    ],
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Messages</h1>
      </div>

      <Tabs defaultValue="direct" className="space-y-4">
        <TabsList>
          <TabsTrigger value="direct">Direct Messages</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>

        <TabsContent value="direct" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Contacts</CardTitle>
                <CardDescription>Your team and colleagues</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => setActiveChat(contact.id)}
                    className={`flex items-center p-2 rounded-md cursor-pointer ${
                      activeChat === contact.id ? "bg-secondary" : "hover:bg-secondary/50"
                    }`}
                  >
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {contact.status === "online" && (
                        <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-1 ring-background" />
                      )}
                    </div>
                    <div className="ml-2">
                      <div className="text-sm font-medium">{contact.name}</div>
                      <div className="text-xs text-muted-foreground">{contact.role}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="md:col-span-3">
              {activeChat ? (
                <>
                  <CardHeader className="border-b">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarFallback>{contacts.find((c) => c.id === activeChat)?.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{contacts.find((c) => c.id === activeChat)?.name}</CardTitle>
                        <CardDescription>{contacts.find((c) => c.id === activeChat)?.role}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 h-[400px] overflow-y-auto">
                    <div className="space-y-4">
                      {messages[activeChat as keyof typeof messages].map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.sender === "You" ? "bg-primary text-primary-foreground" : "bg-secondary"
                            }`}
                          >
                            <div className="text-sm">{message.content}</div>
                            <div
                              className={`text-xs mt-1 ${
                                message.sender === "You" ? "text-primary-foreground/70" : "text-muted-foreground"
                              }`}
                            >
                              {message.time}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t p-3">
                    <div className="flex w-full items-center space-x-2">
                      <Input placeholder="Type your message..." className="flex-1" />
                      <Button>Send</Button>
                    </div>
                  </CardFooter>
                </>
              ) : (
                <div className="h-[500px] flex items-center justify-center text-muted-foreground">
                  Select a contact to start messaging
                </div>
              )}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Announcements</CardTitle>
              <CardDescription>Important messages from management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    title: "New Scheduling System Launch",
                    sender: "Sarah Johnson",
                    role: "Manager",
                    date: "May 22, 2023",
                    content:
                      "We're excited to announce the launch of our new AI-powered scheduling system next month. This will make it easier to request time off, swap shifts, and view your schedule. Training sessions will be held next week.",
                  },
                  {
                    title: "Summer Holiday Coverage",
                    sender: "Operations Team",
                    role: "System",
                    date: "May 15, 2023",
                    content:
                      "As we approach the summer months, please submit your vacation requests by June 1st to ensure we can maintain adequate coverage during the busy season.",
                  },
                  {
                    title: "Quarterly Performance Reviews",
                    sender: "Emma Wilson",
                    role: "HR",
                    date: "May 10, 2023",
                    content:
                      "Quarterly performance reviews will begin next month. Please prepare by reviewing your goals and achievements from the past quarter.",
                  },
                ].map((announcement, index) => (
                  <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{announcement.title}</h3>
                        <div className="text-sm text-muted-foreground">
                          From: {announcement.sender} ({announcement.role})
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{announcement.date}</div>
                    </div>
                    <p className="text-sm">{announcement.content}</p>
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
