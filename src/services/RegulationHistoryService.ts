import { callGetAllQuyDinhLaiSuat } from "@/config/api";
import { mapApiToRegulationHistory } from "@/mappers/regulationHistory.mapper";

export const getAllRegulationHistory = async () => {
  const response = await callGetAllQuyDinhLaiSuat();
  return response.data.map(mapApiToRegulationHistory);
}

// export const cancelRegulation = async (regulationId: number) => {
//   const response = await callGetAllQuyDinhLaiSuat();
//   return  return response.data;
// }