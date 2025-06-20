import { callGetAllKhachHang } from "@/config/api"
import { mapApiToRole, mapApiToUser } from "@/mappers/user.mapper";
import { IKhachHangResDTO } from "@/types/customer";
import { Address, User } from "@/types/interfaces/user";
import { getAccountStatusByCode, getCustomerStatusByCode } from "@/utils/user";

export const getAllCustomers = async () => {
  const response = await callGetAllKhachHang();
  console.log("Du lieu truoc khi mapping: ", response.data);

  return response.data?.map((item: IKhachHangResDTO): User => {
    const mockAddress: Address = {
      addressID: 1,
      houseNumber: '123',
      streetName: "KTX khu B",
      ward: 'Linh Xuân',
      district: 'Thành phố Thủ Đức',
      province: 'Thành phố Hồ Chí Minh',
    }
    return {
      fullName: item.hoTen,
      dateOfBirth: new Date(item.ngaySinh),
      age: item.tuoi,
      idCardNumber: item.cccd,
      email: item.email,
      phoneNumber: item.soDienThoai,
      permanentAddress: mockAddress,
      contactAddress: mockAddress,
      role: mapApiToRole(item.vaiTro),
      accountStatus: getAccountStatusByCode(item.trangThaiTaiKhoan.maTrangThai),

      // Only for customer
      customerID: item.khachHangID || undefined,
      registrationDate: new Date(item.ngayDangKy) || null,
      customerStatus: getCustomerStatusByCode(item.trangThaiKhachHang.maTrangThai),
    }
  }) || [];
}

