import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'small' | 'default' | 'large';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const StyledButton = styled.button<PrimaryButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing[2]};
  height: ${({ size }) => 
    size === 'small' ? '40px' : 
    size === 'large' ? '64px' : 
    '52px'};
  padding: 0 ${theme.spacing[6]};
  border-radius: 8px;
  font-family: ${theme.typography.fonts.primary};
  font-weight: ${theme.typography.weights.semibold};
  font-size: ${theme.typography.sizes.base};
  line-height: ${theme.typography.lineHeights.tight};
  transition: all ${theme.animations.duration.fast} ${theme.animations.easing.default};
  
  /* Default variant */
  background-color: ${theme.colors.primary.main};
  color: ${theme.colors.text.light};
  border: 0.5px solid ${theme.colors.primary.hover};
  
  &:hover {
    background-color: ${theme.colors.primary.hover};
    transform: scale(1.02);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  &:disabled {
    background-color: ${theme.colors.surface.light};
    color: ${theme.colors.text.secondary};
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  /* Outline variant */
  ${({ variant }) => variant === 'outline' && `
    background-color: transparent;
    border: 1px solid ${theme.colors.primary.main};
    color: ${theme.colors.primary.main};
    
    &:hover {
      background-color: ${theme.colors.primary.main}10;
    }
  `}
  
  /* Ghost variant */
  ${({ variant }) => variant === 'ghost' && `
    background-color: transparent;
    border: none;
    color: ${theme.colors.primary.main};
    
    &:hover {
      background-color: ${theme.colors.primary.main}10;
    }
  `}
  
  /* Loading state */
  ${({ isLoading }) => isLoading && `
    position: relative;
    color: transparent;
    
    &::after {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      border: 2px solid ${theme.colors.text.light};
      border-radius: 50%;
      border-top-color: transparent;
      animation: spin ${theme.animations.duration.normal} linear infinite;
    }
  `}
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  variant = 'default',
  size = 'default',
  isLoading = false,
  leftIcon,
  rightIcon,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      isLoading={isLoading}
      {...props}
    >
      {!isLoading && leftIcon}
      {children}
      {!isLoading && rightIcon}
    </StyledButton>
  );
}; 