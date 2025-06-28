import { callGetAllKhachHang, callGetKhachHangById } from "@/config/api"
import { mapApiToUser } from "@/mappers/user.mapper";

export const getAllCustomers = async () => {
  const response = await callGetAllKhachHang();
  return response.data?.map(mapApiToUser);
}

export const getCustomerById = async (id: string) => {
  const response = await callGetKhachHangById(id);
  return mapApiToUser(response.data);
}

