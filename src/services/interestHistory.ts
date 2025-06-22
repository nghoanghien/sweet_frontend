import { callGetTraLaiByPhieuGuiTienID } from "@/config/api";
import { mapAPIToInterestHistory } from "@/mappers/interestHistory.mapper";

export const getInterestHistoryBySavingsAccountId = async (id: number) => {
    const response = await callGetTraLaiByPhieuGuiTienID(id);
    return response.data.map(mapAPIToInterestHistory);
}