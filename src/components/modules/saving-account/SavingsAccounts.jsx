'use client';

import React, { useState, useEffect } from 'react';
import {
  PiggyBank,
  Plus,
  Eye,
  EyeOff,
  Calendar,
  DollarSign,
  TrendingUp
} from 'lucide-react';

import { formatCurrency } from '@/utils/accountUtils';
import { formatDate } from '@/utils/saving-account';
import ExportNotification from '../../common/ExportNotification';

// Import các component con từ file index.js
import PlaceholderShimmer from '../../ui/custom/PlaceholderShimmer';
import { SkeletonCard } from '../../ui/custom/Skeleton';

import EmptyAccountState from '../ui/EmptyAccountState';
import EmptySearchResult from './ui/EmptySearchResult';
import SearchAndViewToggle from './ui/SearchAndViewToggle';

// Import các modal và drawer
import NewSavingsAccountModal from '../create-new-saving-account/NewSavingsAccountModal';
import { SavingsAccountDetailDrawer } from './components';
import SwipeConfirmationModal from '../../modals/ConfirmationModal/SwipeConfirmationModal';
import { AnimatePresence, motion } from 'framer-motion';

// Dữ liệu mẫu cho tài khoản tiết kiệm
const sampleSavingsAccounts = [
  {
    id: 1,
    nickname: "Tiết kiệm mua nhà",
    depositNumber: "TK2023050001",
    term: "12 tháng",
    termDays: 365,
    amount: 200000000,
    remainingAmount: 0,
    interestRate: 6.8,
    startDate: "15/05/2023",
    endDate: "15/05/2024",
    daysRemaining: 120,
    accountNumber: "TK0987654321",
    depositType: "Tiền gửi tiêu chuẩn",
    interestFrequency: "Cuối kỳ",
    maturityOption: "Tự động tái tục gốc",
    receivedInterest: 2500000,
    totalReceivable: 213600000,
    color: "bg-gradient-to-r from-blue-400 to-indigo-500",
    iconColor: 'text-blue-600',
    status: "active",
    tooltip: "Lãi suất ưu đãi +0.3%"
  },
  {
    id: 2,
    nickname: "Tiết kiệm du học",
    depositNumber: "TK2023060002",
    term: "6 tháng",
    termDays: 180,
    amount: 150000000,
    remainingAmount: 150000000,
    interestRate: 5.5,
    startDate: "10/06/2023",
    endDate: "07/12/2023",
    daysRemaining: 30,
    accountNumber: "TK1234509876",
    depositType: "Rút gốc linh hoạt",
    interestFrequency: "Hàng tháng",
    maturityOption: "Chuyển gốc và lãi sang TKTG",
    receivedInterest: 3437500,
    totalReceivable: 153437500,
    color: "bg-gradient-to-r from-pink-400 to-purple-500",
    iconColor: 'text-pink-600',
    status: "active"
  },
  {
    id: 3,
    nickname: "Tiết kiệm tương lai",
    depositNumber: "TK2023070003",
    term: "24 tháng",
    termDays: 730,
    amount: 300000000,
    remainingAmount: 300000000,
    interestRate: 7.1,
    startDate: "05/07/2023",
    endDate: "05/07/2025",
    daysRemaining: 540,
    accountNumber: "TK5432167890",
    depositType: "Tiền gửi tiêu chuẩn",
    interestFrequency: "Hàng quý",
    maturityOption: "Chuyển gốc và lãi sang TKTG",
    receivedInterest: 5325000,
    totalReceivable: 342600000,
    color: "bg-gradient-to-r from-green-400 to-teal-500",
    iconColor: 'text-green-600',
    status: "active",
    tooltip: "VIP - Miễn phí rút tiền trước hạn"
  }
];

