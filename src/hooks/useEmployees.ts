import { useEffect, useState, useCallback } from "react"
import { getAllEmployees } from "@/services/employees";

export const useAllEmployees = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const allEmployees = await getAllEmployees();
      console.log("Du lieu nhan vien da lay:", allEmployees);
      setData(allEmployees);
      setError(null);
    } catch (err) {
      setError(err);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    console.log("chuan bi lay du lieu nhan vien");
    fetchData();
  }, [fetchData]);

  const refreshEmployees = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  return { data: data, allEmployees: data, isLoading, error, refreshEmployees };
}