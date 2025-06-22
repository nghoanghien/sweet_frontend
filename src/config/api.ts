import { IRegisterDTO, IReqLoginDTO, IResLoginDTO, IUserGetAccountDTO } from '@/types/auth';
import axios from './axios-customize';
import { IBackendRes, IModuleDTO } from '@/types/backend.d';
import { IKhachHangReqDTO, IKhachHangResDTO } from '@/types/customer';
import { IGiaoDichReqDTO, IGiaoDichResponseDTO as IGiaoDichResDTO, ILSGD_TKTTResponseDTO as ILSGD_TKTTResDTO, ITKTTReqDTO, ITKTTResDTO } from '@/types/giaoDich';
import { IChiTietQuyDinhLaiSuatResDTO, IQuyDinhLaiSuatResDTO } from '@/types/quyDinhLaiSuat';
import { INhanVienReqDTO, INhanVienResDTO } from '@/types/employee';
import { IDiaChi } from '@/types/address';
import { ILoaiTrangThai, ITrangThaiDTO } from '@/types/status';
import { IThamSo } from '@/types/thamSo';
import { IQuyenHan } from '@/types/permission';
import { IVaiTro, IVaiTroDTO } from '@/types/role';

/**
 * Module nhan vien 
 */
//create new nhan vien
export const callCreateNewNhanVien = (nhanVien: INhanVienReqDTO) =>{

    return axios.post<IBackendRes<INhanVienResDTO>>('/api/v1/nhan-vien', nhanVien);
}

//get nhan vien by id
export const callGetNhanVienById = (id: string) =>{
    return axios.get<IBackendRes<INhanVienResDTO>>(`/api/v1/nhan-vien/${id}`);
}

//get all nhan vien can filter
export const callGetAllNhanVien = (filter?: string) =>{
    const params = new URLSearchParams();
    if(filter) params.append('filter', filter);
    return axios.get<IBackendRes<INhanVienResDTO[]>>(`/api/v1/nhan-vien?${params.toString()}`);
}

//update nhan vien
export const callUpdateNhanVien = (NhanVien: INhanVienReqDTO, id: string) => {
    return axios.put<IBackendRes<INhanVienResDTO>>(`/ap1/v1/nhan-vien/${id}`, NhanVien);
}

//deactivate tai khoan nhan vien
export const callDeactivateNhanVien = (id: string) => {
    return axios.put<IBackendRes<void>>(`/api/v1/nhan-vien/${id}/vo-hieu-hoa`);
} 

//activate nhan vien
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
 * Module trang thai
 */

export const createTrangThai = (trangThai: ITrangThaiDTO) => {
    return axios.post<IBackendRes<ITrangThaiDTO>>('/api/v1/trang-thai', trangThai);
}

export const getAllTrangThaiByLoaiTrangThaiId = (id: string) =>{
    return axios.get<IBackendRes<ITrangThaiDTO[]>>(`/api/v1/trang-thai/loai/${id}`);
}

export const getTrangThaiById = (id: string) =>{
    return axios.get<IBackendRes<ITrangThaiDTO>>(`/api/v1/trang-thai/${id}`);
}

export const getAllTrangThai = (filter?: string) =>{
    const params = new URLSearchParams();
    if(filter) params.append('filter', filter);
    return axios.get<IBackendRes<ITrangThaiDTO[]>>(`/api/v1/trang-thai?${params.toString()}`);
}

export const updateTrangThai = (id: string, trangThai: ITrangThaiDTO) =>{
    return axios.put<IBackendRes<ITrangThaiDTO>>(`/api/v1/trang-thai/${id}`, trangThai);
}

export const deleteTrangThai  = (id: string) => {
    return axios.delete<IBackendRes<void>>(`/api/v1/trang-thai/${id}`);
}

/**
 * Module quyen han
 */
export const createQuyenHan = (quyenHan: IQuyenHan) => {
    return axios.post<IBackendRes<IQuyenHan>>('/api/v1/quyen-han', quyenHan);
}

export const getAllQuyenHan = (filter?: string) =>{
    const params = new URLSearchParams();
    if(filter) params.append('filter', filter);
    return axios.get<IBackendRes<IQuyenHan[]>>(`/api/v1/quyen-han?${params.toString()}`);
}

export const getQuyenHanById = (id: string) => {
    return axios.get<IBackendRes<IQuyenHan>>(`/api/v1/quyen-han/${id}`);
}

export const updateQuyenHan = (id: string, quyenHan: IQuyenHan) => {
    return axios.put<IBackendRes<IQuyenHan>>(`/api/v1/quyen-han/${id}`, quyenHan);
}

export const deleteQuyenHan = (id: string) =>{
    return axios.delete<IBackendRes<void>>(`/api/v1/quyen-han/${id}`);
}

/**
 * Module vai tro
 */
export const createVaiTro = (vaiTro: IVaiTroDTO) => {
    return axios.post<IBackendRes<IVaiTro>>('/api/v1/vai-tro', vaiTro);
}

export const getAllVaiTro = (filter?: string) => {
    const params = new URLSearchParams();
    if(filter) params.append('filter', filter);
    return axios.get<IBackendRes<IVaiTro[]>>(`/api/v1/vai-tro?${params.toString()}`);
}

export const getVaiTroById = (id: string) => {
    return axios.get<IBackendRes<IVaiTro>>(`/api/v1/vai-tro/${id}`);
}

export const updateVaiTro = (id: string, vaiTro: IVaiTroDTO) => {
    return axios.put<IBackendRes<IVaiTro>>(`/api/v1/vai-tro/${id}`, vaiTro);
}

export const deleteVaiTro = (id: string) => {
    return axios.delete<IBackendRes<void>>(`/api/v1/vai-tro/${id}`);
}

