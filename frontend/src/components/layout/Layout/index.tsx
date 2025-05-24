import React from 'react';
import NavBar from '../NavBar';
import { Outlet } from 'react-router-dom';
import { LayoutContainer, MainContent } from './styles';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <NavBar />
      <MainContent>
        {children || <Outlet />}
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout; 