import { createPhieuGuiTien } from "./phieuGuiTienService";
import { convertToPhieuGuiTienData } from "@/utils/phieuGuiTien";
import { useUserStore } from "@/store/useUserStore";

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
const getGiaoDichVienId = (): number | undefined => {
  const { user } = useUserStore.getState();
  
  // Kiểm tra nếu có user và id từ thông tin đăng nhập
  if (user && user.id) {
    return Number(user.id);
  }
  
  return undefined;
};

/**
 * Tạo phiếu gửi tiền từ dữ liệu tài khoản tiết kiệm
 * @param accountData Dữ liệu tài khoản tiết kiệm
 * @param customerId ID của khách hàng
 * @param _giaoDichVienId ID của giao dịch viên (tùy chọn, mặc định sẽ lấy từ thông tin đăng nhập)
 * @returns Kết quả từ API
 */
export const createSavingAccount = async (
  accountData: SavingAccountData,
  customerId: number,
  _giaoDichVienId?: number // Đánh dấu tham số không sử dụng
) => {
  try {
    // Luôn lấy giaoDichVienId từ thông tin đăng nhập
    const giaoDichVienId = getGiaoDichVienId();
    
    // Chuyển đổi dữ liệu từ SavingAccountData sang IPhieuGuiTienReqDTO
    const phieuGuiTienData = convertToPhieuGuiTienData(
      accountData,
      customerId,
      giaoDichVienId
    );
    
    // Gọi API để tạo phiếu gửi tiền
    const response = await createPhieuGuiTien(phieuGuiTienData);
    return response;
  } catch (error) {
    console.error("Lỗi khi tạo phiếu gửi tiền:", error);
    throw error;
  }
};