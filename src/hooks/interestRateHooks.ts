import { useEffect, useState } from "react";
import { getInterestRateData } from "@/services/interestRateService";

export const useInterestRateData = (isOpen: boolean) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!isOpen) {
      setIsLoading(false);
      return;
    }

    console.log("Chuẩn bị lấy dữ liệu lãi suất");
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const interestData = await getInterestRateData();
        console.log("Dữ liệu lãi suất đã lấy:", interestData);
        setData(interestData);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu lãi suất:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isOpen]);

  return { data, isLoading, error };
};