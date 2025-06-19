import { IVaiTroDTO } from "./role";
import { ITrangThaiDTO } from "./status";

export interface IRegisterDTO <T> {
    data: T;
    type: TypeUserEnum;
}

export interface IReqLoginDTO {
    username: string;
    password: string;
    type: TypeUserEnum;
}

export interface IResLoginDTO {
    access_token: string;
    user: IUserLogin;
    type: TypeUserEnum;
}

export interface IUserLogin{
    id: string;
    hoTen: string;
    email: string;
    vaiTro: IVaiTroDTO;
}

export interface IUserGetAccountDTO {
    id: string;
    hoTen: string;
    ngaySinh: string;
    tuoi: number;
    type: TypeUserEnum;
    email: string;
    cccd: string;
    soDienThoai: string;
    diaChiThuongTruId: string;
    diaChiLienLacId: string;
    vaiTro: IVaiTroDTO;
    trangThaiTaiKhoan: ITrangThaiDTO

}
