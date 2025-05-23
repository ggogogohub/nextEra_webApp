import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext/AuthProvider';
import { NotificationProvider } from './contexts/NotificationContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import UsersPage from './pages/admin/Users';
import NewUser from './pages/admin/NewUser';
import UserDetail from './pages/admin/UserDetail';
import Unauthorized from './pages/Unauthorized'; // Assuming Unauthorized page is created
import Admin from './pages/admin/Admin';
import RolesPage from './pages/admin/Roles';
import SchedulesPage from './pages/Schedules';
import NotificationsPage from './pages/Notifications';
import Landing from './pages/Landing';
import "./styles/globals.css";

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NotificationProvider>
            <Router>
              <Layout>
                <Routes>
                  {/* Public routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/" element={<Landing />} />

                  {/* Protected routes */}
                  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  <Route path="/schedules" element={<ProtectedRoute><SchedulesPage /></ProtectedRoute>} />
                  <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />

                  {/* Admin routes */}
                  <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><Admin /></ProtectedRoute>} />
                  <Route path="/admin/users/new" element={<ProtectedRoute allowedRoles={['admin']}><NewUser /></ProtectedRoute>} />
                  <Route path="/admin/users/:id" element={<ProtectedRoute allowedRoles={['admin']}><UserDetail /></ProtectedRoute>} />
                  <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><UsersPage /></ProtectedRoute>} />
                  <Route path="/admin/roles" element={<ProtectedRoute allowedRoles={['admin']}><RolesPage /></ProtectedRoute>} />

                  {/* Unauthorized route */}
                  <Route path="/unauthorized" element={<Unauthorized />} />

                  {/* Redirect to landing if unknown route */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Layout>
            </Router>
          </NotificationProvider>
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
