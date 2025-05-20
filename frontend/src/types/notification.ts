// Notification types
export interface Notification {
  id: string;
  message: string;
  employee_id: string;
  is_read: boolean;
  created_at: string;
  type?: 'info' | 'success' | 'warning' | 'error';
}
