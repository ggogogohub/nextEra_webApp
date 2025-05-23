import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { UserService } from '../../services/user.service';

// Removed unused import of User

// Validation schema
const NewUserSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain uppercase, lowercase, number, and special character'
    ),
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  role: Yup.string().oneOf(['employee', 'manager', 'admin'], 'Select a valid role').required('Role is required'),
});

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f5f5f5;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 500px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
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
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

const ErrorText = styled.div`
  color: #e53935;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
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

interface NewUserValues {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: string;
}

const NewUser = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (
    values: NewUserValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      setSubmitting(true);
      setError(null);

      await UserService.createUser(values as any);
      setSuccess('User created successfully!');
      resetForm();
      setTimeout(() => navigate('/admin/users'), 1000);
    } catch (err: any) {
      console.error('Error creating user:', err);
      setError(err.response?.data?.detail || err.message || 'Failed to create user');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <Card>
        <Title>New User</Title>
        {error && <AlertError>{error}</AlertError>}
        {success && <AlertSuccess>{success}</AlertSuccess>}

        <Formik
          initialValues={{
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            role: '',
          }}
          validationSchema={NewUserSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" name="email" />
                <ErrorMessage name="email" component={ErrorText} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password" />
                <ErrorMessage name="password" component={ErrorText} />
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
                <Field as={StyledSelect} id="role" name="role">
                  <option value="">Select a role</option>
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </Field>
                <ErrorMessage name="role" component={ErrorText} />
              </FormGroup>

              <Button type="submit" disabled={submitting}>
                {submitting ? 'Creating...' : 'Create User'}
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  );
};

export default NewUser;
