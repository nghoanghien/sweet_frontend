import { getPaymentAccountById } from "@/services/paymentAccount";
import { callCreateRutTienGiaoDich, callCreateNapTienGiaoDich } from "@/config/api";
import { IRutTienReqDTO, INapTienReqDTO } from "@/types/giaoDich";
import { useEffect, useState, useCallback } from "react"

export const usePaymentAccountByCustomerId = (customerId: number) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  
  useEffect(() => {
    if (!customerId) {
      setIsLoading(false);
      return;
    }
    
    console.log("Chuẩn bị lấy dữ liệu tài khoản thanh toán cho customerId:", customerId);
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const startTime = Date.now();
        
        const paymentAccounts = await getPaymentAccountById(customerId);
        console.log("Dữ liệu tài khoản thanh toán đã lấy:", paymentAccounts);
        setData(paymentAccounts);
        
        // Đảm bảo loading tối thiểu 1.5s để tránh nhấp nháy giao diện
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 1500 - elapsedTime);
        
        await new Promise(resolve => setTimeout(resolve, remainingTime));
        
        setError(null);
      } catch (err) {
        setError(err);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [customerId]); // Dependency array với customerId để re-fetch khi customerId thay đổi

  return { data: data, paymentAccounts: data, isLoading, error };
}

// Hook for withdrawal transaction
export const useWithdrawTransaction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState(false);

  const withdrawMoney = useCallback(async (withdrawData: IRutTienReqDTO) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);
      
      const startTime = Date.now();
      
      console.log("Đang thực hiện rút tiền:", withdrawData);
      const response = await callCreateRutTienGiaoDich(withdrawData);
      console.log('RESPONSE GỐC: ', response);
      
      // Đảm bảo loading tối thiểu 1.5s để tránh nhấp nháy giao diện
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 1500 - elapsedTime);
      
      await new Promise(resolve => setTimeout(resolve, remainingTime));
      
      console.log("Rút tiền thành công:", response.data);
      setSuccess(true);
      
      return response.data;
    } catch (err) {
      console.error("Lỗi khi rút tiền:", err);
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
    withdrawMoney,
    isLoading,
    error,
    success,
    resetState
  };
};

// Hook for deposit transaction
export const useDepositTransaction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState(false);

  const depositMoney = useCallback(async (depositData: INapTienReqDTO) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);
      
      const startTime = Date.now();
      
      console.log("Đang thực hiện nạp tiền:", depositData);
      const response = await callCreateNapTienGiaoDich(depositData);
      console.log('RESPONSE GỐC: ', response);
      
      // Đảm bảo loading tối thiểu 1.5s để tránh nhấp nháy giao diện
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 1500 - elapsedTime);
      
      await new Promise(resolve => setTimeout(resolve, remainingTime));
      
      console.log("Nạp tiền thành công:", response.data);
      setSuccess(true);
      
      return response.data;
    } catch (err) {
      console.error("Lỗi khi nạp tiền:", err);
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
    depositMoney,
    isLoading,
    error,
    success,
    resetState
  };
};