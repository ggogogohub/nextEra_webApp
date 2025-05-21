import React from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../../styles/theme';

type StatusType = 'normal' | 'warning' | 'emergency' | 'eco';

interface StatusIndicatorProps {
  type: StatusType;
  label?: string;
  size?: 'small' | 'medium' | 'large';
  pulse?: boolean;
}

const getStatusSize = (size: StatusIndicatorProps['size']) => {
  switch (size) {
    case 'small':
      return '8px';
    case 'large':
      return '16px';
    default:
      return '12px';
  }
};

const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const getStatusColor = (type: StatusType) => {
  switch (type) {
    case 'normal':
      return theme.colors.status.normal.main;
    case 'warning':
      return theme.colors.status.warning.main;
    case 'emergency':
      return theme.colors.status.emergency.main;
    case 'eco':
      return theme.colors.status.normal.eco;
    default:
      return theme.colors.status.normal.main;
  }
};

const Indicator = styled.div<{ type: StatusType; size: StatusIndicatorProps['size']; pulse: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  
  &::before {
    content: '';
    display: block;
    width: ${({ size }) => getStatusSize(size)};
    height: ${({ size }) => getStatusSize(size)};
    border-radius: 50%;
    background-color: ${({ type }) => getStatusColor(type)};
    ${({ pulse }) => pulse && `
      animation: ${pulse} ${theme.animations.duration.normal} ${theme.animations.easing.default} infinite;
    `}
  }
`;

const Label = styled.span`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.text.secondary};
`;

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  type,
  label,
  size = 'medium',
  pulse = false,
}) => {
  return (
    <Indicator type={type} size={size} pulse={pulse}>
      {label && <Label>{label}</Label>}
    </Indicator>
  );
}; 