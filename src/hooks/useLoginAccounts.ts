import { getAllAccounts } from "@/services/loginAccounts";
import { useEffect, useState } from "react";

export const useLoginAccounts = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  
  useEffect(() => {
    console.log("Chuẩn bị lấy dữ liệu tài khoản đăng nhập");
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const startTime = Date.now();
        
        const accounts = await getAllAccounts();
        console.log("Dữ liệu tài khoản đăng nhập đã lấy:", accounts);
        setData(accounts || []);
        
        // Đảm bảo loading tối thiểu 1.5s để tránh nhấp nháy giao diện
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 1500 - elapsedTime);
        
        await new Promise(resolve => setTimeout(resolve, remainingTime));
        
        setError(null);
      } catch (err) {
        setError(err);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []); // Không có dependency để chỉ fetch một lần khi component mount

  return { data, accounts: data, isLoading, error };
}