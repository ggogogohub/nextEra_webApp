import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NotificationIcon from './NotificationIcon';
import ModernAvatar from './ModernAvatar';

const NavBarContainer = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  background: rgba(29, 53, 87, 0.9); /* deepNavy with opacity */
  backdrop-filter: blur(10px);
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: 0.8rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
`;

const Logo = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.h2};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.offWhite};
  text-decoration: none;
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  position: relative;
  color: ${({ theme }) => theme.colors.offWhite};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.body};
  padding: 0.5rem 0;
  transition: color ${({ theme }) => theme.transitions.default};

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.brightTeal};
    outline: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.coralRed};
    transition: width 0.3s ease;
  }

  &:hover::after,
  &:focus::after {
    width: 100%;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CTAButton = styled(Link)`
  background: ${({ theme }) => theme.colors.coralRed};
  color: ${({ theme }) => theme.colors.offWhite};
  padding: 0.6rem 1.2rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-weight: 600;
  text-decoration: none;
  transition: background ${({ theme }) => theme.transitions.default};

  &:hover,
  &:focus {
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
        <NotificationIcon />
        <ModernAvatar name="User" />
        <CTAButton to="/demo">Request Demo</CTAButton>
      </Actions>
    </NavBarContainer>
  );
};

export default NavBar;
