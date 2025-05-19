import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserService } from '../../services/user.service';
import { User } from '../../types/auth';

const Container = styled.div`
  padding: 2rem;
`;
const Title = styled.h1`
  margin-bottom: 1.5rem;
  color: #333;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  th:nth-child(4), td:nth-child(4) {
    width: 200px;
  }

  th,
  td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #eee;
  }

  th {
    text-align: left;
  }
`;
const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;
const AlertError = styled.div`
  background-color: #ffebee;
  color: #c62828;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
`;
// Styled dropdown
const Select = styled.select`
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background: white;
  color: #333;
  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

const RolesPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [uList, rList] = await Promise.all([UserService.listUsers(), UserService.listRoles()]);
      setUsers(uList);
      setRoles(rList);
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRoleChange = async (id: string, newRole: string) => {
    setUpdatingId(id);
    try {
      await UserService.updateUser(id, { role: newRole });
      await loadData();
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'Failed to update role');
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <LoadingMessage>Loading roles and users...</LoadingMessage>;
  if (error) return <AlertError>{error}</AlertError>;

  return (
    <Container>
      <Title>Role Management</Title>
      <Table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Current Role</th>
            <th>Change Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.first_name} {u.last_name}</td>
              <td>{u.role}</td>
              <td>
                <Select
                  value={u.role}
                  disabled={updatingId === u.id}
                  onChange={(e) => handleRoleChange(u.id!, e.target.value)}
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </Select>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default RolesPage;
