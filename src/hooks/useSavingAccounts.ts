import { getAllSavingAccounts, getSavingAccountsById, withdrawMoneyFromSaving } from "@/services/savingAccounts";
import { SavingAccount } from "@/types/interfaces/savingAccount";
import { useEffect, useState, useCallback } from "react"

export const useAllSavingAccounts = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const startTime = Date.now();
      
      const allSavingAccounts = await getAllSavingAccounts();
      console.log("Du lieu da lay:", allSavingAccounts);
      
      // Đảm bảo loading tối thiểu 1.5s để tránh nhấp nháy giao diện
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 1500 - elapsedTime);
      
      await new Promise(resolve => setTimeout(resolve, remainingTime));
      
      setData(allSavingAccounts);
      setError(null);
    } catch (err) {
      setError(err);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    console.log("chuaan bi lay du lieu");
    fetchData();
  }, [fetchData]);

  const refreshSavingAccounts = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data: data, allSavingAccounts: data, isLoading, error, refreshSavingAccounts };
}

export const useSavingAccountsByCustomerId = (customerId: number) => {
  const [data, setData] = useState<SavingAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const startTime = Date.now();
      
      const savingAccounts = await getSavingAccountsById(customerId);
      console.log("Du lieu phieu gui tien by customer Id da lay:", savingAccounts);
      
      // Đảm bảo loading tối thiểu 1.5s để tránh nhấp nháy giao diện
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 1500 - elapsedTime);
      
      await new Promise(resolve => setTimeout(resolve, remainingTime));
      
      setData(savingAccounts);
      setError(null);
    } catch (err) {
      setError(err);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [customerId]);
  
  useEffect(() => {
    console.log("chuaan bi lay du lieu cho customer:", customerId);
    fetchData();
  }, [fetchData]);

  const refreshSavingAccounts = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data: data, savingAccounts: data, isLoading, error, refreshSavingAccounts };
}

export const useWithdrawFromSaving = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState(false);
  
  const withdrawMoney = useCallback(async (phieuGuiTienID: number, soTienRut: number, kenhGiaoDichID: number) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);
      
      const response = await withdrawMoneyFromSaving(phieuGuiTienID, soTienRut, kenhGiaoDichID);
      console.log("Ket qua rut tien:", response);
      
      setSuccess(true);
      return response;
    } catch (err) {
      setError(err);
      console.log("Loi khi rut tien:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const resetState = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);
  
  return { withdrawMoney, isLoading, error, success, resetState };
}