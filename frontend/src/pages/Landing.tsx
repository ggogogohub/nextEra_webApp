import React from 'react';
import styled from 'styled-components';
import Hero3D from '../components/landing/Hero3D';
import BentoGrid from '../components/landing/BentoGrid';
import Testimonials from '../components/landing/Testimonials';
import CommunityFeed from '../components/landing/CommunityFeed';
import Footer from '../components/landing/Footer';

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fff;
  /* overflow-x: hidden; */
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  background: #fff;
`;

const Landing: React.FC = () => (
  <LandingContainer>
    <Hero3D />
    <MainContent>
      <BentoGrid />
      <Testimonials />
      <CommunityFeed />
    </MainContent>
    <Footer />
  </LandingContainer>
);

export default Landing;
