import { callDeleteQuyDinhLaiSuat, callGetAllQuyDinhLaiSuat, callGetQuyDinhLaiSuatHienTai } from "@/config/api";
import { mapApiToRegulationHistory } from "@/mappers/regulationHistory.mapper";
import { IQuyDinhLaiSuatResDTO } from "@/types/quyDinhLaiSuat";
import { IBackendRes } from "@/types/backend";

export const getAllRegulationHistory = async () => {
  const response = await callGetAllQuyDinhLaiSuat();
  return response.data.map(mapApiToRegulationHistory);
}

export const getRegulationCurrent = async () => {
  const response = await callGetQuyDinhLaiSuatHienTai();
  if (!response.data) return [];
  // Wrap the single object in an array since our component expects an array
  return [mapApiToRegulationHistory(response.data)];
}

export const cancelRegulation = async (regulationId: number) => {
  const response = await callDeleteQuyDinhLaiSuat(regulationId);
  return response.data;
}