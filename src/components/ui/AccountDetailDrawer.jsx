import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ArrowDownLeft, 
  ArrowUpRight, 
  FileText, 
  Eye, 
  EyeOff, 
  CreditCard, 
  Calendar, 
  LockIcon, 
  UnlockIcon,
  History,
  DollarSign
} from 'lucide-react';
import { formatCurrency, maskAccountNumber, getStatusInfo, getChannelInfo } from '../../utils/accountUtils';
import { WithdrawalPanel, DepositPanel } from './payment';
import FilterableAccountTransactionList from './payment/FilterableAccountTransactionList';
import ExportNotification from './notifications/ExportNotification';
import AnimatedTabNavigation from './custom/AnimatedTabNavigation';

// Dữ liệu mẫu cho giao dịch
const sampleTransactions = [
  {
    id: 1,
    type: 'Nạp tiền',
    time: 'Hôm nay, 10:45 AM',
    amount: 5000000,
    isIncoming: true,
    channel: 'internet_banking',
    balanceAfter: 20000000,
    content: 'Nạp tiền vào tài khoản',
  },
  {
    id: 2,
    type: 'Rút tiền',
    time: 'Hôm qua, 12:30 PM',
    amount: 2000000,
    isIncoming: false,
    channel: 'atm',
    balanceAfter: 15000000,
    content: 'Rút tiền tại ATM',
  },
  {
    id: 3,
    type: 'Chuyển khoản',
    time: '25/10/2023',
    amount: 3000000,
    isIncoming: false,
    channel: 'mobile_app',
    balanceAfter: 17000000,
    content: 'Chuyển tiền cho Nguyễn Văn A',
  },
  {
    id: 4,
    type: 'Chuyển khoản',
    time: '25/10/2023',
    amount: 3000000,
    isIncoming: false,
    channel: 'mobile_app',
    balanceAfter: 17000000,
    content: 'Chuyển tiền cho Nguyễn Văn A',
  },
  {
    id: 5,
    type: 'Chuyển khoản',
    time: '25/10/2023',
    amount: 3000000,
    isIncoming: false,
    channel: 'mobile_app',
    balanceAfter: 17000000,
    content: 'Chuyển tiền cho Nguyễn Văn A',
  },
  {
    id: 6,
    type: 'Chuyển khoản',
    time: '25/10/2023',
    amount: 3000000,
    isIncoming: false,
    channel: 'mobile_app',
    balanceAfter: 17000000,
    content: 'Chuyển tiền cho Nguyễn Văn A',
  },
];

