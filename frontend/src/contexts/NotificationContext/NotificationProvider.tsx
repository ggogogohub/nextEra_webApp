import React, { useReducer, useEffect } from 'react';
import { notificationService } from '../../services/notification.service';
import { NotificationContext, Action } from './NotificationContext';
import { NotificationState } from '../../types/notification.types';

// Initial state
const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
};

// Reducer
const notificationReducer = (state: NotificationState, action: Action): NotificationState => {
  switch (action.type) {
    case 'SET_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.payload,
        unreadCount: action.payload.filter(n => !n.isRead).length,
        error: null,
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'MARK_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.payload ? { ...n, isRead: true } : n
        ),
        unreadCount: state.unreadCount - 1,
      };
    case 'MARK_ALL_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map(n => ({ ...n, isRead: true })),
        unreadCount: 0,
      };
    default:
      return state;
  }
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  const refreshNotifications = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const notifications = await notificationService.getNotifications();
      dispatch({ type: 'SET_NOTIFICATIONS', payload: notifications });
    } catch {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch notifications' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await notificationService.markAsRead(id);
      dispatch({ type: 'MARK_AS_READ', payload: id });
    } catch {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to mark notification as read' });
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      dispatch({ type: 'MARK_ALL_AS_READ' });
    } catch {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to mark all notifications as read' });
    }
  };

  useEffect(() => {
    refreshNotifications();
    // Set up polling for new notifications
    const interval = setInterval(refreshNotifications, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        ...state,
        markAsRead,
        markAllAsRead,
        refreshNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}; 