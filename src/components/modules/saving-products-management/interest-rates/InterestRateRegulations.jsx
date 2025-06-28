import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit2, User, Save, DollarSign, TrendingUp } from 'lucide-react';
import { useRegulationHistory } from '@/hooks/InterestRateRegulation';

// Import sub-components
import SavingsTypeToggle from './SavingsTypeToggle';
import InterestRateTable from './InterestRateTable';
import SavingsTypeSelector from './SavingsTypeSelector';
import GeneralSettings from './GeneralSettings';
import ApplicationDateSelector from './ApplicationDateSelector';
import RegulationComparisonModal from './RegulationComparisonModal';
import ExportNotification from '@/components/common/ExportNotification';
import Skeleton from '@/components/ui/custom/Skeleton';
import SavingsTypeToggleShimmer from '@/components/ui/custom/shimmer-types/SavingsTypeToggleShimmer';
import InterestRateTableShimmer from '@/components/ui/custom/shimmer-types/InterestRateTableShimmer';

// New component to display current regulations summary
const CurrentRegulationSummary = ({ regulation, isLoading }) => {
  // Format currency for display
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="md:mt-8 md:ml-28 bg-gradient-to-br from-blue-50/80 to-white rounded-3xl shadow-[0_4px_30px_rgba(0,170,255,0.12)] p-6 mb-8 border border-blue-100"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <motion.div
          whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(0,170,255,0.10)' }}
          className="bg-white/80 rounded-2xl p-5 flex items-center shadow-[0_2px_12px_rgba(0,170,255,0.06)] border border-blue-50"
        >
          <motion.span
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2, ease: 'easeInOut' }}
            className="mr-4 flex-shrink-0"
          >
            <DollarSign size={28} className="text-blue-500" />
          </motion.span>
          <div>
            <p className="text-sm text-gray-500">Số tiền gửi tối thiểu</p>
            <p className="text-xl font-bold text-gray-800">
            <Skeleton isLoading={isLoading} width="w-32" height="h-7" className="text-xl font-bold text-gray-800">
              {formatCurrency(regulation.minimumDeposit)}
            </Skeleton>
            </p>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(0,170,255,0.10)' }}
          className="bg-white/80 rounded-2xl p-5 flex items-center shadow-[0_2px_12px_rgba(0,170,255,0.06)] border border-blue-50"
        >
          <motion.span
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2.2, ease: 'easeInOut' }}
            className="mr-4 flex-shrink-0"
          >
            <TrendingUp size={28} className="text-blue-500" />
          </motion.span>
          <div>
            <p className="text-sm text-gray-500">Lãi suất không kỳ hạn</p>
            <p className="text-xl font-bold text-gray-800">
            <Skeleton isLoading={isLoading} width="w-32" height="h-7" className="text-xl font-bold text-gray-800">
              {regulation.noTermRate}%
            </Skeleton>
            </p>
          </div>
        </motion.div>
      </div>
      {regulation.description && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-6 text-base text-blue-700 italic bg-blue-50/60 rounded-2xl p-4 border border-blue-100 shadow-sm"
        >
          <Skeleton isLoading={isLoading} width="w-full" height="h-5" className="text-base text-blue-700 italic">
            {regulation.description}
          </Skeleton>
        </motion.div>
      )}
    </motion.div>
  );
};

