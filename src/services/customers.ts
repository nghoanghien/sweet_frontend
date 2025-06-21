import { callGetAllKhachHang, callGetKhachHangById } from "@/config/api"
import { mapApiToRole, mapApiToUser } from "@/mappers/user.mapper";
import { IKhachHangResDTO } from "@/types/customer";
import { Address, User } from "@/types/interfaces/user";
import { getAccountStatusByCode, getCustomerStatusByCode } from "@/utils/user";

export const getAllCustomers = async () => {
  const response = await callGetAllKhachHang();

  return response.data?.map(mapApiToUser);
}

export const getCustomerById = async (id: string) => {
  const response = await callGetKhachHangById(id);
  return mapApiToUser(response.data);
}

