import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, X, AlertCircle } from 'lucide-react';
import { FiGrid, FiList, FiSearch, FiFilter, FiX, FiCalendar, FiClock, FiUser, FiFileText } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

// Import sub-components
import RegulationCard from './RegulationCard';
import RegulationListItem from './RegulationListItem';
import RegulationFilters from './RegulationFilters';
import RegulationDetailModal from './RegulationDetailModal';
import SwipeConfirmationModal from '@/components/modals/ConfirmationModal/SwipeConfirmationModal';
import ExportNotification from '@/components/common/ExportNotification';
import RegulationCardShimmer from '@/components/ui/custom/shimmer-types/RegulationCardShimmer';
import { useRegulationHistory } from '@/hooks/useRegulationHistoryHooks';

const RegulationHistory = () => {
  // Component states
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedRegulation, setSelectedRegulation] = useState(null);
  const [showRegulationModal, setShowRegulationModal] = useState(false);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: 'success', message: '', details: null, format: '' });
  const [searchTerm, setSearchTerm] = useState("");
  const { regulations, error, isLoading, cancelRegulation } = useRegulationHistory();
  // const [isLoading, setIsLoading] = useState(true);
  
  // Mock data for regulations history
  // const [regulations, setRegulations] = useState([
  //   {
  //     id: 'reg999',
  //     createdAt: '01/12/2024',
  //     applicationDate: '30/12/2025',
  //     description: 'Quy định lãi suất cho năm 2025 với mức tăng nhẹ để thích ứng với thị trường.',
  //     creator: {
  //       id: 'user789',
  //       name: 'Lê Văn C'
  //     },
  //     minimumDeposit: 5000000,
  //     noTermRate: 0.5,
  //     savingsTypes: [
  //       {
  //         id: 'standard',
  //         name: 'Tiết kiệm tiêu chuẩn',
  //         terms: [
  //           { id: 't1', months: 1 },
  //           { id: 't3', months: 3 },
  //           { id: 't6', months: 6 },
  //           { id: 't12', months: 12 }
  //         ],
  //         interestRates: [
  //           { termId: 't1', frequencyId: 'start', rate: 5.0 },
  //           { termId: 't1', frequencyId: 'monthly', rate: 5.1 },
  //           { termId: 't1', frequencyId: 'quarterly', rate: 5.2 },
  //           { termId: 't1', frequencyId: 'end', rate: 5.3 },
  //           { termId: 't3', frequencyId: 'start', rate: 5.5 },
  //           { termId: 't3', frequencyId: 'monthly', rate: 5.6 },
  //           { termId: 't3', frequencyId: 'quarterly', rate: 5.7 },
  //           { termId: 't3', frequencyId: 'end', rate: 5.8 },
  //           { termId: 't6', frequencyId: 'start', rate: 6.0 },
  //           { termId: 't6', frequencyId: 'monthly', rate: 6.1 },
  //           { termId: 't6', frequencyId: 'quarterly', rate: 6.2 },
  //           { termId: 't6', frequencyId: 'end', rate: 6.3 },
  //           { termId: 't12', frequencyId: 'start', rate: 6.5 },
  //           { termId: 't12', frequencyId: 'monthly', rate: 6.6 },
  //           { termId: 't12', frequencyId: 'quarterly', rate: 6.7 },
  //           { termId: 't12', frequencyId: 'end', rate: 6.8 },
  //         ]
  //       }
  //     ],
  //     paymentFrequencies: [
  //       { id: 'start', name: 'Đầu kỳ hạn' },
  //       { id: 'monthly', name: 'Hàng tháng' },
  //       { id: 'quarterly', name: 'Hàng quý' },
  //       { id: 'end', name: 'Cuối kỳ hạn' }
  //     ]
  //   },
  //   {
  //     id: 'reg123',
  //     createdAt: '16/06/2023',
  //     applicationDate: null, // null means 'immediate'
  //     description: 'Quy định lãi suất cơ bản áp dụng cho các sản phẩm tiết kiệm tiêu chuẩn và linh hoạt.',
  //     creator: {
  //       id: 'user456',
  //       name: 'Trần Thị B'
  //     },
  //     minimumDeposit: 1000000,
  //     noTermRate: 0.2,
  //     savingsTypes: [
  //       {
  //         id: 'standard',
  //         name: 'Tiết kiệm tiêu chuẩn',
  //         terms: [
  //           { id: 't1', months: 1 },
  //           { id: 't3', months: 3 },
  //           { id: 't6', months: 6 },
  //           { id: 't12', months: 12 }
  //         ],
  //         interestRates: [
  //           { termId: 't1', frequencyId: 'start', rate: 3.5 },
  //           { termId: 't1', frequencyId: 'monthly', rate: 3.6 },
  //           { termId: 't1', frequencyId: 'quarterly', rate: 3.7 },
  //           { termId: 't1', frequencyId: 'end', rate: 3.8 },
  //           { termId: 't3', frequencyId: 'start', rate: 4.0 },
  //           { termId: 't3', frequencyId: 'monthly', rate: 4.1 },
  //           { termId: 't3', frequencyId: 'quarterly', rate: 4.2 },
  //           { termId: 't3', frequencyId: 'end', rate: 4.3 },
  //           { termId: 't6', frequencyId: 'start', rate: 4.5 },
  //           { termId: 't6', frequencyId: 'monthly', rate: 4.6 },
  //           { termId: 't6', frequencyId: 'quarterly', rate: 4.7 },
  //           { termId: 't6', frequencyId: 'end', rate: 4.8 },
  //           { termId: 't12', frequencyId: 'start', rate: 5.0 },
  //           { termId: 't12', frequencyId: 'monthly', rate: 5.1 },
  //           { termId: 't12', frequencyId: 'quarterly', rate: 5.2 },
  //           { termId: 't12', frequencyId: 'end', rate: 5.3 },
  //         ]
  //       },
  //       {
  //         id: 'flexible',
  //         name: 'Tiết kiệm linh hoạt',
  //         terms: [
  //           { id: 't1', months: 1 },
  //           { id: 't3', months: 3 },
  //           { id: 't6', months: 6 },
  //           { id: 't12', months: 12 }
  //         ],
  //         interestRates: [
  //           { termId: 't1', frequencyId: 'start', rate: 4.0 },
  //           { termId: 't1', frequencyId: 'monthly', rate: 4.1 },
  //           { termId: 't1', frequencyId: 'quarterly', rate: 4.2 },
  //           { termId: 't1', frequencyId: 'end', rate: 4.3 },
  //           { termId: 't3', frequencyId: 'start', rate: 4.5 },
  //           { termId: 't3', frequencyId: 'monthly', rate: 4.6 },
  //           { termId: 't3', frequencyId: 'quarterly', rate: 4.7 },
  //           { termId: 't3', frequencyId: 'end', rate: 4.8 },
  //           { termId: 't6', frequencyId: 'start', rate: 5.0 },
  //           { termId: 't6', frequencyId: 'monthly', rate: 5.1 },
  //           { termId: 't6', frequencyId: 'quarterly', rate: 5.2 },
  //           { termId: 't6', frequencyId: 'end', rate: 5.3 },
  //           { termId: 't12', frequencyId: 'start', rate: 5.5 },
  //           { termId: 't12', frequencyId: 'monthly', rate: 5.6 },
  //           { termId: 't12', frequencyId: 'quarterly', rate: 5.7 },
  //           { termId: 't12', frequencyId: 'end', rate: 5.8 },
  //         ]
  //       }
  //     ],
  //     paymentFrequencies: [
  //       { id: 'start', name: 'Đầu kỳ hạn' },
  //       { id: 'monthly', name: 'Hàng tháng' },
  //       { id: 'quarterly', name: 'Hàng quý' },
  //       { id: 'end', name: 'Cuối kỳ hạn' }
  //     ]
  //   },
  //   {
  //     id: 'reg456',
  //     createdAt: '10/07/2023',
  //     applicationDate: '15/07/2023',
  //     description: 'Điều chỉnh lãi suất theo xu hướng thị trường, tăng nhẹ cho kỳ hạn dài.',
  //     creator: {
  //       id: 'user123',
  //       name: 'Nguyễn Văn A'
  //     },
  //     minimumDeposit: 2000000,
  //     noTermRate: 0.3,
  //     savingsTypes: [
  //       {
  //         id: 'standard',
  //         name: 'Tiết kiệm tiêu chuẩn',
  //         terms: [
  //           { id: 't1', months: 1 },
  //           { id: 't3', months: 3 },
  //           { id: 't6', months: 6 },
  //           { id: 't12', months: 12 }
  //         ],
  //         interestRates: [
  //           { termId: 't1', frequencyId: 'start', rate: 4.0 },
  //           { termId: 't1', frequencyId: 'monthly', rate: 4.1 },
  //           { termId: 't1', frequencyId: 'quarterly', rate: 4.2 },
  //           { termId: 't1', frequencyId: 'end', rate: 4.3 },
  //           { termId: 't3', frequencyId: 'start', rate: 4.5 },
  //           { termId: 't3', frequencyId: 'monthly', rate: 4.6 },
  //           { termId: 't3', frequencyId: 'quarterly', rate: 4.7 },
  //           { termId: 't3', frequencyId: 'end', rate: 4.8 },
  //           { termId: 't6', frequencyId: 'start', rate: 5.0 },
  //           { termId: 't6', frequencyId: 'monthly', rate: 5.1 },
  //           { termId: 't6', frequencyId: 'quarterly', rate: 5.2 },
  //           { termId: 't6', frequencyId: 'end', rate: 5.3 },
  //           { termId: 't12', frequencyId: 'start', rate: 5.5 },
  //           { termId: 't12', frequencyId: 'monthly', rate: 5.6 },
  //           { termId: 't12', frequencyId: 'quarterly', rate: 5.7 },
  //           { termId: 't12', frequencyId: 'end', rate: 5.8 },
  //         ]
  //       },
  //       {
  //         id: 'flexible',
  //         name: 'Tiết kiệm linh hoạt',
  //         terms: [
  //           { id: 't1', months: 1 },
  //           { id: 't3', months: 3 },
  //           { id: 't6', months: 6 },
  //           { id: 't12', months: 12 }
  //         ],
  //         interestRates: [
  //           { termId: 't1', frequencyId: 'start', rate: 4.5 },
  //           { termId: 't1', frequencyId: 'monthly', rate: 4.6 },
  //           { termId: 't1', frequencyId: 'quarterly', rate: 4.7 },
  //           { termId: 't1', frequencyId: 'end', rate: 4.8 },
  //           { termId: 't3', frequencyId: 'start', rate: 5.0 },
  //           { termId: 't3', frequencyId: 'monthly', rate: 5.1 },
  //           { termId: 't3', frequencyId: 'quarterly', rate: 5.2 },
  //           { termId: 't3', frequencyId: 'end', rate: 5.3 },
  //           { termId: 't6', frequencyId: 'start', rate: 5.5 },
  //           { termId: 't6', frequencyId: 'monthly', rate: 5.6 },
  //           { termId: 't6', frequencyId: 'quarterly', rate: 5.7 },
  //           { termId: 't6', frequencyId: 'end', rate: 5.8 },
  //           { termId: 't12', frequencyId: 'start', rate: 6.0 },
  //           { termId: 't12', frequencyId: 'monthly', rate: 6.1 },
  //           { termId: 't12', frequencyId: 'quarterly', rate: 6.2 },
  //           { termId: 't12', frequencyId: 'end', rate: 6.3 },
  //         ]
  //       }
  //     ],
  //     paymentFrequencies: [
  //       { id: 'start', name: 'Đầu kỳ hạn' },
  //       { id: 'monthly', name: 'Hàng tháng' },
  //       { id: 'quarterly', name: 'Hàng quý' },
  //       { id: 'end', name: 'Cuối kỳ hạn' }
  //     ]
  //   },
  //   {
  //     id: 'reg789',
  //     createdAt: '05/08/2023',
  //     applicationDate: '01/09/2023',
  //     description: 'Bổ sung kỳ hạn 24 tháng và điều chỉnh lãi suất cho phù hợp với chính sách mới.',
  //     creator: {
  //       id: 'user456',
  //       name: 'Trần Thị B'
  //     },
  //     minimumDeposit: 3000000,
  //     noTermRate: 0.4,
  //     savingsTypes: [
  //       {
  //         id: 'standard',
  //         name: 'Tiết kiệm tiêu chuẩn',
  //         terms: [
  //           { id: 't1', months: 1 },
  //           { id: 't3', months: 3 },
  //           { id: 't6', months: 6 },
  //           { id: 't12', months: 12 },
  //           { id: 't24', months: 24 }
  //         ],
  //         interestRates: [
  //           { termId: 't1', frequencyId: 'start', rate: 4.2 },
  //           { termId: 't1', frequencyId: 'monthly', rate: 4.3 },
  //           { termId: 't1', frequencyId: 'quarterly', rate: 4.4 },
  //           { termId: 't1', frequencyId: 'end', rate: 4.5 },
  //           { termId: 't3', frequencyId: 'start', rate: 4.7 },
  //           { termId: 't3', frequencyId: 'monthly', rate: 4.8 },
  //           { termId: 't3', frequencyId: 'quarterly', rate: 4.9 },
  //           { termId: 't3', frequencyId: 'end', rate: 5.0 },
  //           { termId: 't6', frequencyId: 'start', rate: 5.2 },
  //           { termId: 't6', frequencyId: 'monthly', rate: 5.3 },
  //           { termId: 't6', frequencyId: 'quarterly', rate: 5.4 },
  //           { termId: 't6', frequencyId: 'end', rate: 5.5 },
  //           { termId: 't12', frequencyId: 'start', rate: 5.7 },
  //           { termId: 't12', frequencyId: 'monthly', rate: 5.8 },
  //           { termId: 't12', frequencyId: 'quarterly', rate: 5.9 },
  //           { termId: 't12', frequencyId: 'end', rate: 6.0 },
  //           { termId: 't24', frequencyId: 'start', rate: 6.2 },
  //           { termId: 't24', frequencyId: 'monthly', rate: 6.3 },
  //           { termId: 't24', frequencyId: 'quarterly', rate: 6.4 },
  //           { termId: 't24', frequencyId: 'end', rate: 6.5 },
  //         ]
  //       },
  //       {
  //         id: 'flexible',
  //         name: 'Tiết kiệm linh hoạt',
  //         terms: [
  //           { id: 't1', months: 1 },
  //           { id: 't3', months: 3 },
  //           { id: 't6', months: 6 },
  //           { id: 't12', months: 12 },
  //           { id: 't24', months: 24 }
  //         ],
  //         interestRates: [
  //           { termId: 't1', frequencyId: 'start', rate: 4.7 },
  //           { termId: 't1', frequencyId: 'monthly', rate: 4.8 },
  //           { termId: 't1', frequencyId: 'quarterly', rate: 4.9 },
  //           { termId: 't1', frequencyId: 'end', rate: 5.0 },
  //           { termId: 't3', frequencyId: 'start', rate: 5.2 },
  //           { termId: 't3', frequencyId: 'monthly', rate: 5.3 },
  //           { termId: 't3', frequencyId: 'quarterly', rate: 5.4 },
  //           { termId: 't3', frequencyId: 'end', rate: 5.5 },
  //           { termId: 't6', frequencyId: 'start', rate: 5.7 },
  //           { termId: 't6', frequencyId: 'monthly', rate: 5.8 },
  //           { termId: 't6', frequencyId: 'quarterly', rate: 5.9 },
  //           { termId: 't6', frequencyId: 'end', rate: 6.0 },
  //           { termId: 't12', frequencyId: 'start', rate: 6.2 },
  //           { termId: 't12', frequencyId: 'monthly', rate: 6.3 },
  //           { termId: 't12', frequencyId: 'quarterly', rate: 6.4 },
  //           { termId: 't12', frequencyId: 'end', rate: 6.5 },
  //           { termId: 't24', frequencyId: 'start', rate: 6.7 },
  //           { termId: 't24', frequencyId: 'monthly', rate: 6.8 },
  //           { termId: 't24', frequencyId: 'quarterly', rate: 6.9 },
  //           { termId: 't24', frequencyId: 'end', rate: 7.0 },
  //         ]
  //       }
  //     ],
  //     paymentFrequencies: [
  //       { id: 'start', name: 'Đầu kỳ hạn' },
  //       { id: 'monthly', name: 'Hàng tháng' },
  //       { id: 'quarterly', name: 'Hàng quý' },
  //       { id: 'end', name: 'Cuối kỳ hạn' }
  //     ]
  //   },
  //   {
  //     id: 'reg101',
  //     createdAt: '15/08/2023',
  //     applicationDate: '20/08/2023',
  //     description: 'Điều chỉnh tạm thời cho đợt khuyến mãi mùa hè, đã hủy do thay đổi chính sách.',
  //     isCancelled: true,
  //     creator: {
  //       id: 'user123',
  //       name: 'Nguyễn Văn A'
  //     },
  //     minimumDeposit: 2500000,
  //     noTermRate: 0.3,
  //     savingsTypes: [
  //       {
  //         id: 'standard',
  //         name: 'Tiết kiệm tiêu chuẩn',
  //         terms: [
  //           { id: 't1', months: 1 },
  //           { id: 't3', months: 3 },
  //           { id: 't6', months: 6 },
  //           { id: 't12', months: 12 }
  //         ],
  //         interestRates: [
  //           { termId: 't1', frequencyId: 'start', rate: 4.1 },
  //           { termId: 't1', frequencyId: 'monthly', rate: 4.2 },
  //           { termId: 't1', frequencyId: 'quarterly', rate: 4.3 },
  //           { termId: 't1', frequencyId: 'end', rate: 4.4 },
  //           { termId: 't3', frequencyId: 'start', rate: 4.6 },
  //           { termId: 't3', frequencyId: 'monthly', rate: 4.7 },
  //           { termId: 't3', frequencyId: 'quarterly', rate: 4.8 },
  //           { termId: 't3', frequencyId: 'end', rate: 4.9 },
  //           { termId: 't6', frequencyId: 'start', rate: 5.1 },
  //           { termId: 't6', frequencyId: 'monthly', rate: 5.2 },
  //           { termId: 't6', frequencyId: 'quarterly', rate: 5.3 },
  //           { termId: 't6', frequencyId: 'end', rate: 5.4 },
  //           { termId: 't12', frequencyId: 'start', rate: 5.6 },
  //           { termId: 't12', frequencyId: 'monthly', rate: 5.7 },
  //           { termId: 't12', frequencyId: 'quarterly', rate: 5.8 },
  //           { termId: 't12', frequencyId: 'end', rate: 5.9 }
  //         ]
  //       }
  //     ],
  //     paymentFrequencies: [
  //       { id: 'start', name: 'Đầu kỳ hạn' },
  //       { id: 'monthly', name: 'Hàng tháng' },
  //       { id: 'quarterly', name: 'Hàng quý' },
  //       { id: 'end', name: 'Cuối kỳ hạn' }
  //     ]
  //   }
  // ]);

  // Filter regulations
  const filteredRegulations = regulations.filter(regulation => {
    // Tìm kiếm theo mã quy định hoặc tên người tạo
    const searchLower = searchTerm.toLowerCase();
    const codeMatch = regulation.id.toLowerCase().includes(searchLower);
    const creatorMatch = regulation.creator.name.toLowerCase().includes(searchLower);
    if (searchTerm && !(codeMatch || creatorMatch)) {
      return false;
    }
    // Apply status filter
    if (statusFilter !== 'all') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (statusFilter === 'applied') {
        // Check if already applied
        if (!regulation.isActive) {
          return false; // Inactive regulations are not applied
        }
        
        if (!regulation.applicationDate) {
          return true; // Immediate application is always applied
        }
        
        const [day, month, year] = regulation.applicationDate.split('/').map(Number);
        const applicationDate = new Date(year, month - 1, day);
        
        if (applicationDate > today) {
          return false; // Not applied yet
        }
        
        return true;
      } else if (statusFilter === 'pending') {
        // Check if pending
        if (!regulation.isActive) {
          return false; // Inactive regulations are not pending
        }
        
        if (!regulation.applicationDate) {
          return false; // Immediate application is never pending
        }
        
        const [day, month, year] = regulation.applicationDate.split('/').map(Number);
        const applicationDate = new Date(year, month - 1, day);
        
        if (applicationDate <= today) {
          return false; // Already applied
        }
        
        return true;
      } else if (statusFilter === 'cancelled') {
        // Check if cancelled
        return regulation.isActive === false;
      }
    }
    
    return true;
  });
  
  // Sort regulations
  const sortedRegulations = [...filteredRegulations].sort((a, b) => {
    // Helper function to convert date string to Date object
    const parseDate = (dateString) => {
      if (!dateString) return new Date(0); // For immediate application, use epoch
      
      const [day, month, year] = dateString.split('/').map(Number);
      return new Date(year, month - 1, day);
    };
    
    const dateA = parseDate(a.applicationDate);
    const dateB = parseDate(b.applicationDate);
    
    if (sortOrder === 'asc') {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });
  
  // Handle regulation click
  const handleRegulationClick = (regulation) => {
    setSelectedRegulation(regulation);
    setShowRegulationModal(true);
  };
  
  // Handle regulation cancellation
  const handleCancelClick = (regulation) => {
    setSelectedRegulation(regulation);
    setShowCancelConfirmation(true);
  };
  
  // State for processing status
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Confirm regulation cancellation
  const handleConfirmCancellation = async () => {
    if (!selectedRegulation) return;
    
    // Set processing state to true
    setIsProcessing(true);
    
    try {
      // Convert string ID "regXXX" to number by removing "reg" prefix
      const numericId = parseInt(selectedRegulation.id.replace('reg', ''));
      await cancelRegulation(numericId);
      
      // Show success notification
      setNotification({
        show: true,
        type: 'success',
        message: 'Hủy quy định thành công',
        format: `Quy định #${selectedRegulation.id.replace('reg', '')} đã được hủy`
      });
      
      // Close confirmation modal
      setShowCancelConfirmation(false);
    } catch (error) {
      // Show error notification
      setNotification({
        show: true,
        type: 'error',
        message: 'Không thể hủy quy định',
        format: 'Đã xảy ra lỗi khi hủy quy định. Vui lòng thử lại sau.'
      });
    } finally {
      // Reset processing state
      setIsProcessing(false);
    }
  };
  
  // Hàm kiểm tra có thể hủy quy định không
  const canCancelRegulation = (regulation) => {
    if (!regulation.isActive) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (!regulation.applicationDate) return false; // Áp dụng ngay thì không được hủy
    const [day, month, year] = regulation.applicationDate.split('/').map(Number);
    const applicationDate = new Date(year, month - 1, day);
    if (applicationDate <= today) return false; // Đã áp dụng thì không được hủy
    return true;
  };
  
  // Empty state
  const renderEmptyState = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.5
      }}
      className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,170,255,0.13)] border-2 border-blue-100 p-12 text-center"
    >
      <motion.div 
        initial={{ scale: 0, rotate: -180 }}
        animate={{ 
          scale: 1, 
          rotate: 0,
          transition: {
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.2
          }
        }}
        exit={{
          scale: 0,
          rotate: 180,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 25
          }
        }}
        whileHover={{ 
          scale: 1.1,
          rotate: [0, -10, 10, 0],
          transition: {
            rotate: {
              duration: 0.5,
              ease: "easeInOut"
            },
            scale: {
              type: "spring",
              stiffness: 300,
              damping: 20
            }
          }
        }}
        className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-6 shadow-lg border-2 border-blue-200"
      >
        <History size={32} className="text-blue-500" />
      </motion.div>
      
      <motion.h3 
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: {
            delay: 0.4,
            type: "spring",
            stiffness: 100,
            damping: 15
          }
        }}
        exit={{ opacity: 0, y: -10 }}
        className="text-xl font-bold text-blue-900 mb-3"
      >
        Không tìm thấy quy định
      </motion.h3>
      
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: {
            delay: 0.6,
            type: "spring",
            stiffness: 100,
            damping: 15
          }
        }}
        exit={{ opacity: 0, y: -10 }}
        className="text-blue-600 max-w-md mx-auto text-base leading-relaxed"
      >
        Không có quy định lãi suất nào phù hợp với bộ lọc hiện tại. Vui lòng thay đổi bộ lọc và thử lại.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          transition: {
            delay: 0.8,
            type: "spring",
            stiffness: 150,
            damping: 20
          }
        }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="mt-6 flex justify-center space-x-2"
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
            className="w-2 h-2 bg-blue-400 rounded-full"
          />
        ))}
      </motion.div>
    </motion.div>
  );

  // Get cancel confirmation details
  const getCancelConfirmDetails = () => {
    if (!selectedRegulation) return {};
    
    // Format application date for display
    const formatApplicationDate = (regulation) => {
      if (!regulation.applicationDate) {
        return `${regulation.createdAt} (Ngay lập tức)`;
      }
      return regulation.applicationDate;
    };
    
    return {
      'Mã quy định': `#${selectedRegulation.id.replace('reg', '')}`,
      'Ngày áp dụng': formatApplicationDate(selectedRegulation),
      'Người tạo': selectedRegulation.creator.name
    };
  };

  // useEffect to turn off loading after 3 seconds
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <div className="container mx-auto p-3 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent drop-shadow">Lịch sử quy định lãi suất</h2>
        <input
          type="text"
          className="border-2 border-blue-100 rounded-2xl px-5 py-3 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base shadow-sm"
          placeholder="Tìm kiếm theo mã hoặc người tạo..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Filters */}
      <RegulationFilters
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      
      {/* Regulations list */}
      {isLoading ? (
        <RegulationCardShimmer cardCount={6} />
      ) : sortedRegulations.length > 0 ? (
        <div>
          {viewMode === 'grid' ? (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="popLayout">
                {sortedRegulations.map((regulation, index) => (
                  <motion.div
                    key={regulation.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      y: 0,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                        delay: index * 0.1
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      scale: 0.8, 
                      y: -20,
                      transition: {
                        type: "spring",
                        stiffness: 200,
                        damping: 20
                      }
                    }}
                    transition={{
                      layout: {
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                      }
                    }}
                  >
                    <RegulationCard
                      regulation={regulation}
                      onClick={() => handleRegulationClick(regulation)}
                      isActive={selectedRegulation?.id === regulation.id}
                      onCancelClick={handleCancelClick}
                      canCancel={canCancelRegulation(regulation)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="popLayout">
                {sortedRegulations.map((regulation, index) => (
                  <motion.div
                    key={regulation.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                        delay: index * 0.05
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      x: 20,
                      transition: {
                        type: "spring",
                        stiffness: 200,
                        damping: 20
                      }
                    }}
                    transition={{
                      layout: {
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                      }
                    }}
                  >
                    <RegulationListItem
                      regulation={regulation}
                      onClick={() => handleRegulationClick(regulation)}
                      isActive={selectedRegulation?.id === regulation.id}
                      onCancelClick={handleCancelClick}
                      canCancel={canCancelRegulation(regulation)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[300px]">
          <AnimatePresence mode="wait">
            {renderEmptyState()}
          </AnimatePresence>
        </div>
      )}
      
      {/* Regulation detail modal */}
      {selectedRegulation && (
        <RegulationDetailModal
          isOpen={showRegulationModal}
          onClose={() => setShowRegulationModal(false)}
          regulation={selectedRegulation}
          onCancel={handleCancelClick}
          canCancel={canCancelRegulation(selectedRegulation)}
        />
      )}
      
      {/* Cancel confirmation modal */}
      <SwipeConfirmationModal
        isOpen={showCancelConfirmation}
        onClose={() => setShowCancelConfirmation(false)}
        onConfirm={handleConfirmCancellation}
        title="Xác nhận hủy quy định"
        description="Bạn đang hủy quy định lãi suất tiết kiệm. Hành động này không thể hoàn tác sau khi đã xác nhận."
        confirmText="Vuốt để xác nhận hủy"
        type="danger"
        confirmDetails={getCancelConfirmDetails()}
        isProcessing={isProcessing}
      />
      
      {/* Notification */}
      <ExportNotification
        isVisible={notification.show}
        onClose={() => setNotification({ ...notification, show: false })}
        type={notification.type === 'success' ? 'success' : 'error'}
        message={notification.message}
        format={notification.format}
      />
    </div>
  );
};

export default RegulationHistory;