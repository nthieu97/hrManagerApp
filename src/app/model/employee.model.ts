// tslint:disable-next-line: class-name
export interface responseEmployee {
  status: boolean;
  message: string;
  data: Employee;
  meta: Meta;
}

export interface Meta {
  total: number;
  perPage: number;
  currentPage: number;
}

export interface Employee {
  id: number;
  full_name: string;
  email: string;
  name_department: string;
  name_position: string;
  avatar?: any;
  user_account: string;
  positionId: string;
  deparmentId: string;
}

export interface EmployeeRequestBody {
  user_account: string;
  full_name: string;
  email: string;
  department_id: number;
  position_id: number;
  role_id: number;
  phone: number;
  avatar?: FormData;
  basic_salary: number;
}
