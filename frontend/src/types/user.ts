export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar_url?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
} 