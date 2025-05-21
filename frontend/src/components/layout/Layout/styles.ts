import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.surface.light};
  
  @media (prefers-color-scheme: dark) {
    background: ${theme.colors.surface.dark};
  }
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 24px;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  
  @media (max-width: 1024px) {
    padding: 16px;
  }
  
  @media (max-width: 768px) {
    padding: 12px;
  }
`; 