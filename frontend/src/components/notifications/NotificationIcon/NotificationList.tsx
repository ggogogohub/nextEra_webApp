import React from 'react';
import { Notification } from '../../../types/notification';
import {
  NotificationListContainer,
  NotificationItem,
  NotificationContent,
  NotificationTitle,
  NotificationMessage,
  NotificationTime,
  NotificationActions,
  MarkAsReadButton,
  EmptyState
} from './styles';

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
}

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  onMarkAsRead
}) => {
  if (notifications.length === 0) {
    return (
      <EmptyState>
        <p>No notifications</p>
      </EmptyState>
    );
  }

  return (
    <NotificationListContainer>
      {notifications.map((notification) => (
        <NotificationItem 
          key={notification.id}
          isRead={notification.isRead}
          onClick={() => onMarkAsRead(notification.id)}
        >
          <NotificationContent>
            <NotificationTitle>{notification.title}</NotificationTitle>
            <NotificationMessage>{notification.message}</NotificationMessage>
            <NotificationTime>
              {new Date(notification.created_at).toLocaleString()}
            </NotificationTime>
          </NotificationContent>
          
          {!notification.isRead && (
            <NotificationActions>
              <MarkAsReadButton
                onClick={() => onMarkAsRead(notification.id)}
                aria-label={`Mark ${notification.title} as read`}
              >
                Mark as read
              </MarkAsReadButton>
            </NotificationActions>
          )}
        </NotificationItem>
      ))}
    </NotificationListContainer>
  );
}; 