import React from 'react';
import NavBar from '../NavBar';
import { Outlet } from 'react-router-dom';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col pt-16 bg-background">
      <NavBar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4">
        {children || <Outlet />}
      </main>
    </div>
  );
};

export default Layout; 