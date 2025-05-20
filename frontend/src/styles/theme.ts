import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    primary: '#1a365d',
    secondary: '#2a5cff',
    background: {
      default: '#ffffff',
      hover: '#f5f5f5',
      active: '#e5e7eb'
    },
    text: {
      primary: '#1a365d',
      secondary: '#4b5563',
      tertiary: '#717f90',
      inverse: '#ffffff',
      disabled: '#9ca3af'
    },
    error: '#ef4444',
    warning: '#f59e0b',
    success: '#22c55e',
    info: '#3b82f6'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    base: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem'
  },
  typography: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      md: '1.125rem',
      lg: '1.25rem',
      xl: '1.5rem'
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    base: '0.5rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
  },
  transitions: {
    fast: '0.15s ease-in-out',
    normal: '0.3s ease-in-out',
    slow: '0.5s ease-in-out'
  }
};
