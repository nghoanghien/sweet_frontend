
export interface ILoaiTietKiem {
  loaiTietKiemID?: number;
  tenLoaiTietKiem: string;
  maLoaiTietKiem: number;
  moTa: string;
  duocPhepRutTruocHan: boolean;
  duocPhepRutMotPhan: boolean;
  coHoatDong: boolean;
}

export interface ITanSuatNhanLai {
  tanSoNhanLaiID?: number;
  tenTanSoNhanLai: string;
  maTanSoNhanLai: number;
  moTa: string;
  coHoatDong: boolean;
}

export interface ILoaiKyHan {
  loaiKyHanID?: number;
  tenLoaiKyHan: string;
  soThang: number;
}