// Dữ liệu mẫu cho giao dịch tiết kiệm
const sampleSavingsTransactions = {
  1: [
    {
      id: 1,
      time: "15:30 - 15/05/2023",
      type: "Gửi tiền",
      channel: "Internet Banking",
      amount: 200000000,
      content: "Gửi tiền tiết kiệm kỳ hạn 12 tháng",
      isDeposit: true,
      interestAmount: 0,
      balanceAfter: 200000000
    },
    {
      id: 2,
      time: "16:45 - 15/05/2023",
      type: "Xác nhận mở sổ",
      channel: "Hệ thống",
      amount: 0,
      content: "Xác nhận mở sổ tiết kiệm thành công",
      isSystem: true,
      interestAmount: 0,
      balanceAfter: 200000000
    },
    {
      id: 3,
      time: "16:45 - 15/05/2023",
      type: "Xác nhận mở sổ",
      channel: "Hệ thống",
      amount: 0,
      content: "Xác nhận mở sổ tiết kiệm thành công",
      isSystem: true,
      interestAmount: 0,
      balanceAfter: 200000000
    },
    {
      id: 4,
      time: "16:45 - 15/05/2023",
      type: "Xác nhận mở sổ",
      channel: "Hệ thống",
      amount: 0,
      content: "Xác nhận mở sổ tiết kiệm thành công",
      isSystem: true,
      interestAmount: 0,
      balanceAfter: 200000000
    },
    {
      id: 5,
      time: "16:45 - 15/05/2023",
      type: "Xác nhận mở sổ",
      channel: "Hệ thống",
      amount: 0,
      content: "Xác nhận mở sổ tiết kiệm thành công",
      isSystem: true,
      interestAmount: 0,
      balanceAfter: 200000000
    }
  ],
  2: [
    {
      id: 1,
      time: "10:15 - 10/06/2023",
      type: "Gửi tiền",
      channel: "Quầy giao dịch",
      amount: 150000000,
      content: "Gửi tiền tiết kiệm kỳ hạn 6 tháng",
      isDeposit: true,
      interestAmount: 0,
      balanceAfter: 150000000
    },
    {
      id: 2,
      time: "11:20 - 10/06/2023",
      type: "Xác nhận mở sổ",
      channel: "Hệ thống",
      amount: 0,
      content: "Xác nhận mở sổ tiết kiệm thành công",
      isSystem: true,
      interestAmount: 0,
      balanceAfter: 150000000
    },
    {
      id: 3,
      time: "09:45 - 10/07/2023",
      type: "Trả lãi",
      channel: "Hệ thống",
      amount: 150000000,
      content: "Trả lãi tiền gửi tiết kiệm kỳ 1",
      isInterest: true,
      interestAmount: 687500,
      balanceAfter: 150000000
    }
  ],
  3: [
    {
      id: 1,
      time: "14:20 - 05/07/2023",
      type: "Gửi tiền",
      channel: "Mobile Banking",
      amount: 300000000,
      content: "Gửi tiền tiết kiệm kỳ hạn 24 tháng",
      isDeposit: true,
      interestAmount: 0,
      balanceAfter: 300000000
    },
    {
      id: 2,
      time: "14:35 - 05/07/2023",
      type: "Xác nhận mở sổ",
      channel: "Hệ thống",
      amount: 0,
      content: "Xác nhận mở sổ tiết kiệm thành công",
      isSystem: true,
      interestAmount: 0,
      balanceAfter: 300000000
    }
  ]
};

// Dữ liệu mẫu cho lịch sử lãi
const sampleInterestHistory = {
  1: [],
  2: [
    {
      id: 1,
      period: "Kỳ 1",
      date: "10/07/2023",
      amount: 687500,
      method: "Chuyển vào tài khoản thanh toán",
      status: "Đã thanh toán",
      targetAccount: "12345678901"
    },
    {
      id: 2,
      period: "Kỳ 2",
      date: "10/08/2023",
      amount: 687500,
      method: "Chuyển vào tài khoản thanh toán",
      status: "Đã thanh toán",
      targetAccount: "12345678901"
    }
  ],
  3: [
    {
      id: 1,
      period: "Quý 1",
      date: "05/10/2023",
      amount: 5325000,
      method: "Chuyển vào tài khoản thanh toán",
      status: "Đã thanh toán",
      targetAccount: "98765432109"
    }
  ]
};

// Dữ liệu mẫu cho lịch sử rút tiền
const sampleWithdrawalHistory = {
  1: [],
  2: [
    {
      id: 1,
      time: "14:30 - 15/09/2023",
      withdrawnAmount: 50000000,
      interestAmount: 458333,
      remainingBalance: 100000000,
      isPartial: true,
      channel: "Internet Banking",
      status: "Thành công"
    }
  ],
  3: []
};

// Mảng màu gradient cho tài khoản
const accountColors = [
  "bg-gradient-to-r from-blue-400 to-indigo-500",
  "bg-gradient-to-r from-pink-400 to-purple-500",
  "bg-gradient-to-r from-green-400 to-teal-500",
  "bg-gradient-to-r from-amber-400 to-orange-500",
  "bg-gradient-to-r from-red-400 to-rose-500",
  "bg-gradient-to-r from-sky-400 to-blue-500",
  "bg-gradient-to-r from-violet-400 to-purple-500",
  "bg-gradient-to-r from-emerald-400 to-green-500"
];

// Tính tiến độ kỳ hạn
const calculateTermProgress = (daysRemaining, termDays) => {
  // Reverse the logic: more days remaining means more progress (longer colored bar)
  const progressPercentage = Math.min(100, Math.max(0, (daysRemaining / termDays) * 100));
  return progressPercentage;
};

