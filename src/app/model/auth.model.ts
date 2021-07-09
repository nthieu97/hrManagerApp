import { User } from './user.model';

// tslint:disable-next-line: class-name
export interface loginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}
