import { callGetLSGD_TKTTByTaiKhoanID } from "@/config/api"
import { mapApiToPaymentTransaction } from "@/mappers/payment-transaction.mapper";

export const getTransactionHistoryByPaymentAccountId = async (id: number) => {
  const response = await callGetLSGD_TKTTByTaiKhoanID(id);
  return response.data.map(mapApiToPaymentTransaction);
}