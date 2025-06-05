// Dữ liệu mẫu cho tài khoản thanh toán
export const sampleAccounts = [
  {
    id: 1,
    accountNumber: '1234 5678 9012 3456',
    balance: 15000000,
    status: 'active',
    openDate: '2023-01-15',
    type: 'Tài khoản chính',
    description: 'Tài khoản tiết kiệm',
    color: 'bg-gradient-to-r from-blue-400 to-indigo-500',
  }
];

// Dữ liệu mẫu cho giao dịch
export const sampleTransactions = [
  {
    id: 1,
    type: 'Deposit',
    account: '1234 5678 9012 3456',
    date: 'Hôm nay, 10:45 AM',
    amount: 5000000,
    status: 'Completed',
  },
  {
    id: 2,
    type: 'Withdrawal',
    account: '2345 6789 0123 4567',
    date: 'Hôm qua, 12:30 PM',
    amount: 2000000,
    status: 'Completed',
  },
  {
    id: 3,
    type: 'Transfer',
    account: '3456 7890 1234 5678',
    date: '25/10/2023',
    amount: 15000000,
    status: 'Completed',
  },
]; 