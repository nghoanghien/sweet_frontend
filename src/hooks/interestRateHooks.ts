import { useEffect, useState } from "react";
import { getInterestRateData, getMinDepositAmount } from "@/services/interestRateService";

export const useInterestRateData = (isOpen: boolean) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [minDepositAmount, setMinDepositAmount] = useState<number>(0);

  useEffect(() => {
    if (!isOpen) {
      setIsLoading(false);
      return;
    }

    console.log("Chuẩn bị lấy dữ liệu lãi suất");
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const startTime = Date.now();
        
        const interestData = await getInterestRateData();
        console.log("Dữ liệu lãi suất đã lấy:", interestData);
        setData(interestData);
        const minAmount = await getMinDepositAmount();
        console.log("Dữ liệu số tiền gửi tối thiểu đã lấy:", minAmount);
        setMinDepositAmount(minAmount.soTienGuiToiThieu);
        
        // Đảm bảo loading tối thiểu 1.5s để tránh nhấp nháy giao diện
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 1500 - elapsedTime);
        
        await new Promise(resolve => setTimeout(resolve, remainingTime));
        
        setError(null);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu lãi suất:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isOpen]);

  return { data, minDepositAmount, isLoading, error };
};