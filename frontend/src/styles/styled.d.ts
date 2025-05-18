import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      coralRed: string;
      offWhite: string;
      lightCyan: string;
      darkBlue: string;
      deepNavy: string;
      brightTeal: string;
    };
    fonts: {
      primary: string;
    };
    fontSizes: {
      h1: string;
      h2: string;
      h3: string;
      body: string;
      small: string;
    };
    radii: {
      sm: string;
      md: string;
      lg: string;
      round: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
    };
    transitions: {
      default: string;
    };
  }
}
