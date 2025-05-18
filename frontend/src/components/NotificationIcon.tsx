import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Notification } from '../types/notification';
import { NotificationService } from '../services/notification.service';
import { format, parseISO } from 'date-fns';

const IconContainer = styled.div`
  position: relative;
  margin-left: 1rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  position: relative;
  font-size: 1.25rem;
`;

const Badge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: #f44336;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.75rem;
`;

const Dropdown = styled.div`
  position: absolute;
  right: 0;
  top: 24px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  z-index: 100;
  color: #333;
`;

const Item = styled.div<{ isRead: boolean }>`
  padding: 0.75rem;
  background-color: ${({ isRead }) => (isRead ? '#f5f5f5' : '#fff8e1')};
  border-bottom: 1px solid #eee;
`;

const Message = styled.div`
  font-size: 0.875rem;
  color: #333;
`;

const Time = styled.div`
  font-size: 0.75rem;
  color: #999;
  margin-top: 0.25rem;
  text-align: right;
`;

const MarkReadButton = styled.button`
  background: none;
  border: none;
  color: #4a90e2;
  font-size: 0.75rem;
  cursor: pointer;
  margin-top: 0.25rem;

  &:hover {
    text-decoration: underline;
  }
`;

const NotificationIcon = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await NotificationService.getNotifications();
        setNotifications(data);
      } catch (err) {
        console.error('Failed to load notifications', err);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const handleToggle = () => setOpen((o) => !o);

  const handleMark = async (id: string) => {
    try {
      await NotificationService.markAsRead(id, true);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
    } catch (err) {
      console.error('Failed to mark notification', err);
    }
  };

  return (
    <IconContainer ref={ref}>
      <IconButton onClick={handleToggle} aria-label="Notifications">
        🔔
        {unreadCount > 0 && <Badge>{unreadCount}</Badge>}
      </IconButton>
      {open && (
        <Dropdown>
          {notifications.length === 0 && <Item isRead={true}>No notifications</Item>}
          {notifications.map((n) => (
            <Item key={n.id} isRead={n.is_read}>
              <Message>{n.message}</Message>
              <Time>{format(parseISO(n.created_at), 'Pp')}</Time>
              {!n.is_read && (
                <MarkReadButton onClick={() => handleMark(n.id)}>
                  Mark as read
                </MarkReadButton>
              )}
            </Item>
          ))}
        </Dropdown>
      )}
    </IconContainer>
  );
};

export default NotificationIcon;
