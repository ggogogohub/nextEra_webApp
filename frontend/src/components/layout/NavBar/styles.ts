import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavBarContainer = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  background: linear-gradient(90deg, rgba(26,54,93,0.98) 0%, rgba(26,54,93,0.95) 100%);
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
  
  @media (max-width: 1024px) {
    padding: 0 24px;
  }
  
  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

export const LogoContainer = styled(Link)`
  font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
  color: #ffffff;
  text-decoration: none;
  letter-spacing: 0.02em;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  padding: 8px 16px;
  height: 52px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover, &:focus {
    background: rgba(153,209,255,0.1);
    outline: none;
  }
  
  &:active {
    transform: scale(0.98);
    transition: transform 0.1s cubic-bezier(0.16, 1, 0.3, 1);
  }
`;

export const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  
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
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 4px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: transparent;
  letter-spacing: 0.01em;
  
  &:hover, &:focus {
    color: #99d1ff;
    background: rgba(42,92,255,0.08);
    outline: none;
  }
  
  &.active {
    background: rgba(42,92,255,0.15);
    color: #99d1ff;
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const CTAButton = styled(Link)`
  background: #2a5cff;
  color: #ffffff;
  padding: 0 24px;
  height: 52px;
  border-radius: 8px;
  font-family: "SF Pro Display", -apple-system, sans-serif;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border: 0.5px solid #1a365d;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.01em;
  
  @media (max-width: 768px) {
    height: 48px;
    padding: 0 20px;
  }
  
  &:hover, &:focus {
    background: #3a6bff;
    box-shadow: 0 0 0 4px rgba(42,92,255,0.25);
    outline: none;
  }
  
  &:active {
    transform: scale(0.95);
    transition: transform 0.1s cubic-bezier(0.16, 1, 0.3, 1);
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: rgba(30,41,59,0.5);
  border: none;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  @media (max-width: 768px) {
    display: flex;
  }
  
  &:hover, &:focus {
    background: rgba(42,92,255,0.2);
    outline: none;
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  span {
    display: block;
    position: relative;
    width: 18px;
    height: 2px;
    background: #ffffff;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &::before, &::after {
      content: '';
      position: absolute;
      width: 18px;
      height: 2px;
      background: #ffffff;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    &::before {
      transform: translateY(-6px);
    }
    
    &::after {
      transform: translateY(6px);
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
  background: rgba(26,54,93,0.98);
  backdrop-filter: blur(10px);
  padding: 24px;
  flex-direction: column;
  gap: 16px;
  transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  
  @media (max-width: 768px) {
    display: flex;
  }
  
  ${NavLink} {
    font-size: 1.25rem;
    padding: 16px;
    
    &::after {
      display: none;
    }
  }
  
  ${CTAButton} {
    margin-top: auto;
  }
`; 