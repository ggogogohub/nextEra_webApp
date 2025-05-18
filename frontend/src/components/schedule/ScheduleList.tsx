import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Schedule } from '../../types/schedule';
import { ScheduleService } from '../../services/schedule.service';
import { format, parseISO } from 'date-fns';

const Container = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 1rem;
`;

const FilterForm = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const DateInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:disabled { background-color: #a0c3e8; }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Item = styled.div`
  padding: 0.75rem;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: #fafafa;
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const ItemDetail = styled.div`
  font-size: 0.875rem;
  color: #666;
`;

const ScheduleList = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      setError(null);
      const filter = {} as any;
      if (startDate) filter.startDate = startDate;
      if (endDate) filter.endDate = endDate;
      const data = await ScheduleService.getSchedules(filter);
      setSchedules(data);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || 'Failed to load schedules');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSchedules(); }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSchedules();
  };

  return (
    <Container>
      <Title>Schedule List</Title>
      <FilterForm onSubmit={handleSubmit}>
        <DateInput
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Start Date"
        />
        <DateInput
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="End Date"
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Filter'}
        </Button>
      </FilterForm>
      {error && <Item>{error}</Item>}
      {!loading && schedules.length === 0 && <Item>No schedules found.</Item>}
      <List>
        {schedules.map((s) => (
          <Item key={s.id}>
            <ItemHeader>
              <div>{format(parseISO(s.start_time), 'PP')} – {format(parseISO(s.end_time), 'PP')}</div>
              <div>{s.role}</div>
            </ItemHeader>
            <ItemDetail>Time: {format(parseISO(s.start_time), 'p')} – {format(parseISO(s.end_time), 'p')}</ItemDetail>
            <ItemDetail>Location: {s.location}</ItemDetail>
          </Item>
        ))}
      </List>
    </Container>
  );
};

export default ScheduleList;
