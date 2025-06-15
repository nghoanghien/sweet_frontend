import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Download,
  FileText,
  Phone,
  CreditCard
} from 'lucide-react';
import { SavingsAccountDetailDrawer } from '@/components/modules/saving-account/components';
import SearchFilterBar from '../../../components/common/SearchFilterBar';
import DataTable from '../../../components/common/DataTable';
import ExportDataModal from '../../../components/common/ExportDataModal';
import ExportNotification from '../../../components/common/ExportNotification';
import SwipeConfirmationModal from '../../../components/modals/ConfirmationModal/SwipeConfirmationModal';
import { formatCurrency } from '../../../utils/accountUtils';
// Các component phụ trợ sẽ bổ sung sau: InputField, SearchFilterBar, DataTable, ...

// Dữ liệu mẫu cho giao dịch tiết kiệm
const sampleTransactions = {
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
    }
  ]
};

// Dữ liệu mẫu cho lịch sử lãi
const sampleInterestHistory = {
  1: [
    {
      id: 1,
      date: "15/06/2023",
      amount: 1133333,
      rate: 6.8,
      period: "Tháng 1",
      type: "Lãi định kỳ"
    }
  ],
  2: [
    {
      id: 1,
      date: "10/07/2023",
      amount: 687500,
      rate: 5.5,
      period: "Tháng 1",
      type: "Lãi định kỳ"
    }
  ]
};

// Dữ liệu mẫu cho lịch sử rút tiền
const sampleWithdrawalHistory = {
  1: [],
  2: [
    {
      id: 1,
      date: "15/08/2023",
      amount: 50000000,
      type: "Rút một phần",
      interestLoss: 125000,
      remainingBalance: 100000000
    }
  ]
};