const InterestRateRegulations = () => {
  // Use the existing hook
  const { regulations, isLoading: isLoadingRegulation, error: regulationError  } = useRegulationHistory();

  // Mock data for all available options
  const allSavingsTypes = [
    { id: 'standard', name: 'Tiết kiệm tiêu chuẩn' },
    { id: 'flexible', name: 'Tiết kiệm linh hoạt' }
  ];
  
  const allPaymentFrequencies = [
    { id: 'start', name: 'Đầu kỳ hạn' },
    { id: 'monthly', name: 'Hàng tháng' },
    { id: 'quarterly', name: 'Hàng quý' },
    { id: 'end', name: 'Cuối kỳ hạn' }
  ];
  
  const defaultTerms = [
    { id: 't1', months: 1 },
    { id: 't3', months: 3 },
    { id: 't6', months: 6 },
    { id: 't12', months: 12 },
    { id: 't24', months: 24 },
  ];

  // User info (mock)
  const currentUser = {
    id: 'user123',
    name: 'Nguyễn Văn A',
    role: 'Quản trị viên'
  };

  // Component states
  const [isEditing, setIsEditing] = useState(false);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: 'success', message: '', details: null, format: '' });
  
  // Current regulation state
  const [currentRegulation, setCurrentRegulation] = useState({
    id: 'reg123',
    createdAt: '16/06/2023',
    applicationDate: null,
    description: 'Quy định lãi suất cơ bản cho các sản phẩm tiết kiệm, áp dụng từ tháng 6/2023.',
    creator: {
      id: 'user456',
      name: 'Trần Thị B'
    },
    minimumDeposit: 1000000,
    noTermRate: 0.2,
    savingsTypes: [
      {
        id: 'standard',
        name: 'Tiết kiệm tiêu chuẩn',
        terms: [...defaultTerms],
        interestRates: [
          { termId: 't1', frequencyId: 'start', rate: 3.5 },
          { termId: 't1', frequencyId: 'monthly', rate: 3.6 },
          { termId: 't1', frequencyId: 'quarterly', rate: 3.7 },
          { termId: 't1', frequencyId: 'end', rate: 3.8 },
          { termId: 't3', frequencyId: 'start', rate: 4.0 },
          { termId: 't3', frequencyId: 'monthly', rate: 4.1 },
          { termId: 't3', frequencyId: 'quarterly', rate: 4.2 },
          { termId: 't3', frequencyId: 'end', rate: 4.3 },
          { termId: 't6', frequencyId: 'start', rate: 4.5 },
          { termId: 't6', frequencyId: 'monthly', rate: 4.6 },
          { termId: 't6', frequencyId: 'quarterly', rate: 4.7 },
          { termId: 't6', frequencyId: 'end', rate: 4.8 },
          { termId: 't12', frequencyId: 'start', rate: 5.0 },
          { termId: 't12', frequencyId: 'monthly', rate: 5.1 },
          { termId: 't12', frequencyId: 'quarterly', rate: 5.2 },
          { termId: 't12', frequencyId: 'end', rate: 5.3 },
          { termId: 't24', frequencyId: 'start', rate: 5.5 },
          { termId: 't24', frequencyId: 'monthly', rate: 5.6 },
          { termId: 't24', frequencyId: 'quarterly', rate: 5.7 },
          { termId: 't24', frequencyId: 'end', rate: 5.8 },
        ],
        disabledFrequencies: [] // Add this field to track disabled frequencies per savings type
      },
      {
        id: 'flexible',
        name: 'Tiết kiệm linh hoạt',
        terms: [...defaultTerms],
        interestRates: [
          { termId: 't1', frequencyId: 'end', rate: 4.3 },
          { termId: 't3', frequencyId: 'end', rate: 4.8 },
          { termId: 't6', frequencyId: 'end', rate: 5.3 },
          { termId: 't12', frequencyId: 'end', rate: 5.8 },
          { termId: 't24', frequencyId: 'end', rate: 6.3 },
        ],
        disabledFrequencies: ['start', 'monthly', 'quarterly'] // Flexible savings only supports end frequency
      }
    ],
    paymentFrequencies: [...allPaymentFrequencies]
  });
  
  // New edited regulation for tracking changes
  const [editedRegulation, setEditedRegulation] = useState({ ...currentRegulation });
  
  // Active savings type for displaying table
  const [activeSavingsType, setActiveSavingsType] = useState(
    currentRegulation.savingsTypes?.[0]?.id || null
  );

  // Track changes to highlight differences
  const [changedFields, setChangedFields] = useState({});
  
  // Validation errors
  const [validationErrors, setValidationErrors] = useState({});
  
  // Track disabled savings types (but keep their data)
  const [disabledSavingsTypes, setDisabledSavingsTypes] = useState([]);
  
  // New state to track removed savings types for potential restoration
  const [removedSavingsTypes, setRemovedSavingsTypes] = useState([]);
  
  // Thêm state để biết user đã sửa description thủ công chưa
  const [isDescriptionManuallyChanged, setIsDescriptionManuallyChanged] = useState(false);
  
  // New state to track deleted terms per savings type
  const [deletedTerms, setDeletedTerms] = useState({});
  
  // Update currentRegulation when regulations changes
  useEffect(() => {
    if (regulations && regulations.length > 0) {
      setCurrentRegulation(regulations[0]); // Get the first regulation
    }
  }, [regulations]);

  // Show error notification if there's an error fetching regulation
  useEffect(() => {
    if (regulationError) {
      setNotification({
        show: true,
        type: 'error',
        message: 'Không thể tải quy định lãi suất',
        format: 'Đã xảy ra lỗi khi tải quy định lãi suất. Vui lòng thử lại sau.'
      });
    }
  }, [regulationError]);
  
  // Reset edited regulation when switching to edit mode
  useEffect(() => {
    if (isEditing) {
      const reg = JSON.parse(JSON.stringify(currentRegulation));
      let dateStr = 'chưa xác định';
      if (reg.applicationType === 'immediate' || !reg.applicationType) {
        // Nếu là áp dụng ngay, lấy ngày hôm nay
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        dateStr = `${day}/${month}/${year}`;
      } else if (reg.applicationDate) {
        dateStr = reg.applicationDate;
      }
      reg.description = `Quy định áp dụng từ ngày ${dateStr}`;
      
      // Ensure each savings type has disabledFrequencies field
      reg.savingsTypes.forEach(type => {
        if (!type.disabledFrequencies) {
          type.disabledFrequencies = type.id === 'flexible' ? 
            ['start', 'monthly', 'quarterly'] : [];
        }
      });
      
      setEditedRegulation(reg);
      setChangedFields({});
      setValidationErrors({});
      setIsDescriptionManuallyChanged(false);
      
      // Clear disabled savings types when entering edit mode
      setDisabledSavingsTypes([]);
      
      // Clear deleted terms when entering edit mode
      setDeletedTerms({});
      
      // Check if there are any savings types in allSavingsTypes that are not in currentRegulation
      const currentTypeIds = currentRegulation.savingsTypes.map(type => type.id);
      const missingTypes = allSavingsTypes.filter(type => !currentTypeIds.includes(type.id));
      
      // Add these to removedSavingsTypes if they're not already there
      if (missingTypes.length > 0) {
        setRemovedSavingsTypes(prev => {
          const existingIds = prev.map(type => type.id);
          const newTypes = missingTypes.filter(type => !existingIds.includes(type.id));
          return [...prev, ...newTypes];
        });
      }
    }
  }, [isEditing, currentRegulation]);
  
  // Helper function to find the active savings type details
  const getActiveSavingsTypeDetails = (regulation, typeId) => {
    return regulation.savingsTypes.find(type => type.id === typeId) || null;
  };
  
  // Current active savings type details
  const activeSavingsTypeDetails = getActiveSavingsTypeDetails(
    isEditing ? editedRegulation : currentRegulation,
    activeSavingsType
  );
  
  // Toggle payment frequency active state for the active savings type
  const handleToggleFrequency = (frequencyId) => {
    if (!activeSavingsType) return;
    
    const updatedRegulation = { ...editedRegulation };
    const savingsTypeIndex = updatedRegulation.savingsTypes.findIndex(
      t => t.id === activeSavingsType
    );
    
    if (savingsTypeIndex === -1) return;
    
    // Initialize disabledFrequencies array if it doesn't exist
    if (!updatedRegulation.savingsTypes[savingsTypeIndex].disabledFrequencies) {
      updatedRegulation.savingsTypes[savingsTypeIndex].disabledFrequencies = [];
    }
    
    const disabledFrequencies = updatedRegulation.savingsTypes[savingsTypeIndex].disabledFrequencies;
    
    if (disabledFrequencies.includes(frequencyId)) {
      // Re-enable frequency
      updatedRegulation.savingsTypes[savingsTypeIndex].disabledFrequencies = 
        disabledFrequencies.filter(id => id !== frequencyId);
    } else {
      // Disable frequency
      updatedRegulation.savingsTypes[savingsTypeIndex].disabledFrequencies = 
        [...disabledFrequencies, frequencyId];
    }
    
    setEditedRegulation(updatedRegulation);
    
    // Track changes
    setChangedFields(prev => ({
      ...prev,
      frequencies: true,
      [`frequencies-${activeSavingsType}`]: true
    }));
  };
  
  // Toggle savings type active state
  const handleToggleSavingsType = (typeId) => {
    // Check if this is the last active savings type
    const activeTypes = editedRegulation.savingsTypes.filter(
      type => !disabledSavingsTypes.includes(type.id)
    );
    
    if (disabledSavingsTypes.includes(typeId)) {
      // Re-enable savings type
      setDisabledSavingsTypes(disabledSavingsTypes.filter(id => id !== typeId));
      
      // Clear savings type error if we're enabling a type
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.savingsTypes;
        return newErrors;
      });
      
      // If no active savings type is selected, select this one
      if (!activeSavingsType || disabledSavingsTypes.includes(activeSavingsType)) {
        setActiveSavingsType(typeId);
      }
    } else {
      // Check if we're about to disable the last active type
      if (activeTypes.length === 1 && activeTypes[0].id === typeId) {
        // Don't allow disabling the last active savings type, but show error
        setValidationErrors(prev => ({
          ...prev,
          savingsTypes: 'Vui lòng chọn ít nhất một loại sản phẩm tiết kiệm'
        }));
        return;
      }
      
      // Disable savings type
      setDisabledSavingsTypes([...disabledSavingsTypes, typeId]);
      
      // If this was the active savings type, switch to another one if available
      if (activeSavingsType === typeId) {
        const availableSavingsTypes = editedRegulation.savingsTypes
          .filter(type => !disabledSavingsTypes.includes(type.id) && type.id !== typeId)
          .map(type => type.id);
          
        if (availableSavingsTypes.length > 0) {
          setActiveSavingsType(availableSavingsTypes[0]);
        } else {
          setActiveSavingsType(null);
        }
      }
    }
    
    // Track changes
    setChangedFields(prev => ({
      ...prev,
      savingsTypes: true
    }));
  };
  
  // Add a removed savings type back to the regulation
  const handleAddRemovedSavingsType = (typeId) => {
    // Find the savings type in removedSavingsTypes
    const typeToAdd = removedSavingsTypes.find(type => type.id === typeId);
    if (!typeToAdd) return;
    
    // Create a new savings type with default terms and rates
    const newSavingsType = {
      id: typeToAdd.id,
      name: typeToAdd.name,
      terms: [...defaultTerms],
      interestRates: [],
      disabledFrequencies: typeToAdd.id === 'flexible' ? ['start', 'monthly', 'quarterly'] : []
    };
    
    // Add interest rates for all terms and frequencies
    defaultTerms.forEach(term => {
      // For flexible savings, only add end frequency
      if (typeToAdd.id === 'flexible') {
        newSavingsType.interestRates.push({
          termId: term.id,
          frequencyId: 'end',
          rate: 0.0 // Default rate
        });
      } else {
        // For standard savings, add all frequencies
        editedRegulation.paymentFrequencies.forEach(freq => {
          newSavingsType.interestRates.push({
            termId: term.id,
            frequencyId: freq.id,
            rate: 0.0 // Default rate
          });
        });
      }
    });
    
    // Add the new savings type to editedRegulation
    const updatedRegulation = { ...editedRegulation };
    updatedRegulation.savingsTypes = [...updatedRegulation.savingsTypes, newSavingsType];
    setEditedRegulation(updatedRegulation);
    
    // Remove from removedSavingsTypes
    setRemovedSavingsTypes(removedSavingsTypes.filter(type => type.id !== typeId));
    
    // Set as active savings type
    setActiveSavingsType(typeToAdd.id);
    
    // Track changes
    setChangedFields(prev => ({
      ...prev,
      savingsTypes: true,
      [`savingsType-${typeToAdd.id}`]: true
    }));
  };
  
  // Change interest rate
  const handleRateChange = (termId, frequencyId, rate, errorMessage = null) => {
    if (!activeSavingsType) return;
    
    // Xử lý thông báo lỗi nếu có
    if (errorMessage !== undefined) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        if (errorMessage === null) {
          // Xóa lỗi nếu errorMessage là null
          delete newErrors.interestRates;
        } else {
          // Cập nhật lỗi
          newErrors.interestRates = errorMessage;
        }
        return newErrors;
      });
    }
    
    const updatedRegulation = { ...editedRegulation };
    const savingsTypeIndex = updatedRegulation.savingsTypes.findIndex(
      t => t.id === activeSavingsType
    );
    
    if (savingsTypeIndex === -1) return;
    
    // Find the interest rate to update
    const rateIndex = updatedRegulation.savingsTypes[savingsTypeIndex].interestRates.findIndex(
      r => r.termId === termId && r.frequencyId === frequencyId
    );
    
    if (rateIndex === -1) {
      // Add new rate
      updatedRegulation.savingsTypes[savingsTypeIndex].interestRates.push({
        termId,
        frequencyId,
        rate
      });
    } else {
      // Update existing rate
      updatedRegulation.savingsTypes[savingsTypeIndex].interestRates[rateIndex].rate = rate;
    }
    
    // Track changes with savings type ID to isolate highlights per type
    setChangedFields(prev => ({
      ...prev,
      interestRates: {
        ...prev.interestRates,
        [`${activeSavingsType}-${termId}-${frequencyId}`]: true
      }
    }));
    
    setEditedRegulation(updatedRegulation);
  };
  
  // Add new term for the active savings type only
  const handleAddTerm = (months) => {
    if (!activeSavingsType) return;
    
    const updatedRegulation = { ...editedRegulation };
    const savingsTypeIndex = updatedRegulation.savingsTypes.findIndex(
      t => t.id === activeSavingsType
    );
    
    if (savingsTypeIndex === -1) return;
    
    // Generate a unique term ID
    const newTermId = `t${months}`;
    const newTerm = { id: newTermId, months: months };
    
    // Add the term to the active savings type only
    const savingsType = updatedRegulation.savingsTypes[savingsTypeIndex];
    
    // Add term
    savingsType.terms.push(newTerm);
    
    // Add interest rates for this term
    if (savingsType.id === 'flexible') {
      // For flexible, only add end frequency
      savingsType.interestRates.push({
        termId: newTermId,
        frequencyId: 'end',
        rate: 0.0 // Default rate
      });
    } else {
      // For other types, add all non-disabled frequencies
      updatedRegulation.paymentFrequencies
        .filter(freq => !(savingsType.disabledFrequencies || []).includes(freq.id))
        .forEach(freq => {
          savingsType.interestRates.push({
            termId: newTermId,
            frequencyId: freq.id,
            rate: 0.0 // Default rate
          });
        });
    }
    
    // Sort terms by months
    savingsType.terms.sort((a, b) => a.months - b.months);
    
    // Track changes
    setChangedFields(prev => ({
      ...prev,
      terms: true,
      [`terms-${activeSavingsType}`]: true
    }));
    
    setEditedRegulation(updatedRegulation);
  };
  
  // Update the handleRemoveTerm function to mark terms as deleted for the active savings type only
  const handleRemoveTerm = (termId) => {
    if (!activeSavingsType) return;
    
    // Add to deleted terms list for the active savings type
    setDeletedTerms(prev => ({
      ...prev,
      [activeSavingsType]: [...(prev[activeSavingsType] || []), termId]
    }));
    
    // Track changes
    setChangedFields(prev => ({
      ...prev,
      terms: true,
      [`term-${activeSavingsType}-${termId}`]: true
    }));
  };
  
  // Add a new function to restore deleted terms for the active savings type
  const handleRestoreTerm = (termId) => {
    if (!activeSavingsType) return;
    
    // Remove from deleted terms for the active savings type
    setDeletedTerms(prev => {
      const updated = { ...prev };
      if (updated[activeSavingsType]) {
        updated[activeSavingsType] = updated[activeSavingsType].filter(id => id !== termId);
      }
      return updated;
    });
    
    // Update change tracking if needed
    setChangedFields(prev => {
      const updated = { ...prev };
      delete updated[`term-${activeSavingsType}-${termId}`];
      return updated;
    });
  };
  
  // Update minimum deposit with continuous validation
  const handleMinimumDepositChange = (value) => {
    setEditedRegulation({
      ...editedRegulation,
      minimumDeposit: value
    });
    
    // Track changes
    setChangedFields(prev => ({
      ...prev,
      minimumDeposit: true
    }));

    // Validate immediately
    validateField('minimumDeposit', value);
  };
  
  // Update no term rate with continuous validation
  const handleNoTermRateChange = (value) => {
    setEditedRegulation({
      ...editedRegulation,
      noTermRate: value
    });
    
    // Track changes
    setChangedFields(prev => ({
      ...prev,
      noTermRate: true
    }));

    // Validate immediately
    validateField('noTermRate', value);
  };

  // Validate individual field
  const validateField = (fieldName, value) => {
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      
      // Check specific field
      if (fieldName === 'minimumDeposit') {
        if (value === null || value === undefined || value === '') {
          newErrors.minimumDeposit = 'Vui lòng nhập số tiền gửi tối thiểu';
        } else {
          delete newErrors.minimumDeposit;
        }
      }
      
      if (fieldName === 'noTermRate') {
        if (value === null || value === undefined || value === '') {
          newErrors.noTermRate = 'Vui lòng nhập lãi suất không kỳ hạn';
        } else {
          delete newErrors.noTermRate;
        }
      }
      
      return newErrors;
    });
  };
  
  // Update application type and date
  const handleApplicationTypeChange = (type) => {
    setEditedRegulation({
      ...editedRegulation,
      applicationType: type,
      applicationDate: type === 'immediate' ? null : editedRegulation.applicationDate
    });
    
    // Track changes
    setChangedFields(prev => ({
      ...prev,
      applicationType: true
    }));
  };
  
  // Khi thay đổi applicationDate, nếu description chưa bị sửa thủ công thì tự động cập nhật lại
  const handleApplicationDateChange = (date) => {
    setEditedRegulation(prev => {
      let newDesc = prev.description;
      let dateStr = 'chưa xác định';
      if (prev.applicationType === 'immediate' || !prev.applicationType) {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        dateStr = `${day}/${month}/${year}`;
      } else if (date) {
        dateStr = date;
      }
      if (!isDescriptionManuallyChanged) {
        newDesc = `Quy định áp dụng từ ngày ${dateStr}`;
      }
      return {
        ...prev,
        applicationDate: date,
        description: newDesc
      };
    });
    setChangedFields(prev => ({
      ...prev,
      applicationDate: true
    }));
  };
  
  // Validate form before saving
  const validateForm = () => {
    const errors = {};
    
    // Check if at least one savings type is selected
    if (disabledSavingsTypes.length === editedRegulation.savingsTypes.length) {
      errors.savingsTypes = 'Vui lòng chọn ít nhất một loại sản phẩm tiết kiệm';
    }
    
    // Check if minimum deposit is entered
    if (editedRegulation.minimumDeposit === null || editedRegulation.minimumDeposit === undefined || editedRegulation.minimumDeposit === '') {
      errors.minimumDeposit = 'Vui lòng nhập số tiền gửi tối thiểu';
    }
    
    // Check if no term rate is entered
    if (editedRegulation.noTermRate === null || editedRegulation.noTermRate === undefined || editedRegulation.noTermRate === '') {
      errors.noTermRate = 'Vui lòng nhập lãi suất không kỳ hạn';
    }
    
    // Check if all interest rates are filled
    const activeSavingsTypes = editedRegulation.savingsTypes.filter(
      type => !disabledSavingsTypes.includes(type.id)
    );
    
    const emptyRates = [];
    
    activeSavingsTypes.forEach(type => {
      // Get deleted terms for this savings type
      const deletedTermsForType = deletedTerms[type.id] || [];
      
      // Get non-deleted terms
      const activeTerms = type.terms.filter(term => !deletedTermsForType.includes(term.id));
      
      // Get non-disabled frequencies for this type
      const activeFrequencies = editedRegulation.paymentFrequencies.filter(
        freq => !(type.disabledFrequencies || []).includes(freq.id)
      );
      
      activeTerms.forEach(term => {
        activeFrequencies.forEach(freq => {
          const rate = type.interestRates.find(
            r => r.termId === term.id && r.frequencyId === freq.id
          )?.rate;
          
          if (rate === null || rate === undefined || rate === '') {
            emptyRates.push(`${type.name} - ${term.months} tháng - ${freq.name}`);
          }
        });
      });
    });
    
    if (emptyRates.length > 0) {
      errors.interestRates = `Vui lòng nhập đầy đủ các mức lãi suất (còn ${emptyRates.length} ô trống)`;
    }
    
    // Check if any changes were actually made
    if (Object.keys(changedFields).length === 0) {
      errors.noChanges = 'Không có thay đổi nào được thực hiện';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Update handleSaveChanges to also handle deleted terms
  const handleSaveChanges = () => {
    if (!validateForm()) {
      // Show error notification when validation fails
      setNotification({
        show: true,
        type: 'error',
        message: 'Không thể lưu thay đổi',
        format: 'Vui lòng kiểm tra lại các trường bắt buộc và sửa lỗi trước khi lưu.'
      });
      return;
    }
    
    // Create a copy for the comparison modal without modifying editedRegulation
    const comparisonRegulation = JSON.parse(JSON.stringify(editedRegulation));
    
    // Remove disabled savings types from the comparison regulation
    if (disabledSavingsTypes.length > 0) {
      comparisonRegulation.savingsTypes = comparisonRegulation.savingsTypes.filter(
        type => !disabledSavingsTypes.includes(type.id)
      );
    }
    
    // For each savings type, filter out terms that are marked for deletion
    comparisonRegulation.savingsTypes.forEach(savingsType => {
      const deletedTermsForType = deletedTerms[savingsType.id] || [];
      
      if (deletedTermsForType.length > 0) {
        // Filter the terms array for each savings type
        savingsType.terms = savingsType.terms.filter(term => !deletedTermsForType.includes(term.id));
        
        // Also filter interest rates that reference deleted terms
        savingsType.interestRates = savingsType.interestRates.filter(
          rate => !deletedTermsForType.includes(rate.termId)
        );
      }
      
      // Make sure disabledFrequencies is preserved
      if (!savingsType.disabledFrequencies) {
        savingsType.disabledFrequencies = [];
      }
      
      // Filter out interest rates for disabled frequencies
      if (savingsType.disabledFrequencies.length > 0) {
        savingsType.interestRates = savingsType.interestRates.filter(
          rate => !savingsType.disabledFrequencies.includes(rate.frequencyId)
        );
      }
    });
    
    // Show the comparison modal with the comparison regulation
    setShowComparisonModal(true);
    // Store the comparison regulation in a separate state variable
    setComparisonRegulation(comparisonRegulation);
  };
  
  // Add state for comparison regulation
  const [comparisonRegulation, setComparisonRegulation] = useState(null);
  
  // Confirm changes
  const handleConfirmChanges = () => {
    // Apply the comparison regulation to the current regulation
    setCurrentRegulation({ ...comparisonRegulation });
    // Also update the edited regulation to match
    setEditedRegulation({ ...comparisonRegulation });
    
    // Track removed savings types
    const currentTypeIds = currentRegulation.savingsTypes.map(type => type.id);
    const newTypeIds = comparisonRegulation.savingsTypes.map(type => type.id);
    
    // Find types that were in current but not in new regulation
    const removedTypes = currentRegulation.savingsTypes.filter(
      type => !newTypeIds.includes(type.id)
    );
    
    // Add these to removedSavingsTypes
    if (removedTypes.length > 0) {
      setRemovedSavingsTypes(prev => {
        const existingIds = prev.map(type => type.id);
        const newRemovedTypes = removedTypes.filter(type => !existingIds.includes(type.id));
        return [...prev, ...newRemovedTypes];
      });
    }
    
    // Show success notification
    setNotification({
      show: true,
      type: 'success',
      message: 'Cập nhật quy định lãi suất thành công',
      format: 'Quy định mới đã được lưu và sẽ được áp dụng theo thời gian đã chọn.'
    });
    
    // Exit edit mode
    setIsEditing(false);
    
    // Close comparison modal
    setShowComparisonModal(false);

  };

  // Get disabled frequencies for the active savings type
  const getDisabledFrequenciesForActiveType = () => {
    if (!activeSavingsType) return [];
    
    const activeType = (isEditing ? editedRegulation : currentRegulation).savingsTypes
      .find(type => type.id === activeSavingsType);
    
    return activeType?.disabledFrequencies || [];
  };
  
  // Check if the active savings type is flexible
  const isActiveTypeFlexible = () => {
    return activeSavingsType === 'flexible';
  };

  return (
    <div className="container mx-auto p-3 md:p-6 max-w-7xl">
      
      
      {/* Edit mode controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          {!isEditing && (
            <>
              <h2 className="text-xl font-bold text-gray-800">Quy định lãi suất hiện hành</h2>
              <p className="text-sm text-gray-600 flex items-center mt-1">
                <User size={14} className="mr-1 flex-shrink-0" />
                Người tạo: <Skeleton isLoading={isLoadingRegulation} width="w-24" height="h-4" className="inline-block mx-1">
                  {currentRegulation.creator?.name || 'Không xác định'}
                </Skeleton> (<Skeleton isLoading={isLoadingRegulation} width="w-20" height="h-4" className="inline-block">
                  {currentRegulation.createdAt || 'Không xác định'}
                </Skeleton>)
              </p>
            </>
          )}
          {isEditing && (
            <h2 className="text-xl font-bold text-gray-800">Chỉnh sửa quy định lãi suất</h2>
          )}
          {/* Display the current regulations summary */}
          {!isEditing && (
            <CurrentRegulationSummary regulation={currentRegulation} isLoading={isLoadingRegulation} />
          )}
        </div>
        
        <div className="hidden sm:block">
          {!isEditing ? (
            <motion.button
              whileHover={{ scale: 1.08, boxShadow: '0 0 16px rgba(0,170,255,0.18)' }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsEditing(true)}
              className="px-6 py-2.5 md:mr-40 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-[0_4px_20px_rgba(0,170,255,0.13)] flex items-center font-semibold tracking-wide gap-2"
            >
              <motion.span
                whileHover={{ rotate: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="inline-flex"
              >
                <Edit2 size={18} />
              </motion.span>
              <Skeleton isLoading={isLoadingRegulation} width="w-16" height="h-5" className="inline-block">
                Chỉnh sửa
              </Skeleton>
            </motion.button>
          ) : (
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.06, boxShadow: '0 0 12px rgba(0,0,0,0.08)' }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  setIsEditing(false);
                  setDisabledSavingsTypes([]);
                  setDeletedTerms({});
                  setChangedFields({});
                  setEditedRegulation(JSON.parse(JSON.stringify(currentRegulation)));
                }}
                className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl shadow-sm hover:bg-gray-200 font-semibold tracking-wide"
              >
                Hủy
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.08, boxShadow: '0 0 16px rgba(0,170,255,0.18)' }}
                whileTap={{ scale: 0.96 }}
                onClick={handleSaveChanges}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-[0_4px_20px_rgba(0,170,255,0.13)] flex items-center font-semibold tracking-wide gap-2"
              >
                <motion.span
                  whileHover={{ rotate: -10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="inline-flex"
                >
                  <Save size={18} />
                </motion.span>
                Lưu thay đổi
              </motion.button>
            </div>
          )}
        </div>
      </div>
      
      {/* Edit settings */}
      {isEditing && (
        <div className="bg-gray-50 p-2 md:p-6 rounded-xl">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Cấu hình quy định lãi suất</h3>
          
          {/* Application date selector */}
          <ApplicationDateSelector
            applicationType={editedRegulation.applicationType || 'immediate'}
            applicationDate={editedRegulation.applicationDate}
            onApplicationTypeChange={handleApplicationTypeChange}
            onApplicationDateChange={handleApplicationDateChange}
          />
          
          {/* General settings */}
          <GeneralSettings
            minimumDeposit={editedRegulation.minimumDeposit}
            noTermRate={editedRegulation.noTermRate}
            onMinimumDepositChange={handleMinimumDepositChange}
            onNoTermRateChange={handleNoTermRateChange}
            highlightChanges={changedFields}
            errors={validationErrors}
          />
          
          {/* Savings type selector */}
          <SavingsTypeSelector
            allSavingsTypes={allSavingsTypes}
            activeSavingsTypes={editedRegulation.savingsTypes.map(t => t.id)}
            disabledSavingsTypes={disabledSavingsTypes}
            onToggleSavingsType={handleToggleSavingsType}
            error={validationErrors.savingsTypes}
            removedSavingsTypes={removedSavingsTypes}
            onAddRemovedSavingsType={handleAddRemovedSavingsType}
          />
          
          {/* Description input */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-6 bg-gradient-to-r from-indigo-50 via-blue-50 to-white rounded-2xl border-2 border-transparent hover:border-indigo-300 shadow-[0_2px_16px_rgba(99,102,241,0.08)] p-5 group transition-all duration-300 relative"
          >
            <label className="block text-base font-semibold text-indigo-700 mb-2 flex items-center gap-2">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-indigo-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 17l4 4 4-4m0-5V3m-8 9v6a2 2 0 002 2h4a2 2 0 002-2v-6" /></svg>
              Mô tả quy định
            </label>
            <motion.textarea
              className="w-full border-2 border-indigo-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 text-base bg-white/80 shadow-inner transition-all duration-200 resize-none font-medium text-indigo-800 placeholder-indigo-300"
              rows={2}
              placeholder="Nhập mô tả ngắn gọn về quy định lãi suất..."
              value={editedRegulation.description || ''}
              onChange={e => {
                setEditedRegulation({ ...editedRegulation, description: e.target.value });
                setChangedFields(prev => ({ ...prev, description: true }));
                setIsDescriptionManuallyChanged(true);
              }}
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileFocus={{ borderColor: '#6366f1', boxShadow: '0 0 0 2px #6366f1' }}
              whileHover={{ borderColor: '#6366f1' }}
            />
          </motion.div>
        </div>
      )}
      
      {/* Savings type toggle */}
      {((currentRegulation.savingsTypes.length > 1 && !isEditing) || 
        (editedRegulation.savingsTypes.filter(t => !disabledSavingsTypes.includes(t.id)).length > 1 && isEditing)) && (
        <div className="mb-6 flex justify-center">
          {isLoadingRegulation ? (
            <SavingsTypeToggleShimmer />
          ) : (
            <SavingsTypeToggle
              savingsTypes={isEditing 
                ? editedRegulation.savingsTypes.filter(t => !disabledSavingsTypes.includes(t.id))
                : currentRegulation.savingsTypes
              }
              activeSavingsType={activeSavingsType}
              onToggle={setActiveSavingsType}
            />
          )}
        </div>
      )}
      
      {/* Interest rate table */}
      {activeSavingsTypeDetails && (
        <div className="relative">
                   
          {isLoadingRegulation ? (
            <InterestRateTableShimmer />
          ) : (
            <InterestRateTable
              savingsType={activeSavingsTypeDetails.name}
              savingsTypeId={activeSavingsType}
              terms={activeSavingsTypeDetails.terms}
              interestRates={activeSavingsTypeDetails.interestRates}
              paymentFrequencies={isEditing 
                ? editedRegulation.paymentFrequencies
                : currentRegulation.paymentFrequencies
              }
              disabledFrequencies={getDisabledFrequenciesForActiveType()}
              isEditing={isEditing}
              onRateChange={handleRateChange}
              onAddTerm={handleAddTerm}
              onRemoveTerm={handleRemoveTerm}
              onToggleFrequency={handleToggleFrequency}
              highlightChanges={changedFields.interestRates || {}}
              error={validationErrors.interestRates}
              deletedTerms={deletedTerms[activeSavingsType] || []}
              onRestoreTerm={handleRestoreTerm}
              isFlexibleType={isActiveTypeFlexible()}
            />
          )}
        </div>
      )}
      
      {/* Mobile fixed bottom bar for edit controls */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
        <div className="container mx-auto flex justify-center">
          {!isEditing ? (
            <motion.button
              whileHover={{ scale: 1.08, boxShadow: '0 0 16px rgba(0,170,255,0.18)' }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsEditing(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-[0_4px_20px_rgba(0,170,255,0.13)] flex items-center w-full justify-center font-semibold tracking-wide gap-2"
            >
              <motion.span
                whileHover={{ rotate: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="inline-flex"
              >
                <Edit2 size={20} />
              </motion.span>
              Chỉnh sửa
            </motion.button>
          ) : (
            <div className="flex gap-3 w-full">
              <motion.button
                whileHover={{ scale: 1.06, boxShadow: '0 0 12px rgba(0,0,0,0.08)' }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  setIsEditing(false);
                  setDisabledSavingsTypes([]);
                  setDeletedTerms({});
                  setChangedFields({});
                  setEditedRegulation(JSON.parse(JSON.stringify(currentRegulation)));
                }}
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl shadow-sm hover:bg-gray-200 flex-1 font-semibold tracking-wide"
              >
                Hủy
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.08, boxShadow: '0 0 16px rgba(0,170,255,0.18)' }}
                whileTap={{ scale: 0.96 }}
                onClick={handleSaveChanges}
                className="px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-[0_4px_20px_rgba(0,170,255,0.13)] flex items-center justify-center flex-1 font-semibold tracking-wide gap-2"
              >
                <motion.span
                  whileHover={{ rotate: -10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="inline-flex"
                >
                  <Save size={20} />
                </motion.span>
                Lưu thay đổi
              </motion.button>
            </div>
          )}
        </div>
      </div>
      
      {/* Add padding at the bottom when in mobile edit mode to prevent content from being hidden behind the fixed bar */}
      {isEditing && <div className="sm:hidden h-20"></div>}
      
      {/* Comparison modal */}
      <RegulationComparisonModal
        isOpen={showComparisonModal}
        onClose={() => setShowComparisonModal(false)}
        onConfirm={handleConfirmChanges}
        newRegulation={comparisonRegulation}
        currentRegulation={currentRegulation}
        changedFields={changedFields}
        creator={currentUser}
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

export default InterestRateRegulations;