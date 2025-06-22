import { useEffect, useState, useCallback } from "react";
import { getWithdrawalHistoryBySavingsAccountId } from "@/services/withDrawalHistory";

export const useWithdrawalHistoryBySavingsAccountId = (savingsAccountId: number) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const startTime = Date.now();

      const withdrawalHistory = await getWithdrawalHistoryBySavingsAccountId(savingsAccountId);
      console.log("Dữ liệu lịch sử rút tiền đã lấy:", withdrawalHistory);

      // Đảm bảo loading tối thiểu 1.5s để tránh nhấp nháy giao diện
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 1500 - elapsedTime);

      await new Promise(resolve => setTimeout(resolve, remainingTime));

      setData(withdrawalHistory);
      setError(null);
    } catch (err) {
      setError(err);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [savingsAccountId]);

  useEffect(() => {
    console.log("Chuẩn bị lấy dữ liệu lịch sử rút tiền");
    fetchData();
  }, [fetchData]);

  const refreshWithdrawalHistory = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, withdrawalHistory: data, isLoading, error, refreshWithdrawalHistory };
}