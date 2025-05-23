import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { NotificationIcon } from '../../notifications/NotificationIcon';
import ModernAvatar from '../../profile/ModernAvatar';
import Logo from '../../ui/LogoWordmark';

const NavBar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-background/80 border-b shadow z-50 flex items-center px-6">
      <Link to="/" className="flex items-center font-bold text-lg text-foreground no-underline">
        <Logo />
      </Link>
      {isAuthenticated && (
        <nav className="hidden md:flex flex-1 items-center justify-center space-x-4">
          <Link to="/dashboard" className="px-4 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">Dashboard</Link>
          <Link to="/schedule" className="px-4 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">Schedule</Link>
          <Link to="/team" className="px-4 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">Team</Link>
          <Link to="/reports" className="px-4 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">Reports</Link>
        </nav>
      )}
      <div className="flex items-center gap-4 ml-auto">
        {isAuthenticated && <NotificationIcon />}
        {isAuthenticated && <ModernAvatar />}
        {!isAuthenticated && (
          <Link to="/login" className="px-6 h-10 flex items-center rounded-md bg-primary text-primary-foreground font-semibold text-sm border border-border hover:bg-primary/90 transition-colors">Get Started</Link>
        )}
      </div>
      {/* Mobile menu button */}
      <button onClick={toggleMobileMenu} className="ml-4 flex md:hidden items-center justify-center w-10 h-10 rounded-md bg-accent/50 hover:bg-accent/80 transition" aria-label="Toggle mobile menu" aria-expanded={isMobileMenuOpen}>
        <span className="block w-5 h-0.5 bg-foreground relative">
          <span className="absolute w-5 h-0.5 bg-foreground -top-2 left-0 transition-transform" style={{transform: isMobileMenuOpen ? 'rotate(45deg) translateY(8px)' : 'none'}} />
          <span className="absolute w-5 h-0.5 bg-foreground top-2 left-0 transition-transform" style={{transform: isMobileMenuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none'}} />
        </span>
      </button>
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-16 left-0 w-full bg-background/95 border-b shadow-md flex flex-col items-center py-4 md:hidden z-40">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="w-full text-center px-4 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground transition-colors">Dashboard</Link>
              <Link to="/schedule" className="w-full text-center px-4 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground transition-colors">Schedule</Link>
              <Link to="/team" className="w-full text-center px-4 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground transition-colors">Team</Link>
              <Link to="/reports" className="w-full text-center px-4 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground transition-colors">Reports</Link>
            </>
          ) : (
            <Link to="/login" className="w-full text-center px-4 py-3 text-base font-semibold bg-primary text-primary-foreground rounded-md border border-border hover:bg-primary/90 transition-colors">Get Started</Link>
          )}
        </div>
      )}
    </header>
  );
};

export default NavBar; 