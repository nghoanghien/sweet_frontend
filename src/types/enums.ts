// Enums for status
export enum AccountStatus {
  ACTIVE = 'active',
  DISABLED = 'disabled',
};

export enum CustomerStatus {
  ACTIVE = 'active',
  DISABLED = 'disabled',
};

export enum SavingAccountStatus {
  CLOSED = 'closed',
  IN_TERM = 'inTerm',
}

// Enums for permission
export enum Permission {
  PAYMENT_ACCOUNT = 'manage_payment_account',
  SAVING_ACCOUNTS = 'manage_saving_accounts',
  CUSTOMERS = 'manage_customers_and_theirs_savings_accounts',
  EMPLOYEES = 'manage_employees',
  SAVING_PRODUCTS = 'manage_saving_products',
  SALE_REPORTS = "manage_sale_reports",
  SETTINGS = "settings",
  PERMISSIONS = 'manage_permissions',
}


export const PermissionInfo: Record<Permission, { label: string; description: string }> = {
  [Permission.PAYMENT_ACCOUNT]: {
    label: 'Xem tài khoản thanh toán',
    description: 'Cho phép xem thông tin tài khoản thanh toán của khách hàng',
  },
  [Permission.SAVING_ACCOUNTS]: {
    label: 'Quản lý tiền gửi tiết kiệm',
    description: 'Quản lý các tài khoản tiết kiệm, tạo mới, chỉnh sửa và theo dõi',
  },
  [Permission.CUSTOMERS]: {
    label: 'Quản lý khách hàng và tiền gửi',
    description: 'Quản lý thông tin khách hàng và các tài khoản tiết kiệm của họ',
  },
  [Permission.EMPLOYEES]: {
    label: 'Quản lý nhân viên',
    description: 'Quản lý thông tin nhân viên, tạo tài khoản và phân quyền',
  },
  [Permission.SAVING_PRODUCTS]: {
    label: 'Quản lý sản phẩm tiết kiệm',
    description: 'Tạo và quản lý các sản phẩm tiết kiệm với lãi suất và điều kiện khác nhau',
  },
  [Permission.SALE_REPORTS]: {
    label: 'Báo cáo doanh số',
    description: 'Xem và tạo báo cáo doanh số, thống kê hoạt động kinh doanh',
  },
  [Permission.SETTINGS]: {
    label: 'Cài đặt hệ thống',
    description: 'Cấu hình các thiết lập hệ thống và tham số hoạt động',
  },
  [Permission.PERMISSIONS]: {
    label: 'Quản lý phân quyền',
    description: 'Phân quyền truy cập cho nhân viên và quản lý vai trò người dùng',
  },
}

// Enums for saving accounts
export enum InterestFrequency {
  BEGIN_OF_TERM = 'begin_of_term',
  END_OF_TERM = 'end_of_term',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
}

export const InterestFrequencyInfo: Record<InterestFrequency, { label: string; description: string }> = {
  [InterestFrequency.BEGIN_OF_TERM]: {
    label: 'Đầu kỳ hạn',
    description: 'Nhận lãi vào cuối kỳ hạn - Tối ưu cho tích lũy dài hạn',
  },
  [InterestFrequency.END_OF_TERM]: {
    label: 'Cuối kỳ hạn',
    description: 'Nhận lãi hàng tháng - Phù hợp với chi tiêu thường xuyên',
  },
  [InterestFrequency.MONTHLY]: {
    label: 'Hàng tháng',
    description: 'Nhận lãi hàng quý - Cân bằng giữa thanh khoản và lợi nhuận',
  },
  [InterestFrequency.QUARTERLY]: {
    label: 'Hàng quý',
    description: 'Nhận lãi ngay sau khi gửi - Linh hoạt tối đa',
  },
};


export enum DepositType {
  STANDARD = 'standard',
  FLEXIBLE = 'flexible',
}

export const DepositTypeInfo: Record<DepositType, { label: string; description: string }> = {
  [DepositType.STANDARD]: {
    label: 'Tiết kiệm tiêu chuẩn',
    description: 'Gửi tiết kiệm với kỳ hạn cố định, lãi suất ổn định và không thể rút trước hạn',
  },
  [DepositType.FLEXIBLE]: {
    label: 'Tiết kiệm linh hoạt',
    description: 'Gửi tiết kiệm linh hoạt, có thể rút một phần hoặc toàn bộ bất kỳ lúc nào',
  },
}

export enum MaturityOption {
  RECEIVE_ALL = 'receive_all',
  ROLLOVER_PRINCIPAL = 'rollover_principal',
  ROLLOVER_ALL = 'rollover_all',
}

export const MaturityOptionInfo: Record<MaturityOption, { label: string; description: string }> = {
  [MaturityOption.RECEIVE_ALL]: {
    label: 'Nhận cả gốc và lãi',
    description: 'Nhận toàn bộ số tiền gốc và lãi khi đến hạn, kết thúc hợp đồng tiết kiệm',
  },
  [MaturityOption.ROLLOVER_PRINCIPAL]: {
    label: 'Nhận gốc, chuyển lãi sang kỳ hạn mới',
    description: 'Nhận số tiền gốc, chuyển số lãi sang kỳ hạn tiết kiệm mới với cùng điều kiện',
  },
  [MaturityOption.ROLLOVER_ALL]: {
    label: 'Chuyển cả gốc và lãi sang kỳ hạn mới',
    description: 'Tự động gia hạn với số tiền gốc cộng lãi, tối ưu hóa lợi nhuận tích lũy',
  },
}