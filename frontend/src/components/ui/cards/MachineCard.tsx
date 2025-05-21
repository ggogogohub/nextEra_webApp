import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import { StatusIndicator } from '../status/StatusIndicator';

interface Metric {
  value: string | number;
  unit?: string;
}

interface MachineCardProps {
  name: string;
  status: 'normal' | 'warning' | 'emergency' | 'eco';
  metrics?: Metric[];
  onClick?: () => void;
}

const Card = styled.div`
  height: 64px;
  padding: ${theme.spacing[4]};
  background-color: ${theme.colors.surface.light};
  border: 1px solid ${theme.colors.border.light};
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: ${theme.spacing[4]};
  cursor: pointer;
  transition: all ${theme.animations.duration.fast} ${theme.animations.easing.default};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[1]};
`;

const Name = styled.h3`
  font-family: ${theme.typography.fonts.primary};
  font-weight: ${theme.typography.weights.semibold};
  font-size: ${theme.typography.sizes.base};
  color: ${theme.colors.text.primary};
  margin: 0;
`;

const Metrics = styled.div`
  display: flex;
  gap: ${theme.spacing[4]};
`;

const Metric = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${theme.spacing[1]};
`;

const Value = styled.span`
  font-family: ${theme.typography.fonts.mono};
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.text.secondary};
`;

const Unit = styled.span`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes.xs};
  color: ${theme.colors.text.secondary};
`;

export const MachineCard: React.FC<MachineCardProps> = ({
  name,
  status,
  metrics = [],
  onClick,
}) => {
  return (
    <Card onClick={onClick}>
      <StatusIndicator type={status} size="medium" />
      <Content>
        <Name>{name}</Name>
        {metrics.length > 0 && (
          <Metrics>
            {metrics.map((metric, index) => (
              <Metric key={index}>
                <Value>{metric.value}</Value>
                {metric.unit && <Unit>{metric.unit}</Unit>}
              </Metric>
            ))}
          </Metrics>
        )}
      </Content>
    </Card>
  );
}; 