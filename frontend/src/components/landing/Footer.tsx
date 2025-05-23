import React from 'react';
import styled from 'styled-components';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const FooterWrap = styled.footer`
  width: 100%;
  max-width: 100vw;
  position: relative;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 0 18px 0;
  margin-top: 0;
  box-sizing: border-box;
  z-index: 1000;
`;

const Socials = styled.div`
  display: flex;
  gap: 36px;
  margin-bottom: 18px;
`;

const SocialIcon = styled.a`
  color: #1a365d;
  font-size: 2.2rem;
  transition: color 0.2s, transform 0.18s;
  opacity: 0.85;
  &:hover {
    color: #2a5cff;
    transform: scale(1.12);
    opacity: 1;
  }
`;

const Copyright = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 1.08rem;
  color: #1a365d;
  opacity: 0.8;
  margin-top: 0;
  letter-spacing: 0.04em;
`;

const Footer: React.FC = () => (
  <FooterWrap>
    <Socials>
      <SocialIcon href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><FaTwitter /></SocialIcon>
      <SocialIcon href="https://linkedin.com/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></SocialIcon>
      <SocialIcon href="https://github.com/" target="_blank" rel="noopener noreferrer"><FaGithub /></SocialIcon>
    </Socials>
    <Copyright>
      © 2025 NextEra. All rights reserved.
    </Copyright>
  </FooterWrap>
);

export default Footer; 