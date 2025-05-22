import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { AuthService } from '../services/auth.service';
import { RegisterCredentials } from '../types/auth';
import { theme } from '@/styles/theme';

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
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.surface.light};
  @media (prefers-color-scheme: dark) {
    background-color: ${theme.colors.surface.dark};
  }
  transition: background-color 0.3s ease-in-out;
  box-sizing: border-box;
`;

const RegisterCard = styled.div`
  background: ${({ theme }) => theme.colors.surface.light};
  @media (prefers-color-scheme: dark) {
    background: ${({ theme }) => theme.colors.surface.dark};
  }
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  padding: ${theme.spacing[8]} ${theme.spacing[6]};
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border: 1px solid ${({ theme }) => theme.colors.border.light};
   @media (prefers-color-scheme: dark) {
    border: 1px solid ${({ theme }) => theme.colors.border.dark};
  }
  transition: all 0.3s ease-in-out;
  overflow-y: hidden;

  @media (max-width: 480px) {
    padding: ${theme.spacing[5]} ${theme.spacing[4]};
    max-width: 90vw;
  }
`;

const ProductTitle = styled.h1`
  font-family: ${theme.typography.fonts.primary};
  font-size: ${theme.typography.sizes['2xl']};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${theme.spacing[6]};
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing[4]};
  width: 100%;
`;

const Label = styled.label`
  display: block;
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.base};
  font-weight: ${theme.typography.weights.regular};
  margin-bottom: ${theme.spacing[2]};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const StyledInput = styled(Field)`
  width: 100%;
  padding: ${theme.spacing[3]} ${theme.spacing[4]};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border.light};
   @media (prefers-color-scheme: dark) {
    border: 1px solid ${({ theme }) => theme.colors.border.dark};
  }
  background: ${({ theme }) => theme.colors.surface.light};
   @media (prefers-color-scheme: dark) {
    background: ${({ theme }) => theme.colors.surface.dark};
  }
  font-family: ${theme.typography.fonts.mono};
  font-size: ${theme.typography.sizes.base};
  color: ${({ theme }) => theme.colors.text.primary};
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:focus {
    border-color: ${theme.colors.secondary.main};
    box-shadow: 0 0 0 2px ${theme.colors.secondary.main}40;
    outline: none;
     @media (prefers-color-scheme: dark) {
      box-shadow: 0 0 0 2px ${theme.colors.secondary.hover}40;
    }
  }
`;

const StyledSelect = styled(Field)`
  width: 100%;
  padding: ${theme.spacing[3]} ${theme.spacing[4]};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border.light};
   @media (prefers-color-scheme: dark) {
    border: 1px solid ${({ theme }) => theme.colors.border.dark};
  }
  background: ${({ theme }) => theme.colors.surface.light};
   @media (prefers-color-scheme: dark) {
    background: ${({ theme }) => theme.colors.surface.dark};
  }
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.base};
  color: ${({ theme }) => theme.colors.text.primary};
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:focus {
    border-color: ${theme.colors.secondary.main};
    box-shadow: 0 0 0 2px ${theme.colors.secondary.main}40;
    outline: none;
     @media (prefers-color-scheme: dark) {
      box-shadow: 0 0 0 2px ${theme.colors.secondary.hover}40;
    }
  }
`;

const ErrorText = styled.div`
  color: ${({ theme }) => theme.colors.status.emergency.main};
  font-size: ${theme.typography.sizes.sm};
  margin-top: ${theme.spacing[1]};
`;

