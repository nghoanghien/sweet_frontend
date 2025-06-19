export enum AccountStatus {
  ACTIVE = 'active',
  DISABLED = 'disabled',
};

export enum CustomerStatus {
  ACTIVE = 'active',
  DISABLED = 'disabled',
};

export enum Permission {
  PAYMENT_ACCOUNT = 'manage payment account',
  SAVING_ACCOUNTS = 'manage saving accounts',
  CUSTOMERS = 'manage customers and theirs savings accounts',
  EMPLOYEES = 'manage employees',
  SAVING_PRODUCTS = 'manage saving products',
  SALE_REPORTS = "manage sale reports",
  SETTINGS = "settings",
  PERMISSIONS = 'manage permissions',
}