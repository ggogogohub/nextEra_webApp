import React from 'react';
import { Notification } from '../../../types/notification';
import {
  NotificationItem as StyledNotificationItem,
  NotificationContent,
  NotificationTitle,
  NotificationMessage,
  NotificationTime,
  NotificationActions,
  MarkAsReadButton
} from './styles';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead
}) => {
  const handleMarkAsRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMarkAsRead(notification.id);
  };

  return (
    <StyledNotificationItem isRead={notification.isRead}>
      <NotificationContent>
        <NotificationTitle>{notification.title}</NotificationTitle>
        <NotificationMessage>{notification.message}</NotificationMessage>
        <NotificationTime>{notification.time}</NotificationTime>
      </NotificationContent>
      {!notification.isRead && (
        <NotificationActions>
          <MarkAsReadButton onClick={handleMarkAsRead}>
            Mark as read
          </MarkAsReadButton>
        </NotificationActions>
      )}
    </StyledNotificationItem>
  );
}; 