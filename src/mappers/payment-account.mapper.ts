import { PaymentAccount } from "@/types/interfaces/paymentAccount";
import { getPaymentAccountStatusByCode } from "@/utils/payment-account";

export const mapApiToPaymentAccount = (item: any): PaymentAccount => {
  return {
    id: item.soTaiKhoan,
    paymentAccountStatus: getPaymentAccountStatusByCode(item.trangThai.maTrangThai),
    balance: item.soDu,
    creationDate: new Date(item.ngayTao),
  }
}