const StyledButton = styled.button`
  width: 100%;
  height: 52px;
  border-radius: 8px;
  font-family: ${theme.typography.fonts.primary};
  font-weight: ${theme.typography.weights.semibold};
  font-size: ${theme.typography.sizes.base};
  transition: all ${theme.animations.duration.fast} ${theme.animations.easing.default};
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.01em;
  cursor: pointer;

  background: ${theme.colors.secondary.main};
  color: ${theme.colors.text.light};
  border: none;

  &:hover {
    background: ${theme.colors.secondary.hover};
    box-shadow: 0 0 0 4px ${theme.colors.secondary.main}40;
  }

  &:active {
    transform: scale(0.95);
    transition: transform ${theme.animations.duration.fastest} ${theme.animations.easing.spring};
  }

  &:disabled {
    background: ${theme.colors.surface.light};
    color: ${theme.colors.text.secondary};
    cursor: not-allowed;
    opacity: 0.6;
     @media (prefers-color-scheme: dark) {
      background: ${theme.colors.surface.dark};
      color: ${theme.colors.text.secondary};
    }
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.secondary.main};
    outline-offset: 2px;
     @media (prefers-color-scheme: dark) {
      outline-color: ${theme.colors.secondary.hover};
    }
  }
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.secondary.main};
  font-weight: ${theme.typography.weights.semibold};
  text-decoration: none;
  margin-left: ${theme.spacing[1]};
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary.hover};
    text-decoration: underline;
  }
`;

const LoginLink = styled.div`
  text-align: center;
  font-family: ${theme.typography.fonts.secondary};
  font-size: ${theme.typography.sizes.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${theme.spacing[6]};
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
      const { ...registerData } = values;

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
    } catch (error: Error | unknown) {
      console.error('Registration error:', error);
      setError(error instanceof Error ? error.message : 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* <GlobalStyle /> */}
      <RegisterContainer>
        <RegisterCard>
          <ProductTitle>Create an Account</ProductTitle>
          {error && <ErrorText>{error}</ErrorText>}
          {success && <ErrorText style={{ color: theme.colors.status.normal.main, background: theme.colors.surface.light }}>{success}</ErrorText>}
          <Formik
            initialValues={{
              email: '',
              password: '',
              confirmPassword: '',
              first_name: '',
              last_name: '',
              role: 'employee',
            }}
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, isValid, dirty }) => (
              <Form onChange={() => setError(null)} style={{ width: '100%' }}>
                <FormGroup>
                  <Label htmlFor="email">Email</Label>
                  <StyledInput type="email" id="email" name="email" placeholder="Enter your email" />
                  <ErrorMessage name="email">
                    {(msg) => <ErrorText>{msg}</ErrorText>}
                  </ErrorMessage>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="first_name">First Name</Label>
                  <StyledInput type="text" id="first_name" name="first_name" placeholder="Enter your first name" />
                  <ErrorMessage name="first_name">
                    {(msg) => <ErrorText>{msg}</ErrorText>}
                  </ErrorMessage>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="last_name">Last Name</Label>
                  <StyledInput type="text" id="last_name" name="last_name" placeholder="Enter your last name" />
                  <ErrorMessage name="last_name">
                    {(msg) => <ErrorText>{msg}</ErrorText>}
                  </ErrorMessage>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="role">Role</Label>
                  <StyledSelect as="select" id="role" name="role">
                    <option value="employee">Employee</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </StyledSelect>
                  <ErrorMessage name="role">
                    {(msg) => <ErrorText>{msg}</ErrorText>}
                  </ErrorMessage>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="password">Password</Label>
                  <StyledInput type="password" id="password" name="password" placeholder="Enter your password" autoComplete="new-password" />
                  <ErrorMessage name="password">
                    {(msg) => <ErrorText>{msg}</ErrorText>}
                  </ErrorMessage>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <StyledInput type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" autoComplete="new-password" />
                  <ErrorMessage name="confirmPassword">
                    {(msg) => <ErrorText>{msg}</ErrorText>}
                  </ErrorMessage>
                </FormGroup>
                <StyledButton type="submit" disabled={isSubmitting || !isValid || !dirty}>
                  {submitting ? 'Registering...' : 'Register'}
                </StyledButton>
              </Form>
            )}
          </Formik>
          <LoginLink>
            Already have an account?
            <StyledLink to="/login">Login</StyledLink>
          </LoginLink>
        </RegisterCard>
      </RegisterContainer>
    </>
  );
};

export default Register;
