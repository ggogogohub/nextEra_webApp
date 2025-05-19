import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background: ${({ theme }) => theme.colors.offWhite};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: 1.5rem;
  transition: transform ${({ theme }) => theme.transitions.default}, box-shadow ${({ theme }) => theme.transitions.default};
  &.glass {
    background: rgba(36, 48, 80, 0.7);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.08);
  }
  &:hover, &:focus {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    outline: none;
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brightTeal};
    outline-offset: 2px;
  }
`;

const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.h3};
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.deepNavy};
`;

const CardContent = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: ${({ theme }) => theme.colors.deepNavy};
  line-height: 1.4;
`;

interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => (
  <CardContainer tabIndex={0}>
    <CardTitle>{title}</CardTitle>
    <CardContent>{children}</CardContent>
  </CardContainer>
);

export default Card;
