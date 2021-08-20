export interface ListAtendanceResponse {
  status: boolean;
  message: string;
  data: Atendance[];
}

export interface Atendance {
  id: number;
  user_id: number;
  time_of_check_in: string;
  time_of_check_out: string;
  date_of_work: string;
  check_ot?: number;
  status: number;
  note?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: any;
  full_name: string;
}
