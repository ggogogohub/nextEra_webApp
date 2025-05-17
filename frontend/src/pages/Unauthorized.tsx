import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  color: #c62828;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  margin-bottom: 1.5rem;
`;

const StyledLink = styled(Link)`
  color: #4a90e2;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Unauthorized = () => (
  <Container>
    <Title>Unauthorized Access</Title>
    <Message>You do not have permission to view this page.</Message>
    <StyledLink to="/dashboard">Go to Dashboard</StyledLink>
  </Container>
);

export default Unauthorized;
