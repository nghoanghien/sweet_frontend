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

const AccountManagement = () => {
  // State cho loading
  const [isLoading, setIsLoading] = useState(true);
  
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
  
  // Mock data cho tất cả tài khoản (mở rộng để có đủ 15+ tài khoản)
  const allAccountsData = [
    // Tài khoản khách hàng
    {
      id: 'acc1',
      name: 'Nguyễn Văn A',
      username: 'nguyenvana',
      email: 'nguyenvana@gmail.com',
      phone: '0909090901',
      CCCD: '1234567891',
      type: 'customer',
      role: {
        id: 'role3',
        name: 'Vai trò tiết kiệm'
      },
      disabled: false
    },
    {
      id: 'acc2',
      name: 'Trần Thị B',
      username: 'tranthib',
      email: 'tranthib@gmail.com',
      phone: '0909090902',
      CCCD: '1234567892',
      type: 'customer',
      role: {
        id: 'role2',
        name: 'Vai trò thanh toán'
      },
      disabled: false
    },
    {
      id: 'acc3',
      name: 'Lê Văn C',
      username: 'levanc',
      email: 'levanc@gmail.com',
      phone: '0909090903',
      CCCD: '1234567893',
      type: 'customer',
      role: {
        id: 'role3',
        name: 'Vai trò tiết kiệm'
      },
      disabled: true
    },
    {
      id: 'acc4',
      name: 'Phạm Thị D',
      username: 'phamthid',
      email: 'phamthid@gmail.com',
      phone: '0909090904',
      CCCD: '1234567894',
      type: 'customer',
      role: {
        id: 'role1',
        name: 'Không có quyền'
      },
      disabled: true
    },
    
    // Tài khoản nhân viên
    {
      id: 'acc5',
      name: 'Hoàng Văn E',
      username: 'hoangvane',
      email: 'hoangvane@gmail.com',
      phone: '0909090905',
      CCCD: '1234567895',
      type: 'staff',
      role: {
        id: 'role4',
        name: 'Quản trị viên'
      },
      disabled: false
    },
    {
      id: 'acc6',
      name: 'Ngô Thị F',
      username: 'ngothif',
      email: 'ngothif@gmail.com',
      phone: '0909090906',
      CCCD: '1234567896',
      type: 'staff',
      role: {
        id: 'role5',
        name: 'Nhân viên giao dịch'
      },
      disabled: false
    },
    {
      id: 'acc7',
      name: 'Đỗ Văn G',
      username: 'dovang',
      email: 'dovang@gmail.com',
      phone: '0909090907',
      CCCD: '1234567897',
      type: 'staff',
      role: {
        id: 'role6',
        name: 'Nhân viên tiếp thị'
      },
      disabled: false
    },
    {
      id: 'acc8',
      name: 'Vũ Thị H',
      username: 'vuthih',
      email: 'vuthih@gmail.com',
      phone: '0909090908',
      CCCD: '1234567898',
      type: 'staff',
      role: {
        id: 'role5',
        name: 'Nhân viên giao dịch'
      },
      disabled: true
    },
    // Thêm 7 tài khoản nữa để có đủ 15 tài khoản
    {
      id: 'acc9',
      name: 'Bùi Văn I',
      username: 'buivani',
      email: 'buivani@gmail.com',
      phone: '0909090909',
      CCCD: '1234567899',
      type: 'customer',
      role: {
        id: 'role2',
        name: 'Vai trò thanh toán'
      },
      disabled: false
    },
    {
      id: 'acc10',
      name: 'Đinh Thị K',
      username: 'dinhthik',
      email: 'dinhthik@gmail.com',
      phone: '0909090910',
      CCCD: '1234567810',
      type: 'customer',
      role: {
        id: 'role3',
        name: 'Vai trò tiết kiệm'
      },
      disabled: false
    },
    {
      id: 'acc11',
      name: 'Cao Văn L',
      username: 'caovanl',
      email: 'caovanl@gmail.com',
      phone: '0909090911',
      CCCD: '1234567811',
      type: 'staff',
      role: {
        id: 'role5',
        name: 'Nhân viên giao dịch'
      },
      disabled: false
    },
    {
      id: 'acc12',
      name: 'Lý Thị M',
      username: 'lythim',
      email: 'lythim@gmail.com',
      phone: '0909090912',
      CCCD: '1234567812',
      type: 'customer',
      role: {
        id: 'role1',
        name: 'Không có quyền'
      },
      disabled: true
    },
    {
      id: 'acc13',
      name: 'Tô Văn N',
      username: 'tovann',
      email: 'tovann@gmail.com',
      phone: '0909090913',
      CCCD: '1234567813',
      type: 'staff',
      role: {
        id: 'role6',
        name: 'Nhân viên tiếp thị'
      },
      disabled: false
    },
    {
      id: 'acc14',
      name: 'Hồ Thị O',
      username: 'hothio',
      email: 'hothio@gmail.com',
      phone: '0909090914',
      CCCD: '1234567814',
      type: 'customer',
      role: {
        id: 'role2',
        name: 'Vai trò thanh toán'
      },
      disabled: false
    },
    {
      id: 'acc15',
      name: 'Dương Văn P',
      username: 'duongvanp',
      email: 'duongvanp@gmail.com',
      phone: '0909090915',
      CCCD: '1234567815',
      type: 'staff',
      role: {
        id: 'role4',
        name: 'Quản trị viên'
      },
      disabled: false
    },
    // Thêm 25 tài khoản nữa để test infinite scroll
    {
      id: 'acc16',
      name: 'Nguyễn Thị Q',
      username: 'nguyenthiq',
      email: 'nguyenthiq@gmail.com',
      phone: '0909090916',
      CCCD: '1234567816',
      type: 'customer',
      role: {
        id: 'role2',
        name: 'Vai trò thanh toán'
      },
      disabled: false
    },
    {
      id: 'acc17',
      name: 'Trần Văn R',
      username: 'tranvanr',
      email: 'tranvanr@gmail.com',
      phone: '0909090917',
      CCCD: '1234567817',
      type: 'staff',
      role: {
        id: 'role5',
        name: 'Nhân viên giao dịch'
      },
      disabled: false
    },
    {
      id: 'acc18',
      name: 'Lê Thị S',
      username: 'lethis',
      email: 'lethis@gmail.com',
      phone: '0909090918',
      CCCD: '1234567818',
      type: 'customer',
      role: {
        id: 'role3',
        name: 'Vai trò tiết kiệm'
      },
      disabled: true
    },
    {
      id: 'acc19',
      name: 'Phạm Văn T',
      username: 'phamvant',
      email: 'phamvant@gmail.com',
      phone: '0909090919',
      CCCD: '1234567819',
      type: 'staff',
      role: {
        id: 'role6',
        name: 'Nhân viên tiếp thị'
      },
      disabled: false
    },
    {
      id: 'acc20',
      name: 'Hoàng Thị U',
      username: 'hoangthiu',
      email: 'hoangthiu@gmail.com',
      phone: '0909090920',
      CCCD: '1234567820',
      type: 'customer',
      role: {
        id: 'role1',
        name: 'Không có quyền'
      },
      disabled: false
    },
    {
      id: 'acc21',
      name: 'Ngô Văn V',
      username: 'ngovanv',
      email: 'ngovanv@gmail.com',
      phone: '0909090921',
      CCCD: '1234567821',
      type: 'staff',
      role: {
        id: 'role4',
        name: 'Quản trị viên'
      },
      disabled: false
    },
    {
      id: 'acc22',
      name: 'Đỗ Thị W',
      username: 'dothiw',
      email: 'dothiw@gmail.com',
      phone: '0909090922',
      CCCD: '1234567822',
      type: 'customer',
      role: {
        id: 'role2',
        name: 'Vai trò thanh toán'
      },
      disabled: false
    },
    {
      id: 'acc23',
      name: 'Vũ Văn X',
      username: 'vuvanx',
      email: 'vuvanx@gmail.com',
      phone: '0909090923',
      CCCD: '1234567823',
      type: 'staff',
      role: {
        id: 'role5',
        name: 'Nhân viên giao dịch'
      },
      disabled: true
    },
    {
      id: 'acc24',
      name: 'Bùi Thị Y',
      username: 'buithiy',
      email: 'buithiy@gmail.com',
      phone: '0909090924',
      CCCD: '1234567824',
      type: 'customer',
      role: {
        id: 'role3',
        name: 'Vai trò tiết kiệm'
      },
      disabled: false
    },
    {
      id: 'acc25',
      name: 'Đinh Văn Z',
      username: 'dinhvanz',
      email: 'dinhvanz@gmail.com',
      phone: '0909090925',
      CCCD: '1234567825',
      type: 'staff',
      role: {
        id: 'role6',
        name: 'Nhân viên tiếp thị'
      },
      disabled: false
    },
    {
      id: 'acc26',
      name: 'Cao Thị AA',
      username: 'caothiaa',
      email: 'caothiaa@gmail.com',
      phone: '0909090926',
      CCCD: '1234567826',
      type: 'customer',
      role: {
        id: 'role1',
        name: 'Không có quyền'
      },
      disabled: true
    },
    {
      id: 'acc27',
      name: 'Lý Văn BB',
      username: 'lyvanbb',
      email: 'lyvanbb@gmail.com',
      phone: '0909090927',
      CCCD: '1234567827',
      type: 'staff',
      role: {
        id: 'role4',
        name: 'Quản trị viên'
      },
      disabled: false
    },
    {
      id: 'acc28',
      name: 'Tô Thị CC',
      username: 'tothicc',
      email: 'tothicc@gmail.com',
      phone: '0909090928',
      CCCD: '1234567828',
      type: 'customer',
      role: {
        id: 'role2',
        name: 'Vai trò thanh toán'
      },
      disabled: false
    },
    {
      id: 'acc29',
      name: 'Hồ Văn DD',
      username: 'hovandd',
      email: 'hovandd@gmail.com',
      phone: '0909090929',
      CCCD: '1234567829',
      type: 'staff',
      role: {
        id: 'role5',
        name: 'Nhân viên giao dịch'
      },
      disabled: false
    },
    {
      id: 'acc30',
      name: 'Dương Thị EE',
      username: 'duongthiee',
      email: 'duongthiee@gmail.com',
      phone: '0909090930',
      CCCD: '1234567830',
      type: 'customer',
      role: {
        id: 'role3',
        name: 'Vai trò tiết kiệm'
      },
      disabled: false
    },
    {
      id: 'acc31',
      name: 'Nguyễn Văn FF',
      username: 'nguyenvanff',
      email: 'nguyenvanff@gmail.com',
      phone: '0909090931',
      CCCD: '1234567831',
      type: 'staff',
      role: {
        id: 'role6',
        name: 'Nhân viên tiếp thị'
      },
      disabled: true
    },
    {
      id: 'acc32',
      name: 'Trần Thị GG',
      username: 'tranthigg',
      email: 'tranthigg@gmail.com',
      phone: '0909090932',
      CCCD: '1234567832',
      type: 'customer',
      role: {
        id: 'role1',
        name: 'Không có quyền'
      },
      disabled: false
    },
    {
      id: 'acc33',
      name: 'Lê Văn HH',
      username: 'levanhh',
      email: 'levanhh@gmail.com',
      phone: '0909090933',
      CCCD: '1234567833',
      type: 'staff',
      role: {
        id: 'role4',
        name: 'Quản trị viên'
      },
      disabled: false
    },
    {
      id: 'acc34',
      name: 'Phạm Thị II',
      username: 'phamthiii',
      email: 'phamthiii@gmail.com',
      phone: '0909090934',
      CCCD: '1234567834',
      type: 'customer',
      role: {
        id: 'role2',
        name: 'Vai trò thanh toán'
      },
      disabled: false
    },
    {
      id: 'acc35',
      name: 'Hoàng Văn JJ',
      username: 'hoangvanjj',
      email: 'hoangvanjj@gmail.com',
      phone: '0909090935',
      CCCD: '1234567835',
      type: 'staff',
      role: {
        id: 'role5',
        name: 'Nhân viên giao dịch'
      },
      disabled: false
    },
    {
      id: 'acc36',
      name: 'Ngô Thị KK',
      username: 'ngothikk',
      email: 'ngothikk@gmail.com',
      phone: '0909090936',
      CCCD: '1234567836',
      type: 'customer',
      role: {
        id: 'role3',
        name: 'Vai trò tiết kiệm'
      },
      disabled: true
    },
    {
      id: 'acc37',
      name: 'Đỗ Văn LL',
      username: 'dovanll',
      email: 'dovanll@gmail.com',
      phone: '0909090937',
      CCCD: '1234567837',
      type: 'staff',
      role: {
        id: 'role6',
        name: 'Nhân viên tiếp thị'
      },
      disabled: false
    },
    {
      id: 'acc38',
      name: 'Vũ Thị MM',
      username: 'vuthimm',
      email: 'vuthimm@gmail.com',
      phone: '0909090938',
      CCCD: '1234567838',
      type: 'customer',
      role: {
        id: 'role1',
        name: 'Không có quyền'
      },
      disabled: false
    },
    {
      id: 'acc39',
      name: 'Bùi Văn NN',
      username: 'buivannn',
      email: 'buivannn@gmail.com',
      phone: '0909090939',
      CCCD: '1234567839',
      type: 'staff',
      role: {
        id: 'role4',
        name: 'Quản trị viên'
      },
      disabled: false
    },
    {
      id: 'acc40',
      name: 'Đinh Thị OO',
      username: 'dinhthioo',
      email: 'dinhthioo@gmail.com',
      phone: '0909090940',
      CCCD: '1234567840',
      type: 'customer',
      role: {
        id: 'role2',
        name: 'Vai trò thanh toán'
      },
      disabled: false
    }
  ];

  // State cho danh sách tài khoản hiển thị
  const [accountsList, setAccountsList] = useState([]);

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

  // useEffect để quản lý loading state và load dữ liệu ban đầu
  useEffect(() => {
    const timer = setTimeout(() => {
      // Load 12 tài khoản đầu tiên
      const initialAccounts = allAccountsData.slice(0, ITEMS_PER_PAGE);
      setAccountsList(initialAccounts);
      setIsLoading(false);
      
      // Kiểm tra xem còn dữ liệu để load không
      setHasMoreData(allAccountsData.length > ITEMS_PER_PAGE);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Hàm load thêm dữ liệu
   const loadMoreData = useCallback(() => {
     if (isLoadingMore || !hasMoreData) return;
     
     setIsLoadingMore(true);
     
     // Giả lập thời gian load API
     setTimeout(() => {
       const startIndex = currentPage * ITEMS_PER_PAGE;
       const endIndex = startIndex + ITEMS_PER_PAGE;
       const newAccounts = allAccountsData.slice(startIndex, endIndex);
       
       if (newAccounts.length > 0) {
         // Đánh dấu các items mới được load
         const newItemIds = new Set(newAccounts.map(acc => acc.id));
         setNewlyLoadedItems(newItemIds);
         
         setAccountsList(prev => [...prev, ...newAccounts]);
         setCurrentPage(prev => prev + 1);
         
         // Kiểm tra xem còn dữ liệu để load không
         setHasMoreData(endIndex < allAccountsData.length);
         
         // Clear newly loaded items sau khi animation hoàn thành
         setTimeout(() => {
           setNewlyLoadedItems(new Set());
         }, 1000);
       } else {
         setHasMoreData(false);
       }
       
       setIsLoadingMore(false);
     }, 1500);
   }, [currentPage, isLoadingMore, hasMoreData]);

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
  
  // Hàm cập nhật trạng thái xử lý
  const setConfirmationProcessing = (isProcessing) => {
    setConfirmModal(prev => ({ ...prev, isProcessing }));
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

  // Lọc danh sách tài khoản theo filter và search
  const filteredAccounts = accountsList.filter(account => {
    // Lọc theo loại
    if (typeFilter !== 'all' && account.type !== typeFilter) {
      return false;
    }
    
    // Lọc theo trạng thái
    if (statusFilter !== 'all') {
      if (statusFilter === 'active' && account.disabled) {
        return false;
      }
      if (statusFilter === 'disabled' && !account.disabled) {
        return false;
      }
    }
    
    // Lọc theo search term
    if (searchTerm && !account.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !account.email.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !account.phone.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !account.CCCD.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

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
      const filteredData = allAccountsData.filter(account => {
        // Lọc theo loại tài khoản
        if (typeFilter !== 'all' && account.type !== typeFilter) {
          return false;
        }
        
        // Lọc theo trạng thái
        if (statusFilter !== 'all') {
          if (statusFilter === 'active' && account.disabled) {
            return false;
          }
          if (statusFilter === 'disabled' && !account.disabled) {
            return false;
          }
        }
        
        // Lọc theo search term
        if (newSearchTerm && !account.name.toLowerCase().includes(newSearchTerm.toLowerCase()) &&
            !account.email.toLowerCase().includes(newSearchTerm.toLowerCase()) &&
            !account.phone.toLowerCase().includes(newSearchTerm.toLowerCase()) &&
            !account.CCCD.toLowerCase().includes(newSearchTerm.toLowerCase())) {
          return false;
        }
        
        return true;
      });
      
      // Chỉ set hasMoreData = true nếu có nhiều hơn ITEMS_PER_PAGE accounts
      setHasMoreData(filteredData.length > ITEMS_PER_PAGE);
      
      // Reset về dữ liệu ban đầu khi tìm kiếm
      const initialAccounts = allAccountsData.slice(0, ITEMS_PER_PAGE);
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
        const filteredData = allAccountsData.filter(account => {
          // Lọc theo loại tài khoản
          if (typeFilter !== 'all' && account.type !== typeFilter) {
            return false;
          }
          
          // Lọc theo trạng thái
          if (statusFilter !== 'all') {
            if (statusFilter === 'active' && account.disabled) {
              return false;
            }
            if (statusFilter === 'disabled' && !account.disabled) {
              return false;
            }
          }
          
          return true;
        });
        
        // Chỉ set hasMoreData = true nếu có nhiều hơn ITEMS_PER_PAGE accounts
        setHasMoreData(filteredData.length > ITEMS_PER_PAGE);
        
        // Reset về dữ liệu ban đầu
        const initialAccounts = allAccountsData.slice(0, ITEMS_PER_PAGE);
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
     if (isSearching) return; // Không reset khi đang tìm kiếm
     
     setIsSearching(true);
     
     // Giả lập thời gian lọc
     setTimeout(() => {
       setCurrentPage(1);
       setNewlyLoadedItems(new Set());
       setIsLoadingMore(false); // Reset loading shimmer
       
       // Tính toán dữ liệu sau khi filter để xác định hasMoreData
       const filteredData = allAccountsData.filter(account => {
         // Lọc theo loại tài khoản
         if (typeFilter !== 'all' && account.type !== typeFilter) {
           return false;
         }
         
         // Lọc theo trạng thái
         if (statusFilter !== 'all') {
           if (statusFilter === 'active' && account.disabled) {
             return false;
           }
           if (statusFilter === 'disabled' && !account.disabled) {
             return false;
           }
         }
         
         // Lọc theo search term
         if (searchTerm && !account.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
             !account.email.toLowerCase().includes(searchTerm.toLowerCase()) &&
             !account.phone.toLowerCase().includes(searchTerm.toLowerCase()) &&
             !account.CCCD.toLowerCase().includes(searchTerm.toLowerCase())) {
           return false;
         }
         
         return true;
       });
       
       // Chỉ set hasMoreData = true nếu có nhiều hơn ITEMS_PER_PAGE accounts
       setHasMoreData(filteredData.length > ITEMS_PER_PAGE);
       
       // Reset về dữ liệu ban đầu khi filter thay đổi
       const initialAccounts = allAccountsData.slice(0, ITEMS_PER_PAGE);
       setAccountsList(initialAccounts);
       setIsSearching(false);
     }, 1500);
   }, [typeFilter, statusFilter]);

  // Xử lý khi click vào nút thêm tài khoản
  const handleAddAccount = () => {
    setSelectedAccount(null);
    setIsEditing(false);
    setShowFormModal(true);
  };

  // Xử lý khi click vào nút sửa tài khoản
  const handleEditAccount = (accountId) => {
    const account = accountsList.find(a => a.id === accountId);
    if (account) {
      setSelectedAccount(account);
      setIsEditing(true);
      setShowFormModal(true);
    }
  };

  // Xử lý khi click vào nút xem chi tiết tài khoản
  const handleViewAccount = (accountId) => {
    const account = accountsList.find(a => a.id === accountId);
    if (account) {
      setSelectedAccount(account);
      setShowDetailModal(true);
    }
  };

  // Xử lý khi click vào nút đặt lại mật khẩu
  const handleResetPassword = (accountId) => {
    const account = accountsList.find(a => a.id === accountId);
    if (account) {
      setSelectedAccount(account);
      setShowResetPasswordModal(true);
    }
  };

  // Xử lý khi click vào nút vô hiệu hóa/kích hoạt tài khoản
  const handleToggleDisable = (accountId) => {
    const account = accountsList.find(a => a.id === accountId);
    if (!account) return;
    
    const newStatus = !account.disabled;
    const actionText = newStatus ? 'vô hiệu hóa' : 'kích hoạt';
    
    // Hiển thị modal xác nhận
    const confirmDetails = {
      'Tên người dùng': account.name,
      'Email': account.email,
      'Số điện thoại': account.phone,
      'CCCD': account.CCCD,
      'Loại tài khoản': account.type === 'staff' ? 'Nhân viên' : 'Khách hàng',
      'Vai trò': account.role ? account.role.name : '',
      'Trạng thái hiện tại': account.disabled ? 'Vô hiệu hóa' : 'Hoạt động',
      'Trạng thái mới': newStatus ? 'Vô hiệu hóa' : 'Hoạt động'
    };
    
    showConfirmModal(
      `${actionText.charAt(0).toUpperCase() + actionText.slice(1)} tài khoản`,
      `Xác nhận ${actionText} tài khoản "${account.email}"?`,
      newStatus ? 'danger' : 'success',
      confirmDetails,
      () => {
        // Cập nhật trạng thái đang xử lý
        setConfirmationProcessing(true);
        
        // Giả lập thời gian xử lý API
        setTimeout(() => {
          try {
            // Cập nhật trạng thái tài khoản
            setAccountsList(accountsList.map(a => {
              if (a.id === accountId) {
                return { ...a, disabled: newStatus };
              }
              return a;
            }));
            
            // Hiển thị thông báo thành công
            showNotification(
              `Đã ${actionText} tài khoản thành công!`,
              'success',
              `Tài khoản "${account.email}" đã ${actionText} thành công!`
            );
          } finally {
            // Đặt lại trạng thái xử lý
            setConfirmationProcessing(false);
            // Đóng modal xác nhận
            closeConfirmModal();
          }
        }, 1500);
      }
    );
  };

  // Xử lý khi lưu tài khoản (thêm hoặc sửa)
  const handleSaveAccount = (account, notificationInfo) => {
    if (isEditing) {
      // Cập nhật tài khoản hiện có
      setAccountsList(accountsList.map(a => a.id === account.id ? account : a));
    } else {
      // Thêm tài khoản mới
      setAccountsList([...accountsList, { ...account, id: `acc${accountsList.length + 1}` }]);
    }
    setShowFormModal(false);
    
    // Hiển thị thông báo nếu có
    if (notificationInfo) {
      showNotification(
        notificationInfo.message,
        notificationInfo.type,
        notificationInfo.format || ''
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
            {filteredAccounts.map((account, index) => {
               const isLast = filteredAccounts.length === index + 1;
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

            {filteredAccounts.length === 0 && (
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
                {filteredAccounts.map((account, index) => {
                  const isLast = filteredAccounts.length === index + 1;
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

                {filteredAccounts.length === 0 && !isLoadingMore && (
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
      {!hasMoreData && filteredAccounts.length > 0 && (
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
          <p className="text-xs text-gray-400 mt-1">Tổng cộng {filteredAccounts.length} tài khoản</p>
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
        isProcessing={confirmModal.isProcessing}
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