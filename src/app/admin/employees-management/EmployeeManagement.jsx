import React, { useState, useEffect } from 'react';
  import { motion, AnimatePresence } from 'framer-motion';
  import { 
    Edit, 
    User, 
    MapPin, 
    Plus,
    Download,
    Lock,
    Unlock,
    Save,
    Calendar,
    FileText,
  } from 'lucide-react';
  import { SwipeConfirmationModal } from '@/components/ui';
  import CalendarDatePicker from '../../../components/ui/CalendarDatePicker';
  import ExportDataModal from '../../../components/common/ExportDataModal';
  import ExportNotification from '../../../components/common/ExportNotification';
  import InputField from '../../../components/ui/custom/Inputfield';
  import CustomSelect from '../../../components/ui/custom/CustomSelect';
  import AddressFields from '../../../components/ui/custom/AddressFields';
  import StatusBadge from '../../../components/ui/custom/StatusBadge';
  import SearchFilterBar from '../../../components/common/SearchFilterBar';
  import DataTable from '../../../components/common/DataTable';
  import ModalHeader from '../../../components/ui/custom/ModalHeader';
  import AnimatedTabNavigation from '../../../components/ui/custom/AnimatedTabNavigation';
  import EmployeeTransactionHistory from '../../../components/modules/employees-management/EmployeeTransactionHistory';

  export default function EmployeeManagement() {
    // State for employee data
    const [employees, setEmployees] = useState([
      {
        id: 1,
        code: 'NV000001',
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
        transactions: [
          {
            id: 1,
            type: 'incoming',
            description: 'Lương tháng 5/2023',
            date: '25/05/2023',
            amount: 15000000,
            channel: 'bank',
            note: 'Chuyển khoản lương tháng 5/2023'
          },
          {
            id: 2,
            type: 'incoming',
            description: 'Thưởng dự án ABC',
            date: '30/05/2023',
            amount: 5000000,
            channel: 'bank',
            note: 'Thưởng hoàn thành dự án ABC'
          },
          {
            id: 3,
            type: 'outgoing',
            description: 'Ứng lương',
            date: '10/06/2023',
            amount: 3000000,
            channel: 'cash',
            note: 'Ứng lương tháng 6/2023'
          },
          {
            id: 4,
            type: 'incoming',
            description: 'Lương tháng 6/2023',
            date: '25/06/2023',
            amount: 15000000,
            channel: 'bank',
            note: 'Chuyển khoản lương tháng 6/2023'
          },
          {
            id: 4,
            type: 'incoming',
            description: 'Lương tháng 6/2023',
            date: '25/06/2023',
            amount: 15000000,
            channel: 'bank',
            note: 'Chuyển khoản lương tháng 6/2023'
          }
        ],
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
        code: 'NV000002',
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
          province: 'Hồ Chí Minh',
          district: 'Quận 1',
          ward: 'Bến Nghé',
          street: 'Lê Lợi',
          houseNumber: '76'
        },
        transactions: [
          {
            id: 1,
            type: 'incoming',
            description: 'Lương tháng 5/2023',
            date: '25/05/2023',
            amount: 18000000,
            channel: 'bank',
            note: 'Chuyển khoản lương tháng 5/2023'
          },
          {
            id: 2,
            type: 'outgoing',
            description: 'Tạm ứng chi phí dự án',
            date: '05/06/2023',
            amount: 5000000,
            channel: 'cash',
            note: 'Tạm ứng chi phí dự án XYZ'
          },
          {
            id: 3,
            type: 'incoming',
            description: 'Hoàn ứng dự án',
            date: '20/06/2023',
            amount: 2000000,
            channel: 'cash',
            note: 'Hoàn ứng chi phí dự án XYZ không sử dụng hết'
          }
        ],
        registrationDate: '15/08/2022',
        status: 'active'
      },
      {
        id: 3,
        code: 'NV000003',
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
        code: 'NV000004',
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
        code: 'NV000005',
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
  
    // State for employee detail modal
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
    
    // State for search and filter
    const [filteredEmployees, setFilteredEmployees] = useState([]);
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
  
    // For new employee
    const [newEmployee, setNewEmployee] = useState({
      fullName: '',
      birthDate: '',
      idNumber: '',
      idIssueDate: '',
      idIssuePlace: '',
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
    
    const [editedEmployee, setEditedEmployee] = useState(null);
  
    // State for validation errors
    const [errors, setErrors] = useState({});
    
    // Add state for active tab in employee details modal
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
    const [navHovered, setNavHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
    const employeeColumns = [
      {
        key: 'fullName',
        label: 'Họ tên',
        sortable: true,
        formatter: (value, item) => (
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
              <User size={16} />
            </div>
            <div className="ml-3">
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
  
    const addEmployeeFormFields = [
      {
        name: 'fullName',
        type: 'text',
        label: 'Họ và tên',
        placeholder: 'Nhập họ và tên...',
        required: true,
        getValue: (data) => data.fullName || ''
      },
      {
        name: 'birthDate',
        type: 'date',
        label: 'Ngày sinh',
        placeholder: 'DD/MM/YYYY',
        required: true,
        getValue: (data) => data.birthDate || ''
      },
      {
        name: 'idNumber',
        type: 'text',
        label: 'Số CCCD/CMND',
        placeholder: 'Nhập số CCCD/CMND...',
        required: true,
        getValue: (data) => data.idNumber || ''
      },
      {
        name: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'example@email.com',
        required: true,
        getValue: (data) => data.email || ''
      },
      {
        name: 'phone',
        type: 'tel',
        label: 'Số điện thoại',
        placeholder: 'Nhập số điện thoại...',
        required: true,
        getValue: (data) => data.phone || ''
      },
      {
        name: 'permanentAddress',
        type: 'address',
        label: 'Địa chỉ thường trú',
        required: true,
        getValue: (data) => data.permanentAddress || {
          province: '',
          district: '',
          ward: '',
          street: '',
          houseNumber: ''
        }
      },
      {
        name: 'contactAddress',
        type: 'address',
        label: 'Địa chỉ liên lạc',
        required: true,
        getValue: (data) => data.contactAddress || {
          province: '',
          district: '',
          ward: '',
          street: '',
          houseNumber: ''
        }
      }
    ];  
  
    // Custom action buttons cho mỗi row
    const renderActions = (employee) => (
      <div className="flex justify-end space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            enableEditMode(employee);
          }}
          className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50"
        >
          <Edit size={16} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleEmployeeStatus(employee.id);
          }}
          className={`${
            employee.status === 'active' 
              ? 'text-orange-600 hover:text-orange-900 hover:bg-orange-50' 
              : 'text-green-600 hover:text-green-900 hover:bg-green-50'
          } p-1 rounded-full`}
        >
          {employee.status === 'active' ? <Lock size={16} /> : <Unlock size={16} />}
        </button>
      </div>
    );
    
    // Check if viewing on mobile device
    useEffect(() => {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      checkIfMobile();
      window.addEventListener('resize', checkIfMobile);
      return () => window.removeEventListener('resize', checkIfMobile);
    }, []);
  
    // useEffect to filter and sort employees
    useEffect(() => {
      let result = [...employees];
      
      // Apply search filtering across all search fields
      result = result.filter(employee => {
        // Check each search field
        const nameMatch = searchFields.fullName === '' || 
          employee.fullName.toLowerCase().includes(searchFields.fullName.toLowerCase());
        
        const idMatch = searchFields.idNumber === '' || 
          employee.idNumber.toLowerCase().includes(searchFields.idNumber.toLowerCase());
        
        const emailMatch = searchFields.email === '' || 
          (employee.email && employee.email.toLowerCase().includes(searchFields.email.toLowerCase()));
        
        const phoneMatch = searchFields.phone === '' || 
          employee.phone.toLowerCase().includes(searchFields.phone.toLowerCase());
        
        // Employee must match all non-empty search criteria
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
      
      setFilteredEmployees(result);
    }, [employees, searchFields, sortField, sortDirection]);
  
    // Add useEffect to reset form data when modal state changes
    useEffect(() => {
      if (!isModalOpen) {
        // Reset employee detail modal data when modal is closed
        setTimeout(() => {
          if (!isModalOpen) {
            setSelectedEmployee(null);
            setIsEditMode(false);
            setActiveDetailTab('information');
            setEditedEmployee(null);
          }
        }, 300); // Wait for animation to complete
      }
    }, [isModalOpen]);
  
    // Add useEffect to reset new employee form when add employee modal state changes
    useEffect(() => {
      if (!isAddEmployeeModalOpen) {
        // Reset add employee modal data when modal is closed
        setTimeout(() => {
          setNewEmployee({
            fullName: '',
            birthDate: '',
            idNumber: '',
            idIssueDate: '',
            idIssuePlace: '',
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
        }, 300);
      }
    }, [isAddEmployeeModalOpen]);
  
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
  
    // Open employee detail modal
    const openEmployeeDetail = (employee) => {
      setSelectedEmployee(employee);
      setIsModalOpen(true);
      setIsEditMode(false);
    };
  
    // Close employee detail modal
    const closeModal = () => {
      setIsModalOpen(false);
      setTimeout(() => {
        setSelectedEmployee(null);
        setIsEditMode(false);
        setActiveDetailTab('information');
        setEditedEmployee(null);
      }, 300); // Wait for animation to complete
    };
  
    // Toggle employee status (active/disabled)
    const toggleEmployeeStatus = (employeeId) => {
      const employee = employees.find(c => c.id === employeeId);
      if (!employee) return;
      
      const newStatus = employee.status === 'active' ? 'disabled' : 'active';
      const actionText = newStatus === 'active' ? 'kích hoạt' : 'vô hiệu hóa';
      
      openConfirmationModal({
        title: `Xác nhận ${actionText} tài khoản`,
        description: `Bạn có chắc chắn muốn ${actionText} tài khoản của nhân viên "${employee.fullName}" không?`,
        confirmText: `Quẹt để ${actionText}`,
        confirmDetails: {
          'Mã nhân viên': employee.code,
          'Họ tên': employee.fullName,
          'Trạng thái hiện tại': employee.status === 'active' ? 'Hoạt động' : 'Vô hiệu hóa',
          'Trạng thái mới': newStatus === 'active' ? 'Hoạt động' : 'Vô hiệu hóa',
        },
        type: `${newStatus === 'active' ? 'unlock' : 'warning'}`,
        onConfirm: () => {
          // Set processing state to true
          setConfirmationProcessing(true);
          
          // Simulate API call with a delay
          setTimeout(() => {
            try {
              // Update employee status
              setEmployees(prevEmployees => 
                prevEmployees.map(c => {
                  if (c.id === employeeId) {
                    return { ...c, status: newStatus };
                  }
                  return c;
                })
              );
              
              // Hiển thị thông báo thành công
              setExportNotification({
                visible: true,
                type: 'success',
                message: `${newStatus === 'active' ? 'Kích hoạt' : 'Vô hiệu hóa'} nhân viên thành công!`,
                format: `${newStatus === 'active' ? 'Kích hoạt' : 'Vô hiệu hóa'} nhân viên thành công!`
              });
              
              // Tự động ẩn thông báo sau 5 giây
              setTimeout(() => {
                setExportNotification(prev => ({...prev, visible: false}));
              }, 5000);
              
              // Reset processing state and close modal
              setConfirmationProcessing(false);
              closeConfirmationModal();
            } catch (error) {
              console.error('Error updating employee status:', error);
              
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
    };
  
    // Enable edit mode for an employee
    const enableEditMode = (employee) => {
      setSelectedEmployee(employee);
      setEditedEmployee({
        ...employee,
        birthDate: employee.birthDate || '',
        idIssueDate: employee.idIssueDate || '',
        permanentAddress: {
          province: employee.permanentAddress?.province || '',
          district: employee.permanentAddress?.district || '',
          ward: employee.permanentAddress?.ward || '',
          street: employee.permanentAddress?.street || '',
          houseNumber: employee.permanentAddress?.houseNumber || '',
        },
        contactAddress: {
          province: employee.contactAddress?.province || '',
          district: employee.contactAddress?.district || '',
          ward: employee.contactAddress?.ward || '',
          street: employee.contactAddress?.street || '',
          houseNumber: employee.contactAddress?.houseNumber || '',
        }
      });
      setIsEditMode(true);
      setIsModalOpen(true);
      setActiveDetailTab('information');
    };
  
    // Cancel edit mode and reset form
    const cancelEdit = () => {
      setIsEditMode(false);
      setEditedEmployee(null);
      setErrors({});
    };
  
    // Handle form field changes
    const handleFormChange = (field, value) => {
      setEditedEmployee(prev => {
        // Handle nested fields (for address)
        if (field.includes('.')) {
          const [parent, child] = field.split('.');
          return {
            ...prev,
            [parent]: {
              ...prev[parent],
              [child]: value
            }
          };
        }
        // Handle regular fields
        return {
          ...prev,
          [field]: value
        };
      });
    };
  
    // Save edited employee with validation
    const saveEmployeeChanges = () => {
      // Validate all fields before saving
      const fieldsToValidate = ['phone'];
      const addressFields = ['province', 'district', 'ward', 'street', 'houseNumber'];
      
      let isValid = true;
      const newErrors = {};
      
      // Validate phone
      const phoneError = validateField('phone', editedEmployee.phone);
      if (phoneError) {
        newErrors.phone = phoneError;
        isValid = false;
      }
      
      // Validate address fields
      addressFields.forEach(field => {
        const fullField = `contactAddress.${field}`;
        const value = editedEmployee.contactAddress[field];
        const error = validateField(fullField, value);
        
        if (error) {
          newErrors[fullField] = error;
          isValid = false;
        }
      });
      
      setErrors(newErrors);
      
      if (isValid) {
        setEmployees(prevEmployees => 
          prevEmployees.map(employee => {
            if (employee.id === editedEmployee.id) {
              return {
                ...employee,
                contactAddress: editedEmployee.contactAddress,
                phone: editedEmployee.phone,
                status: editedEmployee.status
              };
            }
            return employee;
          })
        );
        setIsEditMode(false);
        setSelectedEmployee(prev => ({
          ...prev,
          contactAddress: editedEmployee.contactAddress,
          phone: editedEmployee.phone,
          status: editedEmployee.status
        }));
        
        // Hiển thị thông báo thành công
        setExportNotification({
          visible: true,
          type: 'success',
          message: 'Lưu thay đổi thành công!',
          format: 'Hệ thống đã ghi nhận thay đổi.'
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
          message: 'Có lỗi khi lưu thay đổi. Vui lòng kiểm tra lại thông tin!',
          format: 'Hãy kiểm tra lại xem các trường thông tin đã điền đúng theo quy định chưa nhé!'
        });
        
        // Tự động ẩn thông báo sau 5 giây
        setTimeout(() => {
          setExportNotification(prev => ({...prev, visible: false}));
        }, 5000);
      }
    };
  
    // Toggle add employee modal
    const toggleAddEmployeeModalOpen = () => {
      if (isAddEmployeeModalOpen) {
        // If closing, just toggle the state and let AnimatePresence handle the reset
        setIsAddEmployeeModalOpen(false);
        
        // Immediately clear errors
        setErrors({});
      } else {
        // If opening, reset the form first then open the modal
        setNewEmployee({
          fullName: '',
          birthDate: '',
          idNumber: '',
          idIssueDate: '',
          idIssuePlace: '',
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
        setIsAddEmployeeModalOpen(true);
      }
    };
  
    // Handle new employee form changes with validation on each keystroke
    const handleNewEmployeeChange = (field, value) => {
      setNewEmployee(prev => {
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
      setNewEmployee(prev => ({
        ...prev,
        contactAddress: { ...prev.permanentAddress }
      }));
    };
  
    // Validation functions
    const validateField = (field, value) => {
      // Xử lý trường hợp value là undefined hoặc null
      const safeValue = value || '';
      
      if (field === 'fullName') {
        if (!safeValue.trim()) return 'Họ tên không được để trống';
        if (safeValue.trim().length < 3) return 'Họ tên phải có ít nhất 3 ký tự';
        return '';
      }
      
      if (field === 'birthDate') {
        if (!safeValue.trim()) return 'Ngày sinh không được để trống';
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        if (!dateRegex.test(safeValue)) return 'Ngày sinh không đúng định dạng DD/MM/YYYY';
        
        // Validate age > 18
        if (dateRegex.test(safeValue)) {
          const parts = safeValue.split('/');
          const birthDate = new Date(parts[2], parts[1] - 1, parts[0]);
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          
          if (age < 18) {
            return 'Nhân viên phải từ 18 tuổi trở lên';
          }
        }
        
        return '';
      }
      
      if (field === 'idNumber') {
        if (!safeValue.trim()) return 'Số CCCD/CMND không được để trống';
        if (!/^\d{9,12}$/.test(safeValue)) return 'Số CCCD/CMND phải có 9-12 chữ số';
        return '';
      }
      
      if (field === 'email') {
        if (!safeValue.trim()) return 'Email không được để trống';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(safeValue)) return 'Email không đúng định dạng';
        return '';
      }
      
      if (field === 'phone') {
        if (!safeValue.trim()) return 'Số điện thoại không được để trống';
        if (!/^0\d{9,10}$/.test(safeValue)) return 'Số điện thoại phải bắt đầu bằng số 0 và có 10-11 chữ số';
        return '';
      }
      
      if (field.includes('province') || field.includes('district') || field.includes('ward') || field.includes('street')) {
        if (!safeValue.trim()) return 'Thông tin địa chỉ không được để trống';
        return '';
      }
      
      if (field.includes('houseNumber')) {
        if (!safeValue.trim()) return 'Số nhà không được để trống';
        // Add validation for house number - should be a valid number or number with letters (e.g., 123A)
        if (!/^[0-9]+[A-Za-z]?$/.test(safeValue)) return 'Số nhà phải là số hoặc số kèm chữ cái (VD: 123 hoặc 123A)';
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
    
    // Validate all fields in new employee form
    const validateAllFields = () => {
      const newErrors = {};
      let isValid = true;
      
      // Validate personal info
      const personalFields = ['fullName', 'birthDate', 'idNumber', 'email', 'phone'];
      personalFields.forEach(field => {
        const error = validateField(field, newEmployee[field]);
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
            ? newEmployee.permanentAddress[field]
            : newEmployee.contactAddress[field];
          
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
          ? newEmployee.permanentAddress[fieldName]
          : newEmployee.contactAddress[fieldName];
        validateAndUpdateField(field, value);
      } else {
        validateAndUpdateField(field, newEmployee[field]);
      }
    };
  
    // Add new employee with validation
    const addNewEmployee = () => {
      if (validateAllFields()) {
        // Generate ID and code
        const newId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
        const newCode = `NV${String(newId).padStart(6, '0')}`;
        
        // Calculate age from birthDate
        const birthDateParts = newEmployee.birthDate.split('/');
        const birthYear = parseInt(birthDateParts[2]);
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthYear;
        
        // Create new employee object with current date as registration date
        const today = new Date();
        const registrationDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
        
        const employeeToAdd = {
          id: newId,
          code: newCode,
          fullName: newEmployee.fullName,
          birthDate: newEmployee.birthDate,
          age: age,
          idNumber: newEmployee.idNumber,
          email: newEmployee.email,
          phone: newEmployee.phone,
          permanentAddress: { ...newEmployee.permanentAddress },
          contactAddress: { ...newEmployee.contactAddress },
          registrationDate: registrationDate,
          status: 'active'
        };
        
        // Hiển thị modal xác nhận trước khi thêm nhân viên
        openConfirmationModal({
          title: 'Xác nhận thêm nhân viên mới',
          message: 'Bạn có chắc chắn muốn thêm nhân viên mới này không?',
          confirmText: 'Quẹt để thêm nhân viên',
          confirmDetails: {
            'Mã nhân viên': newCode,
            'Họ tên': newEmployee.fullName,
            'Ngày sinh': newEmployee.birthDate,
            'Số CCCD/CMND': newEmployee.idNumber,
            'Email': newEmployee.email,
            'Số điện thoại': newEmployee.phone
          },
          type: 'add',
          onConfirm: () => {
            // Set processing state to true
            setConfirmationProcessing(true);
            
            // Simulate API call with a delay
            setTimeout(() => {
              try {
                // Add new employee
                setEmployees(prev => [...prev, employeeToAdd]);
                
                // Close modals
                closeConfirmationModal();
                toggleAddEmployeeModalOpen();
                
                // Hiển thị thông báo thành công
                setExportNotification({
                  visible: true,
                  type: 'success',
                  message: 'Thêm nhân viên mới thành công!',
                  format: 'Hệ thống đã ghi nhận hồ sơ nhân viên mới!'
                });
                
                // Tự động ẩn thông báo sau 5 giây
                setTimeout(() => {
                  setExportNotification(prev => ({...prev, visible: false}));
                }, 5000);
              } catch (error) {
                console.error('Error adding new employee:', error);
                
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
      }
  
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
  
    // Function to toggle mobile menu
    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  
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
      <div className="container mx-auto -mx-1 sm:px-3 md:px-4 lg:px-6 xl:pl-2 xl:px-8">
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

          /* New animations and styles */
          .bg-size-200 {
            background-size: 200% 100%;
          }

          .bg-pos-0 {
            background-position: 0% 0%;
          }

          .hover\:bg-pos-100:hover {
            background-position: 100% 0%;
          }

          @keyframes pulse-shadow {
            0% {
              box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.4);
            }
            70% {
              box-shadow: 0 0 0 10px rgba(79, 70, 229, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(79, 70, 229, 0);
            }
          }

          .pulse-shadow {
            animation: pulse-shadow 2s infinite;
          }

          @keyframes bounce-subtle {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-5px);
            }
          }

          .bounce-subtle {
            animation: bounce-subtle 2s ease-in-out infinite;
          }

          @keyframes gradient-shift {
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

          .gradient-shift {
            background-size: 200% 200%;
            animation: gradient-shift 3s ease infinite;
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
            animation: cardAppear 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)
              forwards;
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
                Quản lý nhân viên
              </h2>
              <p className="text-gray-500 text-sm">
                Quản lý thông tin và trạng thái của nhân viên
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
            />
          </motion.div>
        </div>

        {/* Employees table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <DataTable
            data={filteredEmployees}
            columns={employeeColumns}
            sortField={sortField}
            sortDirection={sortDirection}
            handleSort={handleSort}
            onRowClick={openEmployeeDetail}
            onEditClick={enableEditMode}
            onDeleteClick={null} // Không sử dụng delete, dùng custom actions
            keyField="id"
            className="mb-6"
            // Custom header styling
            headerClassName="bg-gradient-to-r from-indigo-600 to-blue-500 text-white"
            // Custom actions
            renderActions={renderActions}
            // Bộ lọc trạng thái
            statusFilters={{
              status: ['active', 'disabled']
            }}
            // Bộ lọc khoảng thời gian
            dateRangeFilters={{
              registrationDate: { label: 'Ngày đăng ký' },
              birthDate: { label: 'Ngày sinh' }
            }}
            changeTableData={setExporData}
          />
        </motion.div>

        {/* "Add Employee" fixed button */}
        <div className="fixed bottom-6 left-0 right-0 flex justify-center z-10">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className="h-12 sm:h-14 px-4 sm:px-6 rounded-full bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-600 bg-size-200 bg-pos-0 hover:bg-pos-100 flex items-center justify-center text-white shadow-lg transition-all duration-500"
            onClick={toggleAddEmployeeModalOpen}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1 }}
          >
            <Plus size={18} className="mr-1 sm:mr-2" />
            <span className="font-medium text-sm sm:text-base">
              Thêm nhân viên
            </span>
          </motion.button>
        </div>

        {/* Employee Detail Modal */}
        <AnimatePresence mode="sync">
          {isModalOpen && selectedEmployee && (
            <motion.div
              key="employee-detail-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onAnimationComplete={(definition) => {
                // Reset data when exit animation completes
                if (definition === "exit") {
                  setSelectedEmployee(null);
                  setIsEditMode(false);
                  setActiveDetailTab("information");
                  setEditedEmployee(null);
                }
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                onClick={closeModal}
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
                className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl flex flex-col h-[90vh] relative z-10"
                style={{ scrollbarWidth: "none" }}
              >
                {/* Fixed Header */}
                <ModalHeader
                  title="Thông tin chi tiết nhân viên"
                  editTitle="Chỉnh sửa thông tin nhân viên"
                  isEditMode={isEditMode}
                  onClose={closeModal}
                  variant={isEditMode ? "teal" : "cyan"}
                />

                {/* Scrollable Content */}
                <div
                  className="overflow-y-auto flex-1 pt-0 p-6 space-y-6"
                  style={{ scrollbarWidth: "thin" }}
                >
                  {/* Tab Navigation */}
                  <AnimatedTabNavigation
                    activeTab={activeDetailTab}
                    onTabChange={setActiveDetailTab}
                    tabs={[
                      {
                        id: 'information',
                        label: 'Thông tin chi tiết',
                        icon: User
                      },
                      {
                        id: 'transaction-history',
                        label: 'Lịch sử giao dịch',
                        icon: FileText
                      }
                    ]}
                    variant="cyan"
                    className="mb-6"
                  />
                  
                  {/* Tab Content */}
                  <AnimatePresence mode="wait" initial={false}>
                    {activeDetailTab === "transaction-history" && (
                      <EmployeeTransactionHistory employee={selectedEmployee} />
                    )}
                    
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
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-200/30 to-purple-200/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                        <div className="relative bg-white/90 backdrop-blur-xl border border-indigo-200/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500">
                          <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                              <User size={20} className="text-white" />
                            </div>
                            <h4 className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-purple-600 bg-clip-text text-transparent">
                              Thông tin cá nhân
                            </h4>
                            <div className="flex-1 h-px bg-gradient-to-r from-indigo-200 to-transparent"></div>
                          </div>
                    
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 }}
                            >
                              <InputField
                                label="Mã nhân viên"
                                value={selectedEmployee.code}
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
                                value={selectedEmployee.fullName}
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
                                value={selectedEmployee.birthDate}
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
                                value={selectedEmployee.age.toString()}
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
                                value={selectedEmployee.idNumber}
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
                                value={selectedEmployee.email}
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
                                value={selectedEmployee.phone}
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
                                    <StatusBadge status={selectedEmployee.status} />
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
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 to-cyan-200/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                        <div className="relative bg-white/90 backdrop-blur-xl border border-blue-200/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 mt-6">
                          <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                              <MapPin size={20} className="text-white" />
                            </div>
                            <h4 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">
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
                              values={selectedEmployee.permanentAddress}
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
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-200/30 to-pink-200/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                        <div className="relative bg-white/90 backdrop-blur-xl border border-violet-200/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 mt-6">
                          <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                              <MapPin size={20} className="text-white" />
                            </div>
                            <h4 className="text-2xl font-bold bg-gradient-to-r from-violet-700 to-pink-600 bg-clip-text text-transparent">
                              Địa chỉ liên lạc
                            </h4>
                            <div className="flex-1 h-px bg-gradient-to-r from-violet-200 to-transparent"></div>
                          </div>
                    
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            <AddressFields
                              prefix="contactAddress"
                              values={selectedEmployee.contactAddress}
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
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-200/30 to-emerald-200/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                        <div className="relative bg-white/90 backdrop-blur-xl border border-teal-200/50 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-500">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                              <Calendar size={18} className="text-white" />
                            </div>
                            <h5 className="text-lg font-bold bg-gradient-to-r from-teal-700 to-emerald-600 bg-clip-text text-transparent">
                              Thông tin đăng ký
                            </h5>
                          </div>
                    
                          <CalendarDatePicker
                            label="Ngày đăng ký"
                            placeholder="DD/MM/YYYY"
                            value={selectedEmployee.registrationDate}
                            onChange={() => {}}
                            disabled={true}
                          />
                        </div>
                      </motion.div>
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
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-200/30 to-purple-200/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                      <div className="relative bg-white/90 border border-indigo-200/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500">
                        {/* Nhóm: Thông tin có thể chỉnh sửa */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-gradient-to-br from-teal-400 via-cyan-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                              <User size={20} className="text-white" />
                            </div>
                            <h4 className="text-2xl font-bold bg-gradient-to-r from-teal-400 via-cyan-500 to-teal-600 bg-clip-text text-transparent">
                              Thông tin có thể chỉnh sửa
                            </h4>
                            <div className="flex-1 h-px bg-gradient-to-r from-indigo-200 to-transparent"></div>
                          </div>
                    
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.15 }}
                            >
                              <InputField
                                label="Số điện thoại"
                                value={editedEmployee.phone}
                                onChange={(value) =>
                                  handleFormChange("phone", value)
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
                                  editedEmployee.status === "active"
                                    ? "Hoạt động"
                                    : "Vô hiệu hóa"
                                }
                                onChange={(value) =>
                                  handleFormChange(
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
                            <div className="absolute inset-0 bg-gradient-to-r from-violet-200/20 to-pink-200/20 rounded-2xl blur-sm"></div>
                            <div className="relative bg-white/70 border border-violet-200/40 rounded-2xl p-6">
                              <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                                <div className="flex text-left items-center gap-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-teal-400 via-cyan-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md">
                                    <MapPin size={18} className="text-white" />
                                  </div>
                                  <h4 className="text-xl font-bold bg-gradient-to-r from-teal-400 via-cyan-500 to-teal-600 bg-clip-text text-transparent">
                                    Địa chỉ liên lạc
                                  </h4>
                                </div>
                    
                                <motion.button
                                  type="button"
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => {
                                    setEditedEmployee((prev) => ({
                                      ...prev,
                                      contactAddress: {
                                        ...selectedEmployee.permanentAddress,
                                      },
                                    }));
                                  }}
                                  className="group relative text-right mt-4 md:mt-0 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-pink-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                                >
                                  <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-cyan-500 to-teal-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                                  values={editedEmployee.contactAddress}
                                  onChange={handleFormChange}
                                  errors={errors}
                                  required={true}
                                  onBlur={(field) =>
                                    validateAndUpdateField(
                                      field,
                                      editedEmployee.contactAddress[
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
                                whileHover={{
                                  scale: 1.05,
                                  backgroundColor: "#9ca3af",
                                }}
                                whileTap={{ scale: 0.95 }}
                                onClick={cancelEdit}
                                className="px-6 py-3 font-medium bg-gray-300 text-gray-700 rounded-xl transition-all duration-300 shadow-md"
                              >
                                Hủy bỏ
                              </motion.button>
                              <motion.button
                                whileHover={{
                                  scale: 1.05,
                                  boxShadow:
                                    "0 10px 15px -3px rgba(79, 70, 229, 0.4)",
                                }}
                                whileTap={{ scale: 0.95 }}
                                onClick={saveEmployeeChanges}
                                className="px-6 py-3 bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-600 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white rounded-xl shadow-md transition-all duration-500 flex items-center"
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
                                whileHover={{
                                  scale: 1.05,
                                  backgroundColor: "#9ca3af",
                                }}
                                whileTap={{ scale: 0.95 }}
                                onClick={closeModal}
                                className="px-6 py-3 bg-gray-300 text-gray-700 rounded-xl transition-all duration-300 shadow-md"
                              >
                                Đóng
                              </motion.button>
                              <motion.button
                                whileHover={{
                                  scale: 1.05,
                                  boxShadow:
                                    "0 10px 15px -3px rgba(79, 70, 229, 0.4)",
                                }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => enableEditMode(selectedEmployee)}
                                className="px-6 py-3 bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-600 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white rounded-xl shadow-md transition-all duration-500 flex items-center"
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

        {/* Add Employee Modal */}
        <AnimatePresence mode="sync">
          {isAddEmployeeModalOpen && (
            <motion.div
              key="add-employee-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onAnimationComplete={(definition) => {
                // Reset form data when exit animation completes
                if (definition === "exit") {
                  setNewEmployee({
                    fullName: "",
                    birthDate: "",
                    idNumber: "",
                    idIssueDate: "",
                    idIssuePlace: "",
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
                onClick={toggleAddEmployeeModalOpen}
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
                    title="Thêm nhân viên mới"
                    editTitle="NO DATA"
                    isEditMode={false}
                    onClose={toggleAddEmployeeModalOpen}
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
                            value={newEmployee.fullName}
                            onChange={(val) =>
                              handleNewEmployeeChange("fullName", val)
                            }
                            onBlur={() => handleFieldBlur("fullName")}
                            error={errors.fullName}
                            required={true}
                          />
                          <CalendarDatePicker
                            label="Ngày sinh"
                            placeholder="DD/MM/YYYY"
                            value={newEmployee.birthDate}
                            onChange={(val) =>
                              handleNewEmployeeChange("birthDate", val)
                            }
                            onBlur={() => handleFieldBlur("birthDate")}
                            error={errors.birthDate}
                            required={true}
                          />
                          <InputField
                            label="Số CCCD/CMND"
                            placeholder="Nhập số CCCD/CMND..."
                            value={newEmployee.idNumber}
                            onChange={(val) =>
                              handleNewEmployeeChange("idNumber", val)
                            }
                            onBlur={() => handleFieldBlur("idNumber")}
                            error={errors.idNumber}
                            required={true}
                          />
                          <InputField
                            label="Email"
                            type="email"
                            placeholder="example@email.com"
                            value={newEmployee.email}
                            onChange={(val) =>
                              handleNewEmployeeChange("email", val)
                            }
                            onBlur={() => handleFieldBlur("email")}
                            error={errors.email}
                            required={true}
                          />
                          <InputField
                            label="Số điện thoại"
                            placeholder="Nhập số điện thoại..."
                            value={newEmployee.phone}
                            onChange={(val) =>
                              handleNewEmployeeChange("phone", val)
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
                          values={newEmployee.permanentAddress}
                          onChange={handleNewEmployeeChange}
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
                          values={newEmployee.contactAddress}
                          onChange={handleNewEmployeeChange}
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
                        whileHover={{ scale: 1.05, backgroundColor: "#9ca3af" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleAddEmployeeModalOpen}
                        className="px-6 py-3 bg-gray-300 text-gray-700 rounded-xl transition-all duration-300 shadow-md"
                      >
                        Hủy bỏ
                      </motion.button>
                      <motion.button
                        type="button"
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.4)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={addNewEmployee}
                        className="px-6 py-3 font-medium bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-600 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white rounded-xl shadow-md transition-all duration-500 flex items-center"
                      >
                        <Plus size={16} className="mr-2 font-medium" />
                        Thêm nhân viên
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
          title="Xuất dữ liệu nhân viên"
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
            code: "Mã nhân viên",
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