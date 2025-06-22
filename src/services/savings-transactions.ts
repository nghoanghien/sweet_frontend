import { callGetLSGD_PGTByPhieuGuiTienID } from "@/config/api";
import { mapAPIToSavingsTransaction } from "@/mappers/savings-transaction.mapper";

export const getSavingTransactionsBySavingsAccountId = async (id: number) => {
    const response = await callGetLSGD_PGTByPhieuGuiTienID(id);
    console.log(response);
    return response.data.map(mapAPIToSavingsTransaction);
}
