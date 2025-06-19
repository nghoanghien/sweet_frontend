import { getAllSavingAccounts } from "@/services/savingAccounts";
import { useEffect, useState } from "react"

export const useAllSavingAccounts = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  
  useEffect(() => {
    console.log("chuaan bi lay du lieu");
    const fetchData = async () => {
      try {
        const allSavingAccounts = await getAllSavingAccounts();
        console.log("Du lieu da lay:", allSavingAccounts);
        setData(allSavingAccounts);
      } catch (err) {
        setError(err);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    console.log('lay xong du lieu r ne');

    fetchData();
  }, []); // Thêm dependency array rỗng để chỉ chạy 1 lần khi component mount

  return { data: data, allSavingAccounts: data, isLoading, error };
}