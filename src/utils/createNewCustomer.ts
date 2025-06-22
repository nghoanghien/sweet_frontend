import { callCreateNewKhachHang } from "@/config/api";
import { ICustomerFrontend, IKhachHangReqDTO } from "@/types/customer";
export const createNewCustomer = async (data: ICustomerFrontend): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const newKhachHang: IKhachHangReqDTO = {
      hoTen: data.fullName,
      ngaySinh: data.dateOfBirth.toISOString().slice(0, 10),
      cccd: data.idCardNumber,
      email: data.email,
      soDienThoai: data.phoneNumber,
      diaChiThuongTru: {
        tinhTP: data.permanentAddress.province,
        quanHuyen: data.permanentAddress.district,
        phuongXa: data.permanentAddress.ward,
        tenDuong: data.permanentAddress.streetName,
        soNha: data.permanentAddress.houseNumber,
      },
      diaChiLienLac: {
        tinhTP: data.contactAddress.province,
        quanHuyen: data.contactAddress.district,
        phuongXa: data.contactAddress.ward,
        tenDuong: data.contactAddress.streetName,
        soNha: data.contactAddress.houseNumber,
      },
      matKhau: data.password,
    };

    const res = await callCreateNewKhachHang(newKhachHang);

    if (res?.data) {
      return { success: true, message: "Thêm khách hàng thành công." };
    } else {
      return {
        success: false,
        message: res?.data?.error?.toString() || "Phản hồi không hợp lệ từ server."
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || "Lỗi khi thêm khách hàng."
    };
  }
};

