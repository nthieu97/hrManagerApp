export interface ScanResponse {
  message: string;
  status: boolean;
  data: ScanData;
}

export interface ScanData {
  id: number;
  user_id: number;
  time_of_check_in: string;
  time_of_check_out: string;
  date_of_work: string;
  status: string;
  check_ot: number;
  note?: any;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  get_user_name: Getusername;
}

export interface Getusername {
  id: number;
  user_account: string;
  role_id: number;
  position_id: number;
  department_id: number;
  email: string;
  email_verified_at?: any;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
}
