import { Channel } from "./enums";


export interface PaymentTransaction {
  id: number;
  type: string;
  time: Date;
  amount: number;
  sourceAccount: number;
  sourceAccountCode: number;
  channel: Channel;
  balanceAfter: number;
  content: string;
}