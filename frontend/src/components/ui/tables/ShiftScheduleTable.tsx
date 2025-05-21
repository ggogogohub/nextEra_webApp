import React from 'react';
import { theme } from '@/styles/theme';
import styled from 'styled-components';

type ShiftStatus = 'scheduled' | 'in-progress' | 'completed' | 'conflict';

interface Shift {
  id: string;
  startTime: string;
  endTime: string;
  worker: string;
  role: string;
  status: ShiftStatus;
}

interface ShiftScheduleTableProps {
  shifts: Shift[];
  onShiftClick?: (shift: Shift) => void;
}

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  background: ${theme.colors.surface.light};
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.base};
  line-height: ${theme.typography.lineHeights.normal};
`;

export const TableHeader = styled.thead`
  background: ${theme.colors.primary.main};
  color: ${theme.colors.text.light};
  position: sticky;
  top: 0;
  z-index: 10;
`;

interface TableRowProps {
  status?: ShiftStatus;
}

export const TableRow = styled.tr<TableRowProps>`
  border-bottom: 1px solid ${theme.colors.border.light};
  background-color: ${({ status }) => 
    status === 'conflict' ? `${theme.colors.status.emergency.main}10` :
    status === 'in-progress' ? `${theme.colors.status.warning.main}10` :
    status === 'completed' ? `${theme.colors.status.normal.main}10` :
    'transparent'};
  
  &:last-child {
    border-bottom: none;
  }
`;

export const TableHeaderCell = styled.th`
  padding: ${theme.spacing[4]};
  text-align: left;
  font-weight: ${theme.typography.weights.semibold};
  white-space: nowrap;
`;

export const TableCell = styled.td`
  padding: ${theme.spacing[4]};
  text-align: left;
  vertical-align: middle;
`;

interface StatusCellProps {
  status: ShiftStatus;
}

export const StatusCell = styled(TableCell)<StatusCellProps>`
  color: ${({ status }) => 
    status === 'conflict' ? theme.colors.status.emergency.main :
    status === 'in-progress' ? theme.colors.status.warning.main :
    status === 'completed' ? theme.colors.status.normal.main :
    theme.colors.text.secondary};
`;

export const ConflictCell = styled(TableCell)`
  background: ${theme.colors.status.warning.main}10;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 2px,
      ${theme.colors.status.warning.main}20 2px,
      ${theme.colors.status.warning.main}20 4px
    );
  }
`;

export const Tooltip = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: ${theme.colors.surface.dark};
  color: ${theme.colors.text.light};
  padding: ${theme.spacing[2]};
  border-radius: 4px;
  font-size: ${theme.typography.sizes.sm};
  white-space: nowrap;
  z-index: 20;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  pointer-events: none;
  opacity: 0;
  transition: opacity ${theme.animations.duration.fast} ${theme.animations.easing.default};
  
  ${ConflictCell}:hover & {
    opacity: 1;
  }
`;

export const ShiftScheduleTable: React.FC<ShiftScheduleTableProps> = ({
  shifts,
  onShiftClick,
}) => {
  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Start Time</TableHeaderCell>
            <TableHeaderCell>End Time</TableHeaderCell>
            <TableHeaderCell>Worker</TableHeaderCell>
            <TableHeaderCell>Role</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {shifts.map((shift) => (
            <TableRow
              key={shift.id}
              status={shift.status}
              onClick={() => onShiftClick?.(shift)}
              style={{ cursor: onShiftClick ? 'pointer' : 'default' }}
            >
              <TableCell>{shift.startTime}</TableCell>
              <TableCell>{shift.endTime}</TableCell>
              <TableCell>{shift.worker}</TableCell>
              <TableCell>{shift.role}</TableCell>
              <StatusCell status={shift.status}>
                {shift.status.charAt(0).toUpperCase() + shift.status.slice(1)}
              </StatusCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}; 