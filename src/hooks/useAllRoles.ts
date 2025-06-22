import { useEffect, useState, useCallback } from "react"
import { getAllRoles } from "@/services/permissions";

export const useAllRoles = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const startTime = Date.now();
      
      const allRoles = await getAllRoles();
      console.log("Du lieu vai tro da lay:", allRoles);
      
      // Đảm bảo loading tối thiểu 1.5s để tránh nhấp nháy giao diện
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 1500 - elapsedTime);
      
      await new Promise(resolve => setTimeout(resolve, remainingTime));
      
      setData(allRoles);
      setError(null);
    } catch (err) {
      setError(err);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    console.log("chuan bi lay du lieu vai tro");
    fetchData();
  }, [fetchData]);

  const refreshRoles = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data: data, allRoles: data, isLoading, error, refreshRoles };
}