import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { createPortal } from 'react-dom';

export interface ToastProps {
  message: string;
  type?: 'success' | 'warning' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
  className?: string;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 5000,
  onClose,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for exit animation
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  
  const types = {
    success: {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      styles: 'bg-status-normal text-text-light',
    },
    warning: {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      styles: 'bg-status-warning text-text-light',
    },
    error: {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
      styles: 'bg-status-emergency text-text-light',
    },
    info: {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      styles: 'bg-secondary text-text-light',
    },
  };
  
  return createPortal(
    <div
      className={twMerge(
        'fixed bottom-4 right-4 z-toast',
        'transform transition-all duration-menu',
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-2 opacity-0'
      )}
    >
      <div
        className={twMerge(
          'flex items-center p-4 rounded-lg shadow-modal',
          'min-w-[300px] max-w-md',
          types[type].styles,
          className
        )}
      >
        <div className="flex-shrink-0">{types[type].icon}</div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          type="button"
          className="ml-4 flex-shrink-0 text-current hover:opacity-75 focus:outline-none"
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
        >
          <span className="sr-only">Close</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>,
    document.body
  );
};

export interface ToastContainerProps {
  children: React.ReactNode;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ children }) => (
  <div className="fixed bottom-4 right-4 z-toast space-y-4">
    {children}
  </div>
); 