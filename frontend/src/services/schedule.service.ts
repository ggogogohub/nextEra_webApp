import api from './api';
import { Schedule, ScheduleFilter, TimeOffRequest, TimeOffRequestCreate, Availability, AvailabilityUpdate } from '../types/schedule';

export const ScheduleService = {
  /**
   * Get schedules for the current user
   * @param filter Optional filter parameters
   * @returns Promise with schedules
   */
  async getSchedules(filter?: ScheduleFilter): Promise<Schedule[]> {
    const params = new URLSearchParams();

    if (filter?.startDate) {
      params.append('start_date', filter.startDate);
    }

    if (filter?.endDate) {
      params.append('end_date', filter.endDate);
    }

    if (filter?.status) {
      params.append('status', filter.status);
    }

    if (filter?.location) {
      params.append('location', filter.location);
    }

    const response = await api.get<Schedule[]>('/schedules', { params });
    return response.data;
  },

  /**
   * Get a specific schedule by ID
   * @param id Schedule ID
   * @returns Promise with schedule
   */
  async getSchedule(id: string): Promise<Schedule> {
    const response = await api.get<Schedule>(`/schedules/${id}`);
    return response.data;
  },

  /**
   * Get time-off requests for the current user
   * @returns Promise with time-off requests
   */
  async getTimeOffRequests(): Promise<TimeOffRequest[]> {
    const response = await api.get<TimeOffRequest[]>('/schedules/time-off');
    return response.data;
  },

  /**
   * Create a new time-off request
   * @param request Time-off request data
   * @returns Promise with created time-off request
   */
  async createTimeOffRequest(request: TimeOffRequestCreate): Promise<TimeOffRequest> {
    const response = await api.post<TimeOffRequest>('/schedules/time-off', request);
    return response.data;
  },

  /**
   * Cancel a time-off request
   * @param id Time-off request ID
   * @returns Promise with updated time-off request
   */
  async cancelTimeOffRequest(id: string): Promise<TimeOffRequest> {
    const response = await api.delete<TimeOffRequest>(`/schedules/time-off/${id}`);
    return response.data;
  },

  /**
   * Get availability for the current user
   * @returns Promise with availability
   */
  async getAvailability(): Promise<Availability[]> {
    const response = await api.get<Availability[]>('/schedules/availability');
    return response.data;
  },

  /**
   * Update availability
   * @param availability Availability data
   * @returns Promise with updated availability
   */
  async updateAvailability(availability: AvailabilityUpdate): Promise<Availability> {
    const response = await api.put<Availability>(`/schedules/availability/${availability.day_of_week}`, availability);
    return response.data;
  },
};
