import axios from '@/config/axios-customize';

export const getAllSavingAccountsAPI = () => {
  return axios.get<any>("/api/v1/phieu-gui-tien");
}

export const callGetSavingAccountsByCustomerId = (customerId: number) => {
  return axios.get<any>(`/api/v1/phieu-gui-tien/${customerId}`);
}