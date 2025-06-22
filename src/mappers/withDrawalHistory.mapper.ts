import { WithdrawalHistory } from "@/types/interfaces/withdrawalHistory";
import { getChannelByCode } from "@/utils/transactions";

export const mapAPIToWithdrawalHistory = (item: any): WithdrawalHistory => {

    return {
        id: item.phieuRutTienId,
        time: item.ngayRut,
        withdrawnAmount: item.soTienRut,
        interestAmount: item.tienLaiNhanDuocKhiRut,
        remainingBalance: item.soDuSauKhiRut,
        isPartial: item.soDuSauKhiRut !== 0,
        channel: getChannelByCode(item.giaoDich.kenhGiaoDich.maKenhGiaoDich),
        status: `Thành công`
    };
};