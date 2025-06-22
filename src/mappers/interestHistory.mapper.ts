import { interestHistory } from "@/types/interfaces/interestHisory";

export const mapAPIToInterestHistory = (item: any): interestHistory => {
    
    return {
        id: item.phieuTraLaiId,
        period: `Kỳ ${item.phieuTraLaiId}`,
        date: item.ngayTraLai,
        amount: item.giaoDich.soTienGiaoDich,
        method: `Chuyển vào tài khoản thanh toán`,
        status: `Đã thanh toán`,
        targetAccount: item.giaoDich.taiKhoanDich
    };
};