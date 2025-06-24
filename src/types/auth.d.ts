import { IVaiTroDTO } from "./role";
import { ITrangThaiDTO } from "./status";
import { IDiaChi } from "./address";
import { TypeUserEnum } from "./enums/TypeUserEnum";

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
    diaChiThuongTru: IDiaChi;
    diaChiLienLac: IDiaChi;
    vaiTro: IVaiTroDTO;
    trangThaiTaiKhoan: ITrangThaiDTO

}

export interface IForgotPasswordDTO {
    email: string;
    userType: TypeUserEnum;
}

export interface IResetPasswordDTO {
    email: string;
    //validate otp có length 0-6
    otp: string;
    userType: TypeUserEnum;
    newPassword: string;
}

export interface IVerificationDTO {
    email: string;
    otp: string;
    userType: TypeUserEnum;
}
