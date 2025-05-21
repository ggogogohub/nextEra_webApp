import React, { useState, useEffect } from 'react';
import { NotificationList } from './NotificationList';
import { NotificationContainer, NotificationBadge } from './styles';
import { useNotification } from '../../../hooks/useNotification';

export const NotificationIcon: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, refreshNotifications } = useNotification();

  useEffect(() => {
    // Fetch notifications when the component mounts and when isAuthenticated changes
    refreshNotifications();

    // The interval is now handled in the NotificationContext
    // Clean up function is no longer needed here for the interval
  }, [refreshNotifications]); // Dependency on refreshNotifications

  // handleMarkAsRead is now provided by the context
  const handleMarkAsReadWrapper = async (id: string) => {
    await markAsRead(id);
  };

  return (
    <NotificationContainer>
      <NotificationBadge onClick={() => setIsOpen(!isOpen)}>
        {unreadCount > 0 && <span>{unreadCount}</span>}
      </NotificationBadge>
      {isOpen && (
        <NotificationList
          notifications={notifications}
          onMarkAsRead={handleMarkAsReadWrapper}
        />
      )}
    </NotificationContainer>
  );
}; 