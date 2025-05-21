import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --color-coral-red: ${({ theme }) => theme.colors.status.emergency.main};
    --color-off-white: ${({ theme }) => theme.colors.surface.light};
    --color-light-cyan: ${({ theme }) => theme.colors.secondary.hover};
    --color-dark-blue: ${({ theme }) => theme.colors.primary.main};
    --color-deep-navy: ${({ theme }) => theme.colors.primary.hover};
    --color-bright-teal: ${({ theme }) => theme.colors.status.normal.main};
  }

  [data-theme='dark'] {
    --color-off-white: ${({ theme }) => theme.colors.surface.dark};
    --color-light-cyan: ${({ theme }) => theme.colors.secondary.hover};
    --color-dark-blue: ${({ theme }) => theme.colors.primary.main};
    --color-deep-navy: ${({ theme }) => theme.colors.text.primary};
    --color-bright-teal: ${({ theme }) => theme.colors.status.normal.main};
    --color-coral-red: ${({ theme }) => theme.colors.status.emergency.main};
    background-color: ${({ theme }) => theme.colors.surface.dark};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fonts.secondary};
    line-height: ${({ theme }) => theme.typography.lineHeights.normal};
    font-weight: ${({ theme }) => theme.typography.weights.regular};
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: ${({ theme }) => theme.typography.sizes.base};
    background-color: var(--color-off-white);
    transition: background 0.3s, color 0.3s;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.fonts.primary};
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    color: ${({ theme }) => theme.colors.text.primary};
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
