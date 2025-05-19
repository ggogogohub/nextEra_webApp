import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --color-coral-red: ${({ theme }) => theme.colors.coralRed};
    --color-off-white: ${({ theme }) => theme.colors.offWhite};
    --color-light-cyan: ${({ theme }) => theme.colors.lightCyan};
    --color-dark-blue: ${({ theme }) => theme.colors.darkBlue};
    --color-deep-navy: ${({ theme }) => theme.colors.deepNavy};
    --color-bright-teal: ${({ theme }) => theme.colors.brightTeal};
    --font-primary: ${({ theme }) => theme.fonts.primary};
  }

  [data-theme='dark'] {
    --color-off-white: #1D2330;
    --color-light-cyan: #A8DADC;
    --color-dark-blue: #27304A;
    --color-deep-navy: #F1FAEE;
    --color-bright-teal: #02C39A;
    --color-coral-red: #E63946;
    --font-primary: ${({ theme }) => theme.fonts.primary};
    background-color: #1D2330;
    color: #F1FAEE;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: var(--font-primary);
    font-size: ${({ theme }) => theme.fontSizes.body};
    line-height: 1.5;
    color: var(--color-deep-navy);
    background-color: var(--color-off-white);
    transition: background 0.3s, color 0.3s;
  }

  a {
    color: var(--color-dark-blue);
    text-decoration: none;
    transition: color 0.2s;
    &:hover, &:focus {
      color: var(--color-coral-red);
      text-decoration: underline;
      outline: none;
    }
  }

  button, [tabindex]:not([tabindex='-1']) {
    cursor: pointer;
    outline: none;
    transition: box-shadow 0.2s, border 0.2s;
    &:focus-visible {
      outline: 2px solid var(--color-bright-teal);
      outline-offset: 2px;
      box-shadow: 0 0 0 2px var(--color-coral-red);
    }
  }

  /* Glassmorphism utility */
  .glass {
    background: rgba(29, 53, 87, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 4px;
    border: none;
  }
`;

export default GlobalStyles;
