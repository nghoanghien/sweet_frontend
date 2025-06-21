import { useEffect, useState, useCallback } from "react"
import { getTransactionHistoryByPaymentAccountId } from "@/services/payment-transactions";

export const useAllTransactionByPaymentAccountId = (paymentAccountId: number) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const startTime = Date.now();
      
      const allTransactions = await getTransactionHistoryByPaymentAccountId(paymentAccountId);
      console.log("Du lieu giao dich da lay:", allTransactions);
      
      // Đảm bảo loading tối thiểu 1.5s để tránh nhấp nháy giao diện
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 1500 - elapsedTime);
      
      await new Promise(resolve => setTimeout(resolve, remainingTime));
      
      setData(allTransactions);
      setError(null);
    } catch (err) {
      setError(err);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [paymentAccountId]);
  
  useEffect(() => {
    console.log("chuan bi lay du lieu giao dich");
    fetchData();
  }, [fetchData]);

  const refreshTransactions = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data: data, allTransactions: data, isLoading, error, refreshTransactions };
}