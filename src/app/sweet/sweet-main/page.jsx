"use client";

import { useState, useEffect } from "react";
import { 
  Home, 
  Settings, 
  LogOut, 
  Calendar,
  User,
  Menu,
  X,
  ChevronRight,
  Users,
  CreditCard,
  PiggyBank,
  Receipt,
  LineChart,
  Wallet,
  Lock,
  History,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  LockIcon,
  UnlockIcon,
  ArrowUpRight,
  ArrowDownLeft,
  Smartphone,
  Globe,
  Building,
  FileText as FileIcon,
  DollarSign,
  TrendingUp,
  Circle,
  Calculator,
  Check,
  ClipboardList,
  PieChart,
  AlertTriangle,
  FileText,
  FileTextIcon,
  DollarSignIcon,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SwipeConfirmationModal from '@/components/ui/SwipeConfirmationModal';
import ExportNotification from '@/components/ui/notifications/ExportNotification';
import CustomerManagement from '@/components/CustomerManagement';
import EmployeeManagement from '@/components/EmployeeManagement';
import SavingsProductManagement from '@/components/SavingsProductManagement';
import SalesReportPage from '@/components/sales/SalesReportPage';
import PermissionManagement from '@/components/permissions/PermissionManagement';
import SystemSettings from '@/components/settings/SystemSettings';
import NavItem from '@/components/ui/custom/NavItem';
import MobileNavItem from '@/components/ui/custom/MobileNavItem';
import ProfileField from '@/components/ui/custom/ProfileField';
import SavingsAccountManagement from '@/components/SavingsAccountManagement';
import FilterableAccountTransactionList from "@/components/ui/payment/FilterableAccountTransactionList";
import FilterableTransactionList from "@/components/ui/savings/FilterableTransactionList";
import FilterableInterestList from "@/components/ui/savings/FilterableInterestList";
import FilterableWithdrawalList from "@/components/ui/savings/FilterableWithdrawalList";
import { EarlyWithdrawalPanel, SavingsAccountDetailDrawer } from "@/components/ui/savings";
import ModernHeader from "@/components/ui/custom/ModernHeader";
import SavingAccountDetail from "@/components/ui/savings/SavingAccountDetail";
import NewSavingsAccountModal from "@/components/ui/NewSavingsAccountModal";
import AnimatedTabNavigation from "@/components/ui/custom/AnimatedTabNavigation";
import DetailInfo from "@/components/ui/savings/DetailInfo";
// Add custom scrollbar styles
const scrollbarStyles = `
  /* Hide scrollbar by default */
  .custom-scrollbar::-webkit-scrollbar {
    width: 0;
    background: transparent;
    transition: all 0.3s ease;
  }

  /* Show scrollbar on hover */
  .nav-container:hover .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }

  /* Track */
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    margin: 10px 0;
  }

  /* Handle */
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    backdrop-filter: blur(4px);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  }

  /* Handle on hover */
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }

  /* Firefox scrollbar styling */
  .custom-scrollbar {
    scrollbar-width: none;
    scrollbar-color: rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1);
    transition: scrollbar-width 0.3s ease;
  }

  .nav-container:hover .custom-scrollbar {
    scrollbar-width: thin;
  }

  /* Right panel scrollbar (light theme) */
  .right-panel-scrollbar::-webkit-scrollbar {
    width: 0;
    background: transparent;
    transition: all 0.3s ease;
  }

  .right-panel:hover .right-panel-scrollbar::-webkit-scrollbar {
    width: 4px;
  }

  .right-panel-scrollbar::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    margin: 10px 0;
  }

  .right-panel-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    backdrop-filter: blur(4px);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.05);
  }

  .right-panel-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.15);
  }

  /* Firefox scrollbar styling for right panel */
  .right-panel-scrollbar {
    scrollbar-width: none;
    scrollbar-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.05);
    transition: scrollbar-width 0.3s ease;
  }

  .right-panel:hover .right-panel-scrollbar {
    scrollbar-width: thin;
  }
  
  /* Main content scrollbar */
  .main-content-scrollbar::-webkit-scrollbar {
    width: 5px;
    background: transparent;
    transition: all 0.3s ease;
  }

  .main-content-scrollbar::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.02);
    border-radius: 10px;
  }

  .main-content-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.06);
    border-radius: 10px;
    backdrop-filter: blur(4px);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.02);
  }

  .main-content-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.1);
  }

  /* Firefox styling for main content */
  .main-content-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.06) rgba(0, 0, 0, 0.02);
  }
  
  /* Custom animations */
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
    animation: fadeInSlideUp 0.3s ease forwards;
  }
  
  .animate-fadeOutSlideDown {
    animation: fadeOutSlideDown 0.3s ease forwards;
  }
`;

export default function Dashboard() {
  const [navHovered, setNavHovered] = useState(false);
  const [rightPanelVisible, setRightPanelVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [rightPanelContent, setRightPanelContent] = useState("notifications");
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profileModalAnimating, setProfileModalAnimating] = useState(false);
  
  // State for notifications
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');
  const [notificationFormat, setNotificationFormat] = useState('');
  
  // Add state for hiding sensitive account information
  const [hiddenAccountInfo, setHiddenAccountInfo] = useState({});
    
  // State for storing accounts, now as a state instead of a constant
  const [paymentAccounts, setPaymentAccounts] = useState([
    {
      id: 1,
      accountNumber: "1234567890123456",
      status: "active",
      balance: 15000000,
      creationDate: "20/04/2022",
      color: "bg-gradient-to-r from-blue-400 to-indigo-500",
      icon: <CreditCard size={24} className="text-white" />
    }
  ]);
  
  // State for managing account actions dropdown
  const [accountActionMenuOpen, setAccountActionMenuOpen] = useState(null);

  // State for mobile action bar visibility
  const [mobileActionBarVisible, setMobileActionBarVisible] = useState(true);
  
  // Account colors for rotation
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
  
  // State for storing savings accounts
  const [savingsAccounts, setSavingsAccounts] = useState([
    {
      id: 1,
      nickname: "Tiết kiệm mua nhà",
      depositNumber: "TK2023050001",
      term: "12 tháng",
      termDays: 365,
      amount: 200000000,
      remainingAmount: 200000000,
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
      icon: <PiggyBank size={24} className="text-white" />,
      tooltip: "Lãi suất ưu đãi +0.3%"
    },
    {
      id: 2,
      nickname: "Tiết kiệm du học",
      depositNumber: "TK2023060002",
      term: "6 tháng",
      termDays: 180,
      amount: 150000000,
      remainingAmount: 0,
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
      icon: <PiggyBank size={24} className="text-white" />
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
      icon: <PiggyBank size={24} className="text-white" />,
      tooltip: "VIP - Miễn phí rút tiền trước hạn"
    }
  ]);
  
  // State for savings account detail drawer
  const [savingsDetailVisible, setSavingsDetailVisible] = useState(false);
  const [selectedSavingsId, setSelectedSavingsId] = useState(null);
  const [savingsCardDetailVisible, setSavingsCardDetailVisible] = useState(false);
  const [selectedSavingsDetail, setSelectedSavingsDetail] = useState(null);
  const [savingsRightPanelContent, setSavingsRightPanelContent] = useState("transactions");
  
  // State for savings account transaction history
  const [savingsTransactionHistory, setSavingsTransactionHistory] = useState({
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
      },
      {
        id: 4,
        time: "09:45 - 10/08/2023",
        type: "Trả lãi",
        channel: "Hệ thống",
        amount: 150000000,
        content: "Trả lãi tiền gửi tiết kiệm kỳ 2",
        isInterest: true,
        interestAmount: 687500,
        balanceAfter: 150000000
      },
      {
        id: 5,
        time: "09:45 - 10/09/2023",
        type: "Trả lãi",
        channel: "Hệ thống",
        amount: 150000000,
        content: "Trả lãi tiền gửi tiết kiệm kỳ 3",
        isInterest: true,
        interestAmount: 687500,
        balanceAfter: 150000000
      },
      {
        id: 6,
        time: "09:45 - 10/10/2023",
        type: "Trả lãi",
        channel: "Hệ thống",
        amount: 150000000,
        content: "Trả lãi tiền gửi tiết kiệm kỳ 4",
        isInterest: true,
        interestAmount: 687500,
        balanceAfter: 150000000
      },
      {
        id: 7,
        time: "09:45 - 10/11/2023",
        type: "Trả lãi",
        channel: "Hệ thống",
        amount: 150000000,
        content: "Trả lãi tiền gửi tiết kiệm kỳ 5",
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
      },
      {
        id: 3,
        time: "10:00 - 05/10/2023",
        type: "Trả lãi",
        channel: "Hệ thống",
        amount: 300000000,
        content: "Trả lãi tiền gửi tiết kiệm quý 1",
        isInterest: true,
        interestAmount: 5325000,
        balanceAfter: 300000000
      }
    ]
  });
  
  // State for savings interest history
  const [savingsInterestHistory, setSavingsInterestHistory] = useState({
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
      },
      {
        id: 3,
        period: "Kỳ 3",
        date: "10/09/2023",
        amount: 687500,
        method: "Chuyển vào tài khoản thanh toán",
        status: "Đã thanh toán",
        targetAccount: "12345678901"
      },
      {
        id: 4,
        period: "Kỳ 4",
        date: "10/10/2023",
        amount: 687500,
        method: "Chuyển vào tài khoản thanh toán",
        status: "Đã thanh toán",
        targetAccount: "12345678901"
      },
      {
        id: 5,
        period: "Kỳ 5",
        date: "10/11/2023",
        amount: 687500,
        method: "Chuyển vào tài khoản thanh toán",
        status: "Đã thanh toán",
        targetAccount: "12345678901"
      },
      {
        id: 6,
        period: "Kỳ 6",
        date: "10/12/2023",
        amount: 687500,
        method: "Chuyển vào tài khoản thanh toán",
        status: "Đợi thanh toán",
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
      },
      {
        id: 2,
        period: "Quý 2",
        date: "05/01/2024",
        amount: 5325000,
        method: "Chuyển vào tài khoản thanh toán",
        status: "Đợi thanh toán",
        targetAccount: "98765432109"
      }
    ]
  });
  
  // State for savings withdrawal history
  const [savingsWithdrawalHistory, setSavingsWithdrawalHistory] = useState({
    1: [],
    2: [],
    3: []
  });
  
  // State for withdrawal panel
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
  
  // Generate current date in DD/MM/YYYY format
  const getCurrentDate = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  // Add state for swipe confirmation modals
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    title: "",
    description: "",
    confirmText: "",
    confirmDetails: null,
    type: "",
    isProcessing: false,
    onConfirm: null,
  });
  
  // Function to open the confirmation modal
  const openConfirmationModal = ({
    title,
    description,
    confirmText = "Quẹt để xác nhận",
    confirmDetails = null,
    type,
    onConfirm
  }) => {
    setConfirmationModal({
      isOpen: true,
      title,
      description,
      confirmText,
      confirmDetails,
      type,
      isProcessing: false,
      onConfirm
    });
  };
  
  // Function to close the confirmation modal
  const closeConfirmationModal = () => {
    setConfirmationModal(prev => ({
      ...prev,
      isOpen: false
    }));
  };
  
  // Function to set the modal to processing state
  const setConfirmationProcessing = (isProcessing) => {
    setConfirmationModal(prev => ({
      ...prev,
      isProcessing
    }));
  };
  
  // Function to close notification
  const handleCloseNotification = () => {
    setNotificationVisible(false);
  };
  
  // Toggle account status between active and locked
  const toggleAccountStatus = (accountId, accountStatus) => {
    openConfirmationModal({
      title: `${accountStatus === "active" ? 'Xác nhận khóa tài khoản' : 'Xác nhận mở khóa tài khoản'}`,
      description: `${accountStatus === 'active' 
        ? 'Khi khóa tài khoản, mọi giao dịch sẽ bị tạm dừng cho đến khi tài khoản được mở khóa.' 
        : 'Khi mở khóa tài khoản, tài khoản sẽ hoạt động bình thường trở lại.'
      }`,
      confirmText: `${accountStatus === "active" 
        ? 'Quẹt để khóa tài khoản' 
        : 'Quẹt để mở khóa tài khoản'
      }`,
      type: `${accountStatus === 'active' ? 'warning' : 'unlock'}`,
      onConfirm: () => {
        // Set processing state
        setConfirmationProcessing(true);
        
        // Process the account creation after a short delay
        setTimeout(() => {
          
          setPaymentAccounts(accounts => accounts.map(account => {
            if (account.id === accountId) {
              // Toggle between active and locked, but don't touch permanent_locked
              if (account.status === "permanent_locked") return account;
              
              return {
                ...account,
                status: account.status === "active" ? "locked" : "active"
              };
            }
            return account;
          }));
          
          // Close any open action menu
          setAccountActionMenuOpen(null);
          
          // Close modals and reset form
          closeConfirmationModal();
          
          // Show success notification
          setNotificationMessage(accountStatus === "active" 
            ? 'Tài khoản đã được khóa thành công!' 
            : 'Tài khoản đã được mở khóa thành công!'
          );
          setNotificationFormat(accountStatus === "active"
            ? 'Khóa thành công'
            : 'Mở khóa thành công'
          )
          setNotificationType('success');
          setNotificationVisible(true);
        }, 2000);
      }
    });
  };
  
  // Toggle account action menu
  const toggleAccountActionMenu = (accountId) => {
    if (accountActionMenuOpen === accountId) {
      setAccountActionMenuOpen(null);
    } else {
      setAccountActionMenuOpen(accountId);
    }
  };
  
  // Toggle visibility for an account's sensitive information
  const toggleAccountVisibility = (accountId) => {
    setHiddenAccountInfo(prev => ({
      ...prev,
      [accountId]: !prev[accountId]
    }));
  };
  
  // Format currency as VND
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  // Get status information (text and icon) based on status code
  const getStatusInfo = (status) => {
    switch(status) {
      case 'active':
        return { 
          icon: <CheckCircle size={14} className="text-green-500 mr-1" />, 
          text: 'Hoạt động',
          textColor: 'text-green-600',
          bgColor: 'bg-green-100'
        };
      case 'locked':
        return { 
          icon: <AlertCircle size={14} className="text-amber-500 mr-1" />, 
          text: 'Tạm khóa',
          textColor: 'text-amber-600',
          bgColor: 'bg-amber-100'
        };
      case 'permanent_locked':
        return { 
          icon: <XCircle size={14} className="text-red-500 mr-1" />, 
          text: 'Khóa vĩnh viễn',
          textColor: 'text-red-600',
          bgColor: 'bg-red-100'
        };
      default:
        return { 
          icon: <AlertCircle size={14} className="text-gray-500 mr-1" />, 
          text: 'Không xác định',
          textColor: 'text-gray-600',
          bgColor: 'bg-gray-100'
        };
    }
  };
  
  // Mask account number except last 4 digits
  const maskAccountNumber = (accountNumber) => {
    const lastFourDigits = accountNumber.slice(-4);
    const maskedPart = accountNumber.slice(0, -4).replace(/\d/g, '•');
    return maskedPart + lastFourDigits;
  };
  
  const [profileData, setProfileData] = useState({
    fullName: "Nguyễn Hoàng Hiến",
    dateOfBirth: "15/08/1990",
    idNumber: "038090123456",
    email: "hoanghien@gmail.com",
    phone: "0912345678",
    permanentAddress: {
      province: "Hà Nội",
      district: "Cầu Giấy",
      ward: "Dịch Vọng Hậu",
      street: "Trần Thái Tông",
      houseNumber: "108"
    },
    contactAddress: {
      province: "Hà Nội",
      district: "Cầu Giấy",
      ward: "Dịch Vọng Hậu",
      street: "Trần Thái Tông",
      houseNumber: "108"
    },
    accountCreated: "05/02/2022",
    accountType: "Premium"
  });
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    phone: "",
    contactAddress: {
      province: "",
      district: "",
      ward: "",
      street: "",
      houseNumber: ""
    }
  });
  
  // Add states for managing dynamic location dropdowns
  const [availableDistricts, setAvailableDistricts] = useState([]);
  const [availableWards, setAvailableWards] = useState([]);

  // Vietnamese provinces data
  const provinces = [
    { name: "Hà Nội", code: "HN" },
    { name: "Hồ Chí Minh", code: "HCM" },
    { name: "Đà Nẵng", code: "DN" },
    { name: "Hải Phòng", code: "HP" },
    { name: "Cần Thơ", code: "CT" },
    { name: "An Giang", code: "AG" },
    { name: "Bà Rịa - Vũng Tàu", code: "BRVT" },
    { name: "Bắc Giang", code: "BG" },
    { name: "Bắc Kạn", code: "BK" },
    { name: "Bạc Liêu", code: "BL" },
    { name: "Bắc Ninh", code: "BN" },
    { name: "Bến Tre", code: "BT" },
    { name: "Bình Định", code: "BD" },
    { name: "Bình Dương", code: "BDG" },
    { name: "Bình Phước", code: "BP" },
    { name: "Bình Thuận", code: "BTH" },
    { name: "Cà Mau", code: "CM" },
    { name: "Cao Bằng", code: "CB" },
    { name: "Đắk Lắk", code: "DL" },
    { name: "Đắk Nông", code: "DN2" },
    { name: "Điện Biên", code: "DB" },
    { name: "Đồng Nai", code: "DNA" },
    { name: "Đồng Tháp", code: "DT" },
    { name: "Gia Lai", code: "GL" },
    { name: "Hà Giang", code: "HG" },
    { name: "Hà Nam", code: "HNA" },
    { name: "Hà Tĩnh", code: "HT" },
    { name: "Hải Dương", code: "HD" },
    { name: "Hậu Giang", code: "HGI" },
    { name: "Hòa Bình", code: "HB" },
    { name: "Hưng Yên", code: "HY" },
    { name: "Khánh Hòa", code: "KH" },
    { name: "Kiên Giang", code: "KG" },
    { name: "Kon Tum", code: "KT" },
    { name: "Lai Châu", code: "LC" },
    { name: "Lâm Đồng", code: "LD" },
    { name: "Lạng Sơn", code: "LS" },
    { name: "Lào Cai", code: "LCA" },
    { name: "Long An", code: "LA" },
    { name: "Nam Định", code: "ND" },
    { name: "Nghệ An", code: "NA" },
    { name: "Ninh Bình", code: "NB" },
    { name: "Ninh Thuận", code: "NT" },
    { name: "Phú Thọ", code: "PT" },
    { name: "Phú Yên", code: "PY" },
    { name: "Quảng Bình", code: "QB" },
    { name: "Quảng Nam", code: "QNA" },
    { name: "Quảng Ngãi", code: "QNG" },
    { name: "Quảng Ninh", code: "QN" },
    { name: "Quảng Trị", code: "QT" },
    { name: "Sóc Trăng", code: "ST" },
    { name: "Sơn La", code: "SL" },
    { name: "Tây Ninh", code: "TN" },
    { name: "Thái Bình", code: "TB" },
    { name: "Thái Nguyên", code: "TNG" },
    { name: "Thanh Hóa", code: "TH" },
    { name: "Thừa Thiên Huế", code: "TTH" },
    { name: "Tiền Giang", code: "TG" },
    { name: "Trà Vinh", code: "TV" },
    { name: "Tuyên Quang", code: "TQ" },
    { name: "Vĩnh Long", code: "VL" },
    { name: "Vĩnh Phúc", code: "VP" },
    { name: "Yên Bái", code: "YB" }
];

  
  // District data organized by province
  const districtsByProvince = {
    "Hà Nội": ["Ba Đình", "Hoàn Kiếm", "Hai Bà Trưng", "Đống Đa", "Tây Hồ", "Cầu Giấy", "Thanh Xuân", "Hoàng Mai", "Long Biên", "Bắc Từ Liêm", "Nam Từ Liêm", "Hà Đông", "Sơn Tây", "Ba Vì", "Phúc Thọ", "Đan Phượng", "Hoài Đức", "Quốc Oai", "Thạch Thất", "Chương Mỹ", "Thanh Oai", "Thường Tín", "Phú Xuyên", "Ứng Hòa", "Mỹ Đức", "Mê Linh", "Sóc Sơn", "Đông Anh", "Gia Lâm", "Thanh Trì"],
    "Hồ Chí Minh": ["Quận 1", "Quận 2", "Quận 3", "Quận 4", "Quận 5", "Quận 6", "Quận 7", "Quận 8", "Quận 9", "Quận 10", "Quận 11", "Quận 12", "Quận Bình Tân", "Quận Bình Thạnh", "Quận Gò Vấp", "Quận Phú Nhuận", "Quận Tân Bình", "Quận Tân Phú", "Quận Thủ Đức", "Huyện Bình Chánh", "Huyện Cần Giờ", "Huyện Củ Chi", "Huyện Hóc Môn", "Huyện Nhà Bè"],
    "Đà Nẵng": ["Hải Châu", "Thanh Khê", "Sơn Trà", "Ngũ Hành Sơn", "Liên Chiểu", "Cẩm Lệ", "Hòa Vang"],
    // Other provinces would follow the same pattern
  };
  
  // Ward data organized by district
  const wardsByDistrict = {
    "Cầu Giấy": ["Dịch Vọng", "Dịch Vọng Hậu", "Mai Dịch", "Nghĩa Đô", "Nghĩa Tân", "Quan Hoa", "Trung Hòa", "Yên Hòa"],
    "Thanh Xuân": ["Hạ Đình", "Khương Đình", "Khương Mai", "Khương Trung", "Kim Giang", "Nhân Chính", "Phương Liệt", "Thanh Xuân Bắc", "Thanh Xuân Nam", "Thanh Xuân Trung", "Thượng Đình"],
    // Other districts would follow the same pattern
  };

  // Effect to update districts when province changes
  useEffect(() => {
    if (editData.contactAddress.province) {
      const districts = districtsByProvince[editData.contactAddress.province] || [];
      setAvailableDistricts(districts);
      
      // Reset district and ward if province changes
      if (editData.contactAddress.district && !districts.includes(editData.contactAddress.district)) {
        setEditData(prev => ({
          ...prev,
          contactAddress: {
            ...prev.contactAddress,
            district: '',
            ward: ''
          }
        }));
        setAvailableWards([]);
      }
    }
  }, [editData.contactAddress.province]);

  // Effect to update wards when district changes
  useEffect(() => {
    if (editData.contactAddress.district) {
      const wards = wardsByDistrict[editData.contactAddress.district] || [];
      setAvailableWards(wards);
      
      // Reset ward if district changes
      if (editData.contactAddress.ward && !wards.includes(editData.contactAddress.ward)) {
        setEditData(prev => ({
          ...prev,
          contactAddress: {
            ...prev.contactAddress,
            ward: ''
          }
        }));
      }
    }
  }, [editData.contactAddress.district]);

  // Check if viewing on mobile device
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Reset animation state after modal opens
  useEffect(() => {
    if (profileModalOpen && profileModalAnimating) {
      const timer = setTimeout(() => {
        setProfileModalAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [profileModalOpen, profileModalAnimating]);

  // Add scroll detection for elegant scrollbars
  useEffect(() => {
    if (profileModalOpen) {
      const mainScrollable = document.querySelector('.elegant-scrollbar.has-scroll');
      const scrollIndicator = document.querySelector('.scroll-indicator');
      
      if (mainScrollable && scrollIndicator) {
        // Check if content is scrollable
        const isScrollable = mainScrollable.scrollHeight > mainScrollable.clientHeight;
        
        // Initially hide scroll indicator if at bottom
        const isAtBottom = Math.abs(mainScrollable.scrollHeight - mainScrollable.scrollTop - mainScrollable.clientHeight) < 10;
        if (isAtBottom) {
          scrollIndicator.style.opacity = '0';
        }
        
        // Add event listener for scroll position
        const handleScroll = () => {
          const isAtBottom = Math.abs(mainScrollable.scrollHeight - mainScrollable.scrollTop - mainScrollable.clientHeight) < 10;
          
          if (isAtBottom) {
            scrollIndicator.style.opacity = '0';
          } else {
            scrollIndicator.style.opacity = '1';
          }
        };
        
        // Set initial fade status
        if (!isScrollable) {
          scrollIndicator.style.opacity = '0';
        }
        
        // Add and remove event listener
        mainScrollable.addEventListener('scroll', handleScroll);
        
        return () => {
          mainScrollable.removeEventListener('scroll', handleScroll);
        };
      }
    }
  }, [profileModalOpen]);

  const toggleRightPanel = (contentType) => {
    // If the panel is already open and user clicks the same content type, close it
    if (rightPanelVisible && rightPanelContent === contentType) {
      setRightPanelVisible(false);
    } else {
      // Otherwise open the panel with the selected content type
      setRightPanelContent(contentType);
      setRightPanelVisible(true);
    }
  };
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  // Toggle profile modal
  const toggleProfileModal = () => {
    if (!profileModalOpen && !profileModalAnimating) {
      // Opening the modal
      setProfileModalAnimating(true);
      setProfileModalOpen(true);
      // Initialize edit data with current values
      setEditData({
        phone: profileData.phone,
        contactAddress: {...profileData.contactAddress}
      });
      
      // Initialize available districts and wards based on current address
      if (profileData.contactAddress.province) {
        setAvailableDistricts(districtsByProvince[profileData.contactAddress.province] || []);
      }
      if (profileData.contactAddress.district) {
        setAvailableWards(wardsByDistrict[profileData.contactAddress.district] || []);
      }
      
      // Reset edit mode when opening modal
      setEditMode(false);
    } else if (profileModalOpen && !profileModalAnimating) {
      // Closing the modal - start exit animation
      setProfileModalAnimating(true);
      
      // Apply exit animation class and wait for it to complete
      const modalOverlay = document.getElementById('profileModalOverlay');
      const modalContent = document.getElementById('profileModalContent');
      
      if (modalOverlay && modalContent) {
        modalOverlay.classList.remove('modal-enter');
        modalContent.classList.remove('modal-enter-content');
        modalOverlay.classList.add('modal-exit');
        modalContent.classList.add('modal-exit-content');
        
        // Wait for animation to complete before removing from DOM
        setTimeout(() => {
          setProfileModalOpen(false);
          setEditMode(false);
          setProfileModalAnimating(false);
        }, 300); // Same duration as our animation
      } else {
        // Fallback if elements aren't found
        setProfileModalOpen(false);
        setEditMode(false);
        setProfileModalAnimating(false);
      }
    }
  };

  // Handle edit mode
  const handleEditToggle = () => {
    // Add transition effect when toggling edit mode
    if (!editMode) {
      // Smoother transition without jerky movement
      document.querySelectorAll('.profile-section').forEach((section) => {
        section.classList.add('smooth-transition');
      });
      
      // Set edit mode state immediately without animations
      setEditMode(true);
    } else {
      // Exit edit mode immediately
      setEditMode(false);
      
      // Apply smooth transition back
      document.querySelectorAll('.profile-section').forEach((section) => {
        section.classList.add('smooth-transition');
        
        // Remove the class after transition is complete
        setTimeout(() => {
          section.classList.remove('smooth-transition');
        }, 500);
      });
    }
  };

  // Handle input change for edit fields
  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setEditData({
        ...editData,
        [parent]: {
          ...editData[parent],
          [child]: value
        }
      });
    } else {
      setEditData({
        ...editData,
        [field]: value
      });
    }
  };

  // Handle save changes
  const handleSaveChanges = () => {
    // Mở modal xác nhận trước khi lưu thay đổi
    openConfirmationModal({
      title: 'Xác nhận lưu thay đổi',
      description: 'Bạn có chắc chắn muốn cập nhật thông tin cá nhân?',
      confirmText: 'Quẹt để xác nhận',
      type: 'update',
      onConfirm: () => {
        // Set processing state
        setConfirmationProcessing(true);
        
        // Process the profile update after a short delay
        setTimeout(() => {
          // Cập nhật thông tin profile
          setProfileData({
            ...profileData,
            phone: editData.phone,
            contactAddress: editData.contactAddress
          });
          
          // Tắt chế độ chỉnh sửa
          setEditMode(false);
          
          // Đóng modal xác nhận
          closeConfirmationModal();
          
          // Hiển thị thông báo thành công
          setNotificationMessage('Cập nhật thông tin thành công!');
          setNotificationFormat('Thông tin cá nhân đã được cập nhật thành công!');
          setNotificationType('success');
          setNotificationVisible(true);
        }, 1500);
      }
    });
  };

  // Thêm state quản lý drawer
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  
  // Dữ liệu giao dịch mẫu cho mỗi tài khoản
  const [transactionHistoryData, setTransactionHistoryData] = useState({
    1: [
      {
        id: 1,
        time: "15:30 - 12/05/2023",
        type: "Nhận tiền chuyển khoản",
        channel: "Internet Banking",
        amount: 5000000,
        balanceAfter: 20000000,
        content: "Chuyển tiền thanh toán dự án website",
        isIncoming: true
      },
      {
        id: 2,
        time: "09:15 - 10/05/2023",
        type: "Chuyển tiền",
        channel: "ATM",
        amount: 1500000,
        balanceAfter: 15000000,
        content: "Chuyển tiền học phí",
        isIncoming: false
      },
      {
        id: 3,
        time: "14:45 - 05/05/2023",
        type: "Thanh toán hóa đơn",
        channel: "Mobile Banking",
        amount: 850000,
        balanceAfter: 16500000,
        content: "Thanh toán hóa đơn điện tháng 5",
        isIncoming: false
      },
      {
        id: 4,
        time: "08:30 - 01/05/2023",
        type: "Nhận lương",
        channel: "Chuyển khoản liên ngân hàng",
        amount: 17350000,
        balanceAfter: 17350000,
        content: "Lương tháng 4/2023",
        isIncoming: true
      }
    ]
  });

  // Thêm state để quản lý hiển thị thẻ tài khoản chi tiết
  const [cardDetailVisible, setCardDetailVisible] = useState(false);
  const [selectedCardDetail, setSelectedCardDetail] = useState(null);

  // Cập nhật hàm mở drawer và thẻ chi tiết
  const openTransactionDrawer = (accountId) => {
    // Lưu tài khoản được chọn
    setSelectedAccountId(accountId);
    
    // Tìm thông tin tài khoản chi tiết
    const accountDetail = paymentAccounts.find(acc => acc.id === accountId);
    setSelectedCardDetail(accountDetail);
    
    // Hiển thị drawer và thẻ chi tiết
    setDrawerVisible(true);
    
    // Đợi một chút để có hiệu ứng lần lượt
    setTimeout(() => {
      setCardDetailVisible(true);
    }, 100);
  };

  // Cập nhật hàm đóng drawer
  const closeTransactionDrawer = () => {
    // Đóng thẻ chi tiết trước, sau đó mới đóng drawer
    setCardDetailVisible(false);
    
    setTimeout(() => {
      setDrawerVisible(false);
      
      // Reset các state sau khi animation hoàn tất
      setTimeout(() => {
        setSelectedAccountId(null);
        setSelectedCardDetail(null);
      }, 300);
    }, 200);
  };
  
  // Open savings account detail drawer
  const openSavingsDetailDrawer = (savingsId) => {
    // Save the selected savings account
    setSelectedSavingsId(savingsId);
    
    // Find detailed savings account information
    const savingsDetail = savingsAccounts.find(acc => acc.id === savingsId);
    setSelectedSavingsDetail(savingsDetail);
    
    // Show drawer and card detail with animation
    setSavingsDetailVisible(true);

    setWithdrawalPanelVisible(false);
    
    // Wait a bit for sequential animation
    setTimeout(() => {
      setSavingsCardDetailVisible(true);
    }, 100);
    
    // Set default right panel content
    setSavingsRightPanelContent("transactions");
  };
  
  // Close savings account detail drawer
  const closeSavingsDetailDrawer = () => {
    // Close card detail first, then close drawer
    setSavingsCardDetailVisible(false);
    
    setTimeout(() => {
      setSavingsDetailVisible(false);
      
      // Reset states after animation completes
      setTimeout(() => {
        setSelectedSavingsId(null);
        setSelectedSavingsDetail(null);
      }, 300);
    }, 200);
  };
  
  // Switch between right panel content types for savings
  const switchSavingsRightPanel = (contentType) => {
    // Don't allow switching if withdrawal panel is visible
    if (withdrawalPanelVisible) return;
    
    // If changing from one tab to another, fade out current content first
    if (savingsRightPanelContent !== contentType) {
      const currentPanelContent = document.querySelector('.savings-panel-content');
      if (currentPanelContent) {
        currentPanelContent.classList.remove('animate-fadeInSlideUp');
        currentPanelContent.classList.add('animate-fadeOutSlideDown');
        
        // After animation completes, switch to new content
        setTimeout(() => {
          setSavingsRightPanelContent(contentType);
          
          // Force a new animation cycle by removing and adding the class after a tiny delay
          setTimeout(() => {
            const newPanelContent = document.querySelector('.savings-panel-content');
            if (newPanelContent) {
              newPanelContent.classList.remove('animate-fadeOutSlideDown');
              newPanelContent.classList.add('animate-fadeInSlideUp');
            }
          },);
        }, );
      } else {
        setSavingsRightPanelContent(contentType);
      }
    }
  };
  
  // Calculate progress percentage for term completion
  const calculateTermProgress = (daysRemaining, termDays) => {
    // Reverse the logic: more days remaining means more progress (longer colored bar)
    const progressPercentage = Math.min(100, Math.max(0, (daysRemaining / termDays) * 100));
    return progressPercentage;
  };
  
  // Get transaction type information with icon and style
  const getSavingsTransactionTypeInfo = (transaction) => {
    if (transaction.isDeposit) {
      return {
        icon: <ArrowDownLeft size={14} className="text-green-500 mr-1" />,
        textColor: 'text-green-600',
        bgColor: 'bg-green-100'
      };
    } else if (transaction.isInterest) {
      return {
        icon: <DollarSign size={14} className="text-blue-500 mr-1" />,
        textColor: 'text-blue-600',
        bgColor: 'bg-blue-100'
      };
    } else if (transaction.isSystem) {
      return {
        icon: <CheckCircle size={14} className="text-indigo-500 mr-1" />,
        textColor: 'text-indigo-600',
        bgColor: 'bg-indigo-100'
      };
    } else {
      return {
        icon: <FileText size={14} className="text-gray-500 mr-1" />,
        textColor: 'text-gray-600',
        bgColor: 'bg-gray-100'
      };
    }
  };
  
  // Lấy tên kênh giao dịch và icon tương ứng
  const getChannelInfo = (channel) => {
    switch(channel) {
      case 'Internet Banking':
        return { icon: <Globe size={14} className="text-blue-500 mr-1" />, name: channel };
      case 'Mobile Banking':
        return { icon: <Smartphone size={14} className="text-green-500 mr-1" />, name: channel };
      case 'ATM':
        return { icon: <CreditCard size={14} className="text-purple-500 mr-1" />, name: channel };
      case 'Quầy giao dịch':
        return { icon: <Building size={14} className="text-amber-500 mr-1" />, name: channel };
      case 'Chuyển khoản liên ngân hàng':
        return { icon: <FileIcon size={14} className="text-indigo-500 mr-1" />, name: channel };
      default:
        return { icon: <FileIcon size={14} className="text-gray-500 mr-1" />, name: channel };
    }
  };
  
  // Add state for savings account creation modal
  const [savingsAccountModalOpen, setSavingsAccountModalOpen] = useState(false);
  const [savingsAccountModalAnimating, setSavingsAccountModalAnimating] = useState(false);
  const [savingsData, setSavingsData] = useState({
    depositType: "standard", // standard or flexible
    sourceAccount: "",
    targetAccount: "",
    amount: "",
    interestPaymentType: "end_of_term", // end_of_term, monthly, quarterly, yearly
    term: "1_month", // 1_month, 3_months, 6_months, 9_months, 12_months, 18_months, 24_months, 36_months
    maturityOption: "receive_all", // receive_all, rollover_principal, rollover_all (only for end_of_term)
    nickname: "" // Added nickname field for custom naming
  });
  
  // State for modal steps
  const [savingsModalStep, setSavingsModalStep] = useState(1);
  
  // State for calculated interest rates and amounts
  const [calculatedInterest, setCalculatedInterest] = useState({
    rate: 0,
    interestAmount: 0,
    totalAmount: 0
  });
  
  // State for validation errors
  const [savingsValidationErrors, setSavingsValidationErrors] = useState({});
  
  // Interest rate data based on deposit type, interest payment type, and term
  const interestRateData = {
    standard: {
      end_of_term: {
        "1_month": 3.1,
        "3_months": 3.4,
        "6_months": 4.8,
        "9_months": 5.0,
        "12_months": 6.8,
        "18_months": 6.9,
        "24_months": 7.1,
        "36_months": 7.2
      },
      monthly: {
        "3_months": 3.3,
        "6_months": 4.6,
        "9_months": 4.8,
        "12_months": 6.5,
        "18_months": 6.6,
        "24_months": 6.8,
        "36_months": 6.9
      },
      quarterly: {
        "6_months": 4.7,
        "9_months": 4.9,
        "12_months": 6.6,
        "18_months": 6.7,
        "24_months": 6.9,
        "36_months": 7.0
      },
      yearly: {
        "12_months": 6.7,
        "18_months": 6.8,
        "24_months": 7.0,
        "36_months": 7.1
      }
    },
    flexible: {
      end_of_term: {
        "1_month": 2.9,
        "3_months": 3.2,
        "6_months": 4.5,
        "9_months": 4.7,
        "12_months": 6.3,
        "18_months": 6.4,
        "24_months": 6.6,
        "36_months": 6.7
      },
      monthly: {
        "3_months": 3.1,
        "6_months": 4.3,
        "9_months": 4.5,
        "12_months": 6.1,
        "18_months": 6.2,
        "24_months": 6.4,
        "36_months": 6.5
      },
      quarterly: {
        "6_months": 4.4,
        "9_months": 4.6,
        "12_months": 6.2,
        "18_months": 6.3,
        "24_months": 6.5,
        "36_months": 6.6
      },
      yearly: {
        "12_months": 6.2,
        "18_months": 6.3,
        "24_months": 6.5,
        "36_months": 6.6
      }
    }
  };
  
  // Term display names
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
  
  // Interest payment type display names
  const interestPaymentTypeDisplayNames = {
    "end_of_term": "Cuối kỳ",
    "monthly": "Hàng tháng",
    "quarterly": "Hàng quý",
    "yearly": "Đầu kỳ"
  };
  
  // Available terms based on interest payment type
  const availableTermsByInterestType = {
    end_of_term: ["1_month", "3_months", "6_months", "9_months", "12_months", "18_months", "24_months", "36_months"],
    monthly: ["3_months", "6_months", "9_months", "12_months", "18_months", "24_months", "36_months"],
    quarterly: ["6_months", "9_months", "12_months", "18_months", "24_months", "36_months"],
    yearly: ["12_months", "18_months", "24_months", "36_months"]
  };

  // Toggle savings account creation modal
  const toggleSavingsAccountModal = () => {
    if (!savingsAccountModalOpen && !savingsAccountModalAnimating) {
      // Opening the modal
      setSavingsAccountModalAnimating(true);
      setSavingsAccountModalOpen(true);
      
      // Reset data and steps
      setSavingsData({
        depositType: "standard",
        sourceAccount: "",
        targetAccount: "",
        amount: "",
        interestPaymentType: "end_of_term",
        term: "1_month",
        maturityOption: "receive_all",
        nickname: "" // Reset nickname field
      });
      setSavingsModalStep(1);
      setSavingsValidationErrors({});
      
      // Reset animation state after opening
      setTimeout(() => {
        setSavingsAccountModalAnimating(false);
      }, 300);
    } else if (savingsAccountModalOpen && !savingsAccountModalAnimating) {
      // Closing the modal - start exit animation
      setSavingsAccountModalAnimating(true);
      
      // Apply exit animation
      const modalOverlay = document.getElementById('savingsAccountModalOverlay');
      const modalContent = document.getElementById('savingsAccountModalContent');
      
      if (modalOverlay && modalContent) {
        modalOverlay.classList.remove('modal-enter');
        modalContent.classList.remove('modal-enter-content');
        modalOverlay.classList.add('modal-exit');
        modalContent.classList.add('modal-exit-content');
        
        // Wait for animation to complete before removing from DOM
        setTimeout(() => {
          setSavingsAccountModalOpen(false);
          setSavingsAccountModalAnimating(false);
        }, 300);
      } else {
        // Fallback if elements aren't found
        setSavingsAccountModalOpen(false);
        setSavingsAccountModalAnimating(false);
      }
    }
  };
  
  // Calculate interest based on current form data
  const calculateSavingsInterest = () => {
    const { depositType, interestPaymentType, term, amount } = savingsData;
    
    // Get interest rate
    const interestRate = interestRateData[depositType][interestPaymentType][term] || 0;
    
    // Calculate interest amount based on payment type
    const amountValue = parseFloat(amount) || 0;
    let interestAmount = 0;
    const termMonths = parseInt(term.split('_')[0]) || (term === "1_month" ? 1 : 0);
    
    // End of term: simple interest calculation
    if (interestPaymentType === "end_of_term") {
      interestAmount = (amountValue * interestRate * termMonths / 12) / 100;
    } 
    // Monthly, quarterly, yearly: compound interest calculation
    else {
      const periodsPerYear = interestPaymentType === "monthly" ? 12 : 
                            interestPaymentType === "quarterly" ? 4 : 1;
      
      const periodsTotal = periodsPerYear * termMonths / 12;
      const ratePerPeriod = interestRate / periodsPerYear / 100;
      
      interestAmount = 0;
      let remainingPrincipal = amountValue;
      
      for (let i = 1; i <= periodsTotal; i++) {
        const periodInterest = remainingPrincipal * ratePerPeriod;
        interestAmount += periodInterest;
      }
    }
    
    setCalculatedInterest({
      rate: interestRate,
      interestAmount: interestAmount,
      totalAmount: amountValue + interestAmount
    });
  };
  
  // Calculate early withdrawal interest based on savings account type and interest payment frequency
  const calculateEarlyWithdrawalInterest = (savings, withdrawalAmountValue = null) => {
    // Sử dụng remainingAmount nếu có, nếu không thì sử dụng amount
    const currentAmount = typeof savings.remainingAmount !== 'undefined' ? savings.remainingAmount : savings.amount;
    const { amount, interestRate, interestFrequency, daysRemaining, termDays } = savings;
    const daysPassed = termDays - daysRemaining;
    const isFullWithdrawal = withdrawalAmountValue === null;
    
    // Amount to be withdrawn - either full amount or partial amount
    const withdrawAmount = isFullWithdrawal ? currentAmount : Math.min(withdrawalAmountValue, currentAmount);
    
    // For standard deposits, we only allow full withdrawal
    if (savings.depositType === "Tiền gửi tiêu chuẩn" && !isFullWithdrawal) {
      return null;
    }
    
    // Calculate the interest for early withdrawal based on frequency
    let withdrawalInterest = 0;
    let remainingBalance = isFullWithdrawal ? 0 : currentAmount - withdrawAmount;
    let expectedInterest = 0;
    
    // Calculate using no-term interest rate (0.1%) instead of the original rate
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
  
  // Toggle withdrawal panel
  const toggleWithdrawalPanel = () => {
    if (withdrawalPanelVisible) {
      // First hide the withdrawal panel with animation
      setWithdrawalPanelVisible(false);
      setMobileActionBarVisible(true); // Show action bar when closing withdrawal panel
      
      // After the exit animation, reset states
      setTimeout(() => {
        if (selectedSavingsDetail.depositType === 'Tiền gửi tiêu chuẩn') {
          setWithdrawalType('full');
        }
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
      // Keep track of the current panel content so we can restore it later
      // First fade out the current content
      const currentPanelContent = document.querySelector('.savings-panel-content');
      if (currentPanelContent) {
        currentPanelContent.classList.add('animate-fadeOutSlideDown');
      }

      setMobileActionBarVisible(false); 
      
      // After a short delay, initialize and show the withdrawal panel
      setTimeout(() => {
        // Check if it's a standard deposit and set withdrawal type accordingly
        const isStandardDeposit = selectedSavingsDetail && selectedSavingsDetail.depositType === "Tiền gửi tiêu chuẩn";
        setWithdrawalType(isStandardDeposit ? 'full' : 'partial');
        
        // Khởi tạo panel rút tiền với rút toàn bộ hoặc một phần dựa trên loại tiết kiệm
        const withdrawalCalc = calculateEarlyWithdrawalInterest(selectedSavingsDetail, isStandardDeposit ? null : 100000);
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
  
  const handleWithdrawalTypeChange = (type) => {
    // Check if it's a standard deposit
    const isStandardDeposit = selectedSavingsDetail && selectedSavingsDetail.depositType === "Tiền gửi tiêu chuẩn";
    
    // If it's a standard deposit, only allow full withdrawal
    if (isStandardDeposit && type === 'partial') {
      return;
    }
    
    setWithdrawalType(type);
    
    if (type === 'full') {
      // Reset số tiền rút và tính toán lại dựa trên toàn bộ số tiền
      setWithdrawalAmount('');
      const withdrawalCalc = calculateEarlyWithdrawalInterest(selectedSavingsDetail);
      setWithdrawalData(withdrawalCalc);
    } else {
      // Khởi tạo với số tiền rút tối thiểu cho việc rút một phần
      setWithdrawalAmount('100000');
      const withdrawalCalc = calculateEarlyWithdrawalInterest(selectedSavingsDetail, 100000);
      setWithdrawalData(withdrawalCalc);
    }
  };
  
  // Handle withdrawal amount input change
  const handleWithdrawalAmountChange = (value) => {
    setWithdrawalAmount(value);
    
    // Xác thực số tiền và tính toán lãi suất ngay lập tức cho bất kỳ giá trị nào
    const numValue = parseFloat(value) || 0;
    
    // Tính toán lãi suất ngay cả khi số tiền chưa đạt mức tối thiểu
    // để người dùng có thể thấy kết quả ngay khi nhập
    if (numValue > 0) {
      const withdrawalCalc = calculateEarlyWithdrawalInterest(selectedSavingsDetail, numValue);
      setWithdrawalData(withdrawalCalc);
    } else {
      // Nếu không có giá trị hoặc giá trị không hợp lệ, đặt lãi về 0
      setWithdrawalData({
        ...withdrawalData,
        withdrawAmount: numValue,
        withdrawalInterest: 0,
        totalWithdrawal: numValue,
        remainingBalance: selectedSavingsDetail.amount - numValue,
        expectedInterest: 0
      });
    }
  };
  
  // Confirm early withdrawal
  const confirmEarlyWithdrawal = () => {
    // Format the currency values for display
    const formattedWithdrawnAmount = formatCurrency(withdrawalData.withdrawAmount);
    const formattedInterestAmount = formatCurrency(withdrawalData.withdrawalInterest);
    const formattedTotalWithdrawal = formatCurrency(withdrawalData.totalWithdrawal);
    
    // Show confirmation modal
    openConfirmationModal({
      title: "Xác nhận rút tiền tiết kiệm",
      description: `Bạn đang rút ${withdrawalType === 'full' ? 'toàn bộ' : 'một phần'} tiền từ tài khoản tiết kiệm.`,
      confirmText: "Quẹt để rút tiền",
      confirmDetails: {
        "Số tiền gốc": formattedWithdrawnAmount,
        "Lãi rút trước hạn": formattedInterestAmount,
        "Tổng tiền nhận": formattedTotalWithdrawal
      },
      type: "warning",
      onConfirm: () => {
        // Set processing state
        setConfirmationProcessing(true);
        
        // Process the withdrawal after a short delay
        setTimeout(() => {
          // Create a timestamp for the withdrawal
          const now = new Date();
          const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} - ${getCurrentDate()}`;
          
          // Create new withdrawal history entry
          const newWithdrawalEntry = {
            id: (savingsWithdrawalHistory[selectedSavingsId]?.length || 0) + 1,
            time: timeStr,
            withdrawnAmount: withdrawalData.withdrawAmount,
            interestAmount: withdrawalData.withdrawalInterest,
            remainingBalance: withdrawalData.remainingBalance,
            isPartial: withdrawalType === 'partial',
            channel: "Internet Banking",
            status: "Thành công"
          };
          
          // Update withdrawal history
          setSavingsWithdrawalHistory(prev => ({
            ...prev,
            [selectedSavingsId]: [...(prev[selectedSavingsId] || []), newWithdrawalEntry]
          }));
          
          // Update the savings account balance if partial withdrawal
          if (withdrawalType === 'partial') {
            setSavingsAccounts(accounts => 
              accounts.map(acc => {
                if (acc.id === selectedSavingsId) {
                  return {
                    ...acc,
                    remainingAmount: withdrawalData.remainingBalance,
                    totalReceivable: withdrawalData.remainingBalance + withdrawalData.expectedInterest
                  };
                }
                return acc;
              })
            );
            
            // Update selected savings detail
            setSelectedSavingsDetail(prev => ({
              ...prev,
              remainingAmount: withdrawalData.remainingBalance,
              totalReceivable: withdrawalData.remainingBalance + withdrawalData.expectedInterest
            }));
          } else {
            // For full withdrawal, remove the account from the list
            setSavingsAccounts(accounts => 
              accounts.filter(acc => acc.id !== selectedSavingsId)
            );
            
            // Close the drawer after successful withdrawal
            closeSavingsDetailDrawer();
          }
          
          // Add amount to a payment account (first one for simplicity)
          setPaymentAccounts(accounts => {
            if (accounts.length > 0) {
              const firstAccount = accounts[0];
              const updatedAccounts = [...accounts];
              updatedAccounts[0] = {
                ...firstAccount,
                balance: firstAccount.balance + withdrawalData.totalWithdrawal
              };
              return updatedAccounts;
            }
            return accounts;
          });
          
          // Close both modals
          closeConfirmationModal();
          toggleWithdrawalPanel();
          
          // Open withdrawal history tab after successful withdrawal
          switchSavingsRightPanel("withdrawals");
          
          // Show success notification
          const message = 'Rút tiền thành công';
          const format = withdrawalType === 'full' 
            ? `Rút toàn bộ tiền từ tài khoản tiết kiệm "${selectedSavingsDetail.nickname}" thành công: ${formatCurrency(withdrawalData.totalWithdrawal)}`
            : `Rút tiền từ tài khoản tiết kiệm "${selectedSavingsDetail.nickname}" thành công: ${formatCurrency(withdrawalData.totalWithdrawal)}`;
          setNotificationMessage(message);
          setNotificationFormat(format);
          setNotificationType('success');
          setNotificationVisible(true);
        }, 2000);
      }
    });
  };
  
  // Handle savings form input changes
  const handleSavingsInputChange = (field, value) => {
    setSavingsData(prev => {
      const newData = { ...prev, [field]: value };
      
      // If changing interest payment type, reset term if not available
      if (field === "interestPaymentType") {
        const availableTerms = availableTermsByInterestType[value];
        if (!availableTerms.includes(newData.term)) {
          newData.term = availableTerms[0];
        }
        
        // Reset maturity option if not end_of_term
        if (value !== "end_of_term") {
          newData.maturityOption = "receive_all";
        }
      }
      
      return newData;
    });
    
    // Clear validation error for this field if any
    if (savingsValidationErrors[field]) {
      setSavingsValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };
  
  // Validate savings form data
  const validateSavingsForm = () => {
    const errors = {};
    
    if (!savingsData.sourceAccount) {
      errors.sourceAccount = "Vui lòng chọn tài khoản nguồn";
    }
    
    if (!savingsData.targetAccount) {
      errors.targetAccount = "Vui lòng chọn tài khoản nhận";
    }
    
    if (!savingsData.amount) {
      errors.amount = "Vui lòng nhập số tiền";
    } else if (parseFloat(savingsData.amount) < 100000) {
      errors.amount = "Số tiền tối thiểu là 100.000đ";
    } else {
      // Check if source account has enough balance
      const sourceAccount = paymentAccounts.find(acc => acc.id === parseInt(savingsData.sourceAccount));
      if (sourceAccount && sourceAccount.balance < parseFloat(savingsData.amount)) {
        errors.amount = "Số dư tài khoản không đủ";
      }
    }
    
    setSavingsValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Create new savings account
  const createSavingsAccount = (formData, calculatedInterest) => {
    
    // Format amount for display
    const formattedAmount = formatCurrency(parseFloat(formData.amount));
    const sourceAccount = paymentAccounts.find(acc => acc.id === parseInt(formData.sourceAccount));
    const sourceAccountName = sourceAccount ? `${maskAccountNumber(sourceAccount.accountNumber)}` : '';
    
    // Show confirmation modal
    openConfirmationModal({
      title: "Xác nhận mở tài khoản tiết kiệm",
      description: "Vui lòng xác nhận thông tin mở tài khoản tiết kiệm",
      confirmText: "Quẹt để mở tiết kiệm",
      confirmDetails: {
        "Số tiền gửi": formattedAmount,
        "Từ tài khoản": sourceAccountName,
        "Kỳ hạn": termDisplayNames[formData.term],
        "Lãi suất": `${calculatedInterest.rate}%/năm`
      },
      type: 'pink',
      onConfirm: () => {
        // Set processing state
        setConfirmationProcessing(true);
        
        // Process the account creation after a short delay
        setTimeout(() => {
          // Generate new savings account ID
          const newId = savingsAccounts.length > 0 ? Math.max(...savingsAccounts.map(acc => acc.id)) + 1 : 1;
          
          // Convert term to days and get display name
          const termValue = formData.term;
          const termMonths = parseInt(termValue.split('_')[0]) || (termValue === "1_month" ? 1 : 0);
          const termDays = termMonths * 30; // Approximate
          
          // Get a random color from account colors
          const randomColorIndex = Math.floor(Math.random() * accountColors.length);
          
          // Create end date from current date + term
          const startDate = getCurrentDate();
          const currentDate = new Date();
          const endDate = new Date(currentDate);
          endDate.setMonth(currentDate.getMonth() + termMonths);
          const formattedEndDate = `${String(endDate.getDate()).padStart(2, '0')}/${String(endDate.getMonth() + 1).padStart(2, '0')}/${endDate.getFullYear()}`;
          
          // Use custom nickname if provided, otherwise default based on term
          const nickname = formData.nickname ? formData.nickname : `Tiết kiệm ${termDisplayNames[termValue]}`;
          
          // Generate deposit number (format: TK + year + month + sequential number)
          const depositNumber = `TK${currentDate.getFullYear()}${String(currentDate.getMonth() + 1).padStart(2, '0')}${String(newId).padStart(4, '0')}`;
          
          // Create transaction history entry
          const transactionEntry = {
            id: 1,
            time: `${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')} - ${startDate}`,
            type: "Gửi tiền",
            channel: "Internet Banking",
            amount: parseFloat(formData.amount),
            content: `Gửi tiền tiết kiệm kỳ hạn ${termDisplayNames[termValue]}`,
            isDeposit: true,
            interestAmount: 0,
            balanceAfter: parseFloat(formData.amount)
          };
          
          const confirmationEntry = {
            id: 2,
            time: `${String(currentDate.getHours() + 1).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')} - ${startDate}`,
            type: "Xác nhận mở sổ",
            channel: "Hệ thống",
            amount: 0,
            content: "Xác nhận mở sổ tiết kiệm thành công",
            isSystem: true,
            interestAmount: 0,
            balanceAfter: parseFloat(formData.amount)
          };
          
          // Create new savings account object
          const newSavingsAccount = {
            id: newId,
            nickname: nickname,
            depositNumber: depositNumber,
            term: termDisplayNames[termValue],
            termDays: termDays,
            amount: parseFloat(formData.amount),
            interestRate: calculatedInterest.rate,
            startDate: startDate,
            endDate: formattedEndDate,
            daysRemaining: termDays - 10, // Simulate some days passed
            accountNumber: `TK${Math.floor(1000000000 + Math.random() * 9000000000)}`,
            depositType: formData.depositType === "standard" ? "Tiền gửi tiêu chuẩn" : "Rút gốc linh hoạt",
            interestFrequency: interestPaymentTypeDisplayNames[formData.interestPaymentType],
            maturityOption: formData.maturityOption === "receive_all" ? "Nhận cả gốc và lãi" : 
                           formData.maturityOption === "rollover_principal" ? "Tái tục gốc" : "Tự động tái tục gốc và lãi",
            receivedInterest: 0,
            totalReceivable: parseFloat(formData.amount) + calculatedInterest.interestAmount,
            color: accountColors[randomColorIndex],
            icon: <PiggyBank size={24} className="text-white" />
          };
          
          // Update savings accounts array
          setSavingsAccounts([...savingsAccounts, newSavingsAccount]);
          
          // Add transaction history
          setSavingsTransactionHistory(prev => ({
            ...prev,
            [newId]: [transactionEntry, confirmationEntry]
          }));
          
          // Initialize interest history and withdrawal history for the new account
          setSavingsInterestHistory(prev => ({
            ...prev,
            [newId]: []
          }));
          setSavingsWithdrawalHistory(prev => ({
            ...prev,
            [newId]: []
          }));
          
          // Deduct amount from source account
          setPaymentAccounts(accounts => accounts.map(account => {
            if (account.id === parseInt(formData.sourceAccount)) {
              return {
                ...account,
                balance: account.balance - parseFloat(formData.amount)
              };
            }
            return account;
          }));
          
          // Close modals and reset form
          closeConfirmationModal();
          toggleSavingsAccountModal();
          
          // Reset savings form
          setSavingsData({
            nickname: "",
            sourceAccount: "",
            targetAccount: "",
            amount: "",
            term: "1_month",
            interestPaymentType: "end_of_term",
            depositType: "standard",
            maturityOption: "receive_all"
          });
          
          setSavingsValidationErrors({});
          
          // Show success notification
          setNotificationMessage('Mở tài khoản tiết kiệm thành công')
          setNotificationFormat(`Tài khoản tiết kiệm "${nickname}" đã được mở thành công với số tiền ${formattedAmount}.`);
          setNotificationType('success');
          setNotificationVisible(true);
        }, 2000);
      }
    });
  };

  // Effect to recalculate interest whenever form data changes
  useEffect(() => {
    if (savingsData.amount && parseFloat(savingsData.amount) > 0) {
      calculateSavingsInterest();
    }
  }, [savingsData]);
  
  // Add function to truncate text with ellipsis
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };
    
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
      {/* Inject custom scrollbar styles */}
      <style jsx global>
        {scrollbarStyles}
      </style>

      {/* Mobile menu button */}
      {isMobile && (
        <button
          className="fixed top-4 left-4 z-50 bg-white p-2 rounded-full shadow-lg"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? (
            <X size={24} className="text-slate-700" />
          ) : (
            <Menu size={24} className="text-slate-700" />
          )}
        </button>
      )}

      {/* Navigation sidebar - Desktop */}
      {!isMobile && (
        <div
          className={`nav-container flex rounded-tr-3xl rounded-br-3xl flex-col bg-[#1E3E62] transition-all duration-300 ease-in-out backdrop-blur-lg shadow-xl ${
            navHovered ? "w-64" : "w-20"
          } h-full fixed left-0 top-0 z-40`}
          onMouseEnter={() => setNavHovered(true)}
          onMouseLeave={() => setNavHovered(false)}
        >
          {/* Profile section */}
          <div
            className="flex items-center p-6 border-b border-indigo-500/30 cursor-pointer hover:bg-white/20 hover:rounded-3xl transition-colors"
            onClick={toggleProfileModal}
          >
            {navHovered ? (
              <>
                <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
                <div className="ml-3 text-white text-sm">
                  <p className="font-semibold">{profileData.fullName}</p>
                  <p className="text-xs text-indigo-200">{profileData.email}</p>
                </div>
              </>
            ) : (
              <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto">
                <User size={20} className="text-white" />
              </div>
            )}
          </div>

          {/* Navigation items */}
          <div className="flex-1 py-6 px-3 flex flex-col overflow-hidden">
            {/* Customer Group */}
            <div className={`mb-4 ${navHovered ? "px-4" : "text-center"}`}>
              <p className="text-xs text-indigo-200 uppercase font-medium mb-2">
                {navHovered ? "Dành cho khách hàng" : "KH"}
              </p>
            </div>

            <NavItem
              icon={<Home size={20} />}
              text="Trang chủ"
              expanded={navHovered}
              active={activeSection === "overview"}
              onClick={() => setActiveSection("overview")}
            />
            <NavItem
              icon={<Wallet size={20} />}
              text="Quản lý tiền gửi"
              expanded={navHovered}
              active={activeSection === "deposits"}
              onClick={() => setActiveSection("deposits")}
            />

            {/* Admin Group */}
            <div className={`mt-8 mb-4 ${navHovered ? "px-4" : "text-center"}`}>
              <p className="text-xs text-indigo-200 uppercase font-medium mb-2">
                {navHovered ? "Dành cho Quản trị viên" : "QTV"}
              </p>
            </div>

            {/* Admin menu with custom scrollbar */}
            <div className="custom-scrollbar overflow-y-auto pr-1 flex-1 scroll-smooth">
              <NavItem
                icon={<Users size={20} />}
                text="Quản lý khách hàng"
                expanded={navHovered}
                active={activeSection === "customers"}
                onClick={() => setActiveSection("customers")}
              />
              <NavItem
                icon={<User size={20} />}
                text="Quản lý nhân viên"
                expanded={navHovered}
                active={activeSection === "employees"}
                onClick={() => setActiveSection("employees")}
              />
              <NavItem
                icon={<Receipt size={20} />}
                text="Quản lý phiếu gửi tiền"
                expanded={navHovered}
                active={activeSection === "deposit-slips"}
                onClick={() => setActiveSection("deposit-slips")}
              />
              <NavItem
                icon={<PiggyBank size={20} />}
                text="Quản lý sản phẩm tiết kiệm"
                expanded={navHovered}
                active={activeSection === "savings-products"}
                onClick={() => setActiveSection("savings-products")}
              />
              <NavItem
                icon={<LineChart size={20} />}
                text="Báo cáo doanh số"
                expanded={navHovered}
                active={activeSection === "sales-reports"}
                onClick={() => setActiveSection("sales-reports")}
              />
              <NavItem
                icon={<Settings size={20} />}
                text="Cài đặt hệ thống"
                expanded={navHovered}
                active={activeSection === "settings"}
                onClick={() => setActiveSection("settings")}
              />
              <NavItem
                icon={<Lock size={20} />}
                text="Quản lý phân quyền"
                expanded={navHovered}
                active={activeSection === "permissions"}
                onClick={() => setActiveSection("permissions")}
              />
            </div>
          </div>

          {/* Bottom section */}
          <div className="p-4 border-t border-indigo-500/30">
            <NavItem
              icon={<LogOut size={20} />}
              text="Đăng xuất"
              expanded={navHovered}
              active={activeSection === "logout"}
              onClick={() => setActiveSection("logout")}
            />
          </div>
        </div>
      )}

      {/* Mobile Navigation (Slide-in menu) */}
      {isMobile && (
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
            mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className={`nav-container fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-indigo-600 to-purple-700 shadow-xl transition-transform duration-300 ease-in-out rounded-tr-3xl rounded-br-3xl p-6 ${
              mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Profile section */}
            <div
              className="flex items-center pb-6 border-b border-indigo-500/30 cursor-pointer hover:bg-indigo-600/40 transition-colors"
              onClick={toggleProfileModal}
            >
              <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <div className="ml-3 text-white text-sm">
                <p className="font-semibold">{profileData.fullName}</p>
                <p className="text-xs text-indigo-200">{profileData.email}</p>
              </div>
            </div>

            {/* Navigation items */}
            <div className="py-6 flex flex-col h-[calc(100%-130px)]">
              {/* Customer Group */}
              <div className="mb-4">
                <p className="text-xs text-indigo-200 uppercase font-medium mb-2">
                  Dành cho khách hàng
                </p>
              </div>

              <MobileNavItem
                icon={<Home size={20} />}
                text="Trang chủ"
                active={activeSection === "overview"}
                onClick={() => {
                  setActiveSection("overview");
                  setMobileMenuOpen(false);
                }}
              />
              <MobileNavItem
                icon={<Wallet size={20} />}
                text="Quản lý tiền gửi"
                active={activeSection === "deposits"}
                onClick={() => {
                  setActiveSection("deposits");
                  setMobileMenuOpen(false);
                }}
              />

              {/* Admin Group */}
              <div className="mt-8 mb-4">
                <p className="text-xs text-indigo-200 uppercase font-medium mb-2">
                  Dành cho Quản trị viên
                </p>
              </div>

              {/* Admin menu with custom scrollbar */}
              <div className="custom-scrollbar overflow-y-auto pr-1 flex-1 scroll-smooth">
                <MobileNavItem
                  icon={<Users size={20} />}
                  text="Quản lý khách hàng"
                  active={activeSection === "customers"}
                  onClick={() => {
                    setActiveSection("customers");
                    setMobileMenuOpen(false);
                  }}
                />
                <MobileNavItem
                  icon={<User size={20} />}
                  text="Quản lý nhân viên"
                  active={activeSection === "employees"}
                  onClick={() => {
                    setActiveSection("employees");
                    setMobileMenuOpen(false);
                  }}
                />
                <MobileNavItem
                  icon={<PiggyBank size={20} />}
                  text="Quản lý sản phẩm tiết kiệm"
                  active={activeSection === "savings-products"}
                  onClick={() => {
                    setActiveSection("savings-products");
                    setMobileMenuOpen(false);
                  }}
                />
                <MobileNavItem
                  icon={<Receipt size={20} />}
                  text="Quản lý phiếu gửi tiền"
                  active={activeSection === "deposit-slips"}
                  onClick={() => {
                    setActiveSection("deposit-slips");
                    setMobileMenuOpen(false);
                  }}
                />
                <MobileNavItem
                  icon={<LineChart size={20} />}
                  text="Báo cáo doanh số"
                  active={activeSection === "sales-reports"}
                  onClick={() => {
                    setActiveSection("sales-reports");
                    setMobileMenuOpen(false);
                  }}
                />
                <MobileNavItem
                  icon={<Settings size={20} />}
                  text="Cài đặt hệ thống"
                  active={activeSection === "settings"}
                  onClick={() => {
                    setActiveSection("settings");
                    setMobileMenuOpen(false);
                  }}
                />
                <MobileNavItem
                  icon={<Lock size={20} />}
                  text="Quản lý phân quyền"
                  active={activeSection === "permissions"}
                  onClick={() => {
                    setActiveSection("permissions");
                    setMobileMenuOpen(false);
                  }}
                />
              </div>
            </div>

            {/* Bottom section */}
            <div className="pt-4 border-t border-indigo-500/30">
              <MobileNavItem
                icon={<LogOut size={20} />}
                text="Đăng xuất"
                active={activeSection === "logout"}
                onClick={() => {
                  setActiveSection("logout");
                  setMobileMenuOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main content area */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          !isMobile && navHovered ? "ml-64" : !isMobile ? "ml-20" : "ml-0"
        } ${rightPanelVisible && !isMobile ? "mr-80" : "mr-0"}`}
      >
        {/* Header */}
        <ModernHeader activeSection={activeSection} />

        {/* Main content */}
        <main
          className={`main-content-scrollbar overflow-auto max-h-[calc(100vh-60px)] p-6 md:p-6 transition-all duration-500 ${
            cardDetailVisible ? "main-content-with-detail" : ""
          }`}
        >
          {activeSection === "overview" ? (
            <>
              <div className="mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-1">
                      Tài khoản thanh toán
                    </h2>
                    <p className="text-gray-500 text-sm">
                      Quản lý tài khoản thanh toán của bạn
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment accounts grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-10">
                {paymentAccounts.map((account) => (
                  <div
                    key={account.id}
                    className="bg-white backdrop-blur-md rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden account-card group"
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
                            {account.icon}
                          </div>
                          <div className="text-white">
                            <h3 className="font-medium text-sm group-hover:text-white/95">
                              Tài khoản {account.id}
                            </h3>
                            <p className="text-xs text-white/80 font-mono tracking-wide group-hover:text-white">
                              {hiddenAccountInfo[account.id] ? (
                                maskAccountNumber(account.accountNumber)
                              ) : (
                                <span className="animate-fadeIn">
                                  {account.accountNumber}
                                </span>
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-1">
                          {/* Eye toggle button */}
                          <button
                            onClick={() => toggleAccountVisibility(account.id)}
                            className="rounded-full p-1.5 bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:rotate-12 hover:scale-110"
                            aria-label={
                              hiddenAccountInfo[account.id]
                                ? "Hiển thị thông tin"
                                : "Ẩn thông tin"
                            }
                          >
                            {hiddenAccountInfo[account.id] ? (
                              <EyeOff size={16} className="text-white" />
                            ) : (
                              <Eye size={16} className="text-white" />
                            )}
                          </button>

                          {/* Thay thế nút 3 chấm bằng nút khóa/mở khóa trực tiếp */}
                          {account.status !== "permanent_locked" && (
                            <div className="relative">
                              <button
                                onClick={() =>
                                  toggleAccountStatus(
                                    account.id,
                                    account.status
                                  )
                                }
                                className="relative rounded-full p-1.5 bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:rotate-12 hover:scale-110 lock-button"
                                aria-label={
                                  account.status === "active"
                                    ? "Tạm khóa tài khoản"
                                    : "Mở khóa tài khoản"
                                }
                              >
                                {account.status === "active" ? (
                                  <LockIcon size={16} className="text-white" />
                                ) : (
                                  <UnlockIcon
                                    size={16}
                                    className="text-white"
                                  />
                                )}
                              </button>
                              {/* Tooltip hiển thị khi hover */}
                              <div className="tooltip-lock absolute top-full right-0 mt-2 px-2 py-1 bg-white rounded-lg shadow-lg text-xs font-medium text-gray-800 whitespace-nowrap opacity-0 invisible transition-all duration-300 transform translate-y-2 pointer-events-none z-20">
                                {account.status === "active"
                                  ? "Tạm khóa"
                                  : "Mở khóa"}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 relative overflow-hidden group-hover:bg-gradient-to-b from-white to-gray-50 transition-all duration-500">
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer-effect opacity-0 group-hover:opacity-100"></div>

                      {/* Key information in the footer */}
                      <div className="flex items-center justify-between mb-3 relative z-10">
                        <div className="flex flex-col">
                          <p className="text-xs text-slate-500 mb-1 group-hover:text-indigo-500 transition-colors duration-300">
                            Số dư
                          </p>
                          <p className="text-base font-semibold text-slate-800 transition-all duration-300 font-mono">
                            {hiddenAccountInfo[account.id] ? (
                              <span className="text-slate-400">••••••••</span>
                            ) : (
                              <span className="animate-fadeIn">
                                {formatCurrency(account.balance)}
                              </span>
                            )}
                          </p>
                        </div>

                        <div
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                            getStatusInfo(account.status).bgColor
                          } ${
                            getStatusInfo(account.status).textColor
                          } transform transition-transform duration-300 group-hover:scale-105`}
                        >
                          {getStatusInfo(account.status).icon}
                          {getStatusInfo(account.status).text}
                        </div>
                      </div>

                      {/* Bottom date info */}
                      <div className="border-t border-slate-100 pt-3 flex justify-between items-center relative z-10">
                        <div className="flex items-center space-x-1 text-xs text-slate-500">
                          <Calendar
                            size={12}
                            className="text-slate-400 group-hover:text-slate-500 transition-colors duration-300"
                          />
                          <span className="group-hover:text-slate-600 transition-colors duration-300">
                            {account.creationDate}
                          </span>
                        </div>
                        <button
                          onClick={() => openTransactionDrawer(account.id)}
                          className={`${account.color} text-white text-xs font-medium px-4 py-1.5 rounded-full hover:shadow-md transition-all duration-300 transform group-hover:scale-105 hover:translate-y-[-2px]`}
                        >
                          Chi tiết
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : activeSection === "deposits" ? (
            <>
              <div className="mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-1">
                      Tài khoản tiền gửi tiết kiệm
                    </h2>
                    <p className="text-gray-500 text-sm">
                      Quản lý các tài khoản tiền gửi của bạn
                    </p>
                  </div>

                  {/* Thông tin tổng hợp và nút hiển thị */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                      {/* Tổng số tài khoản */}
                      <div className="relative group bg-white/90 backdrop-blur-xl p-4 rounded-3xl shadow-lg border border-indigo-200/50 flex items-center space-x-4">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-200/30 to-blue-200/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 pointer-events-none"></div>
                        <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center shadow-lg">
                          <PiggyBank size={20} className="text-white" />
                        </div>
                        <div className="relative">
                          <p className="text-xs text-slate-500 font-medium mb-1">
                            Tổng số tài khoản
                          </p>
                          <p className="text-base font-bold text-gray-800">
                            {savingsAccounts.length} tài khoản
                          </p>
                        </div>
                      </div>

                      {/* Tổng tiền gửi */}
                      <div className="relative group bg-white/90 backdrop-blur-xl p-4 rounded-3xl shadow-lg border border-green-200/50 flex items-center space-x-4">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-200/30 to-emerald-200/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 pointer-events-none"></div>
                        <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
                          <DollarSign size={20} className="text-white" />
                        </div>
                        <div className="relative">
                          <p className="text-xs text-slate-500 font-medium mb-1">
                            Tổng tiền gửi
                          </p>
                          <p className="text-base font-bold text-gray-800">
                            {Object.values(hiddenAccountInfo).every(Boolean)
                              ? "••••••••"
                              : formatCurrency(
                                  savingsAccounts.reduce(
                                    (sum, account) =>
                                      sum +
                                      (hiddenAccountInfo[account.id]
                                        ? 0
                                        : account.amount),
                                    0
                                  )
                                )}
                          </p>
                        </div>
                      </div>

                      {/* Tổng tiền lãi dự kiến */}
                      <div className="relative group bg-white/90 backdrop-blur-xl p-4 rounded-3xl shadow-lg border border-blue-200/50 flex items-center space-x-4">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 to-cyan-200/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 pointer-events-none"></div>
                        <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-lg">
                          <TrendingUp size={20} className="text-white" />
                        </div>
                        <div className="relative">
                          <p className="text-xs text-slate-500 font-medium mb-1">
                            Tổng tiền lãi dự kiến
                          </p>
                          <p className="text-base font-bold text-gray-800">
                            {Object.values(hiddenAccountInfo).every(Boolean)
                              ? "••••••••"
                              : formatCurrency(
                                  savingsAccounts.reduce(
                                    (sum, account) =>
                                      sum +
                                      (hiddenAccountInfo[account.id]
                                        ? 0
                                        : account.totalReceivable -
                                          account.amount),
                                    0
                                  )
                                )}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      {/* Nút ẩn/hiện tất cả */}
                      <button
                        onClick={() => {
                          const allHidden = savingsAccounts.every(
                            (acc) => hiddenAccountInfo[acc.id]
                          );
                          const newState = {};
                          savingsAccounts.forEach((acc) => {
                            newState[acc.id] = !allHidden;
                          });
                          setHiddenAccountInfo(newState);
                        }}
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        {savingsAccounts.every(
                          (acc) => hiddenAccountInfo[acc.id]
                        ) ? (
                          <>
                            <Eye size={16} />
                            <span>Hiện tất cả</span>
                          </>
                        ) : (
                          <>
                            <EyeOff size={16} />
                            <span>Ẩn tất cả</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Savings accounts grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-10">
                {savingsAccounts.map((account) => (
                  <div
                    key={account.id}
                    className="bg-white backdrop-blur-md rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden account-card group"
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
                            {account.icon}
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
                            onClick={() => toggleAccountVisibility(account.id)}
                            className="rounded-full p-1.5 bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:rotate-12 hover:scale-110"
                            aria-label={
                              hiddenAccountInfo[account.id]
                                ? "Hiển thị thông tin"
                                : "Ẩn thông tin"
                            }
                          >
                            {hiddenAccountInfo[account.id] ? (
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
                            {hiddenAccountInfo[account.id] ? (
                              <span className="text-slate-400">••••••••</span>
                            ) : (
                              <span className="animate-fadeIn">
                                {formatCurrency(
                                  typeof account.remainingAmount !== "undefined"
                                    ? account.remainingAmount
                                    : account.amount
                                )}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Tiến trình kỳ hạn */}
                      <div className="mb-3 relative z-10">
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-slate-600">
                            Ngày đáo hạn: {account.endDate}
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
                            {account.startDate}
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
                  </div>
                ))}
              </div>
            </>
          ) : activeSection === "customers" ? (
            <CustomerManagement />
          ) : activeSection === "employees" ? (
            <EmployeeManagement />
          ) : activeSection === "savings-products" ? (
            <SavingsProductManagement />
          ) : activeSection === "sales-reports" ? (
            <SalesReportPage />
          ) : activeSection === "permissions" ? (
            <PermissionManagement />
          ) : activeSection === "settings" ? (
            <SystemSettings />
          ) : activeSection === "deposit-slips" ? (
            <SavingsAccountManagement />
          ) : (
            <div>
              <h1>404 Not Found</h1>
            </div>
          )}
        </main>
      </div>

      {/* Fixed button centered with text */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center z-10">
        <AnimatePresence>
          {(activeSection === "overview" || activeSection === "deposits") && (
            <motion.button
              className="h-14 px-6 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 flex items-center justify-center text-white shadow-lg hover:shadow-xl"
              onClick={toggleSavingsAccountModal}
              initial={{ width: 0, opacity: 0, padding: 0, overflow: "hidden" }}
              animate={{
                width: "auto",
                opacity: 1,
                padding: "0 1.5rem",
                overflow: "visible",
              }}
              exit={{ width: 0, opacity: 0, padding: 0, overflow: "hidden" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Plus size={16} className="mr-2" />
              <span className="font-medium">Mở tài khoản tiền gửi</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Profile Modal */}
      {profileModalOpen && (
        <div
          id="profileModalOverlay"
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out modal-enter overflow-hidden"
          onClick={toggleProfileModal}
        >
          <div
            id="profileModalContent"
            className="bg-gradient-to-b from-white to-slate-50 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl transition-all modal-enter-content relative border border-white/60"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glass effect decorative elements */}
            <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] rounded-full bg-blue-400/20 blur-3xl pointer-events-none floating-element"></div>
            <div
              className="absolute bottom-[-30px] left-[-30px] w-[150px] h-[150px] rounded-full bg-purple-400/20 blur-3xl pointer-events-none floating-element"
              style={{ animationDelay: "1s" }}
            ></div>

            {/* Modal Header */}
            <div className="relative p-6 bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-500 text-white overflow-hidden gradient-animate">
              {/* Header decorative elements */}
              <div
                className="absolute w-40 h-40 rounded-full bg-white/10 top-[-60px] right-[-20px] blur-sm floating-element"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute w-20 h-20 rounded-full bg-white/10 bottom-[-30px] left-[20%] blur-sm floating-element"
                style={{ animationDelay: "1.5s" }}
              ></div>

              <div className="flex justify-between items-center relative z-10">
                <h2 className="text-xl font-semibold tracking-wide">
                  Thông tin cá nhân
                </h2>
                <button
                  onClick={toggleProfileModal}
                  className="rounded-full h-9 w-9 flex items-center justify-center bg-white/20 hover:bg-white/30 transition-all duration-200 border border-white/40 backdrop-blur-sm"
                  aria-label="Đóng"
                >
                  <X size={18} className="text-white" />
                </button>
              </div>

              <div className="flex flex-row md:flex-row md:items-center gap-4 md:gap-0 mt-6 relative z-10">
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md flex items-center justify-center p-1 border border-white/40 shadow-lg transform hover:scale-105 hover:rotate-3 transition-all duration-300 group">
                  <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-400 opacity-0 blur group-hover:opacity-30 transition-opacity duration-300"></div>
                  <User size={40} className="text-white" />
                </div>
                <div className="md:ml-5 mt-4 md:mt-0">
                  <h3 className="font-medium text-xl">
                    {profileData.fullName}
                  </h3>
                  <div className="flex items-center mt-1">
                    <span className="inline-block h-2 w-2 rounded-full bg-green-400 mr-2"></span>
                    <p className="text-sm text-white/90">
                      Khách hàng {profileData.accountType}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Navigation - New feature */}
            <div className="flex border-b border-slate-200 px-6 pt-4 overflow-x-auto no-scrollbar">
              <button className="pb-3 px-4 text-sm font-medium text-indigo-600 border-b-2 border-indigo-600 flex items-center">
                <User size={16} className="mr-2" />
                Thông tin cá nhân
              </button>
              <button className="pb-3 px-4 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors flex items-center">
                <Lock size={16} className="mr-2" />
                Bảo mật
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 overflow-y-auto max-h-[calc(90vh-220px)] elegant-scrollbar relative has-scroll">
              <div className="relative z-10 pb-2">
                <div className="flex justify-between items-center mb-8 flex-wrap gap-2">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center mr-3 shadow-lg">
                      <User size={20} className="text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                      {editMode ? "Chỉnh sửa thông tin" : "Chi tiết thông tin"}
                    </span>
                  </h3>
                  {!editMode ? (
                    <button
                      onClick={handleEditToggle}
                      className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-2xl hover:shadow-xl transition-all duration-300 font-semibold text-sm flex items-center group border-0 hover:from-indigo-400 hover:to-blue-500 transform hover:scale-105"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 group-hover:rotate-45 transition-transform duration-300"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                      Chỉnh sửa
                    </button>
                  ) : (
                    <div className="flex gap-3 flex-wrap">
                      <button
                        onClick={() => setEditMode(false)}
                        className="px-6 py-3 bg-white/90 text-slate-700 rounded-2xl hover:bg-white/100 transition-all duration-300 font-semibold text-sm flex items-center border border-slate-200 hover:shadow-lg transform hover:scale-105"
                      >
                        <X size={18} className="mr-2" />
                        Hủy
                      </button>
                      <button
                        onClick={handleSaveChanges}
                        className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl hover:shadow-xl transition-all duration-300 font-semibold text-sm flex items-center border-0 hover:from-emerald-400 hover:to-green-500 transform hover:scale-105"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                          <polyline points="17 21 17 13 7 13 7 21"></polyline>
                          <polyline points="7 3 7 8 15 8"></polyline>
                        </svg>
                        Lưu thay đổi
                      </button>
                    </div>
                  )}
                </div>

                {/* Profile information grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                  <div className="space-y-6">
                    {/* Personal Information */}
                    <div
                      className={`bg-white/90 border rounded-3xl shadow-lg hover:shadow-xl pt-0 px-0 p-0 space-y-0 transition-all duration-500 ${
                        editMode ? "border-indigo-200/50" : "border-cyan-200/50"
                      }`}
                    >
                      <div
                        className={`flex items-center gap-4 rounded-t-3xl border-b-0 mb-0 mx-0 px-8 py-2 ${
                          editMode
                            ? "bg-gradient-to-r from-indigo-500 to-blue-600"
                            : "bg-gradient-to-r from-cyan-500 to-blue-600"
                        }`}
                      >
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <User size={20} className="text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-white flex items-center gap-2">
                          {editMode
                            ? "Thông tin có thể chỉnh sửa"
                            : "Thông tin cá nhân"}
                        </h4>
                        <div className="flex-1 h-px bg-white/30"></div>
                      </div>
                      <div className="p-8">
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                              Họ tên
                            </label>
                            <div className="p-4 bg-gradient-to-r from-slate-50 to-blue-50/30 rounded-xl border border-slate-200/50 text-slate-800 font-medium">
                              {profileData.fullName}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                              Ngày sinh
                            </label>
                            <div className="p-4 bg-gradient-to-r from-slate-50 to-blue-50/30 rounded-xl border border-slate-200/50 text-slate-800 font-medium">
                              {profileData.dateOfBirth}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                              Số CCCD
                            </label>
                            <div className="p-4 bg-gradient-to-r from-slate-50 to-blue-50/30 rounded-xl border border-slate-200/50 text-slate-800 font-medium">
                              {profileData.idNumber}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                              Email
                            </label>
                            <div className="p-4 bg-gradient-to-r from-slate-50 to-blue-50/30 rounded-xl border border-slate-200/50 text-slate-800 font-medium">
                              {profileData.email}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                              Số điện thoại
                              {editMode && (
                                <span className="text-indigo-600 text-xs">
                                  *
                                </span>
                              )}
                            </label>
                            {editMode ? (
                              <input
                                type="text"
                                value={editData.phone}
                                onChange={(e) =>
                                  handleInputChange("phone", e.target.value)
                                }
                                className="w-full p-4 bg-white border-2 border-indigo-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 text-slate-800 font-medium placeholder-slate-400 shadow-sm hover:shadow-md"
                                placeholder="Nhập số điện thoại..."
                              />
                            ) : (
                              <div className="p-4 bg-gradient-to-r from-slate-50 to-blue-50/30 rounded-xl border border-slate-200/50 text-slate-800 font-medium">
                                {profileData.phone}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Account Information - hide entirely in edit mode */}
                    <div
                      className={`bg-white/90 border border-purple-200/50 rounded-3xl shadow-lg hover:shadow-xl pt-0 px-0 p-0 space-y-0 transition-all duration-500 ${
                        editMode
                          ? "opacity-0 h-0 scale-0 overflow-hidden my-0 py-0"
                          : "opacity-100 scale-100"
                      }`}
                    >
                      <div className="flex items-center gap-4 bg-gradient-to-r from-purple-500 to-violet-600 rounded-t-3xl border-b-0 mb-0 mx-0 px-8 py-2">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <CreditCard size={20} className="text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-white flex items-center gap-2">
                          Thông tin tài khoản
                        </h4>
                        <div className="flex-1 h-px bg-white/30"></div>
                      </div>
                      <div className="p-8">
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                              Ngày tạo tài khoản
                            </label>
                            <div className="p-4 bg-gradient-to-r from-slate-50 to-purple-50/30 rounded-xl border border-slate-200/50 text-slate-800 font-medium">
                              {profileData.accountCreated}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                              Loại tài khoản
                            </label>
                            <div className="p-4 bg-gradient-to-r from-slate-50 to-purple-50/30 rounded-xl border border-slate-200/50 text-slate-800 font-medium">
                              {profileData.accountType}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Permanent Address - hide entirely in edit mode */}
                    {!editMode && (
                      <div className="bg-white/90 border border-amber-200/50 rounded-3xl shadow-lg hover:shadow-xl pt-0 px-0 p-0 space-y-0 transition-all duration-500">
                        <div className="flex items-center gap-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-t-3xl border-b-0 mb-0 mx-0 px-8 py-2">
                          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                            <Home size={20} className="text-white" />
                          </div>
                          <h4 className="text-xl font-bold text-white flex items-center gap-2">
                            Địa chỉ thường trú
                          </h4>
                          <div className="flex-1 h-px bg-white/30"></div>
                        </div>
                        <div className="p-8">
                          <div className="space-y-6">
                            <div className="space-y-2">
                              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                Tỉnh/Thành phố
                              </label>
                              <div className="p-4 bg-gradient-to-r from-slate-50 to-amber-50/30 rounded-xl border border-slate-200/50 text-slate-800 font-medium">
                                {profileData.permanentAddress.province}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                Quận/Huyện
                              </label>
                              <div className="p-4 bg-gradient-to-r from-slate-50 to-amber-50/30 rounded-xl border border-slate-200/50 text-slate-800 font-medium">
                                {profileData.permanentAddress.district}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                Phường/Xã
                              </label>
                              <div className="p-4 bg-gradient-to-r from-slate-50 to-amber-50/30 rounded-xl border border-slate-200/50 text-slate-800 font-medium">
                                {profileData.permanentAddress.ward}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                Tên đường
                              </label>
                              <div className="p-4 bg-gradient-to-r from-slate-50 to-amber-50/30 rounded-xl border border-slate-200/50 text-slate-800 font-medium">
                                {profileData.permanentAddress.street}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                Số nhà
                              </label>
                              <div className="p-4 bg-gradient-to-r from-slate-50 to-amber-50/30 rounded-xl border border-slate-200/50 text-slate-800 font-medium">
                                {profileData.permanentAddress.houseNumber}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Contact Address */}
                    <div
                      className={`bg-white/90 border rounded-3xl shadow-lg hover:shadow-xl pt-0 px-0 p-0 space-y-0 transition-all duration-500 ${
                        editMode
                          ? "border-indigo-200/50"
                          : "border-emerald-200/50"
                      }`}
                    >
                      <div
                        className={`flex items-center gap-4 rounded-t-3xl border-b-0 mb-0 mx-0 px-8 py-2 ${
                          editMode
                            ? "bg-gradient-to-r from-indigo-400 via-blue-500 to-indigo-600"
                            : "bg-gradient-to-r from-emerald-500 to-teal-600"
                        }`}
                      >
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <Home size={20} className="text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-white flex items-center gap-2">
                          {editMode
                            ? "Chỉnh sửa địa chỉ liên lạc"
                            : "Địa chỉ liên lạc"}
                        </h4>
                        <div className="flex-1 h-px bg-white/30"></div>
                      </div>
                      <div className="p-8">
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                              Tỉnh/Thành phố
                              {editMode && (
                                <span className="text-indigo-600 text-xs">
                                  *
                                </span>
                              )}
                            </label>
                            {editMode ? (
                              <div className="relative">
                                <div className="relative group">
                                  <div className="w-full p-4 bg-white border-2 border-indigo-200 rounded-xl focus:border-indigo-500 hover:border-indigo-300 transition-all duration-300 text-slate-800 font-medium shadow-sm hover:shadow-md cursor-pointer flex items-center justify-between">
                                    <span
                                      className={
                                        editData.contactAddress.province
                                          ? "text-slate-800"
                                          : "text-gray-400 italic"
                                      }
                                    >
                                      {editData.contactAddress.province ||
                                        "✨ Chọn tỉnh/thành phố..."}
                                    </span>
                                    <svg
                                      className="w-5 h-5 text-indigo-400 transition-transform duration-200 group-hover:rotate-180"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                      />
                                    </svg>
                                  </div>

                                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-indigo-200 rounded-xl shadow-lg max-h-60 overflow-y-auto z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    {provinces?.map((province) => (
                                      <div
                                        key={province.code}
                                        onClick={() =>
                                          handleInputChange(
                                            "contactAddress.province",
                                            province.name
                                          )
                                        }
                                        className="px-4 py-3 hover:bg-indigo-50 cursor-pointer text-slate-800 font-medium border-b border-indigo-100 last:border-b-0 flex items-center gap-2 transition-colors duration-150"
                                      >
                                        <span className="text-indigo-400">
                                          🌏
                                        </span>
                                        {province.name}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none"></div>
                              </div>
                            ) : (
                              <div className="p-4 bg-gradient-to-r from-slate-50 to-emerald-50/30 rounded-xl border border-slate-200/50 text-slate-800 font-medium">
                                {profileData.contactAddress.province}
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                              Quận/Huyện
                              {editMode && (
                                <span className="text-indigo-600 text-xs">
                                  *
                                </span>
                              )}
                            </label>
                            {editMode ? (
                              <div className="relative group">
                                <div
                                  className={`w-full p-4 bg-white border-2 border-indigo-200 rounded-xl focus:border-indigo-500 hover:border-indigo-300 transition-all duration-300 text-slate-800 font-medium shadow-sm hover:shadow-md cursor-pointer flex items-center justify-between ${
                                    !editData.contactAddress.province
                                      ? "disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                                      : ""
                                  }`}
                                >
                                  <span
                                    className={
                                      editData.contactAddress.district
                                        ? "text-slate-800"
                                        : "text-gray-400 italic"
                                    }
                                  >
                                    {editData.contactAddress.district ||
                                      "🏢 Chọn quận/huyện..."}
                                  </span>
                                  <svg
                                    className="w-5 h-5 text-indigo-400 transition-transform duration-200 group-hover:rotate-180"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 9l-7 7-7-7"
                                    />
                                  </svg>
                                </div>

                                {editData.contactAddress.province && (
                                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-indigo-200 rounded-xl shadow-lg max-h-60 overflow-y-auto z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    {availableDistricts?.map((district) => (
                                      <div
                                        key={district.code}
                                        onClick={() =>
                                          handleInputChange(
                                            "contactAddress.district",
                                            district.name
                                          )
                                        }
                                        className="px-4 py-3 hover:bg-indigo-50 cursor-pointer text-slate-800 font-medium border-b border-indigo-100 last:border-b-0 flex items-center gap-2 transition-colors duration-150"
                                      >
                                        <svg
                                          className="w-4 h-4 text-indigo-400"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                          />
                                        </svg>
                                        {district.name}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="p-4 bg-gradient-to-r from-slate-50 to-emerald-50/30 rounded-xl border border-slate-200/50 text-slate-800 font-medium">
                                {profileData.contactAddress.district}
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                              Phường/Xã
                              {editMode && (
                                <span className="text-indigo-600 text-xs">
                                  *
                                </span>
                              )}
                            </label>
                            {editMode ? (
                              <div className="relative group">
                                <div
                                  className={`w-full p-4 bg-white border-2 border-indigo-200 rounded-xl focus:border-indigo-500 hover:border-indigo-300 transition-all duration-300 text-slate-800 font-medium shadow-sm hover:shadow-md cursor-pointer flex items-center justify-between ${
                                    !editData.contactAddress.district
                                      ? "disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                                      : ""
                                  }`}
                                >
                                  <span
                                    className={
                                      editData.contactAddress.ward
                                        ? "text-slate-800"
                                        : "text-gray-400 italic"
                                    }
                                  >
                                    {editData.contactAddress.ward ||
                                      "🏘️ Chọn phường/xã..."}
                                  </span>
                                  <svg
                                    className="w-5 h-5 text-indigo-400 transition-transform duration-200 group-hover:rotate-180"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 9l-7 7-7-7"
                                    />
                                  </svg>
                                </div>

                                {editData.contactAddress.district && (
                                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-indigo-200 rounded-xl shadow-lg max-h-60 overflow-y-auto z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    {availableWards?.map((ward) => (
                                      <div
                                        key={ward.code}
                                        onClick={() =>
                                          handleInputChange(
                                            "contactAddress.ward",
                                            ward.name
                                          )
                                        }
                                        className="px-4 py-3 hover:bg-indigo-50 cursor-pointer text-slate-800 font-medium border-b border-indigo-100 last:border-b-0 flex items-center gap-2 transition-colors duration-150"
                                      >
                                        <svg
                                          className="w-4 h-4 text-indigo-400"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                          />
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                          />
                                        </svg>
                                        {ward.name}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="p-4 bg-gradient-to-r from-slate-50 to-emerald-50/30 rounded-xl border border-slate-200/50 text-slate-800 font-medium">
                                {profileData.contactAddress.ward}
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                              Tên đường
                              {editMode && (
                                <span className="text-indigo-600 text-xs">
                                  *
                                </span>
                              )}
                            </label>
                            {editMode ? (
                              <input
                                type="text"
                                value={editData.contactAddress.street}
                                onChange={(e) =>
                                  handleInputChange(
                                    "contactAddress.street",
                                    e.target.value
                                  )
                                }
                                className="w-full p-4 bg-white border-2 border-indigo-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 text-slate-800 font-medium placeholder-slate-400 shadow-sm hover:shadow-md"
                                placeholder="Nhập tên đường..."
                              />
                            ) : (
                              <div className="p-4 bg-gradient-to-r from-slate-50 to-emerald-50/30 rounded-xl border border-slate-200/50 text-slate-800 font-medium">
                                {profileData.contactAddress.street}
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                              Số nhà
                              {editMode && (
                                <span className="text-indigo-600 text-xs">
                                  *
                                </span>
                              )}
                            </label>
                            {editMode ? (
                              <input
                                type="text"
                                value={editData.contactAddress.houseNumber}
                                onChange={(e) =>
                                  handleInputChange(
                                    "contactAddress.houseNumber",
                                    e.target.value
                                  )
                                }
                                className="w-full p-4 bg-white border-2 border-indigo-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 text-slate-800 font-medium placeholder-slate-400 shadow-sm hover:shadow-md"
                                placeholder="Nhập số nhà..."
                              />
                            ) : (
                              <div className="p-4 bg-gradient-to-r from-slate-50 to-emerald-50/30 rounded-xl border border-slate-200/50 text-slate-800 font-medium">
                                {profileData.contactAddress.houseNumber}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Updated scroll indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none scroll-indicator z-0"></div>
            </div>
          </div>
        </div>
      )}

      {/* Add animation keyframes */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            backdrop-filter: blur(0px);
          }
          to {
            opacity: 1;
            backdrop-filter: blur(8px);
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
            backdrop-filter: blur(8px);
          }
          to {
            opacity: 0;
            backdrop-filter: blur(0px);
          }
        }

        @keyframes scaleIn {
          0% {
            transform: scale(0.92) translateY(10px);
            opacity: 0;
            box-shadow: 0 0 0 rgba(0, 0, 0, 0.1);
          }
          70% {
            transform: scale(1.01);
            opacity: 1;
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          }
        }

        @keyframes scaleOut {
          0% {
            transform: scale(1);
            opacity: 1;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          }
          100% {
            transform: scale(0.92) translateY(10px);
            opacity: 0;
            box-shadow: 0 0 0 rgba(0, 0, 0, 0);
          }
        }

        @keyframes slideInUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideOutDown {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(20px);
            opacity: 0;
          }
        }

        @keyframes floatingAnimation {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes rotateBackground {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes fieldAppear {
          0% {
            transform: translateX(-10px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fieldFocusIn {
          0% {
            box-shadow: 0 0 0 rgba(99, 102, 241, 0);
            background-color: rgba(238, 242, 255, 0.3);
          }
          100% {
            box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
            background-color: rgba(238, 242, 255, 0.5);
          }
        }

        @keyframes editModeGlow {
          0% {
            box-shadow: 0 0 0 rgba(99, 102, 241, 0);
          }
          100% {
            box-shadow: 0 0 15px rgba(99, 102, 241, 0.1);
          }
        }

        @keyframes fadeInSlideUp {
          0% {
            opacity: 0;
            transform: translateY(5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeSlideIn {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expandIn {
          0% {
            opacity: 0;
            max-height: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            max-height: 500px;
            transform: scale(1);
          }
        }

        /* Field transition effects */
        .field-hidden {
          margin-top: 0 !important;
          margin-bottom: 0 !important;
          padding-top: 0 !important;
          padding-bottom: 0 !important;
          max-height: 0;
        }

        .field-visible {
          max-height: 120px;
          margin-bottom: 1rem;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .edit-mode-entering {
          animation: fieldAppear 0.3s ease-out forwards;
        }

        .animate-field-focus {
          animation: fieldFocusIn 0.5s ease-out forwards;
        }

        /* Staggered animation for multiple fields */
        .profile-section .field-visible {
          transition-delay: calc(var(--index) * 0.05s);
        }

        .edit-mode-active {
          animation: editModeGlow 0.5s ease-out forwards;
          background-color: rgba(249, 250, 255, 0.8);
          /* Ensure content is visible even when scrolled */
          position: relative;
          z-index: 2;
        }

        .animate-fade-in {
          animation: fadeInSlideUp 0.3s ease-out forwards;
        }

        .section-transition {
          /* Remove the animation that causes jerky movement */
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Edit mode state transitions */
        .profile-section.edit-mode-active {
          animation: expandIn 0.4s ease-out forwards;
        }

        .profile-section.edit-mode-active > div {
          animation: fadeSlideIn 0.4s ease-out forwards;
        }

        .modal-enter {
          animation: fadeIn 0.4s ease-out forwards;
        }

        .modal-enter-content {
          animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .modal-exit {
          animation: fadeOut 0.3s ease-out forwards;
        }

        .modal-exit-content {
          animation: scaleOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Elegant scrollbar styles */
        .elegant-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        .elegant-scrollbar::-webkit-scrollbar-track {
          background: rgba(226, 232, 240, 0.1);
          margin: 4px;
          border-radius: 10px;
        }

        .elegant-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(79, 70, 229, 0.2);
          border-radius: 10px;
          border: 2px solid transparent;
          background-clip: padding-box;
          transition: all 0.3s ease;
        }

        .elegant-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(79, 70, 229, 0.4);
          border: 2px solid transparent;
          background-clip: padding-box;
        }

        /* Pulse animation for scrollbar on load */
        @keyframes scrollPulse {
          0% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 0.2;
          }
        }

        .elegant-scrollbar.has-scroll::-webkit-scrollbar-thumb {
          animation: scrollPulse 2.5s ease-in-out infinite;
        }

        /* Firefox scrollbar styling */
        .elegant-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(79, 70, 229, 0.2) rgba(226, 232, 240, 0.1);
        }

        .elegant-scrollbar:hover {
          scrollbar-color: rgba(79, 70, 229, 0.4) rgba(226, 232, 240, 0.1);
        }

        /* Scroll indicator fade animation */
        @keyframes fadeInOut {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.7;
          }
        }

        .scroll-indicator {
          animation: fadeInOut 2.5s ease-in-out infinite;
        }

        /* Hide scrollbar but allow scrolling */
        .no-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }

        /* Responsive modal adjustments */
        @media (max-width: 768px) {
          #profileModalContent {
            max-height: 95vh;
            margin: 0 8px;
            border-radius: 24px;
          }

          .modal-enter-content {
            animation: slideInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          .modal-exit-content {
            animation: slideOutDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          /* Mobile optimizations */
          .custom-scrollbar {
            padding-right: 0;
          }

          /* Adjust spacing for mobile */
          #profileModalContent .p-6 {
            padding: 1rem;
          }

          #profileModalContent .p-5 {
            padding: 1rem;
          }

          #profileModalContent .space-y-4 {
            margin-bottom: 1rem;
          }
        }

        /* Floating animation for decorative elements */
        .floating-element {
          animation: floatingAnimation 3s ease-in-out infinite;
        }

        /* Gradient animation for backgrounds */
        .gradient-animate {
          background-size: 200% 200%;
          animation: rotateBackground 5s ease infinite;
        }

        /* Editable field animation */
        .editable-field-highlight input {
          animation: editableFieldPulse 2s infinite;
        }

        @keyframes editableFieldPulse {
          0% {
            border-color: rgba(79, 70, 229, 0.1);
            box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.2);
          }
          50% {
            border-color: rgba(79, 70, 229, 0.4);
            box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
          }
          100% {
            border-color: rgba(79, 70, 229, 0.1);
            box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.2);
          }
        }

        /* New smooth-transition class */
        .smooth-transition {
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .editable-field-highlight {
          position: relative;
          z-index: 5;
        }

        /* Dropdown customization */
        .appearance-none {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }

        /* Custom dropdown styling */
        select.appearance-none:focus {
          border-color: rgba(99, 102, 241, 0.8);
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
        }

        select.appearance-none option {
          padding: 8px;
          font-size: 0.875rem;
        }

        /* Dropdown animation */
        @keyframes dropdownReveal {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        select.appearance-none option {
          animation: dropdownReveal 0.2s ease-out forwards;
        }

        /* Add subtle hover effect for dropdown options */
        @media screen and (-webkit-min-device-pixel-ratio: 0) {
          select.appearance-none option:hover {
            background-color: rgba(99, 102, 241, 0.1);
          }
        }

        /* Disabled state styling */
        select:disabled {
          background-color: rgba(243, 244, 246, 0.7);
          cursor: not-allowed;
          color: rgba(107, 114, 128, 0.7);
          border-color: rgba(209, 213, 219, 0.8);
        }

        /* New animation for hiding/showing account information */
        @keyframes blurIn {
          0% {
            filter: blur(0px);
            opacity: 1;
          }
          100% {
            filter: blur(4px);
            opacity: 0.7;
          }
        }

        @keyframes blurOut {
          0% {
            filter: blur(4px);
            opacity: 0.7;
          }
          100% {
            filter: blur(0px);
            opacity: 1;
          }
        }

        /* New shimmer effect animation */
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
          background-size: 200% 100%;
        }

        .shimmer-effect {
          animation: shimmer 2.5s infinite;
        }

        /* Account card hover effects */
        .account-card {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .account-card:hover {
          transform: translateY(-5px);
        }

        /* Number reveal animation */
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

        .animate-fadeIn {
          animation: numberReveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Detail button hover effect */
        @keyframes buttonPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
          }
          70% {
            box-shadow: 0 0 0 6px rgba(255, 255, 255, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
          }
        }

        /* Dropdown animation */
        @keyframes fadeDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeDown {
          animation: fadeDown 0.2s ease-out forwards;
        }

        /* Status transition */
        @keyframes statusPulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        .status-change {
          animation: statusPulse 0.5s ease-in-out;
        }

        /* Custom tooltip styles for lock buttons */
        .lock-button:hover + .tooltip-lock {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .lock-disabled:hover + .tooltip-lock-disabled {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        /* Add delay for smoother experience */
        .tooltip-lock,
        .tooltip-lock-disabled {
          transition: opacity 0.3s ease, visibility 0.3s ease,
            transform 0.3s ease;
        }
      `}</style>

      {/* Add specific styles for drawer animations */}
      <style jsx global>{`
        @keyframes slideInFromRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes slideOutToRight {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(100%);
          }
        }

        @keyframes fadeInBlur {
          from {
            opacity: 0;
            backdrop-filter: blur(0);
          }
          to {
            opacity: 1;
            backdrop-filter: blur(4px);
          }
        }

        @keyframes fadeOutBlur {
          from {
            opacity: 1;
            backdrop-filter: blur(4px);
          }
          to {
            opacity: 0;
            backdrop-filter: blur(0);
          }
        }

        /* Drawer animation classes */
        .drawer-enter {
          animation: slideInFromRight 0.3s ease-out forwards;
        }

        .drawer-exit {
          animation: slideOutToRight 0.3s ease-out forwards;
        }

        .drawer-backdrop-enter {
          animation: fadeInBlur 0.3s ease-out forwards;
        }

        .drawer-backdrop-exit {
          animation: fadeOutBlur 0.3s ease-out forwards;
        }

        /* Card detail animations */
        @keyframes cardAppear {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes cardSlideToRight {
          from {
            transform: translateX(0) translateY(0);
          }
          to {
            transform: translateX(-200px) translateY(0);
          }
        }

        @keyframes cardExpandDetail {
          0% {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          100% {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          }
        }

        @keyframes detailElementFadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .card-detail-animate {
          animation: cardAppear 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards,
            cardExpandDetail 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .card-detail-animate > div {
          animation: detailElementFadeIn 0.4s ease-out forwards;
        }

        .card-detail-animate > div:nth-child(2) {
          animation-delay: 0.1s;
        }

        /* Staggered animation for buttons */
        .card-detail-animate button {
          animation: detailElementFadeIn 0.3s ease-out forwards;
        }

        .card-detail-animate button:nth-child(1) {
          animation-delay: 0.2s;
        }

        .card-detail-animate button:nth-child(2) {
          animation-delay: 0.3s;
        }

        .card-detail-animate button:nth-child(3) {
          animation-delay: 0.4s;
        }

        .card-detail-animate button:nth-child(4) {
          animation-delay: 0.5s;
        }

        /* Transaction item animations */
        @keyframes fadeInSlideUp {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .transaction-item {
          animation: fadeInSlideUp 0.5s forwards;
          animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
          opacity: 0;
        }

        /* Staggered delay for transaction items */
        .transaction-item:nth-child(1) {
          animation-delay: 0.1s;
        }
        .transaction-item:nth-child(2) {
          animation-delay: 0.2s;
        }
        .transaction-item:nth-child(3) {
          animation-delay: 0.3s;
        }
        .transaction-item:nth-child(4) {
          animation-delay: 0.4s;
        }
        .transaction-item:nth-child(5) {
          animation-delay: 0.5s;
        }
        .transaction-item:nth-child(n + 6) {
          animation-delay: 0.6s;
        }

        /* Screen adjustments when the card and drawer are open */
        .main-content-with-detail {
          filter: blur(2px);
          transform: scale(0.98);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }
      `}</style>

      {/* Transaction History Drawer */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          drawerVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeTransactionDrawer}
      >
        <div
          className={`fixed top-0 bottom-0 right-0 w-full sm:w-96 md:w-[500px] bg-white shadow-2xl transition-transform duration-500 transform ${
            drawerVisible ? "translate-x-0" : "translate-x-full"
          } rounded-l-3xl overflow-hidden z-[61]`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          onClick={(e) => e.stopPropagation()}
        >
          {selectedAccountId && (
            <>
              {/* Drawer Header */}
              <div className="p-5 bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-500 text-white relative overflow-hidden">
                <button
                  onClick={closeTransactionDrawer}
                  className="absolute left-5 top-5 rounded-full h-8 w-8 flex items-center justify-center bg-white/20 hover:bg-white/30 transition-all duration-200"
                >
                  <X size={18} className="text-white" />
                </button>

                <div className="text-center pt-2">
                  <h3 className="text-xl font-medium">Lịch sử giao dịch</h3>
                  <p className="text-white/80 text-sm mt-1">
                    {
                      paymentAccounts.find(
                        (acc) => acc.id === selectedAccountId
                      )?.accountNumber
                    }
                  </p>
                </div>
              </div>

              {/* Transaction List with staggered animations */}
              <div className="overflow-y-auto mb-8 h-full">
                <div className="p-4">
                  <FilterableAccountTransactionList
                    transactions={transactionHistoryData[selectedAccountId]}
                    emptyMessage="Không có giao dịch nào cho tài khoản này"
                    emptyIcon={<FileText size={48} className="text-gray-400" />}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Chi tiết thẻ tài khoản ở giữa màn hình */}
      <div
        className={`fixed inset-0 z-[60] pointer-events-none hidden md:flex items-center justify-center transition-opacity duration-300 ${
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
          {selectedCardDetail && (
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden card-detail-animate mx-4">
              {/* Header với màu gradient của tài khoản */}
              <div
                className={`p-6 ${selectedCardDetail.color} relative overflow-hidden`}
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
                        Tài khoản {selectedCardDetail.id}
                      </h2>
                      <p className="text-white/80 font-mono mt-1">
                        {hiddenAccountInfo[selectedCardDetail.id]
                          ? maskAccountNumber(selectedCardDetail.accountNumber)
                          : selectedCardDetail.accountNumber}
                      </p>
                      <div
                        className={`inline-flex items-center px-2.5 py-1 mt-2 rounded-full text-xs font-medium ${getStatusInfo(
                          selectedCardDetail.status
                        ).bgColor.replace(
                          "bg-",
                          "bg-opacity-20 bg-"
                        )} text-white`}
                      >
                        {getStatusInfo(selectedCardDetail.status).icon}
                        {getStatusInfo(selectedCardDetail.status).text}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        toggleAccountVisibility(selectedCardDetail.id)
                      }
                      className="rounded-full p-2 bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                    >
                      {hiddenAccountInfo[selectedCardDetail.id] ? (
                        <EyeOff size={18} className="text-white" />
                      ) : (
                        <Eye size={18} className="text-white" />
                      )}
                    </button>

                    {selectedCardDetail.status !== "permanent_locked" && (
                      <button
                        onClick={() =>
                          toggleAccountStatus(selectedCardDetail.id)
                        }
                        className="rounded-full p-2 bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                      >
                        {selectedCardDetail.status === "active" ? (
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
                    {hiddenAccountInfo[selectedCardDetail.id] ? (
                      <span className="text-white/60">••••••••</span>
                    ) : (
                      formatCurrency(selectedCardDetail.balance)
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
                      <Calendar size={14} className="mr-2 text-indigo-500" />
                      {selectedCardDetail.creationDate}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-xl">
                    <p className="text-gray-500 text-xs mb-1">Loại tài khoản</p>
                    <p className="text-gray-800 flex items-center text-sm">
                      <CreditCard size={14} className="mr-2 text-indigo-500" />
                      Thanh toán
                    </p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-xl">
                    <p className="text-gray-500 text-xs mb-1">Trạng thái</p>
                    <p className="flex items-center text-sm">
                      {getStatusInfo(selectedCardDetail.status).icon}
                      <span
                        className={
                          getStatusInfo(selectedCardDetail.status).textColor
                        }
                      >
                        {getStatusInfo(selectedCardDetail.status).text}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Các hành động khác */}
                <div className="mt-6 flex flex-wrap gap-3 justify-center">
                  <button className="bg-amber-50 text-amber-600 px-4 py-2 rounded-xl flex items-center text-sm hover:bg-amber-100 transition-colors">
                    <FileIcon size={16} className="mr-2" />
                    Sao kê
                  </button>
                  <button
                    className="bg-gray-50 text-gray-600 px-4 py-2 rounded-xl flex items-center text-sm hover:bg-gray-100 transition-colors"
                    onClick={closeTransactionDrawer}
                  >
                    <X size={16} className="mr-2" />
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chi tiết thẻ tiết kiệm ở giữa màn hình */}
      <div
        className={`fixed inset-0 z-[61] pointer-events-none hidden md:flex items-center justify-center transition-opacity duration-300 ${
          savingsCardDetailVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`w-full max-w-3xl transition-all duration-500 transform ${
            savingsCardDetailVisible
              ? "translate-y-0 scale-100"
              : "translate-y-8 scale-95"
          } ${savingsDetailVisible ? "mr-[500px] sm:mr-96" : "mr-0"}`}
          style={{
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            pointerEvents: savingsCardDetailVisible ? "auto" : "none",
          }}
        >
          {selectedSavingsDetail && (
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden card-detail-animate mx-4">
              {/* Header */}
              <div
                className={`p-6 ${selectedSavingsDetail.color} relative overflow-hidden`}
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
                        {selectedSavingsDetail.nickname}
                      </h2>
                      <p className="text-white/80 mt-1">
                        {selectedSavingsDetail.depositNumber}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        toggleAccountVisibility(selectedSavingsDetail.id)
                      }
                      className="rounded-full p-2 bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                    >
                      {hiddenAccountInfo[selectedSavingsDetail.id] ? (
                        <EyeOff size={18} className="text-white" />
                      ) : (
                        <Eye size={18} className="text-white" />
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
                        {hiddenAccountInfo[selectedSavingsDetail.id] ? (
                          <span className="text-white/60">••••••••</span>
                        ) : (
                          formatCurrency(selectedSavingsDetail.remainingAmount)
                        )}
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-white/80 text-sm">Lãi suất</p>
                      <p className="text-xl font-semibold text-white mt-1">
                        {selectedSavingsDetail.interestRate}%/năm
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Thông tin chi tiết */}
              <div className="p-6">
                <SavingAccountDetail
                  account={selectedSavingsDetail}
                  isHidden={hiddenAccountInfo[selectedSavingsDetail.id]}
                  formatCurrency={formatCurrency}
                />

                {/* Các hành động */}
                <div className="mt-6 flex flex-wrap gap-4 justify-center md:flex hidden">
                  <motion.button
                    className="relative group bg-gradient-to-br from-amber-50/80 via-white/90 to-orange-100/60 backdrop-blur-2xl px-5 py-3 rounded-2xl shadow-md border border-amber-200/50 flex items-center text-sm font-semibold text-amber-600 overflow-hidden min-w-[110px] justify-center"
                    onClick={toggleWithdrawalPanel}
                    whileHover={{
                      boxShadow: "0 15px 35px -10px rgba(215, 168, 13, 0.3)",
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

                  <motion.button
                    className="relative group bg-gradient-to-br from-gray-50/80 via-white/90 to-slate-100/60 backdrop-blur-2xl px-5 py-3 rounded-2xl shadow-md border border-gray-200/50 flex items-center text-sm font-semibold text-gray-600 overflow-hidden min-w-[100px] justify-center"
                    onClick={closeSavingsDetailDrawer}
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

                {/* Tab action only visible on mobile */}
                {
                  <div className="fixed bottom-6 left-8 right-8 bg-black/5 backdrop-blur-md rounded-3xl p-2 flex justify-around md:hidden z-[70]">
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

                    <motion.button
                      className="relative group flex flex-col items-center justify-center px-4 py-2 rounded-2xl overflow-hidden min-w-[70px]"
                      onClick={() =>
                        toggleAccountVisibility(selectedSavingsDetail.id)
                      }
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
                        {hiddenAccountInfo[selectedSavingsDetail.id] ? (
                          <Eye size={18} className="text-white" />
                        ) : (
                          <EyeOff size={18} className="text-white" />
                        )}
                      </div>
                      <span className="text-xs font-medium text-purple-600 relative">
                        {hiddenAccountInfo[selectedSavingsDetail.id]
                          ? "Hiện"
                          : "Ẩn"}
                      </span>
                    </motion.button>

                    <motion.button
                      className="relative group flex flex-col items-center justify-center px-4 py-2 rounded-2xl overflow-hidden min-w-[70px]"
                      onClick={closeSavingsDetailDrawer}
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
                }
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Savings Account Detail Drawer */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          savingsDetailVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSavingsDetailDrawer}
      >
        <div
          className={`fixed top-0 bottom-0 right-0 w-full sm:w-96 md:w-[500px] bg-white shadow-2xl transition-transform duration-500 transform ${
            savingsDetailVisible ? "translate-x-0" : "translate-x-full"
          } rounded-l-3xl overflow-hidden z-[61]`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          onClick={(e) => e.stopPropagation()}
        >
          {selectedSavingsId && (
            <>
              {/* Drawer Header */}
              <div
                className={`p-5 ${
                  withdrawalPanelVisible
                    ? "bg-amber-500"
                    : "bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-500"
                } text-white relative overflow-hidden`}
              >
                <button
                  onClick={closeSavingsDetailDrawer}
                  className="absolute left-5 top-5 rounded-full h-8 w-8 flex items-center justify-center bg-white/20 hover:bg-white/30 transition-all duration-200"
                >
                  <X size={18} className="text-white" />
                </button>

                <div className="text-center pt-2">
                  <h3 className="text-xl font-medium">
                    {withdrawalPanelVisible
                      ? "Rút tiền trước hạn"
                      : "Chi tiết tiền gửi"}
                  </h3>
                  <p className="text-white/80 text-sm mt-1">
                    {
                      savingsAccounts.find(
                        (acc) => acc.id === selectedSavingsId
                      )?.nickname
                    }
                  </p>
                </div>
              </div>

              {/* Tab navigation */}
              {!withdrawalPanelVisible && (
                <div className="flex bg-white/70 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20">
                <AnimatedTabNavigation
                  activeTab={savingsRightPanelContent}
                  onTabChange={switchSavingsRightPanel}
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
              )}
              {/* <div className="flex border-b border-gray-200 pt-2">
                <button
                  className={`flex-1 py-3 text-sm font-medium flex items-center justify-center ${
                    savingsRightPanelContent === "transactions"
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-gray-500 hover:text-gray-700"
                  } ${
                    withdrawalPanelVisible
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }`}
                  onClick={() => switchSavingsRightPanel("transactions")}
                  disabled={withdrawalPanelVisible}
                >
                  <History size={14} className="mr-2" />
                  Lịch sử giao dịch
                </button>
                <button
                  className={`flex-1 py-3 text-sm font-medium flex items-center justify-center ${
                    savingsRightPanelContent === "interest"
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-gray-500 hover:text-gray-700"
                  } ${
                    withdrawalPanelVisible
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }`}
                  onClick={() => switchSavingsRightPanel("interest")}
                  disabled={withdrawalPanelVisible}
                >
                  <DollarSign size={14} className="mr-2" />
                  Lịch sử trả lãi
                </button>
                <button
                  className={`flex-1 py-3 text-sm font-medium flex items-center justify-center ${
                    savingsRightPanelContent === "withdrawals"
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-gray-500 hover:text-gray-700"
                  } ${
                    withdrawalPanelVisible
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }`}
                  onClick={() => switchSavingsRightPanel("withdrawals")}
                  disabled={withdrawalPanelVisible}
                >
                  <ArrowUpRight size={14} className="mr-2" />
                  Lịch sử rút tiền
                </button>
              </div> */}

              {/* Panel content based on selected tab */}
              <div
                className="px-5 pb-5 right-panel-scrollbar overflow-y-auto"
                style={{ height: "calc(100vh - 80px)" }}
              >
                {/* Only show tab content when withdrawal panel is not visible */}
                {!withdrawalPanelVisible ? (
                  <div className="savings-panel-content animate-fadeInSlideUp">
                    {/* Transactions Panel */}
                    {savingsRightPanelContent === "transactions" && (
                      <div className="py-4">
                        <FilterableTransactionList
                          transactions={
                            savingsTransactionHistory[selectedSavingsId]
                          }
                          emptyMessage="Không có giao dịch nào cho tài khoản tiết kiệm này"
                          emptyIcon={
                            <FileTextIcon size={48} className="text-gray-400" />
                          }
                        />
                      </div>
                    )}

                    {/* Interest History Panel */}
                    {savingsRightPanelContent === "interest" && (
                      <div className="py-4">
                        <FilterableInterestList
                          interestHistory={
                            savingsInterestHistory[selectedSavingsId]
                          }
                          emptyMessage="Không có lịch sử trả lãi nào cho tài khoản tiết kiệm này"
                          emptyIcon={
                            <DollarSignIcon
                              size={48}
                              className="text-gray-400"
                            />
                          }
                        />
                      </div>
                    )}

                    {/* Withdrawal History Panel */}
                    {savingsRightPanelContent === "withdrawals" && (
                      <div className="py-4">
                        <FilterableWithdrawalList
                          withdrawalHistory={
                            savingsWithdrawalHistory[selectedSavingsId]
                          }
                          emptyMessage="Không có lịch sử rút tiền nào cho tài khoản tiết kiệm này"
                          emptyIcon={
                            <ArrowUpRight size={48} className="text-gray-400" />
                          }
                        />
                      </div>
                    )}

                    {/* Detail Information */}
                    {savingsRightPanelContent === "details" && (
                      <DetailInfo 
                        account={savingsAccounts[selectedSavingsId]}
                      />
                    )}
                  </div>
                ) : (
                  <EarlyWithdrawalPanel
                    account={selectedSavingsDetail}
                    withdrawalType={withdrawalType}
                    withdrawalAmount={withdrawalAmount}
                    withdrawalData={withdrawalData}
                    onWithdrawalTypeChange={handleWithdrawalTypeChange}
                    onWithdrawalAmountChange={handleWithdrawalAmountChange}
                    onCancel={toggleWithdrawalPanel}
                    onConfirm={confirmEarlyWithdrawal}
                    isAdmin={false}
                  />
                )}
              </div>

              {/* Tab action only visible on mobile */}
              {mobileActionBarVisible && (
                <div className="fixed bottom-6 left-8 right-8 bg-black/5 backdrop-blur-md rounded-3xl p-2 flex justify-around md:hidden z-[70]">
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

                  <motion.button
                    className="relative group flex flex-col items-center justify-center px-4 py-2 rounded-2xl overflow-hidden min-w-[70px]"
                    onClick={() => toggleAccountVisibility(selectedSavingsId)}
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
                      {hiddenAccountInfo[selectedSavingsId] ? (
                        <Eye size={18} className="text-white" />
                      ) : (
                        <EyeOff size={18} className="text-white" />
                      )}
                    </div>
                    <span className="text-xs font-medium text-purple-600 relative">
                      {hiddenAccountInfo[selectedSavingsDetail.id]
                        ? "Hiện"
                        : "Ẩn"}
                    </span>
                  </motion.button>

                  <motion.button
                    className="relative group flex flex-col items-center justify-center px-4 py-2 rounded-2xl overflow-hidden min-w-[70px]"
                    onClick={closeSavingsDetailDrawer}
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
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {savingsAccountModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md"
          >
            <NewSavingsAccountModal
              isOpen={savingsAccountModalOpen}
              onClose={toggleSavingsAccountModal}
              onCreateAccount={createSavingsAccount}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Swipe Confirmation Modal */}
      <SwipeConfirmationModal
        isOpen={confirmationModal.isOpen}
        onClose={closeConfirmationModal}
        onConfirm={confirmationModal.onConfirm}
        title={confirmationModal.title}
        description={confirmationModal.description}
        confirmText={confirmationModal.confirmText}
        confirmDetails={confirmationModal.confirmDetails}
        type={confirmationModal.type}
        isProcessing={confirmationModal.isProcessing}
      />

      {/* Notification Component */}
      <ExportNotification
        isVisible={notificationVisible}
        onClose={handleCloseNotification}
        message={notificationMessage}
        type={notificationType}
        format={notificationFormat}
        position="bottom-center"
        autoHideDuration={5000}
      />
    </div>
  );
}