export default function SavingsAccountManagement() {
  // State cho danh sách phiếu gửi tiền
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      accountNumber: 'TK000001',
      amount: 10000000,
      remainingAmount: 1000000,
      term: '12 tháng',
      termDays: 365, 
      daysRemaining: 120,
      interestRate: 6.8,
      interestFrequency: 'Cuối kỳ',
      depositType: 'Tiền gửi tiêu chuẩn',
      maturityOption: 'Tự động tái tục gốc',
      startDate: "15/06/2024",
      endDate: '15/06/2025',
      receivedInterest: 0,
      totalReceivable: 10720000,
      nickname: 'Sổ tiết kiệm A',
      status: 'closed',
      customer: {
        fullName: 'Nguyễn Văn A',
        birthDate: '12/05/1985',
        idNumber: '036085123456',
        email: 'nguyenvana@email.com',
        phone: '0901234567',
      }
    },
    {
      id: 2,
      accountNumber: 'TK000002',
      amount: 5000000,
      remainingAmount: 0,
      term: '6 tháng',
      termDays: 180,
      daysRemaining: 0,
      interestRate: 6.8,
      interestFrequency: 'Hàng tháng',
      depositType: 'Rút gốc linh hoạt',
      maturityOption: 'Tất toán',
      startDate: "20/02/2024",
      endDate: '20/08/2024',
      receivedInterest: 0,
      totalReceivable: 5170000,
      nickname: 'Sổ tiết kiệm B',
      status: 'closed',
      customer: {
        fullName: 'Trần Thị B',
        birthDate: '25/11/1990',
        idNumber: '024190789123',
        email: 'tranthib@email.com',
        phone: '0912345678',
      }
    },
    {
      id: 3,
      accountNumber: 'TK000003',
      amount: 20000000,
      remainingAmount: 20000000,
      term: '24 tháng',
      termDays: 730,
      daysRemaining: 150,
      interestRate: 7.8,
      interestFrequency: 'Cuối kỳ',
      depositType: 'Rút gốc linh hoạt',
      maturityOption: 'Tái tục cả gốc và lãi',
      startDate: "05/11/2024",
      endDate: '05/11/2026',
      receivedInterest: 0,
      totalReceivable: 23120000,
      nickname: 'Sổ tiết kiệm C',
      status: 'inTerm',
      customer: {
        fullName: 'Lê Văn C',
        birthDate: '10/03/1978',
        idNumber: '025781234567',
        email: 'levanc@email.com',
        phone: '0923456789',
      }
    }
  ]);

  //State cho việc ẩn các thông tin nhạy cảm
  const [hiddenAccounts, setHiddenAccounts] = useState({});

  // State cho modal chi tiết
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);

  // State cho modal thêm mới
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // State cho filter, sort, search (sẽ bổ sung sau)
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [sortField, setSortField] = useState('accountNumber');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchFields, setSearchFields] = useState({
    accountNumber: '',
    idNumber: '',
    fullName: '',
    phone: ''
  });

  // State cho export
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportData, setExporData] = useState([]);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');
  const [exportNotification, setExportNotification] = useState({
    visible: false,
    type: 'success',
    message: '',
    format: ''
  });
  
  // State for notification
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationFormat, setNotificationFormat] = useState('pdf');
  const [notificationType, setNotificationType] = useState('success');

  // State cho xác nhận
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    title: '',
    description: '',
    confirmText: '',
    confirmDetails: null,
    isProcessing: false,
    onConfirm: null
  });

  // State cho form thêm mới
  const [newAccount, setNewAccount] = useState({
    accountNumber: '',
    amount: '',
    term: '',
    interestRate: '',
    interestFrequency: '',
    depositType: '',
    maturityOption: '',
    endDate: '',
    nickname: '',
    status: 'active',
    customer: {
      fullName: '',
      birthDate: '',
      idNumber: '',
      email: '',
      phone: ''
    }
  });
  const [errors, setErrors] = useState({});

  // useEffect filter + sort (sẽ bổ sung logic sau)
  useEffect(() => {
    let result = [...accounts];
    // Filter
    result = result.filter(acc => {
      const accNumMatch = searchFields.accountNumber === '' || acc.accountNumber.toLowerCase().includes(searchFields.accountNumber.toLowerCase());
      const idMatch = searchFields.idNumber === '' || acc.customer.idNumber.toLowerCase().includes(searchFields.idNumber.toLowerCase());
      const nameMatch = searchFields.fullName === '' || acc.customer.fullName.toLowerCase().includes(searchFields.fullName.toLowerCase());
      const phoneMatch = searchFields.phone === '' || acc.customer.phone.toLowerCase().includes(searchFields.phone.toLowerCase());
      return accNumMatch && idMatch && nameMatch && phoneMatch;
    });
    // Sort
    result.sort((a, b) => {
      let valueA = a[sortField], valueB = b[sortField];
      if (sortField === 'idNumber') {
        valueA = a.customer.idNumber; valueB = b.customer.idNumber;
      } else if (sortField === 'fullName') {
        valueA = a.customer.fullName; valueB = b.customer.fullName;
      }
      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }
      if (sortDirection === 'asc') return valueA > valueB ? 1 : -1;
      else return valueA < valueB ? 1 : -1;
    });
    setFilteredAccounts(result);
  }, [accounts, searchFields, sortField, sortDirection]);
  
  // Lắng nghe sự kiện rút tiền từ SavingsAccountDetailDrawer
  useEffect(() => {
    // Xử lý sự kiện rút toàn bộ tiền
    const handleAccountFullyWithdrawn = (event) => {
      const { accountId } = event.detail;
      
      // Tìm tài khoản trong danh sách
      const account = accounts.find(acc => acc.id === accountId);
      if (!account) return;
      
      // Thay vì xóa tài khoản, cập nhật trạng thái thành 'closed' và remainingAmount về 0
      setAccounts(prevAccounts => 
        prevAccounts.map(acc => 
          acc.id === accountId 
            ? { ...acc, status: 'closed', remainingAmount: 0, receivedInterest: acc.receivedInterest || 0 } 
            : acc
        )
      );
      
      // Hiển thị thông báo
      setNotificationMessage(`Đã rút toàn bộ tiền từ tài khoản ${account.accountNumber}`);
      setNotificationType('success');
      setNotificationVisible(true);
      
      // Tự động ẩn thông báo sau 5 giây
      setTimeout(() => {
        setNotificationVisible(false);
      }, 5000);
    };
    
    // Xử lý sự kiện rút một phần tiền
    const handleAccountPartiallyWithdrawn = (event) => {
      const { accountId, updatedAccount, transaction } = event.detail;
      
      // Cập nhật tài khoản trong danh sách
      setAccounts(prevAccounts => 
        prevAccounts.map(acc => 
          acc.id === accountId ? updatedAccount : acc
        )
      );
    };
    
    // Đăng ký lắng nghe sự kiện
    window.addEventListener('accountFullyWithdrawn', handleAccountFullyWithdrawn);
    window.addEventListener('accountPartiallyWithdrawn', handleAccountPartiallyWithdrawn);
    
    // Hủy đăng ký khi component unmount
    return () => {
      window.removeEventListener('accountFullyWithdrawn', handleAccountFullyWithdrawn);
      window.removeEventListener('accountPartiallyWithdrawn', handleAccountPartiallyWithdrawn);
    };
  }, [accounts]);

  // Cột bảng dữ liệu
  const accountColumns = [
    {
      key: 'accountNumber',
      label: 'Số tài khoản',
      sortable: true,
      formatter: (value, item) => (
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <CreditCard size={16} />
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-gray-900">{value}</div>
          </div>
        </div>
      )
    },
    {
      key: 'amount',
      label: 'Số tiền gửi',
      sortable: true,
      formatter: (value) => formatCurrency(value),
      className: 'hidden sm:table-cell'
    },
    {
      key: 'term',
      label: 'Kỳ hạn',
      sortable: true,
      className: 'hidden sm:table-cell' // Ẩn trên mobile
    },
    {
      key: 'status',
      label: 'Trạng thái',
      sortable: true,
      type: 'status' // Sử dụng StatusBadge component
    },
    {
      key: 'idNumber',
      label: 'CCCD người gửi',
      sortable: true,
      className: 'hidden md:table-cell', // Ẩn trên mobile và tablet
      formatter: (value, item) => item.customer?.idNumber || '-'
    },
    {
      key: 'fullName',
      label: 'Tên người gửi',
      sortable: true,
      className: 'hidden sm:table-cell', // Ẩn trên mobile
      formatter: (value, item) => item.customer?.fullName || '-'
    }
  ];
  
  // Sử dụng columns trực tiếp mà không cần map thêm
  // vì formatter đã được định nghĩa trong accountColumns

  // Render action cho mỗi dòng
  const renderActions = (account) => (
    <div className="flex justify-end space-x-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setSelectedAccount(account);
          setIsDetailDrawerOpen(true);
        }}
        className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50"
      >
        <FileText size={16} />
      </button>
    </div>
  );

  // SearchFilterBar config
  const searchFieldsConfig = [
    { key: 'accountNumber', label: 'Số tài khoản', icon: FileText, placeholder: 'Tìm theo số tài khoản...' },
    { key: 'idNumber', label: 'Số CCCD', icon: FileText, placeholder: 'Tìm theo CCCD...' },
    { key: 'fullName', label: 'Tên người gửi', icon: User, placeholder: 'Tìm theo tên...' },
    { key: 'phone', label: 'Số điện thoại', icon: Phone, placeholder: 'Tìm theo số điện thoại...' }
  ];

  // Handle search change
  const handleSearchChange = (field, value) => {
    setSearchFields(prev => ({ ...prev, [field]: value }));
  };
  const clearSearchFields = () => {
    setSearchFields({ accountNumber: '', idNumber: '', fullName: '', phone: '' });
  };
  // Handle sort
  const handleSort = (field) => {
    if (field === sortField) setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDirection('asc'); }
  };

  // Validate field
  const validateField = (field, value) => {
    if (['accountNumber', 'nickname', 'term', 'interestRate', 'interestFrequency', 'depositType', 'maturityOption', 'endDate', 'amount'].includes(field)) {
      if (!value || value.toString().trim() === '') return 'Không được để trống';
      if (field === 'amount' && (!/^[0-9]+$/.test(value) || value < 100000)) return 'Số tiền phải là số >= 100.000';
      if (field === 'interestRate' && (isNaN(value) || value <= 0 || value > 20)) return 'Lãi suất phải từ 0-20%';
    }
    if (['fullName', 'birthDate', 'idNumber', 'email', 'phone'].includes(field)) {
      if (!value || value.toString().trim() === '') return 'Không được để trống';
      if (field === 'email' && !/^\S+@\S+\.\S+$/.test(value)) return 'Email không hợp lệ';
      if (field === 'phone' && !/^0\d{9,10}$/.test(value)) return 'Số điện thoại phải bắt đầu bằng 0 và có 10-11 số';
      if (field === 'idNumber' && !/^\d{9,12}$/.test(value)) return 'CCCD phải có 9-12 số';
    }
    return '';
  };
  // Validate all fields
  const validateAllFields = () => {
    const newErrors = {};
    const fields = ['accountNumber', 'amount', 'term', 'interestRate', 'interestFrequency', 'depositType', 'maturityOption', 'endDate', 'nickname'];
    fields.forEach(f => { const err = validateField(f, newAccount[f]); if (err) newErrors[f] = err; });
    const customerFields = ['fullName', 'birthDate', 'idNumber', 'email', 'phone'];
    customerFields.forEach(f => { const err = validateField(f, newAccount.customer[f]); if (err) newErrors['customer.'+f] = err; });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle blur
  const handleFieldBlur = (field) => {
    if (field.startsWith('customer.')) {
      const key = field.split('.')[1];
      setErrors(prev => ({ ...prev, [field]: validateField(key, newAccount.customer[key]) }));
    } else {
      setErrors(prev => ({ ...prev, [field]: validateField(field, newAccount[field]) }));
    }
  };
  // Copy customer info
  const copyCustomerInfo = () => {
    setNewAccount(prev => ({ ...prev, customer: { ...prev.customer } }));
  };
  
  // Export
  const handleExportData = (data, format, selectedColumns) => {
    setExportFormat(format);
    // Mô phỏng quá trình xuất dữ liệu
    const isSuccess = Math.random() > 0.2;
    
    // Tạo thông báo dựa trên kết quả
    if (isSuccess) {
      setExportNotification({ 
        visible: true, 
        type: 'success', 
        message: `Xuất ${data.length} bản ghi thành công!`, 
        format 
      });
    } else {
      setExportNotification({ 
        visible: true, 
        type: 'error', 
        message: 'Có lỗi khi xuất dữ liệu. Vui lòng thử lại!', 
        format 
      });
    }
    
    // Tự động ẩn thông báo sau 5 giây
    setTimeout(() => { 
      setExportNotification(prev => ({...prev, visible: false})); 
    }, 5000);
  };
  // Confirmation modal
  const openConfirmationModal = ({ title, description, confirmText = 'Vuốt để xác nhận', confirmDetails = null, onConfirm }) => {
    setConfirmationModal({ isOpen: true, title, description, confirmText, confirmDetails, isProcessing: false, onConfirm });
  };
  const closeConfirmationModal = () => { setConfirmationModal(prev => ({ ...prev, isOpen: false })); };

  const toggleHideAccountInfo = (accountId) => {
    setHiddenAccounts(prev => ({
      ...prev,
      [accountId]: !prev[accountId]
    }));
  };
  // Render UI
  return (
    <div className="container mx-auto px-2 sm:px-3 md:px-4 lg:px-6 xl:pl-2 xl:px-8">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">Tra cứu phiếu gửi tiền</h2>
            <p className="text-gray-500 text-sm">Tra cứu và xem thông tin chi tiết các phiếu gửi tiền (tài khoản tiết kiệm)</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={() => setIsExportModalOpen(true)}
              className="group flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Download size={16} className="text-white group-hover:scale-110 transition-transform duration-200" />
              <span className="font-medium text-sm">Xuất dữ liệu</span>
            </button>
          </div>
        </div>
        <SearchFilterBar
          searchFields={searchFields}
          handleSearchChange={handleSearchChange}
          clearSearchFields={clearSearchFields}
          sortField={sortField}
          sortDirection={sortDirection}
          handleSort={handleSort}
          searchFieldsConfig={searchFieldsConfig}
        />
      </div>
      <DataTable
        data={filteredAccounts}
        columns={accountColumns}
        sortField={sortField}
        sortDirection={sortDirection}
        handleSort={handleSort}
        onRowClick={(acc) => { setSelectedAccount(acc); setIsDetailDrawerOpen(true); }}
        keyField="id"
        className="mb-6"
        headerClassName="bg-sky-600"
        renderActions={renderActions}
        // Bộ lọc trạng thái
        statusFilters={{
          status: ['inTerm', 'closed']
        }}
        // Bộ lọc khoảng thời gian
        dateRangeFilters={{
          depositDate: { label: 'Ngày gửi tiền' }
        }}
        changeTableData={setExporData}
      />
      {/* Modal chi tiết phiếu gửi tiền */}
      <AnimatePresence>
        {isDetailDrawerOpen && selectedAccount && (
          <motion.div>
            <SavingsAccountDetailDrawer
            isOpen={isDetailDrawerOpen}
            onClose={() => setIsDetailDrawerOpen(false)}
            account={selectedAccount}
            transactions={selectedAccount ? sampleTransactions[selectedAccount.id] || [] : []}
            interestHistory={selectedAccount ? sampleInterestHistory[selectedAccount.id] || [] : []}
            withdrawalHistory={selectedAccount ? sampleWithdrawalHistory[selectedAccount.id] || [] : []}
            isHidden={hiddenAccounts[selectedAccount.id]}
            customerInfo={selectedAccount.customer}
            showCustomerInfo={true}
            onToggleHide={() => toggleHideAccountInfo(selectedAccount.id)}
            canWithdraw={false}
          />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation modal cho các thao tác đặc biệt */}
      {confirmationModal.isOpen && (
        <SwipeConfirmationModal
          isOpen={confirmationModal.isOpen}
          onClose={closeConfirmationModal}
          onConfirm={confirmationModal.onConfirm}
          title={confirmationModal.title}
          description={confirmationModal.description}
          confirmText={confirmationModal.confirmText}
          confirmDetails={confirmationModal.confirmDetails}
          isProcessing={confirmationModal.isProcessing}
          type="warning"
        />
      )}
      {/* Export notification */}
      <ExportNotification 
        isVisible={exportNotification.visible} 
        format={exportNotification.format} 
        onClose={() => setExportNotification(prev => ({...prev, visible: false}))} 
        message={exportNotification.message}
        type={exportNotification.type}
        autoHideDuration={5000}
        position="center"
      />
      
      {/* Notification for account withdrawal */}
      <ExportNotification 
        isVisible={notificationVisible} 
        format={notificationFormat} 
        onClose={() => setNotificationVisible(false)} 
        message={notificationMessage}
        type={notificationType}
        autoHideDuration={5000}
        position="center"
      />
      {/* Export Data Modal */}
      <ExportDataModal 
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        data={exportData}
        onExport={handleExportData}
        title="Xuất dữ liệu phiếu gửi tiền"
        initialSelectedColumns={[
          'accountNumber',
          'amount',
          'term',
          'interestRate',
          'interestFrequency',
          'depositType',
          'maturityOption',
          'endDate',
          'nickname',
          'customer.fullName',
          'customer.idNumber',
          'customer.birthDate',
          'customer.email',
          'customer.phone',
          'totalReceivable',
          'receivedInterest',
        ]}
        columnLabels={{
          accountNumber: 'Số tài khoản',
          amount: 'Số tiền gửi',
          term: 'Kỳ hạn',
          interestRate: 'Lãi suất (%)',
          interestFrequency: 'Tần suất nhận lãi',
          depositType: 'Loại tiết kiệm',
          maturityOption: 'Hình thức đáo hạn',
          endDate: 'Ngày đáo hạn',
          nickname: 'Tên gợi nhớ',
          'customer.fullName': 'Họ tên',
          'customer.birthDate': 'Ngày sinh',
          'customer.idNumber': 'Số CCCD',
          'customer.email': 'Email',
          'customer.phone': 'Số điện thoại',
          'totalReceivable': 'Tổng tiền nhận',
          'receivedInterest': 'Lãi đã nhận'
        }}
        formatData={(value, column) => {
          if (column === 'amount' || column === 'totalReceivable' || column === 'receivedInterest') 
            return formatCurrency(value);
          if (column === 'interestRate') return value + '%';
          if (column.startsWith('customer.')) return value || 'N/A';
          return value || '';
        }}
        defaultFormat="excel"
        customColumnCategories={{
          account: ['accountNumber', 'nickname', 'depositType', 'maturityOption'],
          financial: ['amount', 'term', 'interestRate', 'interestFrequency', 'endDate', 'totalReceivable', 'receivedInterest'],
          customer: ['customer.fullName', 'customer.birthDate', 'customer.idNumber', 'customer.email', 'customer.phone'],
          other: []
        }}
        enableGrouping={true}
      />
    </div>
  );
}