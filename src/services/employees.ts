import { callGetAllNhanVien } from "@/config/api";
import { mapApiToUser } from "@/mappers/user.mapper";
import { User } from "@/types/interfaces/user";

export const getAllEmployees = async () => {
  const response = await callGetAllNhanVien();
  console.log("dữ liệu nhân viên trước kkhi map: ", response.data);
  return response.data?.map(mapApiToUser);
}

export const addNewEmployee = async (newEmployee: User) => {
  
}