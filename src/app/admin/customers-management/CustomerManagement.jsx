import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Edit, 
  User, 
  MapPin, 
  CheckCircle, 
  XCircle, 
  Plus,
  Download,
  FileText,
  Lock,
  Unlock,
  Save,
  HelpCircle,
  ArrowDownLeft,
  ArrowUpRight,
  PlusCircle,
  TrendingUp,
  MinusCircle,
  Info,
  CreditCard,
  Globe,
  Smartphone,
  Building,
  Calendar
} from 'lucide-react';
import SearchFilterBar from '@/components/common/SearchFilterBar';
import DataTable from '../../../components/common/DataTable';
import SwipeConfirmationModal from '../../../components/modals/ConfirmationModal/SwipeConfirmationModal';
import PaymentAccountsNew from '../../../components/modules/payment-account/PaymentAccountsNew';
import SavingsAccounts from '../../../components/modules/saving-account/SavingsAccounts';
import CalendarDatePicker from '../../../components/ui/CalendarDatePicker';
import ExportDataModal from '../../../components/common/ExportDataModal';
import ExportNotification from '../../../components/common/ExportNotification';
import InputField from '../../../components/ui/custom/Inputfield';
import CustomSelect from '../../../components/ui/custom/CustomSelect';
import AddressFields from '../../../components/ui/custom/AddressFields';
import StatusBadge from '../../../components/ui/custom/StatusBadge';
import ModalHeader from '../../../components/ui/custom/ModalHeader';
import AnimatedTabNavigation from '../../../components/ui/custom/AnimatedTabNavigation';

