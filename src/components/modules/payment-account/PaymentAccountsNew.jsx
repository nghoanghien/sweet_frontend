'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sampleAccounts } from '../../../data/sampleData';
import { formatCurrency } from '../../../utils/accountUtils';

// Import các component con từ file index.js
import {
  LoadingState,
} from '../../ui';

import AccountCard from './components/AccountCard';
import AccountHeader from "./components/AccountHeader";
import EmptyAccountState from "../ui/EmptyAccountState";

// Import các modal và drawer
import AccountDetailDrawer from './components/AccountDetailDrawer';
import SwipeConfirmationModal from '../../modals/ConfirmationModal/SwipeConfirmationModal';
import ExportNotification from '../../common/ExportNotification';

// Dữ liệu mẫu cho giao dịch
const sampleTransactions = [
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

// Ẩn số tài khoản
const maskAccountNumber = (accountNumber) => {
  if (!accountNumber) return '';
  const lastFourDigits = accountNumber.slice(-4);
  return '•••• •••• •••• ' + lastFourDigits;
};

const PaymentAccountsNew = ({ customerId }) => {
  // State cho việc hiển thị/ẩn thông tin nhạy cảm
  const [hideAllSensitiveInfo, setHideAllSensitiveInfo] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // State cho việc ẩn/hiện thông tin nhạy cảm của từng tài khoản
  const [hiddenAccounts, setHiddenAccounts] = useState({});
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  
  // State cho modal và drawer
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [isLockConfirmModalOpen, setIsLockConfirmModalOpen] = useState(false);
  const [lockConfirmData, setLockConfirmData] = useState({ accountId: null, isLocking: false });
  const [isProcessing, setIsProcessing] = useState(false);
  
  // State cho notification
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('success');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationFormat, setNotificationFormat] = useState('');
  
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
  
  // Toggle ẩn/hiện thông tin nhạy cảm cho một tài khoản cụ thể
  const toggleHideAccountInfo = (accountId) => {
    setHiddenAccounts(prev => ({
      ...prev,
      [accountId]: !prev[accountId]
    }));
  };
  
  // Hàm toggle hiển thị/ẩn thông tin tài khoản (cho phù hợp với thiết kế mới)
  const toggleAccountVisibility = (accountId) => {
    toggleHideAccountInfo(accountId);
  };
  
  // Hàm toggle trạng thái khóa/mở khóa tài khoản (cho phù hợp với thiết kế mới)
  const toggleAccountStatus = (accountId) => {
    const account = accounts.find(acc => acc.id === accountId);
    if (!account || account.status === 'permanent_locked') return;
    
    const isLocking = account.status === 'active';
    handleLockToggle(accountId, isLocking);
  };
  
  // Hàm mở drawer chi tiết giao dịch tài khoản
  const openTransactionDrawer = (accountId) => {
    const account = accounts.find(acc => acc.id === accountId);
    if (!account) return;
    
    setSelectedAccount(account);
    setIsDetailDrawerOpen(true);
  };
  
  // Cập nhật trạng thái ẩn của tất cả tài khoản khi toggle tất cả
  useEffect(() => {
    if (accounts.length > 0) {
      setHiddenAccounts(prev => {
        const newState = { ...prev };
        accounts.forEach(account => {
          newState[account.id] = hideAllSensitiveInfo;
        });
        return newState;
      });
    }
  }, [hideAllSensitiveInfo, accounts]);

  // Giả lập việc lấy dữ liệu từ API dựa trên customerId
  useEffect(() => {
    const fetchData = async () => {
      // Trong thực tế, bạn sẽ gọi API ở đây với customerId
      // Ví dụ: const response = await fetch(`/api/customers/${customerId}/accounts`);
      
      // Giả lập độ trễ của mạng
      setTimeout(() => {
        setAccounts(sampleAccounts);
        setIsLoading(false);
      }, 800);
    };

    fetchData();
  }, [customerId]);

  // Tính tổng số dư và số tài khoản
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  const activeAccountsCount = accounts.filter(account => account.status === 'active').length;

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
        account.type.toLowerCase().includes(query) || 
        account.description.toLowerCase().includes(query) || 
        account.accountNumber.includes(query)
      );
      setFilteredAccounts(filtered);
    }
  }, [searchQuery, accounts]);

  // Xử lý khóa/mở khóa tài khoản
  const handleLockToggle = (accountId, isLocked) => {
    // Hiển thị modal xác nhận trước khi thực hiện hành động
    setLockConfirmData({ accountId, isLocking: isLocked });
    setIsLockConfirmModalOpen(true);
  };

  // Xử lý xác nhận khóa/mở khóa
  const confirmLockToggle = () => {
    try {
      const { accountId, isLocking } = lockConfirmData;
      console.log(`${isLocking ? 'Khóa' : 'Mở khóa'} tài khoản ${accountId}`);
      
      // Set processing state
      setIsProcessing(true);
      
      // Tìm thông tin tài khoản để hiển thị trong thông báo
      const account = accounts.find(acc => acc.id === accountId);
      
      // Xử lý sau một khoảng thời gian ngắn để hiển thị trạng thái đang xử lý
      setTimeout(() => {
        // Cập nhật trạng thái tài khoản trong state
        setAccounts(prevAccounts => 
          prevAccounts.map(account => 
            account.id === accountId 
              ? { ...account, status: isLocking ? 'locked' : 'active' } 
              : account
          )
        );
        
        // Hiển thị thông báo thành công
        setNotificationType('success');
        setNotificationMessage(`
          ${isLocking ? 'Khóa' : 'Mở khóa'} tài khoản thành công`
        );
        setNotificationFormat(`
          ${isLocking ? 'Khóa' : 'Mở khóa'} tài khoản ${account ? account.accountNumber : ''} thành công`
        );
        setShowNotification(true);
        
        // Đóng modal và reset trạng thái xử lý
        setIsLockConfirmModalOpen(false);
        setIsProcessing(false);
        
        // Trong thực tế, bạn sẽ gọi API để cập nhật trạng thái khóa của tài khoản
        // Ví dụ: await fetch(`/api/accounts/${accountId}/toggle-lock`, { method: 'POST', body: JSON.stringify({ locked: isLocking }) });
      }, 2000);
    } catch (error) {
      // Hiển thị thông báo lỗi nếu có lỗi xảy ra
      setNotificationType('error');
      setNotificationMessage(`Có lỗi xảy ra khi ${lockConfirmData.isLocking ? 'khóa' : 'mở khóa'} tài khoản. Vui lòng thử lại sau.`);
      setNotificationFormat(`Có lỗi xảy ra khi ${lockConfirmData.isLocking ? 'khóa' : 'mở khóa'} tài khoản. Vui lòng thử lại sau.`);
      setShowNotification(true);
      
      // Reset trạng thái xử lý
      setIsProcessing(false);
    }
  };
  
  // Xử lý xem chi tiết tài khoản
  const handleViewAccountDetail = (account) => {
    setSelectedAccount(account);
    setIsDetailDrawerOpen(true);
  };

  if (isLoading) {
    return <LoadingState />;
  }

  // Hiển thị khi không có tài khoản nào
  if (accounts.length === 0) {
    return <EmptyAccountState />;
  }

  return (
    <div className="h-full overflow-y-auto bg-gray-50 py-0 p-4 rounded-lg">
      {/* Header với thông tin tổng quan */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <AccountHeader 
          accounts={accounts}
          totalBalance={totalBalance}
          hideAllSensitiveInfo={hideAllSensitiveInfo}
          toggleAllSensitiveInfo={toggleAllSensitiveInfo}
          formatCurrency={formatCurrency}
          onCreateAccountClick={() => setIsNewAccountModalOpen(true)}
        />
      </motion.div>

      {/* Nội dung chính - danh sách tài khoản */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="transition-all duration-300"
      >
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-10 ${viewMode !== 'grid' ? 'hidden' : ''}`}>
          {filteredAccounts.map((account, index) => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="h-full"
            >
              <AccountCard
                account={account}
                isHidden={hiddenAccounts[account.id]}
                onToggleHide={toggleAccountVisibility}
                onLockToggle={toggleAccountStatus}
                onViewDetail={() => openTransactionDrawer(account.id)}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Drawer chi tiết tài khoản */}
      <AccountDetailDrawer
        isOpen={isDetailDrawerOpen}
        onClose={() => setIsDetailDrawerOpen(false)}
        account={selectedAccount}
        onToggleHide={toggleAccountVisibility}
        onLockToggle={toggleAccountStatus}
        onUpdateAccount={(updatedAccount) => {
          // Update the account in the accounts array
          setAccounts(prevAccounts => 
            prevAccounts.map(account => 
              account.id === updatedAccount.id ? updatedAccount : account
            )
          );
        }}
      />
      
      {/* Modal xác nhận khóa/mở khóa */}
      <SwipeConfirmationModal
        isOpen={isLockConfirmModalOpen}
        onClose={() => setIsLockConfirmModalOpen(false)}
        onConfirm={confirmLockToggle}
        title={lockConfirmData.isLocking ? 'Xác nhận khóa tài khoản' : 'Xác nhận mở khóa tài khoản'}
        description={lockConfirmData.isLocking 
          ? 'Khi khóa tài khoản, mọi giao dịch sẽ bị tạm dừng cho đến khi tài khoản được mở khóa.' 
          : 'Khi mở khóa tài khoản, tài khoản sẽ hoạt động bình thường trở lại.'}
        confirmText={lockConfirmData.isLocking ? 'Vuốt để khóa tài khoản' : 'Vuốt để mở khóa tài khoản'}
        type={lockConfirmData.isLocking ? 'warning' : 'unlock'}
        isProcessing={isProcessing}
      />
      
      {/* Notification */}
      <ExportNotification
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
        format={notificationFormat}
        message={notificationMessage}
        autoHideDuration={5000}
        position="bottom-center"
        type={notificationType}
      />

      {/* CSS cho animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
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
        
        .tooltip-lock {
          transition: opacity 0.3s, visibility 0.3s, transform 0.3s;
        }
        
        .lock-button:hover + .tooltip-lock {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default PaymentAccountsNew;