import styled from 'styled-components';

export const WordmarkContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const LogoText = styled.span`
  font-family: "SF Pro Display", -apple-system, sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  color: #ffffff;
  letter-spacing: -0.02em;
  
  @media (prefers-color-scheme: dark) {
    color: #ffffff;
  }
`; 