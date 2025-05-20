import React from 'react';
import { Notification } from '../../../types/notification';
import { NotificationList } from './NotificationList';
import {
  NotificationListContainer,
  NotificationActions,
  MarkAsReadButton,
  NotificationTitle
} from './styles';

interface NotificationDropdownProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllRead: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllRead
}) => {
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <NotificationListContainer>
      <NotificationActions style={{ justifyContent: 'space-between', padding: '8px 16px', borderBottom: '1px solid #f5f5f5' }}>
        <NotificationTitle>Notifications</NotificationTitle>
        {unreadCount > 0 && (
          <MarkAsReadButton onClick={onMarkAllRead}>
            Mark all as read
          </MarkAsReadButton>
        )}
      </NotificationActions>
      <NotificationList
        notifications={notifications}
        onMarkAsRead={onMarkAsRead}
      />
    </NotificationListContainer>
  );
}; 