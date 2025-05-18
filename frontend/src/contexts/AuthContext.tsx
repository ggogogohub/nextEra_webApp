import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthService } from '../services/auth.service';
import { AuthState, LoginCredentials } from '../types/auth';

// Default auth state
const defaultAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Create context
interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>(defaultAuthState);

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      if (AuthService.isAuthenticated()) {
        try {
          const user = await AuthService.getCurrentUser();
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          console.error('Failed to load user:', error);
          AuthService.logout();
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: 'Session expired. Please login again.',
          });
        }
      } else {
        setAuthState({
          ...authState,
          isLoading: false,
        });
      }
    };

    loadUser();
  }, []);

  // Periodic token refresh
  useEffect(() => {
    const interval = setInterval(async () => {
      if (AuthService.isAuthenticated()) {
        try {
          await AuthService.refreshToken();
        } catch (err) {
          console.error('Auto refresh failed', err);
          logout();
        }
      }
    }, 5 * 60 * 1000); // every 5 minutes
    return () => clearInterval(interval);
  }, []);

  // Idle timeout
  useEffect(() => {
    let timer: number | null = null;
    const resetTimer = () => {
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        console.log('Idle timeout – logging out');
        logout();
      }, 30 * 60 * 1000); // 30 minutes
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    resetTimer();
    return () => {
      if (timer) window.clearTimeout(timer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials) => {
    try {
      setAuthState({
        ...authState,
        isLoading: true,
        error: null,
      });

      // First, attempt to login
      await AuthService.login(credentials);

      try {
        // Then, get the current user
        const user = await AuthService.getCurrentUser();

        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } catch (userError: any) {
        console.error('Failed to get user after login:', userError);
        // If we can't get the user, log out and show error
        AuthService.logout();
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Authentication error. Please try logging in again.',
        });
        throw userError;
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      let errorMessage = 'Login failed. Please try again.';

      if (error.response) {
        // Server responded with an error
        errorMessage = error.response.data?.detail || errorMessage;
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = 'No response from server. Please check your connection.';
      } else {
        // Error setting up the request
        errorMessage = error.message || errorMessage;
      }

      setAuthState({
        ...authState,
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    AuthService.logout();
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  // Clear error
  const clearError = () => {
    setAuthState({
      ...authState,
      error: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
