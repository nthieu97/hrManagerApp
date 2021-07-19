export interface responseDepartment {
  status: boolean;
  message: string;
  data: DataDepartmentDetail;
}

export interface DataDepartmentDetail {
  id: number;
  name: string;
  created_at?: any;
  updated_at?: string;
  deleted_at?: any;
}
