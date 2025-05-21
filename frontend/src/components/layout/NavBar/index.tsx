import React, { useState } from 'react';
import { NotificationIcon } from '../../notifications/NotificationIcon';
import ModernAvatar from '../../profile/ModernAvatar';
import Logo from '../../ui/LogoWordmark';
import {
  NavBarContainer,
  LogoContainer,
  NavLinks,
  NavLink,
  Actions,
  MobileMenuButton,
  CTAButton,
  MobileMenu
} from './styles';
import { useAuth } from '../../../hooks/useAuth';

const NavBar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <NavBarContainer>
      <LogoContainer to="/">
        <Logo />
      </LogoContainer>

      {isAuthenticated && (
        <NavLinks>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/schedule">Schedule</NavLink>
          <NavLink to="/team">Team</NavLink>
          <NavLink to="/reports">Reports</NavLink>
        </NavLinks>
      )}

      <Actions>
        {isAuthenticated && <NotificationIcon />}
        {isAuthenticated && <ModernAvatar />}

        {!isAuthenticated && <CTAButton to="/login">Get Started</CTAButton>}
      </Actions>

      <MobileMenu isOpen={isMobileMenuOpen}>
        {isAuthenticated ? (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/schedule">Schedule</NavLink>
            <NavLink to="/team">Team</NavLink>
            <NavLink to="/reports">Reports</NavLink>
          </>
        ) : (
          <CTAButton to="/login">Get Started</CTAButton>
        )}
      </MobileMenu>

      <MobileMenuButton
        onClick={toggleMobileMenu}
        className={isMobileMenuOpen ? 'open' : ''}
        aria-label="Toggle mobile menu"
        aria-expanded={isMobileMenuOpen}
      >
        <span />
      </MobileMenuButton>
    </NavBarContainer>
  );
};

export default NavBar; 