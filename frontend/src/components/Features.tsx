import React from 'react';
import styled, { keyframes } from 'styled-components';
import Card from './Card';
import { Calendar, User, MessageCircle, BarChart } from 'lucide-react';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const FeatureSection = styled.section`
  padding: 4rem 2rem;
  background: var(--color-off-white);
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCardWrapper = styled.div`
  animation: ${fadeInUp} 0.8s ease-out;
  opacity: 0;
  animation-fill-mode: forwards;
  &:nth-child(1) { animation-delay: 0.1s; }
  &:nth-child(2) { animation-delay: 0.3s; }
  &:nth-child(3) { animation-delay: 0.5s; }
  &:nth-child(4) { animation-delay: 0.7s; }
`;

const IconWrapper = styled.div`
  margin-bottom: 1rem;
  svg {
    width: 2.5rem;
    height: 2.5rem;
    color: ${({ theme }) => theme.colors.coralRed};
  }
`;

const features = [
  {
    title: 'AI-Driven Scheduling',
    icon: <Calendar />, // icon
    description: 'Automate optimized rosters using Google OR-Tools.',
  },
  {
    title: 'Employee Self-Service Portal',
    icon: <User />, // icon
    description: 'Empower employees to view schedules and request time off.',
  },
  {
    title: 'Real-Time Communication',
    icon: <MessageCircle />, // icon
    description: 'Instant messaging and notifications for seamless coordination.',
  },
  {
    title: 'Data Analytics & Insights',
    icon: <BarChart />, // icon
    description: 'Visual workforce metrics for data-driven decisions.',
  },
];

const Features: React.FC = () => (
  <FeatureSection>
    <FeatureGrid>
      {features.map(({ title, icon, description }, idx) => (
        <FeatureCardWrapper key={idx}>
          <Card title={title}>
            <IconWrapper>{icon}</IconWrapper>
            <p>{description}</p>
          </Card>
        </FeatureCardWrapper>
      ))}
    </FeatureGrid>
  </FeatureSection>
);

export default Features;
