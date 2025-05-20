const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const apiConfig = {
  baseURL: API_BASE_URL,
  endpoints: {
    auth: {
      login: '/api/v1/auth/login',
      register: '/api/v1/auth/register',
      refresh: '/api/v1/auth/refresh',
      logout: '/api/v1/auth/logout',
      me: '/api/v1/auth/me',
    },
    notifications: {
      list: '/api/v1/notifications',
      markRead: (id: string) => `/api/v1/notifications/${id}/read`,
      markAllRead: '/api/v1/notifications/read-all',
    },
    schedules: {
      list: '/api/v1/schedules',
      create: '/api/v1/schedules',
      update: (id: string) => `/api/v1/schedules/${id}`,
      delete: (id: string) => `/api/v1/schedules/${id}`,
    },
  },
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
}; 