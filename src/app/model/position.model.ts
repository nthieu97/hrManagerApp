export interface responePosition {
  status: boolean;
  message: string;
  data: DataPositionDetail;
}

export interface DataPositionDetail {
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
  created_at: string;
  updated_at: string;
  deleted_at?: any;
}