import React, { useState, useRef, useEffect } from 'react';
import { User, Settings, LogOut, Bell, Moon, ChevronRight } from 'lucide-react';
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

interface ModernAvatarProps {
  imageUrl?: string;
  name?: string;
  role?: string;
  status?: 'online' | 'busy' | 'away' | 'offline';
  onLogout?: () => void;
}

const ModernAvatar: React.FC<ModernAvatarProps> = ({ 
  imageUrl = '',
  name = 'Alex Johnson',
  role = 'Shift Supervisor',
  status = 'online',
  onLogout = () => console.log('Logout clicked')
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <AvatarContainer ref={containerRef}>
      <AvatarCircle 
        onClick={toggleMenu}
        aria-label="Open profile menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {imageUrl ? (
          <img src={imageUrl} alt={name} />
        ) : (
          <User size={20} color="#ffffff" />
        )}
      </AvatarCircle>
      <Status status={status} />

      <ProfileMenu isOpen={isOpen}>
        <ProfileHeader>
          <ProfileImage>
            {imageUrl ? (
              <img src={imageUrl} alt={name} />
            ) : (
              <User size={32} color="#ffffff" />
            )}
          </ProfileImage>
          <ProfileName>{name}</ProfileName>
          <ProfileRole>{role}</ProfileRole>
        </ProfileHeader>

        <ProfileActions>
          <ActionButton onClick={() => console.log('Profile clicked')}>
            <User size={18} />
            Profile
            <ChevronRight size={16} />
          </ActionButton>

          <ActionButton onClick={() => console.log('Settings clicked')}>
            <Settings size={18} />
            Settings
            <ChevronRight size={16} />
          </ActionButton>

          <ActionButton onClick={() => console.log('Notifications clicked')}>
            <Bell size={18} />
            Notifications
            <span>3</span>
          </ActionButton>

          <ActionButton onClick={() => console.log('Dark mode clicked')}>
            <Moon size={18} />
            Dark Mode
            <span>Off</span>
          </ActionButton>

          <Divider />

          <ActionButton onClick={onLogout}>
            <LogOut size={18} />
            Logout
          </ActionButton>
        </ProfileActions>
      </ProfileMenu>
    </AvatarContainer>
  );
};

export default ModernAvatar; 