import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-top: 64px;
  background: ${theme.colors.surface.light};
  @media (prefers-color-scheme: dark) {
    background: ${theme.colors.surface.dark};
  }
`;

export const MainContent = styled.main`
  flex-grow: 1;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  @media (max-width: 1024px) {}
  @media (max-width: 768px) {}
`; 