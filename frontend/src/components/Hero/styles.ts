import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #1a365d 0%, #0a1e3d 100%);
  position: relative;
  overflow: hidden;
`;

export const HeroContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

export const HeroText = styled.div`
  color: #ffffff;
`;

export const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  background: linear-gradient(135deg, #ffffff 0%, #99d1ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const PrimaryButton = styled(Link)`
  background: #2a5cff;
  color: #ffffff;
  padding: 0.8rem 1.6rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover, &:focus {
    background: #99d1ff;
    color: #1a365d;
    outline: none;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(42, 92, 255, 0.2);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

export const SecondaryButton = styled(Link)`
  background: transparent;
  color: #ffffff;
  padding: 0.8rem 1.6rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover, &:focus {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
    outline: none;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

export const AnimationWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    max-width: 300px;
  }
`;

export const HeroLogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`; 