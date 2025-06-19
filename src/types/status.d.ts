export interface ITrangThaiDTO{
    trangThaiID: string;
    loaiTrangThaiID: string;
    maTrangThai: string;
    tenTrangThai: string;
    deleted: boolean;
}

export interface ITrangThai {
    trangThaiID: string;
    maTrangThai: string;
    tenTrangThai: string;
    deleted?: boolean;
    loaiTrangThai: ILoaiTrangThai
}

export interface ILoaiTrangThai {
    loaiTrangThaiID: string;
    maLoaiTrangThai: string;
    tenLoaiTrangThai: string;
    moTa: string;
    deleted?: boolean;
}
