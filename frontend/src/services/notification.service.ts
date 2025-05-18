import api from './api';
import { Notification } from '../types/notification';

export const NotificationService = {
  async getNotifications(): Promise<Notification[]> {
    const response = await api.get<Notification[]>('/notifications');
    return response.data;
  },

  async markAsRead(id: string, is_read: boolean): Promise<Notification> {
    const response = await api.put<Notification>(`/notifications/${id}`, { is_read });
    return response.data;
  },
};
