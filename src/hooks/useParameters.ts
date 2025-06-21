import { useEffect, useState, useCallback } from "react"
import { getAllParameters } from "@/services/parameters";
import { IThamSo } from "@/types/thamSo";

export const useAllParameters = () => {
  const [data, setData] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const allParameters: IThamSo[] = await getAllParameters();
      console.log("Du lieu tham so da lay:", allParameters);
      
      // Chuyển đổi array thành object với key là maThamSo và value là giaTri (chuyển sang số)
      const parametersObject = allParameters.reduce((acc, param) => {
        acc[param.maThamSo] = parseFloat(param.giaTri) || 0;
        return acc;
      }, {} as Record<string, number>);
      
      console.log("Du lieu tham so sau khi chuyen doi:", parametersObject);

      setData(parametersObject);
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

  return { data: data, allParameters: data, isLoading, error, refreshParameters };
}