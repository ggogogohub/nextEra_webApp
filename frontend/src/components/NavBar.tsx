import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import NotificationIcon from './NotificationIcon';
import ModernAvatar from './ModernAvatar';
import Logo from './Logo';
import { LayoutDashboard as Dashboard, CalendarDays as Calendar, Bell, Settings, Sun, Moon, Menu, X, Users } from 'lucide-react';

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideDown = keyframes`
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// AuroraForge Design System - NavBar Container
const NavBarContainer = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  background: #1a365d; /* Deep Trust Blue */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  padding: 0;
  height: 64px; /* Fixed height for consistency */
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  z-index: 1000;
  margin: 0 auto;
  max-width: 100%;
  border-radius: 0; /* Completely rectangular as requested */
  animation: ${fadeIn} 0.5s ease-out;
  
  @media (max-width: 1024px) {
    /* Tablet adjustments */
    height: 60px;
  }
  
  @media (max-width: 768px) {
    /* Mobile adjustments */
    height: 56px;
  }
`;

// Brand logo container with modern styling
const LogoContainer = styled(Link)`
  font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600; /* SemiBold as per spec */
  color: #ffffff;
  text-decoration: none;
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  gap: 12px; /* 8px grid system (8px × 1.5) */
  border-radius: 0; /* Completely rectangular as requested */
  padding: 0 32px;
  height: 100%;
  background: rgba(10, 30, 61, 0.4); /* Darker shade for logo area */
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); /* Material Design easing */
  position: relative;
  flex-shrink: 0;
  min-width: 200px;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: #2a5cff; /* Action Blue */
    transform: scaleX(0.7);
    transform-origin: center;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  &:hover, &:focus {
    background: rgba(10, 30, 61, 0.6);
    outline: none;
    
    &::after {
      transform: scaleX(1);
    }
  }
  
  &:active {
    transform: scale(0.98);
    transition: transform 0.1s cubic-bezier(0.16, 1, 0.3, 1); /* Apple iOS critical easing */
  }
  
  span {
    font-size: 1.25rem;
    font-weight: 600;
    background: linear-gradient(90deg, #ffffff 0%, #99d1ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 20px rgba(42, 92, 255, 0.2);
  }
  
  @media (max-width: 768px) {
    min-width: auto;
    padding: 0 16px;
  }
`;

// Main navigation container with premium styling
const NavLinks = styled.nav`
  display: flex;
  height: 100%;
  margin-left: 32px;
  
  @media (max-width: 768px) {
    display: none; /* Hide on mobile */
  }
`;

