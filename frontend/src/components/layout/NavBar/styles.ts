import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600; /* SemiBold */
  color: #ffffff;
  text-decoration: none;
  letter-spacing: 0.02em;
  display: flex;
  align-items: center;
  gap: 8px; /* 8px grid */
  border-radius: 4px; /* Use multiples of 8, or 4 as a smaller unit */
  padding: 8px 16px; /* Multiples of 8px */
  height: 52px; /* Specified size */
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); /* Default easing */
  
  &:hover, &:focus {
    background: rgba(153,209,255,0.1); /* Action Blue hover with transparency */
    outline: none;
    text-decoration: none; /* Explicitly remove underline on hover/focus */
  }
  
  &:active {
    transform: scale(0.98); /* Button Press animation scale */
    transition: transform 0.1s cubic-bezier(0.16, 1, 0.3, 1); /* Critical easing for active state */
    text-decoration: none; /* Explicitly remove underline on active */
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
  color: #ffffff;
  text-decoration: none;
  font-family: "Google Sans", "SF Pro Display", -apple-system, sans-serif;
  font-size: 1rem;
  font-weight: 400; /* Regular weight */
  line-height: 1.6; /* 1.6rem line height (applied to text, not container height) */
  padding: 8px 16px; /* Multiples of 8px */
  border-radius: 4px; /* Use multiples of 8, or 4 as a smaller unit */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); /* Default easing */
  background: transparent;
  letter-spacing: 0.01em;
  
  &:hover, &:focus {
    color: #99d1ff; /* Action Blue active state color */
    background: rgba(42,92,255,0.08); /* Action Blue with transparency */
    outline: none;
    text-decoration: none; /* Explicitly remove underline on hover/focus */
  }
  
  &.active {
    background: rgba(42,92,255,0.15); /* Action Blue with more transparency */
    color: #99d1ff; /* Action Blue active state color */
    /* Removed underline indicator */
    /*
    &::after {
      content: '';
      position: absolute;
      left: 16px; /* Align with padding */
      right: 16px; /* Align with padding */
      bottom: 4px; /* 8px grid - position it 4px from the bottom */
      height: 2px; /* Subtle indicator */
      background: #99d1ff; /* Action Blue active state color */
      border-radius: 1px;
    }
    */
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 24px; /* Increased gap to 24px for 8px grid */
`;

export const CTAButton = styled(Link)`
  background: #2a5cff; /* Action Blue */
  color: #ffffff;
  padding: 0 24px; /* Multiples of 8px */
  height: 52px; /* Specified size */
  border-radius: 8px; /* Multiples of 8px */
  font-family: "SF Pro Display", -apple-system, sans-serif;
  font-weight: 600; /* SemiBold */
  font-size: 1rem;
  text-decoration: none; /* Ensure no underline */
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); /* Default easing */
  border: 0.5px solid #1a365d; /* Deep Trust Blue stroke */
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.01em;
  
  @media (max-width: 768px) {
    height: 48px; /* Mobile size */
    padding: 0 20px; /* Adjusted padding for mobile */
  }
  
  &:hover, &:focus {
    background: #3a6bff; /* Slightly lighter Action Blue for hover */
    box-shadow: 0 0 0 4px rgba(42,92,255,0.25); /* Action Blue focus ring */
    outline: none;
    text-decoration: none; /* Explicitly ensure no underline on hover */
  }
  
  &:active {
    transform: scale(0.95); /* Button Press animation scale */
    transition: transform 0.1s cubic-bezier(0.16, 1, 0.3, 1); /* Critical easing for active state */
    text-decoration: none; /* Explicitly ensure no underline on active */
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

export const MobileMenu = styled.div<{ isOpen: boolean }>`
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
  transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(100%)'};
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