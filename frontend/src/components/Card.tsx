import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background: ${({ theme }) => theme.colors.offWhite};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: box-shadow ${({ theme }) => theme.transitions.default};
  &.glass {
    background: rgba(29, 53, 87, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: none;
  }
  &:hover, &:focus {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
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
