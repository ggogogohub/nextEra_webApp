import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  name: string
  email: string
  role: "Employee" | "Manager" | "Administrator"
  department: string
  status: "Active" | "Inactive" | "Suspended"
  lastLogin?: string
  createdAt: string
  skills?: string[]
  availability?: Record<string, { start: string; end: string; available: boolean }>
  maxHours?: number
}

interface TimeOffRequest {
  id: string
  userId: string
  dates: string
  type: string
  status: "Pending" | "Approved" | "Denied"
  reason?: string
  requestedOn: string
  approvedBy?: string
}

interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: string
  read: boolean
}

interface Announcement {
  id: string
  title: string
  content: string
  sender: string
  role: string
  date: string
  targetRoles?: string[]
}

interface AuditLog {
  id: string
  userId: string
  action: string
  timestamp: string
  ipAddress: string
  status: "Success" | "Failed"
  details?: string
}

interface AppState {
  // Auth
  currentUser: User | null
  isAuthenticated: boolean
  sessionTimeout: number

  // Users
  users: User[]

  // Time Off
  timeOffRequests: TimeOffRequest[]

  // Messages
  messages: Message[]
  announcements: Announcement[]

  // Audit
  auditLogs: AuditLog[]

  // Actions
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (userData: Partial<User>) => Promise<boolean>
  createUser: (userData: Partial<User>) => boolean
  updateUser: (id: string, userData: Partial<User>) => boolean
  deleteUser: (id: string) => boolean

  // Time Off Actions
  submitTimeOffRequest: (request: Partial<TimeOffRequest>) => boolean
  approveTimeOffRequest: (id: string, approverId: string) => boolean
  denyTimeOffRequest: (id: string, approverId: string) => boolean
  cancelTimeOffRequest: (id: string) => boolean

  // Message Actions
  sendMessage: (senderId: string, receiverId: string, content: string) => boolean
  markMessageAsRead: (id: string) => boolean
  createAnnouncement: (announcement: Partial<Announcement>) => boolean

  // Audit Actions
  addAuditLog: (log: Partial<AuditLog>) => void

  // Session Management
  updateLastActivity: () => void
  checkSession: () => boolean
}

