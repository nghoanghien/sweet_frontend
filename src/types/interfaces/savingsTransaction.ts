import {Channel} from './enums';

export interface SavingsTransaction {
  id: string;
  type: string;
  time: Date;
  amount: number;
  channel: Channel;
  balanceAfter: number;
  content: string;
  isDeposit: boolean;
  interestAmount: number;
}