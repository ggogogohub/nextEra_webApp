import React from 'react';
import { theme } from '../../../styles/theme';
import styled from 'styled-components';

interface Shift {
  id: string;
  startTime: string;
  endTime: string;
  worker: string;
  role: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'conflict';
}

interface ShiftScheduleTableProps {
  shifts: Shift[];
  onShiftClick?: (shift: Shift) => void;
}

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-family: ${theme.typography.fonts.body};
`;

const Header = styled.thead`
  position: sticky;
  top: 0;
  z-index: ${theme.zIndex.dropdown};
  background-color: ${theme.colors.primary.main};
  color: ${theme.colors.text.light};
`;

const HeaderCell = styled.th`
  padding: ${theme.spacing.layout.table.cellPadding};
  text-align: left;
  font-weight: ${theme.typography.weights.semibold};
  font-size: ${theme.typography.sizes.sm};
  border-bottom: 2px solid ${theme.colors.primary.hover};
`;

const Row = styled.tr<{ status: Shift['status'] }>`
  height: ${theme.spacing.layout.table.rowHeight};
  background-color: ${({ status }) => 
    status === 'conflict' ? `${theme.colors.status.emergency.main}10` :
    status === 'in-progress' ? `${theme.colors.status.warning.main}10` :
    status === 'completed' ? `${theme.colors.status.normal.main}10` :
    'transparent'};
  
  &:nth-child(even) {
    background-color: ${({ status }) => 
      status === 'conflict' ? `${theme.colors.status.emergency.main}15` :
      status === 'in-progress' ? `${theme.colors.status.warning.main}15` :
      status === 'completed' ? `${theme.colors.status.normal.main}15` :
      theme.colors.surface.light.shadow};
  }
  
  ${({ status }) => status === 'conflict' && `
    background-image: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 2px,
      ${theme.colors.status.emergency.main}20 2px,
      ${theme.colors.status.emergency.main}20 4px
    );
  `}
`;

const Cell = styled.td`
  padding: ${theme.spacing.layout.table.cellPadding};
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.text.primary};
  border-bottom: 1px solid ${theme.colors.border.light};
`;

const StatusCell = styled(Cell)<{ status: Shift['status'] }>`
  color: ${({ status }) => 
    status === 'conflict' ? theme.colors.status.emergency.main :
    status === 'in-progress' ? theme.colors.status.warning.main :
    status === 'completed' ? theme.colors.status.normal.main :
    theme.colors.text.secondary};
`;

export const ShiftScheduleTable: React.FC<ShiftScheduleTableProps> = ({
  shifts,
  onShiftClick,
}) => {
  return (
    <Table>
      <Header>
        <tr>
          <HeaderCell>Start Time</HeaderCell>
          <HeaderCell>End Time</HeaderCell>
          <HeaderCell>Worker</HeaderCell>
          <HeaderCell>Role</HeaderCell>
          <HeaderCell>Status</HeaderCell>
        </tr>
      </Header>
      <tbody>
        {shifts.map((shift) => (
          <Row
            key={shift.id}
            status={shift.status}
            onClick={() => onShiftClick?.(shift)}
            style={{ cursor: onShiftClick ? 'pointer' : 'default' }}
          >
            <Cell>{shift.startTime}</Cell>
            <Cell>{shift.endTime}</Cell>
            <Cell>{shift.worker}</Cell>
            <Cell>{shift.role}</Cell>
            <StatusCell status={shift.status}>
              {shift.status.charAt(0).toUpperCase() + shift.status.slice(1)}
            </StatusCell>
          </Row>
        ))}
      </tbody>
    </Table>
  );
}; 