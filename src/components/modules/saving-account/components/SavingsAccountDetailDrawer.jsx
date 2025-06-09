import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  PiggyBank, 
  FileIcon, 
  Eye, 
  EyeOff, 
  Calendar,
  History,
  DollarSign,
  ArrowUpRight,
  ChevronRight,
  Info
} from 'lucide-react';
import { formatCurrency, formatDate } from '../../../../utils/accountUtils';
import ExportNotification from '../../../common/ExportNotification';
import DetailInfo from './DetailInfo';
import SavingAccountDetail from './SavingAccountDetail';

// Import các component con
import SavingsTransactionsTab from './SavingsTransactionsTab';
import SavingsInterestTab from './SavingsInterestTab';
import SavingsWithdrawalsTab from './SavingsWithdrawalsTab';
import EarlyWithdrawalPanel from './EarlyWithdrawalPanel';
import AnimatedTabNavigation from '../../../ui/custom/AnimatedTabNavigation';

// CSS styles for animations
const tabAnimationStyles = {
  fadeIn: {
    opacity: 1,
    transform: 'translateY(0)',
    transition: 'opacity 300ms ease, transform 300ms ease',
  },
  fadeOut: {
    opacity: 0,
    transform: 'translateY(10px)',
    transition: 'opacity 200ms ease, transform 200ms ease',
  },
  default: {
    opacity: 1,
    transform: 'translateY(0)',
  }
};

