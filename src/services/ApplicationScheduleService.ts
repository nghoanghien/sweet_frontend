import { callGetAllQuyDinhLaiSuat } from "@/config/api";
import { mapMultipleApiToApplicationSchedule } from "@/mappers/applicationSchedule.mapper";

export const getAllRegulationHistory = async () => {
  const response = await callGetAllQuyDinhLaiSuat();
  return mapMultipleApiToApplicationSchedule(response.data || []);
}

// export const cancelRegulation = async (regulationId: number) => {
//   const response = await callGetAllQuyDinhLaiSuat();
//   return response.data;
// }