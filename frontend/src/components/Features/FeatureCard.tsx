import React from 'react';
import { IconWrapper, FeatureCardWrapper } from './styles';
import Card from "../ui/Card/index";

interface FeatureCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, icon, description }) => (
  <FeatureCardWrapper>
    <Card title={title}>
      <IconWrapper>{icon}</IconWrapper>
      <p>{description}</p>
    </Card>
  </FeatureCardWrapper>
); 