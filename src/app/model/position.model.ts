export interface ResponeAllPosition {
  status: boolean;
  message: string;
  data: Position[];
}

export interface Position {
  id: number;
  name: string;
  created_at?: any;
  updated_at?: any;
  deleted_at?: any;
}

export interface ResponePosition {
  status: boolean;
  message: string;
  data: Data;
}

export interface Data {
  id: number;
  name: string;
  created_at?: any;
  updated_at?: any;
  deleted_at?: any;
  chucvu: Employee[];
}

export interface Employee {
  id: number;
  user_account: string;
  role_id: number;
  position_id: number;
  department_id: number;
  email: string;
  email_verified_at?: any;
  created_at?: string;
  updated_at?: string;
  deleted_at?: any;
}
