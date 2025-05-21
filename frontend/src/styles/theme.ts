import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    primary: {
      main: '#1a365d',
      hover: '#0a1e3d',
      active: '#2a5cff'
    },
    secondary: {
      main: '#2a5cff',
      hover: '#99d1ff',
      active: '#1a365d'
    },
    surface: {
      light: '#ffffff',
      dark: '#0f172a'
    },
    status: {
      normal: {
        main: '#22c55e',
        eco: '#14b8a6'
      },
      warning: {
        main: '#f59e0b',
        critical: '#f43f5e'
      },
      emergency: {
        main: '#ef4444',
        critical: '#b91c1c'
      }
    },
    text: {
      primary: '#1a365d',
      secondary: '#4b5563',
      light: '#ffffff'
    },
    border: {
      light: '#f5f5f5',
      dark: '#1e293b'
    }
  },
  typography: {
    fonts: {
      primary: '"SF Pro Display", system-ui, -apple-system, sans-serif',
      secondary: '"Google Sans", system-ui, -apple-system, sans-serif',
      mono: '"Roboto Mono", monospace'
    },
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem'
    },
    lineHeights: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em'
    }
  },
  spacing: {
    px: '1px',
    0: '0',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem'
  },
  animations: {
    duration: {
      fastest: '0.1s',
      fast: '0.2s',
      normal: '0.3s',
      slow: '0.5s',
      slowest: '0.8s'
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.16, 1, 0.3, 1)'
    }
  }
};
