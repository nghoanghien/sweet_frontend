import { callGetAllNhanVien, callUpdateNhanVien } from "@/config/api";
import { mapApiToUser, mapUserToINhanVienReqDTO } from "@/mappers/user.mapper";
import { User } from "@/types/interfaces/user";

export const getAllEmployees = async () => {
  const response = await callGetAllNhanVien();
  return response.data?.map(mapApiToUser);
}

export const updateEmployee = async (employee: User, id: number, newPassword?: string) => {
  const mappedData = mapUserToINhanVienReqDTO(employee);
  const requestData = newPassword ? { ...mappedData, matKhau: newPassword } : mappedData;
  const response = await callUpdateNhanVien(requestData, id.toString());
  return response;
}