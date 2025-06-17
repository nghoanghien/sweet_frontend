import axios from './axios-customize';

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