// Premium NavLink label with responsive design
const NavLinkText = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  @media (max-width: 960px) {
    display: none;
  }
  
  span:first-child {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 2px;
  }
  
  span:last-child {
    font-size: 11px;
    opacity: 0.7;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

// Main navigation link styled as a premium UI element
const NavLink = styled(Link)<{ active?: boolean }>`
  position: relative;
  color: ${props => props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.7)'};
  text-decoration: none;
  font-family: "SF Pro Display", -apple-system, sans-serif;
  font-size: 14px;
  font-weight: ${props => props.active ? '600' : '500'};
  height: 100%;
  padding: 0 24px;
  border-radius: 0; /* Completely rectangular as requested */
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  background: ${props => props.active ? 'rgba(42, 92, 255, 0.15)' : 'transparent'};
  letter-spacing: 0.01em;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: ${props => props.active ? '3px solid #2a5cff' : '3px solid transparent'};
  overflow: hidden;
  
  /* Top highlight effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 0;
    background: rgba(42, 92, 255, 0.5);
    transition: height 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  /* Icon styling with premium appearance */
  svg {
    width: 20px;
    height: 20px;
    stroke-width: 1.5px;
    color: ${props => props.active ? '#99d1ff' : 'rgba(255, 255, 255, 0.7)'};
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  /* Active indicator dot */
  ${props => props.active && `
    &::after {
      content: '';
      position: absolute;
      right: 12px;
      top: 14px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #22c55e;
      box-shadow: 0 0 5px rgba(34, 197, 94, 0.5);
    }
  `}
  
  /* Hover and focus states with premium effects */
  &:hover, &:focus {
    color: #ffffff;
    background: rgba(42, 92, 255, 0.1);
    outline: none;
    
    &::before {
      height: 2px;
    }
    
    svg {
      color: #99d1ff;
      transform: translateY(-2px);
    }
  }
  
  /* Active state styling */
  ${props => props.active && `
    &::before {
      height: 2px;
      background: #2a5cff;
    }
  `}
  
  /* Premium transition for active indicator */
  &::after {
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
`;

// Right side utility controls container
const UtilityControls = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
  gap: 8px;
`;

// Theme toggle button with premium styling
const ThemeToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: none;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  svg {
    width: 18px;
    height: 18px;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(42, 92, 255, 0.5) 0%, rgba(42, 92, 255, 0) 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

// Mobile menu toggle button with premium styling
const MobileMenuToggle = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  svg {
    width: 24px;
    height: 24px;
    stroke-width: 1.5px;
  }
  
  &:hover {
    color: #ffffff;
  }
  
  @media (max-width: 768px) {
    display: flex;
    margin-right: 16px;
  }
`;

// Mobile navigation container
const MobileNavContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 56px;
  left: 0;
  width: 100%;
  height: ${props => props.isOpen ? 'calc(100vh - 56px)' : '0'};
  background: #0a1e3d;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: height 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 999;
  opacity: ${props => props.isOpen ? '1' : '0'};
`;

// Mobile navigation link with premium styling
const MobileNavLink = styled(Link)<{ active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 16px 24px;
  color: ${props => props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.8)'};
  text-decoration: none;
  font-family: "SF Pro Display", -apple-system, sans-serif;
  font-size: 16px;
  font-weight: ${props => props.active ? '600' : '500'};
  border-left: ${props => props.active ? '4px solid #2a5cff' : '4px solid transparent'};
  background: ${props => props.active ? 'rgba(42, 92, 255, 0.1)' : 'transparent'};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  svg {
    width: 20px;
    height: 20px;
    margin-right: 16px;
    stroke-width: 1.5px;
    color: ${props => props.active ? '#99d1ff' : 'rgba(255, 255, 255, 0.7)'};
  }
  
  &:hover {
    background: rgba(42, 92, 255, 0.05);
    color: #ffffff;
    
    svg {
      color: #99d1ff;
    }
  }
`;

// Define NavBar component
const NavBar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const location = useLocation();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Apply theme change logic here
  };
  
  // Check if the current route matches the link
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <NavBarContainer>
        <LogoContainer to="/">
          <Logo />
          <span>NextEra Workforce</span>
        </LogoContainer>
        
        <NavLinks>
          <NavLink to="/dashboard" active={isActive('/dashboard')}>
            <Dashboard />
            <NavLinkText>
              <span>Dashboard</span>
              <span>Overview</span>
            </NavLinkText>
          </NavLink>
          
          <NavLink to="/schedule" active={isActive('/schedule')}>
            <Calendar />
            <NavLinkText>
              <span>Schedule</span>
              <span>Shifts & Planning</span>
            </NavLinkText>
          </NavLink>
          
          <NavLink to="/teams" active={isActive('/teams')}>
            <Users />
            <NavLinkText>
              <span>Teams</span>
              <span>Management</span>
            </NavLinkText>
          </NavLink>
          
          <NavLink to="/settings" active={isActive('/settings')}>
            <Settings />
            <NavLinkText>
              <span>Settings</span>
              <span>Configuration</span>
            </NavLinkText>
          </NavLink>
        </NavLinks>
        
        <UtilityControls>
          <NotificationIcon count={3} />
          <ThemeToggle onClick={toggleTheme}>
            {isDarkMode ? <Sun /> : <Moon />}
          </ThemeToggle>
          <ModernAvatar name="John Doe" src="/assets/avatar.jpg" size={40} />
          <MobileMenuToggle onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </MobileMenuToggle>
        </UtilityControls>
      </NavBarContainer>
      
      {/* Mobile Navigation */}
      <MobileNavContainer isOpen={mobileMenuOpen}>
        <MobileNavLink to="/dashboard" active={isActive('/dashboard')}>
          <Dashboard /> Dashboard
        </MobileNavLink>
        
        <MobileNavLink to="/schedule" active={isActive('/schedule')}>
          <Calendar /> Schedule
        </MobileNavLink>
        
        <MobileNavLink to="/teams" active={isActive('/teams')}>
          <Users /> Teams
        </MobileNavLink>
        
        <MobileNavLink to="/settings" active={isActive('/settings')}>
          <Settings /> Settings
        </MobileNavLink>
      </MobileNavContainer>
    </>
  );
};

