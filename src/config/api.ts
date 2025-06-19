import { IRegisterDTO, IReqLoginDTO, IResLoginDTO, IUserGetAccountDTO } from '@/types/auth';
import axios from './axios-customize';
import { IBackendRes } from '@/types/backend.d';
import { IKhachHangReqDTO, IKhachHangResDTO } from '@/types/customer';
import { IGiaoDichReqDTO, IGiaoDichResponseDTO as IGiaoDichResDTO, ILSGD_TKTTResponseDTO as ILSGD_TKTTResDTO, ITKTTReqDTO, ITKTTResDTO } from '@/types/giaoDich';
import { IChiTietQuyDinhLaiSuatResDTO, IQuyDinhLaiSuatResDTO } from '@/types/quyDinhLaiSuat';
import { INhanVienReqDTO, INhanVienResDTO } from '@/types/employee';
import { IDiaChi } from '@/types/address';
import { ILoaiTrangThai } from '@/types/status';

/**
 * Module nhan vien 
 */
//create new khach hang
export const callCreateNewNhanVien = (nhanVien: INhanVienReqDTO) =>{

    return axios.post<IBackendRes<INhanVienResDTO>>('/api/v1/nhan-vien', nhanVien);
}

//get khach hang by id
export const callGetNhanVienById = (id: string) =>{
    return axios.get<IBackendRes<INhanVienResDTO>>(`/api/v1/nhan-vien/${id}`);
}

//get all khach hang can filter
export const callGetAllNhanVien = (filter?: string) =>{
    const params = new URLSearchParams();
    if(filter) params.append('filter', filter);
    return axios.get<IBackendRes<INhanVienResDTO[]>>(`/api/v1/nhan-vien?${params.toString()}`);
}

//update khach hang
export const callUpdateNhanVien = (NhanVien: INhanVienReqDTO, id: string) => {
    return axios.put<IBackendRes<INhanVienResDTO>>(`/ap1/v1/nhan-vien/${id}`, NhanVien);
}

//deactivate tai khoan khach hang
export const callDeactivateNhanVien = (id: string) => {
    return axios.put<IBackendRes<void>>(`/api/v1/nhan-vien/${id}/vo-hieu-hoa`);
} 

//activate khach hang
export const callActivateNhanVien = (id: string) => {
    return axios.put<IBackendRes<void>>(`/api/v1/nhan-vien/${id}/kich-hoat`)
}


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
 * Module dia chi
 */
export const createDiaChi = (diaChi: IDiaChi) => {
    return axios.post<IBackendRes<IDiaChi>>('/api/v1/dia-chi', diaChi);
}

export const getDiaChiById = (id: string) => {
    return axios.get<IBackendRes<IDiaChi>>(`/api/v1/dia-chi/${id}`);
}

export const getAllDiaChi = (filter?: string) =>{
    const params = new URLSearchParams();
    if(filter) params.append('filter', filter);
    return axios.get<IBackendRes<IDiaChi[]>>(`/api/v1/dia-chi?${params.toString()}`);
}

export const updateDiaChi = (diaChi: IDiaChi, id: string) => {
    return axios.put<IBackendRes<IDiaChi>>(`/api/v1/dia-chi/${id}`, diaChi);
}
/**
 * Module loai trang thai
 */

export const createLoaiTrangThai = (loaiTrangThai: ILoaiTrangThai) => {
    return axios.post<IBackendRes<ILoaiTrangThai>>('/api/v1/loai-trang-thai', loaiTrangThai);
}

export const getAllLoaiTrangThai = (filter?: string) =>{
    const params = new URLSearchParams();
    if(filter) params.append("filter", filter);
    return axios.get<IBackendRes<ILoaiTrangThai[]>>(`/api/v1/loai-trang-thai?${params.toString()}`);
}

export const getLoaiTrangThaiById = (id: string) => {
    return axios.get<IBackendRes<ILoaiTrangThai>>(`/api/v1/loai-trang-thai/${id}`);
}

export const updateLoaiTrangThai = (loaiTrangThai: ILoaiTrangThai, id: string) =>{
    return axios.put<IBackendRes<ILoaiTrangThai>>(`/api/v1/loai-trang-thai/${id}`, loaiTrangThai);
}

export const deleteLoaiTrangThai = (id: string) => {
    return axios.delete<IBackendRes<void>>(`/api/v1/loai-trang-thai/${id}`);
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
}


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