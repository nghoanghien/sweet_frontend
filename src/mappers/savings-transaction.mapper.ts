import { SavingsTransaction } from "@/types/interfaces/savingsTransaction";
import { getChannelByCode } from "@/utils/transactions";

export const mapAPIToSavingsTransaction = (item: any): SavingsTransaction => {
    // Lấy các giá trị cần thiết
    const maLoaiTaiKhoan = item.giaoDich.loaiTaiKhoanNguon?.maLoaiTaiKhoan;
    const taiKhoanNguon = item.giaoDich.taiKhoanNguon;
    const phieuGuiTienId = item.phieuGuiTienId;

    // Logic xác định isDeposit
    let IsDeposit = true;
    if (maLoaiTaiKhoan === 1 && phieuGuiTienId === taiKhoanNguon ) {
        IsDeposit = false;
    }
    return {
        id: item.lichSuPhieuGuiTienId,
        type: item.giaoDich.loaiGiaoDich.tenLoaiGiaoDich,
        time: new Date(item.giaoDich.thoiGianGiaoDich),
        amount: item.giaoDich.soTienGiaoDich,
        channel: getChannelByCode(item.giaoDich.kenhGiaoDich.maKenhGiaoDich),
        balanceAfter: item.soDuHienTai_SauGD,
        content: item.giaoDich.noiDung,
        isDeposit:  IsDeposit,
        interestAmount: item.soTienGocGiaoDich,
    };
};
