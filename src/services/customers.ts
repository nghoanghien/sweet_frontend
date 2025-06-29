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

export const updateCustomer = async (customer: User, id: number) => {
  const response = await callUpdateKhachHang(mapUserToIKhachHangReqDTO(customer), id.toString());
  return response;
}

