import api from './api';
import { User } from '../types/auth';

export interface UserListResponse {
  users: User[];
  total: number;
}

export const UserService = {
  async listUsers(page = 1, limit = 20): Promise<User[]> {
    const skip = (page - 1) * limit;
    const response = await api.get<User[]>(`/users`, {
      params: { skip, limit }
    });
    return response.data;
  },

  async getUser(id: string): Promise<User> {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },

  async createUser(data: Partial<User> & { password: string }): Promise<User> {
    const response = await api.post<User>(`/users`, data);
    return response.data;
  },

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const response = await api.put<User>(`/users/${id}`, data);
    return response.data;
  },

  async deactivateUser(id: string): Promise<User> {
    const response = await api.delete<User>(`/users/${id}`);
    return response.data;
  },

  /**
   * Activate a user (reactivate)
   * @param id User ID
   */
  async activateUser(id: string): Promise<User> {
    const response = await api.put<User>(`/users/${id}`, { is_active: true });
    return response.data;
  },

  async listRoles(): Promise<string[]> {
    const response = await api.get<any[]>(`/roles`);
    return response.data.map((r) => r.name);
  }
};