// Component SavingsAccounts
const SavingsAccounts = ({ customerId }) => {
  // State cho việc hiển thị/ẩn thông tin nhạy cảm
  const [hideAllSensitiveInfo, setHideAllSensitiveInfo] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // State cho việc ẩn/hiện thông tin nhạy cảm của từng tài khoản
  const [hiddenAccounts, setHiddenAccounts] = useState({});
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  
  // State cho thông báo
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationFormat, setNotificationFormat] = useState('');
  
  // State cho modal và drawer
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [isCreateConfirmModalOpen, setIsCreateConfirmModalOpen] = useState(false);
  const [newAccountData, setNewAccountData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // State cho lịch sử giao dịch, lãi và rút tiền
  const [accountTransactions, setAccountTransactions] = useState({});
  const [accountInterestHistory, setAccountInterestHistory] = useState({});
  const [accountWithdrawalHistory, setAccountWithdrawalHistory] = useState({});
  
  // Khởi tạo trạng thái ẩn cho tất cả tài khoản
  useEffect(() => {
    if (accounts.length > 0) {
      const initialHiddenState = accounts.reduce((acc, account) => {
        acc[account.id] = hideAllSensitiveInfo;
        return acc;
      }, {});
      setHiddenAccounts(initialHiddenState);
    }
  }, [accounts, hideAllSensitiveInfo]);

  // Thêm event listeners cho việc rút tiền
  useEffect(() => {
    console.log('useEffect cho event listeners được gọi lại, accounts:', accounts);
    // Xử lý sự kiện rút toàn bộ tiền
    const handleFullWithdrawal = (event) => {
      console.log('Sự kiện rút toàn bộ tiền được kích hoạt:', event.detail);
      const { accountId } = event.detail;
      
      // Tìm tài khoản để cập nhật và hiển thị thông báo
      const accountToUpdate = accounts.find(account => account.id === accountId);
      console.log('Tài khoản cần cập nhật:', accountToUpdate);
      
      // Cập nhật tài khoản thành trạng thái đóng và remainingAmount = 0
      setAccounts(prevAccounts => 
        prevAccounts.map(account => 
          account.id === accountId 
            ? { ...account, status: 'closed', remainingAmount: 0 } 
            : account
        )
      );
      
      // Hiển thị thông báo
      if (accountToUpdate) {
        setNotificationMessage(`Rút tiền thành công`);
        setNotificationFormat(`Rút toàn bộ tiền từ TK tiết kiệm "${accountToUpdate.nickname}" thành công: ${formatCurrency(accountToUpdate.amount)}`);
        setNotificationVisible(true);
        console.log('Đã hiển thị thông báo rút toàn bộ tiền');
      } else {
        console.log('Không tìm thấy tài khoản để hiển thị thông báo');
      }
    };
    
    // Xử lý sự kiện rút một phần tiền
    const handlePartialWithdrawal = (event) => {
      console.log('Sự kiện rút một phần tiền được kích hoạt:', event.detail);
      const { accountId, updatedAccount, transaction } = event.detail;
      
      // Cập nhật tài khoản
      setAccounts(prevAccounts => 
        prevAccounts.map(account => 
          account.id === accountId ? updatedAccount : account
        )
      );
      
      // Cập nhật lịch sử rút tiền
      setAccountWithdrawalHistory(prev => ({
        ...prev,
        [accountId]: [...(prev[accountId] || []), transaction]
      }));
      
      // Hiển thị thông báo
      setNotificationMessage(`Rút tiền thành công`);
      setNotificationFormat(`Rút tiền từ TK tiết kiệm "${updatedAccount.nickname}" thành công: ${formatCurrency(transaction.withdrawnAmount)}`);
      setNotificationVisible(true);
      console.log('Đã hiển thị thông báo rút một phần tiền');
    };
    
    // Đăng ký event listeners
    window.addEventListener('accountFullyWithdrawn', handleFullWithdrawal);
    window.addEventListener('accountPartiallyWithdrawn', handlePartialWithdrawal);
    
    // Cung cấp các hàm callback cho các component con
    window.removeAccount = (accountId) => {
      setAccounts(prevAccounts => 
        prevAccounts.filter(account => account.id !== accountId)
      );
    };
    
    window.updateAccount = (updatedAccount) => {
      setAccounts(prevAccounts => 
        prevAccounts.map(account => 
          account.id === updatedAccount.id ? updatedAccount : account
        )
      );
    };
    
    // Cleanup
    return () => {
      window.removeEventListener('accountFullyWithdrawn', handleFullWithdrawal);
      window.removeEventListener('accountPartiallyWithdrawn', handlePartialWithdrawal);
      delete window.removeAccount;
      delete window.updateAccount;
    };
  }, [accounts]); // Thêm accounts vào dependency array để cập nhật event handlers khi accounts thay đổi
  
  // Toggle ẩn/hiện thông tin nhạy cảm cho một tài khoản cụ thể
  const toggleHideAccountInfo = (accountId) => {
    setHiddenAccounts(prev => ({
      ...prev,
      [accountId]: !prev[accountId]
    }));
  };
  
  // Hàm mở drawer chi tiết tài khoản tiết kiệm
  const openSavingsDetailDrawer = (accountId) => {
    

    const account = accounts.find(acc => acc.id === accountId);
    if (!account) return;
    
    // Lấy lịch sử giao dịch, lãi và rút tiền cho tài khoản này
    const accountTxns = accountTransactions[accountId] || sampleSavingsTransactions[accountId] || [];
    const accountInterest = accountInterestHistory[accountId] || sampleInterestHistory[accountId] || [];
    const accountWithdrawals = accountWithdrawalHistory[accountId] || sampleWithdrawalHistory[accountId] || [];
    
    setSelectedAccount(account);
    setIsDetailDrawerOpen(true);

    setAccountTransactions(sampleSavingsTransactions);
    setAccountInterestHistory(sampleInterestHistory);
    setAccountWithdrawalHistory(sampleWithdrawalHistory);
  };
  
  // Giả lập việc lấy dữ liệu từ API dựa trên customerId
  useEffect(() => {
    const fetchData = async () => {
      // Trong thực tế, bạn sẽ gọi API ở đây với customerId
      // Ví dụ: const response = await fetch(`/api/customers/${customerId}/savings-accounts`);
      
      // Giả lập độ trễ của mạng
      setTimeout(() => {
        setAccounts(sampleSavingsAccounts);
        setIsLoading(false);
      }, 800);
    };

    fetchData();
  }, [customerId]);

  // Tính tổng số dư và số tài khoản
  const totalDeposit = accounts.reduce((sum, account) => sum + account.amount, 0);
  const totalInterest = accounts.reduce((sum, account) => sum + (account.totalReceivable - account.amount), 0);
  const activeAccountsCount = accounts.length;

  // Toggle ẩn/hiện tất cả thông tin nhạy cảm
  const toggleAllSensitiveInfo = () => {
    setHideAllSensitiveInfo(!hideAllSensitiveInfo);
  };

  // Lọc tài khoản dựa trên từ khóa tìm kiếm
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredAccounts(accounts);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = accounts.filter(account => 
        account.nickname.toLowerCase().includes(query) || 
        account.depositNumber.toLowerCase().includes(query) || 
        account.term.toLowerCase().includes(query) ||
        account.depositType.toLowerCase().includes(query)
      );
      setFilteredAccounts(filtered);
    }
  }, [searchQuery, accounts]);
  
  // Chuẩn bị tài khoản mới và hiển thị modal xác nhận
  const prepareNewAccount = (formData, calculatedInterest) => {
    // Tạo tài khoản mới với ID ngẫu nhiên
    const randomColor = accountColors[Math.floor(Math.random() * accountColors.length)];
    
    // Map term từ "12_months" sang "12 tháng"
    const termDisplayNames = {
      "1_month": "1 tháng",
      "3_months": "3 tháng",
      "6_months": "6 tháng",
      "9_months": "9 tháng",
      "12_months": "12 tháng",
      "18_months": "18 tháng",
      "24_months": "24 tháng",
      "36_months": "36 tháng"
    };
    
    // Chuyển đổi term từ định dạng "12_months" sang "12 tháng"
    const termDisplay = termDisplayNames[formData.term] || formData.term;
    
    // Tính ngày đáo hạn dựa trên kỳ hạn
    const startDate = new Date();
    let endDate = new Date(startDate);
    let termDays = 0;
    
    // Xử lý term để lấy số tháng
    let termMonths = 0;
    if (formData.term === '1_month') {
      termMonths = 1;
    } else {
      // Lấy số từ chuỗi như "12_months" -> 12
      const match = formData.term.match(/^(\d+)_/);
      if (match && match[1]) {
        termMonths = parseInt(match[1]);
      }
    }
    
    // Tính ngày đáo hạn
    endDate.setMonth(endDate.getMonth() + termMonths);
    
    // Tính số ngày dựa trên số tháng
    if (termMonths === 1) termDays = 30;
    else if (termMonths === 3) termDays = 90;
    else if (termMonths === 6) termDays = 180;
    else if (termMonths === 9) termDays = 270;
    else if (termMonths === 12) termDays = 365;
    else if (termMonths === 18) termDays = 540;
    else if (termMonths === 24) termDays = 730;
    else if (termMonths === 36) termDays = 1095;
    
    // Format dates
    const formatDate = (date) => {
      return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    };
    
    // Tính lãi dự kiến
    const amount = parseFloat(formData.amount);
    const interestRate = parseFloat(formData.interestRate);
    const expectedInterest = (amount * interestRate * termDays / 365) / 100;
    
    // Chuyển đổi depositType từ "standard" sang "Tiền gửi tiêu chuẩn"
    const depositTypeDisplay = formData.depositType === 'standard' ? 'Tiền gửi tiêu chuẩn' : 'Rút gốc linh hoạt';
    
    // Chuyển đổi interestPaymentType từ "end_of_term" sang "Cuối kỳ"
    const interestFrequencyMap = {
      "end_of_term": "Cuối kỳ",
      "monthly": "Hàng tháng",
      "quarterly": "Hàng quý",
      "yearly": "Đầu kỳ"
    };
    
    // Chuyển đổi maturityOption
    const maturityOptionMap = {
      "receive_all": "Nhận cả gốc và lãi",
      "rollover_principal": "Tự động tái tục gốc",
      "rollover_all": "Tự động tái tục gốc và lãi"
    };
    
    const newAccount = {
      id: `acc_${Date.now()}`,
      nickname: formData.nickname,
      depositNumber: `TK${Date.now().toString().slice(-8)}`,
      term: termDisplay,
      termDays: termDays,
      amount: amount,
      interestRate: interestRate,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      daysRemaining: termDays,
      accountNumber: `TK${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      depositType: depositTypeDisplay,
      interestFrequency: interestFrequencyMap[formData.interestPaymentType] || "Cuối kỳ",
      maturityOption: maturityOptionMap[formData.maturityOption] || "Tự động tái tục gốc",
      receivedInterest: 0,
      totalReceivable: amount + expectedInterest,
      color: randomColor,
      status: 'active',
      icon: <PiggyBank size={24} className="text-white" />
    };
    
    // Lưu dữ liệu tài khoản mới và hiển thị modal xác nhận
    setNewAccountData(newAccount);
    setIsNewAccountModalOpen(false);
    setIsCreateConfirmModalOpen(true);
  };
  
  // Xử lý tạo tài khoản mới sau khi xác nhận
  const handleCreateAccount = () => {
    if (!newAccountData) return;
    
    // Bắt đầu xử lý
    setIsProcessing(true);
    
    // Giả lập thời gian xử lý API
    setTimeout(() => {
      try {
        // Thêm tài khoản mới vào danh sách
        setAccounts(prevAccounts => [...prevAccounts, newAccountData]);
        
        // Hiển thị thông báo thành công
        setNotificationMessage(`Gửi tiết kiệm thành công`);
        setNotificationFormat(`Sổ tiết kiệm "${newAccountData.nickname}" đã được mở thành công với số tiền ${formatCurrency(newAccountData.amount)}.`);
        setNotificationVisible(true);
        
        // Đóng modal xác nhận
        setIsCreateConfirmModalOpen(false);
        setNewAccountData(null);
      } catch (error) {
        console.error("Lỗi khi tạo tài khoản:", error);
      } finally {
        // Kết thúc xử lý
        setIsProcessing(false);
      }
    }, 1500); // Giả lập độ trễ 1.5 giây
  };
  
  // Xử lý đóng thông báo
  const handleCloseNotification = () => {
    setNotificationVisible(false);
  };

  // Hiển thị khi không có tài khoản nào và không đang loading
  if (!isLoading && accounts.length === 0) {
    return <EmptyAccountState />;
  }

  return (
    <motion.div 
      className="h-full overflow-y-auto bg-gray-50 py-0 p-4 rounded-lg"
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Header với thông tin tổng quan */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
      >
        <div className="flex flex-col w-full gap-3 md:flex-row md:items-center md:justify-between pt-4">
          {/* Thẻ thống kê bên trái */}
          {isLoading ? (
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <SkeletonCard width="w-64" height="h-20" />
              <SkeletonCard width="w-64" height="h-20" />
              <SkeletonCard width="w-64" height="h-20" />
            </motion.div>
          ) : (
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, staggerChildren: 0.1 }}
            >
              {/* Tổng số tài khoản */}
              <motion.div 
                className="relative group bg-white/90 backdrop-blur-xl p-4 rounded-3xl shadow-lg border border-indigo-200/50 flex items-center space-x-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-200/30 to-blue-200/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 pointer-events-none"></div>
                <motion.div 
                  className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <PiggyBank size={20} className="text-white" />
                </motion.div>
                <div className="relative">
                  <p className="text-xs text-slate-500 font-medium mb-1">
                    Tổng số tài khoản
                  </p>
                  <motion.p 
                    className="text-base font-bold text-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    {activeAccountsCount} tài khoản
                  </motion.p>
                </div>
              </motion.div>

              {/* Tổng tiền gửi */}
              <motion.div 
                className="relative group bg-white/90 backdrop-blur-xl p-4 rounded-3xl shadow-lg border border-green-200/50 flex items-center space-x-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-200/30 to-emerald-200/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 pointer-events-none"></div>
                <motion.div 
                  className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <DollarSign size={20} className="text-white" />
                </motion.div>
                <div className="relative">
                  <p className="text-xs text-slate-500 font-medium mb-1">
                    Tổng tiền gửi
                  </p>
                  <motion.p 
                    className="text-base font-bold text-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    {hideAllSensitiveInfo
                      ? "••••••••"
                      : formatCurrency(totalDeposit)}
                  </motion.p>
                </div>
              </motion.div>

              {/* Tổng tiền lãi dự kiến */}
              <motion.div 
                className="relative group bg-white/90 backdrop-blur-xl p-4 rounded-3xl shadow-lg border border-blue-200/50 flex items-center space-x-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 to-cyan-200/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 pointer-events-none"></div>
                <motion.div 
                  className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <TrendingUp size={20} className="text-white" />
                </motion.div>
                <div className="relative">
                  <p className="text-xs text-slate-500 font-medium mb-1">
                    Tổng tiền lãi dự kiến
                  </p>
                  <motion.p 
                    className="text-base font-bold text-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    {hideAllSensitiveInfo
                      ? "••••••••"
                      : formatCurrency(totalInterest)}
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Nút chức năng bên phải */}
          <motion.div 
            className="flex flex-row gap-3 justify-end"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {/* Nút ẩn/hiện */}
            {/* Nút ẩn/hiện */}
            <motion.button
              onClick={toggleAllSensitiveInfo}
              className="relative group bg-gradient-to-r from-cyan-100 via-blue-400 to-blue-100
 backdrop-blur-xl py-3 px-5 rounded-2xl shadow-lg border border-blue-200/50 flex items-center justify-center space-x-2 text-sm font-medium text-gray-700 overflow-hidden"
              whileHover={{
                boxShadow: "0 15px 30px -8px rgba(59, 130, 246, 0.25)",
                y: -2,
                scale: 1.02,
              }}
              whileTap={{ scale: 0.98 }}
              transition={{
                duration: 0.2,
                type: "spring",
                stiffness: 400,
                damping: 25,
              }}
            >
              {/* Nền loang màu nhạt bên trong */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-transparent to-indigo-100/40 opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 to-indigo-200/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 pointer-events-none"></div>

              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-md">
                {hideAllSensitiveInfo ? (
                  <Eye size={14} className="text-white" />
                ) : (
                  <EyeOff size={14} className="text-white" />
                )}
              </div>
              <span className="relative font-semibold text-md text-blue-700">
                {hideAllSensitiveInfo ? "Hiện tất cả" : "Ẩn tất cả"}
              </span>
            </motion.button>

            {/* Nút mở sổ mới */}
            <AnimatePresence>
              <motion.button
                onClick={() => setIsNewAccountModalOpen(true)}
                className="relative group bg-gradient-to-r from-pink-100 via-pink-300 to-rose-100 backdrop-blur-xl py-3 px-5 rounded-2xl shadow-lg border border-pink-200 flex items-center justify-center space-x-2 text-sm font-medium text-gray-700 overflow-hidden"
                whileHover={{
                  boxShadow: "0 15px 30px -8px rgba(236, 72, 153, 0.25)",
                  y: -2,
                  scale: 1.02,
                }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                layoutId="savings-account-modal"
              >
                {/* Nền loang màu nhạt bên trong */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-100/40 via-transparent to-rose-100/40 opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-200/20 to-rose-200/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 pointer-events-none"></div>

                <motion.div
                  className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-md"
                  layoutId="savings-icon"
                >
                  <Plus size={14} className="text-white" />
                </motion.div>
                <motion.span
                  layoutId="savings-title"
                  className="relative text-rose-600 text-md font-semibold"
                >
                  Mở tiết kiệm
                </motion.span>
              </motion.button>
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>

      {/* Thanh tìm kiếm và chuyển đổi chế độ xem */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <SearchAndViewToggle
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      </motion.div>

      {/* Hiển thị khi không có kết quả tìm kiếm */}
      <AnimatePresence>
        {!isLoading && filteredAccounts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
          >
            <EmptySearchResult searchQuery={searchQuery} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nội dung chính - danh sách tài khoản */}
      <div className="transition-all duration-300">
        {/* Grid view */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-10 ${
            viewMode !== "grid" ? "hidden" : ""
          }`}
        >
          {isLoading ? (
            <PlaceholderShimmer 
              type="grid-card" 
              count={4}
              className="col-span-full"
              animate={false}
            />
          ) : 
            filteredAccounts.map((account) => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              layoutId={`savings-account-card-${account.id}`}
              transition={{
                duration: 0.2,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openSavingsDetailDrawer(account.id)}
              className="bg-white backdrop-blur-md rounded-3xl shadow-md hover:shadow-lg overflow-hidden account-card group"
            >
              <div
                className={`p-5 ${account.color} relative overflow-hidden group-hover:shadow-lg`}
              >
                {/* Hiệu ứng hover */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 animate-shimmer"></div>

                <div className="flex justify-between items-start relative z-10">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <PiggyBank size={24} className="text-white" />
                    </div>
                    <div className="text-white">
                      <h3 className="font-medium text-sm group-hover:text-white/95">
                        {account.nickname}
                      </h3>
                      <p className="text-xs text-white/80 font-mono tracking-wide group-hover:text-white">
                        {account.depositNumber}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    {/* Eye toggle button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleHideAccountInfo(account.id);
                      }}
                      className="rounded-full p-1.5 bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:rotate-12 hover:scale-110"
                      aria-label={
                        hiddenAccounts[account.id]
                          ? "Hiển thị thông tin"
                          : "Ẩn thông tin"
                      }
                    >
                      {hiddenAccounts[account.id] ? (
                        <EyeOff size={16} className="text-white" />
                      ) : (
                        <Eye size={16} className="text-white" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 relative overflow-hidden group-hover:bg-gradient-to-b from-white to-gray-50 transition-all duration-500">
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer-effect opacity-0 group-hover:opacity-100"></div>

                {/* Key information */}
                <div className="grid grid-cols-2 gap-3 mb-4 relative z-10">
                  <div className="flex flex-col">
                    <p className="text-xs text-slate-500 mb-1 group-hover:text-indigo-500 transition-colors duration-300">
                      Kỳ hạn
                    </p>
                    <p className="text-sm font-medium text-slate-800">
                      {account.term}
                    </p>
                  </div>

                  <div className="flex flex-col">
                    <p className="text-xs text-slate-500 mb-1 group-hover:text-indigo-500 transition-colors duration-300">
                      Số tiền gửi
                    </p>
                    <p className="text-sm font-medium text-slate-800">
                      {hiddenAccounts[account.id] ? (
                        <span className="text-slate-400">••••••••</span>
                      ) : (
                        <span className="animate-fadeIn">
                          {formatCurrency(account.remainingAmount)}
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Tiến trình kỳ hạn */}
                <div className="mb-3 relative z-10">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-600">
                      Ngày đáo hạn: {formatDate(account.endDate)}
                    </span>
                    <span className="text-indigo-600 font-medium">
                      {account.daysRemaining} ngày nữa
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${account.color}`}
                      style={{
                        width: `${calculateTermProgress(
                          account.daysRemaining,
                          account.termDays
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Bottom info */}
                <div className="border-t border-slate-100 pt-3 flex justify-between items-center relative z-10">
                  <div className="flex items-center space-x-1 text-xs text-slate-500">
                    <Calendar
                      size={12}
                      className="text-slate-400 group-hover:text-slate-500 transition-colors duration-300"
                    />
                    <span className="group-hover:text-slate-600 transition-colors duration-300">
                      {formatDate(account.startDate)}
                    </span>
                  </div>
                  <button
                    onClick={() => openSavingsDetailDrawer(account.id)}
                    className={`${account.color} text-white text-xs font-medium px-4 py-1.5 rounded-full hover:shadow-md transition-all duration-300 transform group-hover:scale-105 hover:translate-y-[-2px]`}
                  >
                    Chi tiết
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* List view */}
        <AnimatePresence>
          {viewMode === "list" && (
            <div className={`space-y-4 mb-6`}>
              {filteredAccounts.map((account) => (
                <motion.div
                  key={account.id}
                  layoutId={`savings-account-card-${account.id}`}
                  transition={{
                    duration: 0.2,
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openSavingsDetailDrawer(account.id)}
                  className="bg-sky-50 border border-sky-100 rounded-xl shadow-sm hover:shadow-md overflow-hidden group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    {/* Left colored section */}
                    <div
                      className={`${account.color} p-4 sm:w-64 flex items-center space-x-3 relative overflow-hidden`}
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 animate-shimmer"></div>

                      <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                        <PiggyBank size={24} className="text-white" />
                      </div>
                      <div className="text-white">
                        <h3 className="font-medium text-sm">
                          {account.nickname}
                        </h3>
                        <p className="text-xs text-white/80 font-mono tracking-wide">
                          {account.depositNumber}
                        </p>
                      </div>
                    </div>

                    {/* Right content section */}
                    <div className="p-4 flex-grow">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        {/* Account details */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          <div>
                            <p className="text-xs text-slate-500 mb-1">
                              Kỳ hạn
                            </p>
                            <p className="text-sm font-medium text-slate-800">
                              {account.term}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-1">
                              Số tiền gửi
                            </p>
                            <p className="text-sm font-medium text-slate-800">
                              {hiddenAccounts[account.id] ? (
                                <span className="text-slate-400">••••••••</span>
                              ) : (
                                formatCurrency(account.amount)
                              )}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-1">
                              Đáo hạn
                            </p>
                            <p className="text-sm font-medium text-slate-800">
                              {formatDate(account.endDate)}
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleHideAccountInfo(account.id);
                            }}
                            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-all"
                          >
                            {hiddenAccounts[account.id] ? (
                              <Eye size={16} className="text-slate-600" />
                            ) : (
                              <EyeOff size={16} className="text-slate-600" />
                            )}
                          </button>
                          <button
                            onClick={() => openSavingsDetailDrawer(account.id)}
                            className={`${account.color} text-white text-xs font-medium px-4 py-2 rounded-full hover:shadow-md transition-all duration-300`}
                          >
                            Chi tiết
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      <NewSavingsAccountModal
        isOpen={isNewAccountModalOpen}
        onClose={() => setIsNewAccountModalOpen(false)}
        onCreateAccount={prepareNewAccount}
        isAdmin={true}
      />

      {/* Drawer chi tiết tài khoản */}
      <SavingsAccountDetailDrawer
        isOpen={isDetailDrawerOpen}
        onClose={() => setIsDetailDrawerOpen(false)}
        account={selectedAccount}
        transactions={
          selectedAccount ? accountTransactions[selectedAccount.id] || [] : []
        }
        interestHistory={
          selectedAccount
            ? accountInterestHistory[selectedAccount.id] || []
            : []
        }
        withdrawalHistory={
          selectedAccount
            ? accountWithdrawalHistory[selectedAccount.id] || []
            : []
        }
        isHidden={selectedAccount ? hiddenAccounts[selectedAccount.id] : true}
        onToggleHide={() =>
          selectedAccount && toggleHideAccountInfo(selectedAccount.id)
        }
      />

      {/* Modal xác nhận tạo tài khoản mới */}
      <SwipeConfirmationModal
        isOpen={isCreateConfirmModalOpen}
        onClose={() => setIsCreateConfirmModalOpen(false)}
        onConfirm={handleCreateAccount}
        title="Xác nhận mở sổ tiết kiệm mới"
        description={`Bạn đang mở sổ tiết kiệm "${newAccountData?.nickname}" với kỳ hạn ${newAccountData?.term}.`}
        confirmText="Vuốt để mở sổ tiết kiệm"
        type="pink"
        isProcessing={isProcessing}
        confirmDetails={
          newAccountData
            ? {
                "Số tiền gửi": formatCurrency(newAccountData.amount),
                "Kỳ hạn": newAccountData.term,
                "Lãi suất": `${newAccountData.interestRate}%/năm`,
                "Tổng tiền nhận dự kiến": formatCurrency(
                  newAccountData.totalReceivable
                ),
              }
            : null
        }
      />

      {/* CSS cho animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .shimmer-effect {
          animation: shimmer 2s infinite;
          background-size: 200% 100%;
        }

        @keyframes numberReveal {
          0% {
            clip-path: inset(0 50% 0 50%);
            opacity: 0;
          }
          100% {
            clip-path: inset(0 0 0 0);
            opacity: 1;
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
          background-size: 200% 100%;
        }

        .account-card {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .account-card:hover {
          transform: translateY(-5px);
        }

        @keyframes fadeInSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeOutSlideDown {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(20px);
          }
        }

        .animate-fadeInSlideUp {
          animation: fadeInSlideUp 0.5s ease-out forwards;
        }

        .animate-fadeOutSlideDown {
          animation: fadeOutSlideDown 0.3s ease-in forwards;
        }

        .card-detail-animate {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .transaction-item {
          transition: all 0.3s ease;
        }

        .transaction-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        .right-panel-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
        }

        .right-panel-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .right-panel-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .right-panel-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
          border-radius: 20px;
        }
      `}</style>

      {/* Thông báo thành công */}
      <ExportNotification
        isVisible={notificationVisible}
        onClose={handleCloseNotification}
        message={notificationMessage}
        format={notificationFormat}
        type="success"
        position="bottom-center"
        autoHideDuration={3000}
      />
    </motion.div>
  );
};

export default SavingsAccounts;
