import React from 'react';
import { HeroLogo } from './HeroLogo';
import { HeroAnimation } from './HeroAnimation';
import {
  HeroSection,
  HeroContent,
  HeroText,
  Title,
  Subtitle,
  Buttons,
  PrimaryButton,
  SecondaryButton
} from './styles';

export const Hero: React.FC = () => {
  return (
    <HeroSection>
      <HeroContent>
        <HeroText>
          <HeroLogo />
          <Title>AI-Driven Workforce Management</Title>
          <Subtitle>
            Optimize schedules, manage teams, and boost productivity with NextEra Workforce's intelligent platform.
          </Subtitle>
          <Buttons>
            <PrimaryButton to="/demo">Request a Demo</PrimaryButton>
            <SecondaryButton to="/features">Learn More</SecondaryButton>
          </Buttons>
        </HeroText>
        <HeroAnimation />
      </HeroContent>
    </HeroSection>
  );
}; 