const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentUser: null,
      isAuthenticated: false,
      sessionTimeout: 30 * 60 * 1000, // 30 minutes

      users: [
        {
          id: "1",
          name: "John Doe",
          email: "john.doe@company.com",
          role: "Employee",
          department: "Customer Support",
          status: "Active",
          createdAt: "2023-01-15",
          skills: ["Customer Service"],
          maxHours: 40,
        },
        {
          id: "2",
          name: "Sarah Johnson",
          email: "sarah.johnson@company.com",
          role: "Manager",
          department: "Customer Support",
          status: "Active",
          createdAt: "2022-12-01",
          skills: ["Leadership", "Customer Service"],
          maxHours: 40,
        },
        {
          id: "3",
          name: "Emma Wilson",
          email: "emma.wilson@company.com",
          role: "Administrator",
          department: "Human Resources",
          status: "Active",
          createdAt: "2022-11-15",
          skills: ["HR Management", "System Administration"],
          maxHours: 40,
        },
      ],

      timeOffRequests: [
        {
          id: "1",
          userId: "1",
          dates: "June 15-18, 2023",
          type: "Vacation",
          status: "Approved",
          requestedOn: "2023-05-01",
          approvedBy: "2",
        },
        {
          id: "2",
          userId: "1",
          dates: "July 3, 2023",
          type: "Personal",
          status: "Pending",
          requestedOn: "2023-05-15",
        },
      ],

      messages: [],
      announcements: [
        {
          id: "1",
          title: "New Scheduling System Launch",
          content: "We're excited to announce the launch of our new AI-powered scheduling system next month.",
          sender: "Sarah Johnson",
          role: "Manager",
          date: "2023-05-22",
        },
      ],

      auditLogs: [
        {
          id: "1",
          userId: "1",
          action: "Login",
          timestamp: "2023-05-27 09:15:23",
          ipAddress: "192.168.1.100",
          status: "Success",
        },
      ],

      // Auth Actions
      login: async (email: string, password: string) => {
        const user = get().users.find((u) => u.email === email)

        // Add audit log
        get().addAuditLog({
          userId: user?.id || "unknown",
          action: "Login Attempt",
          timestamp: new Date().toISOString(),
          ipAddress: "192.168.1.100",
          status: user ? "Success" : "Failed",
          details: `Login attempt for ${email}`,
        })

        if (user && password) {
          // Simple password check for demo
          set({
            currentUser: { ...user, lastLogin: new Date().toLocaleString() },
            isAuthenticated: true,
          })
          get().updateLastActivity()
          return true
        }
        return false
      },

      logout: () => {
        const currentUser = get().currentUser
        if (currentUser) {
          get().addAuditLog({
            userId: currentUser.id,
            action: "Logout",
            timestamp: new Date().toISOString(),
            ipAddress: "192.168.1.100",
            status: "Success",
          })
        }

        set({
          currentUser: null,
          isAuthenticated: false,
        })
      },

      register: async (userData: Partial<User>) => {
        const newUser: User = {
          id: Date.now().toString(),
          name: userData.name || "",
          email: userData.email || "",
          role: userData.role || "Employee",
          department: userData.department || "",
          status: "Active",
          createdAt: new Date().toISOString().split("T")[0],
          skills: userData.skills || [],
          maxHours: userData.maxHours || 40,
        }

        set((state) => ({
          users: [...state.users, newUser],
        }))

        get().addAuditLog({
          userId: newUser.id,
          action: "User Registration",
          timestamp: new Date().toISOString(),
          ipAddress: "192.168.1.100",
          status: "Success",
          details: `New user registered: ${newUser.email}`,
        })

        return true
      },

      // User Management Actions
      createUser: (userData: Partial<User>) => {
        const newUser: User = {
          id: Date.now().toString(),
          name: userData.name || "",
          email: userData.email || "",
          role: userData.role || "Employee",
          department: userData.department || "",
          status: "Active",
          createdAt: new Date().toISOString().split("T")[0],
          skills: userData.skills || [],
          maxHours: userData.maxHours || 40,
        }

        set((state) => ({
          users: [...state.users, newUser],
        }))

        get().addAuditLog({
          userId: get().currentUser?.id || "system",
          action: "User Created",
          timestamp: new Date().toISOString(),
          ipAddress: "192.168.1.100",
          status: "Success",
          details: `Created user: ${newUser.email}`,
        })

        return true
      },

      updateUser: (id: string, userData: Partial<User>) => {
        set((state) => ({
          users: state.users.map((user) => (user.id === id ? { ...user, ...userData } : user)),
        }))

        get().addAuditLog({
          userId: get().currentUser?.id || "system",
          action: "User Updated",
          timestamp: new Date().toISOString(),
          ipAddress: "192.168.1.100",
          status: "Success",
          details: `Updated user: ${id}`,
        })

        return true
      },

      deleteUser: (id: string) => {
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
        }))

        get().addAuditLog({
          userId: get().currentUser?.id || "system",
          action: "User Deleted",
          timestamp: new Date().toISOString(),
          ipAddress: "192.168.1.100",
          status: "Success",
          details: `Deleted user: ${id}`,
        })

        return true
      },

      // Time Off Actions
      submitTimeOffRequest: (request: Partial<TimeOffRequest>) => {
        const newRequest: TimeOffRequest = {
          id: Date.now().toString(),
          userId: get().currentUser?.id || "",
          dates: request.dates || "",
          type: request.type || "",
          status: "Pending",
          reason: request.reason,
          requestedOn: new Date().toISOString().split("T")[0],
        }

        set((state) => ({
          timeOffRequests: [...state.timeOffRequests, newRequest],
        }))

        get().addAuditLog({
          userId: newRequest.userId,
          action: "Time Off Request Submitted",
          timestamp: new Date().toISOString(),
          ipAddress: "192.168.1.100",
          status: "Success",
          details: `Submitted time off request for ${newRequest.dates}`,
        })

        return true
      },

      approveTimeOffRequest: (id: string, approverId: string) => {
        set((state) => ({
          timeOffRequests: state.timeOffRequests.map((request) =>
            request.id === id ? { ...request, status: "Approved" as const, approvedBy: approverId } : request,
          ),
        }))

        get().addAuditLog({
          userId: approverId,
          action: "Time Off Request Approved",
          timestamp: new Date().toISOString(),
          ipAddress: "192.168.1.100",
          status: "Success",
          details: `Approved time off request: ${id}`,
        })

        return true
      },

      denyTimeOffRequest: (id: string, approverId: string) => {
        set((state) => ({
          timeOffRequests: state.timeOffRequests.map((request) =>
            request.id === id ? { ...request, status: "Denied" as const, approvedBy: approverId } : request,
          ),
        }))

        get().addAuditLog({
          userId: approverId,
          action: "Time Off Request Denied",
          timestamp: new Date().toISOString(),
          ipAddress: "192.168.1.100",
          status: "Success",
          details: `Denied time off request: ${id}`,
        })

        return true
      },

      cancelTimeOffRequest: (id: string) => {
        set((state) => ({
          timeOffRequests: state.timeOffRequests.filter((request) => request.id !== id),
        }))

        get().addAuditLog({
          userId: get().currentUser?.id || "",
          action: "Time Off Request Cancelled",
          timestamp: new Date().toISOString(),
          ipAddress: "192.168.1.100",
          status: "Success",
          details: `Cancelled time off request: ${id}`,
        })

        return true
      },

      // Message Actions
      sendMessage: (senderId: string, receiverId: string, content: string) => {
        const newMessage: Message = {
          id: Date.now().toString(),
          senderId,
          receiverId,
          content,
          timestamp: new Date().toISOString(),
          read: false,
        }

        set((state) => ({
          messages: [...state.messages, newMessage],
        }))

        return true
      },

      markMessageAsRead: (id: string) => {
        set((state) => ({
          messages: state.messages.map((message) => (message.id === id ? { ...message, read: true } : message)),
        }))

        return true
      },

      createAnnouncement: (announcement: Partial<Announcement>) => {
        const newAnnouncement: Announcement = {
          id: Date.now().toString(),
          title: announcement.title || "",
          content: announcement.content || "",
          sender: announcement.sender || get().currentUser?.name || "",
          role: announcement.role || get().currentUser?.role || "",
          date: new Date().toISOString().split("T")[0],
          targetRoles: announcement.targetRoles,
        }

        set((state) => ({
          announcements: [...state.announcements, newAnnouncement],
        }))

        get().addAuditLog({
          userId: get().currentUser?.id || "",
          action: "Announcement Created",
          timestamp: new Date().toISOString(),
          ipAddress: "192.168.1.100",
          status: "Success",
          details: `Created announcement: ${newAnnouncement.title}`,
        })

        return true
      },

      // Audit Actions
      addAuditLog: (log: Partial<AuditLog>) => {
        const newLog: AuditLog = {
          id: Date.now().toString(),
          userId: log.userId || "",
          action: log.action || "",
          timestamp: log.timestamp || new Date().toISOString(),
          ipAddress: log.ipAddress || "192.168.1.100",
          status: log.status || "Success",
          details: log.details,
        }

        set((state) => ({
          auditLogs: [...state.auditLogs, newLog],
        }))
      },

      // Session Management
      updateLastActivity: () => {
        // Update last activity timestamp
        localStorage.setItem("lastActivity", Date.now().toString())
      },

      checkSession: () => {
        const lastActivity = localStorage.getItem("lastActivity")
        if (!lastActivity) return false

        const now = Date.now()
        const sessionTimeout = get().sessionTimeout

        if (now - Number.parseInt(lastActivity) > sessionTimeout) {
          get().logout()
          return false
        }

        return true
      },
    }),
    {
      name: "nextera-workforce-storage",
      partialize: (state) => ({
        users: state.users,
        timeOffRequests: state.timeOffRequests,
        messages: state.messages,
        announcements: state.announcements,
        auditLogs: state.auditLogs,
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)

export default useStore
