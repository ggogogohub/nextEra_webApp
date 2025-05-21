import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { theme } from '../../../styles/theme';

export const NavBarContainer = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  background: rgba(26, 54, 93, 0.9); /* Deep Trust Blue with transparency */
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.12);
  border-bottom: 1px solid rgba(255,255,255,0.04);
  padding: 0 32px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
  margin: 0 auto;
  max-width: 100%;
  /* Ensure no overflow hiding that could crop dropdowns */
  overflow: visible;
  
  @media (max-width: 1024px) {
    padding: 0 24px;
  }
  
  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

export const LogoContainer = styled(Link)`
  font-family: ${theme.typography.fonts.primary};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.text.light};
  text-decoration: none;
  letter-spacing: 0.02em;
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  border-radius: 4px;
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  height: 52px;
  transition: all ${theme.animations.duration.fast} ${theme.animations.easing.default};
  
  &:hover, &:focus {
    background: ${theme.colors.primary.hover}10;
    outline: none;
    text-decoration: none;
  }
  
  &:active {
    transform: scale(0.98);
    transition: transform ${theme.animations.duration.fastest} ${theme.animations.easing.spring};
    text-decoration: none;
  }
`;

export const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 16px; /* Increased gap to 16px for 8px grid */
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled(Link)`
  position: relative;
  color: ${theme.colors.text.light};
  text-decoration: none;
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.base};
  font-weight: ${theme.typography.weights.regular};
  line-height: ${theme.typography.lineHeights.relaxed};
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  border-radius: 4px;
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.default};
  background: transparent;
  letter-spacing: 0.01em;
  
  &:hover, &:focus {
    color: ${theme.colors.secondary.main};
    background: ${theme.colors.primary.hover}10;
    outline: none;
    text-decoration: none;
  }
  
  &.active {
    background: ${theme.colors.primary.hover}20;
    color: ${theme.colors.secondary.main};
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 24px; /* Increased gap to 24px for 8px grid */
`;

export const CTAButton = styled(Link)`
  background: ${theme.colors.secondary.main};
  color: ${theme.colors.text.light};
  padding: 0 ${theme.spacing[6]};
  height: 52px;
  border-radius: 8px;
  font-family: ${theme.typography.fonts.primary};
  font-weight: ${theme.typography.weights.semibold};
  font-size: ${theme.typography.sizes.base};
  text-decoration: none;
  transition: all ${theme.animations.duration.fast} ${theme.animations.easing.default};
  border: 0.5px solid ${theme.colors.primary.main};
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.01em;
  
  @media (max-width: 768px) {
    height: 48px;
    padding: 0 ${theme.spacing[5]};
  }
  
  &:hover, &:focus {
    background: ${theme.colors.secondary.hover};
    box-shadow: 0 0 0 4px ${theme.colors.secondary.main}40;
    outline: none;
    text-decoration: none;
  }
  
  &:active {
    transform: scale(0.95);
    transition: transform ${theme.animations.duration.fastest} ${theme.animations.easing.spring};
    text-decoration: none;
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px; /* Multiples of 8px */
  height: 40px; /* Multiples of 8px */
  border-radius: 8px; /* Multiples of 8px */
  background: rgba(30,41,59,0.5); /* Darker surface with transparency */
  border: none;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); /* Default easing */
  
  @media (max-width: 768px) {
    display: flex;
  }
  
  &:hover, &:focus {
    background: rgba(42,92,255,0.2); /* Action Blue with transparency */
    outline: none;
  }
  
  &:active {
    transform: scale(0.95); /* Button Press animation scale */
  }
  
  span {
    display: block;
    position: relative;
    width: 20px; /* Adjusted size for 8px grid */
    height: 2px;
    background: #ffffff;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); /* Default easing */
    
    &::before, &::after {
      content: '';
      position: absolute;
      width: 20px; /* Adjusted size for 8px grid */
      height: 2px;
      background: #ffffff;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); /* Default easing */
    }
    
    &::before {
      transform: translateY(-7px); /* Adjusted for 8px grid */
    }
    
    &::after {
      transform: translateY(7px); /* Adjusted for 8px grid */
    }
  }
  
  &.open {
    span {
      background: transparent;
      
      &::before {
        transform: rotate(45deg);
      }
      
      &::after {
        transform: rotate(-45deg);
      }
    }
  }
`;

export const MobileMenu = styled.div<{ $isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15,23,42,0.98); /* Dark Mode Surface base with transparency */
  backdrop-filter: blur(10px);
  padding: 24px; /* Multiples of 8px */
  flex-direction: column;
  gap: 16px; /* Multiples of 8px */
  transform: ${({ $isOpen }) => $isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); /* Critical easing */
  
  @media (max-width: 768px) {
    display: flex;
  }
  
  ${NavLink} {
    font-size: 1.25rem; /* Adjusted font size */
    padding: 16px; /* Multiples of 8px */
    
    &::after {
      display: none; /* No underline/indicator in mobile menu */
    }
  }
  
  ${CTAButton} {
    margin-top: auto;
    width: 100%; /* Full width in mobile menu */
  }
`; 