import { interestHistory } from "@/types/interfaces/interestHisory";

export const mapAPIToInterestHistory = (item: any): interestHistory => {
    
    return {
        id: item.phieuTraLaiID,
        period: `${item.phieuTraLaiID}`,
        date: new Date(item.ngayTraLai),
        amount: item.giaoDich.soTienGiaoDich,
        method: `Chuyển vào tài khoản thanh toán`,
        status: `Đã thanh toán`,
        targetAccount: item.giaoDich.taiKhoanDich
    };
};