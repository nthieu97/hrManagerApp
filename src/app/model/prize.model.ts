export interface responsePrizeFine {
  status: boolean;
  message: string;
  data: DataPrizeFineDetail;
}

export interface DataPrizeFineDetail {
  id: number;
  name: string;
  prize_money: number;
  fine_money?: any;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  user_account: string;
}
