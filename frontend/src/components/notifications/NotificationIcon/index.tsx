import React, { useState, useEffect } from 'react';
import { get } from '../../../utils/api';
import { Notification } from '../../../types/notification';
import { NotificationList } from './NotificationList';
import { NotificationContainer, NotificationBadge } from './styles';

export const NotificationIcon: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await get<Notification[]>('/notifications');
        setNotifications(response.data);
        setUnreadCount(response.data.filter(n => !n.isRead).length);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      await get(`/notifications/${id}/read`);
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  return (
    <NotificationContainer>
      <NotificationBadge onClick={() => setIsOpen(!isOpen)}>
        {unreadCount > 0 && <span>{unreadCount}</span>}
      </NotificationBadge>
      {isOpen && (
        <NotificationList
          notifications={notifications}
          onMarkAsRead={handleMarkAsRead}
        />
      )}
    </NotificationContainer>
  );
}; 