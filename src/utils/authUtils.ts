import { callForgotPassword, callRegister, callResetPassword, callVerifyOtp } from "@/config/api";
import { IForgotPasswordDTO, IRegisterDTO, IResetPasswordDTO, IVerificationDTO } from "@/types/auth";
import { IBackendRes } from "@/types/backend";
import { IKhachHangReqDTO, IKhachHangResDTO, IRegisterReqFrontend } from "@/types/customer";
import { TypeUserEnum } from "@/types/enums/TypeUserEnum";
import axios from "axios";

export const registerUtil = async (
  data: IRegisterReqFrontend
): Promise<{
  success: boolean;
  message: string;
  resBody: IRegisterDTO<IKhachHangResDTO>|null
  
}> => {
  try {
    const registerData: IKhachHangReqDTO = {
      hoTen: data.fullName,
      ngaySinh: data.dateOfBirth,
      cccd: data.idCard,
      email: data.email,
      soDienThoai: data.phone,
      diaChiThuongTru: {
        tinhTP: data.permanentAddress.province,
        quanHuyen: data.permanentAddress.district,
        phuongXa: data.permanentAddress.ward,
        tenDuong: data.permanentAddress.streetName,
        soNha: data.permanentAddress.houseNumber,
      },
      diaChiLienLac: {
        tinhTP: data.contactAddress.province,
        quanHuyen: data.contactAddress.district,
        phuongXa: data.contactAddress.ward,
        tenDuong: data.contactAddress.streetName,
        soNha: data.contactAddress.houseNumber,
      },
      matKhau: data.password,
    };

    const res = await callRegister(registerData);
    debugger
    if (res?.data) {
      return { success: true, message: "Đăng kí thành công. Hãy xác nhận OTP để kích hoạt tài khoản" ,
        resBody: res.data
      };
    } else {
      return {
        success: false,
        message: res?.data?.error?.toString() || "Phản hồi không hợp lệ từ server.",
        resBody: null
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || "Lỗi khi đăng kí.",
      resBody: null
    };
  }
};

export const verifyUtil = async (email: string, otp: string, userType: TypeUserEnum) => {
    const verificationDTO: IVerificationDTO = {
        otp: otp,
        email: email,
        userType: userType
    }
    return await callVerifyOtp(verificationDTO);
}

export const forgotPasswordUtil = async (email: string, userType: TypeUserEnum) =>{
    const forgotPasswordDTO : IForgotPasswordDTO = {
        email: email,
        userType: userType
    }
    return await callForgotPassword(forgotPasswordDTO);
}

export const resetPasswordUtil = async (email: string, otp: string, userType: TypeUserEnum, newPassword: string ) => {
    const resetPassWordDTO : IResetPasswordDTO ={
        otp: otp,
        newPassword: newPassword,
        email: email,
        userType: userType,
    }
    return await callResetPassword(resetPassWordDTO);
}