export default NavBar;

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideDown = keyframes`
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// AuroraForge Design System - NavBar Container
const NavBarContainer = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  background: #1a365d; /* Deep Trust Blue */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  padding: 0;
  height: 64px; /* Fixed height for consistency */
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  z-index: 1000;
  margin: 0 auto;
  max-width: 100%;
  border-radius: 0; /* Completely rectangular as requested */
  animation: ${fadeIn} 0.5s ease-out;
  
  @media (max-width: 1024px) {
    /* Tablet adjustments */
    height: 60px;
  }
  
  @media (max-width: 768px) {
    /* Mobile adjustments */
    height: 56px;
  }
`;

// Brand logo container with modern styling
const LogoContainer = styled(Link)`
  font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600; /* SemiBold as per spec */
  color: #ffffff;
  text-decoration: none;
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  gap: 12px; /* 8px grid system (8px × 1.5) */
  border-radius: 0; /* Completely rectangular as requested */
  padding: 0 32px;
  height: 100%;
  background: rgba(10, 30, 61, 0.4); /* Darker shade for logo area */
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); /* Material Design easing */
  position: relative;
  flex-shrink: 0;
  min-width: 200px;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: #2a5cff; /* Action Blue */
    transform: scaleX(0.7);
    transform-origin: center;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  &:hover, &:focus {
    background: rgba(10, 30, 61, 0.6);
    outline: none;
    
    &::after {
      transform: scaleX(1);
    }
  }
  
  &:active {
    transform: scale(0.98);
    transition: transform 0.1s cubic-bezier(0.16, 1, 0.3, 1); /* Apple iOS critical easing */
  }
  
  span {
    font-size: 1.25rem;
    font-weight: 600;
    background: linear-gradient(90deg, #ffffff 0%, #99d1ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 20px rgba(42, 92, 255, 0.2);
  }
  
  @media (max-width: 768px) {
    min-width: auto;
    padding: 0 16px;
  }
`;

// Main navigation container with premium styling
const NavLinks = styled.nav`
  display: flex;
  height: 100%;
  margin-left: 32px;
  
  @media (max-width: 768px) {
    display: none; /* Hide on mobile */
  }
`;

