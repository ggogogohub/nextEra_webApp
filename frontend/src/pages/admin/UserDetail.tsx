import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { UserService } from '../../services/user.service';
import { User } from '../../types/auth';
import { UserProfileUpdate } from '../../types/user';

// Validation schema for editing user
const UserSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  role: Yup.string()
    .oneOf(['employee', 'manager', 'admin'], 'Select a valid role')
    .required('Role is required'),
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
`;

const Select = styled.select`
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
  margin-top: 0.5rem;

  &:hover {
    background-color: #3a7bc8;
  }

  &:disabled {
    background-color: #a0c3e8;
    cursor: not-allowed;
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

const AlertSuccess = styled.div`
  background-color: #e8f5e9;
  color: #2e7d32;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
`;

const ErrorText = styled.div`
  color: #e53935;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userData = id ? await UserService.getUser(id) : null;
        setUser(userData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to load data');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Toggle user activation status
  const handleToggleActive = async () => {
    if (!id) return;
    try {
      setSubmitting(true);
      if (user?.is_active) {
        await UserService.deactivateUser(id);
      } else {
        await UserService.activateUser(id);
      }
      navigate('/admin/users');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to update user status');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingMessage>Loading user...</LoadingMessage>;
  if (error) return <AlertError>{error}</AlertError>;

  return (
    <Container>
      <Card>
        <Title>Edit User</Title>
        {success && <AlertSuccess>{success}</AlertSuccess>}
        {error && <AlertError>{error}</AlertError>}
        <Formik
          enableReinitialize
          initialValues={{
            email: user?.email || '',
            first_name: user?.first_name || '',
            last_name: user?.last_name || '',
            role: user?.role || '',
          }}
          validationSchema={UserSchema}
          onSubmit={async (values, { resetForm }) => {
            if (!id) return;
            try {
              setSubmitting(true);
              const updateData: UserProfileUpdate = { email: values.email, first_name: values.first_name, last_name: values.last_name, role: values.role };
              const updatedUser = await UserService.updateUser(id, updateData);
              setUser(updatedUser);
              resetForm({ values: { email: updatedUser.email, first_name: updatedUser.first_name, last_name: updatedUser.last_name, role: updatedUser.role } });
              setSuccess('User updated successfully!');
              setTimeout(() => navigate('/admin/users'), 1000);
            } catch (err: unknown) {
              if (err instanceof Error) {
                setError(err.message);
              } else {
                setError('Failed to update user');
              }
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {() => (
            <Form>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" />
                <ErrorMessage name="email" component={ErrorText} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="first_name">First Name</Label>
                <Input id="first_name" name="first_name" />
                <ErrorMessage name="first_name" component={ErrorText} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="last_name">Last Name</Label>
                <Input id="last_name" name="last_name" />
                <ErrorMessage name="last_name" component={ErrorText} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="role">Role</Label>
                <Field as={Select} id="role" name="role">
                  <option value="">Select a role</option>
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </Field>
                <ErrorMessage name="role" component={ErrorText} />
              </FormGroup>

              <Button type="submit" disabled={submitting}>
                {submitting ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button type="button" onClick={handleToggleActive} disabled={submitting}>
                {user?.is_active ? 'Deactivate User' : 'Activate User'}
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  );
};

export default UserDetail;
