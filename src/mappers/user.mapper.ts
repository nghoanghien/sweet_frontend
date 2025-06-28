import { IDiaChi } from "@/types/address";
import { INhanVienReqDTO } from "@/types/employee";
import { Permission } from "@/types/interfaces/enums";
import { Address, Role, User } from "@/types/interfaces/user";
import { getAccountStatusByCode, getCustomerStatusByCode } from "@/utils/user";
import { getPermissions } from "@/utils/permissions";
import { mapApiToRole } from "./permissions.mapper";

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

//Còn thiếu nhân viên chưa mapping được
export const mapApiToUser = (item: any): User => {
  console.log("Đang mapping nè: ", item);
  return {
    fullName: item.hoTen,
    dateOfBirth: new Date(item.ngaySinh),
    age: item.tuoi,
    idCardNumber: item.cccd,
    email: item.email,
    phoneNumber: item.soDienThoai,
    permanentAddress: mapApiToAddress(item.diaChiThuongTru),
    contactAddress: mapApiToAddress(item.diaChiLienLac),
    role: mapApiToRole(item.vaiTro),
    accountStatus: getAccountStatusByCode(item.trangThaiTaiKhoan.maTrangThai),

    //only for customer
    customerID: item?.khachHangID || null,
    registrationDate: new Date(item?.ngayDangKy) || null,
    customerStatus: getCustomerStatusByCode(item?.trangThaiKhachHang?.trangThaiID) || null,

    //only for employee
    employeeID: item?.nhanVienID || null,
    recruitmentDate: new Date(item?.ngayTuyenDung) || null,
    
  };
}

export const mapAddressToIDiaChi = (item: Address): IDiaChi => {
  return {
    soNha: item.houseNumber,
    tenDuong: item.streetName,
    phuongXa: item.ward,
    quanHuyen: item.district,
    tinhTP: item.province,
  };
}

export const mapUserToINhanVienReqDTO = (item: User): INhanVienReqDTO => {
  return {
    hoTen: item.fullName,
    ngaySinh: item.dateOfBirth.toISOString(),
    cccd: item.idCardNumber,
    email: item.email,
    soDienThoai: item.phoneNumber,
    diaChiThuongTru: mapAddressToIDiaChi(item.permanentAddress),
    diaChiLienLac: mapAddressToIDiaChi(item.contactAddress),
    
  };
}