import api from './api';
import { Role, RoleCreate, RoleUpdate } from '../types/role';

export const RoleService = {
  /** List all roles */
  async listRoles(): Promise<Role[]> {
    const response = await api.get<Role[]>('/roles');
    return response.data;
  },
  /** Get one role by ID */
  async getRole(id: string): Promise<Role> {
    const response = await api.get<Role>(`/roles/${id}`);
    return response.data;
  },
  /** Create a new role */
  async createRole(data: RoleCreate): Promise<Role> {
    const response = await api.post<Role>('/roles', data);
    return response.data;
  },
  /** Update a role */
  async updateRole(id: string, data: RoleUpdate): Promise<Role> {
    const response = await api.put<Role>(`/roles/${id}`, data);
    return response.data;
  },
  /** Delete a role */
  async deleteRole(id: string): Promise<Role> {
    const response = await api.delete<Role>(`/roles/${id}`);
    return response.data;
  },
};
