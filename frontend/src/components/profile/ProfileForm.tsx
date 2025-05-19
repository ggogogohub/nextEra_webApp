import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

// Validation schema
const ProfileSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  first_name: Yup.string()
    .required('First name is required'),
  last_name: Yup.string()
    .required('Last name is required'),
});

// Styled components
const FormContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.div`
  color: #e53935;
  font-size: 0.875rem;
  margin-top: 0.25rem;
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

const ProfileForm = () => {
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!user) {
    return <div>Loading profile...</div>;
  }

  const handleSubmit = async (values: { email: string; first_name: string; last_name: string }) => {
    try {
      setError(null);
      setSuccess(null);

      await api.put(`/users/${user.id}`, values);

      setSuccess('Profile updated successfully!');
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.detail || 'Failed to update profile');
    }
  };

  return (
    <FormContainer>
      <FormTitle>Your Profile</FormTitle>

      {error && <AlertError>{error}</AlertError>}
      {success && <AlertSuccess>{success}</AlertSuccess>}

      <Formik
        initialValues={{
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
        }}
        validationSchema={ProfileSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form onChange={() => { setError(null); setSuccess(null); }}>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" name="email" />
              <ErrorMessage name="email" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="first_name">First Name</Label>
              <Input type="text" id="first_name" name="first_name" />
              <ErrorMessage name="first_name" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="last_name">Last Name</Label>
              <Input type="text" id="last_name" name="last_name" />
              <ErrorMessage name="last_name" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="role">Role</Label>
              <Input type="text" id="role" name="role" disabled value={user.role} />
            </FormGroup>

            <Button type="submit" disabled={isSubmitting || !(isValid && dirty)}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default ProfileForm;
