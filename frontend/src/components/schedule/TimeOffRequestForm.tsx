import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';
import { ScheduleService } from '../../services/schedule.service';
import { TimeOffRequestCreate } from '../../types/schedule';

// Removed unused date-fns imports

// Styled components
const FormContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const FormTitle = styled.h2`
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled(Field)`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3a7bc8;
  }

  &:disabled {
    background-color: #a0c3e8;
    cursor: not-allowed;
  }
`;

const AlertError = styled.div`
  background-color: #ffebee;
  color: #c62828;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
`;

const AlertSuccess = styled.div`
  background-color: #e8f5e9;
  color: #2e7d32;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
`;

interface TimeOffRequestFormProps {
  onSuccess?: () => void;
}

const TimeOffRequestForm = ({ onSuccess }: TimeOffRequestFormProps) => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (values: TimeOffRequestCreate, { resetForm }: { resetForm: () => void }) => {
    try {
      setError(null);
      setSuccess(null);

      // Format dates to ISO string format with time component
      const formattedValues = {
        ...values,
        start_date: new Date(values.start_date).toISOString(),
        end_date: new Date(values.end_date).toISOString()
      };

      console.log('Submitting time-off request:', formattedValues);

      await ScheduleService.createTimeOffRequest(formattedValues);

      setSuccess('Time-off request submitted successfully!');
      resetForm();

      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      console.error('Error submitting time-off request:', err);
      setError(err.response?.data?.detail || 'Failed to submit time-off request');
    }
  };

  // Get tomorrow's date for min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  return (
    <FormContainer>
      <FormTitle>Request Time Off</FormTitle>

      {error && <AlertError>{error}</AlertError>}
      {success && <AlertSuccess>{success}</AlertSuccess>}

      <Formik initialValues={{ start_date: '', end_date: '', reason: '' }} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form onChange={() => setError(null)}>
            <FormGroup>
              <Label htmlFor="start_date">Start Date</Label>
              <Input
                type="date"
                id="start_date"
                name="start_date"
                min={tomorrowStr}
              />
              {/* ErrorMessage removed */}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="end_date">End Date</Label>
              <Input
                type="date"
                id="end_date"
                name="end_date"
                min={tomorrowStr}
              />
              {/* ErrorMessage removed */}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="reason">Reason</Label>
              <Field
                as={TextArea}
                id="reason"
                name="reason"
                placeholder="Please provide a reason for your time-off request"
              />
              {/* ErrorMessage removed */}
            </FormGroup>

            <Button type="submit">
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </Button>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default TimeOffRequestForm;
