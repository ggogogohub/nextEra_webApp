import React from 'react';
import LogoWordmark from '../ui/LogoWordmark';
import { HeroLogoContainer } from './styles';

export const HeroLogo: React.FC = () => {
  return (
    <HeroLogoContainer>
      <LogoWordmark />
    </HeroLogoContainer>
  );
}; 