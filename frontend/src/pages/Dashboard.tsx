import { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import ScheduleCalendar from '../components/schedule/ScheduleCalendar';
import TimeOffRequestForm from '../components/schedule/TimeOffRequestForm';
import TimeOffRequestList from '../components/schedule/TimeOffRequestList';

// Styled components
const DashboardContainer = styled.div`
  padding: 2rem;
`;

const WelcomeCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const Subtitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #555;
`;

const Text = styled.p`
  color: #666;
  line-height: 1.5;
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

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('schedule');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTimeOffSuccess = () => {
    // Increment the refresh trigger to reload the time-off request list
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <DashboardContainer>
      <WelcomeCard>
        <Title>Welcome, {user?.first_name}!</Title>
        <Text>
          You are logged in to NextEra Workforce as a {user?.role === 'admin' ? 'Administrator' :
                                                     user?.role === 'manager' ? 'Manager' : 'Employee'}.
        </Text>
      </WelcomeCard>

      <TabContainer>
        <TabButton
          active={activeTab === 'schedule'}
          onClick={() => setActiveTab('schedule')}
        >
          My Schedule
        </TabButton>
        <TabButton
          active={activeTab === 'time-off'}
          onClick={() => setActiveTab('time-off')}
        >
          Time Off
        </TabButton>
      </TabContainer>

      {activeTab === 'schedule' && (
        <>
          <Subtitle>Your Schedule</Subtitle>
          <ScheduleCalendar />
        </>
      )}

      {activeTab === 'time-off' && (
        <>
          <Subtitle>Time Off Requests</Subtitle>
          <TimeOffRequestForm onSuccess={handleTimeOffSuccess} />
          <TimeOffRequestList refreshTrigger={refreshTrigger} />
        </>
      )}
    </DashboardContainer>
  );
};

export default Dashboard;
