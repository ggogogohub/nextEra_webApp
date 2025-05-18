import { DefaultTheme } from 'styled-components';

const darkTheme: DefaultTheme = {
  colors: {
    coralRed: '#E63946',
    offWhite: '#F1FAEE',
    lightCyan: '#A8DADC',
    darkBlue: '#457B9D',
    deepNavy: '#1D3557',
    brightTeal: '#02C39A',
    // Dark mode specific overrides
    background: '#1D2330', // deep navy-ish
    card: '#232B3E',
    surface: '#27304A',
    text: '#F1FAEE',
    textSecondary: '#A8DADC',
    border: '#2C3550',
    glass: 'rgba(36, 48, 80, 0.7)',
    glassBlur: 'blur(16px)',
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
    sm: '0.4rem',
    md: '0.8rem',
    lg: '1.2rem',
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
