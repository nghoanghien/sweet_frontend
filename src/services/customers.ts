import { callGetAllKhachHang } from "@/config/api"
import { mapApiToRole, mapApiToUser } from "@/mappers/user.mapper";
import { IKhachHangResDTO } from "@/types/customer";
import { Address, User } from "@/types/interfaces/user";
import { getAccountStatusByCode, getCustomerStatusByCode } from "@/utils/user";

export const getAllCustomers = async () => {
  const response = await callGetAllKhachHang();
  console.log("Du lieu truoc khi mapping: ", response.data);

  return response.data?.map(mapApiToUser);
}

