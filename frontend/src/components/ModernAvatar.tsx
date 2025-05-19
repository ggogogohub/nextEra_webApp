import React from 'react';
import styled from 'styled-components';
import { User as UserIcon } from 'lucide-react';

const AvatarCircle = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background: #6366f1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  cursor: pointer;
  &:hover, &:focus {
    background: #4f46e5;
    outline: none;
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
        style={{ width: '100%', height: '100%', borderRadius: '4px' }}
      />
    ) : (
      <UserIcon color="#fff" size={20} />
    )}
  </AvatarCircle>
);

export default ModernAvatar;
