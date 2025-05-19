import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie-player';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import LogoWordmark from './LogoWordmark';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const HeroSection = styled.section`
  width: 100%;
  min-height: calc(100vh - 64px);
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.deepNavy} 0%, ${({ theme }) => theme.colors.darkBlue} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  animation: ${fadeInUp} 1s ease-out;
  max-width: 1200px;
  width: 100%;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const HeroText = styled.div`
  max-width: 600px;
  color: ${({ theme }) => theme.colors.offWhite};
  text-align: center;
  animation: ${fadeInUp} 1.2s ease-out;
  @media (min-width: 768px) {
    text-align: left;
  }
`;

const AnimationWrapper = styled.div`
  max-width: 500px;
  width: 100%;
  margin-bottom: 2rem;
  animation: ${fadeInUp} 1.4s ease-out;
  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-left: 2rem;
  }
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.h1};
  margin-bottom: 1rem;
  line-height: 1.2;
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.h3};
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const PrimaryButton = styled(Link)`
  background: ${({ theme }) => theme.colors.brightTeal};
  color: ${({ theme }) => theme.colors.deepNavy};
  padding: 0.8rem 1.6rem;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s;

  &:hover, &:focus {
    background: ${({ theme }) => theme.colors.offWhite};
    color: ${({ theme }) => theme.colors.deepNavy};
    outline: none;
  }
`;

const SecondaryButton = styled(Link)`
  background: transparent;
  color: ${({ theme }) => theme.colors.offWhite};
  padding: 0.8rem 1.6rem;
  border: 2px solid ${({ theme }) => theme.colors.offWhite};
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;

  &:hover, &:focus {
    background: ${({ theme }) => theme.colors.offWhite};
    color: ${({ theme }) => theme.colors.deepNavy};
    outline: none;
  }
`;

const Hero: React.FC = () => {
  const [animationData, setAnimationData] = useState<any>(null);
  useEffect(() => {
    fetch('https://assets7.lottiefiles.com/packages/lf20_jcikwtux.json')
      .then(res => res.json())
      .then(setAnimationData);
  }, []);

  return (
    <HeroSection>
      <HeroContent>
        <HeroText>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.8rem' }}>
            <LogoWordmark size={56} />
          </div>
          <Title>AI-Driven Workforce Management</Title>
          <Subtitle>Optimize schedules, manage teams, and boost productivity with NextEra Workforce’s intelligent platform.</Subtitle>
          <Buttons>
            <PrimaryButton to="/demo">Request a Demo</PrimaryButton>
            <SecondaryButton to="/features">Learn More</SecondaryButton>
          </Buttons>
        </HeroText>
        <AnimationWrapper>
          {animationData && <Lottie loop play animationData={animationData} style={{ width: '100%' }} />}
        </AnimationWrapper>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;
