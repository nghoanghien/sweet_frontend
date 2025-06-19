import { AccountStatus, CustomerStatus } from "@/types/enums";

export function getAccountStatusByCode(code: number): AccountStatus {
  switch (code) {
    case 1:
      return AccountStatus.ACTIVE;
    case 2:
      return AccountStatus.DISABLED;
    default:
      return AccountStatus.ACTIVE;
  }
}

export function getCustomerStatusByCode(code: number): CustomerStatus {
  switch (code) {
    case 1:
      return CustomerStatus.ACTIVE;
    case 2:
      return CustomerStatus.DISABLED;
    default:
      return CustomerStatus.ACTIVE;
  }
}