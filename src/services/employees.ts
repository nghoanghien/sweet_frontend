import { callGetAllNhanVien } from "@/config/api";
import { mapApiToUser } from "@/mappers/user.mapper";
import { User } from "@/types/interfaces/user";

export const getAllEmployees = async () => {
  const response = await callGetAllNhanVien();
  return response.data?.map(mapApiToUser);
}

export const addNewEmployee = async (newEmployee: User) => {
  
}