import React from 'react';
import styled, { keyframes } from 'styled-components';

const gradientAnim = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(120deg, #1a365d 0%, #2a5cff 100%);
  animation: ${gradientAnim} 10s ease-in-out infinite;
`;

const GlassOverlay = styled.div`
  position: relative;
  background: rgba(255,255,255,0.12);
  box-shadow: 0 8px 32px 0 rgba(31,38,135,0.18);
  border-radius: 32px;
  border: 1.5px solid rgba(255,255,255,0.22);
  padding: 48px 32px 40px 32px;
  min-width: 340px;
  max-width: 600px;
  min-height: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  @media (max-width: 600px) {
    padding: 32px 12px 24px 12px;
    min-width: 90vw;
    max-width: 95vw;
  }
`;

const Headline = styled.h1`
  font-family: 'SF Pro Display', sans-serif;
  font-size: 2.6rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 18px;
  text-align: center;
  letter-spacing: -1px;
  text-shadow: 0 2px 16px rgba(42,92,255,0.18);
`;

const Subheadline = styled.p`
  font-family: 'Google Sans', sans-serif;
  font-size: 1.18rem;
  color: #e5e7eb;
  margin-bottom: 32px;
  text-align: center;
`;

const GetStartedButton = styled.a`
  display: inline-block;
  padding: 16px 40px;
  font-family: 'SF Pro Display', sans-serif;
  font-size: 1.18rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(90deg, #99d1ff 0%, #2a5cff 100%);
  border-radius: 16px;
  border: none;
  box-shadow: 0 2px 8px rgba(42,92,255,0.12);
  cursor: pointer;
  text-decoration: none;
  transition: background 0.18s, transform 0.12s, text-decoration 0.1s;
  &:hover, &:focus, &:active {
    background: linear-gradient(90deg, #2a5cff 0%, #99d1ff 100%);
    color: #fff;
    text-decoration: none;
    outline: none;
    transform: scale(0.97);
  }
`;

const Hero3D: React.FC = () => (
  <HeroSection>
    <GlassOverlay>
      <Headline>Welcome to the Future of Workforce Management</Headline>
      <Subheadline>
        AuroraForge delivers next-gen industrial software with immersive UI, real-time data, and AI-driven insights. Experience the new era of work—today.
      </Subheadline>
      <GetStartedButton href="#get-started">Get Started</GetStartedButton>
    </GlassOverlay>
  </HeroSection>
);

export default Hero3D; 