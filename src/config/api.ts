import { IRegisterDTO, IReqLoginDTO, IResLoginDTO, IUserGetAccountDTO } from '@/types/auth';
import axios from './axios-customize';
import { IBackendRes } from '@/types/backend';
import { IKhachHangReqDTO, IKhachHangResDTO } from '@/types/customer';

//write all function call api here
/**
 * 
Module product
 */
// export const callCreateProduct = (product: IProduct) => {
//     return axios.post<IBackendRes<IProductResponseDTO>>(`/api/v1/products`, product);
// }

// export const callGetProductById = (id: string) => {
//     return axios.get<IBackendRes<IProductResponseDTO>>(`/api/v1/products/${id}`);
// }

// export const callGetProducts = ({filter }: {
//     filter?: string
// }) => {
//     const params = new URLSearchParams();

//     if (filter) params.append("filter", filter);
//     return axios.get<IBackendRes<IProductResponseDTO[]>>(`/api/v1/products?${params.toString()}`);
// }

// export const callUpdateProduct = (product: IProduct) => {
//     return axios.put<IBackendRes<IProductResponseDTO>>(`/api/v1/products`, product);
// }

// export const callDeleteProduct = (id: string) => {
//     return axios.delete<IBackendRes<void>>(`/api/v1/products/${id}`);
// }
////block code above is example
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