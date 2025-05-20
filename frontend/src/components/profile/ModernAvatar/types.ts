import { User } from '../../../types/user';

export interface ModernAvatarProps {
  user: User;
  actions: {
    onViewProfile?: () => void;
    onNotifications?: () => void;
    onSettings?: () => void;
    onDarkMode?: () => void;
    onLogout?: () => void;
  };
  className?: string;
} 