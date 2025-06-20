import { paymentAccountStatus } from "@/types/interfaces/enums";

export function getPaymentAccountStatusByCode(code: string): paymentAccountStatus {
  switch (code) {
    case 'active':
      return paymentAccountStatus.ACTIVE;
    case 'locked':
      return paymentAccountStatus.DISABLED;
    default:
      return paymentAccountStatus.ACTIVE;
  }
}