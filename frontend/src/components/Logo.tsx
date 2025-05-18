import React from 'react';
import styled from 'styled-components';
import logoUrl from '../assets/NextEraLogo.svg';

const LogoWrapper = styled.span<{
  size?: number;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => (size ? `${size}px` : '36px')};
  height: ${({ size }) => (size ? `${size}px` : '36px')};
`;

const Logo: React.FC<{ size?: number; className?: string }> = ({ size = 36, className }) => (
  <LogoWrapper size={size} className={className}>
    <img src={logoUrl} alt="NextEra Workforce Logo" width={size} height={size} style={{ display: 'block' }} />
  </LogoWrapper>
);

export default Logo;
