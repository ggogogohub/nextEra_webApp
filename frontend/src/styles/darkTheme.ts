import { DefaultTheme } from 'styled-components';

const darkTheme: DefaultTheme = {
  colors: {
    coralRed: '#E63946',
    offWhite: '#1D2330',
    lightCyan: '#A8DADC',
    darkBlue: '#27304A',
    deepNavy: '#F1FAEE',
    brightTeal: '#02C39A',
    // The following are for reference only, not part of DefaultTheme:
    // background: '#1D2330',
    // card: '#232B3E',
    // surface: '#27304A',
    // text: '#F1FAEE',
    // textSecondary: '#A8DADC',
    // border: '#2C3550',
    // glass: 'rgba(36, 48, 80, 0.7)',
    // glassBlur: 'blur(16px)',
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
    sm: '0 1px 2px rgba(0,0,0,0.10)',
    md: '0 4px 8px rgba(0,0,0,0.20)',
    lg: '0 8px 32px rgba(0,0,0,0.20)',
  },
  transitions: {
    default: '0.2s ease-in-out',
  },
};

export default darkTheme;
