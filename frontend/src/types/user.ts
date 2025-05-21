export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar_url?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
}

export interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfileUpdate {
  email?: string;
  first_name?: string;
  last_name?: string;
  role?: string;
} 