import React from 'react';
import { FeatureSection, FeatureGrid } from './styles';
import { FeatureCard } from './FeatureCard';
import { features } from './featureData';

export const Features: React.FC = () => (
  <FeatureSection>
    <FeatureGrid>
      {features.map((feature) => (
        <FeatureCard
          key={feature.title}
          {...feature}
        />
      ))}
    </FeatureGrid>
  </FeatureSection>
); 