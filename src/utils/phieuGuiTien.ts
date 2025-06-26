import { IPhieuGuiTienReqDTO } from "@/types/phieuGuiTien";

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
 * Chuyển đổi dữ liệu từ SavingAccountData sang IPhieuGuiTienReqDTO
 * @param accountData Dữ liệu tài khoản tiết kiệm
 * @param customerId ID của khách hàng
 * @param giaoDichVienId ID của giao dịch viên
 * @returns Dữ liệu phiếu gửi tiền
 */
export const convertToPhieuGuiTienData = (
  accountData: SavingAccountData,
  customerId: number,
  giaoDichVienId: number 
): IPhieuGuiTienReqDTO => {
  // Chuyển đổi term từ "12 tháng" sang số tháng
  const termMatch = accountData.term.match(/(\d+)\s*tháng/);
  const soThang = termMatch ? parseInt(termMatch[1]) : 1;
  
  // Chuyển đổi depositType sang loaiTietKiemId
  const loaiTietKiemId = accountData.depositType === "Tiền gửi tiêu chuẩn" ? 1 : 2;
  
  // Chuyển đổi interestFrequency sang tanSuatNhanLaiId
  let tanSuatNhanLaiId = 3; // Mặc định là cuối kỳ
  if (accountData.interestFrequency === "Hàng tháng") tanSuatNhanLaiId = 1;
  else if (accountData.interestFrequency === "Hàng quý") tanSuatNhanLaiId = 2;
  else if (accountData.interestFrequency === "Đầu kỳ") tanSuatNhanLaiId = 4;
  
  // Chuyển đổi maturityOption sang hinhThucDaoHanId
  let hinhThucDaoHanId = 1; // Mặc định là tất toán
  if (accountData.maturityOption === "Tự động tái tục gốc") hinhThucDaoHanId = 2;
  else if (accountData.maturityOption === "Tự động tái tục gốc và lãi") hinhThucDaoHanId = 3;
  
  // Xác định kênh giao dịch
  let kenhGiaoDichId = 1; // Mặc định là 1 (quầy giao dịch)
  if (accountData.channel) {
    // Ánh xạ tên kênh giao dịch sang ID
    if (accountData.channel !== "cash_at_counter") kenhGiaoDichId = 2;
  }
  
  // Tạo dữ liệu phiếu gửi tiền
  return {
    khachHangId: customerId,
    giaoDichVienId: giaoDichVienId,
    hinhThucDaoHanId: hinhThucDaoHanId,
    soTienGuiBanDau: accountData.amount,
    tenGoiNho: accountData.nickname,
    soThang: soThang,
    loaiTietKiemId: loaiTietKiemId,
    tanSuatNhanLaiId: tanSuatNhanLaiId,
    kenhGiaoDichId: kenhGiaoDichId
  };
};