import React from 'react';
import styled from 'styled-components';
import { User as UserIcon } from 'lucide-react';

const AvatarCircle = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1 60%, #60a5fa 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px 0 rgba(99, 102, 241, 0.12);
  transition: box-shadow 0.18s, border 0.18s;
  border: 2px solid transparent;
  cursor: pointer;
  &:hover, &:focus {
    box-shadow: 0 4px 16px 0 rgba(99, 102, 241, 0.22);
    border: 2px solid #6366f1;
  }
`;

interface ModernAvatarProps {
  imageUrl?: string;
}

const ModernAvatar: React.FC<ModernAvatarProps> = ({ imageUrl }) => (
  <AvatarCircle tabIndex={0} aria-label="Profile menu">
    {imageUrl ? (
      <img
        src={imageUrl}
        alt="Profile"
        style={{ width: '100%', height: '100%', borderRadius: '50%' }}
      />
    ) : (
      <UserIcon color="#fff" size={20} />
    )}
  </AvatarCircle>
);

export default ModernAvatar;
