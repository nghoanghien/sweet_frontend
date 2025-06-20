import { paymentAccountStatus } from "./enums";

export interface PaymentAccount {
  id: number;
  //accountNumber === id, nghĩa là accountNumber chính là id
  paymentAccountStatus: paymentAccountStatus;
  balance: number;
  creationDate: Date;
}