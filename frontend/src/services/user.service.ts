import api from './api';
import { User } from '../types/auth';
import { apiConfig } from '../config/api.config';
import { Role } from '../types/user';

export interface UserListResponse {
  users: User[];
  total: number;
}

export const UserService = {
  async listUsers(page = 1, limit = 20): Promise<User[]> {
    const skip = (page - 1) * limit;
    const response = await api.get<User[]>(apiConfig.endpoints.users.list, {
      params: { skip, limit }
    });
    return response.data;
  },

  async getUser(id: string): Promise<User> {
    const response = await api.get<User>(apiConfig.endpoints.users.get(id));
    return response.data;
  },

  async createUser(data: Partial<User> & { password: string }): Promise<User> {
    const response = await api.post<User>(apiConfig.endpoints.users.create, data);
    return response.data;
  },

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const response = await api.put<User>(apiConfig.endpoints.users.update(id), data);
    return response.data;
  },

  async deactivateUser(id: string): Promise<User> {
    const response = await api.delete<User>(apiConfig.endpoints.users.delete(id));
    return response.data;
  },

  /**
   * Activate a user (reactivate)
   * @param id User ID
   */
  async activateUser(id: string): Promise<User> {
    const response = await api.put<User>(apiConfig.endpoints.users.update(id), { is_active: true });
    return response.data;
  },

  async listRoles(): Promise<string[]> {
    const response = await api.get<Role[]>(`/roles`);
    return response.data.map((r) => r.name);
  }
};
