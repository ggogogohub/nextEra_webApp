import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TimeOffRequest } from '../../types/schedule';
import { ScheduleService } from '../../services/schedule.service';
import { format, parseISO } from 'date-fns';

// Styled components
const ListContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const ListTitle = styled.h2`
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const RequestsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RequestItem = styled.div<{ status: string }>`
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1rem;
  background-color: ${props => {
    switch (props.status) {
      case 'approved': return '#e8f5e9';
      case 'pending': return '#fff8e1';
      case 'rejected': return '#ffebee';
      default: return 'white';
    }
  }};
`;

const RequestHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const RequestDates = styled.div`
  font-weight: 500;
`;

const RequestStatus = styled.div<{ status: string }>`
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  text-transform: uppercase;
  background-color: ${props => {
    switch (props.status) {
      case 'approved': return '#4caf50';
      case 'pending': return '#ffc107';
      case 'rejected': return '#f44336';
      default: return '#9e9e9e';
    }
  }};
  color: white;
`;

const RequestReason = styled.div`
  margin-bottom: 0.5rem;
  color: #666;
`;

const RequestFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: #999;
`;

const CancelButton = styled.button`
  background-color: transparent;
  color: #f44336;
  border: 1px solid #f44336;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f44336;
    color: white;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
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

const NoRequestsMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
  font-style: italic;
`;

interface TimeOffRequestListProps {
  refreshTrigger?: number;
}

const TimeOffRequestList = ({ refreshTrigger = 0 }: TimeOffRequestListProps) => {
  const [requests, setRequests] = useState<TimeOffRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Load time-off requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await ScheduleService.getTimeOffRequests();
        setRequests(data);
      } catch (err: any) {
        console.error('Error fetching time-off requests:', err);
        setError(err.message || 'Failed to load time-off requests');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRequests();
  }, [refreshTrigger]);
  
  // Handle cancellation of a time-off request
  const handleCancelRequest = async (id: string) => {
    try {
      await ScheduleService.cancelTimeOffRequest(id);
      
      // Update the local state
      setRequests(prevRequests => 
        prevRequests.filter(request => request.id !== id)
      );
    } catch (err: any) {
      console.error('Error cancelling time-off request:', err);
      setError(err.message || 'Failed to cancel time-off request');
    }
  };
  
  // Format date from ISO string
  const formatDate = (isoString: string) => {
    return format(parseISO(isoString), 'MMMM d, yyyy');
  };
  
  if (loading) {
    return <LoadingMessage>Loading time-off requests...</LoadingMessage>;
  }
  
  return (
    <ListContainer>
      <ListTitle>Your Time-Off Requests</ListTitle>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      {requests.length === 0 ? (
        <NoRequestsMessage>You have no time-off requests.</NoRequestsMessage>
      ) : (
        <RequestsList>
          {requests.map(request => (
            <RequestItem key={request.id} status={request.status}>
              <RequestHeader>
                <RequestDates>
                  {formatDate(request.start_date)} - {formatDate(request.end_date)}
                </RequestDates>
                <RequestStatus status={request.status}>
                  {request.status}
                </RequestStatus>
              </RequestHeader>
              
              <RequestReason>{request.reason}</RequestReason>
              
              <RequestFooter>
                <div>Requested on {formatDate(request.created_at)}</div>
                
                {request.status === 'pending' && (
                  <CancelButton onClick={() => handleCancelRequest(request.id)}>
                    Cancel Request
                  </CancelButton>
                )}
              </RequestFooter>
            </RequestItem>
          ))}
        </RequestsList>
      )}
    </ListContainer>
  );
};

export default TimeOffRequestList;
