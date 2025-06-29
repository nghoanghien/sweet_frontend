import { callCreateOrUpdateQuyDinhLaiSuat, callDeleteQuyDinhLaiSuat, callGetAllQuyDinhLaiSuat, callGetQuyDinhLaiSuatHienTai } from "@/config/api";
import { mapApiToRegulationHistory, mapFrontendToApiRegulation } from "@/mappers/regulationHistory.mapper";
import { IQuyDinhLaiSuatReqDTO, IQuyDinhLaiSuatResDTO } from "@/types/quyDinhLaiSuat";
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

export const createOrUpdateRegulation = async (regulation: IQuyDinhLaiSuatReqDTO) => {
  const response = await callCreateOrUpdateQuyDinhLaiSuat(regulation);
  return response;
}

export const cancelRegulation = async (regulationId: number) => {
  const response = await callDeleteQuyDinhLaiSuat(regulationId);
  return response.data;
}