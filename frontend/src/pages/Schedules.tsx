import { useState } from 'react';
import styled from 'styled-components';
import ScheduleCalendar from '../components/schedule/ScheduleCalendar';
import ScheduleList from '../components/schedule/ScheduleList';

const Container = styled.div`
  padding: 2rem;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #ddd;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.active ? '#4a90e2' : 'transparent'};
  color: ${props => props.active ? 'white' : '#333'};
  border: none;
  border-bottom: 2px solid ${props => props.active ? '#4a90e2' : 'transparent'};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.active ? '#4a90e2' : '#f5f5f5'};
  }
`;

const SchedulesPage = () => {
  const [activeTab, setActiveTab] = useState<'calendar' | 'list'>('calendar');

  return (
    <Container>
      <h1>My Schedules</h1>
      <TabContainer>
        <TabButton active={activeTab === 'calendar'} onClick={() => setActiveTab('calendar')}>
          Calendar View
        </TabButton>
        <TabButton active={activeTab === 'list'} onClick={() => setActiveTab('list')}>
          List View
        </TabButton>
      </TabContainer>

      {activeTab === 'calendar' ? <ScheduleCalendar /> : <ScheduleList />}
    </Container>
  );
};

export default SchedulesPage;
