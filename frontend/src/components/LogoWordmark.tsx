import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';

const Wordmark = styled.span`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1.45rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.offWhite};
  letter-spacing: -0.5px;
  margin-left: 0.7rem;
  @media (max-width: 600px) {
    font-size: 1.1rem;
    margin-left: 0.3rem;
  }
`;

const LogoWordmark: React.FC<{ size?: number; className?: string }> = ({ size = 36, className }) => (
  <span style={{ display: 'flex', alignItems: 'center' }} className={className}>
    <Logo size={size} />
    <Wordmark>
      NextEra <span style={{ fontWeight: 400, opacity: 0.85 }}>Workforce</span>
    </Wordmark>
  </span>
);

export default LogoWordmark;
