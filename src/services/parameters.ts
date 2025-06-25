import { getAllThamSo, getThamSoById, updateThamSo } from "@/config/api"
import { IThamSo } from "@/types/thamSo";

export const getAllParameters = async () => {
  const response = await getAllThamSo();
  return response.data;
}

export const updateParameter = async (parameter_code: string, value: number, rawParameters: IThamSo[]) => {
  // Tìm parameter cần update từ rawParameters
  const parameterToUpdate = rawParameters.find(param => param.maThamSo === parameter_code);
  
  if (!parameterToUpdate) {
    throw new Error(`Parameter with code ${parameter_code} not found`);
  }
  
  // Format lại theo IThamSo với giá trị mới
  const updatedParameter: IThamSo = {
    ...parameterToUpdate,
    giaTri: value.toString()
  };
  
  // Gọi API updateThamSo với id và parameter đã format
  const response = await updateThamSo(parameterToUpdate.thamSoID, updatedParameter);
  return response.data;
  
}
export const getParameterById = async () => {
  const res = await getThamSoById("3");
  // Giả sử API trả về mảng, lấy phần tử đầu tiên
  return res.data.giaTri;
};