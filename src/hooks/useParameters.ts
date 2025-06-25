import { useEffect, useState, useCallback } from "react"
import { getAllParameters, getParameterById, updateParameter } from "@/services/parameters";
import { IThamSo } from "@/types/thamSo";

export const useAllParameters = () => {
  const [data, setData] = useState<Record<string, number>>({});
  const [rawParameters, setRawParameters] = useState<IThamSo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const startTime = Date.now();
      
      const allParameters: IThamSo[] = await getAllParameters();
      console.log("Du lieu tham so da lay:", allParameters);
      
      // Chuyển đổi array thành object với key là maThamSo và value là giaTri (chuyển sang số)
      const parametersObject = allParameters.reduce((acc, param) => {
        acc[param.maThamSo] = parseFloat(param.giaTri) || 0;
        return acc;
      }, {} as Record<string, number>);
      
      console.log("Du lieu tham so sau khi chuyen doi:", parametersObject);

      // Đảm bảo loading tối thiểu 1.5s
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 1500 - elapsedTime);
      
      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }

      setData(parametersObject);
      setRawParameters(allParameters);
      setError(null);
    } catch (err) {
      setError(err);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    console.log("chuan bi lay du lieu tham so");
    fetchData();
  }, [fetchData]);

  const refreshParameters = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const updateAllParameters = useCallback(async (updates: Record<string, number>) => {
    try {
      setIsLoading(true);
      setError(null);
      const startTime = Date.now();
      
      // Update từng parameter một cách tuần tự
      for (const [parameterCode, newValue] of Object.entries(updates)) {
        await updateParameter(parameterCode, newValue, rawParameters);
      }
      
      // Refresh data sau khi update xong
      await fetchData();
      
      // Đảm bảo loading tối thiểu 1.5s
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 1500 - elapsedTime);
      
      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }
    } catch (err) {
      setError(err);
      console.error('Error updating parameters:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [rawParameters, fetchData]);

  return { data: data, allParameters: rawParameters, isLoading, error, refreshParameters, updateAllParameters };
}

export function useMinDepositAmount() {
  const [minAmount, setMinAmount] = useState(0);

  useEffect(() => {
    getParameterById().then((value) => {
     const amount = Number(value);
      console.log("MIN_DEPOSIT_AMOUNT:", amount); // Thêm dòng này để kiểm tra
      setMinAmount(amount);
    });
  }, []);

  return minAmount;
}