import { Timestamp } from 'rxjs/internal/operators/timestamp';

export class UserModel {
  id: number;
  email: string;
  password: string;
  firstname: string ;
  lastname: string ;
  mobile: number;
  isInvestor: boolean;
  isMember: boolean;
  referral: number;
  payment: boolean;
  account: boolean;
  trade: boolean;
  created: Timestamp<Date> ;
}
