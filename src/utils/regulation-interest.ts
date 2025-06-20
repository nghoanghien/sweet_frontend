import { InterestFrequency, InterestFrequencyInfo, DepositType, DepositTypeInfo, MaturityOption, MaturityOptionInfo, SavingAccountStatus } from "@/types/interfaces/enums";

export function getInterestFrequencyLabel(freq: InterestFrequency): string {
  return InterestFrequencyInfo[freq]?.label ?? 'Không rõ';
}

export function getInterestFrequencyDescription(freq: InterestFrequency): string {
  return InterestFrequencyInfo[freq]?.description ?? 'Không rõ';
}

// DepositType utility functions
export function getDepositTypeLabel(type: DepositType): string {
  return DepositTypeInfo[type]?.label ?? 'Không rõ';
}

export function getDepositTypeDescription(type: DepositType): string {
  return DepositTypeInfo[type]?.description ?? 'Không rõ';
}

// MaturityOption utility functions
export function getMaturityOptionLabel(option: MaturityOption): string {
  return MaturityOptionInfo[option]?.label ?? 'Không rõ';
}

export function getMaturityOptionDescription(option: MaturityOption): string {
  return MaturityOptionInfo[option]?.description ?? 'Không rõ';
}

// Get enum by code functions
export function getInterestFrequencyByCode(code: number): InterestFrequency {
  switch (code) {
    case 1:
      return InterestFrequency.MONTHLY;
    case 2:
      return InterestFrequency.QUARTERLY;
    case 3:
      return InterestFrequency.END_OF_TERM;
    case 4:
      return InterestFrequency.BEGIN_OF_TERM;
    default:
      return InterestFrequency.BEGIN_OF_TERM;
  }
}

export function getDepositTypeByCode(code: number): DepositType {
  switch (code) {
    case 1:
      return DepositType.STANDARD;
    case 2:
      return DepositType.FLEXIBLE;
    default:
      return DepositType.STANDARD;
  }
}

export function getMaturityOptionByCode(code: number): MaturityOption {
  switch (code) {
    case 1:
      return MaturityOption.RECEIVE_ALL;
    case 2:
      return MaturityOption.ROLLOVER_PRINCIPAL;
    case 3:
      return MaturityOption.ROLLOVER_ALL;
    default:
      return MaturityOption.RECEIVE_ALL;
  }
}

export function getSavingAccountStatusByCode(code: number): SavingAccountStatus {
  switch (code) {
    case 9:
      return SavingAccountStatus.CLOSED;
    case 10:
      return SavingAccountStatus.IN_TERM;
    default:
      return SavingAccountStatus.CLOSED;
  }
}
