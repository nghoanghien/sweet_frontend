import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Edit,
  User,
  MapPin,
  Plus,
  Download,
  Save,
  Calendar
} from 'lucide-react';
import SearchFilterBar from '@/components/common/SearchFilterBar';
import DataTable from '../../../components/common/DataTable';
import SwipeConfirmationModal from '../../../components/modals/ConfirmationModal/SwipeConfirmationModal';
import DataTableShimmer from '../../../components/ui/custom/shimmer-types/DataTableShimmer';
import SearchFilterBarShimmer from '../../../components/ui/custom/shimmer-types/SearchFilterBarShimmer';
import FormShimmer from '../../../components/ui/custom/shimmer-types/FormShimmer';
import PaymentAccountsNew from '../../../components/modules/payment-account/PaymentAccountsNew';
import SavingsAccounts from '../../../components/modules/saving-account/SavingsAccounts';
import CalendarDatePicker from '../../../components/ui/CalendarDatePicker';
import ExportDataModal from '../../../components/common/ExportDataModal';
import ExportNotification from '../../../components/common/ExportNotification';
import InputField from '../../../components/ui/custom/Inputfield';
import AddressFields from '../../../components/ui/custom/AddressFields';
import StatusBadge from '../../../components/ui/custom/StatusBadge';
import ModalHeader from '../../../components/ui/custom/ModalHeader';
import AnimatedTabNavigation from '../../../components/ui/custom/AnimatedTabNavigation';
import { useAllCustomers, useUpdateCustomer } from '@/hooks/useCustomers';
import { formatDate } from '@/utils/saving-account';
import { createNewCustomer } from '@/utils/createNewCustomer';

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
      key: 'dateOfBirth',
      label: 'Ngày sinh',
      sortable: true,
      formatter: (value) => formatDate(value),
      className: 'hidden sm:table-cell' // Ẩn trên mobile
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      className: 'hidden sm:table-cell' // Ẩn trên mobile
    },
    {
      key: 'phoneNumber',
      label: 'Số điện thoại',
      sortable: true,
      className: 'hidden sm:table-cell' // Ẩn trên mobile
    },
    {
      key: 'idCardNumber',
      label: 'Số CCCD',
      sortable: true,
      className: 'hidden sm:table-cell' // Ẩn trên mobile
    },
    {
      key: 'accountStatus',
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
      </>
    );
  };

  // Remove mock data - now using real data from API

  const { allCustomers, isLoading, error, refreshCustomers } = useAllCustomers();
  const { updateCustomerData, isLoading: isUpdatingCustomer, error: updateError, success: updateSuccess, resetState: resetUpdateState } = useUpdateCustomer();

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
    idCardNumber: '',
    email: '',
    phoneNumber: ''
  });

  // For new customer
  const [newCustomer, setNewCustomer] = useState({
    fullName: '',
    dateOfBirth: '',
    idCardNumber: '',
    email: '',
    phoneNumber: '',
    permanentAddress: {
      province: '',
      district: '',
      ward: '',
      streetName: '',
      houseNumber: ''
    },
    contactAddress: {
      province: '',
      district: '',
      ward: '',
      streetName: '',
      houseNumber: ''
    }
  });

  // State for contact address visibility
  const [isContactAddressSameAsPermanent, setIsContactAddressSameAsPermanent] = useState(false);
  const [showContactAddressForm, setShowContactAddressForm] = useState(true);

  const [editedCustomer, setEditedCustomer] = useState(null);

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Add state for active tab in customer details modal
  const [activeDetailTab, setActiveDetailTab] = useState('information');

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
  const [isMobile, setIsMobile] = useState(false);

  // Loading states
  const [isLoadingForm, setIsLoadingForm] = useState(true);

  // Check if viewing on mobile device
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Simulate loading states
  useEffect(() => {
    // Simulate form loading
    setTimeout(() => {
      setIsLoadingForm(false);
    }, 8000);
  }, []);

  // useEffect to filter and sort customers
  useEffect(() => {
    let result = [...allCustomers];

    // Apply search filtering across all search fields
    result = result.filter(customer => {
      // Check each search field
      const nameMatch = searchFields.fullName === '' ||
        customer.fullName.toLowerCase().includes(searchFields.fullName.toLowerCase());

      const idMatch = searchFields.idCardNumber === '' ||
        customer.idCardNumber.toLowerCase().includes(searchFields.idCardNumber.toLowerCase());

      const emailMatch = searchFields.email === '' ||
        customer.email.toLowerCase().includes(searchFields.email.toLowerCase());

      const phoneMatch = searchFields.phoneNumber === '' ||
        customer.phoneNumber.toLowerCase().includes(searchFields.phoneNumber.toLowerCase());

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
  }, [allCustomers, searchFields, sortField, sortDirection]);

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
            dateOfBirth: '',
            idCardNumber: '',
            email: '',
            phoneNumber: '',
            permanentAddress: {
              province: '',
              district: '',
              ward: '',
              streetName: '',
              houseNumber: ''
            },
            contactAddress: {
              province: '',
              district: '',
              ward: '',
              streetName: '',
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
      idCardNumber: '',
      email: '',
      phoneNumber: ''
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

  // Enable edit mode
  const enableEditMode = (customer) => {
    if (!isModalOpen) {
      setSelectedCustomer(customer);
      setIsModalOpen(true);
    }
    setEditedCustomer({
      ...customer,
      contactAddress: { ...customer.contactAddress },
      phoneNumber: customer.phoneNumber,
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
  const saveCustomerChanges = async () => {
    // Validate all fields before saving
    const fieldsToValidate = ['phoneNumber'];
    const addressFields = ['province', 'district', 'ward', 'streetName', 'houseNumber'];

    let isValid = true;
    const newErrors = {};

    // Validate phone
    const phoneError = validateField('phoneNumber', editedCustomer.phoneNumber);
    if (phoneError) {
      newErrors.phoneNumber = phoneError;
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
      try {
        // Tạo đối tượng User từ editedCustomer
        const updatedUser = {
          fullName: editedCustomer.fullName,
          dateOfBirth: editedCustomer.dateOfBirth,
          idCardNumber: editedCustomer.idCardNumber,
          email: editedCustomer.email,
          phoneNumber: editedCustomer.phoneNumber,
          permanentAddress: editedCustomer.permanentAddress,
          contactAddress: editedCustomer.contactAddress
        };

        // Gọi API cập nhật khách hàng
        await updateCustomerData(updatedUser, editedCustomer.customerID);
        
        // Cập nhật state cục bộ
        setIsEditMode(false);
        setSelectedCustomer(prev => ({
          ...prev,
          contactAddress: editedCustomer.contactAddress,
          phoneNumber: editedCustomer.phoneNumber,
          status: editedCustomer.status
        }));

        // Refresh danh sách khách hàng
        await refreshCustomers();

        // Hiển thị thông báo thành công
        setExportNotification({
          visible: true,
          type: 'success',
          message: 'Lưu thay đổi thành công!',
          format: 'Hệ thống đã cập nhật thông tin khách hàng'
        });

        // Tự động ẩn thông báo sau 5 giây
        setTimeout(() => {
          setExportNotification(prev => ({ ...prev, visible: false }));
        }, 5000);
      } catch (error) {
        console.error('Lỗi khi cập nhật khách hàng:', error);
        // Hiển thị thông báo lỗi
        setExportNotification({
          visible: true,
          type: 'error',
          message: 'Không thể lưu thay đổi!',
          format: 'Có lỗi khi cập nhật thông tin khách hàng. Vui lòng thử lại!'
        });

        // Tự động ẩn thông báo sau 5 giây
        setTimeout(() => {
          setExportNotification(prev => ({ ...prev, visible: false }));
        }, 5000);
      }
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
        setExportNotification(prev => ({ ...prev, visible: false }));
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
      setIsLoadingForm(true);
      setTimeout(() => {
        setIsLoadingForm(false);
      }, 1500)
      // If opening, reset the form first then open the modal
      setNewCustomer({
        fullName: '',
        dateOfBirth: '',
        idCardNumber: '',
        email: '',
        phoneNumber: '',
        permanentAddress: {
          province: '',
          district: '',
          ward: '',
          streetName: '',
          houseNumber: ''
        },
        contactAddress: {
          province: '',
          district: '',
          ward: '',
          streetName: '',
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
    setIsContactAddressSameAsPermanent(true);
    setShowContactAddressForm(false);
  };

  // Show different contact address form
  const showDifferentContactAddress = () => {
    setNewCustomer(prev => ({
      ...prev,
      contactAddress: {
        province: '',
        district: '',
        ward: '',
        streetName: '',
        houseNumber: ''
      }
    }));
    setIsContactAddressSameAsPermanent(false);
    setShowContactAddressForm(true);
  };

  // Validation functions
  const validateField = (field, value) => {
    if (field === 'fullName') {
      if (!value.trim()) return 'Họ tên không được để trống';
      if (value.trim().length < 3) return 'Họ tên phải có ít nhất 3 ký tự';
      return '';
    }

    if (field === 'dateOfBirth') {
      if (!value.trim()) return 'Ngày sinh không được để trống';
      const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
      if (!dateRegex.test(value)) return 'Ngày sinh không đúng định dạng DD/MM/YYYY';

      // Validate age > 18
      if (dateRegex.test(value)) {
        const parts = value.split('/');
        const dateOfBirth = new Date(parts[2], parts[1] - 1, parts[0]);
        const today = new Date();
        let age = today.getFullYear() - dateOfBirth.getFullYear();
        const monthDiff = today.getMonth() - dateOfBirth.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
          age--;
        }

        if (age < 18) {
          return 'Khách hàng phải từ 18 tuổi trở lên';
        }
      }

      return '';
    }

    if (field === 'idCardNumber') {
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

    if (field === 'phoneNumber') {
      if (!value.trim()) return 'Số điện thoại không được để trống';
      if (!/^0\d{9,10}$/.test(value)) return 'Số điện thoại phải bắt đầu bằng số 0 và có 10-11 chữ số';
      return '';
    }

    if (field.includes('province') || field.includes('district') || field.includes('ward') || field.includes('streetName')) {
      if (!value.trim()) return 'Thông tin địa chỉ không được để trống';
      return '';
    }

    if (field.includes('houseNumber')) {
      if (!value.trim()) return 'Số nhà không được để trống';
      // Kiểm tra có chứa ít nhất một chữ số
      if (!/\d/.test(value)) return 'Số nhà phải chứa ít nhất một chữ số';
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
    const personalFields = ['fullName', 'dateOfBirth', 'idCardNumber', 'email', 'phoneNumber'];
    personalFields.forEach(field => {
      const error = validateField(field, newCustomer[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    // Validate permanent address
    const addressPrefixes = ['permanentAddress', 'contactAddress'];
    const addressFields = ['province', 'district', 'ward', 'streetName', 'houseNumber'];

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
      const newId = allCustomers.length > 0 ? Math.max(...allCustomers.map(c => parseInt(c.customerID))) + 1 : 1;

      // Calculate age from birthDate
      const birthDateParts = newCustomer.dateOfBirth.split('/');
      const birthYear = parseInt(birthDateParts[2]);
      const currentYear = new Date().getFullYear();
      const age = currentYear - birthYear;

      // Create new customer object with current date as registration date
      const today = new Date();
      const registrationDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

      const customerToAdd = {
        customerID: null,
        fullName: newCustomer.fullName,
        dateOfBirth: new Date(newCustomer.dateOfBirth.split('/').reverse().join('-')),
        age: age,
        idCardNumber: newCustomer.idCardNumber,
        email: newCustomer.email,
        phoneNumber: newCustomer.phoneNumber,
        permanentAddress: { ...newCustomer.permanentAddress },
        contactAddress: { ...newCustomer.contactAddress },
        registrationDate: new Date(),
        accountStatus: 'active',
        password: 123456,
      };

      // Hiển thị modal xác nhận trước khi thêm khách hàng
      openConfirmationModal({
        title: 'Xác nhận thêm khách hàng mới',
        message: 'Bạn có chắc chắn muốn thêm khách hàng mới này không?',
        confirmText: 'Quẹt để thêm khách hàng',
        confirmDetails: {
          'Họ tên': newCustomer.fullName,
          'Ngày sinh': newCustomer.dateOfBirth,
          'Số CCCD/CMND': newCustomer.idCardNumber,
          'Email': newCustomer.email,
          'Số điện thoại': newCustomer.phoneNumber
        },
        type: 'add',
        onConfirm: () => {
          // Set processing state to true
          setConfirmationProcessing(true);

          // Simulate API call with a delay
          setTimeout(() => {
            try {
              // TODO: Call API to add new customer
              // For now, just show success notification
              const createUser = async (customerToAdd) => {
                const result = await createNewCustomer(customerToAdd);
                // Refresh customer list
                refreshCustomers();
                setExportNotification({
                  visible: true,
                  type: result.success ? 'success' : 'error',
                  message: result.success
                    ? 'Thêm khách hàng thành công!'
                    : 'Thêm khách hàng thất bại!',
                  format: result.message
                });
              }
              createUser(customerToAdd);

              // Reset form states
              setIsContactAddressSameAsPermanent(false);
              setShowContactAddressForm(true);

              // Close modals
              closeConfirmationModal();
              toggleAddCustomerModal();

              // Tự động ẩn thông báo sau 5 giây
              setTimeout(() => {
                setExportNotification(prev => ({ ...prev, visible: false }));
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

  // Add state for export data modal
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
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
      setExportNotification(prev => ({ ...prev, visible: false }));
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
              onClick={toggleAddCustomerModal}
              className="group flex items-center space-x-2 px-4 py-2.5 md:px-5 md:py-3 bg-gradient-to-r from-[#7226FF] to-[#F042FF] bg-size-200 bg-pos-0 hover:bg-pos-100 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus
                size={16}
                className="text-white group-hover:scale-110 transition-transform duration-200"
              />
              <span className="font-medium text-sm md:font-semibold md:text-md">
                Thêm khách hàng
              </span>
            </motion.button>
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
          {isLoading ? (
            <SearchFilterBarShimmer />
          ) : (
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
          )}
        </motion.div>
      </div>

      {/* Customers table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-6"
      >
        {isLoading ? (
          <DataTableShimmer
            rowCount={10}
            columnCount={6}
            showFilter={true}
            headerClassName="bg-gradient-to-r from-indigo-600 to-blue-500"
          />
        ) : (
          <DataTable
            data={filteredCustomers}
            columns={customerColumns}
            sortField={sortField}
            sortDirection={sortDirection}
            handleSort={handleSort}
            onRowClick={openCustomerDetail}
            onEditClick={enableEditMode}
            keyField="customerID"
            className="mb-6"
            headerClassName="bg-gradient-to-r from-indigo-600 to-blue-500 text-white"
            renderActions={renderActions}
            emptyMessage="Không tìm thấy khách hàng nào phù hợp với điều kiện tìm kiếm"
            // Bộ lọc trạng thái
            statusFilters={{
              accountStatus: ['active', 'disabled']
            }}
            changeTableData={setExporData}
            // Bộ lọc khoảng thời gian
            dateRangeFilters={{
              registrationDate: { label: 'Ngày đăng ký' },
              dateOfBirth: { label: 'Ngày sinh' }
            }}
          />
        )}
      </motion.div>



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
              layoutId={selectedCustomer ? `row-${selectedCustomer.customerID}` : ""}
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
                                value={selectedCustomer.customerID}
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
                                value={selectedCustomer.dateOfBirth}
                                onChange={() => { }}
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
                                value={selectedCustomer.idCardNumber}
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
                                value={selectedCustomer.phoneNumber}
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
                                      status={selectedCustomer.accountStatus}
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
                              onChange={() => { }}
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
                              onChange={() => { }}
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
                            onChange={() => { }}
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
                        customerId={selectedCustomer.customerID}
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
                        customerId={selectedCustomer.customerID}
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
                                value={editedCustomer.phoneNumber}
                                onChange={(value) =>
                                  handleEditChange("phoneNumber", value)
                                }
                                placeholder="Nhập số điện thoại..."
                                error={errors.phoneNumber}
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
                              className="px-6 py-3 font-semibold bg-gray-300 text-gray-600 rounded-xl hover:bg-gray-400 transition-all duration-300"
                            >
                              Hủy bỏ
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={saveCustomerChanges}
                              disabled={isUpdatingCustomer}
                              className={`px-6 py-3 font-semibold rounded-xl transition-all duration-300 flex items-center ${
                                isUpdatingCustomer 
                                  ? 'bg-gray-400 cursor-not-allowed' 
                                  : 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white hover:shadow-lg'
                              }`}
                            >
                              {isUpdatingCustomer ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                  Đang lưu...
                                </>
                              ) : (
                                <>
                                  <Save size={16} className="mr-2" />
                                  Lưu thay đổi
                                </>
                              )}
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
                              className="px-6 py-3 bg-gray-300 font-semibold text-gray-600 rounded-xl hover:bg-gray-400 transition-all duration-300"
                            >
                              Đóng
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => enableEditMode(selectedCustomer)}
                              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 font-semibold text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center"
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
                  dateOfBirth: "",
                  idCardNumber: "",
                  email: "",
                  phoneNumber: "",
                  permanentAddress: {
                    province: "",
                    district: "",
                    ward: "",
                    streetName: "",
                    houseNumber: "",
                  },
                  contactAddress: {
                    province: "",
                    district: "",
                    ward: "",
                    streetName: "",
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
              {isLoadingForm ? (
                <FormShimmer />
              ) : (
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
                            value={newCustomer.dateOfBirth}
                            onChange={(val) =>
                              handleNewCustomerChange("dateOfBirth", val)
                            }
                            onBlur={() => handleFieldBlur("dateOfBirth")}
                            error={errors.dateOfBirth}
                            required={true}
                          />
                          <InputField
                            label="Số CCCD/CMND"
                            placeholder="Nhập số CCCD/CMND..."
                            value={newCustomer.idCardNumber}
                            onChange={(val) =>
                              handleNewCustomerChange("idCardNumber", val)
                            }
                            onBlur={() => handleFieldBlur("idCardNumber")}
                            error={errors.idCardNumber}
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
                            value={newCustomer.phoneNumber}
                            onChange={(val) =>
                              handleNewCustomerChange("phoneNumber", val)
                            }
                            onBlur={() => handleFieldBlur("phoneNumber")}
                            error={errors.phoneNumber}
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
                          {!isContactAddressSameAsPermanent ? (
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
                          ) : (
                            <motion.button
                              type="button"
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={showDifferentContactAddress}
                              className="group px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 border-0 hover:from-orange-400 hover:to-red-500 flex items-center gap-2"
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
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                ></path>
                              </svg>
                              <span className="text-sm">
                                Địa chỉ liên lạc khác
                              </span>
                            </motion.button>
                          )}
                        </div>

                        {isContactAddressSameAsPermanent ? (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 text-center"
                          >
                            <div className="flex items-center justify-center gap-3 text-green-700">
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                              </svg>
                              <span className="text-lg font-semibold">
                                Địa chỉ liên lạc giống với địa chỉ thường trú
                              </span>
                            </div>
                            <p className="text-green-600 mt-2">
                              Hệ thống sẽ sử dụng địa chỉ thường trú làm địa chỉ liên lạc
                            </p>
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <AddressFields
                              prefix="contactAddress"
                              values={newCustomer.contactAddress}
                              onChange={handleNewCustomerChange}
                              errors={errors}
                              required
                              onBlur={handleFieldBlur}
                            />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  </form>
                </div>
              )}

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
                      whileHover={!isLoadingForm ? { scale: 1.05 } : {}}
                      whileTap={!isLoadingForm ? { scale: 0.95 } : {}}
                      onClick={!isLoadingForm ? addNewCustomer : undefined}
                      disabled={isLoadingForm}
                      className={`px-4 md:px-6 py-3 font-medium rounded-xl transition-all duration-500 flex items-center ${isLoadingForm
                          ? 'bg-gray-400 text-gray-300 cursor-not-allowed'
                          : 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white hover:shadow-lg'
                        }`}
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
          "customerID",
          "fullName",
          "dateOfBirth",
          "age",
          "idCardNumber",
          "email",
          "phoneNumber",
          "permanentAddress",
          "contactAddress",
          "registrationDate",
          "accountStatus",
        ]}
        columnLabels={{
          customerID: "Mã khách hàng",
          fullName: "Họ và tên",
          dateOfBirth: "Ngày sinh",
          age: "Tuổi",
          idCardNumber: "Số CCCD/CMND",
          email: "Email",
          phoneNumber: "Số điện thoại",
          permanentAddress: "Địa chỉ thường trú",
          contactAddress: "Địa chỉ liên lạc",
          registrationDate: "Ngày đăng ký",
          accountStatus: "Trạng thái",
        }}
        formatData={(value, column) => {
          if (column === "accountStatus")
            return value === "active" ? "Hoạt động" : "Vô hiệu hóa";
          if (column === "permanentAddress" || column === "contactAddress") {
            if (!value) return "";
            return `${value.houseNumber} ${value.streetName}, ${value.ward}, ${value.district}, ${value.province}`;
          }
          if (column === 'dateOfBirth' || column === 'registrationDate') return formatDate(new Date(value));
          return value;
        }}
        customColumnCategories={{
          personal: ["customerID", "fullName", "dateOfBirth", "age", "idCardNumber"],
          contact: ["email", "phoneNumber"],
          address: ["permanentAddress", "contactAddress"],
          other: ["registrationDate", "accountStatus"],
        }}
        enableGrouping={true}
      />
    </div>
  );
}