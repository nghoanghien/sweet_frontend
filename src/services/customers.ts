import { callGetAllKhachHang, callGetKhachHangById, callUpdateKhachHang } from "@/config/api"
import { mapApiToUser, mapUserToIKhachHangReqDTO } from "@/mappers/user.mapper";
import { User } from "@/types/interfaces/user";

export const getAllCustomers = async () => {
  const response = await callGetAllKhachHang();
  return response.data?.map(mapApiToUser);
}

export const getCustomerById = async (id: string) => {
  const response = await callGetKhachHangById(id);
  return mapApiToUser(response.data);
}

export const updateCustomer = async (customer: User, id: number, newPassword?: string) => {
  const mappedData = mapUserToIKhachHangReqDTO(customer);
  const requestData = newPassword ? { ...mappedData, matKhau: newPassword } : mappedData;
  const response = await callUpdateKhachHang(requestData, id.toString());
  return response;
}

