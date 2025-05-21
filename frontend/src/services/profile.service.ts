import api from './api';
import { UserProfile, UserProfileUpdate } from '../types/user';
import { apiConfig } from '../config/api.config';

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
};
