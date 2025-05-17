export interface Schedule {
  id: string;
  employee_id: string;
  start_time: string;
  end_time: string;
  location: string;
  role: string;
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface ScheduleFilter {
  startDate?: string;
  endDate?: string;
  status?: string;
  location?: string;
}

export interface TimeOffRequest {
  id: string;
  employee_id: string;
  start_date: string;
  end_date: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface TimeOffRequestCreate {
  start_date: string;
  end_date: string;
  reason: string;
}

export interface Availability {
  id: string;
  employee_id: string;
  day_of_week: number; // 0 = Sunday, 1 = Monday, etc.
  start_time: string;
  end_time: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export interface AvailabilityUpdate {
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available: boolean;
}
