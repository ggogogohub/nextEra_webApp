import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled, { createGlobalStyle } from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Inter', 'Manrope', 'SF Pro', 'Segoe UI', 'Roboto', Arial, sans-serif;
    background: #f8fafc;
    color: #191d23;
    font-size: 17px;
    letter-spacing: -0.01em;
  }
`;

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
`;

const LoginCard = styled.div`
  background: #fff;
  border-radius: 2rem;
  box-shadow: 0 2px 16px 0 rgba(30, 41, 59, 0.06);
  padding: 2.8rem 2.1rem 2.1rem 2.1rem;
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  @media (max-width: 480px) {
    padding: 1.2rem 0.5rem;
    max-width: 98vw;
  }
`;

const ProductName = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color:rgb(17, 20, 24);
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
  color: #23272f;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.92rem 1.15rem;
  border-radius: 0.9rem;
  border: none;
  background: #f1f5f9;
  font-size: 1.07rem;
  color: #191d23;
  transition: box-shadow 0.18s, background 0.18s;
  box-shadow: 0 1px 2px 0 rgba(30, 41, 59, 0.02) inset;
  &:focus {
    background: #e0e7ef;
    box-shadow: 0 0 0 2px #6366f1;
    outline: none;
  }
`;

const ForgotPassword = styled.div`
  width: 100%;
  text-align: right;
  margin-bottom: 1.2rem;
  a {
    color: #6366f1;
    font-size: 0.97rem;
    text-decoration: none;
    transition: text-decoration 0.13s, color 0.13s;
    &:hover { text-decoration: underline; color: #4338ca; }
  }
`;

const StyledButton = styled.button`
  width: 100%;
  border-radius: 0.9rem;
  font-size: 1.12rem;
  padding: 1.02rem 0;
  background: #6366f1;
  color: #fff;
  font-weight: 700;
  border: none;
  margin-top: 0.1rem;
  margin-bottom: 0.7rem;
  box-shadow: 0 2px 8px 0 rgba(99, 102, 241, 0.08);
  transition: background 0.18s, box-shadow 0.18s, transform 0.13s;
  cursor: pointer;
  &:hover, &:focus {
    background: #4338ca;
    box-shadow: 0 4px 18px 0 rgba(99, 102, 241, 0.14);
    transform: translateY(-1px) scale(1.01);
    outline: none;
  }
  &:active {
    background: #6366f1;
    transform: none;
  }
  &:disabled {
    background: #c7d2fe;
    color: #fff;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.div`
  color: #e11d48;
  font-size: 1.01rem;
  margin-top: 0.3rem;
  margin-bottom: 0.1rem;
`;

const LoginLink = styled.div`
  text-align: center;
  font-size: 1.02rem;
  color: #7b8190;
  margin-top: 1.8rem;
  a {
    color: #6366f1;
    font-weight: 500;
    text-decoration: none;
    margin-left: 0.18rem;
    transition: text-decoration 0.13s, color 0.13s;
    &:hover { text-decoration: underline; color: #4338ca; }
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
    <>
      <GlobalStyle />
      <LoginContainer>
        <LoginCard>
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
    </>
  );
};

export default Login;
