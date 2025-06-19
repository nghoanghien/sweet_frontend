import { IKhachHangResDTO } from "./customer";
import { INhanVienResDTO } from "./employee";
import { ITrangThai, ITrangThaiDTO } from "./status";

export interface ITKTTResDTO {
  soTaiKhoan?: number;
  khachHang: IKhachHangResDTO;
  trangThai: ITrangThai;
  ngayTao: string;
  soDu: number;
}

export interface IGiaoDichReqDTO {
  giaoDichID: number;
  taiKhoanNguon: number;
  loaiTaiKhoanNguonID: number;
  taiKhoanDich: number;
  loaiTaiKhoanDichID: number;
  loaiGiaoDichID: number;
  kenhGiaoDichID: number;
  nhanVienGiaoDichID: number;
  soTienGiaoDich: number;
  noiDung: string;
  thoiGianGiaoDich: string;
}

export interface ITKTTReqDTO {
  soTaiKhoan: number;
  khachHangID: number;
  trangThaiID: number;
  ngayTao: string; // ISO string representation of Instant
  soDu: number;
}

export interface ILoaiTaiKhoan {
  loaiTaiKhoanID?: number;
  maLoaiTaiKhoan: number;
  tenLoaiTaiKhoan: string;
  moTa: string;
}

export interface ILSGD_TKTTResponseDTO {
  lichSuGiaoDichID?: number;
  taiKhoan?: ITKTTResDTO;
  giaoDich: GiaoDich;
  soDuSauGD: number;
}

export interface ILoaiGiaoDich {
  loaiGiaoDichID?: number;
  maLoaiGiaoDich: number;
  tenLoaiGiaoDich: string;
  moTa: string;
}

// GiaoDich
export interface IKenhGiaoDich {
  kenhGiaoDichID?: number;
  maKenhGiaoDich: number;
  tenKenhGiaoDich: string;
  moTa: string;
}

export interface IGiaoDichResponseDTO {
  giaoDichID?: number;
  taiKhoanNguon: number;
  loaiTaiKhoanNguon?: ILoaiTaiKhoan;
  taiKhoanDich: number;
  loaiTaiKhoanDich?: ILoaiTaiKhoan;
  loaiGiaoDich: ILoaiGiaoDich;
  kenhGiaoDich: IKenhGiaoDich;
  nhanVienGiaoDich?: INhanVienResDTO;
  soTienGiaoDich: number;
  noiDung: string;
  thoiGianGiaoDich: string;
}