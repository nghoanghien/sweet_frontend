import { callGetAllNhanVien, callUpdateNhanVien } from "@/config/api";
import { mapApiToUser, mapUserToINhanVienReqDTO } from "@/mappers/user.mapper";
import { User } from "@/types/interfaces/user";

export const getAllEmployees = async () => {
  const response = await callGetAllNhanVien();
  return response.data?.map(mapApiToUser);
}

export const updateEmployee = async (employee: User, id: number) => {
  console.log("DỮ LIỆU MAPPING: ", mapUserToINhanVienReqDTO(employee));
  console.log("ID NHÂN VIÊN: ", id);
  const response = await callUpdateNhanVien(mapUserToINhanVienReqDTO(employee), id.toString());
  return response;
}