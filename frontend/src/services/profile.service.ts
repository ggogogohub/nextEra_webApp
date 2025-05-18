import api from './api';
import { AvailabilityUpdate, Availability } from '../types/schedule';

export const ProfileService = {
  /** Get current user's profile details */
  async getProfile() {
    const response = await api.get('/profile');
    return response.data;
  },

  /** Update user's profile */
  async updateProfile(data: Partial<{ email: string; first_name: string; last_name: string; role?: string }>) {
    const response = await api.put('/profile', data);
    return response.data;
  },

  /** Fetch availability list */
  async getAvailability(): Promise<Availability[]> {
    const response = await api.get<Availability[]>('/profile/availability');
    return response.data;
  },

  /** Bulk upsert availability */
  async upsertAvailability(
    availList: AvailabilityUpdate[],
  ): Promise<Availability[]> {
    const response = await api.put<Availability[]>('/profile/availability', availList);
    return response.data;
  },
};
