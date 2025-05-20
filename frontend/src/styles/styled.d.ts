import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      deepNavy: string;
      darkBlue: string;
      brightTeal: string;
      offWhite: string;
      coralRed: string;
      lightCyan: string;
      background: {
        default: string;
        hover: string;
        active: string;
      };
      text: {
        primary: string;
        secondary: string;
        tertiary: string;
        inverse: string;
        disabled: string;
      };
      error: string;
      warning: string;
      success: string;
      info: string;
    };
    spacing: {
      xs: string;
      sm: string;
      base: string;
      md: string;
      lg: string;
      xl: string;
    };
    typography: {
      fontSize: {
        xs: string;
        sm: string;
        base: string;
        md: string;
        lg: string;
        xl: string;
      };
      fontWeight: {
        normal: number;
        medium: number;
        semibold: number;
        bold: number;
      };
    };
    borderRadius: {
      none: string;
      sm: string;
      base: string;
      md: string;
      lg: string;
      full: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
    };
    transitions: {
      fast: string;
      normal: string;
      slow: string;
    };
  }
}
