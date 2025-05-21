export const layout = {
  grid: {
    columns: {
      desktop: 12,
      tablet: 8,
      mobile: 4,
    },
    gap: {
      desktop: '32px',
      tablet: '24px',
      mobile: '16px',
    },
  },
  container: {
    maxWidth: {
      desktop: '1440px',
      tablet: '1024px',
      mobile: '768px',
    },
    padding: {
      desktop: '32px',
      tablet: '24px',
      mobile: '16px',
    },
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1440px',
  },
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modal: 1300,
    popover: 1400,
    tooltip: 1500,
  },
} as const;

export type LayoutSystem = typeof layout; 