import React from 'react';
import Features from '../components/Features';
import styled from 'styled-components';

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Landing: React.FC = () => (
  <LandingContainer>
    <Features />
  </LandingContainer>
);

export default Landing;
