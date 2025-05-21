export const colors = {
  // Primary Colors
  primary: {
    main: '#1a365d',
    hover: '#0a1e3d',
    active: '#2a5cff',
  },
  
  secondary: {
    main: '#2a5cff',
    hover: '#99d1ff',
  },
  
  // Surface Colors
  surface: {
    light: {
      base: '#ffffff',
      shadow: '#f5f5f5',
    },
    dark: {
      base: '#1f2937',
      shadow: '#111827',
    },
  },
  
  // Status Colors
  status: {
    normal: {
      main: '#22c55e',
      eco: '#14b8a6',
    },
    warning: {
      main: '#f59e0b',
      critical: '#f43f5e',
    },
    emergency: {
      main: '#ef4444',
      critical: '#b91c1c',
    },
  },
  
  // Text Colors
  text: {
    primary: '#1f2937',
    secondary: '#4b5563',
    tertiary: '#6b7280',
    light: '#ffffff',
    inverse: '#000000',
    disabled: '#9ca3af',
  },
  
  // Border Colors
  border: {
    light: '#e5e7eb',
    dark: '#374151',
  },
  
  background: {
    default: '#ffffff',
    hover: '#f9fafb',
    active: '#f3f4f6',
  },
  
  info: '#3b82f6',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
} as const;

export type ColorSystem = typeof colors; 