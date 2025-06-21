import { PaymentTransaction } from "@/types/interfaces/transaction";
import { getChannelByCode } from "@/utils/transactions";

export const mapApiToPaymentTransaction = (item: any): PaymentTransaction => {
  return {
    id: item.lichSuGiaoDichID,
    type: item.giaoDich.loaiGiaoDich.tenLoaiGiaoDich,
    time: new Date(item.giaoDich.thoiGianGiaoDich),
    amount: item.giaoDich.soTienGiaoDich,
    sourceAccount: item.giaoDich.taiKhoanNguon,
    sourceAccountCode: item.giaoDich.loaiTaiKhoanNguon.maLoaiTaiKhoan,
    channel: getChannelByCode(item.giaoDich.kenhGiaoDich.maKenhGiaoDich),
    balanceAfter: item.soDuSauGD,
    content: item.noiDung,
  }
}