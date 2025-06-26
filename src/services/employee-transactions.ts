import { callGetGiaoDichByNhanVienID } from "@/config/api";
import { mapApiToEmployeeTransaction } from "@/mappers/employee-transaction.mapper";

export const getEmployeeTransactions = async (id: number) => {
  const response = await callGetGiaoDichByNhanVienID(id);
  return response.data.map(mapApiToEmployeeTransaction);
};