import { getAllSavingAccounts, getSavingAccountsById } from "@/services/savingAccounts";
import { SavingAccount } from "@/types/interfaces/savingAccount";
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

    fetchData();
  }, []); // Thêm dependency array rỗng để chỉ chạy 1 lần khi component mount

  return { data: data, allSavingAccounts: data, isLoading, error };
}

export const useSavingAccountsByCustomerId = (customerId: number) => {
  const [data, setData] = useState<SavingAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  
  useEffect(() => {
    console.log("chuaan bi lay du lieu cho customer:", customerId);
    const fetchData = async () => {
      try {
        const savingAccounts = await getSavingAccountsById(customerId);
        console.log("Du lieu phieu gui tien by customer Id da lay:", savingAccounts);
        setData(savingAccounts);
      } catch (err) {
        setError(err);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [customerId]); // Thêm customerId vào dependency array

  return { data: data, savingAccounts: data, isLoading, error };
}