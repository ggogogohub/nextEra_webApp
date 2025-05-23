import { useState } from 'react';
import styled from 'styled-components';
import { Notification } from '../types/notification';
import { notificationService } from '../services/notification.service';

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const NotificationItem = styled.div<{ read: boolean }>`
  background-color: ${props => props.read ? '#f5f5f5' : 'white'};
  border-left: 4px solid ${props => props.read ? '#ccc' : '#4a90e2'};
  padding: 1rem;
  margin-bottom: 0.75rem;
  cursor: pointer;
  &:hover { background-color: #eef; }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const handleMarkRead = async (id: string) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container>
      <Title>Notifications</Title>
      {notifications.length === 0 ? (
        <div>No notifications</div>
      ) : (
        notifications.map(n => (
          <NotificationItem key={n.id} read={n.isRead} onClick={() => handleMarkRead(n.id)}>
            <p>{n.message}</p>
            <small>{new Date(n.created_at).toLocaleString()}</small>
          </NotificationItem>
        ))
      )}
    </Container>
  );
};

export default NotificationsPage;
