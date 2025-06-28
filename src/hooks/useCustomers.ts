import { useEffect, useState, useCallback } from "react"
import { getAllCustomers } from "@/services/customers";
import { callActivateKhachHang, callDeactivateKhachHang } from "@/config/api";

export const useAllCustomers = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const allCustomers = await getAllCustomers();
      console.log("Du lieu khach hang da lay:", allCustomers);
      setData(allCustomers);
      setError(null);
    } catch (err) {
      setError(err);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    console.log("chuaan bi lay du lieu khach hang");
    fetchData();
    console.log('lay xong du lieu khach hang r ne');
  }, [fetchData]);

  const refreshCustomers = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data: data, allCustomers: data, isLoading, error, refreshCustomers };
}

// Hook for deactivating customer
export const useDeactivateCustomer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState(false);

  const deactivateCustomer = useCallback(async (customerId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);
      
      const startTime = Date.now();
      
      console.log("Đang vô hiệu hóa khách hàng:", customerId);
      const response = await callDeactivateKhachHang(customerId);
      console.log('RESPONSE VÔ HIỆU HÓA KHÁCH HÀNG: ', response);
      
      // Đảm bảo loading tối thiểu 1.5s để tránh nhấp nháy giao diện
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 1500 - elapsedTime);
      
      await new Promise(resolve => setTimeout(resolve, remainingTime));
      
      console.log("Vô hiệu hóa khách hàng thành công:", response.data);
      setSuccess(true);
      
      return response.data;
    } catch (err) {
      console.error("Lỗi khi vô hiệu hóa khách hàng:", err);
      setError(err);
      setSuccess(false);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetState = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return {
    deactivateCustomer,
    isLoading,
    error,
    success,
    resetState
  };
};

// Hook for activating customer
export const useActivateCustomer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState(false);

  const activateCustomer = useCallback(async (customerId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);
      
      const startTime = Date.now();
      
      console.log("Đang kích hoạt khách hàng:", customerId);
      const response = await callActivateKhachHang(customerId);
      console.log('RESPONSE KÍCH HOẠT KHÁCH HÀNG: ', response);
      
      // Đảm bảo loading tối thiểu 1.5s để tránh nhấp nháy giao diện
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 1500 - elapsedTime);
      
      await new Promise(resolve => setTimeout(resolve, remainingTime));
      
      console.log("Kích hoạt khách hàng thành công:", response.data);
      setSuccess(true);
      
      return response.data;
    } catch (err) {
      console.error("Lỗi khi kích hoạt khách hàng:", err);
      setError(err);
      setSuccess(false);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetState = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return {
    activateCustomer,
    isLoading,
    error,
    success,
    resetState
  };
};