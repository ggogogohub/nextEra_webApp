import styled, { keyframes } from 'styled-components';
import { theme } from '@/styles/theme';

export const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const FeatureSection = styled.section`
  padding: ${theme.spacing[16]} ${theme.spacing[8]};
  background: ${theme.colors.surface.light};
`;

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const FeatureCardWrapper = styled.div`
  animation: ${fadeInUp} 0.8s ease-out;
  opacity: 0;
  animation-fill-mode: forwards;
  &:nth-child(1) { animation-delay: 0.1s; }
  &:nth-child(2) { animation-delay: 0.3s; }
  &:nth-child(3) { animation-delay: 0.5s; }
  &:nth-child(4) { animation-delay: 0.7s; }
`;

export const IconWrapper = styled.div`
  margin-bottom: 1rem;
  svg {
    width: 2.5rem;
    height: 2.5rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`; 