import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: {
        main: string;
        hover: string;
        active: string;
      };
      secondary: {
        main: string;
        hover: string;
        active: string;
      };
      surface: {
        light: string;
        dark: string;
      };
      status: {
        normal: {
          main: string;
          eco: string;
        };
        warning: {
          main: string;
          critical: string;
        };
        emergency: {
          main: string;
          critical: string;
        };
      };
      text: {
        primary: string;
        secondary: string;
        light: string;
      };
      border: {
        light: string;
        dark: string;
      };
    };
    typography: {
      fonts: {
        primary: string;
        secondary: string;
        mono: string;
      };
      weights: {
        regular: number;
        medium: number;
        semibold: number;
        bold: number;
      };
      sizes: {
        xs: string;
        sm: string;
        base: string;
        lg: string;
        xl: string;
        '2xl': string;
        '3xl': string;
        '4xl': string;
        '5xl': string;
      };
      lineHeights: {
        none: number;
        tight: number;
        snug: number;
        normal: number;
        relaxed: number;
        loose: number;
      };
      letterSpacing: {
        tighter: string;
        tight: string;
        normal: string;
        wide: string;
        wider: string;
        widest: string;
      };
    };
    spacing: {
      px: string;
      0: string;
      0.5: string;
      1: string;
      1.5: string;
      2: string;
      2.5: string;
      3: string;
      3.5: string;
      4: string;
      5: string;
      6: string;
      7: string;
      8: string;
      9: string;
      10: string;
      11: string;
      12: string;
      14: string;
      16: string;
      20: string;
      24: string;
      28: string;
      32: string;
      36: string;
      40: string;
      44: string;
      48: string;
      52: string;
      56: string;
      60: string;
      64: string;
      72: string;
      80: string;
      96: string;
    };
    animations: {
      duration: {
        fastest: string;
        fast: string;
        normal: string;
        slow: string;
        slowest: string;
      };
      easing: {
        default: string;
        linear: string;
        in: string;
        out: string;
        inOut: string;
        spring: string;
      };
    };
  }
}
