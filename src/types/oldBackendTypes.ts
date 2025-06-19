// // TypeScript export interfaces for Java entities

// // Base entities
// export interface ThamSo {
//   thamSoID?: number;
//   tenThamSo: string;
//   moTa: string;
//   maThamSo: string;
//   giaTri: string;
// }

// export interface TrangThai {
//   trangThaiID?: number;
//   maTrangThai: string;
//   tenTrangThai: string;
//   deleted: boolean;
//   loaiTrangThai: LoaiTrangThai;
// }

// // Embedded IDs
// export interface TanSuatNhanLaiHinhThucDaoHanId {
//   tanSuatNhanLaiID: number;
//   hinhThucDaoHanID: number;
// }

// export interface VaiTroQuyenHanID {
//   vaiTroID: number;
//   quyenHanID: number;
// }

// // TaiKhoan
// export interface DiaChi {
//   diaChiID?: number;
//   soNha: string;
//   tenDuong: string;
//   phuongXa: string;
//   quanHuyen: string;
//   tinhTP: string;
// }

// export interface QuyenHan {
//   id?: number;
//   name: string;
//   apiPath: string;
//   method: string;
//   module: string;
//   vaiTros?: VaiTro[];
// }

// export interface VaiTro {
//   id?: number;
//   name: string;
//   description: string;
//   active: boolean;
//   quyenHans?: QuyenHan[];
//   nhanViens?: NhanVien[];
//   khachHangs?: KhachHang[];
// }

// export interface NhanVien {
//   nhanVienID?: number;
//   hoTen: string;
//   ngaySinh: string; // ISO date format
//   tuoi: number;
//   cccd: string;
//   soDienThoai: string;
//   email: string;
//   diaChiThuongTru: DiaChi;
//   diaChiLienLac: DiaChi;
//   ngayTuyenDung: string;
//   matKhau: string;
//   vaiTro: VaiTro;
//   trangThaiTaiKhoan: TrangThai;
// }

// export interface KhachHang {
//   khachHangID?: number;
//   hoTen: string;
//   ngaySinh: string; // ISO date format
//   tuoi: number;
//   soDienThoai: string;
//   cccd: string;
//   email: string;
//   diaChiThuongTru?: DiaChi;
//   diaChiLienLac?: DiaChi;
//   ngayDangKy: string;
//   matKhau: string;
//   vaiTro?: VaiTro;
//   trangThaiTaiKhoan?: TrangThai;
//   trangThaiKhachHang?: TrangThai;
// }


// // Loai

// export interface LoaiTrangThai {
//   loaiTrangThaiID?: number;
//   maLoaiTrangThai: string;
//   tenLoaiTrangThai: string;
//   moTa: string;
//   deleted: boolean;
//   TrangThais?: TrangThai[];
// }

// export interface TanSuatNhanLai {
//   tanSoNhanLaiID?: number;
//   tenTanSoNhanLai: string;
//   maTanSoNhanLai: number;
//   moTa: string;
//   coHoatDong: boolean;
// }

// export interface HinhThucDaoHan {
//   hinhThucDaoHangID?: number;
//   tenHinhThucDaoHang: string;
//   maHinhThucDaoHang: number;
//   moTa: string;
// }

// export interface TanSuatNhanLaiHinhThucDaoHan {
//   id: TanSuatNhanLaiHinhThucDaoHanId;
//   tanSuatNhanLai: TanSuatNhanLai;
//   hinhThucDaoHan: HinhThucDaoHan;
// }


// export interface LoaiKyHan {
//   loaiKyHanID?: number;
//   tenLoaiKyHan: string;
//   soThang: number;
// }

// export interface LoaiTietKiem {
//   loaiTietKiemID?: number;
//   tenLoaiTietKiem: string;
//   maLoaiTietKiem: number;
//   moTa: string;
//   duocPhepRutTruocHan: boolean;
//   duocPhepRutMotPhan: boolean;
//   coHoatDong: boolean;
// }

// export interface QuyDinhLaiSuat {
//   quyDinhLaiSuatID?: number;
//   ngayBatDau: string;
//   ngayKetThuc: string;
//   moTa: string;
//   nguoiLapQuyDinh: NhanVien;
//   laiSuatKhongKyHan: number;
//   soTienGuiToiThieu: number;
// }

// export interface ChiTietQuyDinhLaiSuat {
//   chiTietQuyDinhID?: number;
//   quyDinhLaiSuat: QuyDinhLaiSuat;
//   loaiTietKiem: LoaiTietKiem;
//   tanSuatNhanLai?: TanSuatNhanLai;
//   loaiKyHan: LoaiKyHan;
//   laiSuat: number;
// }


// export interface PhieuGuiTien {
//   phieuGuiTienID?: number;
//   khachHang: KhachHang;
//   giaoDichVien: NhanVien;
//   chiTietQuyDinhLaiSuat: ChiTietQuyDinhLaiSuat;
//   hinhThucDaoHan: HinhThucDaoHan;
//   ngayGuiTien: string;
//   soTienGuiBanDau: number;
//   tenGoiNho: string;
//   trangThai: TrangThai;
//   soDuHienTai: number;
//   tongTienLaiDuKien: number;
//   tienLaiNhanDinhKy: number;
//   tienLaiDaNhanNhungChuaQuyetToan: number;
//   tongLaiQuyetToan: number;
//   ngayDaoHan: string;
// }

// export interface PhieuDaoHan {
//   phieuDaoHanID?: number;
//   phieuGuiTienKyTruoc: PhieuGuiTien;
//   phieuGuiTienTiepTheo: PhieuGuiTien;
//   ngayDaoHan: string;
// }

// export interface PhieuRutTien {
//   phieuRutTienID?: number;
//   phieuGuiTien: PhieuGuiTien;
//   giaoDich: GiaoDich;
//   soTienRut: number;
//   ngayRut: string;
//   laiSuatKhongKyHan: number;
// }

// export interface PhieuTraLai {
//   phieuTraLaiID?: number;
//   giaoDich: GiaoDich;
//   phieuGuiTien: PhieuGuiTien;
//   ngayTraLai: string;
// }


// export interface LichSuGiaoDich_PhieuGuiTien {
//   lichSuPhieuGuiTienID?: number;
//   phieuGuiTien: PhieuGuiTien;
//   giaoDich: GiaoDich;
//   soTienGocGiaoDich: number;
//   soDuHienTai_SauGD: number;
//   tienLai_TrongGD: number;
//   laiQuyetToan_TrongGD: number;
//   tienLaiDaNhanNhungChuaQuyetToan_SauGD: number;
//   tongLaiQuyetToan_SauGD: number;
// }