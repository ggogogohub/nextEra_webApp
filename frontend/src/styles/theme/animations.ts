export const animations = {
  // Easing curves
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)', // Google Material
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.16, 1, 0.3, 1)', // Apple iOS
  },
  
  // Timing
  duration: {
    fastest: '0.1s',
    fast: '0.2s',
    normal: '0.3s',
    slow: '0.5s',
    slowest: '0.8s',
  },
  
  // Physics-based animations
  physics: {
    button: {
      mass: 1.0,
      stiffness: 200,
      damping: 20,
    },
    menu: {
      mass: 0.5,
      stiffness: 300,
      damping: 10,
    },
  },
  
  // Component specific animations
  components: {
    button: {
      press: 'scale(0.95)',
      hover: 'scale(1.02)',
    },
    menu: {
      enter: 'translateY(0)',
      exit: 'translateY(-10px)',
    },
    alert: {
      enter: 'scale(1)',
      exit: 'scale(0.95)',
    },
  },
  
  // Status animations
  status: {
    pulse: {
      duration: '0.5s',
      timing: 'infinite',
    },
    shimmer: {
      duration: '0.8s',
      timing: 'linear',
    },
  },
  
  keyframes: {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    fadeOut: {
      from: { opacity: 1 },
      to: { opacity: 0 },
    },
    slideIn: {
      from: { transform: 'translateY(100%)' },
      to: { transform: 'translateY(0)' },
    },
    slideOut: {
      from: { transform: 'translateY(0)' },
      to: { transform: 'translateY(100%)' },
    },
    scaleIn: {
      from: { transform: 'scale(0.95)', opacity: 0 },
      to: { transform: 'scale(1)', opacity: 1 },
    },
    scaleOut: {
      from: { transform: 'scale(1)', opacity: 1 },
      to: { transform: 'scale(0.95)', opacity: 0 },
    },
    pulse: {
      '0%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.05)' },
      '100%': { transform: 'scale(1)' },
    },
    spin: {
      from: { transform: 'rotate(0deg)' },
      to: { transform: 'rotate(360deg)' },
    },
  },
} as const;

export type AnimationSystem = typeof animations; 