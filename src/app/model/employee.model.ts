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
  deparmentId:string
}
