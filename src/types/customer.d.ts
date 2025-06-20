import { IDiaChi } from "./address";
import { IVaiTro } from "./role";
import { ITrangThai, ITrangThaiDTO } from "./status";

export interface IKhachHang {
    khachHangID: string;
    hoTen: string;
    ngaySinh: string;
    tuoi: number;
    soDienThoai: string;
    cccd: string;
    email: string;
    diaChiThuongTru: IDiaChi;
    diaChiLienLac: IDiaChi;
    matKhau: string;
    vaiTro: IVaiTro;
    trangThaiTaiKhoan: ITrangThai;
    trangThaiKhachHang: ITrangThai;
}

export interface IKhachHangReqDTO {

    hoTen: string;
    ngaySinh: string; //format sang LocalDate java truoc khi gui
    cccd: string;
    email: string;
    soDienThoai: string;
    diaChiThuongTru: IDiaChi;
    diaChiLienLac: IDiaChi;
    trangThaiKhachHangId?: string;
    matKhau: string;
    vaiTroId?: string;
    trangThaiTaiKhoanId?: string
}

export interface IKhachHangResDTO {

    khachHangID: string;
    hoTen: string;
    ngaySinh: string;
    tuoi: number;
    email: string;
    cccd: string;
    soDienThoai: string;
    diaChiThuongTru: IDiaChi;
    diaChiLienLac: IDiaChi;
    ngayDangKy: string;
    trangThaiKhachHang: ITrangThaiDTO;
    vaiTro: IVaiTroDTO;
    trangThaiTaiKhoan: ITrangThaiDTO

}