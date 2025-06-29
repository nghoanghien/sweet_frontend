import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, Search, Filter, Grid, List, Settings, CheckCircle, XCircle } from 'lucide-react';
import AccountCard from '../ui/AccountCard';
import AccountListItem from './AccountListItem';
import AccountFormModal from './AccountFormModal';
import AccountDetailModal from './AccountDetailModal';
import ResetPasswordModal from './ResetPasswordModal';
import SwipeConfirmationModal from '@/components/modals/ConfirmationModal/SwipeConfirmationModal';
import ExportNotification from '@/components/common/ExportNotification';
import AccountCardShimmer from '@/components/ui/custom/shimmer-types/AccountCardShimmer';
import AccountListItemShimmer from '@/components/ui/custom/shimmer-types/AccountListItemShimmer';
import FilterDropdown from '@/components/ui/FilterDropdown';
import { useLoginAccounts } from '@/hooks/useLoginAccounts';
import { useDeactivateCustomer, useActivateCustomer, useUpdateCustomer } from '@/hooks/useCustomers';
import { useDeactivateEmployee, useActivateEmployee, useUpdateEmployee } from '@/hooks/useEmployees';

const AccountManagement = () => {
  // Sử dụng hook để lấy dữ liệu tài khoản
  const { accounts, isLoading, error } = useLoginAccounts();
  
  // Hooks cho vô hiệu hóa/kích hoạt khách hàng
  const { 
    deactivateCustomer, 
    isLoading: isDeactivatingCustomer, 
    success: deactivateCustomerSuccess,
    error: deactivateCustomerError,
    resetState: resetDeactivateCustomerState 
  } = useDeactivateCustomer();
  
  const { 
    activateCustomer, 
    isLoading: isActivatingCustomer, 
    success: activateCustomerSuccess,
    error: activateCustomerError,
    resetState: resetActivateCustomerState 
  } = useActivateCustomer();
  
  // Hooks cho vô hiệu hóa/kích hoạt nhân viên
  const { 
    deactivateEmployee, 
    isLoading: isDeactivatingEmployee, 
    success: deactivateEmployeeSuccess,
    error: deactivateEmployeeError,
    resetState: resetDeactivateEmployeeState 
  } = useDeactivateEmployee();
  
  const { 
    activateEmployee, 
    isLoading: isActivatingEmployee, 
    success: activateEmployeeSuccess,
    error: activateEmployeeError,
    resetState: resetActivateEmployeeState 
  } = useActivateEmployee();
  
  // Hooks cho cập nhật khách hàng
  const { 
    updateCustomerData, 
    isLoading: isUpdatingCustomer, 
    success: updateCustomerSuccess,
    error: updateCustomerError,
    resetState: resetUpdateCustomerState 
  } = useUpdateCustomer();
  
  // Hooks cho cập nhật nhân viên
  const { 
    updateEmployeeData, 
    isLoading: isUpdatingEmployee, 
    success: updateEmployeeSuccess,
    error: updateEmployeeError,
    resetState: resetUpdateEmployeeState 
  } = useUpdateEmployee();
  
  // State cho pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [newlyLoadedItems, setNewlyLoadedItems] = useState(new Set());
  const observerRef = useRef();
  const ITEMS_PER_PAGE = 12;
  
  // State cho modal
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // State cho filter và view
  const [typeFilter, setTypeFilter] = useState('all');
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState(''); // Input tìm kiếm riêng biệt
  const [isSearching, setIsSearching] = useState(false); // Loading state cho tìm kiếm/lọc
  const [viewMode, setViewMode] = useState('grid'); // 'grid' hoặc 'list'

  // State cho modal xác nhận
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    description: '',
    type: 'warning',
    confirmDetails: null,
    onConfirm: () => {},
    isProcessing: false,
  });

  // State cho thông báo
  const [notification, setNotification] = useState({
    isVisible: false,
    message: '',
    type: 'success',
    format: '',
  });
  
  // Tính toán trạng thái loading tổng thể cho các thao tác vô hiệu hóa/kích hoạt/cập nhật
  const isToggleActionLoading = isDeactivatingCustomer || isActivatingCustomer || 
                               isDeactivatingEmployee || isActivatingEmployee ||
                               isUpdatingCustomer || isUpdatingEmployee;
  


  // State cho danh sách tài khoản hiển thị (sử dụng dữ liệu từ hook)
  const [accountsList, setAccountsList] = useState([]);
  
  // Cập nhật accountsList khi có dữ liệu từ hook
  useEffect(() => {
    if (accounts && accounts.length > 0) {
      // Chỉ hiển thị ITEMS_PER_PAGE đầu tiên để tạo hiệu ứng phân trang
      const initialAccounts = accounts.slice(0, ITEMS_PER_PAGE);
      setAccountsList(initialAccounts);
      setHasMoreData(accounts.length > ITEMS_PER_PAGE);
    } else {
      setAccountsList([]);
      setHasMoreData(false);
    }
  }, [accounts]);

  // Mock data cho danh sách vai trò
  const rolesList = [
    // Vai trò khách hàng
    {
      id: 'role1',
      name: 'Không có quyền',
      type: 'customer',
      description: 'Tài khoản không có quyền thực hiện bất kỳ thao tác nào'
    },
    {
      id: 'role2',
      name: 'Vai trò thanh toán',
      type: 'customer',
      description: 'Chỉ có quyền thực hiện các giao dịch thanh toán'
    },
    {
      id: 'role3',
      name: 'Vai trò tiết kiệm',
      type: 'customer',
      description: 'Có quyền thanh toán và sử dụng các tính năng tiết kiệm'
    },
    
    // Vai trò nhân viên
    {
      id: 'role4',
      name: 'Quản trị viên',
      type: 'staff',
      description: 'Có toàn quyền trong hệ thống'
    },
    {
      id: 'role5',
      name: 'Nhân viên giao dịch',
      type: 'staff',
      description: 'Xử lý các giao dịch của khách hàng'
    },
    {
      id: 'role6',
      name: 'Nhân viên tiếp thị',
      type: 'staff',
      description: 'Quản lý các sản phẩm và báo cáo'
    }
  ];



  // Hàm load thêm dữ liệu (phân trang giả)
  const loadMoreData = useCallback(() => {
    if (isLoadingMore || !hasMoreData) return;
    
    setIsLoadingMore(true);
    
    // Giả lập thời gian load dữ liệu
    setTimeout(() => {
      // Tính toán dữ liệu đã được filter
      const filteredData = accounts.filter(account => {
        // Lọc theo loại tài khoản
        if (typeFilter !== 'all') {
          if (typeFilter === 'customer' && !account.customerID) {
            return false;
          }
          if (typeFilter === 'staff' && !account.employeeID) {
            return false;
          }
        }
        
        // Lọc theo trạng thái
        if (statusFilter !== 'all') {
          if (statusFilter === 'active' && account.accountStatus !== 'active') {
            return false;
          }
          if (statusFilter === 'disabled' && account.accountStatus !== 'disabled') {
            return false;
          }
        }
        
        // Lọc theo search term
        if (searchTerm && !account.fullName.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !account.email.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !account.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !account.idCardNumber.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false;
        }
        
        return true;
      });
      
      const currentLength = accountsList.length;
      const nextItems = filteredData.slice(currentLength, currentLength + ITEMS_PER_PAGE);
      
      if (nextItems.length > 0) {
        setAccountsList(prev => [...prev, ...nextItems]);
        
        // Đánh dấu các item mới được load
        const newItemIds = new Set(nextItems.map(item => item.id));
        setNewlyLoadedItems(newItemIds);
        
        // Xóa đánh dấu sau 2 giây
        setTimeout(() => {
          setNewlyLoadedItems(new Set());
        }, 2000);
      }
      
      // Kiểm tra xem còn dữ liệu để load không
      setHasMoreData(currentLength + nextItems.length < filteredData.length);
      setIsLoadingMore(false);
    }, 1500);
  }, [isLoadingMore, hasMoreData, accountsList.length, accounts, typeFilter, statusFilter, searchTerm]);

  // Intersection Observer để phát hiện khi scroll đến cuối
  const lastAccountElementRef = useCallback(node => {
    if (isLoadingMore) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMoreData) {
        loadMoreData();
      }
    });
    if (node) observerRef.current.observe(node);
  }, [isLoadingMore, hasMoreData, loadMoreData]);

  // Hàm hiển thị modal xác nhận
  const showConfirmModal = (title, description, type, details, onConfirm) => {
    setConfirmModal({
      isOpen: true,
      title,
      description,
      type,
      confirmDetails: details,
      onConfirm,
      isProcessing: false,
    });
  };
  
  // Hàm đóng modal xác nhận
  const closeConfirmModal = () => {
    setConfirmModal(prev => ({ ...prev, isOpen: false }));
  };

  // Hàm hiển thị thông báo
  const showNotification = (message, type = 'success', format = '') => {
    setNotification({
      isVisible: true,
      message,
      type,
      format,
    });
  };

  // Hàm đóng thông báo
  const closeNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  // accountsList đã được filter trong các useEffect, không cần filter lại

  // Hàm xử lý tìm kiếm
  const handleSearch = () => {
    if (searchInput.trim() === searchTerm.trim()) return;
    
    setIsSearching(true);
    
    // Giả lập thời gian tìm kiếm
    setTimeout(() => {
      const newSearchTerm = searchInput.trim();
      setSearchTerm(newSearchTerm);
      setCurrentPage(1);
      setNewlyLoadedItems(new Set());
      setIsLoadingMore(false); // Reset loading shimmer
      
      // Tính toán dữ liệu sau khi filter để xác định hasMoreData
        const filteredData = accounts.filter(account => {
        // Lọc theo loại tài khoản
        if (typeFilter !== 'all') {
          if (typeFilter === 'customer' && !account.customerID) {
            return false;
          }
          if (typeFilter === 'staff' && !account.employeeID) {
            return false;
          }
        }
        
        // Lọc theo trạng thái
        if (statusFilter !== 'all') {
          if (statusFilter === 'active' && account.accountStatus !== 'active') {
            return false;
          }
          if (statusFilter === 'disabled' && account.accountStatus !== 'disabled') {
            return false;
          }
        }
        
        // Lọc theo search term
        if (newSearchTerm && !account.fullName.toLowerCase().includes(newSearchTerm.toLowerCase()) &&
            !account.email.toLowerCase().includes(newSearchTerm.toLowerCase()) &&
            !account.phoneNumber.toLowerCase().includes(newSearchTerm.toLowerCase()) &&
            !account.idCardNumber.toLowerCase().includes(newSearchTerm.toLowerCase())) {
          return false;
        }
        
        return true;
      });
      
      // Chỉ set hasMoreData = true nếu có nhiều hơn ITEMS_PER_PAGE accounts
      setHasMoreData(filteredData.length > ITEMS_PER_PAGE);
      
      // Reset về dữ liệu ban đầu khi tìm kiếm
      const initialAccounts = filteredData.slice(0, ITEMS_PER_PAGE);
      setAccountsList(initialAccounts);
      setIsSearching(false);
    }, 1500);
  };

  // Hàm xử lý xóa tìm kiếm
  const handleClearSearch = () => {
    setSearchInput('');
    if (searchTerm !== '') {
      setIsSearching(true);
      
      // Giả lập thời gian khôi phục dữ liệu
      setTimeout(() => {
        setSearchTerm('');
        setCurrentPage(1);
        setNewlyLoadedItems(new Set());
        setIsLoadingMore(false); // Reset loading shimmer
        
        // Tính toán dữ liệu sau khi filter để xác định hasMoreData (không có search term)
        const filteredData = accounts.filter(account => {
          // Lọc theo loại tài khoản
          if (typeFilter !== 'all') {
            if (typeFilter === 'customer' && !account.customerID) {
              return false;
            }
            if (typeFilter === 'staff' && !account.employeeID) {
              return false;
            }
          }
          
          // Lọc theo trạng thái
          if (statusFilter !== 'all') {
            if (statusFilter === 'active' && account.accountStatus !== 'active') {
              return false;
            }
            if (statusFilter === 'disabled' && account.accountStatus !== 'disabled') {
              return false;
            }
          }
          
          return true;
        });
        
        // Chỉ set hasMoreData = true nếu có nhiều hơn ITEMS_PER_PAGE accounts
        setHasMoreData(filteredData.length > ITEMS_PER_PAGE);
        
        // Reset về dữ liệu ban đầu
        const initialAccounts = filteredData.slice(0, ITEMS_PER_PAGE);
        setAccountsList(initialAccounts);
        setIsSearching(false);
      }, 1500);
    }
  };

  // Hàm xử lý khi nhấn Enter trong ô tìm kiếm
  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Reset pagination khi filter thay đổi
   useEffect(() => {
     // Không chạy nếu accounts chưa được load hoặc đang tìm kiếm
     if (!accounts || accounts.length === 0 || isSearching) return;
     
     setIsSearching(true);
     
     // Giả lập thời gian lọc
     setTimeout(() => {
       setCurrentPage(1);
       setNewlyLoadedItems(new Set());
       setIsLoadingMore(false); // Reset loading shimmer
       
       // Tính toán dữ liệu sau khi filter để xác định hasMoreData
        const filteredData = accounts.filter(account => {
          // Lọc theo loại tài khoản
          if (typeFilter !== 'all') {
            if (typeFilter === 'customer' && !account.customerID) {
              return false;
            }
            if (typeFilter === 'staff' && !account.employeeID) {
              return false;
            }
          }
          
          // Lọc theo trạng thái
          if (statusFilter !== 'all') {
            if (statusFilter === 'active' && account.accountStatus !== 'active') {
              return false;
            }
            if (statusFilter === 'disabled' && account.accountStatus !== 'disabled') {
              return false;
            }
          }
          
          // Lọc theo search term
          if (searchTerm && !account.fullName.toLowerCase().includes(searchTerm.toLowerCase()) &&
              !account.email.toLowerCase().includes(searchTerm.toLowerCase()) &&
              !account.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) &&
              !account.idCardNumber.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
          }
          
          return true;
        });
        
        // Chỉ set hasMoreData = true nếu có nhiều hơn ITEMS_PER_PAGE accounts
        setHasMoreData(filteredData.length > ITEMS_PER_PAGE);
        
        // Reset về dữ liệu ban đầu khi filter thay đổi
        const initialAccounts = filteredData.slice(0, ITEMS_PER_PAGE);
        setAccountsList(initialAccounts);
       setIsSearching(false);
     }, 1500);
   }, [typeFilter, statusFilter]);



  // Xử lý khi click vào nút sửa tài khoản
  const handleEditAccount = (accountId, accountType) => {
    // Tìm account dựa trên loại tài khoản và ID tương ứng
    const account = accountsList.find(a => {
      if (accountType === 'employee') {
        return a.employeeID === accountId;
      } else if (accountType === 'customer') {
        return a.customerID === accountId;
      }
      return false;
    });
    if (account) {
      setSelectedAccount(account);
      setIsEditing(true);
      setShowFormModal(true);
    }
  };

  // Xử lý khi click vào nút xem chi tiết tài khoản
  const handleViewAccount = (accountId, accountType) => {
    // Tìm account dựa trên loại tài khoản và ID tương ứng
    const account = accountsList.find(a => {
      if (accountType === 'employee') {
        return a.employeeID === accountId;
      } else if (accountType === 'customer') {
        return a.customerID === accountId;
      }
      return false;
    });
    if (account) {
      setSelectedAccount(account);
      setShowDetailModal(true);
    }
  };

  // Xử lý khi click vào nút đặt lại mật khẩu
  const handleResetPassword = (accountId, accountType) => {
    // Tìm account dựa trên loại tài khoản và ID tương ứng
    const account = accountsList.find(a => {
      if (accountType === 'employee') {
        return a.employeeID === accountId;
      } else if (accountType === 'customer') {
        return a.customerID === accountId;
      }
      return false;
    });
    if (account) {
      setSelectedAccount(account);
      setShowResetPasswordModal(true);
    }
  };

  // Xử lý khi click vào nút vô hiệu hóa/kích hoạt tài khoản
  const handleToggleDisable = (accountId, accountType) => {
    // Tìm account dựa trên loại tài khoản và ID tương ứng
    const account = accountsList.find(a => {
      if (accountType === 'employee') {
        return a.employeeID === accountId;
      } else if (accountType === 'customer') {
        return a.customerID === accountId;
      }
      return false;
    });
    if (!account) return;
    
    const newStatus = account.accountStatus !== 'disabled';
    const actionText = newStatus ? 'vô hiệu hóa' : 'kích hoạt';
    
    // Hiển thị modal xác nhận
    const confirmDetails = {
      'Tên người dùng': account.fullName,
      'Email': account.email,
      'Loại tài khoản': account.customerID ? 'Khách hàng' : 'Nhân viên',
      'Vai trò': account.role ? account.role.roleName : '',
      'Trạng thái hiện tại': account.accountStatus === 'disabled' ? 'Vô hiệu hóa' : 'Hoạt động',
      'Trạng thái mới': newStatus ? 'Vô hiệu hóa' : 'Hoạt động'
    };
    
    showConfirmModal(
      `${actionText.charAt(0).toUpperCase() + actionText.slice(1)} tài khoản`,
      `Xác nhận ${actionText} tài khoản "${account.email}"?`,
      newStatus ? 'danger' : 'success',
      confirmDetails,
      async () => {
        try {
          let response;
          
          // Gọi API tương ứng dựa trên loại tài khoản và hành động
          if (accountType === 'customer') {
            if (newStatus) {
              // Vô hiệu hóa khách hàng
              response = await deactivateCustomer(account.customerID.toString());
            } else {
              // Kích hoạt khách hàng
              response = await activateCustomer(account.customerID.toString());
            }
          } else if (accountType === 'employee') {
            if (newStatus) {
              // Vô hiệu hóa nhân viên
              response = await deactivateEmployee(account.employeeID.toString());
            } else {
              // Kích hoạt nhân viên
              response = await activateEmployee(account.employeeID.toString());
            }
          }
          
          // Cập nhật trạng thái tài khoản trong danh sách
          setAccountsList(accountsList.map(a => {
            if ((accountType === 'employee' && a.employeeID === accountId) || 
                (accountType === 'customer' && a.customerID === accountId)) {
              return { ...a, accountStatus: newStatus ? 'disabled' : 'active' };
            }
            return a;
          }));
          
          // Hiển thị thông báo thành công
          showNotification(
            `Đã ${actionText} tài khoản thành công!`,
            'success',
            `Tài khoản "${account.email}" đã ${actionText} thành công!`
          );
          
          // Reset state của hooks
          if (accountType === 'customer') {
            if (newStatus) {
              resetDeactivateCustomerState();
            } else {
              resetActivateCustomerState();
            }
          } else {
            if (newStatus) {
              resetDeactivateEmployeeState();
            } else {
              resetActivateEmployeeState();
            }
          }
          
          // Đóng modal xác nhận
          closeConfirmModal();
          
        } catch (error) {
          console.error(`Lỗi khi ${actionText} tài khoản:`, error);
          
          // Hiển thị thông báo lỗi
          showNotification(
            `Lỗi khi ${actionText} tài khoản!`,
            'error',
            `Không thể ${actionText} tài khoản "${account.email}". Vui lòng thử lại.`
          );
          
          // Đóng modal xác nhận ngay cả khi có lỗi
          closeConfirmModal();
        }
      }
    );
  };

  // Xử lý khi lưu tài khoản (thêm hoặc sửa)
  const handleSaveAccount = async (formData, notificationInfo, originalAccount) => {
    try {
      // Tạo đối tượng User từ formData và originalAccount
      const updatedUser = {
        ...originalAccount,
        role: formData.role,
      };
      
      // Xác định loại tài khoản và gọi API tương ứng
      if (originalAccount.customerID) {
        // Cập nhật khách hàng
        await updateCustomerData(updatedUser, parseInt(originalAccount.customerID));
        
        // Cập nhật danh sách tài khoản local
        setAccountsList(accountsList.map(a => 
          a.customerID === originalAccount.customerID 
            ? { ...a, role: formData.role, accountStatus: formData.disabled ? 'disabled' : 'active' }
            : a
        ));
      } else if (originalAccount.employeeID) {
        // Cập nhật nhân viên
        await updateEmployeeData(updatedUser, parseInt(originalAccount.employeeID));
        
        // Cập nhật danh sách tài khoản local
        setAccountsList(accountsList.map(a => 
          a.employeeID === originalAccount.employeeID 
            ? { ...a, role: formData.role, accountStatus: formData.disabled ? 'disabled' : 'active' }
            : a
        ));
      }
      
      setShowFormModal(false);
      
      // Hiển thị thông báo thành công
      showNotification(
        'Cập nhật tài khoản thành công!',
        'success',
        `Đã cập nhật tài khoản "${originalAccount.email}" thành công!`
      );
      
    } catch (error) {
      console.error('Lỗi khi cập nhật tài khoản:', error);
      
      // Hiển thị thông báo lỗi
      showNotification(
        'Cập nhật tài khoản thất bại!',
        'error',
        `Không thể cập nhật tài khoản "${originalAccount.email}". Vui lòng thử lại.`
      );
    }
   };

  // Xử lý khi xác nhận đặt lại mật khẩu
  const handleConfirmResetPassword = (password, notificationInfo) => {
    // Trong thực tế, đây là nơi gọi API để đặt lại mật khẩu
    console.log(`Đặt lại mật khẩu cho tài khoản ${selectedAccount.email}: ${password}`);
    setShowResetPasswordModal(false);
    
    // Hiển thị thông báo nếu có
    if (notificationInfo) {
      showNotification(
        notificationInfo.message,
        notificationInfo.type,
        notificationInfo.format || ''
      );
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <motion.h3
            className="text-2xl font-bold text-blue-700 flex items-center gap-2 drop-shadow"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Users size={28} className="text-blue-500 mr-2 drop-shadow-lg" />
            Quản lý tài khoản
          </motion.h3>
          <motion.p
            className="text-sm text-gray-500 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Tạo và quản lý các tài khoản trong hệ thống
          </motion.p>
        </div>
      </div>

      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 flex-grow">
          <motion.div
            className="relative flex-grow"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="relative">
              {/* Icon xóa tìm kiếm bên trái */}
              <button
                onClick={handleClearSearch}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors duration-200 z-10"
                disabled={isSearching}
                title="Xóa tìm kiếm"
              >
                {searchInput ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <Search size={20} />
                )}
              </button>
              
              <input
                type="text"
                placeholder="Tìm kiếm tài khoản..."
                className="pl-12 pr-20 py-3 border-2 border-indigo-100 rounded-2xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 text-base bg-white/80 shadow-inner transition-all duration-200 font-medium text-blue-800 placeholder-indigo-300"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleSearchKeyPress}
                disabled={isSearching}
              />
              
              {/* Nút tìm kiếm bên phải */}
              <button
                onClick={handleSearch}
                disabled={isSearching || searchInput.trim() === searchTerm.trim()}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium transition-all duration-200 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 shadow-md hover:shadow-lg text-sm"
              >
                {isSearching ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Search size={16} />
                )}
                <span className="hidden sm:inline">{isSearching ? 'Tìm...' : 'Tìm'}</span>
              </button>
            </div>
          </motion.div>

          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {/* Account Type Dropdown */}
            <FilterDropdown
              isOpen={showTypeDropdown}
              onToggle={setShowTypeDropdown}
              selectedValue={typeFilter}
              placeholder="Tất cả loại"
              icon={Filter}
              buttonClassName={typeFilter !== 'all' ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-[0_4px_20px_rgba(0,170,255,0.13)]" : "bg-gray-100 text-gray-600 hover:bg-blue-50 border border-blue-100"}
              dropdownClassName="backdrop-blur-md bg-black/5"
              options={[
                {
                  value: 'all',
                  label: 'Tất cả loại',
                  icon: Filter,
                  onClick: (value) => setTypeFilter(value)
                },
                {
                  value: 'customer',
                  label: 'Khách hàng',
                  icon: Users,
                  onClick: (value) => setTypeFilter(value)
                },
                {
                  value: 'staff',
                  label: 'Nhân viên',
                  icon: Settings,
                  onClick: (value) => setTypeFilter(value)
                }
              ]}
            />

            {/* Status Dropdown */}
            <FilterDropdown
                 isOpen={showStatusDropdown}
                 onToggle={setShowStatusDropdown}
                 selectedValue={statusFilter}
                 placeholder="Tất cả TT"
                 icon={Settings}
                 buttonClassName={
                   statusFilter === 'disabled' 
                     ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-[0_4px_20px_rgba(239,68,68,0.13)]" 
                     : statusFilter !== 'all' 
                       ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-[0_4px_20px_rgba(0,200,100,0.13)]" 
                       : "bg-gray-100 text-gray-600 hover:bg-emerald-50 border border-emerald-100"
                 }
                 dropdownClassName="backdrop-blur-md bg-black/5"
                 optionClassName="hover:bg-emerald-50/40 emerald-theme"
               getOptionIcon={(option) => {
                 if (option.value === 'all') return Settings;
                 if (option.value === 'active') return CheckCircle;
                 if (option.value === 'disabled') return XCircle;
                 return Settings;
               }}
               options={[
                 {
                   value: 'all',
                   label: 'Tất cả TT',
                   onClick: (value) => setStatusFilter(value)
                 },
                 {
                   value: 'active',
                   label: 'Hoạt động',
                   onClick: (value) => setStatusFilter(value)
                 },
                 {
                   value: 'disabled',
                   label: 'Vô hiệu hóa',
                   onClick: (value) => setStatusFilter(value)
                 }
               ]}
             />
          </motion.div>
        </div>

        {/* View mode toggle */}
        <motion.div
          className="flex gap-1 bg-gray-100 p-1 rounded-xl shadow-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-xl font-semibold text-base transition-all
              ${
                viewMode === "grid"
                  ? "bg-white text-blue-600 shadow-md"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
          >
            <Grid size={20} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-xl font-semibold text-base transition-all
              ${
                viewMode === "list"
                  ? "bg-white text-blue-600 shadow-md"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
          >
            <List size={20} />
          </button>
        </motion.div>
      </div>

      {/* Account list */}
      {isLoading || isSearching ? (
        <div>
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-blue-500 font-medium">
              {isLoading ? 'Đang tải danh sách tài khoản...' : 
               isSearching ? 'Đang tìm kiếm và lọc dữ liệu...' : ''}
            </p>
          </motion.div>
          <AccountCardShimmer cardCount={9} />
        </div>
      ) : viewMode === "grid" ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accountsList.map((account, index) => {
               const isLast = accountsList.length === index + 1;
               const isNewlyLoaded = newlyLoadedItems.has(account.id);
               const pageIndex = index % ITEMS_PER_PAGE;
               const newItemIndex = isNewlyLoaded ? Array.from(newlyLoadedItems).indexOf(account.id) : 0;
               
               return (
                 <motion.div
                   key={account.id}
                   ref={isLast ? lastAccountElementRef : null}
                   initial={{ opacity: 0, y: 24, scale: 0.98 }}
                   animate={{ opacity: 1, y: 0, scale: 1 }}
                   whileHover={{
                     scale: 1.03,
                     boxShadow: "0 0 30px rgba(0,170,255,0.10)",
                   }}
                   transition={{ 
                     delay: isNewlyLoaded ? newItemIndex * 0.08 : pageIndex * 0.05, 
                     duration: 0.4 
                   }}
                 >
                   <AccountCard
                     account={account}
                     onView={handleViewAccount}
                     onEdit={handleEditAccount}
                     onDisable={handleToggleDisable}
                     onResetPassword={handleResetPassword}
                   />
                 </motion.div>
               );
             })}

            {accountsList.length === 0 && (
              <motion.div
                className="text-center py-10 text-blue-400 col-span-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p>Không tìm thấy tài khoản nào phù hợp</p>
              </motion.div>
            )}
          </div>
          
          {/* Loading shimmer khi đang load thêm dữ liệu */}
          {isLoadingMore && (
            <motion.div
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <AccountCardShimmer cardCount={9} />
            </motion.div>
          )}

        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
          <div className="overflow-x-auto overflow-y-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tài khoản
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Loại
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Vai trò
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    SĐT
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Trạng thái
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {accountsList.map((account, index) => {
                  const isLast = accountsList.length === index + 1;
                  const pageIndex = index % ITEMS_PER_PAGE;
                  return (
                    <AccountListItem
                      key={account.id}
                      ref={isLast ? lastAccountElementRef : null}
                      account={account}
                      onView={handleViewAccount}
                      onEdit={handleEditAccount}
                      onDisable={handleToggleDisable}
                      onResetPassword={handleResetPassword}
                      delay={pageIndex * 0.05}
                    />
                  );
                })}

                {/* Loading shimmer khi đang load thêm dữ liệu trong list view */}
                {isLoadingMore && (
                  <>
                    {Array.from({ length: 8 }, (_, index) => (
                      <AccountListItemShimmer key={`shimmer-${index}`} delay={index * 0.05} />
                    ))}
                  </>
                )}

                {accountsList.length === 0 && !isLoadingMore && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      Không tìm thấy tài khoản nào phù hợp
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Thông báo khi đã hiển thị hết dữ liệu - hiển thị bên ngoài bảng */}
      {!hasMoreData && accountsList.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center mt-8 mb-6 text-gray-500"
        >
          <svg className="w-8 h-8 text-blue-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm font-medium text-gray-600">Đã hiển thị tất cả dữ liệu</p>
          <p className="text-xs text-gray-400 mt-1">Tổng cộng {accountsList.length} tài khoản</p>
        </motion.div>
      )}

      {/* Account form modal */}
      {/* Account detail modal */}
      <AccountDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        account={selectedAccount}
      />

      {/* Reset password modal */}
      <ResetPasswordModal
        isOpen={showResetPasswordModal}
        onClose={() => setShowResetPasswordModal(false)}
        onConfirm={handleConfirmResetPassword}
        account={selectedAccount}
      />

      {/* SwipeConfirmationModal */}
      <SwipeConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={closeConfirmModal}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        description={confirmModal.description}
        type={confirmModal.type}
        confirmDetails={confirmModal.confirmDetails}
        isProcessing={confirmModal.isProcessing || isToggleActionLoading}
      />

      {/* ExportNotification */}
      <ExportNotification
        isVisible={notification.isVisible}
        onClose={closeNotification}
        message={notification.message}
        type={notification.type}
        format={notification.format}
        autoHideDuration={5000}
      />

      <AccountFormModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSave={handleSaveAccount}
        account={selectedAccount}
        accountList={accountsList}
        isEditing={isEditing}
        rolesList={rolesList}
      />

      <ResetPasswordModal
        isOpen={showResetPasswordModal}
        onClose={() => setShowResetPasswordModal(false)}
        onConfirm={handleConfirmResetPassword}
        account={selectedAccount}
      />
    </div>
  );
};

export default AccountManagement;