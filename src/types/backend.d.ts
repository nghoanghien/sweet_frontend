import { ILoaiKyHan, ILoaiTietKiem } from "./loai";

//write all type backend here (entity or responseDTO which backend throw back)
export interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }

export interface IModuleDTO {
  module: string;
  description?: string;
} 

export interface IBaoCaoDoanhSo {
  baoCaoID: number|string;
  thang: number;
  nam: number;
  tongSoVonHuyDong: number;
  tongSoVonHuyDongRong: number;
}

export interface IChiTietBaoCaoDoanhSo {
  chiTietBaoCaoID: number|string;
  baoCaoDoanhSo: IBaoCaoDoanhSo;
  loaiTietKiem: ILoaiTietKiem;
  loaiKyHan: ILoaiKyHan;
  tongThu: number;
  tongChi: number;
  chenhLech: number;
}
