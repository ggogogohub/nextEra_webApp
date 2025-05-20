export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
  created_at: string;
  updated_at: string;
}

export interface NotificationIconProps {
  onMarkAllRead?: () => void;
} 