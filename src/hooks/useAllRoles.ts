import { useEffect, useState, useCallback } from "react"
import { getAllRoles, updateRole } from "@/services/permissions";
import { Role } from "@/types/interfaces/user";
import { Permission } from "@/types/interfaces/enums";

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

export const useUpdateRole = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  
  // Theo dõi thay đổi của error state
  useEffect(() => {
    if (error) {
    }
  }, [error]);
  
  const updateRoleData = useCallback(async (formData: any) => {
    try {
      setIsLoading(true);
      setError(null);
      const startTime = Date.now();
      
      // Chuyển đổi formData thành Role object
      const roleData: Role = {
        roleID: formData.id || 0,
        roleName: formData.name,
        description: formData.description,
        active: true,
        customerRole: formData.type === 'customer',
        permissions: formData.permissions.map((p: any) => p.id as Permission)
      };
      
      console.log("Du lieu vai tro can cap nhat:", roleData);
      
      const result = await updateRole(formData.id.toString(), roleData);
      
      // Đảm bảo loading tối thiểu 1.5s để tránh nhấp nháy giao diện
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 1500 - elapsedTime);
      
      await new Promise(resolve => setTimeout(resolve, remainingTime));
      
      if (result.error) {
        setError(result.error);
      } else {
        setError(null);
      }
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { updateRoleData, isLoading, error };
}