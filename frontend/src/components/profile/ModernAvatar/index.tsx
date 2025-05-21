import React, { useState, useRef, useEffect } from 'react';
import { User, Settings, LogOut, Bell, Moon, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  AvatarContainer,
  AvatarCircle,
  Status,
  ProfileMenu,
  ProfileHeader,
  ProfileImage,
  ProfileName,
  ProfileRole,
  ProfileActions,
  ActionButton,
  Divider
} from './styles';
import { useAuth } from '../../../hooks/useAuth';
import { useNotification } from '../../../hooks/useNotification';

interface ModernAvatarProps {
  imageUrl?: string;
  onLogout?: () => void;
}

const ModernAvatar: React.FC<ModernAvatarProps> = ({
  imageUrl = '',
  onLogout = () => console.log('Logout clicked')
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, logout: authLogout } = useAuth();
  const { unreadCount } = useNotification();
  const navigate = useNavigate();

  const timerRef = useRef<number | null>(null);

  const openMenu = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsOpen(true);
  };

  const closeMenu = () => {
    timerRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const cancelClose = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleLogout = () => {
    authLogout();
    if (onLogout) {
      onLogout();
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!user) {
    return null;
  }

  const userName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'User';
  const userRole = user.role || '';

  return (
    <AvatarContainer
      ref={containerRef}
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
    >
      <AvatarCircle
        aria-label="Open profile menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {imageUrl ? (
          <img src={imageUrl} alt={userName} />
        ) : (
          <User size={20} color="#ffffff" />
        )}
      </AvatarCircle>
      <Status status={'online'} />

      <ProfileMenu
        ref={menuRef}
        isOpen={isOpen}
        onMouseEnter={cancelClose}
        onMouseLeave={closeMenu}
        role="menu"
        aria-label="Profile menu"
      >
        <ProfileHeader>
          <ProfileImage>
            {imageUrl ? (
              <img src={imageUrl} alt={userName} />
            ) : (
              <User size={32} color="#ffffff" />
            )}
          </ProfileImage>
          <ProfileName>{userName}</ProfileName>
          <ProfileRole>{userRole}</ProfileRole>
        </ProfileHeader>

        <ProfileActions>
          <ActionButton onClick={() => { navigate('/profile'); setIsOpen(false); }}>
            <User size={18} />
            Profile
            <ChevronRight size={16} />
          </ActionButton>

          <ActionButton onClick={() => { navigate('/settings'); setIsOpen(false); }}>
            <Settings size={18} />
            Settings
            <ChevronRight size={16} />
          </ActionButton>

          <ActionButton onClick={() => { navigate('/notifications'); setIsOpen(false); }}>
            <Bell size={18} />
            Notifications
            {unreadCount > 0 && <span>{unreadCount}</span>}
          </ActionButton>

          <ActionButton onClick={() => { console.log('Dark mode toggled'); setIsOpen(false); }}>
            <Moon size={18} />
            Dark Mode
          </ActionButton>

          <Divider />

          <ActionButton onClick={handleLogout}>
            <LogOut size={18} />
            Sign Out
          </ActionButton>
        </ProfileActions>
      </ProfileMenu>
    </AvatarContainer>
  );
};

export default ModernAvatar;
