import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NotificationIcon from './NotificationIcon';
import ModernAvatar from './ModernAvatar';

const NavBarContainer = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  background: linear-gradient(90deg, rgba(29,53,87,0.95) 0%, rgba(29,53,87,0.85) 100%);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border-radius: 0;
  border: none;
  padding: 1rem 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
  margin: 0 auto;
  max-width: 100%;
`;

const Logo = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.h2};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.offWhite};
  text-decoration: none;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 4px;
  padding: 0.3rem 1.2rem;
  transition: background 0.2s;
  &:hover, &:focus {
    background: rgba(2,195,154,0.10);
    outline: none;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 2.2rem;
`;

const NavLink = styled(Link)`
  position: relative;
  color: ${({ theme }) => theme.colors.offWhite};
  text-decoration: none;
  font-size: 1.08rem;
  font-weight: 600;
  padding: 0.7rem 1.3rem;
  border-radius: 4px;
  transition: color 0.2s, background 0.2s;
  background: transparent;
  &:hover, &:focus {
    color: ${({ theme }) => theme.colors.brightTeal};
    background: rgba(2,195,154,0.15);
    outline: none;
  }
  &.active {
    background: rgba(2,195,154,0.2);
    color: ${({ theme }) => theme.colors.brightTeal};
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const IconButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.7rem;
  height: 2.7rem;
  border-radius: 4px;
  background: rgba(255,255,255,0.07);
  transition: background 0.2s;
  cursor: pointer;
  &:hover, &:focus {
    background: rgba(2,195,154,0.15);
    outline: none;
  }
`;

const CTAButton = styled(Link)`
  background: ${({ theme }) => theme.colors.coralRed};
  color: ${({ theme }) => theme.colors.offWhite};
  padding: 0.7rem 1.7rem;
  border-radius: 4px;
  font-weight: 700;
  font-size: 1.08rem;
  text-decoration: none;
  transition: background 0.2s;
  border: none;
  outline: none;
  &:hover, &:focus {
    background: ${({ theme }) => theme.colors.brightTeal};
    color: ${({ theme }) => theme.colors.offWhite};
    outline: none;
  }
`;

const NavBar: React.FC = () => {
  return (
    <NavBarContainer>
      <Logo to="/">NextEra Workforce</Logo>
      <NavLinks>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/features">Features</NavLink>
        <NavLink to="/pricing">Pricing</NavLink>
        <NavLink to="/about">About</NavLink>
      </NavLinks>
      <Actions>
        <IconButton as="span"><NotificationIcon /></IconButton>
        <IconButton as="span"><ModernAvatar /></IconButton>
        <CTAButton to="/demo">Request Demo</CTAButton>
      </Actions>
    </NavBarContainer>
  );
};

export default NavBar;
