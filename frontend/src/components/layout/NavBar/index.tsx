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

const NavBar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <NavBarContainer>
      <LogoContainer to="/">
        <Logo />
      </LogoContainer>

      <NavLinks>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/schedule">Schedule</NavLink>
        <NavLink to="/team">Team</NavLink>
        <NavLink to="/reports">Reports</NavLink>
      </NavLinks>

      <Actions>
        <NotificationIcon />
        <ModernAvatar />
        <CTAButton to="/get-started">Get Started</CTAButton>
      </Actions>

      <MobileMenuButton 
        onClick={toggleMobileMenu}
        className={isMobileMenuOpen ? 'open' : ''}
        aria-label="Toggle mobile menu"
        aria-expanded={isMobileMenuOpen}
      >
        <span />
      </MobileMenuButton>

      <MobileMenu isOpen={isMobileMenuOpen}>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/schedule">Schedule</NavLink>
        <NavLink to="/team">Team</NavLink>
        <NavLink to="/reports">Reports</NavLink>
        <CTAButton to="/get-started">Get Started</CTAButton>
      </MobileMenu>
    </NavBarContainer>
  );
};

export default NavBar; 