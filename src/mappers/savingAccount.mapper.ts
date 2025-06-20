import { SavingAccount } from "@/types/interfaces/savingAccount";
import { getDepositTypeByCode, getInterestFrequencyByCode, getMaturityOptionByCode, getSavingAccountStatusByCode } from "@/utils/regulation-interest";
import { calculateDaysBetween, calculateDaysFromNow } from "@/utils/saving-account";
import { mapApiToUser } from "./user.mapper";

export const mapApiToSavingAccount = (item: any): SavingAccount => {
   return {
    id: item.phieuGuiTienID,
    initialAmount: item.soTienGuiBanDau,
    remainingAmount: item.soDuHienTai,
    term: item.soThang,
    termDays: calculateDaysBetween(new Date(item.ngayGuiTien), new Date(item.ngayDaoHan)),
    daysRemaining: calculateDaysFromNow(new Date(item.ngayDaoHan)),
    interestRate: item.laiSuat,
    interestFrequency: getInterestFrequencyByCode(item.tanSuatNhanLaiId),
    depositType: getDepositTypeByCode(item.loaiTietKiemId),
    maturityOption: getMaturityOptionByCode(item.hinhThucDaoHanId),
    startDate: new Date(item.ngayGuiTien),
    endDate: new Date(item.ngayDaoHan),
    receivedInterest: item.tienLaiDaNhanNhungChuaQuyetToan,
    totalReceivable: item.soTienGuiBanDau + item.tongLaiQuyetToan + item.tongTienLaiDuKien,
    nickname: item.tenGoiNho,
    status: getSavingAccountStatusByCode(item.trangThaiId),
    customer: mapApiToUser(item.khachHang),
   };
};