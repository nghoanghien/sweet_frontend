import { useEffect, useState, useCallback } from "react"
import { getEmployeeTransactions } from "@/services/employee-transactions";

export const useAllTransactionByEmployeeId = (employeeId: number) => {
  const [data, setData] = useState<EmployeeTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const startTime = Date.now();
      
      const allTransactions = await getEmployeeTransactions(employeeId);
      console.log("Du lieu giao dich nhan vien da lay:", allTransactions);
      
      // Đảm bảo loading tối thiểu 1.5s để tránh nhấp nháy giao diện
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 1500 - elapsedTime);
      
      await new Promise(resolve => setTimeout(resolve, remainingTime));
      
      setData(allTransactions);
      console.log("data: ", data);
      setError(null);
    } catch (err) {
      setError(err);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [employeeId]);
  
  useEffect(() => {
    console.log("chuan bi lay du lieu giao dich nhan vien");
    fetchData();
  }, [fetchData]);

  return { 
    data, 
    transactions: data, // Thêm alias transactions để phù hợp với cách dùng trong component
    isLoading, 
    error
  };
};
