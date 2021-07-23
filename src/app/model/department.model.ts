export interface ResponseAllDepartment {
  status: boolean;
  message: string;
  data: Department[];
}

export interface Department {
  id: number;
  name: string;
  created_at?: any;
  updated_at?: any;
  deleted_at?: any;
}
export interface ResponseDepartment {
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
  phongban: Phongban[];
}

export interface Phongban {
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
