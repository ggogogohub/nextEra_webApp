import { useEffect, useState } from 'react';
import { User } from '../../types/auth';
import { UserService } from '../../services/user.service';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #eee;
  }

  th {
    text-align: left;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  const loadUsers = async () => {
    const data = await UserService.listUsers();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Container>
      <h1>Users</h1>
      <button onClick={() => navigate('/admin/users/new')}>New User</button>
      <Table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>
                {u.first_name} {u.last_name}
              </td>
              <td>{u.role}</td>
              <td>{u.is_active ? 'Active' : 'Inactive'}</td>
              <td>
                <Actions>
                  <button onClick={() => navigate(`/admin/users/${u.id}`)}>Edit</button>
                  {u.is_active ? (
                    <button
                      onClick={async () => {
                        await UserService.deactivateUser(u.id!);
                        loadUsers();
                      }}
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      onClick={async () => {
                        await UserService.activateUser(u.id!);
                        loadUsers();
                      }}
                    >
                      Activate
                    </button>
                  )}
                </Actions>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
