import { DepositType, InterestFrequency, MaturityOption, SavingAccountStatus } from "./enums";
import { User } from "./user";

export interface SavingAccount {
  id: number;
  //accountNumber: string;
  initialAmount: number;
  remainingAmount: number;
  term: number;
  termDays: number;
  daysRemaining: number;
  interestRate: number;
  interestFrequency: InterestFrequency;
  depositType: DepositType;
  maturityOption: MaturityOption;
  startDate: Date;
  endDate: Date;
  receivedInterest: number;
  totalReceivable: number;
  nickname: string;
  status: SavingAccountStatus;
  customer: User;
}