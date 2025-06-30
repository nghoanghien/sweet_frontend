import { callGetSavingAccountsByCustomerId, getAllSavingAccountsAPI } from "@/api/savingAccount";
import { mapApiToSavingAccount } from "@/mappers/savingAccount.mapper";
import { withdrawMoney } from "@/config/api";

export const getAllSavingAccounts = async () => {
  const response = await getAllSavingAccountsAPI();
  return response.data.map(mapApiToSavingAccount);
}

export const getSavingAccountsById = async (customerId: number) => {
  const response = await callGetSavingAccountsByCustomerId(customerId);
  console.log('Du lieu truoc khi map: ', response.data);
  console.log('customer Id....................:', customerId);
  return response.data.map(mapApiToSavingAccount);
}

export const withdrawMoneyFromSaving = async (phieuGuiTienID: number, soTienRut: number, kenhGiaoDichID: number) => {
  const withdrawInfo = {
    phieuGuiTienID,
    soTienRut,
    kenhGiaoDichID
  };
  
  const response = await withdrawMoney(withdrawInfo);
  console.log('RESPONSE GỐC: ', response);
  return response;
}