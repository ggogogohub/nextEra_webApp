import { ReactNode } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import LogoWordmark from './LogoWordmark';
import { useAuth } from '../contexts/AuthContext';
import NotificationIcon from './NotificationIcon';
import ModernAvatar from './ModernAvatar';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

// Styled components
const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  background: rgba(36, 48, 80, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  color: ${({ theme }) => theme.colors.offWhite};
  padding: 0.7rem 2.2rem;
  box-shadow: 0 2px 16px 0 rgba(99, 102, 241, 0.10);
  min-height: 64px;
  display: flex;
  align-items: center;
  z-index: 1000;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;


const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.offWhite};
  text-decoration: none;
  font-weight: 600;
  font-size: 1.08rem;
  letter-spacing: -0.01em;
  padding: 0.4rem 0.8rem;
  border-radius: 0.7rem;
  transition: background 0.18s, color 0.18s;
  &:hover, &:focus {
    background: ${({ theme }) => theme.colors.brightTeal};
    color: ${({ theme }) => theme.colors.deepNavy};
    text-decoration: none;
    outline: none;
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.coralRed};
    outline-offset: 2px;
  }
`;

const Main = styled.main`
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const Footer = styled.footer`
  background-color: ${({ theme }) => theme.colors.offWhite};
  padding: 1rem 2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.deepNavy};
`;

interface LayoutProps {
  children: ReactNode;
}

import { useState, useEffect } from 'react';

const Layout = ({ children }: LayoutProps) => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      window.localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      window.localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  if (location.pathname === '/login' || location.pathname === '/register') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <LayoutContainer>
      <Header className="glass">
        <HeaderContent>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <LogoWordmark size={36} />
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            <Nav>
              {isAuthenticated ? (
                <>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                  <NavLink to="/schedules">Schedules</NavLink>
                  <NavLink to="/notifications">Notifications</NavLink>
                  {user?.role === 'admin' && <NavLink to="/admin">Admin</NavLink>}
                  <NotificationIcon />
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <ProfileMenuButton aria-label="User menu">
                        <ModernAvatar />
                      </ProfileMenuButton>
                    </DropdownMenu.Trigger>
                    <StyledDropdownMenuContent sideOffset={8} align="end">
                      <StyledDropdownMenuItem onSelect={() => navigate('/profile')}>Profile</StyledDropdownMenuItem>
                      <StyledDropdownMenuItem onSelect={handleLogout}>Logout</StyledDropdownMenuItem>
                    </StyledDropdownMenuContent>
                  </DropdownMenu.Root>
                </>
              ) : (
                <NavLink to="/login">Login</NavLink>
              )}
            </Nav>
            <button
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={() => setDarkMode(dm => !dm)}
              style={{
                background: 'none',
                border: 'none',
                color: 'inherit',
                padding: 0,
                marginLeft: '1rem',
                fontSize: '1.6rem',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                outline: 'none',
                transition: 'color 0.2s',
              }}
            >
              {darkMode ? (
                // Moon icon
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" /></svg>
              ) : (
                // Sun icon
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5" /><path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 6.95-1.41-1.41M6.34 6.34 4.93 4.93m12.02 0-1.41 1.41M6.34 17.66l-1.41 1.41" /></svg>
              )}
            </button>
          </div>
        </HeaderContent>
      </Header>
      <Main>{children}</Main>
      <Footer>
        &copy; {new Date().getFullYear()} NextEra Workforce. All rights reserved.
      </Footer>
    </LayoutContainer>
  );
};

// Styled Profile Menu Button
const ProfileMenuButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin-left: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  outline: none;
`;

// Styled Dropdown
const StyledDropdownMenuContent = styled(DropdownMenu.Content)`
  min-width: 160px;
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 8px 32px 0 rgba(99, 102, 241, 0.19);
  padding: 0.6rem 0;
  margin-top: 0.3rem;
  border: none;
  animation: fadeIn 0.23s cubic-bezier(0.4,0,0.2,1);
  z-index: 2000;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const StyledDropdownMenuItem = styled(DropdownMenu.Item)`
  width: 100%;
  padding: 0.85rem 1.2rem;
  font-size: 1.05rem;
  color: #23272f;
  border: none;
  background: none;
  cursor: pointer;
  transition: background 0.14s, color 0.14s;
  border-radius: 0.8rem;
  outline: none;
  display: flex;
  align-items: center;
  &:hover, &:focus {
    background: #f1f5f9;
    color: #6366f1;
    outline: none;
  }
  &:active {
    background: #e0e7ef;
    color: #4338ca;
  }
`;

export default Layout;
