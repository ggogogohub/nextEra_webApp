import api from './api';
import { AuthTokens, LoginCredentials, RegisterCredentials, User } from '../types/auth';

export const AuthService = {
  /**
   * Login user
   * @param credentials User login credentials
   * @returns Promise with auth tokens
   */
  async login(credentials: LoginCredentials): Promise<AuthTokens> {
    // Convert to URLSearchParams for FastAPI OAuth2 compatibility
    const formData = new URLSearchParams();
    formData.append('username', credentials.email);
    formData.append('password', credentials.password);

    const response = await api.post<AuthTokens>('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Save tokens to localStorage
    localStorage.setItem('access_token', response.data.access_token);
    localStorage.setItem('refresh_token', response.data.refresh_token);

    return response.data;
  },

  /**
   * Register a new user
   * @param userData User registration data
   * @returns Promise with created user
   */
  async register(userData: RegisterCredentials): Promise<User> {
    console.log('Registering user with data:', userData);
    console.log('Role being sent to API:', userData.role);

    // Ensure role is one of the allowed values
    if (!['employee', 'manager', 'admin'].includes(userData.role)) {
      console.error('Invalid role:', userData.role);
      throw new Error(`Invalid role: ${userData.role}. Must be one of: employee, manager, admin`);
    }

    // Create a specific data structure to ensure role is sent correctly
    const dataToSend = {
      email: userData.email,
      password: userData.password,
      first_name: userData.first_name,
      last_name: userData.last_name,
      role: userData.role  // This must be explicitly set and not overridden
    };

    console.log('Final data being sent to API:', dataToSend);
    console.log('ROLE MUST BE PRESERVED:', dataToSend.role);

    const response = await api.post<User>('/auth/register', dataToSend);
    console.log('Registration response:', response.data);
    return response.data;
  },

  /**
   * Get current user information
   * @returns Promise with user data
   */
  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },

  /**
   * Refresh access token
   * @returns Promise with new auth tokens
   */
  async refreshToken(): Promise<AuthTokens> {
    const refreshToken = localStorage.getItem('refresh_token');

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await api.post<AuthTokens>('/auth/refresh', {
      refresh_token: refreshToken,
    });

    // Save new tokens
    localStorage.setItem('access_token', response.data.access_token);
    localStorage.setItem('refresh_token', response.data.refresh_token);

    return response.data;
  },

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (e) {
      console.warn('Logout request failed or server unavailable', e);
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  /**
   * Check if user is authenticated
   * @returns Boolean indicating if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  },
};
