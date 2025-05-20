import styled from 'styled-components';

export const CardContainer = styled.div`
  background: ${({ theme }) => theme.colors.background.default};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => theme.spacing.base};
  transition: transform ${({ theme }) => theme.transitions.fast},
              box-shadow ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

export const CardTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
`;

export const CardContent = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
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