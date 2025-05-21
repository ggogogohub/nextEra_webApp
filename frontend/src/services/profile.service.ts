import api from './api';
import { UserProfile, UserProfileUpdate } from '../types/user';
import { apiConfig } from '../config/api.config';
import { Availability, AvailabilityUpdate } from '../types/schedule';

export const ProfileService = {
  /** Get current user's profile details */
  async getProfile(): Promise<UserProfile> {
    const response = await api.get<UserProfile>(apiConfig.endpoints.profile);
    return response.data;
  },

  /** Update user's profile */
  async updateProfile(data: UserProfileUpdate): Promise<UserProfile> {
    const response = await api.put<UserProfile>(apiConfig.endpoints.profile, data);
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
