export interface SalariesResponse {
  status: boolean;
  message: string;
  data: Salary[];
}

export interface Salary {
  full_name: string;
  id: number;
  user_id: number;
  total_gross_salary: number;
  total_salary_leave?: number;
  total_net_salary: number;
  status: number;
  date: string;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
}
