import React, { useState, useEffect, useRef } from 'react';
import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { NotificationList } from './NotificationList';
import { NotificationContainer, NotificationBadge } from './styles';
import { useNotification } from '../../../hooks/useNotification';

export const NotificationIcon: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, refreshNotifications } = useNotification();
  const navigate = useNavigate();

  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<number | null>(null);

  useEffect(() => {
    refreshNotifications();
  }, [refreshNotifications]);

  const handleMarkAsReadWrapper = async (id: string): Promise<void> => {
    try {
      await markAsRead(id);
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const openList = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    setIsOpen(true);
  };

  const closeList = () => {
    hideTimerRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  // Close the list when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        listRef.current &&
        !listRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Effect to clear timer if component unmounts
  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  return (
    <NotificationContainer
      ref={containerRef}
      onMouseEnter={openList}
      onMouseLeave={closeList}
    >
      <NotificationBadge>
        <Bell size={24} />
        {unreadCount > 0 && <span>{unreadCount}</span>}
      </NotificationBadge>
      {isOpen && (
        <NotificationList
          ref={listRef}
          notifications={notifications.slice(0, 5)}
          onMarkAsRead={handleMarkAsReadWrapper}
          onSeeAllClick={() => { navigate('/notifications'); setIsOpen(false); }}
        />
      )}
    </NotificationContainer>
  );
}; 