import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Schedule } from '../../types/schedule';
import { ScheduleService } from '../../services/schedule.service';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, addDays, isSameDay, parseISO } from 'date-fns';

// Styled components
const CalendarContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const CalendarTitle = styled.h2`
  font-size: 1.25rem;
  color: #333;
  margin: 0;
`;

const CalendarControls = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const CalendarButton = styled.button`
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
`;

const DayHeader = styled.div`
  text-align: center;
  font-weight: 500;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
`;

const DayCell = styled.div<{ isToday: boolean }>`
  min-height: 100px;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 0.5rem;
  background-color: ${props => props.isToday ? '#f0f7ff' : 'white'};
`;

const DayNumber = styled.div`
  font-weight: 500;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const ScheduleItem = styled.div<{ status: string }>`
  background-color: ${props => {
    switch (props.status) {
      case 'approved': return '#e8f5e9';
      case 'pending': return '#fff8e1';
      case 'cancelled': return '#ffebee';
      default: return '#f5f5f5';
    }
  }};
  border-left: 3px solid ${props => {
    switch (props.status) {
      case 'approved': return '#4caf50';
      case 'pending': return '#ffc107';
      case 'cancelled': return '#f44336';
      default: return '#9e9e9e';
    }
  }};
  padding: 0.5rem;
  border-radius: 2px;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
`;

const TimeRange = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const Location = styled.div`
  color: #666;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  background-color: #ffebee;
  color: #c62828;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const NoSchedulesMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
  font-style: italic;
`;

interface ScheduleCalendarProps {
  initialDate?: Date;
}

const ScheduleCalendar = ({ initialDate = new Date() }: ScheduleCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Calculate the start and end of the current week
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });

  // Generate an array of days for the current week
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  // Load schedules for the current week
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true);
        setError(null);

        const startDateStr = format(weekStart, 'yyyy-MM-dd');
        const endDateStr = format(weekEnd, 'yyyy-MM-dd');

        const data = await ScheduleService.getSchedules({
          startDate: startDateStr,
          endDate: endDateStr,
        });

        setSchedules(data);
      } catch (err: any) {
        console.error('Error fetching schedules:', err);
        setError(err.message || 'Failed to load schedules');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [currentDate]);

  // Navigate to previous week
  const goToPreviousWeek = () => {
    setCurrentDate(prevDate => addDays(prevDate, -7));
  };

  // Navigate to next week
  const goToNextWeek = () => {
    setCurrentDate(prevDate => addDays(prevDate, 7));
  };

  // Navigate to current week
  const goToCurrentWeek = () => {
    setCurrentDate(new Date());
  };

  // Filter schedules for a specific day
  const getSchedulesForDay = (day: Date) => {
    return schedules.filter(schedule => {
      const scheduleDate = parseISO(schedule.start_time);
      return isSameDay(scheduleDate, day);
    });
  };

  // Format time from ISO string
  const formatTime = (isoString: string) => {
    return format(parseISO(isoString), 'h:mm a');
  };

  if (loading) {
    return <LoadingMessage>Loading schedules...</LoadingMessage>;
  }

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          Week of {format(weekStart, 'MMMM d, yyyy')}
        </CalendarTitle>

        <CalendarControls>
          <CalendarButton onClick={goToPreviousWeek}>Previous Week</CalendarButton>
          <CalendarButton onClick={goToCurrentWeek}>Current Week</CalendarButton>
          <CalendarButton onClick={goToNextWeek}>Next Week</CalendarButton>
        </CalendarControls>
      </CalendarHeader>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <WeekGrid>
        {/* Day headers */}
        {weekDays.map(day => (
          <DayHeader key={`header-${format(day, 'yyyy-MM-dd')}`}>
            {format(day, 'EEEE')}
          </DayHeader>
        ))}

        {/* Day cells */}
        {weekDays.map(day => {
          const daySchedules = getSchedulesForDay(day);
          const isToday = isSameDay(day, new Date());

          return (
            <DayCell key={format(day, 'yyyy-MM-dd')} isToday={isToday}>
              <DayNumber>{format(day, 'd')}</DayNumber>

              {daySchedules.length === 0 ? (
                <div style={{ fontSize: '0.75rem', color: '#999', textAlign: 'center' }}>
                  No schedules
                </div>
              ) : (
                daySchedules.map(schedule => (
                  <ScheduleItem key={schedule.id} status={schedule.status}>
                    <TimeRange>
                      {formatTime(schedule.start_time)} - {formatTime(schedule.end_time)}
                    </TimeRange>
                    <Location>{schedule.location}</Location>
                  </ScheduleItem>
                ))
              )}
            </DayCell>
          );
        })}
      </WeekGrid>

      {schedules.length === 0 && !error && (
        <NoSchedulesMessage>No schedules found for this week.</NoSchedulesMessage>
      )}
    </CalendarContainer>
  );
};

export default ScheduleCalendar;
