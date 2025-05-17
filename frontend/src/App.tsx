import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import UsersPage from './pages/admin/Users';
import NewUser from './pages/admin/NewUser';
import UserDetail from './pages/admin/UserDetail';
import Unauthorized from './pages/Unauthorized'; // Assuming Unauthorized page is created
import Admin from './pages/admin/Admin';

// Create a client for React Query
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              {/* Admin routes */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/users/new" element={<NewUser />} />
                <Route path="/admin/users/:id" element={<UserDetail />} />
                <Route path="/admin/users" element={<UsersPage />} />
              </Route>

              {/* Unauthorized route */}
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* Redirect to dashboard if authenticated, otherwise to login */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
