import React from 'react';
import { CardContainer, CardContent, CardHeader } from './styles.ts';

interface CardProps {
  title?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <CardContainer>
      {title && <CardHeader>{title}</CardHeader>}
      <CardContent>{children}</CardContent>
    </CardContainer>
  );
};

export default Card;