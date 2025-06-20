'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../../utils/accountUtils';

// Import các component con từ file index.js
import PlaceholderShimmer from "@/components/ui/custom/PlaceholderShimmer";
import { SkeletonCard } from "@/components/ui/custom/Skeleton";

import AccountCard from './components/AccountCard';
import AccountHeader from "./components/AccountHeader";
import EmptyAccountState from "../ui/EmptyAccountState";

// Import các modal và drawer
import AccountDetailDrawer from './components/AccountDetailDrawer';
import ExportNotification from '../../common/ExportNotification';
import { usePaymentAccountByCustomerId } from '@/hooks/usePaymentAccount';

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

const PaymentAccountsNew = ({ customerId }) => {
  // State cho việc hiển thị/ẩn thông tin nhạy cảm
  const [hideAllSensitiveInfo, setHideAllSensitiveInfo] = useState(true);
  const [accounts, setAccounts] = useState([]);

  // State cho việc ẩn/hiện thông tin nhạy cảm của từng tài khoản
  const [hiddenAccounts, setHiddenAccounts] = useState({});
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  
  // State cho modal và drawer
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

  const { paymentAccounts, isLoading, error } = usePaymentAccountByCustomerId(customerId);
  
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

  // Cập nhật accounts từ hook data
  useEffect(() => {
    if (paymentAccounts && paymentAccounts.length > 0) {
      // Transform data để phù hợp với UI
      const transformedAccounts = paymentAccounts.map((account, index) => ({
        id: account.id,
        accountNumber: account.id.toString(), // accountNumber chính là id
        type: "Tài khoản chính", // Luôn là "Tài khoản chính"
        balance: account.balance,
        status: account.paymentAccountStatus === 'active' ? 'active' : 'locked',
        openDate: new Date(account.creationDate).toLocaleDateString('vi-VN'),
        color: accountColors[0], // Luôn dùng màu đầu tiên
        description: "Tài khoản thanh toán chính"
      }));
      setAccounts(transformedAccounts);
    } else {
      setAccounts([]);
    }
  }, [paymentAccounts]);

  // Tính tổng số dư và số tài khoản
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

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

  // Hiển thị khi không có tài khoản nào
  if (!isLoading && paymentAccounts && paymentAccounts.length === 0) {
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
        {isLoading ? (
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center mb-6">
            <SkeletonCard width="w-64" height="h-20" />
            <SkeletonCard width="w-64" height="h-20" />
            <SkeletonCard width="w-64" height="h-20" />
          </div>
        ) : (
          <AccountHeader 
            accounts={accounts}
            totalBalance={totalBalance}
            hideAllSensitiveInfo={hideAllSensitiveInfo}
            toggleAllSensitiveInfo={toggleAllSensitiveInfo}
            formatCurrency={formatCurrency}
          />
        )}
      </motion.div>

      {/* Nội dung chính - danh sách tài khoản */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="transition-all duration-300"
      >
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10 ${viewMode !== 'grid' ? 'hidden' : ''}`}>
          {isLoading ? (
            <PlaceholderShimmer 
              type="payment-account" 
              count={1}
              className=""
              animate={false}
            />
          ) : (
            filteredAccounts.map((account, index) => (
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
                  onViewDetail={() => openTransactionDrawer(account.id)}
                />
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
      
      {/* Drawer chi tiết tài khoản */}
      <AccountDetailDrawer
        isOpen={isDetailDrawerOpen}
        onClose={() => setIsDetailDrawerOpen(false)}
        account={selectedAccount}
        onToggleHide={toggleAccountVisibility}
        onUpdateAccount={(updatedAccount) => {
          // Update the account in the accounts array
          setAccounts(prevAccounts => 
            prevAccounts.map(account => 
              account.id === updatedAccount.id ? updatedAccount : account
            )
          );
        }}
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