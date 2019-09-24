import { Timestamp } from 'rxjs/internal/operators/timestamp';

export class UserModel {
  id: number;
  email: string;
  password: string;
  fullname: string ;
  mobile: number;
  role: string;
  referral: number;
  payment: boolean;
  account: boolean;
  trade: boolean;
  created: Timestamp<Date> ;
}
