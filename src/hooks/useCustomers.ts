import { useEffect, useState, useCallback } from "react"
import { getAllCustomers } from "@/services/customers";

export const useAllCustomers = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const allCustomers = await getAllCustomers();
      console.log("Du lieu khach hang da lay:", allCustomers);
      setData(allCustomers);
      setError(null);
    } catch (err) {
      setError(err);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    console.log("chuaan bi lay du lieu khach hang");
    fetchData();
    console.log('lay xong du lieu khach hang r ne');
  }, [fetchData]);

  const refreshCustomers = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data: data, allCustomers: data, isLoading, error, refreshCustomers };
}