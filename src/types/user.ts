import { AccountStatus, CustomerStatus, Permission } from "./enums";

export interface Role {
  roleID: string;
  roleName: string;
  permissions: Permission[];
}

export interface Address {
  addressID: number;
  houseNumber: string;
  streetName: string;
  ward: string;
  district: string;
  province: string;
}

export interface User {
  fullName: string;
  dateOfBirth: Date;
  age: number;
  idCardNumber: string;
  email: string;
  phoneNumber: string;
  permanentAddressID: Address;
  contactAddressID: Address;
  role: Role;
  accountStatus: AccountStatus;

  // Only for employee
  employeeID?: string;
  recruitmentDate?: Date;

  // Only for customer
  customerID?: string;
  registrationDate?: Date;
  customerStatus?: CustomerStatus;
}

export interface LoginCredentials {
  userName: string;
  password: string;
  role: 'customer' | 'employee';
}