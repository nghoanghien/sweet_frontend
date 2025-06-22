import { IDiaChi } from "./address";
import { IAddressFrontend } from "./customer";
import { IVaiTro } from "./role";
import { ITrangThai } from "./status";

export interface INhanVien {
    nhanVienID: string;
    hoTen: string;
    ngaySinh: string;
    tuoi: number;
    cccd: string;
    soDienThoai: string;
    email: string;
    diaChiThuongTru: IDiaChi;
    diaChiLienLac: IDiaChi;
    ngayTuyenDung: string;
    matKhau: string;
    vaiTro: IVaiTro;
    trangThaiTaiKhoan: ITrangThai

}

export interface INhanVienReqDTO {
    hoTen: string;
    ngaySinh: string;
    cccd: string;
    email: string;
    soDienThoai: string;
    diaChiThuongTru: IDiaChi;
    diaChiLienLac: IDiaChi;
    matKhau: string;
    vaiTroId?: string;
    trangThaiTaiKhoanId?: string;
}

export interface INhanVienResDTO {
    nhanVienID: string;
    hoTen: string;
    ngaySinh: string;
    tuoi: number;
    email: string;
    cccd: string;
    soDienThoai: string;
    diaChiThuongTru: IDiaChi;
    diaChiLienLac: IDiaChi;
    ngayTuyenDung: string;
    vaiTro: IVaiTroDTO;
    trangThaiTaiKhoan: ITrangThaiDTO
}

export interface IEmployeeFrontend {
    id?: string|number;
    fullName: string;
    dateOfBirth: Date;
    age?: number;
    idCardNumber: string;
    email: string;
    phoneNumber: string;
    permanentAddress: IAddressFrontend;
    contactAddress: IAddressFrontend;
    recruitmentDate?:Date;
    accountStatus?: string;
    password: string
}