export const capQuyenModuleToVaiTro = (id: string, moduleDTO: IModuleDTO) => {
    return axios.put<IBackendRes<IVaiTro>>(`/api/v1/vai-tro/${id}/cap-quyen-module`, moduleDTO);
}

export const xoaQuyenModuleFromVaiTro = (id: string, moduleDTO: IModuleDTO) => {
    return axios.put<IBackendRes<IVaiTro>>(`/api/v1/vai-tro/${id}/xoa-quyen-module`, moduleDTO);
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
/**
 * Module tham so
 */
export const createThamSo = (thamSo: IThamSo) =>{
    return axios.post<IBackendRes<IThamSo>>('/api/v1/tham-so', thamSo);
}

export const getAllThamSo = (filter?: string) => {
    const params = new URLSearchParams();
    if(filter) params.append('filter', filter);
    return axios.get<IBackendRes<IThamSo[]>>(`/api/v1/tham-so?${params.toString()}`);
}

export const getThamSoById = (id: string) => {
    return axios.get<IBackendRes<IThamSo>>(`/api/v1/tham-so/${id}`);
}

export const updateThamSo = (id: string, thamSo: IThamSo) =>{
    return axios.put<IBackendRes<IThamSo>>(`/api/v1/tham-so/${id}`, thamSo);
} 

export const deleteThamSo = (id: string) => {
    return axios.delete<IBackendRes<void>>(`/api/v1/tham-so/${id}`);
}

/**
 * 
 * Module giao dich
 */
export const callGetAllGiaoDich = () => {
    return axios.get<IBackendRes<IGiaoDichResDTO[]>>(`/api/v1/giao-dich`);
}

export const callGetGiaoDichByID = (id: number) => {
    return axios.get<IBackendRes<IGiaoDichResDTO>>(`/api/v1/giao-dich/${id}`);
}

export const callGetGiaoDichByTaiKhoanID = (id: number) => {
    return axios.get<IBackendRes<IGiaoDichResDTO>>(`/api/v1/giao-dich/by/tktt/${id}`);
}

export const callGetGiaoDichByNhanVienID = (id: number) => {
    return axios.get<IBackendRes<IGiaoDichResDTO>>(`/api/v1/giao-dich/by/nhan-vien/${id}`);
}

export const callCreateGiaoDich = (data: IGiaoDichReqDTO) => {
    return axios.post<IBackendRes<IGiaoDichResDTO>>(`/api/v1/giao-dich`, data);
}

export const callGetAllTaiKhoanThanhToan = () => {
    return axios.get<IBackendRes<ITKTTResDTO[]>>(`/api/v1/giao-dich/tktt`);
}

export const callGetTaiKhoanThanhToanByID = (id: number) => {
    return axios.get<IBackendRes<ITKTTResDTO[]>>(`/api/v1/giao-dich/tktt/${id}`);
}

export const callCreateTaiKhoanThanhToan = (data: ITKTTReqDTO) => {
    return axios.post<IBackendRes<ITKTTResDTO>>(`/api/v1/giao-dich/tktt`, data);
}

export const callGetAllLSGD_TKTT = () => {
    return axios.get<IBackendRes<ILSGD_TKTTResDTO[]>>(`/api/v1/giao-dich/tktt/lich-su`);
}

export const callGetLSGD_TKTTByID = (id: number) => {
    return axios.get<IBackendRes<ILSGD_TKTTResDTO[]>>(`/api/v1/giao-dich/tktt/lich-su/${id}`);
}

export const callGetLSGD_TKTTByTaiKhoanID = (id: number) => {
    return axios.get<IBackendRes<ILSGD_TKTTResDTO[]>>(`/api/v1/giao-dich/tktt/lich-su/by/${id}`);
}

export const callGetAllLSGD_PGT = () => {
    return axios.get<IBackendRes<any[]>>(`/api/v1/giao-dich/pgt/lich-su`);
}

export const callGetLSGD_PGTByID = (id: number) => {
    return axios.get<IBackendRes<any[]>>(`/api/v1/giao-dich/pgt/lich-su/${id}`);
}

export const callGetLSGD_PGTByPhieuGuiTienID = (id: number) => {
    return axios.get<IBackendRes<any[]>>(`/api/v1/giao-dich/pgt/lich-su/by/${id}`);
}

export const callGetTraLaiByPhieuGuiTienID = (id: number) => {
    return axios.get<IBackendRes<any[]>>(`/api/v1/phieu-gui-tien/${id}/phieu-tra-lai`);
}

export const callGetRutTienByPhieuGuiTienID = (id: number) => {
    return axios.get<IBackendRes<any[]>>(`/api/v1/phieu-gui-tien/${id}/phieu-rut-tien`);
}

export const callGetAllQuyDinhLaiSuat = () => {
    return axios.get<IBackendRes<IQuyDinhLaiSuatResDTO[]>>(`/api/v1/quy-dinh-lai-suat`);
}

export const callGetAllChiTietQuyDinhLaiSuat = () => {
    return axios.get<IBackendRes<IChiTietQuyDinhLaiSuatResDTO[]>>(`/api/v1/quy-dinh-lai-suat/chi-tiet`);
}

export const callGetQuyDinhLaiSuatByID = (id: number) => {
    return axios.get<IBackendRes<IQuyDinhLaiSuatResDTO>>(`/api/v1/quy-dinh-lai-suat/${id}`);
}

export const callGetChiTietQuyDinhLaiSuatByID = (id: number) => {
    return axios.get<IBackendRes<IChiTietQuyDinhLaiSuatResDTO>>(`/api/v1/quy-dinh-lai-suat/chi-tiet/${id}`);
}