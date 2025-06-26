import { getChannelByCode } from "@/utils/transactions";
import { formatDate, formatTime } from "@/utils/accountUtils";

export const mapApiToEmployeeTransaction = (item: any): EmployeeTransaction => {
  // Xác định loại giao dịch (incoming/outgoing)
  const isIncoming = item.loaiGiaoDich.loaiGiaoDichID === 1 || 
                    item.loaiGiaoDich.loaiGiaoDichID === 3;
  
  const channel = item.kenhGiaoDich.maKenhGiaoDich === 1 ? "counter" : "online";
  
  return {
    id: item.lichSuGiaoDichID,
    type: isIncoming ? "incoming" : "outgoing",
    time: formatTime(item.thoiGianGiaoDich),
    date: formatDate(item.thoiGianGiaoDich),
    amount: item.soTienGiaoDich,
    description: item.loaiGiaoDich.tenLoaiGiaoDich,
    channel: channel,
    note: item.noiDung,
    
    // Thông tin tài khoản nguồn
    sourceAccountType: item.loaiTaiKhoanNguon.tenLoaiTaiKhoan,
    sourceAccountId: item.taiKhoanNguon,
    
    // Thông tin tài khoản đích
    destAccountType: item.loaiTaiKhoanDich.tenLoaiTaiKhoan,
    destAccountId: item.taiKhoanDich,
    
    // Loại giao dịch chi tiết
    transactionType: item.loaiGiaoDich.tenLoaiGiaoDich
  };
};
