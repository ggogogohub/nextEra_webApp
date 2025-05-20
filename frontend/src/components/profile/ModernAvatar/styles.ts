import styled from 'styled-components';

export const AvatarContainer = styled.div`
  position: relative;
  z-index: 1010;
`;

export const AvatarCircle = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: linear-gradient(135deg, #2a5cff 0%, #1a365d 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: 2px solid rgba(255, 255, 255, 0.1);
  padding: 0;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  
  &:hover, &:focus {
    border-color: #99d1ff;
    background: linear-gradient(135deg, #3a6bff 0%, #2a476d 100%);
    box-shadow: 0 0 0 4px rgba(42, 92, 255, 0.25);
    outline: none;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: scale(0.95);
    transition: transform 0.1s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
    transform: scale(0.9);
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  &:hover img, &:focus img {
    transform: scale(1);
  }
`;

export const Status = styled.div<{ status: 'online' | 'busy' | 'away' | 'offline' }>`
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #1a365d;
  background-color: ${({ status }) => {
    switch(status) {
      case 'online': return '#22c55e';
      case 'busy': return '#ef4444';
      case 'away': return '#f59e0b';
      case 'offline': return '#9ca3af';
      default: return '#22c55e';
    }
  }};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  ${AvatarCircle}:hover + & {
    transform: scale(1.1);
  }
`;

export const ProfileMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 280px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  transform-origin: top right;
  transform: ${({ isOpen }) => isOpen ? 'scale(1)' : 'scale(0.95)'};
  opacity: ${({ isOpen }) => isOpen ? '1' : '0'};
  visibility: ${({ isOpen }) => isOpen ? 'visible' : 'hidden'};
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), 
              opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1),
              visibility 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1011;

  @media (prefers-color-scheme: dark) {
    background: #0f172a;
    border: 1px solid #1e293b;
  }
`;

export const ProfileHeader = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  
  @media (prefers-color-scheme: dark) {
    border-color: rgba(255, 255, 255, 0.05);
  }
`;

export const ProfileImage = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2a5cff 0%, #1a365d 100%);
  overflow: hidden;
  margin-bottom: 12px;
  border: 2px solid rgba(42, 92, 255, 0.2);
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }
`;

export const ProfileName = styled.h3`
  margin: 0 0 4px;
  font-family: "SF Pro Display", -apple-system, sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #1a365d;
  
  @media (prefers-color-scheme: dark) {
    color: #ffffff;
  }
`;

export const ProfileRole = styled.p`
  margin: 0;
  font-family: "Google Sans", -apple-system, sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #64748b;
  
  @media (prefers-color-scheme: dark) {
    color: #94a3b8;
  }
`;

export const ProfileActions = styled.div`
  padding: 8px 0;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-family: "SF Pro Display", -apple-system, sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #334155;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: left;
  
  svg {
    margin-right: 12px;
    color: #64748b;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  span {
    margin-left: auto;
    color: #94a3b8;
  }
  
  &:hover, &:focus {
    background-color: rgba(42, 92, 255, 0.08);
    color: #2a5cff;
    outline: none;
    
    svg {
      color: #2a5cff;
    }
  }
  
  &:active {
    background-color: rgba(42, 92, 255, 0.12);
  }
  
  @media (prefers-color-scheme: dark) {
    color: #e2e8f0;
    
    &:hover, &:focus {
      background-color: rgba(30, 41, 59, 0.5);
      color: #99d1ff;
      
      svg {
        color: #99d1ff;
      }
    }
    
    &:active {
      background-color: rgba(30, 41, 59, 0.7);
    }
  }
`;

export const Divider = styled.div`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.05);
  margin: 8px 0;
  
  @media (prefers-color-scheme: dark) {
    background-color: rgba(255, 255, 255, 0.05);
  }
`; 