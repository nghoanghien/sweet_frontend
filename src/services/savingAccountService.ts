import { createPhieuGuiTien } from "./phieuGuiTienService";
import { convertToPhieuGuiTienData } from "@/utils/phieuGuiTien";
import { useAuthStore } from "@/store/useAuthStore";

interface SavingAccountData {
  amount: number;
  term: string;
  interestRate: number;
  depositType: string;
  interestFrequency: string;
  maturityOption: string;
  nickname: string;
  channel?: string; // Thêm trường kênh giao dịch (tùy chọn)
}

/**
 * Lấy ID của giao dịch viên từ thông tin người dùng đăng nhập
 * @returns ID của giao dịch viên hoặc 1 nếu không tìm thấy
 */
const getGiaoDichVienId = (): number => {
  const user = useAuthStore.getState().user;
  // Nếu có thông tin người dùng và có employeeID, sử dụng employeeID làm giaoDichVienId
  // Giả sử employeeID là một chuỗi số, chuyển đổi thành số
  if (user && user.employeeID) {
    const employeeIdNumber = parseInt(user.employeeID);
    return isNaN(employeeIdNumber) ? 1 : employeeIdNumber;
  }
  return 1; // Giá trị mặc định nếu không có thông tin người dùng
};

/**
 * Tạo phiếu gửi tiền từ dữ liệu tài khoản tiết kiệm
 * @param accountData Dữ liệu tài khoản tiết kiệm
 * @param customerId ID của khách hàng
 * @param giaoDichVienId ID của giao dịch viên (tùy chọn, mặc định sẽ lấy từ thông tin đăng nhập)
 * @returns Kết quả từ API
 */
export const createSavingAccount = async (
  accountData: SavingAccountData,
  customerId: number ,
  giaoDichVienId?: number
) => {
  try {
    // Nếu không cung cấp giaoDichVienId, lấy từ thông tin người dùng đăng nhập
    const actualGiaoDichVienId = giaoDichVienId || getGiaoDichVienId();
    
    // Chuyển đổi dữ liệu từ SavingAccountData sang IPhieuGuiTienReqDTO
    const phieuGuiTienData = convertToPhieuGuiTienData(
      accountData,
      customerId,
      actualGiaoDichVienId
    );
    
    // Gọi API để tạo phiếu gửi tiền
    const response = await createPhieuGuiTien(phieuGuiTienData);
    return response;
  } catch (error) {
    console.error("Lỗi khi tạo phiếu gửi tiền:", error);
    throw error;
  }
};