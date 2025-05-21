import styled, { keyframes } from 'styled-components';
import { theme } from '../../../styles/theme';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const heartbeat = keyframes`
  0% { transform: scale(1); }
  14% { transform: scale(1.3); }
  28% { transform: scale(1); }
  42% { transform: scale(1.3); }
  70% { transform: scale(1); }
`;

export const IconContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: ${theme.spacing[2]};
  border-radius: 9999px;
  transition: background-color ${theme.animations.duration.fast} ${theme.animations.easing.default};

  &:hover {
    background-color: ${theme.colors.surface.light};
  }

  svg {
    color: ${theme.colors.text.primary};
  }
`;

export const IconButton = styled.button<{ hasUnread: boolean }>`
  background: none;
  border: none;
  padding: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  position: relative;
  color: ${({ theme }) => theme.colors.text.primary};
  transition: transform ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.secondary};
    outline-offset: 2px;
  }
`;

export const BellIcon = styled.div<{ pulse: boolean }>`
  position: relative;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${({ pulse }) => pulse ? heartbeat : 'none'} 1.5s ease-in-out infinite;
`;

export const Heartbeat = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 9999px;
  background: ${theme.colors.status.emergency.main};
  opacity: 0.2;
  animation: ${pulse} 2s ${theme.animations.easing.default} infinite;
`;

export const NotificationContainer = styled.div`
  position: relative;
  display: inline-block;
  display: flex;
  align-items: center;
  margin-left: 24px;
`;

export const NotificationBadge = styled.div`
  position: relative;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  background: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
  
  &:hover {
    background: rgba(153,209,255,0.1);
    border-color: #99d1ff;
  }

  svg {
    color: #ffffff;
    width: 24px;
    height: 24px;
  }

  span {
    position: absolute;
    top: 4px;
    right: 4px;
    background: #ef4444;
    color: #ffffff;
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 0.6rem;
    font-weight: 600;
    min-width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }
`;

export const NotificationListContainer = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 280px;
  max-height: 400px;
  overflow-y: auto;
  background: #0f172a;
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  z-index: 1011;
  border: 1px solid #1e293b;
  opacity: 1;
  visibility: visible;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), 
              opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1),
              visibility 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0;
  transform-origin: top right;
  transform: scale(1);

  &.hidden {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: scale(0.95);
  }
`;

export const NotificationItem = styled.div<{ isRead: boolean }>`
  padding: 12px 16px;
  border-bottom: 1px solid #1e293b;
  background: ${({ isRead }) => (isRead ? 'transparent' : 'rgba(42,92,255,0.05)')};
  transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  &:hover {
    background: rgba(42,92,255,0.1);
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const NotificationTitle = styled.h4`
  margin: 0 0 4px;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
`;

export const NotificationMessage = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: #a0aec0;
`;

export const NotificationTime = styled.span`
  display: block;
  margin-top: 8px;
  font-size: 0.75rem;
  color: #64748b;
`;

export const NotificationActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
`;

export const MarkAsReadButton = styled.button`
  background: none;
  border: none;
  color: #99d1ff;
  font-size: 0.75rem;
  cursor: pointer;
  padding: 4px 8px;
  margin-top: 0;
  border-radius: 4px;

  &:hover {
    background: rgba(153,209,255,0.1);
    text-decoration: none;
  }
`;

export const EmptyState = styled.div<{ hasFooter: boolean }>`
  padding: 20px;
  text-align: center;
  color: #94a3b8;
  font-family: "Google Sans", -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.6rem;
  background: #0f172a;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100px; /* Ensure similar height to avatar header */

  ${({ hasFooter }) => !hasFooter && `
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  `}

  p {
    margin: 0;
  }
`;

export const NotificationContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const NotificationListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #1e293b;
  h4 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: #ffffff;
    font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif;
  }
`;

export const MarkAllAsReadButton = styled.button`
  background: none;
  border: none;
  color: #99d1ff;
  font-size: 0.875rem;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;

  &:hover {
    background: rgba(153,209,255,0.1);
    text-decoration: none;
  }
`;

export const NotificationListFooter = styled.div`
  padding: 0;
  border-top: 1px solid #1e293b;
  text-align: center;
  background: #0f172a;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;

export const SeeAllLink = styled.button`
  background: none;
  border: none;
  color: #99d1ff;
  font-size: 14px;
  cursor: pointer;
  padding: 12px 16px;
  border-radius: 0 0 12px 12px;
  font-family: "Google Sans", -apple-system, BlinkMacSystemFont, sans-serif;
  transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.1s cubic-bezier(0.16, 1, 0.3, 1);
  width: 100%;
  text-align: center;
  font-weight: 500;

  &:hover {
    background: rgba(30, 41, 59, 0.5);
    text-decoration: none;
  }

  &:active {
    transform: scale(0.98);
  }
`; 