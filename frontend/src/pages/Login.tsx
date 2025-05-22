import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import { theme } from '@/styles/theme';

const LoginContainer = styled.div`
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

const LoginCard = styled.div`
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

const ForgotPassword = styled.div`
  width: 100%;
  text-align: right;
  margin-bottom: ${theme.spacing[4]};

  a {
    color: ${({ theme }) => theme.colors.primary.main};
    font-size: ${theme.typography.sizes.sm};
    text-decoration: none;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.colors.primary.hover};
      text-decoration: underline;
    }

     @media (prefers-color-scheme: dark) {
      color: ${({ theme }) => theme.colors.primary.hover};
       &:hover {
        color: ${({ theme }) => theme.colors.primary.main};
      }
    }
  }
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

const ErrorText = styled.div`
  color: ${({ theme }) => theme.colors.status.emergency.main};
  font-size: ${theme.typography.sizes.sm};
  margin-top: ${theme.spacing[1]};
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

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
});

const Login = () => {
  const { login, clearError } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      setSubmitting(true);
      await login(values);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <ProductTitle>NextEra Workforce</ProductTitle>
        <Formik initialValues={{ email: '', password: '' }} validationSchema={LoginSchema} onSubmit={handleSubmit}>
          {({ isSubmitting, isValid }) => (
            <Form onChange={clearError} style={{ width: '100%' }}>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <StyledInput type="email" id="email" name="email" placeholder="Enter your email" autoComplete="username" />
                <ErrorMessage name="email">
                  {(msg) => <ErrorText>{msg}</ErrorText>}
                </ErrorMessage>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <StyledInput type="password" id="password" name="password" placeholder="Enter your password" autoComplete="current-password" />
                <ErrorMessage name="password">
                  {(msg) => <ErrorText>{msg}</ErrorText>}
                </ErrorMessage>
              </FormGroup>
              <ForgotPassword>
                <Link to="/forgot-password">Forgot password?</Link>
              </ForgotPassword>
              <StyledButton type="submit" disabled={isSubmitting || !isValid}>
                {submitting ? 'Signing in...' : 'Sign In'}
              </StyledButton>
            </Form>
          )}
        </Formik>
        <LoginLink>
          Don&apos;t have an account?
          <StyledLink to="/register">Sign up</StyledLink>
        </LoginLink>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
