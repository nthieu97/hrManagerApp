export interface TimeOffResponse {
  status: boolean;
  message: string;
  data: TimeOff[];
}

export interface TimeOff {
  id: number;
  user_id: number;
  time_start: string;
  time_end: string;
  date: string;
  note: string;
  mode_leave?: number;
  number_mode_leave: number;
  number_day_leave: number;
  status: number;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  full_name: string;
}
