import { createContext } from 'react';
import { Notification, NotificationState } from '../../types/notification.types';

export interface NotificationContextType extends NotificationState {
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  refreshNotifications: () => Promise<void>;
}

export type Action =
  | { type: 'SET_NOTIFICATIONS'; payload: Notification[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'MARK_AS_READ'; payload: string }
  | { type: 'MARK_ALL_AS_READ' };

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined); 