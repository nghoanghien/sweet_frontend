import { INhanVienResDTO } from "./employee";
import { ILoaiKyHan, ILoaiTietKiem, ITanSuatNhanLai } from "./loai";

export interface IChiTietQuyDinhLaiSuatResDTO {
  chiTietQuyDinhID: number;
  quyDinhLaiSuatID: number;
  loaiTietKiem: ILoaiTietKiem;
  tanSuatNhanLai: ITanSuatNhanLai;
  loaiKyHan: ILoaiKyHan;
  laiSuat: number;
}

export interface IQuyDinhLaiSuatResDTO {
  quyDinhLaiSuatID: number;
  ngayBatDau: string; 
  ngayKetThuc: string; 
  moTa: string;
  nguoiLapQuyDinh: INhanVienResDTO;
  laiSuatKhongKyHan: number;
  soTienGuiToiThieu: number;
  chiTietQuyDinhLaiSuats: IChiTietQuyDinhLaiSuatResDTO[];
  active: boolean;
}

export interface IChiTietQuyDinhLaiSuatReqDTO {
  chiTietQuyDinhID: number | null;
  loaiTietKiemID: number;
  tanSuatNhanLaiID: number;
  loaiKyHan: ILoaiKyHan;
  laiSuat: number;
}

export interface IQuyDinhLaiSuatReqDTO {
  quyDinhLaiSuatID: number | null;
  ngayBatDau: string; 
  ngayKetThuc: string; 
  moTa: string;
  nguoiLapQuyDinhID: number;
  laiSuatKhongKyHan: number;
  soTienGuiToiThieu: number;
  chiTietQuyDinhLaiSuats: IChiTietQuyDinhLaiSuatReqDTO[];
  active: boolean;
}