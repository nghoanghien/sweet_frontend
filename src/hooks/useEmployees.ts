import { useEffect, useState, useCallback } from "react"
import { getAllEmployees, updateEmployee } from "@/services/employees";
import { callActivateNhanVien, callDeactivateNhanVien } from "@/config/api";
import { User } from "@/types/interfaces/user";

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

// Hook for deactivating employee
export const useDeactivateEmployee = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState(false);

  const deactivateEmployee = useCallback(async (employeeId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);
      
      const startTime = Date.now();
      
      console.log("Đang vô hiệu hóa nhân viên:", employeeId);
      const response = await callDeactivateNhanVien(employeeId);
      console.log('RESPONSE VÔ HIỆU HÓA NHÂN VIÊN: ', response);
      
      // Đảm bảo loading tối thiểu 1.5s để tránh nhấp nháy giao diện
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 1500 - elapsedTime);
      
      await new Promise(resolve => setTimeout(resolve, remainingTime));
      
      console.log("Vô hiệu hóa nhân viên thành công:", response.data);
      setSuccess(true);
      
      return response.data;
    } catch (err) {
      console.error("Lỗi khi vô hiệu hóa nhân viên:", err);
      setError(err);
      setSuccess(false);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetState = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return {
    deactivateEmployee,
    isLoading,
    error,
    success,
    resetState
  };
};

// Hook for activating employee
export const useActivateEmployee = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState(false);

  const activateEmployee = useCallback(async (employeeId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);
      
      const startTime = Date.now();
      
      console.log("Đang kích hoạt nhân viên:", employeeId);
      const response = await callActivateNhanVien(employeeId);
      console.log('RESPONSE KÍCH HOẠT NHÂN VIÊN: ', response);
      
      // Đảm bảo loading tối thiểu 1.5s để tránh nhấp nháy giao diện
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 1500 - elapsedTime);
      
      await new Promise(resolve => setTimeout(resolve, remainingTime));
      
      console.log("Kích hoạt nhân viên thành công:", response.data);
      setSuccess(true);
      
      return response.data;
    } catch (err) {
      console.error("Lỗi khi kích hoạt nhân viên:", err);
      setError(err);
      setSuccess(false);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetState = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return {
    activateEmployee,
    isLoading,
    error,
    success,
    resetState
  };
};

// Hook for updating employee
export const useUpdateEmployee = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState(false);

  const updateEmployeeData = useCallback(async (employee: User, employeeId: number) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);
      
      const startTime = Date.now();
      
      console.log("Đang cập nhật nhân viên:", employee);
      const response = await updateEmployee(employee, employeeId);
      console.log('RESPONSE CẬP NHẬT NHÂN VIÊN: ', response);
      
      // Đảm bảo loading tối thiểu 1.5s để tránh nhấp nháy giao diện
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 1500 - elapsedTime);
      
      await new Promise(resolve => setTimeout(resolve, remainingTime));
      
      console.log("Cập nhật nhân viên thành công:", response.data);
      setSuccess(true);
      
      return response.data;
    } catch (err) {
      console.error("Lỗi khi cập nhật nhân viên:", err);
      setError(err);
      setSuccess(false);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetState = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return {
    updateEmployeeData,
    isLoading,
    error,
    success,
    resetState
  };
};