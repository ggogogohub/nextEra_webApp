import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ModernBell from '../assets/ModernBell.svg';
import { Notification } from '../types/notification';
import { NotificationService } from '../services/notification.service';
import { format, parseISO } from 'date-fns';

const IconContainer = styled.div`
  position: relative;
  margin-left: 1rem;
`;

const IconButton = styled.button`
  background: rgba(255,255,255,0.08);
  border: none;
  color: white;
  cursor: pointer;
  position: relative;
  font-size: 1.5rem;
  border-radius: 4px;
  padding: 0.45rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  outline: none;
  &:hover, &:focus {
    background: rgba(2,195,154,0.15);
    outline: none;
  }
`;

const Badge = styled.span`
  position: absolute;
  top: -6px;
  right: -6px;
  background: #f43f5e;
  color: #fff;
  border-radius: 4px;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  font-size: 0.82rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #fff;
`;

const Dropdown = styled.div`
  position: absolute;
  right: 0;
  top: 36px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 320px;
  max-height: 420px;
  overflow-y: auto;
  z-index: 1000;
  color: #23272f;
  padding: 0.7rem 0 0.5rem 0;
  animation: fadeIn 0.2s ease-out;
  border: none;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Item = styled.div<{ is_read: boolean }>`
  padding: 0.75rem;
  background-color: ${({ is_read }) => (is_read ? '#f5f5f5' : '#fff8e1')};
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
      <IconButton onClick={() => setOpen((o) => !o)} aria-label="Notifications" tabIndex={0}>
        <img src={ModernBell} alt="Notifications" style={{ width: 28, height: 28, display: 'block' }} />
        {notifications.some((n) => !n.is_read) && (
          <Badge>{notifications.filter((n) => !n.is_read).length}</Badge>
        )}
      </IconButton>
      {open && (
        <Dropdown tabIndex={-1}>
          {notifications.length === 0 ? (
            <Item is_read={true}>No notifications</Item>
          ) : (
            notifications.map((notification) => (
              <Item key={notification.id} is_read={notification.is_read}>
                <Message>{notification.message}</Message>
                <Time>{format(parseISO(notification.created_at), 'PPpp')}</Time>
                {!notification.is_read && (
                  <MarkReadButton onClick={() => handleMark(notification.id)}>
                    Mark as read
                  </MarkReadButton>
                )}
              </Item>
            ))
          )}
        </Dropdown>
      )}
    </IconContainer>
  );
};

export default NotificationIcon;
