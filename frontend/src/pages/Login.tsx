import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';


const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.deepNavy} 0%, ${({ theme }) => theme.colors.darkBlue} 100%);
  transition: background 0.3s;
`;

const LoginCard = styled.div`
  background: rgba(29, 53, 87, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2.8rem 2.1rem 2.1rem 2.1rem;
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border: none;
  @media (max-width: 480px) {
    padding: 1.2rem 0.5rem;
    max-width: 98vw;
  }
`;

const ProductName = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.colors.brightTeal};
  text-align: center;
  margin-bottom: 2rem;
  margin-top: 0.01rem;
`;


const FormGroup = styled.div`
  margin-bottom: 1.3rem;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  font-size: 1.03rem;
  font-weight: 500;
  margin-bottom: 0.37rem;
  color: ${({ theme }) => theme.colors.offWhite};
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.92rem 1.15rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  background: ${({ theme }) => theme.colors.offWhite};
  font-size: 1.07rem;
  color: ${({ theme }) => theme.colors.deepNavy};
  transition: border-color 0.2s, background 0.2s;
  &:focus {
    background: ${({ theme }) => theme.colors.offWhite};
    border-color: ${({ theme }) => theme.colors.brightTeal};
    outline: none;
  }
`;

const ForgotPassword = styled.div`
  width: 100%;
  text-align: right;
  margin-bottom: 1.2rem;
  a {
    color: ${({ theme }) => theme.colors.brightTeal};
    font-size: 0.97rem;
    text-decoration: none;
    transition: text-decoration 0.13s, color 0.13s;
    &:hover { text-decoration: underline; color: ${({ theme }) => theme.colors.coralRed}; }
  }
`;

const StyledButton = styled.button`
  width: 100%;
  border-radius: 4px;
  font-size: 1.12rem;
  padding: 1rem 0;
  background: ${({ theme }) => theme.colors.brightTeal};
  color: ${({ theme }) => theme.colors.deepNavy};
  font-weight: 700;
  border: none;
  margin-top: 0.1rem;
  margin-bottom: 0.7rem;
  transition: background 0.2s;
  cursor: pointer;
  &:hover, &:focus {
    background: ${({ theme }) => theme.colors.coralRed};
    color: ${({ theme }) => theme.colors.offWhite};
    outline: none;
  }
  &:active {
    background: ${({ theme }) => theme.colors.brightTeal};
    color: ${({ theme }) => theme.colors.deepNavy};
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.coralRed};
    outline-offset: 2px;
  }
  &:disabled {
    background: ${({ theme }) => theme.colors.lightCyan};
    color: ${({ theme }) => theme.colors.deepNavy};
    cursor: not-allowed;
  }
`;

const ErrorText = styled.div`
  color: ${({ theme }) => theme.colors.coralRed};
  font-size: 1.01rem;
  margin-top: 0.3rem;
  margin-bottom: 0.1rem;
`;

const LoginLink = styled.div`
  text-align: center;
  font-size: 1.02rem;
  color: ${({ theme }) => theme.colors.lightCyan};
  margin-top: 1.8rem;
  a {
    color: ${({ theme }) => theme.colors.brightTeal};
    font-weight: 500;
    text-decoration: none;
    margin-left: 0.18rem;
    transition: text-decoration 0.13s, color 0.13s;
    &:hover { text-decoration: underline; color: ${({ theme }) => theme.colors.coralRed}; }
  }
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
      <LoginCard className="glass">
        <ProductName>NextEra Workforce</ProductName>
        <Formik initialValues={{ email: '', password: '' }} validationSchema={LoginSchema} onSubmit={handleSubmit}>
          {({ isSubmitting, isValid }) => (
            <Form onChange={clearError} style={{ width: '100%' }}>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Field as={StyledInput} type="email" id="email" name="email" placeholder="Enter your email" autoComplete="username" />
                <ErrorMessage name="email">
                  {(msg) => <ErrorText>{msg}</ErrorText>}
                </ErrorMessage>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Field as={StyledInput} type="password" id="password" name="password" placeholder="Enter your password" autoComplete="current-password" />
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
          <Link to="/register">Sign up</Link>
        </LoginLink>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