// Premium NavLink label with responsive design
const NavLinkText = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  @media (max-width: 960px) {
    display: none;
  }
  
  span:first-child {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 2px;
  }
  
  span:last-child {
    font-size: 11px;
    opacity: 0.7;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

// Main navigation link styled as a premium UI element
const NavLink = styled(Link)<{ active?: boolean }>`
  position: relative;
  color: ${props => props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.7)'};
  text-decoration: none;
  font-family: "SF Pro Display", -apple-system, sans-serif;
  font-size: 14px;
  font-weight: ${props => props.active ? '600' : '500'};
  height: 100%;
  padding: 0 24px;
  border-radius: 0; /* Completely rectangular as requested */
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  background: ${props => props.active ? 'rgba(42, 92, 255, 0.15)' : 'transparent'};
  letter-spacing: 0.01em;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: ${props => props.active ? '3px solid #2a5cff' : '3px solid transparent'};
  overflow: hidden;
  
  /* Top highlight effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 0;
    background: rgba(42, 92, 255, 0.5);
    transition: height 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  /* Icon styling with premium appearance */
  svg {
    width: 20px;
    height: 20px;
    stroke-width: 1.5px;
    color: ${props => props.active ? '#99d1ff' : 'rgba(255, 255, 255, 0.7)'};
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  /* Active indicator dot */
  ${props => props.active && `
    &::after {
      content: '';
      position: absolute;
      right: 12px;
      top: 14px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #22c55e;
      box-shadow: 0 0 5px rgba(34, 197, 94, 0.5);
    }
  `}
  
  /* Hover and focus states with premium effects */
  &:hover, &:focus {
    color: #ffffff;
    background: rgba(42, 92, 255, 0.1);
    outline: none;
    
    &::before {
      height: 2px;
    }
    
    svg {
      color: #99d1ff;
      transform: translateY(-2px);
    }
  }
  
  /* Active state styling */
  ${props => props.active && `
    &::before {
      height: 2px;
      background: #2a5cff;
    }
  `}
  
  /* Premium transition for active indicator */
  &::after {
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
`;

// AuroraForge Design System - NavBar Container
const NavBarContainer = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  background: #1a365d; /* Deep Trust Blue */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  padding: 0;
  height: 64px; /* Fixed height for consistency */
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  z-index: 1000;
  margin: 0 auto;
  max-width: 100%;
  border-radius: 0; /* Completely rectangular as requested */
  animation: ${fadeIn} 0.5s ease-out;
  
  @media (max-width: 1024px) {
    /* Tablet adjustments */
    height: 60px;
  }
  
  @media (max-width: 768px) {
    /* Mobile adjustments */
    height: 56px;
  }
`;

// Brand logo container with modern styling
const LogoContainer = styled(Link)`
  font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600; /* SemiBold as per spec */
  color: #ffffff;
  text-decoration: none;
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  gap: 12px; /* 8px grid system (8px × 1.5) */
  border-radius: 0; /* Completely rectangular as requested */
  padding: 0 32px;
  height: 100%;
  background: rgba(10, 30, 61, 0.4); /* Darker shade for logo area */
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); /* Material Design easing */
  position: relative;
  flex-shrink: 0;
  min-width: 200px;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: #2a5cff; /* Action Blue */
    transform: scaleX(0.7);
    transform-origin: center;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  &:hover, &:focus {
    background: rgba(10, 30, 61, 0.6);
    outline: none;
    
    &::after {
      transform: scaleX(1);
    }
  }
  
  &:active {
    transform: scale(0.98);
    transition: transform 0.1s cubic-bezier(0.16, 1, 0.3, 1); /* Apple iOS critical easing */
  }
  
  span {
    font-size: 1.25rem;
    font-weight: 600;
    background: linear-gradient(90deg, #ffffff 0%, #99d1ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 20px rgba(42, 92, 255, 0.2);
  }
  
  @media (max-width: 768px) {
    min-width: auto;
    padding: 0 16px;
  }
`;

// Main navigation container with premium styling
const NavLinks = styled.nav`
  display: flex;
  height: 100%;
  margin-left: 32px;
  
  @media (max-width: 768px) {
    display: none; /* Hide on mobile */
  }
`;

// Premium NavLink label with responsive design
const NavLinkText = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  @media (max-width: 960px) {
    display: none;
  }
  
  span:first-child {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 2px;
  }
  
  span:last-child {
    font-size: 11px;
    opacity: 0.7;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

// Main navigation link styled as a premium UI element
const NavLink = styled(Link)<{ active?: boolean }>`
  position: relative;
  color: ${props => props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.7)'};
  text-decoration: none;
  font-family: "SF Pro Display", -apple-system, sans-serif;
  font-size: 14px;
  font-weight: ${props => props.active ? '600' : '500'};
  height: 100%;
  padding: 0 24px;
  border-radius: 0; /* Completely rectangular as requested */
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  background: ${props => props.active ? 'rgba(42, 92, 255, 0.15)' : 'transparent'};
  letter-spacing: 0.01em;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: ${props => props.active ? '3px solid #2a5cff' : '3px solid transparent'};
  overflow: hidden;
  
  /* Top highlight effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 0;
    background: rgba(42, 92, 255, 0.5);
    transition: height 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  /* Icon styling with premium appearance */
  svg {
    width: 20px;
    height: 20px;
    stroke-width: 1.5px;
    color: ${props => props.active ? '#99d1ff' : 'rgba(255, 255, 255, 0.7)'};
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  /* Active indicator dot */
  ${props => props.active && `
    &::after {
      content: '';
      position: absolute;
      right: 12px;
      top: 14px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #22c55e;
      box-shadow: 0 0 5px rgba(34, 197, 94, 0.5);
    }
  `}
  
  /* Hover and focus states with premium effects */
  &:hover, &:focus {
    color: #ffffff;
    background: rgba(42, 92, 255, 0.1);
    outline: none;
    
    &::before {
      height: 2px;
    }
    
    svg {
      color: #99d1ff;
      transform: translateY(-2px);
    }
  }
  
  /* Active state styling */
  ${props => props.active && `
    &::before {
      height: 2px;
      background: #2a5cff;
    }
  `}
  
  /* Premium transition for active indicator */
  &::after {
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
`;


    margin-top: 4px;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

// Premium-styled actions container
const Actions = styled.div`
  display: flex;
  align-items: stretch;
  height: 100%;
  margin-left: auto;
  border-left: 1px solid rgba(255, 255, 255, 0.05);
`;

// Premium icon button with glow effects
const IconButton = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px; /* Wider for premium feel */
  height: 100%;
  border-radius: 0; /* Completely rectangular as requested */
  background: ${props => props.active ? 'rgba(42, 92, 255, 0.15)' : 'transparent'};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  color: ${props => props.active ? '#99d1ff' : '#ffffff'};
  border-left: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: ${props => props.active ? '3px solid #2a5cff' : '3px solid transparent'};
  overflow: hidden;
  
  /* Premium top highlight effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 0;
    background: rgba(42, 92, 255, 0.5);
    transition: height 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  /* Active indicator dot with glow effect */
  ${props => props.active && `
    &::after {
      content: '';
      position: absolute;
      bottom: 10px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #22c55e;
      box-shadow: 0 0 5px rgba(34, 197, 94, 0.5);
    }
  `}
  
  /* Premium hover and focus states */
  &:hover, &:focus {
    background: rgba(42, 92, 255, 0.1);
    outline: none;
    color: #99d1ff;
    
    &::before {
      height: 2px;
    }
    
    svg {
      transform: translateY(-2px);
    }
  }
  
  &:active {
    transform: scale(0.98);
    transition: transform 0.1s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  /* Premium icon styling */
  svg {
    width: 22px;
    height: 22px;
    stroke-width: 1.5px;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
`;

// Premium theme toggle with glow effect
const ThemeToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 100%;
  border-radius: 0; /* Completely rectangular as requested */
  background: transparent;
  border: none;
  border-left: 1px solid rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  color: #ffffff;
  overflow: hidden;
  
  /* Premium top highlight effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 0;
    background: rgba(42, 92, 255, 0.5);
    transition: height 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  /* Premium hover and focus states */
  &:hover, &:focus {
    background: rgba(42, 92, 255, 0.1);
    outline: none;
    color: #99d1ff;
    
    &::before {
      height: 2px;
    }
    
    svg {
      transform: translateY(-2px);
      color: #99d1ff;
    }
  }
  
  &:active {
    transform: scale(0.98);
    transition: transform 0.1s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  /* Premium icon styling */
  svg {
    width: 22px;
    height: 22px;
    stroke-width: 1.5px;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
`;

// Premium mobile menu button with animation
const MobileMenuButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 100%;
  border-radius: 0; /* Completely rectangular as requested */
  background: transparent;
  border: none;
  border-left: 1px solid rgba(255, 255, 255, 0.05);
  cursor: pointer;
  position: relative;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  color: #ffffff;
  overflow: hidden;
  
  /* Premium top highlight effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 0;
    background: rgba(42, 92, 255, 0.5);
    transition: height 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  @media (max-width: 768px) {
    display: flex;
  }
  
  &:hover, &:focus {
    background: rgba(42, 92, 255, 0.1);
    outline: none;
    
    &::before {
      height: 2px;
    }
    
    svg {
      color: #99d1ff;
      transform: translateY(-2px);
    }
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  svg {
    width: 22px;
    height: 22px;
    stroke-width: 1.5px;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
`;

// Premium mobile menu with advanced animation
const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0;
  background: #0f172a; /* Dark Shade of Deep Trust Blue for contrast */
  z-index: 999;
  transform: translateY(${props => props.isOpen ? '0' : '-100%'});
  opacity: ${props => props.isOpen ? '1' : '0'};
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  padding: 0;
  overflow-y: auto;
  border-radius: 0; /* Completely rectangular as requested */
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  
  @media (max-width: 768px) {
    display: block;
  }
  
  nav {
    display: flex;
    flex-direction: column;
  }
`;

// Premium mobile navigation link with shimmer effect
const MobileNavLink = styled(Link)<{ active?: boolean }>`
  position: relative;
  color: ${props => props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.8)'};
  text-decoration: none;
  font-family: "SF Pro Display", -apple-system, sans-serif;
  font-size: 16px;
  font-weight: ${props => props.active ? '600' : '500'};
  padding: 20px 24px;
  border-radius: 0; /* Completely rectangular as requested */
  background: ${props => props.active ? 'rgba(42, 92, 255, 0.2)' : 'transparent'};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  border-left: ${props => props.active ? '4px solid #2a5cff' : '4px solid transparent'};
  ${props => props.active && `animation: ${slideDown} 0.3s cubic-bezier(0.16, 1, 0.3, 1);`}
  
  /* Premium icon styling */
  svg {
    width: 22px;
    height: 22px;
    stroke-width: 1.5px;
    color: ${props => props.active ? '#99d1ff' : 'rgba(255, 255, 255, 0.8)'};
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  /* Active indicator dot with glow effect */
  ${props => props.active && `
    &::after {
      content: '';
      position: absolute;
      right: 24px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #22c55e;
      box-shadow: 0 0 5px rgba(34, 197, 94, 0.5);
    }
  `}
  
  /* Premium hover and focus states with shimmer effect */
  &:hover, &:focus {
    background: ${props => props.active ? 'rgba(42, 92, 255, 0.3)' : 'rgba(42, 92, 255, 0.1)'};
    color: #ffffff;
    outline: none;
    border-left: 4px solid ${props => props.active ? '#99d1ff' : '#2a5cff'};
    
    svg {
      color: #99d1ff;
      transform: translateY(-2px);
    }
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to right, 
        transparent 25%, 
        rgba(255, 255, 255, 0.05) 50%, 
        transparent 75%);
      background-size: 200% 100%;
      animation: ${shimmer} 2s infinite linear;
      pointer-events: none;
    }
  }
`;

// Content container for mobile nav link with secondary label
const MobileNavContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  
  span:first-child {
    font-weight: 600;
    margin-bottom: 4px;
  }
  
  span:last-child {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

const NavBar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const location = useLocation();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Here you would implement actual theme toggling logic
  };
  
  // Check if a path is active
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);
  
  return (
    <NavBarContainer>
      <LogoContainer to="/">
        <Logo />
        <span>NextEra</span>
      </LogoContainer>
      
      <NavLinks>
        <NavLink to="/dashboard" active={isActive('/dashboard')}>
          <Dashboard />
          <NavLinkText>
            <span>Dashboard</span>
            <span>Performance Overview</span>
          </NavLinkText>
        </NavLink>
        <NavLink to="/schedules" active={isActive('/schedules')}>
          <Calendar />
          <NavLinkText>
            <span>Schedules</span>
            <span>Shift Management</span>
          </NavLinkText>
        </NavLink>
        <NavLink to="/notifications" active={isActive('/notifications')}>
          <Bell />
          <NavLinkText>
            <span>Notifications</span>
            <span>Alerts & Updates</span>
          </NavLinkText>
        </NavLink>
        <NavLink to="/admin" active={isActive('/admin')}>
          <Users />
          <NavLinkText>
            <span>Admin</span>
            <span>User Management</span>
          </NavLinkText>
        </NavLink>
      </NavLinks>
      
      <Actions>
        <IconButton as="div" active={isActive('/notifications')}>
          <NotificationIcon />
        </IconButton>
        <IconButton as="div">
          <ModernAvatar />
        </IconButton>
        <ThemeToggle onClick={toggleTheme}>
          {isDarkMode ? <Sun /> : <Moon />}
        </ThemeToggle>
        
        <MobileMenuButton 
          onClick={toggleMobileMenu} 
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </MobileMenuButton>
      </Actions>
      
      <MobileMenu isOpen={mobileMenuOpen}>
        <nav>
          <MobileNavLink to="/dashboard" active={isActive('/dashboard')}>
            <Dashboard size={22} />
            <MobileNavContent>
              <span>Dashboard</span>
              <span>Performance Overview</span>
            </MobileNavContent>
          </MobileNavLink>
          <MobileNavLink to="/schedules" active={isActive('/schedules')}>
            <Calendar size={22} />
            <MobileNavContent>
              <span>Schedules</span>
              <span>Shift Management</span>
            </MobileNavContent>
          </MobileNavLink>
          <MobileNavLink to="/notifications" active={isActive('/notifications')}>
            <Bell size={22} />
            <MobileNavContent>
              <span>Notifications</span>
              <span>Alerts & Updates</span>
            </MobileNavContent>
          </MobileNavLink>
          <MobileNavLink to="/admin" active={isActive('/admin')}>
            <Users size={22} />
            <MobileNavContent>
              <span>Admin</span>
              <span>User Management</span>
            </MobileNavContent>
          </MobileNavLink>
        </nav>
      </MobileMenu>
    </NavBarContainer>
  );
};

export default NavBar;
