import { callGetTaiKhoanThanhToanByID } from "@/config/api"
import { mapApiToPaymentAccount } from "@/mappers/payment-account.mapper";

export const getPaymentAccountById = async (customerId: number) => {
  const response = await callGetTaiKhoanThanhToanByID(customerId);
  return response.data.map(mapApiToPaymentAccount);
}