import api from './api';
import { apiConfig } from '../config/api.config';
import { Notification } from '../components/notifications/NotificationIcon/types';

class NotificationService {
  async getNotifications(): Promise<Notification[]> {
    const response = await api.get<Notification[]>(apiConfig.endpoints.notifications.list);
    return response.data;
  }

  async markAsRead(id: string): Promise<void> {
    await api.post(apiConfig.endpoints.notifications.markRead(id));
  }

  async markAllAsRead(): Promise<void> {
    await api.post(apiConfig.endpoints.notifications.markAllRead);
  }
}

export const notificationService = new NotificationService();
