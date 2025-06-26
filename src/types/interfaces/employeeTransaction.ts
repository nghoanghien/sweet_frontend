interface EmployeeTransaction {
  id: number;                    // ID giao dịch
  type: string; // Loại giao dịch (nhận/chi)
  time: string;                  // Thời gian giao dịch (format: "HH:mm")
  date: string;                  // Ngày giao dịch (format: "DD/MM/YYYY")
  amount: number;                // Số tiền giao dịch
  description: string;           // Mô tả giao dịch
  channel: string; // Kênh giao dịch
  note?: string;                 // Ghi chú (optional)
  
  // Thông tin tài khoản nguồn
  sourceAccountType: string;     // Loại tài khoản nguồn
  sourceAccountId?: string;      // ID tài khoản nguồn (optional)
  
  // Thông tin tài khoản đích
  destAccountType: string;       // Loại tài khoản đích
  destAccountId?: string;        // ID tài khoản đích (optional)
  
  transactionType: string;       // Loại giao dịch chi tiết
}
