import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { AuthService } from '../services/auth.service';
import { RegisterCredentials } from '../types/auth';

// Validation schema
const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  role: Yup.string().required('Role is required'),
});

// Styled components
const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f5f5f5;
`;

const RegisterCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

const Select = styled(Field)`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
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

const LoginLink = styled.div`
  text-align: center;
  margin-top: 1rem;
  font-size: 0.875rem;

  a {
    color: #4a90e2;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values: RegisterCredentials & { confirmPassword: string }) => {
    try {
      setSubmitting(true);
      setError(null);

      // Remove confirmPassword as it's not needed for the API
      const { confirmPassword, ...registerData } = values;

      // Ensure role is one of the allowed values
      if (!['employee', 'manager', 'admin'].includes(registerData.role)) {
        setError(`Invalid role: ${registerData.role}. Must be one of: employee, manager, admin`);
        setSubmitting(false);
        return;
      }

      // Create the registration data with explicit role
      const finalData: RegisterCredentials = {
        email: registerData.email,
        password: registerData.password,
        first_name: registerData.first_name,
        last_name: registerData.last_name,
        role: registerData.role // Explicitly include the role
      };

      console.log('Final data being sent to API:', finalData);
      console.log('Selected role (must not be employee unless selected):', finalData.role);

      const user = await AuthService.register(finalData);

      // Log the response from the API
      console.log('Registration successful, user data:', user);

      setSuccess('Registration successful! You can now login.');

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error: any) {
      console.error('Registration error:', error);
      setError(error.response?.data?.detail || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <RegisterContainer>
      <RegisterCard>
        <Title>Create an Account</Title>

        {error && <AlertError>{error}</AlertError>}
        {success && <AlertSuccess>{success}</AlertSuccess>}

        <Formik
          initialValues={{
            email: '',
            password: '',
            confirmPassword: '',
            first_name: '',
            last_name: '',
            role: 'employee', // Default to employee, but user can change it
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, dirty, values, setFieldValue }) => {
            // Log form values for debugging
            console.log('Form values:', values);

            return (
            <Form onChange={() => setError(null)}>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" name="email" placeholder="Enter your email" />
                <ErrorMessage name="email" component={ErrorText} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="first_name">First Name</Label>
                <Input type="text" id="first_name" name="first_name" placeholder="Enter your first name" />
                <ErrorMessage name="first_name" component={ErrorText} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="last_name">Last Name</Label>
                <Input type="text" id="last_name" name="last_name" placeholder="Enter your last name" />
                <ErrorMessage name="last_name" component={ErrorText} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="role">Role</Label>
                <Select
                  as="select"
                  id="role"
                  name="role"
                  data-testid="role-select"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const selectedRole = e.target.value;
                    console.log('Role changed to:', selectedRole);
                    setFieldValue('role', selectedRole, true);
                  }}
                >
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </Select>
                <ErrorMessage name="role" component={ErrorText} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password" placeholder="Enter your password" />
                <ErrorMessage name="password" component={ErrorText} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" />
                <ErrorMessage name="confirmPassword" component={ErrorText} />
              </FormGroup>

              <Button type="submit" disabled={isSubmitting || !(isValid && dirty)}>
                {submitting ? 'Registering...' : 'Register'}
              </Button>
            </Form>
          );
          }}
        </Formik>

        <LoginLink>
          Already have an account? <Link to="/login">Sign in</Link>
        </LoginLink>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default Register;
