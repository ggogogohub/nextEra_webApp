import styled, { keyframes } from 'styled-components';

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
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.hover};
  }

  svg {
    color: ${({ theme }) => theme.colors.text.primary};
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
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.error};
  opacity: 0.2;
  animation: ${pulse} 2s ease-in-out infinite;
`;

export const NotificationContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const NotificationBadge = styled.div`
  position: relative;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.background.default};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.background.hover};
  }

  span {
    position: absolute;
    top: -5px;
    right: -5px;
    background: ${({ theme }) => theme.colors.error};
    color: ${({ theme }) => theme.colors.text.inverse};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    padding: 2px 6px;
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

export const NotificationListContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 320px;
  max-height: 480px;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.background.default};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  z-index: 1000;
`;

export const NotificationItem = styled.div<{ isRead: boolean }>`
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.background.hover};
  background: ${({ theme, isRead }) =>
    isRead ? 'transparent' : theme.colors.background.hover};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.background.hover};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const NotificationTitle = styled.h4`
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const NotificationMessage = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const NotificationTime = styled.span`
  display: block;
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

export const NotificationActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export const MarkAsReadButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  cursor: pointer;
  padding: 0;
  margin-top: ${({ theme }) => theme.spacing.xs};

  &:hover {
    text-decoration: underline;
  }
`;

export const EmptyState = styled.div`
  padding: ${({ theme }) => theme.spacing.base};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

export const NotificationContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`; 