import React from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../../styles/theme';

interface EmergencyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 ${theme.colors.status.emergency.main}80;
  }
  70% {
    box-shadow: 0 0 0 10px ${theme.colors.status.emergency.main}00;
  }
  100% {
    box-shadow: 0 0 0 0 ${theme.colors.status.emergency.main}00;
  }
`;

const StyledButton = styled.button<EmergencyButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing[2]};
  height: 64px;
  padding: 0 ${theme.spacing[6]};
  border-radius: 8px;
  font-family: ${theme.typography.fonts.primary};
  font-weight: ${theme.typography.weights.semibold};
  font-size: ${theme.typography.sizes.base};
  line-height: ${theme.typography.lineHeights.tight};
  transition: all ${theme.animations.duration.fast} ${theme.animations.easing.spring};
  
  background-color: ${theme.colors.status.emergency.main};
  color: ${theme.colors.text.light};
  border: 2px solid ${theme.colors.text.light};
  
  ${({ isActive }) => isActive && `
    animation: ${pulse} ${theme.animations.duration.normal} ${theme.animations.easing.default} infinite;
  `}
  
  &:hover {
    background-color: ${theme.colors.status.emergency.critical};
    transform: scale(1.02);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  &:disabled {
    background-color: ${theme.colors.surface.light};
    color: ${theme.colors.text.secondary};
    border-color: ${theme.colors.text.secondary};
    opacity: 0.3;
    cursor: not-allowed;
    animation: none;
  }
`;

export const EmergencyButton: React.FC<EmergencyButtonProps> = ({
  children,
  isActive = false,
  ...props
}) => {
  return (
    <StyledButton
      isActive={isActive}
      {...props}
    >
      {children}
    </StyledButton>
  );
}; 