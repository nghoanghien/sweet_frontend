import { callGetRutTienByPhieuGuiTienID } from "@/config/api";
import { mapAPIToWithdrawalHistory } from "@/mappers/withDrawalHistory.mapper";

export const getWithdrawalHistoryBySavingsAccountId = async (id: number) => {
    const response = await callGetRutTienByPhieuGuiTienID(id);
    return response.data.map(mapAPIToWithdrawalHistory);
}