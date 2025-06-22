import { useEffect, useState, useCallback } from "react";
import { getSavingTransactionsBySavingsAccountId } from "@/services/savings-transactions";

export const useAllTransactionBySavingsAccountId = (savingsAccountId: number) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchData = useCallback(async () => {
    // Chỉ fetch data khi savingsAccountId hợp lệ
    if (!savingsAccountId || savingsAccountId <= 0) {
      setData([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    try {
      setIsLoading(true);
      const startTime = Date.now();

      const allTransactions = await getSavingTransactionsBySavingsAccountId(savingsAccountId);
      console.log("Dữ liệu giao dịch tiết kiệm đã lấy:", allTransactions);

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
  }, [savingsAccountId]);

  useEffect(() => {
    console.log("Chuẩn bị lấy dữ liệu giao dịch tiết kiệm");
    fetchData();
  }, [fetchData]);

  const refreshTransactions = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, allTransactions: data, isLoading, error, refreshTransactions };
}