const SavingsAccountDetailDrawer = ({ 
  isOpen, 
  onClose, 
  account,
  transactions = [],
  interestHistory = [],
  withdrawalHistory = [],
  isHidden = true,
  onToggleHide,
  customerInfo = null,
  showCustomerInfo = false
}) => {
  // State cho việc hiển thị chi tiết
  const [cardDetailVisible, setCardDetailVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  
  // State cho tab hiện tại
  const [selectedTab, setSelectedTab] = useState('transactions'); // 'transactions', 'interest', 'withdrawals', 'details'
  const [previousTab, setPreviousTab] = useState(null); // Track previous tab for animation
  
  // State cho animation
  const [tabAnimationState, setTabAnimationState] = useState('default'); // 'default', 'fadeIn', 'fadeOut'
  
  // State cho panel rút tiền
  const [withdrawalPanelVisible, setWithdrawalPanelVisible] = useState(false);
  const [withdrawalType, setWithdrawalType] = useState('partial'); // 'full' or 'partial'
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [withdrawalData, setWithdrawalData] = useState({
    originalAmount: 0,
    withdrawAmount: 0,
    withdrawalInterest: 0,
    totalWithdrawal: 0,
    remainingBalance: 0,
    expectedInterest: 0
  });
  
  // State for mobile action bar visibility
  const [mobileActionBarVisible, setMobileActionBarVisible] = useState(true);
  
  // State for notification
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  
  // Lưu trữ dữ liệu tab để tránh mất khi chuyển tab
  const [tabData, setTabData] = useState({
    transactions: transactions || [],
    interest: interestHistory || [],
    withdrawals: withdrawalHistory || [],
    details: {} // Add an empty object for the details tab
  });
  
  // Cập nhật dữ liệu tab khi props thay đổi
  useEffect(() => {
    // Chỉ cập nhật khi có dữ liệu mới và khác rỗng
    const newTabData = {
      transactions: transactions || [], // Always update with the latest transactions
      interest: interestHistory || [], // Always update with the latest interest history
      withdrawals: withdrawalHistory || [], // Always update with the latest withdrawal history
      details: tabData.details // Keep the details data
    };
    
    setTabData(newTabData);
  }, [transactions, interestHistory, withdrawalHistory]);
  
  // Reset tab data when account changes
  useEffect(() => {
    if (account) {
      setTabData({
        transactions: transactions || [],
        interest: interestHistory || [],
        withdrawals: withdrawalHistory || [],
        details: {}
      });
    }
  }, [account?.id]);
  
  // Lưu trữ dữ liệu gốc để tham chiếu khi cần
  const [originalData] = useState({
    transactions: [],
    interest: [],
    withdrawals: [],
    details: {} // Add an empty object for the details tab
  });
  
  // Cập nhật dữ liệu gốc khi có dữ liệu mới
  useEffect(() => {
    if (isOpen) {
      if (transactions && transactions.length > 0) {
        originalData.transactions = [...transactions];
      }
      if (interestHistory && interestHistory.length > 0) {
        originalData.interest = [...interestHistory];
      }
      if (withdrawalHistory && withdrawalHistory.length > 0) {
        originalData.withdrawals = [...withdrawalHistory];
      }
    }
  }, [isOpen, transactions, interestHistory, withdrawalHistory]);
  
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
          
          // Đảm bảo dữ liệu được hiển thị khi mở drawer
          if (transactions && transactions.length > 0) {
            setTabData(prevData => ({
              ...prevData,
              transactions: [...transactions]
            }));
          }
          
          if (interestHistory && interestHistory.length > 0) {
            setTabData(prevData => ({
              ...prevData,
              interest: [...interestHistory]
            }));
          }
          
          if (withdrawalHistory && withdrawalHistory.length > 0) {
            setTabData(prevData => ({
              ...prevData,
              withdrawals: [...withdrawalHistory]
            }));
          }
        }, 200);
      }, 100);
    } else {
      // First hide the drawer
      setDrawerVisible(false);
      // Then hide the card detail
      setTimeout(() => {
        setCardDetailVisible(false);
        
        // Reset withdrawal panel state when drawer is closed
        setWithdrawalPanelVisible(false);
        setWithdrawalType('partial');
        setWithdrawalAmount('');
        setWithdrawalData({
          originalAmount: 0,
          withdrawAmount: 0,
          withdrawalInterest: 0,
          totalWithdrawal: 0,
          remainingBalance: 0,
          expectedInterest: 0
        });
        
        // Không reset tabData khi đóng drawer để giữ lại dữ liệu cho lần mở tiếp theo
      }, 300);
    }
  }, [isOpen, transactions, interestHistory, withdrawalHistory]);
  
  // Toggle visibility of sensitive information
  const toggleVisibility = (e) => {
    e.stopPropagation();
    if (onToggleHide) {
      onToggleHide();
    }
  };
  
  // Chuyển đổi tab sử dụng state
  const handleTabChange = (tab) => {
    if (withdrawalPanelVisible || selectedTab === tab) return;
    
    // Save current tab before changing
    setPreviousTab(selectedTab);
    
    // Start fade out animation
    setTabAnimationState('fadeOut');
    
    // After fadeOut completes, change tab and start fadeIn
    setTimeout(() => {
      setSelectedTab(tab);
      
      // Đảm bảo dữ liệu tab hiện tại được giữ nguyên
      // Nếu dữ liệu tab mới trống, sử dụng dữ liệu gốc nếu có
      // Only check length for array tabs (transactions, interest, withdrawals)
      if (tab !== 'details' && 
          tabData[tab] && 
          originalData[tab] && 
          tabData[tab].length === 0 && 
          originalData[tab].length > 0) {
        setTabData(prevData => ({
          ...prevData,
          [tab]: [...originalData[tab]]
        }));
      }
      
      setTabAnimationState('fadeIn');
      
      // Reset animation state after fadeIn completes
      setTimeout(() => {
        setTabAnimationState('default');
      }, 0);
    }, 0);
  };
  
  // Toggle panel rút tiền
  const toggleWithdrawalPanel = () => {
    if (withdrawalPanelVisible) {
      // Ẩn panel rút tiền với animation
      setWithdrawalPanelVisible(false);
      setMobileActionBarVisible(true); // Show action bar when closing withdrawal panel
      
      // Sau khi animation thoát hoàn tất, reset state
      setTimeout(() => {
        setWithdrawalType('partial');
        setWithdrawalAmount('');
        setWithdrawalData({
          originalAmount: 0,
          withdrawAmount: 0,
          withdrawalInterest: 0,
          totalWithdrawal: 0,
          remainingBalance: 0,
          expectedInterest: 0
        });
      }, 300);
    } else {
      // Bắt đầu animation fade out cho nội dung hiện tại
      setTabAnimationState('fadeOut');
      setMobileActionBarVisible(false); // Hide action bar when opening withdrawal panel
      
      // Sau một khoảng thời gian ngắn, khởi tạo và hiển thị panel rút tiền
      setTimeout(() => {
        // Check if it's a standard deposit and set withdrawal type accordingly
        const isStandardDeposit = account && account.depositType === "Tiền gửi tiêu chuẩn";
        setWithdrawalType(isStandardDeposit ? 'full' : 'partial');
        
        // Khởi tạo panel rút tiền với rút toàn bộ hoặc một phần dựa trên loại tiết kiệm
        const withdrawalCalc = calculateEarlyWithdrawalInterest(account, isStandardDeposit ? null : 100000);
        setWithdrawalData(withdrawalCalc);
        
        // Set initial withdrawal amount for partial withdrawals
        if (!isStandardDeposit) {
          setWithdrawalAmount('100000');
        } else {
          setWithdrawalAmount('');
        }
        
        setWithdrawalPanelVisible(true);
      }, 200);
    }
  };
  
  // Tính toán lãi suất khi rút tiền trước hạn
  const calculateEarlyWithdrawalInterest = (savings, withdrawalAmountValue = null) => {
    if (!savings) return null;
    
    // Sử dụng remainingAmount nếu có, nếu không thì sử dụng amount
    const currentAmount = typeof savings.remainingAmount !== 'undefined' ? savings.remainingAmount : savings.amount;
    const { amount, interestRate, interestFrequency, daysRemaining, termDays } = savings;
    const daysPassed = termDays - daysRemaining;
    const isFullWithdrawal = withdrawalAmountValue === null;
    
    // Số tiền rút - hoặc toàn bộ hoặc một phần
    const withdrawAmount = isFullWithdrawal ? currentAmount : Math.min(withdrawalAmountValue, currentAmount);
    
    // Đối với tiền gửi tiêu chuẩn, chỉ cho phép rút toàn bộ
    if (savings.depositType === "Tiền gửi tiêu chuẩn" && !isFullWithdrawal) {
      return null;
    }
    
    // Tính toán lãi suất cho việc rút tiền trước hạn dựa trên tần suất
    let withdrawalInterest = 0;
    let remainingBalance = isFullWithdrawal ? 0 : currentAmount - withdrawAmount;
    let expectedInterest = 0;
    
    // Luôn sử dụng lãi suất không kỳ hạn (0.1%) cho rút tiền trước hạn
    const noTermRate = 0.1; 
    
    // Tính lãi đơn với lãi suất không kỳ hạn cho số ngày đã gửi
    withdrawalInterest = (withdrawAmount * noTermRate * daysPassed / 365) / 100;
    
    // Tính toán lãi dự kiến nếu khách hàng chờ đến khi đáo hạn
    if (!isFullWithdrawal) {
      // Nếu rút một phần, tính lãi dự kiến cho phần còn lại
      expectedInterest = (remainingBalance * interestRate * termDays / 365) / 100;
    } else {
      // Nếu rút toàn bộ, không có lãi dự kiến
      expectedInterest = 0;
    }
    
    return {
      originalAmount: amount,
      withdrawAmount,
      withdrawalInterest,
      totalWithdrawal: withdrawAmount + withdrawalInterest,
      remainingBalance,
      expectedInterest
    };
  };
  
  // Xử lý thay đổi loại rút tiền (toàn bộ hoặc một phần)
  const handleWithdrawalTypeChange = (type) => {
    // Check if it's a standard deposit
    const isStandardDeposit = account && account.depositType === "Tiền gửi tiêu chuẩn";
    
    // If it's a standard deposit, only allow full withdrawal
    if (isStandardDeposit && type === 'partial') {
      return;
    }
    
    setWithdrawalType(type);
    
    if (type === 'full') {
      // Reset số tiền rút và tính toán lại dựa trên toàn bộ số tiền
      setWithdrawalAmount('');
      const withdrawalCalc = calculateEarlyWithdrawalInterest(account);
      setWithdrawalData(withdrawalCalc);
    } else {
      // Khởi tạo với số tiền rút tối thiểu cho việc rút một phần
      setWithdrawalAmount('100000');
      const withdrawalCalc = calculateEarlyWithdrawalInterest(account, 100000);
      setWithdrawalData(withdrawalCalc);
    }
  };
  
  // Xử lý thay đổi số tiền rút
  const handleWithdrawalAmountChange = (value) => {
    setWithdrawalAmount(value);
    
    // Xác thực số tiền và tính toán lãi suất ngay lập tức cho bất kỳ giá trị nào
    const numValue = parseFloat(value) || 0;
    
    // Tính toán lãi suất ngay cả khi số tiền chưa đạt mức tối thiểu
    // để người dùng có thể thấy kết quả ngay khi nhập
    if (numValue > 0) {
      const withdrawalCalc = calculateEarlyWithdrawalInterest(account, numValue);
      setWithdrawalData(withdrawalCalc);
    } else {
      // Nếu không có giá trị hoặc giá trị không hợp lệ, đặt lãi về 0
      setWithdrawalData({
        ...withdrawalData,
        withdrawAmount: numValue,
        withdrawalInterest: 0,
        totalWithdrawal: numValue,
        remainingBalance: account.amount - numValue,
        expectedInterest: 0
      });
    }
  };
  
  // Xác nhận rút tiền trước hạn
  const confirmEarlyWithdrawal = () => {
    // Tạo đối tượng giao dịch mới
    const newTransaction = {
      id: Date.now(),
      time: new Date().toLocaleString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).replace(',', ' -'),
      withdrawnAmount: withdrawalData.withdrawAmount,
      interestAmount: withdrawalData.withdrawalInterest,
      remainingBalance: withdrawalData.remainingBalance,
      isPartial: withdrawalType === 'partial',
      channel: "Internet Banking",
      status: "Thành công"
    };
    
    // Nếu rút toàn bộ, tạo sự kiện để thông báo cho component cha
    if (withdrawalType === 'full') {
      // Tạo và dispatch sự kiện rút toàn bộ
      const fullWithdrawalEvent = new CustomEvent('accountFullyWithdrawn', {
        detail: {
          accountId: account.id,
          // Không cần gửi amount vì chúng ta chỉ cập nhật remainingAmount
          // và giữ nguyên amount (số tiền gốc ban đầu)
        }
      });
      window.dispatchEvent(fullWithdrawalEvent);
      
      // Hoặc sử dụng callback nếu đã được cung cấp
      if (window.removeAccount) {
        window.removeAccount(account.id);
      }
      
      // Đóng drawer
      onClose();
      
      // Không hiển thị thông báo ở đây vì component sẽ bị unmount
      // Thông báo sẽ được hiển thị bởi component cha (SavingsAccounts.jsx)
    } else {
      // Nếu rút một phần, cập nhật tài khoản và thêm giao dịch vào lịch sử
      // Chỉ cập nhật remainingAmount, giữ nguyên amount (số tiền gốc ban đầu)
      const updatedAccount = {
        ...account,
        remainingAmount: withdrawalData.remainingBalance
      };
      
      // Tạo và dispatch sự kiện rút một phần
      const partialWithdrawalEvent = new CustomEvent('accountPartiallyWithdrawn', {
        detail: {
          accountId: account.id,
          updatedAccount,
          transaction: newTransaction
        }
      });
      window.dispatchEvent(partialWithdrawalEvent);
      
      // Hoặc sử dụng callback nếu đã được cung cấp
      if (window.updateAccount) {
        window.updateAccount(updatedAccount);
      }
      
      // Cập nhật dữ liệu tab
      setTabData(prevData => ({
        ...prevData,
        withdrawals: [newTransaction, ...prevData.withdrawals]
      }));
      
      // Đóng panel rút tiền và quay lại tab giao dịch
      toggleWithdrawalPanel();
      setSelectedTab('transactions');
    }
    
    // Chỉ hiển thị thông báo nếu là rút một phần (partial withdrawal)
    // vì khi rút toàn bộ, component này sẽ bị unmount
    if (withdrawalType === 'partial') {
      setNotificationMessage(`Rút tiền trước hạn thành công: ${formatCurrency(withdrawalData.withdrawAmount)}`);
      setNotificationVisible(true);
    }
  };
  
  // Handle notification close
  const handleCloseNotification = () => {
    setNotificationVisible(false);
  };
  
  if (!account) return null;

  // Render the appropriate tab content
  const renderTabContent = () => {
    // Log để debug
    console.log("Rendering tab content for:", selectedTab);
    console.log("Tab data:", tabData);
    console.log("Account ID:", account?.id);
    
    // Đảm bảo luôn có mảng dữ liệu, ngay cả khi rỗng
    const currentTabData = {
      transactions: tabData.transactions || [],
      interest: tabData.interest || [],
      withdrawals: tabData.withdrawals || []
    };
    
    switch (selectedTab) {
      case 'transactions':
        return (
          <SavingsTransactionsTab 
            transactions={currentTabData.transactions} 
            isHidden={isHidden}
          />
        );
      case 'interest':
        return (
          <SavingsInterestTab 
            interestHistory={currentTabData.interest} 
            isHidden={isHidden}
          />
        );
      case 'withdrawals':
        return (
          <SavingsWithdrawalsTab 
            withdrawalHistory={currentTabData.withdrawals} 
            isHidden={isHidden}
          />
        );
      case 'details':
        return (
          <DetailInfo 
            account={account}
            showCustomerInfo={true}
            customerInfo={customerInfo}
          />
        );
      default:
        return null;
    }
  };

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
          {/* CSS cho animation */}
          <style jsx global>{`
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
              animation: fadeInSlideUp 0.3s ease-out forwards;
            }

            .animate-fadeOutSlideDown {
              animation: fadeOutSlideDown 0.3s ease-in forwards;
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

          {/* Account Detail Card */}
          <div
            className={`hidden sm:flex fixed inset-0 z-[60] pointer-events-none flex items-center justify-center transition-opacity duration-300 ${
              cardDetailVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`w-full max-w-3xl transition-all duration-500 transform ${
                cardDetailVisible
                  ? "translate-y-0 scale-100"
                  : "translate-y-8 scale-95"
              } ${drawerVisible ? "mr-[500px] sm:mr-96" : "mr-0"}`}
              style={{
                transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                pointerEvents: cardDetailVisible ? "auto" : "none",
              }}
            >
              <div
                className="bg-white rounded-3xl shadow-2xl overflow-hidden card-detail-animate mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div
                  className={`p-6 ${account.color} bg-blue-500 relative overflow-hidden`}
                >
                  {/* Background effects */}
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                  <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10 backdrop-blur-md"></div>
                  <div className="absolute -left-4 -bottom-4 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md"></div>

                  <div className="relative flex items-start justify-between z-10">
                    <div className="flex items-center">
                      <div className="h-16 w-16 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                        <PiggyBank size={30} className="text-white" />
                      </div>
                      <div className="ml-4 text-white">
                        <h2 className="text-xl font-semibold">
                          {account.nickname}
                        </h2>
                        <p className="text-white/80 mt-1">
                          {account.depositNumber}
                        </p>
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
                    </div>
                  </div>

                  {/* Thông tin số tiền */}
                  <div className="mt-6 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white/80 text-sm">Số tiền gửi</p>
                        <h3 className="text-2xl font-bold text-white mt-1">
                          {isHidden ? (
                            <span className="text-white/60">••••••••</span>
                          ) : (
                            formatCurrency(account.remainingAmount)
                          )}
                        </h3>
                      </div>
                      <div className="text-right">
                        <p className="text-white/80 text-sm">Lãi suất</p>
                        <p className="text-xl font-semibold text-white mt-1">
                          {account.interestRate}%/năm
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Thông tin chi tiết */}
                <div className="p-6">
                  <SavingAccountDetail 
                    account={account}
                    isHidden={isHidden}
                    formatCurrency={formatCurrency}
                  />

                  {/* Các hành động */}
                  <div className="mt-6 flex flex-wrap gap-4 justify-center md:flex hidden">
                    {account.status !== "closed" && (
                      <motion.button
                        className="relative group bg-gradient-to-br from-amber-50/80 via-white/90 to-orange-100/60 backdrop-blur-2xl px-5 py-3 rounded-2xl shadow-md border border-amber-200/50 flex items-center text-sm font-semibold text-amber-600 overflow-hidden min-w-[110px] justify-center"
                        onClick={toggleWithdrawalPanel}
                        whileHover={{
                          boxShadow:
                            "0 15px 35px -10px rgba(215, 168, 13, 0.3)",
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
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-200/30 to-orange-300/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 pointer-events-none"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-100/40 via-orange-50/30 to-transparent opacity-60 group-hover:opacity-90 transition-all duration-400"></div>
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>

                        <div className="relative w-7 h-7 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md mr-2 group-hover:shadow-lg transition-shadow duration-300">
                          <ArrowUpRight size={14} className="text-white" />
                        </div>
                        <span className="relative">Rút tiền</span>
                      </motion.button>
                    )}

                    <motion.button
                      className="relative group bg-gradient-to-br from-gray-50/80 via-white/90 to-slate-100/60 backdrop-blur-2xl px-5 py-3 rounded-2xl shadow-md border border-gray-200/50 flex items-center text-sm font-semibold text-gray-600 overflow-hidden min-w-[100px] justify-center"
                      onClick={onClose}
                      whileHover={{
                        boxShadow: "0 15px 35px -10px rgba(107, 114, 128, 0.3)",
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
            {/* Drawer Header */}
            <div
              className={`p-5 ${
                withdrawalPanelVisible
                  ? "bg-amber-500"
                  : "bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-500"
              } text-white relative overflow-hidden`}
            >
              <button
                onClick={onClose}
                className="absolute left-5 top-5 rounded-full h-8 w-8 flex items-center justify-center bg-white/20 hover:bg-white/30 transition-all duration-200"
              >
                <X size={18} className="text-white" />
              </button>

              <div className="text-center pt-2">
                <h3 className="text-xl font-medium">
                  {withdrawalPanelVisible
                    ? "Rút tiền trước hạn"
                    : selectedTab === "details"
                    ? "Chi tiết tiền gửi"
                    : selectedTab === "transactions"
                    ? "Lịch sử giao dịch"
                    : selectedTab === "interest"
                    ? "Lịch sử trả lãi"
                    : "Lịch sử rút tiền"}
                </h3>
                <p className="text-white/80 text-sm mt-1">{account.nickname}</p>
              </div>
            </div>

            {/* Tab navigation */}
            {!withdrawalPanelVisible && (
              <>
                {/* Mobile tabs - Only visible on small screens */}
                {/* <div className="flex border-b border-gray-200 pt-2 sm:hidden">
                  <button
                    className={`flex-1 py-3 text-sm font-medium flex items-center justify-center ${
                      selectedTab === "transactions"
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => handleTabChange("transactions")}
                  >
                    <History size={14} className="mr-2" />
                    Giao dịch
                  </button>
                  <button
                    className={`flex-1 py-3 text-sm font-medium flex items-center justify-center ${
                      selectedTab === "interest"
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => handleTabChange("interest")}
                  >
                    <DollarSign size={14} className="mr-2" />
                    Trả lãi
                  </button>
                  <button
                    className={`flex-1 py-3 text-sm font-medium flex items-center justify-center ${
                      selectedTab === "withdrawals"
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => handleTabChange("withdrawals")}
                  >
                    <ArrowUpRight size={14} className="mr-2" />
                    Rút tiền
                  </button>
                  <button
                    className={`flex-1 py-3 text-sm font-medium flex items-center justify-center ${
                      selectedTab === "details"
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => handleTabChange("details")}
                  >
                    <Info size={14} className="mr-2" />
                    Chi tiết
                  </button>
                </div> */}

                {/* Desktop navigation - Only visible on larger screens */}
                <div className="flex bg-white/70 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20">
                  <AnimatedTabNavigation
                    activeTab={selectedTab}
                    onTabChange={handleTabChange}
                    haveChevron={false}
                    alwaysMini={true}
                    tabs={[
                      { id: "transactions", label: "Giao dịch", icon: History},
                      { id: "interest", label: "Lịch sử trả lãi", icon: DollarSign},
                      { id: "withdrawals", label: "Lịch sử rút tiền", icon: ArrowUpRight},
                      { id: "details", label: "Chi tiết", icon: Info}
                    ]}
                    variant='indigo'
                    className={`${
                      withdrawalPanelVisible
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }`}
                  />
                </div>
                {/* <div className="hidden sm:flex border-b border-gray-200 pt-2">
                  <button
                    className={`flex-1 py-3 text-sm font-medium flex items-center justify-center ${
                      selectedTab === "transactions"
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-500 hover:text-gray-700"
                    } ${
                      withdrawalPanelVisible
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }`}
                    onClick={() => handleTabChange("transactions")}
                    disabled={withdrawalPanelVisible}
                  >
                    <History size={14} className="mr-2" />
                    Giao dịch
                  </button>
                  <button
                    className={`flex-1 py-3 text-sm font-medium flex items-center justify-center ${
                      selectedTab === "interest"
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-500 hover:text-gray-700"
                    } ${
                      withdrawalPanelVisible
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }`}
                    onClick={() => handleTabChange("interest")}
                    disabled={withdrawalPanelVisible}
                  >
                    <DollarSign size={14} className="mr-2" />
                    Lịch sử trả lãi
                  </button>
                  <button
                    className={`flex-1 py-3 text-sm font-medium flex items-center justify-center ${
                      selectedTab === "withdrawals"
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-500 hover:text-gray-700"
                    } ${
                      withdrawalPanelVisible
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }`}
                    onClick={() => handleTabChange("withdrawals")}
                    disabled={withdrawalPanelVisible}
                  >
                    <ArrowUpRight size={14} className="mr-2" />
                    Lịch sử rút tiền
                  </button>
                  <button
                    className={`flex-1 py-3 text-sm font-medium flex items-center justify-center ${
                      selectedTab === "details"
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => handleTabChange("details")}
                  >
                    <Info size={14} className="mr-2" />
                    Chi tiết
                  </button>
                </div> */}
              </>
            )}

            {/* Panel content based on selected tab */}
            <div
              className={`px-2 md:px-5 pb-20 right-panel-scrollbar overflow-y-auto h-full ${
                mobileActionBarVisible && !withdrawalPanelVisible
                  ? "pb-40"
                  : "pb-20"
              }`}
              style={
                withdrawalPanelVisible === true
                  ? {
                      height: `calc(100vh - ${
                        mobileActionBarVisible ? "240px" : "20px"
                      })`,
                    }
                  : undefined
              }
            >
              {/* Only show tab content when withdrawal panel is not visible */}
              {!withdrawalPanelVisible ? (
                <motion.div
                  key={selectedTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="tab-content savings-panel-content animate-fadeInSlideUp pb-20"
                >
                  {renderTabContent()}
                </motion.div>
              ) : (
                /* Early Withdrawal Panel */
                <EarlyWithdrawalPanel
                  account={account}
                  withdrawalType={withdrawalType}
                  withdrawalAmount={withdrawalAmount}
                  withdrawalData={withdrawalData}
                  onWithdrawalTypeChange={handleWithdrawalTypeChange}
                  onWithdrawalAmountChange={handleWithdrawalAmountChange}
                  onCancel={toggleWithdrawalPanel}
                  onConfirm={confirmEarlyWithdrawal}
                />
              )}
            </div>

            {/* Mobile Action Bar */}
            {mobileActionBarVisible && (
              <div className="fixed bottom-6 left-8 right-8 bg-black/5 backdrop-blur-md rounded-3xl p-2 flex justify-around md:hidden z-[62]">
                {account.status !== "closed" && (
                  <motion.button
                    className="relative group flex flex-col items-center justify-center px-4 py-2 rounded-2xl overflow-hidden min-w-[70px]"
                    onClick={toggleWithdrawalPanel}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      duration: 0.2,
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-50/60 via-transparent to-orange-100/40 opacity-0 group-active:opacity-100 transition-opacity duration-200 rounded-2xl"></div>

                    <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg mb-1 group-active:shadow-xl transition-shadow duration-200">
                      <ArrowUpRight size={18} className="text-white" />
                    </div>
                    <span className="text-xs font-medium text-amber-600 relative">
                      Rút tiền
                    </span>
                  </motion.button>
                )}

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

export default SavingsAccountDetailDrawer;