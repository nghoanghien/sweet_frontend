export interface INhanVien {

}

export interface INhanVienReqDTO {

}

export interface INhanVienResDTO {
    nhanVienID: string;
    hoTen: string;
    ngaySinh: string;
    tuoi: number;
    email: string;
    cccd: string;
    soDienThoai: string;
    diaChiThuongTruId: string;
    diaChiLienLacId: string;
    ngayTuyenDung: string;
    vaiTro: IVaiTroDTO;
    trangThaiTaiKhoan: ITrangThaiDTO
}