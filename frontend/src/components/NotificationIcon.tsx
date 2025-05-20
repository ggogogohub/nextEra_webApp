import { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Notification } from '../types/notification';
import { NotificationService } from '../services/notification.service';
import { format, parseISO } from 'date-fns';
import { Bell, Check, Info, AlertTriangle, AlertCircle } from 'lucide-react';

// AuroraForge Design System Implementation
const IconContainer = styled.div`
  position: relative;
  z-index: 1010;
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
  100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
`;

const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(2px); }
  50% { transform: translateX(-2px); }
  75% { transform: translateX(2px); }
  100% { transform: translateX(0); }
`;

const heartbeat = keyframes`
  0% { transform: scale(1); }
  25% { transform: scale(1.1); }
  40% { transform: scale(1); }
  60% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const radialExpand = keyframes`
  0% { transform: scale(0.8); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

const IconButton = styled.button<{ hasUnread: boolean }>`
  background: rgba(30,41,59,0.5); /* Dark mode accent with opacity */
  border: none;
  color: white;
  cursor: pointer;
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  
  &:hover, &:focus {
    background: rgba(42,92,255,0.2); /* Action Blue with opacity */
    box-shadow: 0 2px 4px rgba(0,0,0,0.15);
    outline: none;
  }
  
  &:active {
    transform: scale(0.95);
    transition: transform 0.1s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  ${props => props.hasUnread && css`
    animation: ${radialExpand} 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  `}
`;

const BellIcon = styled.div<{ pulse?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  
  svg {
    width: 21px;
    height: 21px;
    stroke-width: 1.5px;
    color: #ffffff;
  }
  
  ${props => props.pulse && css`
    animation: ${heartbeat} 2s infinite;
  `}
`;

const Badge = styled.span<{ count: number, critical?: boolean }>`
  position: absolute;
  top: -4px;
  right: -4px;
  background: ${props => props.critical ? '#b91c1c' : '#ef4444'};
  color: #fff;
  border-radius: 10px;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  font-size: 11px;
  font-weight: 600;
  font-family: "SF Pro Display", -apple-system, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #1a365d;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  z-index: 2;
  animation: ${pulse} 2s infinite;
  
  ${props => props.count > 9 && css`
    min-width: 22px;
  `}
  
  ${props => props.critical && css`
    animation: ${shake} 0.1s cubic-bezier(.36,.07,.19,.97) 3;
  `}
`;

const slideIn = keyframes`
  0% { opacity: 0; transform: translateY(-10px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const Dropdown = styled.div`
  position: absolute;
  right: 0;
  top: 48px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  width: 360px;
  max-height: 480px;
  overflow-y: auto;
  z-index: 1011;
  color: #1a365d;
  padding: 0;
  animation: ${slideIn} 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
  
  @media (prefers-color-scheme: dark) {
    background: #0f172a;
    color: #f8fafc;
    border-color: #1e293b;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(42,92,255,0.2);
  }
  
  @media (max-width: 480px) {
    width: 320px;
    right: -140px;
  }
`;

const NotificationHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  h3 {
    margin: 0;
    font-family: "SF Pro Display", -apple-system, sans-serif;
    font-weight: 600;
    font-size: 16px;
    color: #1a365d;
  }
  
  button {
    background: transparent;
    border: none;
    color: #2a5cff;
    font-size: 12px;
    font-family: "Google Sans", -apple-system, sans-serif;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
      background: rgba(42,92,255,0.08);
    }
  }
  
  @media (prefers-color-scheme: dark) {
    border-color: rgba(255, 255, 255, 0.05);
    
    h3 {
      color: #f8fafc;
    }
    
    button {
      color: #99d1ff;
      
      &:hover {
        background: rgba(30,41,59,0.5);
      }
    }
  }
`;

const EmptyState = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: #64748b;
  
  svg {
    color: #94a3b8;
    margin-bottom: 16px;
  }
  
  p {
    font-family: "Google Sans", -apple-system, sans-serif;
    font-size: 14px;
    margin: 0;
  }
  
  @media (prefers-color-scheme: dark) {
    color: #94a3b8;
  }
`;

const NotificationList = styled.div`
  max-height: 360px;
  overflow-y: auto;
`;

const getStatusIcon = (type: string) => {
  switch (type) {
    case 'warning':
      return <AlertTriangle size={16} color="#f59e0b" />
    case 'error':
      return <AlertCircle size={16} color="#ef4444" />
    case 'info':
      return <Info size={16} color="#2a5cff" />
    default:
      return <Check size={16} color="#22c55e" />
  }
};

const getStatusColor = (type: string) => {
  switch (type) {
    case 'warning':
      return '#f59e0b';
    case 'error':
      return '#ef4444';
    case 'info':
      return '#2a5cff';
    default:
      return '#22c55e';
  }
};

const Item = styled.div<{ is_read: boolean; type?: string }>`
  padding: 12px 20px;
  background-color: ${({ is_read }) => (is_read ? 'transparent' : 'rgba(42,92,255,0.04)')};
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
  transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: flex-start;
  gap: 12px;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background-color: ${({ type }) => getStatusColor(type || 'success')};
    opacity: ${({ is_read }) => (is_read ? 0 : 1)};
  }
  
  @media (prefers-color-scheme: dark) {
    background-color: ${({ is_read }) => (is_read ? 'transparent' : 'rgba(42,92,255,0.08)')};
    border-color: rgba(255, 255, 255, 0.05);
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.02);
    }
  }