const AccountDetailDrawer = ({ 
  isOpen, 
  onClose, 
  account,
  onToggleHide,
  onLockToggle,
  onUpdateAccount,
  isDataHidden // Nhận trạng thái ẩn/hiện từ component cha
}) => {
  // Sử dụng isDataHidden từ props nếu có, ngược lại sử dụng state nội bộ
  const [isHidden, setIsHidden] = useState(isDataHidden !== undefined ? isDataHidden : true);
  const [cardDetailVisible, setCardDetailVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  
  // State for active panel
  const [activePanel, setActivePanel] = useState('transactions'); // 'transactions', 'withdrawal', 'deposit'
  
  // State for notification
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  
  const [activeTab, setActiveTab] = useState('history'); // 'history', 'details'
  const [transactions, setTransactions] = useState(sampleTransactions);
  
  // State for mobile action bar
  const [mobileActionBarVisible, setMobileActionBarVisible] = useState(true);
  
  // Cập nhật state nội bộ khi props thay đổi
  useEffect(() => {
    if (isDataHidden !== undefined) {
      setIsHidden(isDataHidden);
    }
  }, [isDataHidden]);
  
  // Control animations when opening/closing
  useEffect(() => {
    if (isOpen) {
      // First show the overlay
      setTimeout(() => {
        // Then show the card detail
        setCardDetailVisible(true);
        // Then show the drawer
        setTimeout(() => {
          setDrawerVisible(true);
        }, 200);
      }, 100);
    } else {
      // First hide the drawer
      setDrawerVisible(false);
      // Then hide the card detail
      setTimeout(() => {
        setCardDetailVisible(false);
        // Reset panel when closing
        setActivePanel('transactions');
        // Reset mobile action bar
        setMobileActionBarVisible(true);
      }, 300);
    }
  }, [isOpen]);
  
  // Toggle visibility of sensitive information
  const toggleVisibility = (e) => {
    if (e) {
      e.stopPropagation();
    }
    
    // Cập nhật cả state nội bộ và gọi callback từ component cha (nếu có)
    const newHiddenState = !isHidden;
    setIsHidden(newHiddenState);
    
    if (onToggleHide && account) {
      onToggleHide(account.id);
    }
  };

  // Handle account status toggle
  const toggleAccountStatus = (e) => {
    e.stopPropagation();
    if (onLockToggle && account.status !== "permanent_locked") {
      const isLocking = account.status === "active";
      onLockToggle(account.id, isLocking);
    }
  };
  
  // Handle withdrawal confirmation
  const handleWithdrawalConfirm = (amount) => {
    if (!account) return;
    
    // Create a new transaction for the withdrawal
    const newTransaction = {
      id: Date.now(),
      type: 'Rút tiền',
      time: new Date().toLocaleString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).replace(',', ' -'),
      amount: amount,
      isIncoming: false,
      channel: 'counter',
      balanceAfter: account.balance - amount,
      content: 'Rút tiền tại quầy giao dịch'
    };
    
    // Add the new transaction to the list
    setTransactions([newTransaction, ...transactions]);
    
    // Update the account balance
    const updatedAccount = {
      ...account,
      balance: account.balance - amount
    };
    
    // Call the update function from parent component
    if (onUpdateAccount) {
      onUpdateAccount(updatedAccount);
    }
    
    // Reset to transactions panel
    setActivePanel('transactions');
    // Show mobile action bar
    setMobileActionBarVisible(true);
    
    // Show success notification
    setNotificationMessage(`Rút tiền thành công: ${formatCurrency(amount)}`);
    setNotificationVisible(true);
  };
  
  // Handle deposit confirmation
  const handleDepositConfirm = (amount) => {
    if (!account) return;
    
    // Create a new transaction for the deposit
    const newTransaction = {
      id: Date.now(),
      type: 'Nạp tiền',
      time: new Date().toLocaleString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).replace(',', ' -'),
      amount: amount,
      isIncoming: true,
      channel: 'counter',
      balanceAfter: account.balance + amount,
      content: 'Nạp tiền tại quầy giao dịch'
    };
    
    // Add the new transaction to the list
    setTransactions([newTransaction, ...transactions]);
    
    // Update the account balance
    const updatedAccount = {
      ...account,
      balance: account.balance + amount
    };
    
    // Call the update function from parent component
    if (onUpdateAccount) {
      onUpdateAccount(updatedAccount);
    }
    
    // Reset to transactions panel
    setActivePanel('transactions');
    // Show mobile action bar
    setMobileActionBarVisible(true);
    
    // Show success notification
    setNotificationMessage(`Nạp tiền thành công: ${formatCurrency(amount)}`);
    setNotificationVisible(true);
  };
  
  // Handle notification close
  const handleCloseNotification = () => {
    setNotificationVisible(false);
  };
  
  // Handle panel change
  const changePanel = (panel) => {
    setActivePanel(panel);
    // Hide mobile action bar when changing to a functional panel
    if (panel !== 'transactions') {
      setMobileActionBarVisible(false);
    } else {
      setMobileActionBarVisible(true);
    }
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  if (!account) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          {/* Account Detail Card */}
          <div
            className={`fixed inset-0 z-[60] pointer-events-none flex items-center justify-center transition-opacity duration-300 delay-500 ${
              cardDetailVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`hidden md:block w-full max-w-3xl transition-all duration-500 transform ${
                cardDetailVisible
                  ? "translate-y-0 scale-100"
                  : "translate-y-8 scale-95"
              } ${drawerVisible ? "mr-[500px] sm:mr-96" : "mr-0"}`}
              style={{
                transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                pointerEvents: cardDetailVisible ? "auto" : "none",
              }}
            >
              {account && (
                <div
                  className="bg-white rounded-3xl shadow-2xl overflow-hidden card-detail-animate mx-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header với màu gradient của tài khoản */}
                  <div
                    className={`p-6 ${account.color} relative overflow-hidden`}
                  >
                    {/* Background effects */}
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                    <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10 backdrop-blur-md"></div>
                    <div className="absolute -left-4 -bottom-4 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md"></div>

                    <div className="relative flex items-start justify-between z-10">
                      <div className="flex items-center">
                        <div className="h-16 w-16 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                          <CreditCard size={30} className="text-white" />
                        </div>
                        <div className="ml-4 text-white">
                          <h2 className="text-xl font-semibold">
                            {account.type}
                          </h2>
                          <p className="text-white/80 font-mono mt-1">
                            {isHidden
                              ? maskAccountNumber(account.accountNumber)
                              : account.accountNumber}
                          </p>
                          <div
                            className={`inline-flex items-center px-2.5 py-1 mt-2 rounded-full text-xs font-medium ${getStatusInfo(
                              account.status
                            ).bgColor.replace(
                              "bg-",
                              "bg-opacity-20 bg-"
                            )} text-white`}
                          >
                            {getStatusInfo(account.status).icon}
                            {getStatusInfo(account.status).text}
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={toggleVisibility}
                          className="rounded-full p-2 bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                        >
                          {isHidden ? (
                            <Eye size={18} className="text-white" />
                          ) : (
                            <EyeOff size={18} className="text-white" />
                          )}
                        </button>

                        {account.status !== "permanent_locked" && (
                          <button
                            onClick={toggleAccountStatus}
                            className="rounded-full p-2 bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                          >
                            {account.status === "active" ? (
                              <LockIcon size={18} className="text-white" />
                            ) : (
                              <UnlockIcon size={18} className="text-white" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Thông tin số dư */}
                    <div className="mt-6 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                      <p className="text-white/80 text-sm">Số dư hiện tại</p>
                      <h3 className="text-2xl font-bold text-white mt-1">
                        {isHidden ? (
                          <span className="text-white/60">••••••••</span>
                        ) : (
                          formatCurrency(account.balance)
                        )}
                      </h3>
                    </div>
                  </div>

                  {/* Thông tin chi tiết */}
                  <div className="p-6">
                    <h3 className="text-gray-800 font-medium mb-4">
                      Thông tin tài khoản
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-xl">
                        <p className="text-gray-500 text-xs mb-1">
                          Ngày mở tài khoản
                        </p>
                        <p className="text-gray-800 flex items-center text-sm">
                          <Calendar
                            size={14}
                            className="mr-2 text-indigo-500"
                          />
                          {account.openDate}
                        </p>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-xl">
                        <p className="text-gray-500 text-xs mb-1">
                          Loại tài khoản
                        </p>
                        <p className="text-gray-800 flex items-center text-sm">
                          <CreditCard
                            size={14}
                            className="mr-2 text-indigo-500"
                          />
                          Thanh toán
                        </p>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-xl">
                        <p className="text-gray-500 text-xs mb-1">Trạng thái</p>
                        <p className="flex items-center text-sm">
                          {getStatusInfo(account.status).icon}
                          <span
                            className={getStatusInfo(account.status).textColor}
                          >
                            {getStatusInfo(account.status).text}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Các hành động khác - Hidden on mobile */}
                    {/* Các hành động khác - Hidden on mobile */}
                    {/* Các hành động khác - Hidden on mobile */}
                    <div className="mt-6 flex flex-wrap gap-4 justify-center md:flex hidden">
                      <motion.button
                        className="relative group bg-gradient-to-br from-blue-50/80 via-white/90 to-blue-100/60 backdrop-blur-2xl px-5 py-3 rounded-2xl shadow-md border border-blue-200/50 flex items-center text-sm font-semibold text-blue-600 overflow-hidden min-w-[110px] justify-center"
                        onClick={() => changePanel("withdrawal")}
                        whileHover={{
                          boxShadow:
                            "0 15px 35px -10px rgba(59, 130, 246, 0.3)",
                          y: -2,
                          scale: 1.03,
                        }}
                        whileTap={{ scale: 0.97 }}
                        transition={{
                          duration: 0.3,
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 to-blue-300/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 pointer-events-none"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-blue-50/30 to-transparent opacity-60 group-hover:opacity-90 transition-all duration-400"></div>
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>

                        <div className="relative w-7 h-7 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center shadow-md mr-2 group-hover:shadow-lg transition-shadow duration-300">
                          <ArrowUpRight size={14} className="text-white" />
                        </div>
                        <span className="relative">Rút tiền</span>
                      </motion.button>

                      <motion.button
                        className="relative group bg-gradient-to-br from-green-50/80 via-white/90 to-emerald-100/60 backdrop-blur-2xl px-5 py-3 rounded-2xl shadow-md border border-green-200/50 flex items-center text-sm font-semibold text-green-600 overflow-hidden min-w-[110px] justify-center"
                        onClick={() => changePanel("deposit")}
                        whileHover={{
                          boxShadow:
                            "0 15px 35px -10px rgba(16, 185, 129, 0.3)",
                          y: -2,
                          scale: 1.03,
                        }}
                        whileTap={{ scale: 0.97 }}
                        transition={{
                          duration: 0.3,
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-green-200/30 to-emerald-300/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 pointer-events-none"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-green-100/40 via-emerald-50/30 to-transparent opacity-60 group-hover:opacity-90 transition-all duration-400"></div>
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>

                        <div className="relative w-7 h-7 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-md mr-2 group-hover:shadow-lg transition-shadow duration-300">
                          <ArrowDownLeft size={14} className="text-white" />
                        </div>
                        <span className="relative">Nạp tiền</span>
                      </motion.button>

                      <motion.button
                        className="relative group bg-gradient-to-br from-amber-50/80 via-white/90 to-yellow-100/60 backdrop-blur-2xl px-5 py-3 rounded-2xl shadow-md border border-amber-200/50 flex items-center text-sm font-semibold text-amber-600 overflow-hidden min-w-[110px] justify-center"
                        whileHover={{
                          boxShadow:
                            "0 15px 35px -10px rgba(245, 158, 11, 0.3)",
                          y: -2,
                          scale: 1.03,
                        }}
                        whileTap={{ scale: 0.97 }}
                        transition={{
                          duration: 0.3,
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-200/30 to-yellow-300/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 pointer-events-none"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-100/40 via-yellow-50/30 to-transparent opacity-60 group-hover:opacity-90 transition-all duration-400"></div>
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>

                        <div className="relative w-7 h-7 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-md mr-2 group-hover:shadow-lg transition-shadow duration-300">
                          <FileText size={14} className="text-white" />
                        </div>
                        <span className="relative">Sao kê</span>
                      </motion.button>

                      <motion.button
                        className="relative group bg-gradient-to-br from-gray-50/80 via-white/90 to-slate-100/60 backdrop-blur-2xl px-5 py-3 rounded-2xl shadow-md border border-gray-200/50 flex items-center text-sm font-semibold text-gray-600 overflow-hidden min-w-[100px] justify-center"
                        onClick={onClose}
                        whileHover={{
                          boxShadow:
                            "0 15px 35px -10px rgba(107, 114, 128, 0.3)",
                          y: -2,
                          scale: 1.03,
                        }}
                        whileTap={{ scale: 0.97 }}
                        transition={{
                          duration: 0.3,
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-200/30 to-slate-300/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 pointer-events-none"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-100/40 via-slate-50/30 to-transparent opacity-60 group-hover:opacity-90 transition-all duration-400"></div>
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>

                        <div className="relative w-7 h-7 rounded-xl bg-gradient-to-br from-gray-400 to-slate-500 flex items-center justify-center shadow-md mr-2 group-hover:shadow-lg transition-shadow duration-300">
                          <X size={14} className="text-white" />
                        </div>
                        <span className="relative">Đóng</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Transaction Drawer */}
          <motion.div
            className="fixed top-0 bottom-0 right-0 w-full sm:w-96 md:w-[500px] bg-white shadow-2xl overflow-hidden z-[61] rounded-l-3xl"
            initial={{ x: "100%" }}
            animate={{ x: drawerVisible ? 0 : "100%" }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header - Changes based on active panel */}
            <div
              className={`p-5 ${
                activePanel === "withdrawal"
                  ? "bg-blue-500"
                  : activePanel === "deposit"
                  ? "bg-green-500"
                  : "bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-500"
              } text-white relative overflow-hidden`}
            >
              <button
                onClick={
                  activePanel !== "transactions"
                    ? () => changePanel("transactions")
                    : onClose
                }
                className="absolute left-5 top-5 rounded-full h-8 w-8 flex items-center justify-center bg-white/20 hover:bg-white/30 transition-all duration-200"
              >
                <X size={18} className="text-white" />
              </button>
              <div className="text-center pt-2">
                <h3 className="text-xl font-medium">
                  {activePanel === "withdrawal"
                    ? "Rút tiền tại quầy"
                    : activePanel === "deposit"
                    ? "Nạp tiền tại quầy"
                    : activeTab === "history"
                    ? "Lịch sử giao dịch"
                    : "Chi tiết tài khoản"}
                </h3>
                <p className="text-white/80 text-sm mt-1">
                  {account.accountNumber}
                </p>
              </div>
            </div>

            {/* Tab navigation - Only show for transactions panel */}
            {activePanel === "transactions" && (
              <>
                {/* Mobile tabs - Only visible on small screens */}
                <div className="sm:hidden flex bg-white/70 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20">
                  <AnimatedTabNavigation
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                    haveChevron={true}
                    alwaysMini={false}
                    tabs={[
                      { id: "history", label: "Lịch sử giao dịch", icon: History},
                      { id: "details", label: "Chi tiết tài khoản", icon: DollarSign}
                    ]}
                    variant='indigo'
                  />
                </div>
                {/* <div className="flex border-b border-gray-200 sm:hidden">
                  <button
                    onClick={() => handleTabChange("history")}
                    className={`flex-1 py-3 text-sm font-medium flex items-center justify-center ${
                      activeTab === "history"
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <History size={14} className="mr-2" />
                    Lịch sử giao dịch
                  </button>
                  <button
                    onClick={() => handleTabChange("details")}
                    className={`flex-1 py-3 text-sm font-medium flex items-center justify-center ${
                      activeTab === "details"
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <DollarSign size={14} className="mr-2" />
                    Chi tiết tài khoản
                  </button>
                </div> */}

                {/* Desktop navigation - Only visible on larger screens */}
              </>
            )}

            {/* Content based on active panel and tab */}
            {activePanel === "transactions" && (
              <>
                {activeTab === "history" ? (
                  <div className="overflow-y-auto mb-8 h-full">
                    <div className="p-4">
                      <FilterableAccountTransactionList
                        transactions={transactions}
                        isHidden={isHidden}
                        emptyMessage="Không có giao dịch nào cho tài khoản này"
                        emptyIcon={
                          <FileText size={48} className="text-gray-400" />
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    className="overflow-y-auto h-[calc(100vh-180px)]"
                    style={{
                      height: `calc(100vh - ${
                        mobileActionBarVisible ? "240px" : "180px"
                      })`,
                    }}
                  >
                    <div className="p-4">
                      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-base font-medium text-gray-800">
                            Thông tin tài khoản
                          </h4>
                          <button
                            onClick={toggleVisibility}
                            className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                          >
                            {isHidden ? (
                              <Eye size={16} className="text-gray-600" />
                            ) : (
                              <EyeOff size={16} className="text-gray-600" />
                            )}
                          </button>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                              Số tài khoản
                            </span>
                            <span className="text-sm font-medium">
                              {isHidden
                                ? maskAccountNumber(account.accountNumber)
                                : account.accountNumber}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                              Loại tài khoản
                            </span>
                            <span className="text-sm font-medium">
                              {account.type}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                              Ngày mở
                            </span>
                            <span className="text-sm font-medium">
                              {account.openDate}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                              Trạng thái
                            </span>
                            <span className="text-sm font-medium flex items-center">
                              {getStatusInfo(account.status).icon}
                              {getStatusInfo(account.status).text}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                              Số dư hiện tại
                            </span>
                            <span className="text-sm font-medium text-indigo-700">
                              {isHidden
                                ? "••••••••"
                                : formatCurrency(account.balance)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-base font-medium text-gray-800">
                            Thông tin chủ tài khoản
                          </h4>
                          <button
                            onClick={toggleVisibility}
                            className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                          >
                            {isHidden ? (
                              <Eye size={16} className="text-gray-600" />
                            ) : (
                              <EyeOff size={16} className="text-gray-600" />
                            )}
                          </button>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                              Họ và tên
                            </span>
                            <span className="text-sm font-medium">
                              {account.ownerName || "Nguyễn Văn A"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                              Số điện thoại
                            </span>
                            <span className="text-sm font-medium">
                              {account.phone || "0912 345 678"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Email</span>
                            <span className="text-sm font-medium">
                              {account.email || "example@gmail.com"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                              Địa chỉ
                            </span>
                            <span className="text-sm font-medium">
                              {account.address || "Hà Nội, Việt Nam"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Withdrawal Panel */}
            {activePanel === "withdrawal" && (
              <WithdrawalPanel
                account={account}
                onCancel={() => changePanel("transactions")}
                onConfirm={handleWithdrawalConfirm}
              />
            )}

            {/* Deposit Panel */}
            {activePanel === "deposit" && (
              <DepositPanel
                account={account}
                onCancel={() => changePanel("transactions")}
                onConfirm={handleDepositConfirm}
              />
            )}

            {/* Mobile Action Bar - Only visible on mobile */}
            {mobileActionBarVisible && activePanel === "transactions" && (
              <div className="fixed bottom-6 left-8 right-8 bg-black/5 backdrop-blur-md rounded-3xl p-2 flex justify-around md:hidden z-[62]">
                <motion.button
                  className="relative group flex flex-col items-center justify-center px-4 py-2 rounded-2xl overflow-hidden min-w-[70px]"
                  onClick={() => changePanel("withdrawal")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    duration: 0.2,
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-transparent to-blue-100/40 opacity-0 group-active:opacity-100 transition-opacity duration-200 rounded-2xl"></div>

                  <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center shadow-lg mb-1 group-active:shadow-xl transition-shadow duration-200">
                    <ArrowUpRight size={18} className="text-white" />
                  </div>
                  <span className="text-xs font-medium text-blue-600 relative">
                    Rút tiền
                  </span>
                </motion.button>

                <motion.button
                  className="relative group flex flex-col items-center justify-center px-4 py-2 rounded-2xl overflow-hidden min-w-[70px]"
                  onClick={() => changePanel("deposit")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    duration: 0.2,
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50/60 via-transparent to-emerald-100/40 opacity-0 group-active:opacity-100 transition-opacity duration-200 rounded-2xl"></div>

                  <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg mb-1 group-active:shadow-xl transition-shadow duration-200">
                    <ArrowDownLeft size={18} className="text-white" />
                  </div>
                  <span className="text-xs font-medium text-green-600 relative">
                    Nạp tiền
                  </span>
                </motion.button>

                <motion.button
                  className="relative group flex flex-col items-center justify-center px-4 py-2 rounded-2xl overflow-hidden min-w-[70px]"
                  onClick={toggleVisibility}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    duration: 0.2,
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/60 via-transparent to-purple-100/40 opacity-0 group-active:opacity-100 transition-opacity duration-200 rounded-2xl"></div>

                  <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-500 flex items-center justify-center shadow-lg mb-1 group-active:shadow-xl transition-shadow duration-200">
                    {isHidden ? (
                      <Eye size={18} className="text-white" />
                    ) : (
                      <EyeOff size={18} className="text-white" />
                    )}
                  </div>
                  <span className="text-xs font-medium text-purple-600 relative">
                    {isHidden ? "Hiện" : "Ẩn"}
                  </span>
                </motion.button>

                <motion.button
                  className="relative group flex flex-col items-center justify-center px-4 py-2 rounded-2xl overflow-hidden min-w-[70px]"
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    duration: 0.2,
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50/60 via-transparent to-slate-100/40 opacity-0 group-active:opacity-100 transition-opacity duration-200 rounded-2xl"></div>

                  <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-gray-400 to-slate-500 flex items-center justify-center shadow-lg mb-1 group-active:shadow-xl transition-shadow duration-200">
                    <X size={18} className="text-white" />
                  </div>
                  <span className="text-xs font-medium text-gray-600 relative">
                    Đóng
                  </span>
                </motion.button>
              </div>
            )}
          </motion.div>
          {/* Success Notification */}
          <ExportNotification
            isVisible={notificationVisible}
            onClose={handleCloseNotification}
            message={notificationMessage}
            format=""
            type="success"
            position="bottom-center"
            autoHideDuration={3000}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AccountDetailDrawer;
