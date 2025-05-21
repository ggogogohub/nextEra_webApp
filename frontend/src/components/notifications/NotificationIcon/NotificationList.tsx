import { forwardRef } from 'react';
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
  EmptyState,
  NotificationListFooter,
  SeeAllLink
} from './styles';

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => Promise<void>;
  onSeeAllClick: () => void;
}

export const NotificationList = forwardRef<HTMLDivElement, NotificationListProps>((
  { notifications, onMarkAsRead, onSeeAllClick },
  ref
) => {
  const hasFooter = notifications.length > 0;

  if (notifications.length === 0) {
    return (
      <NotificationListContainer ref={ref}>
        <EmptyState hasFooter={hasFooter}>
          <p>No notifications</p>
        </EmptyState>
      </NotificationListContainer>
    );
  }

  return (
    <NotificationListContainer ref={ref}>
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          isRead={notification.isRead}
        >
          <NotificationContent>
            <NotificationTitle>{notification.title}</NotificationTitle>
            <NotificationMessage>{notification.message}</NotificationMessage>
            <NotificationTime>
              {new Date(notification.created_at).toLocaleString()}
            </NotificationTime>
          </NotificationContent>
          
          {!notification.isRead && notifications.length <= 5 && (
            <NotificationActions>
              <MarkAsReadButton
                onClick={(e) => { e.stopPropagation(); onMarkAsRead(notification.id); }}
                aria-label={`Mark ${notification.title} as read`}
              >
                Mark as read
              </MarkAsReadButton>
            </NotificationActions>
          )}
        </NotificationItem>
      ))}

      {hasFooter && (
        <NotificationListFooter>
          <SeeAllLink onClick={onSeeAllClick}>See all notifications</SeeAllLink>
        </NotificationListFooter>
      )}
    </NotificationListContainer>
  );
});

NotificationList.displayName = 'NotificationList'; 