export default function CustomerManagement() {
  // Define columns for DataTable
  const customerColumns = [
    {
      key: 'fullName',
      label: 'Họ tên',
      sortable: true,
      formatter: (value, item) => (
        <div className="flex items-center">
          <div className="">
            <div className="text-sm font-medium text-gray-900">{value}</div>
          </div>
        </div>
      )
    },
    {
      key: 'birthDate',
      label: 'Ngày sinh',
      sortable: true,
      className: 'hidden sm:table-cell' // Ẩn trên mobile
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      className: 'hidden sm:table-cell' // Ẩn trên mobile
    },
    {
      key: 'phone',
      label: 'Số điện thoại',
      sortable: true,
      className: 'hidden sm:table-cell' // Ẩn trên mobile
    },
    {
      key: 'idNumber',
      label: 'Số CCCD',
      sortable: true,
      className: 'hidden sm:table-cell' // Ẩn trên mobile
    },
    {
      key: 'status',
      label: 'Trạng thái',
      sortable: true,
      type: 'status' // Sử dụng StatusBadge component
    }
  ];

  // Custom render actions for DataTable
  const renderActions = (customer) => {
    return (
      <>
        <motion.button
          onClick={() => enableEditMode(customer)}
          whileHover={{ scale: 1.15, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className="text-blue-600 hover:text-blue-800 p-1.5 rounded-full hover:bg-blue-50"
        >
          <Edit size={18} />
        </motion.button>
        <motion.button
          onClick={() => toggleCustomerStatus(customer.id)}
          whileHover={{ scale: 1.15, rotate: -5 }}
          whileTap={{ scale: 0.95 }}
          className={`p-1.5 rounded-full ${customer.status === 'active' ? 'text-red-600 hover:text-red-800 hover:bg-red-50' : 'text-green-600 hover:text-green-800 hover:bg-green-50'}`}
        >
          {customer.status === 'active' ? <Lock size={18} /> : <Unlock size={18} />}
        </motion.button>
      </>
    );
  };

  // State for customer data
  const [customers, setCustomers] = useState([
    {
      id: 1,
      code: 'KH000001',
      fullName: 'Nguyễn Văn A',
      birthDate: '12/05/1985',
      age: 38,
      idNumber: '036085123456',
      email: 'nguyenvana@email.com',
      phone: '0901234567',
      permanentAddress: {
        province: 'Hà Nội',
        district: 'Cầu Giấy',
        ward: 'Dịch Vọng',
        street: 'Trần Thái Tông',
        houseNumber: '125'
      },
      contactAddress: {
        province: 'Hà Nội',
        district: 'Cầu Giấy',
        ward: 'Dịch Vọng',
        street: 'Trần Thái Tông',
        houseNumber: '125'
      },
      registrationDate: '15/06/2022',
      status: 'active'
    },
    {
      id: 2,
      code: 'KH000002',
      fullName: 'Trần Thị B',
      birthDate: '25/11/1990',
      age: 33,
      idNumber: '024190789123',
      email: 'tranthib@email.com',
      phone: '0912345678',
      permanentAddress: {
        province: 'TP. Hồ Chí Minh',
        district: 'Quận 1',
        ward: 'Bến Nghé',
        street: 'Lê Duẩn',
        houseNumber: '78'
      },
      contactAddress: {
        province: 'TP. Hồ Chí Minh',
        district: 'Quận 1',
        ward: 'Bến Nghé',
        street: 'Lê Duẩn',
        houseNumber: '78'
      },
      registrationDate: '20/08/2022',
      status: 'active'
    },
    {
      id: 3,
      code: 'KH000003',
      fullName: 'Lê Văn C',
      birthDate: '10/03/1978',
      age: 45,
      idNumber: '025781234567',
      email: 'levanc@email.com',
      phone: '0923456789',
      permanentAddress: {
        province: 'Đà Nẵng',
        district: 'Hải Châu',
        ward: 'Thuận Phước',
        street: 'Bạch Đằng',
        houseNumber: '45'
      },
      contactAddress: {
        province: 'Đà Nẵng',
        district: 'Hải Châu',
        ward: 'Thuận Phước',
        street: 'Bạch Đằng',
        houseNumber: '45'
      },
      registrationDate: '05/11/2022',
      status: 'disabled'
    },
    {
      id: 4,
      code: 'KH000004',
      fullName: 'Phạm Thị D',
      birthDate: '18/07/1995',
      age: 28,
      idNumber: '038095345678',
      email: 'phamthid@email.com',
      phone: '0934567890',
      permanentAddress: {
        province: 'Hải Phòng',
        district: 'Hồng Bàng',
        ward: 'Hoàng Văn Thụ',
        street: 'Lê Lợi',
        houseNumber: '102'
      },
      contactAddress: {
        province: 'Hải Phòng',
        district: 'Hồng Bàng',
        ward: 'Hoàng Văn Thụ',
        street: 'Lê Lợi',
        houseNumber: '102'
      },
      registrationDate: '12/02/2023',
      status: 'active'
    },
    {
      id: 5,
      code: 'KH000005',
      fullName: 'Hoàng Văn E',
      birthDate: '30/09/1982',
      age: 41,
      idNumber: '026082456789',
      email: 'hoangvane@email.com',
      phone: '0945678901',
      permanentAddress: {
        province: 'Hà Nội',
        district: 'Đống Đa',
        ward: 'Quang Trung',
        street: 'Nguyễn Lương Bằng',
        houseNumber: '56'
      },
      contactAddress: {
        province: 'Hà Nội',
        district: 'Đống Đa',
        ward: 'Quang Trung',
        street: 'Nguyễn Lương Bằng',
        houseNumber: '56'
      },
      registrationDate: '25/04/2023',
      status: 'disabled'
    }
  ]);

  // State for payment accounts
  const [paymentAccounts, setPaymentAccounts] = useState({
    1: [
      {
        id: 1,
        accountNumber: "1234567890123456",
        status: "active",
        balance: 15000000,
        creationDate: "20/04/2022",
        color: "bg-gradient-to-r from-blue-400 to-indigo-500",
        nickname: "Tài khoản chính"
      },
      {
        id: 2,
        accountNumber: "9876543210987654",
        status: "active",
        balance: 7500000,
        creationDate: "15/06/2022",
        color: "bg-gradient-to-r from-pink-400 to-purple-500",
        nickname: "Tài khoản phụ"
      }
    ],
    2: [
      {
        id: 3,
        accountNumber: "5678901234567890",
        status: "active",
        balance: 12000000,
        creationDate: "05/08/2022",
        color: "bg-gradient-to-r from-green-400 to-teal-500",
        nickname: "Tài khoản tiêu dùng"
      }
    ],
    3: [
      {
        id: 4,
        accountNumber: "6543210987654321",
        status: "locked",
        balance: 2300000,
        creationDate: "10/12/2022",
        color: "bg-gradient-to-r from-orange-400 to-amber-500",
        nickname: "Tài khoản tiết kiệm"
      }
    ],
    4: [],
    5: []
  });

  // State for transaction history
  const [transactionHistory, setTransactionHistory] = useState({
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
      }
    ],
    2: [
      {
        id: 1,
        time: "14:45 - 05/05/2023",
        type: "Thanh toán hóa đơn",
        channel: "Mobile Banking",
        amount: 850000,
        balanceAfter: 6650000,
        content: "Thanh toán hóa đơn điện tháng 5",
        isIncoming: false
      },
      {
        id: 2,
        time: "08:30 - 01/05/2023",
        type: "Nhận lương",
        channel: "Chuyển khoản liên ngân hàng",
        amount: 7500000,
        balanceAfter: 7500000,
        content: "Lương tháng 4/2023",
        isIncoming: true
      }
    ],
    3: [],
    4: []
  });

  // State for savings accounts
  const [savingsAccounts, setSavingsAccounts] = useState({
    1: [
      {
        id: 1,
        nickname: "Tiết kiệm mua nhà",
        depositNumber: "TK2023050001",
        term: "12 tháng",
        termDays: 365,
        amount: 200000000,
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
        tooltip: "Lãi suất ưu đãi +0.3%"
      }
    ],
    2: [
      {
        id: 2,
        nickname: "Tiết kiệm du học",
        depositNumber: "TK2023060002",
        term: "6 tháng",
        termDays: 180,
        amount: 150000000,
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
        color: "bg-gradient-to-r from-pink-400 to-purple-500"
      }
    ],
    3: [],
    4: [],
    5: []
  });

  // State for savings transaction history
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
      }
    ]
  });

  // State for selected account/savings details
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [selectedSavingsId, setSelectedSavingsId] = useState(null);
  const [accountDetailVisible, setAccountDetailVisible] = useState(false);
  const [savingsDetailVisible, setSavingsDetailVisible] = useState(false);

  // State for customer detail modal
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
  
  // State for search and filter
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [sortField, setSortField] = useState('fullName');
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' or 'desc'
  const [exportData, setExporData] = useState([]);
  
  // State for multi-field search
  const [searchFields, setSearchFields] = useState({
    fullName: '',
    idNumber: '',
    email: '',
    phone: ''
  });

  // For new customer
  const [newCustomer, setNewCustomer] = useState({
    fullName: '',
    birthDate: '',
    idNumber: '',
    email: '',
    phone: '',
    permanentAddress: {
      province: '',
      district: '',
      ward: '',
      street: '',
      houseNumber: ''
    },
    contactAddress: {
      province: '',
      district: '',
      ward: '',
      street: '',
      houseNumber: ''
    }
  });
  
  const [editedCustomer, setEditedCustomer] = useState(null);

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Add state for active tab in customer details modal
  const [activeDetailTab, setActiveDetailTab] = useState('information');
  
  // State for overview section
  const [activeSection, setActiveSection] = useState("overview"); // Trạng thái cho tài khoản thanh toán (dữ liệu chính của tab overview)
  
  // State for hiding account information
  const [hiddenAccountInfo, setHiddenAccountInfo] = useState({});
  
  // State for new account modal
  const [newAccountModalOpen, setNewAccountModalOpen] = useState(false);
  const [newAccountModalAnimating, setNewAccountModalAnimating] = useState(false);
  
  // State for account action menu
  const [accountActionMenuOpen, setAccountActionMenuOpen] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [cardDetailVisible, setCardDetailVisible] = useState(false);
  const [selectedCardDetail, setSelectedCardDetail] = useState(null);
  
  // State for confirmation modal
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    title: "",
    description: "",
    confirmText: "",
    confirmDetails: null,
    type: "",
    isProcessing: false,
    onConfirm: null
  });
  
  // State for responsive layout
  const [navHovered, setNavHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Check if viewing on mobile device
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // useEffect to filter and sort customers
  useEffect(() => {
    let result = [...customers];
    
    // Apply search filtering across all search fields
    result = result.filter(customer => {
      // Check each search field
      const nameMatch = searchFields.fullName === '' || 
        customer.fullName.toLowerCase().includes(searchFields.fullName.toLowerCase());
      
      const idMatch = searchFields.idNumber === '' || 
        customer.idNumber.toLowerCase().includes(searchFields.idNumber.toLowerCase());
      
      const emailMatch = searchFields.email === '' || 
        customer.email.toLowerCase().includes(searchFields.email.toLowerCase());
      
      const phoneMatch = searchFields.phone === '' || 
        customer.phone.toLowerCase().includes(searchFields.phone.toLowerCase());
      
      // Customer must match all non-empty search criteria
      return nameMatch && idMatch && emailMatch && phoneMatch;
    });
    
    // Apply sorting
    result.sort((a, b) => {
      let valueA, valueB;
      
      // Handle nested properties
      if (sortField.includes('.')) {
        const [parent, child] = sortField.split('.');
        valueA = a[parent][child];
        valueB = b[parent][child];
      } else {
        valueA = a[sortField];
        valueB = b[sortField];
      }
      
      // Handle string/number comparison
      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
    
    setFilteredCustomers(result);
  }, [customers, searchFields, sortField, sortDirection]);

  // Add useEffect to reset form data when modal state changes
  useEffect(() => {
    if (!isModalOpen) {
      // Reset customer detail modal data when modal is closed
      setTimeout(() => {
        if (!isModalOpen) {
          setSelectedCustomer(null);
          setIsEditMode(false);
          setEditedCustomer(null);
          setActiveDetailTab('information');
        }
      }, 500); // Wait for exit animation to complete
    }
  }, [isModalOpen]);

  // Add useEffect to reset new customer form when add customer modal state changes
  useEffect(() => {
    if (!isAddCustomerModalOpen) {
      // Reset add customer modal data when modal is closed
      setTimeout(() => {
        if (!isAddCustomerModalOpen) {
          setNewCustomer({
            fullName: '',
            birthDate: '',
            idNumber: '',
            email: '',
            phone: '',
            permanentAddress: {
              province: '',
              district: '',
              ward: '',
              street: '',
              houseNumber: ''
            },
            contactAddress: {
              province: '',
              district: '',
              ward: '',
              street: '',
              houseNumber: ''
            }
          });
        }
      }, 500); // Wait for exit animation to complete
    }
  }, [isAddCustomerModalOpen]);

  // Handle search field changes
  const handleSearchChange = (field, value) => {
    setSearchFields(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Clear all search fields
  const clearSearchFields = () => {
    setSearchFields({
      fullName: '',
      idNumber: '',
      email: '',
      phone: ''
    });
  };

  // Handle sort column click
  const handleSort = (field) => {
    // If clicking on the same field, toggle direction
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // If clicking on a new field, set it as sort field and reset direction to asc
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Open customer detail modal
  const openCustomerDetail = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
    setIsEditMode(false);
  };

  // Close customer detail modal
  const closeModal = () => {
    // Use AnimatePresence exit animations by setting isModalOpen to false
    setIsModalOpen(false);
    
    // Immediately clear errors
    setErrors({});
    
    // Reset form data after animation completes in onExitComplete callback
    // The actual state reset happens in the AnimatePresence onExitComplete
  };

  // Toggle customer status (active/disabled)
  const toggleCustomerStatus = (customerId) => {
    const customer = customers.find(c => c.id === customerId);
    if (!customer) return;
    
    const newStatus = customer.status === 'active' ? 'disabled' : 'active';
    const actionText = newStatus === 'active' ? 'kích hoạt' : 'vô hiệu hóa';
    
    openConfirmationModal({
      title: `Xác nhận ${actionText} tài khoản`,
      description: `Bạn có chắc chắn muốn ${actionText} tài khoản của khách hàng "${customer.fullName}" không?`,
      confirmText: `Quẹt để ${actionText}`,
      confirmDetails: {
        'Mã khách hàng': customer.code,
        'Họ tên': customer.fullName,
        'Trạng thái hiện tại': customer.status === 'active' ? 'Hoạt động' : 'Vô hiệu hóa',
        'Trạng thái mới': newStatus === 'active' ? 'Hoạt động' : 'Vô hiệu hóa',
      },
      type: `${newStatus === 'active' ? 'unlock' : 'warning'}`,
      onConfirm: () => {
        setConfirmationProcessing(true);

        setTimeout(() => {
          setCustomers(prevCustomers => 
            prevCustomers.map(c => {
              if (c.id === customerId) {
                return { ...c, status: newStatus };
              }
              return c;
            })
          );
          
          // Hiển thị thông báo thành công
          setExportNotification({
            visible: true,
            type: 'success',
            message: `${newStatus === 'active' ? 'Kích hoạt' : 'Vô hiệu hóa'} khách hàng thành công!`,
            format: `${newStatus === 'active' ? 'Kích hoạt' : 'Vô hiệu hóa'} khách hàng thành công!`
          });
          
          // Tự động ẩn thông báo sau 5 giây
          setTimeout(() => {
            setExportNotification(prev => ({...prev, visible: false}));
          }, 5000);

          setConfirmationProcessing(false);
          closeConfirmationModal();
        }, 2000)
      }
    });
  };

  // Enable edit mode
  const enableEditMode = (customer) => {
    if (!isModalOpen) {
      setSelectedCustomer(customer);
      setIsModalOpen(true);
    }
    setEditedCustomer({
      ...customer,
      contactAddress: { ...customer.contactAddress },
      phone: customer.phone,
      status: customer.status
    });
    setIsEditMode(true);
  };

  // Cancel edit mode and reset form
  const cancelEdit = () => {
    setIsEditMode(false);
    setEditedCustomer(null);
    setErrors({});
  };

  // Handle edit form changes with validation on each keystroke
  const handleEditChange = (field, value) => {
    setEditedCustomer(prev => {
      let updated;
      if (field.startsWith('contactAddress.')) {
        const addressField = field.split('.')[1];
        updated = {
          ...prev,
          contactAddress: {
            ...prev.contactAddress,
            [addressField]: value
          }
        };
      } else {
        updated = {
          ...prev,
          [field]: value
        };
      }
      
      // Validate immediately
      validateAndUpdateField(field, value);
      
      return updated;
    });
  };

  // Save edited customer with validation
  const saveCustomerChanges = () => {
    // Validate all fields before saving
    const fieldsToValidate = ['phone'];
    const addressFields = ['province', 'district', 'ward', 'street', 'houseNumber'];
    
    let isValid = true;
    const newErrors = {};
    
    // Validate phone
    const phoneError = validateField('phone', editedCustomer.phone);
    if (phoneError) {
      newErrors.phone = phoneError;
      isValid = false;
    }
    
    // Validate address fields
    addressFields.forEach(field => {
      const fullField = `contactAddress.${field}`;
      const value = editedCustomer.contactAddress[field];
      const error = validateField(fullField, value);
      
      if (error) {
        newErrors[fullField] = error;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    
    if (isValid) {
      setCustomers(prevCustomers => 
        prevCustomers.map(customer => {
          if (customer.id === editedCustomer.id) {
            return {
              ...customer,
              contactAddress: editedCustomer.contactAddress,
              phone: editedCustomer.phone,
              status: editedCustomer.status
            };
          }
          return customer;
        })
      );
      setIsEditMode(false);
      setSelectedCustomer(prev => ({
        ...prev,
        contactAddress: editedCustomer.contactAddress,
        phone: editedCustomer.phone,
        status: editedCustomer.status
      }));
      
      // Hiển thị thông báo thành công
      setExportNotification({
        visible: true,
        type: 'success',
        message: 'Lưu thay đổi thành công!',
        format: 'Hệ thống đã lưu thay đổi'
      });
      
      // Tự động ẩn thông báo sau 5 giây
      setTimeout(() => {
        setExportNotification(prev => ({...prev, visible: false}));
      }, 5000);
    } else {
      // Hiển thị thông báo lỗi nếu không hợp lệ
      setExportNotification({
        visible: true,
        type: 'error',
        message: 'Không thể lưu thay đổi!',
        format: 'Có lỗi khi lưu thay đổi. Vui lòng kiểm tra lại thông tin!'
      });
      
      // Tự động ẩn thông báo sau 5 giây
      setTimeout(() => {
        setExportNotification(prev => ({...prev, visible: false}));
      }, 5000);
    }
  };

  // Toggle add customer modal
  const toggleAddCustomerModal = () => {
    if (isAddCustomerModalOpen) {
      // If closing, just toggle the state and let AnimatePresence handle the reset
      setIsAddCustomerModalOpen(false);
      
      // Immediately clear errors
      setErrors({});
    } else {
      // If opening, reset the form first then open the modal
      setNewCustomer({
        fullName: '',
        birthDate: '',
        idNumber: '',
        email: '',
        phone: '',
        permanentAddress: {
          province: '',
          district: '',
          ward: '',
          street: '',
          houseNumber: ''
        },
        contactAddress: {
          province: '',
          district: '',
          ward: '',
          street: '',
          houseNumber: ''
        }
      });
      setErrors({});
      setIsAddCustomerModalOpen(true);
    }
  };

  // Handle new customer form changes with validation on each keystroke
  const handleNewCustomerChange = (field, value) => {
    setNewCustomer(prev => {
      let updated;
      if (field.startsWith('permanentAddress.')) {
        const addressField = field.split('.')[1];
        updated = {
          ...prev,
          permanentAddress: {
            ...prev.permanentAddress,
            [addressField]: value
          }
        };
      } else if (field.startsWith('contactAddress.')) {
        const addressField = field.split('.')[1];
        updated = {
          ...prev,
          contactAddress: {
            ...prev.contactAddress,
            [addressField]: value
          }
        };
      } else {
        updated = {
          ...prev,
          [field]: value
        };
      }
      
      // Validate immediately
      validateAndUpdateField(field, value);
      
      return updated;
    });
  };

  // Copy permanent address to contact address
  const copyPermanentAddressToContact = () => {
    setNewCustomer(prev => ({
      ...prev,
      contactAddress: { ...prev.permanentAddress }
    }));
  };

  // Validation functions
  const validateField = (field, value) => {
    if (field === 'fullName') {
      if (!value.trim()) return 'Họ tên không được để trống';
      if (value.trim().length < 3) return 'Họ tên phải có ít nhất 3 ký tự';
      return '';
    }
    
    if (field === 'birthDate') {
      if (!value.trim()) return 'Ngày sinh không được để trống';
      const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
      if (!dateRegex.test(value)) return 'Ngày sinh không đúng định dạng DD/MM/YYYY';
      
      // Validate age > 18
      if (dateRegex.test(value)) {
        const parts = value.split('/');
        const birthDate = new Date(parts[2], parts[1] - 1, parts[0]);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        
        if (age < 18) {
          return 'Khách hàng phải từ 18 tuổi trở lên';
        }
      }
      
      return '';
    }
    
    if (field === 'idNumber') {
      if (!value.trim()) return 'Số CCCD/CMND không được để trống';
      if (!/^\d{9,12}$/.test(value)) return 'Số CCCD/CMND phải có 9-12 chữ số';
      return '';
    }
    
    if (field === 'email') {
      if (!value.trim()) return 'Email không được để trống';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return 'Email không đúng định dạng';
      return '';
    }
    
    if (field === 'phone') {
      if (!value.trim()) return 'Số điện thoại không được để trống';
      if (!/^0\d{9,10}$/.test(value)) return 'Số điện thoại phải bắt đầu bằng số 0 và có 10-11 chữ số';
      return '';
    }
    
    if (field.includes('province') || field.includes('district') || field.includes('ward') || field.includes('street')) {
      if (!value.trim()) return 'Thông tin địa chỉ không được để trống';
      return '';
    }
    
    if (field.includes('houseNumber')) {
      if (!value.trim()) return 'Số nhà không được để trống';
      // Add validation for house number - should be a valid number or number with letters (e.g., 123A)
      if (!/^[0-9]+[A-Za-z]?$/.test(value)) return 'Số nhà phải là số hoặc số kèm chữ cái (VD: 123 hoặc 123A)';
      return '';
    }
    
    return '';
  };
  
  // Validate a single field and update errors state
  const validateAndUpdateField = (field, value) => {
    const error = validateField(field, value);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
    return !error;
  };
  
  // Validate all fields in new customer form
  const validateAllFields = () => {
    const newErrors = {};
    let isValid = true;
    
    // Validate personal info
    const personalFields = ['fullName', 'birthDate', 'idNumber', 'email', 'phone'];
    personalFields.forEach(field => {
      const error = validateField(field, newCustomer[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });
    
    // Validate permanent address
    const addressPrefixes = ['permanentAddress', 'contactAddress'];
    const addressFields = ['province', 'district', 'ward', 'street', 'houseNumber'];
    
    addressPrefixes.forEach(prefix => {
      addressFields.forEach(field => {
        const fullField = `${prefix}.${field}`;
        const value = prefix === 'permanentAddress' 
          ? newCustomer.permanentAddress[field]
          : newCustomer.contactAddress[field];
        
        const error = validateField(fullField, value);
        if (error) {
          newErrors[fullField] = error;
          isValid = false;
        }
      });
    });
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Handle field blur for validation
  const handleFieldBlur = (field) => {
    if (field.includes('.')) {
      const [prefix, fieldName] = field.split('.');
      const value = prefix === 'permanentAddress' 
        ? newCustomer.permanentAddress[fieldName]
        : newCustomer.contactAddress[fieldName];
      validateAndUpdateField(field, value);
    } else {
      validateAndUpdateField(field, newCustomer[field]);
    }
  };

  // Add new customer with validation
  const addNewCustomer = () => {
    if (validateAllFields()) {
      // Generate ID and code
      const newId = customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1;
      const newCode = `KH${String(newId).padStart(6, '0')}`;
      
      // Calculate age from birthDate
      const birthDateParts = newCustomer.birthDate.split('/');
      const birthYear = parseInt(birthDateParts[2]);
      const currentYear = new Date().getFullYear();
      const age = currentYear - birthYear;
      
      // Create new customer object with current date as registration date
      const today = new Date();
      const registrationDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
      
      const customerToAdd = {
        id: newId,
        code: newCode,
        fullName: newCustomer.fullName,
        birthDate: newCustomer.birthDate,
        age: age,
        idNumber: newCustomer.idNumber,
        email: newCustomer.email,
        phone: newCustomer.phone,
        permanentAddress: { ...newCustomer.permanentAddress },
        contactAddress: { ...newCustomer.contactAddress },
        registrationDate: registrationDate,
        status: 'active'
      };
      
      // Hiển thị modal xác nhận trước khi thêm khách hàng
      openConfirmationModal({
        title: 'Xác nhận thêm khách hàng mới',
        message: 'Bạn có chắc chắn muốn thêm khách hàng mới này không?',
        confirmText: 'Quẹt để thêm khách hàng',
        confirmDetails: {
          'Mã khách hàng': newCode,
          'Họ tên': newCustomer.fullName,
          'Ngày sinh': newCustomer.birthDate,
          'Số CCCD/CMND': newCustomer.idNumber,
          'Email': newCustomer.email,
          'Số điện thoại': newCustomer.phone
        },
        type: 'add',
        onConfirm: () => {
          // Set processing state to true
          setConfirmationProcessing(true);
          
          // Simulate API call with a delay
          setTimeout(() => {
            try {
              // Add new customer
              setCustomers(prev => [...prev, customerToAdd]);
              
              // Close modals
              closeConfirmationModal();
              toggleAddCustomerModal();
              
              // Hiển thị thông báo thành công
              setExportNotification({
                visible: true,
                type: 'success',
                message: 'Thêm khách hàng mới thành công!',
                format: 'Hệ thống đã ghi nhận khách hàng mới'
              });
              
              // Tự động ẩn thông báo sau 5 giây
              setTimeout(() => {
                setExportNotification(prev => ({...prev, visible: false}));
              }, 5000);
            } catch (error) {
              console.error('Error adding new customer:', error);
              
              // Show error notification
              setExportNotification({
                visible: true,
                type: 'error',
                message: 'Có lỗi xảy ra. Vui lòng thử lại sau!',
                format: 'Hệ thống báo lỗi. Hãy thử lại'
              });
              
              // Reset processing state
              setConfirmationProcessing(false);
            }
          }, 1500); // 1.5 second delay
        }
      });
    }
  };

  // Format currency as VND
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  // Mask account number for display
  const maskAccountNumber = (accountNumber) => {
    if (!accountNumber) return "";
    if (accountNumber.length <= 8) return accountNumber;
    
    const firstFour = accountNumber.substring(0, 4);
    const lastFour = accountNumber.substring(accountNumber.length - 4);
    const masked = "*".repeat(accountNumber.length - 8);
    
    return `${firstFour}${masked}${lastFour}`;
  };

  // Get status information for payment accounts
  const getAccountStatusInfo = (status) => {
    switch (status) {
      case 'active':
        return {
          label: "Hoạt động",
          color: "text-green-600",
          bgColor: "bg-green-100",
          icon: <CheckCircle size={16} />
        };
      case 'locked':
        return {
          label: "Tạm khóa",
          color: "text-amber-600",
          bgColor: "bg-amber-100",
          icon: <Lock size={16} />
        };
      case 'permanent_locked':
        return {
          label: "Đã khóa vĩnh viễn",
          color: "text-red-600",
          bgColor: "bg-red-100",
          icon: <XCircle size={16} />
        };
      default:
        return {
          label: "Không xác định",
          color: "text-gray-600",
          bgColor: "bg-gray-100",
          icon: <HelpCircle size={16} />
        };
    }
  };

  // Calculate term progress for savings account
  const calculateTermProgress = (daysRemaining, termDays) => {
    const progress = ((termDays - daysRemaining) / termDays) * 100;
    return Math.min(Math.max(progress, 0), 100); // Ensure progress is between 0-100
  };

  // Open savings account detail
  const openSavingsDetail = (customerId, savingsId) => {
    setSelectedCustomer(customers.find(c => c.id === customerId));
    setSelectedSavingsId(savingsId);
    setSavingsDetailVisible(true);
  };

  // Functions for confirmation modal
  const openConfirmationModal = ({ title, message, confirmText = "Quẹt để xác nhận", confirmDetails = null, type, onConfirm }) => {
    setConfirmationModal({ isOpen: true, title, description: message, confirmText, confirmDetails, type, isProcessing: false, onConfirm });
  };
  
  const closeConfirmationModal = () => {
    setConfirmationModal(prev => ({ ...prev, isOpen: false }));
  };
  
  const setConfirmationProcessing = (isProcessing) => {
    setConfirmationModal(prev => ({ ...prev, isProcessing }));
  };

  // Function to toggle account visibility
  const toggleAccountVisibility = (accountId) => {
    setHiddenAccountInfo(prev => ({
      ...prev,
      [accountId]: !prev[accountId]
    }));
  };

  // Function to toggle account status (active/locked)
  const toggleAccountStatus = (accountId) => {
    const customerId = Object.entries(paymentAccounts).find(([_, accounts]) => 
      accounts.some(account => account.id === accountId)
    )?.[0];
    
    if (customerId) {
      const account = paymentAccounts[customerId].find(acc => acc.id === accountId);
      if (!account || account.status === "permanent_locked") return;
      
      const newStatus = account.status === "active" ? "locked" : "active";
      const actionText = newStatus === "active" ? "mở khóa" : "khóa";
      const customer = customers.find(c => c.id === parseInt(customerId));
      
      openConfirmationModal({
        title: `Xác nhận ${actionText} tài khoản`,
        message: `Bạn có chắc chắn muốn ${actionText} tài khoản ${maskAccountNumber(account.accountNumber)} của khách hàng "${customer?.fullName || 'Không xác định'}" không?`,
        confirmText: `Quẹt để ${actionText}`,
        confirmDetails: {
          'Số tài khoản': maskAccountNumber(account.accountNumber),
          'Chủ tài khoản': customer?.fullName || 'Không xác định',
          'Trạng thái hiện tại': account.status === "active" ? "Hoạt động" : "Đã khóa",
          'Trạng thái mới': newStatus === "active" ? "Hoạt động" : "Đã khóa",
        },
        type: `${account.status === "active" ? 'warning' : 'unlock'}`,
        onConfirm: () => {
          setPaymentAccounts(prev => ({
            ...prev,
            [customerId]: prev[customerId].map(acc => {
              if (acc.id === accountId) {
                return {
                  ...acc,
                  status: newStatus
                };
              }
              return acc;
            })
          }));
          
          // Hiển thị thông báo thành công
          setExportNotification({
            visible: true,
            type: 'success',
            message: `${newStatus === 'active' ? 'Mở khóa' : 'Khóa'} tài khoản thành công!`,
            format: `${newStatus === 'active' ? 'Mở khóa' : 'Khóa'} tài khoản thành công!`
          });
          
          // Tự động ẩn thông báo sau 5 giây
          setTimeout(() => {
            setExportNotification(prev => ({...prev, visible: false}));
          }, 5000);
          
          // Close menu if open
          setAccountActionMenuOpen(null);
        }
      });
    }
  };

  // Function to toggle new account modal
  const toggleNewAccountModal = () => {
    if (!newAccountModalOpen && !newAccountModalAnimating) {
      setNewAccountModalAnimating(true);
      setNewAccountModalOpen(true);
      setTimeout(() => {
        setNewAccountModalAnimating(false);
      }, 300);
    } else if (newAccountModalOpen && !newAccountModalAnimating) {
      setNewAccountModalAnimating(true);
      const modalOverlay = document.getElementById('newAccountModalOverlay');
      const modalContent = document.getElementById('newAccountModalContent');
      if (modalOverlay && modalContent) {
        modalOverlay.classList.remove('modal-enter');
        modalContent.classList.remove('modal-enter-content');
        modalOverlay.classList.add('modal-exit');
        modalContent.classList.add('modal-exit-content');
        setTimeout(() => {
          setNewAccountModalOpen(false);
          setNewAccountModalAnimating(false);
        }, 300);
      } else {
        setNewAccountModalOpen(false);
        setNewAccountModalAnimating(false);
      }
    }
  };

  // Function to open transaction drawer
  const openTransactionDrawer = (accountId) => {
    const customerId = Object.entries(paymentAccounts).find(([_, accounts]) => 
      accounts.some(account => account.id === accountId)
    )?.[0];
    
    if (customerId) {
      setSelectedAccountId(parseInt(customerId));
      const accountDetail = paymentAccounts[customerId].find(acc => acc.id === accountId);
      setSelectedCardDetail(accountDetail);
      setDrawerVisible(true);
      setTimeout(() => {
        setCardDetailVisible(true);
      }, 100);
    }
  };

  // Add state for export data modal
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');
  const [exportNotification, setExportNotification] = useState({
    visible: false,
    type: 'success',
    message: '',
    format: ''
  });
  
  // Handle export data
  const handleExportData = (data, format) => {
    console.log('Exporting data:', data);
    console.log('Format:', format);
    
    // In a real application, this would trigger an API call or use a library
    // to generate and download the file
    
    // For demonstration purposes, we'll randomly show success or error notification
    setExportFormat(format);
    
    // Simulate random success/error (80% success rate)
    const isSuccess = Math.random() > 0.2;
    
    if (isSuccess) {
      // Show success notification
      setExportNotification({
        visible: true,
        type: 'success',
        message: 'Xuất dữ liệu thành công!',
        format: format
      });
    } else {
      // Show error notification
      setExportNotification({
        visible: true,
        type: 'error',
        message: 'Có lỗi khi xuất dữ liệu. Vui lòng thử lại!',
        format: format
      });
    }
    
    // Hide the notification after 5 seconds
    setTimeout(() => {
      setExportNotification(prev => ({...prev, visible: false}));
    }, 5000);
  };
  
  // Render component UI
  return (
    <div className="container mx-auto sm:px-3 md:px-4 lg:pl-2 lg:px-6 xl:pl-2 xl:px-8">
      <style jsx global>{`
        /* Animation classes */
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
          }
          to {
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
          }
          to {
            transform: scale(1);
          }
        }

        .animate-fadeInSlideUp {
          animation: fadeIn 0.3s ease-out, slideUp 0.4s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }

        /* Modal animations */
        .modal-enter {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .modal-exit {
          animation: fadeIn 0.3s ease-out reverse forwards;
        }

        .modal-enter-content {
          animation: scaleIn 0.3s ease-out forwards,
            slideUp 0.3s ease-out forwards;
        }

        .modal-exit-content {
          animation: scaleIn 0.3s ease-out reverse forwards,
            slideUp 0.3s ease-out reverse forwards;
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

        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: #c5c5c5;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }

        /* Account card animations */
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
          background-size: 200% 100%;
        }

        .shimmer-effect {
          animation: shimmer 2.5s infinite;
        }

        .account-card:hover {
          transform: translateY(-5px);
        }

        @keyframes numberReveal {
          0% {
            opacity: 0;
            transform: translateY(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: numberReveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .lock-button:hover + .tooltip-lock {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .tooltip-lock {
          transition: all 0.3s ease;
        }

        @keyframes floatingAnimation {
          0% {
            transform: translateY(0) rotate(0);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
          100% {
            transform: translateY(0) rotate(0);
          }
        }

        .floating-element {
          animation: floatingAnimation 3s ease-in-out infinite;
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

        .gradient-animate {
          background-size: 200% 200%;
          animation: rotateBackground 5s ease infinite;
        }

        /* Drawer animations */
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

        @keyframes cardAppear {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .card-detail-animate {
          animation: cardAppear 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>

      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-1 bg-gradient-to-r from-indigo-700 to-blue-500 bg-clip-text text-transparent">
              Quản lý khách hàng & tiền gửi
            </h2>
            <p className="text-gray-500 text-sm">
              Quản lý thông tin, trạng thái và tiền gửi của khách hàng
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center gap-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.button
              onClick={() => setIsExportModalOpen(true)}
              className="group flex items-center space-x-2 px-4 py-2.5 md:px-5 md:py-3 bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-600 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download
                size={16}
                className="text-white group-hover:scale-110 transition-transform duration-200"
              />
              <span className="font-medium text-sm md:font-semibold md:text-md">
                Xuất dữ liệu
              </span>
            </motion.button>
          </motion.div>
        </div>

        {/* Search and filter section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <SearchFilterBar
            searchFields={searchFields}
            handleSearchChange={handleSearchChange}
            clearSearchFields={clearSearchFields}
            sortField={sortField}
            sortDirection={sortDirection}
            handleSort={handleSort}
            title="Tìm kiếm khách hàng"
            subtitle="Lọc theo thông tin cá nhân"
          />
        </motion.div>
      </div>

      {/* Customers table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-6"
      >
        <DataTable
          data={filteredCustomers}
          columns={customerColumns}
          sortField={sortField}
          sortDirection={sortDirection}
          handleSort={handleSort}
          onRowClick={openCustomerDetail}
          onEditClick={enableEditMode}
          keyField="id"
          className="bg-white rounded-xl shadow-sm overflow-hidden"
          headerClassName="bg-gradient-to-r from-indigo-600 to-blue-500 text-white"
          renderActions={renderActions}
          emptyMessage="Không tìm thấy khách hàng nào phù hợp với điều kiện tìm kiếm"
          // Bộ lọc trạng thái
          statusFilters={{
            status: ['active', 'disabled']
          }}
          changeTableData={setExporData}
          // Bộ lọc khoảng thời gian
          dateRangeFilters={{
            registrationDate: { label: 'Ngày đăng ký' },
            birthDate: { label: 'Ngày sinh' }
          }}
        />
      </motion.div>

      {/* "Add Customer" fixed button */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center z-10">
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.5)",
          }}
          whileTap={{ scale: 0.95 }}
          className="h-12 sm:h-14 px-4 sm:px-6 rounded-full bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-600 bg-size-200 bg-pos-0 hover:bg-pos-100 flex items-center justify-center text-white shadow-lg transition-all duration-500"
          onClick={toggleAddCustomerModal}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
        >
          <Plus size={18} className="mr-1 sm:mr-2" />
          <span className="font-medium text-sm sm:text-base">
            Thêm khách hàng
          </span>
        </motion.button>
      </div>

      {/* Customer Detail Modal */}
      <AnimatePresence mode="wait">
        {isModalOpen && selectedCustomer && (
          <motion.div
            key="customer-detail-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onAnimationComplete={(definition) => {
              // Reset data when exit animation completes
              if (definition === "exit") {
                setSelectedCustomer(null);
                setIsEditMode(false);
                setErrors({});
                setActiveDetailTab("information");
                setEditedCustomer(null);
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={closeModal}
            ></motion.div>

            <motion.div
              layoutId={selectedCustomer ? `row-${selectedCustomer.id}` : ""}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              layout
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                layout: { duration: 0.6, type: "spring" },
                opacity: { duration: 0.8 },
                scale: { duration: 0.6 }
              }}
              className="bg-white rounded-2xl w-full max-w-7xl shadow-2xl flex flex-col h-[90vh] relative z-10"
              style={{ scrollbarWidth: "none" }}
            >
              {/* Fixed Header */}
              <ModalHeader
                title="Thông tin chi tiết khách hàng"
                editTitle="Chỉnh sửa thông tin khách hàng"
                isEditMode={isEditMode}
                onClose={closeModal}
                variant={isEditMode ? "teal" : "cyan"}
              />

              {/* Tab Navigation */}
              {!isEditMode && (
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20">
                  <AnimatedTabNavigation
                    activeTab={activeDetailTab}
                    onTabChange={setActiveDetailTab}
                  />
                </div>
              )}

              {/* Disabled Customer Warning */}
              <AnimatePresence>
                {selectedCustomer && selectedCustomer.status === 'disabled' && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="mx-auto max-w-4xl w-full text-sm md:text-base mt-0 px-4 md:px-6 py-4 rounded-3xl backdrop-blur-md bg-amber-500/50 shadow-lg"
                    style={{
                      boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.3)",
                      backdropFilter: "blur(8px)"
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-amber-600/30 rounded-full flex items-center justify-center">
                        <XCircle size={20} className="text-amber-100" />
                      </div>
                      <div className="flex-1 text-amber-50 font-medium">
                        Khách hàng này đang trong diện bị "Vô hiệu hóa", các thao tác nạp/rút tiền đều không thể thực hiện.
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Scrollable Content */}
              <div
                className="overflow-y-auto flex-1 pt-2 p-6 space-y-6"
                style={{ scrollbarWidth: "thin" }}
              >
                {/* Tab Content */}
                <AnimatePresence mode="wait" initial={false}>
                  {!isEditMode && activeDetailTab === "information" && (
                    <motion.div
                      key="information-tab"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {/* Nhóm: Thông tin cá nhân */}
                      <motion.div
                        className="relative group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-200/30 to-blue-200/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                        <div className="relative bg-white/90 backdrop-blur-xl border border-cyan-200/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500">
                          <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                              <User size={20} className="text-white" />
                            </div>
                            <h4 className="text-2xl font-bold bg-gradient-to-r from-cyan-700 to-blue-600 bg-clip-text text-transparent">
                              Thông tin cá nhân
                            </h4>
                            <div className="flex-1 h-px bg-gradient-to-r from-cyan-200 to-transparent"></div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 }}
                            >
                              <InputField
                                label="Mã khách hàng"
                                value={selectedCustomer.code}
                                disabled={true}
                              />
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.15 }}
                            >
                              <InputField
                                label="Họ và tên"
                                value={selectedCustomer.fullName}
                                disabled={true}
                              />
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              <CalendarDatePicker
                                label="Ngày sinh"
                                value={selectedCustomer.birthDate}
                                onChange={() => {}}
                                disabled={true}
                              />
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.25 }}
                            >
                              <InputField
                                label="Tuổi"
                                value={selectedCustomer.age.toString()}
                                disabled={true}
                              />
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              <InputField
                                label="Số CCCD"
                                value={selectedCustomer.idNumber}
                                disabled={true}
                              />
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.35 }}
                            >
                              <InputField
                                label="Email"
                                value={selectedCustomer.email}
                                disabled={true}
                              />
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 }}
                            >
                              <InputField
                                label="Số điện thoại"
                                value={selectedCustomer.phone}
                                disabled={true}
                              />
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.45 }}
                            >
                              <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                  Trạng thái
                                </label>
                                <div className="relative">
                                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/50 to-green-100/50 rounded-2xl blur-sm"></div>
                                  <div className="relative bg-white/80 backdrop-blur-sm p-3 rounded-2xl border border-emerald-200/50">
                                    <StatusBadge
                                      status={selectedCustomer.status}
                                    />
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Nhóm: Địa chỉ thường trú */}
                      <motion.div
                        className="relative group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 to-indigo-200/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                        <div className="relative bg-white/90 backdrop-blur-xl border border-blue-200/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 mt-6">
                          <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                              <MapPin size={20} className="text-white" />
                            </div>
                            <h4 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
                              Địa chỉ thường trú
                            </h4>
                            <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent"></div>
                          </div>

                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            <AddressFields
                              prefix="permanentAddress"
                              values={selectedCustomer.permanentAddress}
                              onChange={() => {}}
                              disabled={true}
                            />
                          </motion.div>
                        </div>
                      </motion.div>

                      {/* Nhóm: Địa chỉ liên lạc */}
                      <motion.div
                        className="relative group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-200/30 to-purple-200/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                        <div className="relative bg-white/90 backdrop-blur-xl border border-indigo-200/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 mt-6">
                          <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                              <MapPin size={20} className="text-white" />
                            </div>
                            <h4 className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-purple-600 bg-clip-text text-transparent">
                              Địa chỉ liên lạc
                            </h4>
                            <div className="flex-1 h-px bg-gradient-to-r from-indigo-200 to-transparent"></div>
                          </div>

                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            <AddressFields
                              prefix="contactAddress"
                              values={selectedCustomer.contactAddress}
                              onChange={() => {}}
                              disabled={true}
                            />
                          </motion.div>
                        </div>
                      </motion.div>

                      {/* Ngày đăng ký */}
                      <motion.div
                        className="relative group mt-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-200/30 to-teal-200/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                        <div className="relative bg-white/90 backdrop-blur-xl border border-cyan-200/50 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-500">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                              <Calendar size={18} className="text-white" />
                            </div>
                            <h5 className="text-lg font-bold bg-gradient-to-r from-cyan-700 to-teal-600 bg-clip-text text-transparent">
                              Thông tin đăng ký
                            </h5>
                          </div>

                          <CalendarDatePicker
                            label="Ngày đăng ký"
                            placeholder="DD/MM/YYYY"
                            value={selectedCustomer.registrationDate}
                            onChange={() => {}}
                            disabled={true}
                          />
                        </div>
                      </motion.div>
                    </motion.div>
                  )}

                  {!isEditMode && activeDetailTab === "payment" && (
                    <motion.div
                      key="payment-tab"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <PaymentAccountsNew
                        paymentAccounts={paymentAccounts}
                        transactionHistory={transactionHistory}
                        hiddenAccountInfo={hiddenAccountInfo}
                        setHiddenAccountInfo={setHiddenAccountInfo}
                        formatCurrency={formatCurrency}
                        maskAccountNumber={maskAccountNumber}
                        getAccountStatusInfo={getAccountStatusInfo}
                        toggleAccountVisibility={toggleAccountVisibility}
                        toggleAccountStatus={toggleAccountStatus}
                        toggleNewAccountModal={toggleNewAccountModal}
                        openTransactionDrawer={openTransactionDrawer}
                        selectedCustomer={selectedCustomer.id}
                        isInModal={true}
                      />
                    </motion.div>
                  )}

                  {!isEditMode && activeDetailTab === "deposits" && (
                    <motion.div
                      key="deposits-tab"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <SavingsAccounts
                        savingsAccounts={savingsAccounts}
                        savingsTransactionHistory={savingsTransactionHistory}
                        formatCurrency={formatCurrency}
                        calculateTermProgress={calculateTermProgress}
                        openSavingsDetail={openSavingsDetail}
                        selectedCustomer={selectedCustomer}
                        isInModal={true}
                      />
                    </motion.div>
                  )}

                  {/* Edit Mode Content */}
                  {isEditMode && (
                    <motion.div
                      key="edit-mode"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="relative group mt-6"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-200/30 to-blue-200/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                      <div className="relative bg-white/90 border border-cyan-200/50 rounded-3xl px-4 py-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500">
                        {/* Nhóm: Thông tin có thể chỉnh sửa */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                              <User size={20} className="text-white" />
                            </div>
                            <h4 className="text-2xl font-bold bg-gradient-to-r from-cyan-700 to-blue-600 bg-clip-text text-transparent">
                              Thông tin có thể chỉnh sửa
                            </h4>
                            <div className="flex-1 h-px bg-gradient-to-r from-cyan-200 to-transparent"></div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.15 }}
                            >
                              <InputField
                                label="Số điện thoại"
                                value={editedCustomer.phone}
                                onChange={(value) =>
                                  handleEditChange("phone", value)
                                }
                                placeholder="Nhập số điện thoại..."
                                error={errors.phone}
                                required={true}
                              />
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              <CustomSelect
                                label="Trạng thái"
                                value={
                                  editedCustomer.status === "active"
                                    ? "Hoạt động"
                                    : "Vô hiệu hóa"
                                }
                                onChange={(value) =>
                                  handleEditChange(
                                    "status",
                                    value === "Hoạt động"
                                      ? "active"
                                      : "disabled"
                                  )
                                }
                                options={["Hoạt động", "Vô hiệu hóa"]}
                                required={true}
                              />
                            </motion.div>
                          </div>
                        </motion.div>

                        {/* Nhóm: Địa chỉ liên lạc */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.25 }}
                          className="mt-8"
                        >
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-2xl blur-sm"></div>
                            <div className="relative bg-white/70 border border-blue-200/40 rounded-2xl p-4 md:p-6">
                              <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                                <div className="flex text-left items-center gap-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md">
                                    <MapPin size={18} className="text-white" />
                                  </div>
                                  <h4 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">
                                    Địa chỉ liên lạc
                                  </h4>
                                </div>

                                <motion.button
                                  type="button"
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => {
                                    setEditedCustomer((prev) => ({
                                      ...prev,
                                      contactAddress: {
                                        ...selectedCustomer.permanentAddress,
                                      },
                                    }));
                                  }}
                                  className="group relative text-right mt-4 md:mt-0 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                                >
                                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                  <div className="relative flex items-center gap-1">
                                    <svg
                                      className="w-4 h-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                      />
                                    </svg>
                                    <span className="text-sm">
                                      Giống địa chỉ thường trú
                                    </span>
                                  </div>
                                </motion.button>
                              </div>

                              <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                              >
                                <AddressFields
                                  prefix="contactAddress"
                                  values={editedCustomer.contactAddress}
                                  onChange={handleEditChange}
                                  errors={errors}
                                  required={true}
                                  onBlur={(field) =>
                                    validateAndUpdateField(
                                      field,
                                      editedCustomer.contactAddress[
                                        field.split(".")[1]
                                      ]
                                    )
                                  }
                                />
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Fixed Footer */}
              <AnimatePresence>
                {activeDetailTab === "information" && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="p-6 border-t border-gray-100 flex justify-end space-x-4 sticky bottom-0 bg-white rounded-b-2xl z-10">
                      <AnimatePresence mode="wait" initial={false}>
                        {isEditMode ? (
                          <motion.div
                            key="edit-buttons"
                            className="flex space-x-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={cancelEdit}
                              className="px-6 py-3 font-medium bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition-all duration-300"
                            >
                              Hủy bỏ
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={saveCustomerChanges}
                              className="px-6 py-3 font-semibold bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center"
                            >
                              <Save size={16} className="mr-2" />
                              Lưu thay đổi
                            </motion.button>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="view-buttons"
                            className="flex space-x-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={closeModal}
                              className="px-6 py-3 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition-all duration-300"
                            >
                              Đóng
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => enableEditMode(selectedCustomer)}
                              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center"
                            >
                              <Edit size={16} className="mr-2" />
                              Chỉnh sửa
                            </motion.button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Customer Modal */}
      <AnimatePresence mode="sync">
        {isAddCustomerModalOpen && (
          <motion.div
            key="add-customer-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onAnimationComplete={(definition) => {
              // Reset form data when exit animation completes
              if (definition === "exit") {
                setNewCustomer({
                  fullName: "",
                  birthDate: "",
                  idNumber: "",
                  email: "",
                  phone: "",
                  permanentAddress: {
                    province: "",
                    district: "",
                    ward: "",
                    street: "",
                    houseNumber: "",
                  },
                  contactAddress: {
                    province: "",
                    district: "",
                    ward: "",
                    street: "",
                    houseNumber: "",
                  },
                });
                setErrors({});
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={toggleAddCustomerModal}
            ></motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                duration: 0.6,
              }}
              className="bg-sky-50 rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[90vh] relative z-10"
              style={{ scrollbarWidth: "none" }}
            >
              {/* Fixed Header */}
              <div className="">
                <ModalHeader
                  title="Thêm khách hàng mới"
                  editTitle="NO DATA"
                  isEditMode={false}
                  onClose={toggleAddCustomerModal}
                  variant="cyan"
                  className="py-2"
                />
              </div>

              {/* Scrollable Content */}
              <div
                className="overflow-y-auto flex-1 py-8 px-4 md:px-12"
                style={{ scrollbarWidth: "thin" }}
              >
                <form className="space-y-8">
                  {/* Thông tin cá nhân */}
                  <motion.div
                    layout
                    transition={{
                      layout: { duration: 0.3, type: "spring" },
                      height: { duration: 0.3, type: "spring" },
                    }}
                    className="bg-white/90 border border-cyan-200/50 rounded-3xl shadow-lg hover:shadow-xl pt-0 px-0 p-0 space-y-0 transition-all duration-500"
                  >
                    <div className="flex items-center gap-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-t-3xl border-b-0 mb-0 mx-0 px-8 py-4">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <User size={20} className="text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-white flex items-center gap-2">
                        Thông tin cá nhân
                      </h4>
                      <div className="flex-1 h-px bg-white/30"></div>
                    </div>
                    <div className="p-8">
                      <motion.div
                        layout
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                      >
                        <InputField
                          label="Họ và tên"
                          placeholder="Nhập họ và tên..."
                          value={newCustomer.fullName}
                          onChange={(val) =>
                            handleNewCustomerChange("fullName", val)
                          }
                          onBlur={() => handleFieldBlur("fullName")}
                          error={errors.fullName}
                          required={true}
                        />
                        <CalendarDatePicker
                          label="Ngày sinh"
                          placeholder="DD/MM/YYYY"
                          value={newCustomer.birthDate}
                          onChange={(val) =>
                            handleNewCustomerChange("birthDate", val)
                          }
                          onBlur={() => handleFieldBlur("birthDate")}
                          error={errors.birthDate}
                          required={true}
                        />
                        <InputField
                          label="Số CCCD/CMND"
                          placeholder="Nhập số CCCD/CMND..."
                          value={newCustomer.idNumber}
                          onChange={(val) =>
                            handleNewCustomerChange("idNumber", val)
                          }
                          onBlur={() => handleFieldBlur("idNumber")}
                          error={errors.idNumber}
                          required={true}
                        />
                        <InputField
                          label="Email"
                          type="email"
                          placeholder="example@email.com"
                          value={newCustomer.email}
                          onChange={(val) =>
                            handleNewCustomerChange("email", val)
                          }
                          onBlur={() => handleFieldBlur("email")}
                          error={errors.email}
                          required={true}
                        />
                        <InputField
                          label="Số điện thoại"
                          placeholder="Nhập số điện thoại..."
                          value={newCustomer.phone}
                          onChange={(val) =>
                            handleNewCustomerChange("phone", val)
                          }
                          onBlur={() => handleFieldBlur("phone")}
                          error={errors.phone}
                          required={true}
                        />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Địa chỉ thường trú */}
                  <motion.div
                    layout
                    transition={{
                      layout: { duration: 0.3, type: "spring" },
                      height: { duration: 0.3, type: "spring" },
                    }}
                    className="bg-white/90 border border-blue-200/50 rounded-3xl shadow-lg hover:shadow-xl pt-0 px-0 p-0 space-y-0 transition-all duration-500"
                  >
                    <div className="flex items-center gap-4 bg-gradient-to-r from-teal-400 via-cyan-500 to-teal-600 rounded-t-3xl border-b-0 mb-0 mx-0 px-8 py-4">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <MapPin size={20} className="text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-white flex items-center gap-2">
                        Địa chỉ thường trú
                      </h4>
                      <div className="flex-1 h-px bg-white/30"></div>
                    </div>
                    <div className="p-8">
                      <AddressFields
                        prefix="permanentAddress"
                        values={newCustomer.permanentAddress}
                        onChange={handleNewCustomerChange}
                        errors={errors}
                        required
                        onBlur={handleFieldBlur}
                      />
                    </div>
                  </motion.div>

                  {/* Địa chỉ liên lạc */}
                  <motion.div
                    layout
                    transition={{
                      layout: { duration: 0.3, type: "spring" },
                      height: { duration: 0.3, type: "spring" },
                    }}
                    className="bg-white/90 border border-indigo-200/50 rounded-3xl shadow-lg hover:shadow-xl pt-0 px-0 p-0 space-y-0 transition-all duration-500"
                  >
                    <div className="flex items-center gap-4 bg-gradient-to-r from-indigo-400 via-blue-500 to-indigo-600 rounded-t-3xl border-b-0 mb-0 mx-0 px-8 py-4">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <MapPin size={20} className="text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-white flex items-center gap-2">
                        Địa chỉ liên lạc
                      </h4>
                      <div className="flex-1 h-px bg-white/30"></div>
                    </div>
                    <div className="p-8">
                      <div className="flex justify-end mb-6">
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={copyPermanentAddressToContact}
                          className="group px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 border-0 hover:from-cyan-400 hover:to-blue-500 flex items-center gap-2"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            ></path>
                          </svg>
                          <span className="text-sm">
                            Giống địa chỉ thường trú
                          </span>
                        </motion.button>
                      </div>
                      <AddressFields
                        prefix="contactAddress"
                        values={newCustomer.contactAddress}
                        onChange={handleNewCustomerChange}
                        errors={errors}
                        required
                        onBlur={handleFieldBlur}
                      />
                    </div>
                  </motion.div>
                </form>
              </div>

              {/* Fixed Footer */}
              <div className="p-6 border-t-2 border-gray-100 flex justify-end space-x-4 sticky bottom-0 bg-white rounded-b-2xl z-10">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key="add-customer-buttons"
                    className="flex space-x-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleAddCustomerModal}
                      className="px-4 md:px-6 py-3 bg-gray-300 font-semibold text-gray-600 rounded-xl hover:bg-gray-400 transition-all duration-300"
                    >
                      Hủy bỏ
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={addNewCustomer}
                      className="px-4 md:px-6 py-3 font-medium bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center"
                    >
                      <Plus size={16} className="mr-2 font-medium" />
                      Thêm khách hàng
                    </motion.button>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation modal for swipe actions */}
      <SwipeConfirmationModal
        isOpen={confirmationModal.isOpen}
        onClose={closeConfirmationModal}
        onConfirm={confirmationModal.onConfirm}
        title={confirmationModal.title}
        description={confirmationModal.description}
        confirmText={confirmationModal.confirmText}
        confirmDetails={confirmationModal.confirmDetails}
        isProcessing={confirmationModal.isProcessing}
        type={confirmationModal.type}
      />

      {/* Export Success Notification */}
      <ExportNotification
        isVisible={exportNotification.visible}
        format={exportNotification.format}
        onClose={() =>
          setExportNotification((prev) => ({ ...prev, visible: false }))
        }
        message={exportNotification.message}
        type={exportNotification.type}
        autoHideDuration={5000}
        position="center"
      />

      {/* Export Data Modal */}
      <ExportDataModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        data={exportData}
        onExport={handleExportData}
        title="Xuất dữ liệu khách hàng"
        initialSelectedColumns={[
          "code",
          "fullName",
          "birthDate",
          "age",
          "idNumber",
          "email",
          "phone",
          "permanentAddress",
          "contactAddress",
          "registrationDate",
          "status",
        ]}
        columnLabels={{
          code: "Mã khách hàng",
          fullName: "Họ và tên",
          birthDate: "Ngày sinh",
          age: "Tuổi",
          idNumber: "Số CCCD/CMND",
          email: "Email",
          phone: "Số điện thoại",
          permanentAddress: "Địa chỉ thường trú",
          contactAddress: "Địa chỉ liên lạc",
          registrationDate: "Ngày đăng ký",
          status: "Trạng thái",
        }}
        formatData={(value, column) => {
          if (column === "status")
            return value === "active" ? "Hoạt động" : "Vô hiệu hóa";
          if (column === "permanentAddress" || column === "contactAddress") {
            if (!value) return "";
            return `${value.houseNumber} ${value.street}, ${value.ward}, ${value.district}, ${value.province}`;
          }
          return value;
        }}
        customColumnCategories={{
          personal: ["code", "fullName", "birthDate", "age", "idNumber"],
          contact: ["email", "phone"],
          address: ["permanentAddress", "contactAddress"],
          other: ["registrationDate", "status"],
        }}
        enableGrouping={true}
      />
    </div>
  );
}