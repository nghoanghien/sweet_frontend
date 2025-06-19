import { IRegisterDTO, IReqLoginDTO, IResLoginDTO, IUserGetAccountDTO } from '@/types/auth';
import axios from './axios-customize';
import { IBackendRes } from '@/types/backend';
import { IKhachHangReqDTO, IKhachHangResDTO } from '@/types/customer';
import { IGiaoDichReqDTO, IGiaoDichResponseDTO as IGiaoDichResDTO, ILSGD_TKTTResponseDTO as ILSGD_TKTTResDTO, ITKTTReqDTO, ITKTTResDTO } from '@/types/giaoDich';
import { IChiTietQuyDinhLaiSuatResDTO, IQuyDinhLaiSuatResDTO } from '@/types/quyDinhLaiSuat';


/**
 * Module auth
 */
export const callLogin = (reqLoginDTO: IReqLoginDTO) => {
    return axios.post<IBackendRes<IResLoginDTO>>('/api/v1/auth/login', reqLoginDTO);
}

export const callLogout = () =>{
    return axios.post<IBackendRes<void>>('/api/v1/auth/logout');
}

export const callRegister = (data: IRegisterDTO<IKhachHangReqDTO>) =>{
    return axios.post<IBackendRes<IRegisterDTO<IKhachHangResDTO>>>('/api/v1/auth/register', data);
}

export const callGetAccountInformation = () =>{
    return axios.get<IBackendRes<IUserGetAccountDTO>>('/api/v1/auth/account');
}

/**
 * Module khach hang
 */
//create new khach hang
export const callCreateNewKhachHang = (khachHang: IKhachHangReqDTO) =>{

    return axios.post<IBackendRes<IKhachHangResDTO>>('/api/v1/khach-hang', khachHang);
}

//get khach hang by id
export const callGetKhachHangById = (id: string) =>{
    return axios.get<IBackendRes<IKhachHangResDTO>>(`/api/v1/khach-hang/${id}`);
}

//get all khach hang can filter
export const callGetAllKhachHang = (filter?: string) =>{
    const params = new URLSearchParams();
    if(filter) params.append('filter', filter);
    return axios.get<IBackendRes<IKhachHangResDTO[]>>(`/api/v1/khach-hang?${params.toString()}`);
}

//update khach hang
export const callUpdateKhachHang = (khachHang: IKhachHangReqDTO, id: string) => {
    return axios.put<IBackendRes<IKhachHangResDTO>>(`/ap1/v1/khach-hang/${id}`, khachHang);
}

//deactivate tai khoan khach hang
export const callDeactivateKhachHang = (id: string) => {
    return axios.put<IBackendRes<void>>(`/api/v1/khach-hang/${id}/vo-hieu-hoa`);
} 

//activate khach hang
export const callActivateKhachHang = (id: string) => {
    return axios.put<IBackendRes<void>>(`/api/v1/khach-hang/${id}/kich-hoat`)
export const callGetAllGiaoDich = () => {
    return axios.get<IBackendRes<IGiaoDichResDTO[]>>('/api/v1/giao-dich');
}

export const callGetGiaoDichByID = (id: number) => {
    return axios.get<IBackendRes<IGiaoDichResDTO>>('/api/v1/giao-dich/' + id);
}

export const callCreateGiaoDich = (data: IGiaoDichReqDTO) => {
    return axios.post<IBackendRes<IGiaoDichResDTO>>('/api/v1/giao-dich', data);
}

export const callGetAllTaiKhoanThanhToan = () => {
    return axios.get<IBackendRes<ITKTTResDTO[]>>('/api/v1/giao-dich/tktt');
}

export const callGetTaiKhoanThanhToanByID = (id: number) => {
    return axios.get<IBackendRes<ITKTTResDTO[]>>('/api/v1/giao-dich/tktt/' + id);
}

export const callCreateTaiKhoanThanhToan = (data: ITKTTReqDTO) => {
    return axios.post<IBackendRes<ITKTTResDTO>>('/api/v1/giao-dich/tktt', data);
}

export const callGetAllLSGD_TKTT = () => {
    return axios.get<IBackendRes<ILSGD_TKTTResDTO[]>>('/api/v1/giao-dich/tktt/lich-su');
}

export const callGetLSGD_TKTTByID = (id: number) => {
    return axios.get<IBackendRes<ILSGD_TKTTResDTO[]>>('/api/v1/giao-dich/tktt/lich-su/' + id);
}

export const callGetAllQuyDinhLaiSuat = () => {
    return axios.get<IBackendRes<IQuyDinhLaiSuatResDTO[]>>('/api/v1/quy-dinh-lai-suat');
}

export const callGetAllChiTietQuyDinhLaiSuat = () => {
    return axios.get<IBackendRes<IChiTietQuyDinhLaiSuatResDTO[]>>('/api/v1/quy-dinh-lai-suat/chi-tiet');
}

export const callGetQuyDinhLaiSuatByID = (id: number) => {
    return axios.get<IBackendRes<IQuyDinhLaiSuatResDTO>>('/api/v1/quy-dinh-lai-suat/' + id);
}

export const callGetChiTietQuyDinhLaiSuatByID = (id: number) => {
    return axios.get<IBackendRes<IChiTietQuyDinhLaiSuatResDTO>>('/api/v1/quy-dinh-lai-suat/chi-tiet/' + id);
}