import axios from '@/config/axios-customize';
import { IBackendRes } from '../../types/backend';
import { User, LoginCredentials } from '@/types/user';

// Response types
export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken?: string;
}

export interface RegisterData {
  userName: string;
  password: string;
  email?: string;
  fullName?: string;
  role: 'customer' | 'employee';
  phone?: string;
  address?: string;
}

/**
 * Đăng nhập người dùng
 */
export const callLogin = (credentials: LoginCredentials) => {
  return axios.post<IBackendRes<LoginResponse>>('/api/v1/auth/login', credentials);
};

/**
 * Đăng xuất người dùng
 */
export const callLogout = () => {
  return axios.post<IBackendRes<void>>('/api/v1/auth/logout');
};

/**
 * Lấy thông tin profile người dùng hiện tại
 */
export const callGetProfile = () => {
  return axios.get<IBackendRes<User>>('/api/v1/auth/profile');
};

/**
 * Đăng ký tài khoản mới
 */
export const callRegister = (data: RegisterData) => {
  return axios.post<IBackendRes<User>>('/api/v1/auth/register', data);
};

/**
 * Refresh access token
 */
export const callRefreshToken = (refreshToken: string) => {
  return axios.post<IBackendRes<{ accessToken: string; refreshToken: string }>>(
    '/api/v1/auth/refresh',
    { refreshToken }
  );
};

/**
 * Thay đổi mật khẩu
 */
export const callChangePassword = (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  return axios.put<IBackendRes<void>>('/api/v1/auth/change-password', data);
};

/**
 * Cập nhật thông tin profile
 */
export const callUpdateProfile = (data: Partial<User>) => {
  return axios.put<IBackendRes<User>>('/api/v1/auth/profile', data);
};
