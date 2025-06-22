import { useEffect, useState, useCallback } from "react";
import { getInterestHistoryBySavingsAccountId } from "@/services/interestHistory";

export const useInterestHistoryBySavingsAccountId = (savingsAccountId: number) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const startTime = Date.now();

      const interestHistory = await getInterestHistoryBySavingsAccountId(savingsAccountId);
      console.log("Dữ liệu lịch sử trả lãi đã lấy:", interestHistory);

      // Đảm bảo loading tối thiểu 1.5s để tránh nhấp nháy giao diện
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 1500 - elapsedTime);

      await new Promise(resolve => setTimeout(resolve, remainingTime));

      setData(interestHistory);
      setError(null);
    } catch (err) {
      setError(err);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [savingsAccountId]);

  useEffect(() => {
    console.log("Chuẩn bị lấy dữ liệu lịch sử trả lãi");
    fetchData();
  }, [fetchData]);

  const refreshInterestHistory = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, interestHistory: data, isLoading, error, refreshInterestHistory };
}