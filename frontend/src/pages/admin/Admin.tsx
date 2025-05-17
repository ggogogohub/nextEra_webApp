import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
`;
const Title = styled.h1`
  margin-bottom: 1.5rem;
  color: #333;
`;
const List = styled.ul`
  list-style: none;
  padding: 0;
`;
const Item = styled.li`
  margin-bottom: 1rem;
`;
const StyledLink = styled(Link)`
  color: #4a90e2;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const Admin = () => (
  <Container>
    <Title>Admin Dashboard</Title>
    <List>
      <Item>
        <StyledLink to="/admin/users">User Management</StyledLink>
      </Item>
      <Item>
        <StyledLink to="/admin/roles">Role Management</StyledLink>
      </Item>
    </List>
  </Container>
);

export default Admin;
