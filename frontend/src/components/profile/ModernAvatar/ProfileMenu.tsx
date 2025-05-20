import React from 'react';
import { User, Bell, Settings, Moon, LogOut, ChevronRight } from 'lucide-react';
import { User as UserType } from '../../../types/user';
import {
  ProfileMenu as StyledMenu,
  ProfileHeader,
  ProfileImage,
  ProfileName,
  ProfileRole,
  ProfileActions,
  ActionButton,
  Divider
} from './styles';

interface ProfileMenuProps {
  isOpen: boolean;
  user: UserType;
  actions: {
    onViewProfile?: () => void;
    onNotifications?: () => void;
    onSettings?: () => void;
    onDarkMode?: () => void;
    onLogout?: () => void;
  };
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({
  isOpen,
  user,
  actions
}) => {
  return (
    <StyledMenu isOpen={isOpen} role="menu" aria-label="Profile menu">
      <ProfileHeader>
        <ProfileImage>
          {user.avatar_url ? (
            <img src={user.avatar_url} alt={user.name} />
          ) : (
            <User color="#fff" size={32} strokeWidth={1.5} />
          )}
        </ProfileImage>
        <ProfileName>{user.name}</ProfileName>
        <ProfileRole>{user.role}</ProfileRole>
      </ProfileHeader>
      
      <ProfileActions>
        <ActionButton onClick={actions.onViewProfile}>
          <User size={18} strokeWidth={1.5} />
          View Profile
          <ChevronRight size={16} strokeWidth={1.5} />
        </ActionButton>
        <ActionButton onClick={actions.onNotifications}>
          <Bell size={18} strokeWidth={1.5} />
          Notifications
          <span>12</span>
        </ActionButton>
        <ActionButton onClick={actions.onSettings}>
          <Settings size={18} strokeWidth={1.5} />
          Settings
          <ChevronRight size={16} strokeWidth={1.5} />
        </ActionButton>
        
        <Divider />
        
        <ActionButton onClick={actions.onDarkMode}>
          <Moon size={18} strokeWidth={1.5} />
          Dark Mode
          <span>Auto</span>
        </ActionButton>
        
        <Divider />
        
        <ActionButton onClick={actions.onLogout}>
          <LogOut size={18} strokeWidth={1.5} />
          Sign Out
        </ActionButton>
      </ProfileActions>
    </StyledMenu>
  );
}; 