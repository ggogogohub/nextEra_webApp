import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const CardContainer = styled.div`
  background: ${theme.colors.surface.light};
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: ${theme.spacing[4]};
  transition: transform ${theme.animations.duration.fast} ${theme.animations.easing.default},
              box-shadow ${theme.animations.duration.fast} ${theme.animations.easing.default};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
`;

export const CardTitle = styled.h3`
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.sizes.lg};
  font-weight: ${theme.typography.weights.semibold};
  margin: 0 0 ${theme.spacing[2]};
`;

export const CardContent = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.base};
`;

export const CardHeader = styled.div`
  padding: 16px 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  font-family: "SF Pro Display", -apple-system, sans-serif;
  font-weight: 600;
  font-size: 1.125rem;
  color: #1a365d;
  
  @media (prefers-color-scheme: dark) {
    border-color: rgba(255, 255, 255, 0.05);
    color: #ffffff;
  }
`;

export const CardFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  
  @media (prefers-color-scheme: dark) {
    border-color: rgba(255, 255, 255, 0.05);
  }
`; 