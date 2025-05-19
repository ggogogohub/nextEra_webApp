import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    coralRed: '#E63946',
    offWhite: '#F1FAEE',
    lightCyan: '#A8DADC',
    darkBlue: '#457B9D',
    deepNavy: '#1D3557',
    brightTeal: '#02C39A',
  },
  fonts: {
    primary: "'Inter', sans-serif",
  },
  fontSizes: {
    h1: '2.25rem',
    h2: '1.875rem',
    h3: '1.5rem',
    body: '1rem',
    small: '0.875rem',
  },
  radii: {
    sm: '2px',
    md: '4px',
    lg: '6px',
    round: '50%',
  },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 8px rgba(0,0,0,0.1)',
    lg: '0 8px 32px rgba(0,0,0,0.1)',
  },
  transitions: {
    default: '0.2s ease-in-out',
  },
};

export default theme;
