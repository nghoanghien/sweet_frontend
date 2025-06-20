import { AccountStatus, CustomerStatus } from "@/types/interfaces/enums";

export function getAccountStatusByCode(code: string): AccountStatus {
  switch (code) {
    case 'active':
      return AccountStatus.ACTIVE;
    case 'locked':
      return AccountStatus.DISABLED;
    default:
      return AccountStatus.ACTIVE;
  }
}

export function getCustomerStatusByCode(code: string): CustomerStatus {
  switch (code) {
    case 'active':
      return CustomerStatus.ACTIVE;
    case 'locked':
      return CustomerStatus.DISABLED;
    default:
      return CustomerStatus.ACTIVE;
  }
}