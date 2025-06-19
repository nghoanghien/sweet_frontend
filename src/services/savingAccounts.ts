import { getAllSavingAccountsAPI } from "@/api/savingAccount";
import { mapApiToSavingAccount } from "@/mappers/savingAccount.mapper";

export const getAllSavingAccounts = async () => {
  const response = await getAllSavingAccountsAPI();
  return response.data.map(mapApiToSavingAccount);
}