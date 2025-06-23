import { callLogin, callLogout, callGetAccountInformation } from '@/config/api';
import { IReqLoginDTO, IResLoginDTO, IUserGetAccountDTO } from '@/types/auth';
import { IBackendRes } from '@/types/backend.d';

export const login = async (loginCredentials: IReqLoginDTO): Promise<IBackendRes<IResLoginDTO>> => {
  try {
    const response = await callLogin(loginCredentials);
    console.log(loginCredentials);
    console.log(response);
    if (!response) {
      throw new Error('Không nhận được phản hồi từ server');
    }
    if(!response.data) {
      if (response.error === 'Bad credentials') {
        throw new Error('Tên đăng nhập hoặc mật khẩu chưa chính xác');
      }
      throw new Error(response?.error);
    }
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const logout = async (): Promise<IBackendRes<void>> => {
  try {
    const response = await callLogout();
    if (!response || !response.data) {
      throw new Error('Không thể đăng xuất');
    }
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getAccountInformation = async (): Promise<IBackendRes<IUserGetAccountDTO>> => {
  try {
    const response = await callGetAccountInformation();
    if (!response || !response.data) {
      throw new Error('Không thể lấy thông tin tài khoản');
    }
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

