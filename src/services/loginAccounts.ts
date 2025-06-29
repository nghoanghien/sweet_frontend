
import { getAllCustomers } from "./customers";
import { getAllEmployees } from "./employees";

export const getAllAccounts = async () => {
  try {
    const [customers, employees] = await Promise.all([
      getAllCustomers(),
      getAllEmployees()
    ]);
    
    // Kết hợp dữ liệu customers và employees
    const allAccounts = [
      ...(employees || []),
      ...(customers || [])
    ];
    
    return allAccounts;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách tài khoản:", error);
    throw error;
  }
}