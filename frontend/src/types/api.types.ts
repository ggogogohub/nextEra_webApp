export interface API_CONFIG {
  baseURL: string;
  endpoints: {
    auth: {
      login: string;
      register: string;
      refresh: string;
      logout: string;
      me: string;
    };
    notifications: {
      list: string;
      markRead: (id: string) => string;
      markAllRead: string;
    };
    schedules: {
      list: string;
      create: string;
      update: (id: string) => string;
      delete: (id: string) => string;
    };
  };
  headers: Record<string, string>;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
} 