`;

const StatusIcon = styled.div<{ type?: string }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${({ type }) => `${getStatusColor(type || 'success')}10`};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
`;

const Content = styled.div`
  flex: 1;
`;

const Message = styled.div`
  font-size: 14px;
  color: #334155;
  font-family: "Google Sans", -apple-system, sans-serif;
  line-height: 1.5;
  
  @media (prefers-color-scheme: dark) {
    color: #e2e8f0;
  }
`;

const Time = styled.div`
  font-size: 12px;
  color: #64748b;
  margin-top: 4px;
  font-family: "SF Pro Display", -apple-system, sans-serif;
  
  @media (prefers-color-scheme: dark) {
    color: #94a3b8;
  }
`;

const ActionsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`;

const MarkReadButton = styled.button`
  background: transparent;
  border: none;
  color: #2a5cff;
  font-size: 12px;
  font-family: "Google Sans", -apple-system, sans-serif;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
  
  &:hover {
    background: rgba(42,92,255,0.08);
  }
  
  svg {
    width: 14px;
    height: 14px;
  }
  
  @media (prefers-color-scheme: dark) {
    color: #99d1ff;
    
    &:hover {
      background: rgba(30,41,59,0.5);
    }
  }
`;

const ViewAllButton = styled.button`
  width: 100%;
  padding: 12px;
  background: transparent;
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  color: #2a5cff;
  font-family: "SF Pro Display", -apple-system, sans-serif;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    background: rgba(42,92,255,0.04);
  }
  
  @media (prefers-color-scheme: dark) {
    border-color: rgba(255, 255, 255, 0.05);
    color: #99d1ff;
    
    &:hover {
      background: rgba(30,41,59,0.3);
    }
  }
`;



const Heartbeat = styled.div`
  position: absolute;
  bottom: 2px;
  left: 2px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #22c55e;
  opacity: 0.8;
`;

interface NotificationProps {
  onViewAll?: () => void;
  onMarkAllRead?: () => void;
}

const NotificationIcon: React.FC<NotificationProps> = ({ 
  onViewAll = () => console.log('View all notifications'),
  onMarkAllRead = () => console.log('Mark all as read')
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    
    // Set up polling for WebSocket fallback
    const intervalId = setInterval(fetch, 30000); // 30-second polling as fallback
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        ref.current && 
        !ref.current.contains(e.target as Node) &&
        dropdownRef.current && 
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Close menu with escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const unreadCount = notifications.filter((n) => !n.is_read).length;
  const hasCritical = notifications.some(n => !n.is_read && n.type === 'error');

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
  
  const handleMarkAllReadClick = async () => {
    try {
      await Promise.all(notifications
        .filter(n => !n.is_read)
        .map(n => NotificationService.markAsRead(n.id, true))
      );
      
      setNotifications(prev => 
        prev.map(n => ({ ...n, is_read: true }))
      );
      
      onMarkAllRead();
    } catch (err) {
      console.error('Failed to mark all notifications as read', err);
    }
  };

  return (
    <IconContainer ref={ref}>
      <IconButton 
        onClick={handleToggle} 
        aria-label="Notifications" 
        aria-expanded={open}
        aria-haspopup="true"
        tabIndex={0}
        hasUnread={unreadCount > 0}
      >
        <BellIcon pulse={hasCritical}>
          <Bell />
          <Heartbeat />
        </BellIcon>
        
        {unreadCount > 0 && (
          <Badge count={unreadCount} critical={hasCritical}>{unreadCount}</Badge>
        )}
      </IconButton>
      
      {open && (
        <Dropdown tabIndex={-1} ref={dropdownRef}>
          <NotificationHeader>
            <h3>Notifications</h3>
            {unreadCount > 0 && (
              <button onClick={handleMarkAllReadClick}>Mark all as read</button>
            )}
          </NotificationHeader>
          
          <NotificationList>
            {notifications.length === 0 ? (
              <EmptyState>
                <Bell size={32} />
                <p>No notifications yet</p>
              </EmptyState>
            ) : (
              notifications.map((notification) => (
                <Item 
                  key={notification.id} 
                  is_read={notification.is_read}
                  type={notification.type}
                >
                  <StatusIcon type={notification.type}>
                    {getStatusIcon(notification.type || 'success')}
                  </StatusIcon>
                  
                  <Content>
                    <Message>{notification.message}</Message>
                    <Time>{format(parseISO(notification.created_at), 'PPpp')}</Time>
                    
                    {!notification.is_read && (
                      <ActionsRow>
                        <MarkReadButton onClick={() => handleMark(notification.id)}>
                          <Check size={14} /> Mark as read
                        </MarkReadButton>
                      </ActionsRow>
                    )}
                  </Content>
                </Item>
              ))
            )}
          </NotificationList>
          
          {notifications.length > 0 && (
            <ViewAllButton onClick={onViewAll}>View all notifications</ViewAllButton>
          )}
        </Dropdown>
      )}
    </IconContainer>
  );
};

export default NotificationIcon;
