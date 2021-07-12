export interface User {
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
export interface UserResponse {
  status: boolean;
  message: string;
  data: Data[];
  meta: Meta;
}

export interface Meta {
  total: number;
  perPage: number;
  currentPage: number;
}

export interface Data {
  id: number;
  full_name?: string;
  email: string;
  name_department: string;
  name_position: string;
  avatar?: any;
  user_account: string;
}
