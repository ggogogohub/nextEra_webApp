import React, { useReducer, useEffect, useCallback } from 'react';
import { notificationService } from '../../services/notification.service';
import { NotificationContext, initialState, notificationReducer } from './NotificationContext';
import { useAuth } from '../../hooks/useAuth';

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);
  const { isAuthenticated } = useAuth();

  const refreshNotifications = useCallback(async () => {
    if (!isAuthenticated) {
      dispatch({ type: 'SET_NOTIFICATIONS', payload: [] });
      dispatch({ type: 'SET_LOADING', payload: false });
      dispatch({ type: 'SET_UNREAD_COUNT', payload: 0 });
      return;
    }

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const notifications = await notificationService.getNotifications();
      dispatch({ type: 'SET_NOTIFICATIONS', payload: notifications });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      if (error instanceof Error && error.message.includes('401')) {
        console.warn('Notification fetch failed due to 401. User may be unauthenticated.');
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch notifications' });
      }
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [isAuthenticated]);

  const markAsRead = async (id: string) => {
    try {
      await notificationService.markAsRead(id);
      dispatch({ type: 'MARK_AS_READ', payload: id });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to mark notification as read' });
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      dispatch({ type: 'MARK_ALL_AS_READ' });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to mark all notifications as read' });
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isAuthenticated) {
      refreshNotifications();
      interval = setInterval(refreshNotifications, 30000);
    } else {
      dispatch({ type: 'SET_NOTIFICATIONS', payload: [] });
      dispatch({ type: 'SET_UNREAD_COUNT', payload: 0 });
      dispatch({ type: 'SET_ERROR', payload: null });
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAuthenticated, refreshNotifications]);

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