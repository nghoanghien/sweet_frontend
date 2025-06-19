import { Permission } from "@/types/enums";
import { Address, Role, User } from "@/types/user";
import { getAccountStatusByCode, getCustomerStatusByCode } from "@/utils/user";

export const mapApiToAddress = (item: any): Address => {
  return {
    addressID: item.diaChiID,
    houseNumber: item.soNha,
    streetName: item.tenDuong,
    ward: item.phuongXa,
    district: item.quanHuyen,
    province: item.tinhTP,
  };
}

//còn thiếu cái quyền hạn chưa mapping được
export const mapApiToRole = (item: any): Role => {
  return {
    roleID: item.id,
    roleName: item.name,
    description: item.description,
    active: item.active,
    permissions: item.quyenHans
  };
}

//Còn thiếu nhân viên chưa mapping được
export const mapApiToUser = (item: any): User => {
  return {
    fullName: item.hoTen,
    dateOfBirth: new Date(item.ngaySinh),
    age: item.tuoi,
    idCardNumber: item.cccd,
    email: item.email,
    phoneNumber: item.soDienThoai,
    permanentAddressID: mapApiToAddress(item.diaChiThuongTru),
    contactAddressID: mapApiToAddress(item.diaChiLienLac),
    role: mapApiToRole(item.vaiTro),
    accountStatus: getAccountStatusByCode(item.trangThaiTaiKhoan.trangThaiID),

    //only for customer
    customerID: item.khachHangID || null,
    registrationDate: new Date(item.ngayDangKy) || null,
    //customerStatus: getCustomerStatusByCode(item.trangThaiKhachHang.trangThaiID) || null,

    //only for employee
    
  };
}