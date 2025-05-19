import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ProfileService } from '../../services/profile.service';
import { Availability, AvailabilityUpdate } from '../../types/schedule';

const Container = styled.div`
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
`;

const Label = styled.label`
  flex: 1;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.25rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.875rem;
`;

const Checkbox = styled.input`
  transform: scale(1.2);
  cursor: pointer;
`;

const Button = styled.button`
  padding: 0.25rem 0.5rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  &:disabled { background-color: #a0c3e8; cursor: not-allowed; }
`;

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

// Default availability entries for each day
const defaultItems: Availability[] = days.map((_, idx) => ({
  id: '',
  employee_id: '',
  day_of_week: idx,
  start_time: '',
  end_time: '',
  is_available: false,
  created_at: '',
  updated_at: ''
}));

const AvailabilityForm = () => {
  const [items, setItems] = useState<Availability[]>(defaultItems);
  const [saving, setSaving] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchAvailability = async () => {
    try {
      const data = await ProfileService.getAvailability();
      // Ensure one entry per day
      const filled = days.map((_, idx) => {
        const exist = data.find((a: Availability) => a.day_of_week === idx);
        return exist ?? {
          id: '',
          employee_id: '',
          day_of_week: idx,
          start_time: '',
          end_time: '',
          is_available: false,
          created_at: '',
          updated_at: ''
        };
      });
      setItems(filled);
      setError(null);
    } catch (e) {
      console.error(e);
      setError('Failed to load availability');
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  const handleChange = (index: number, field: keyof AvailabilityUpdate, value: any) => {
    const updated = [...items];
    (updated[index] as any)[field] = value;
    setItems(updated);
  };

  const handleSave = async (index: number) => {
    const item = items[index];
    setSaving((s) => [...s, item.day_of_week]);
    try {
      const upd: AvailabilityUpdate = {
        day_of_week: item.day_of_week,
        start_time: item.start_time,
        end_time: item.end_time,
        is_available: item.is_available,
      };
      // Update single day's availability
      const updatedList = await ProfileService.upsertAvailability([upd]);
      setItems(updatedList);
      setError(null);
    } catch (e) {
      console.error(e);
      setError('Failed to save availability');
    } finally {
      setSaving((s) => s.filter(d => d !== item.day_of_week));
    }
  };

  return (
    <Container>
      <Title>Availability</Title>
      {error && <div style={{ color: '#c62828' }}>{error}</div>}
      {items.map((it, idx) => (
        <Row key={it.day_of_week}>
          <Label>{days[it.day_of_week]}</Label>
          <Checkbox
            type="checkbox"
            checked={it.is_available}
            onChange={(e) => handleChange(idx, 'is_available', e.target.checked)}
          />
          <Input
            type="time"
            value={it.start_time}
            disabled={!it.is_available}
            onChange={(e) => handleChange(idx, 'start_time', e.target.value)}
          />
          <Input
            type="time"
            value={it.end_time}
            disabled={!it.is_available}
            onChange={(e) => handleChange(idx, 'end_time', e.target.value)}
          />
          <Button
            onClick={() => handleSave(idx)}
            disabled={saving.includes(it.day_of_week)}
          >
            {saving.includes(it.day_of_week) ? 'Saving...' : 'Save'}
          </Button>
        </Row>
      ))}
    </Container>
  );
};

export default AvailabilityForm;
