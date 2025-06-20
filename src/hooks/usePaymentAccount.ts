import { getPaymentAccountById } from "@/services/paymentAccount";
import { useEffect, useState } from "react"

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
        const paymentAccounts = await getPaymentAccountById(customerId);
        console.log("Dữ liệu tài khoản thanh toán đã lấy:", paymentAccounts);
        setData(paymentAccounts);
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