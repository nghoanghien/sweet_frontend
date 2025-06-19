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
import { formatCurrency } from '../../../utils/accountUtils';
import DataTableShimmer from '../../../components/ui/custom/shimmer-types/DataTableShimmer';
import SearchFilterBarShimmer from '../../../components/ui/custom/shimmer-types/SearchFilterBarShimmer';
import { useAllSavingAccounts } from '@/hooks/useSavingAccounts';
import { getInterestFrequencyLabel, getDepositTypeLabel, getMaturityOptionLabel } from '@/utils/regulation-interest';
import { formatDate } from '@/utils/saving-account';
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

  //State cho việc ẩn các thông tin nhạy cảm
  const [hiddenAccounts, setHiddenAccounts] = useState({});

  // State cho modal chi tiết
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);

  // Loading states
  const [isLoadingSearch, setIsLoadingSearch] = useState(true);

  // State cho filter, sort, search (sẽ bổ sung sau)
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchFields, setSearchFields] = useState({
    id: '',
    idCardNumber: '',
    fullName: '',
    phone: ''
  });

  // State cho export
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportData, setExporData] = useState([]);
  const [exportFormat, setExportFormat] = useState('pdf');
  const [exportNotification, setExportNotification] = useState({
    visible: false,
    type: 'success',
    message: '',
    format: ''
  });

  const { allSavingAccounts, isLoading, error } = useAllSavingAccounts();

  // useEffect to simulate loading states
  useEffect(() => {
    // Simulate loading for search filtering
    setTimeout(() => {
      setIsLoadingSearch(false);
    }, 2000);

  }, []);

  // useEffect filter + sort (sẽ bổ sung logic sau)
  useEffect(() => {
    let result = [...allSavingAccounts];
    // Filter
    result = result.filter(acc => {
      const accNumMatch = searchFields.id === '' || String(acc.id).includes(searchFields.id);
      const idMatch = searchFields.idCardNumber === '' || acc.customer.idCardNumber.toLowerCase().includes(searchFields.idCardNumber.toLowerCase());
      const nameMatch = searchFields.fullName === '' || acc.customer.fullName.toLowerCase().includes(searchFields.fullName.toLowerCase());
      const phoneMatch = searchFields.phone === '' || acc.customer.phoneNumber.toLowerCase().includes(searchFields.phone.toLowerCase());
      return accNumMatch && idMatch && nameMatch && phoneMatch;
    });
    // Sort
    result.sort((a, b) => {
      let valueA = a[sortField], valueB = b[sortField];
      if (sortField === 'idCardNumber') {
        valueA = a.customer.idCardNumber; valueB = b.customer.idCardNumber;
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
  }, [allSavingAccounts, searchFields, sortField, sortDirection]);
  

  // Cột bảng dữ liệu
  const accountColumns = [
    {
      key: 'id',
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
      key: 'initialAmount',
      label: 'Số tiền gửi',
      sortable: true,
      formatter: (value) => formatCurrency(value),
      className: 'hidden sm:table-cell'
    },
    {
      key: 'term',
      label: 'Kỳ hạn',
      sortable: true,
      formatter: (value) => `${value} tháng`, 
      className: 'hidden sm:table-cell' // Ẩn trên mobile
    },
    {
      key: 'status',
      label: 'Trạng thái',
      sortable: true,
      type: 'status' // Sử dụng StatusBadge component
    },
    {
      key: 'idCardNumber',
      label: 'CCCD người gửi',
      sortable: true,
      className: 'hidden md:table-cell', // Ẩn trên mobile và tablet
      formatter: (value, item) => item.customer?.idCardNumber || '-'
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
    { key: 'id', label: 'Số tài khoản', icon: FileText, placeholder: 'Tìm theo số tài khoản...' },
    { key: 'idCardNumber', label: 'Số CCCD', icon: FileText, placeholder: 'Tìm theo CCCD...' },
    { key: 'fullName', label: 'Tên người gửi', icon: User, placeholder: 'Tìm theo tên...' },
    { key: 'phone', label: 'Số điện thoại', icon: Phone, placeholder: 'Tìm theo số điện thoại...' }
  ];

  // Handle search change
  const handleSearchChange = (field, value) => {
    setSearchFields(prev => ({ ...prev, [field]: value }));
  };
  const clearSearchFields = () => {
    setSearchFields({ id: '', idCardNumber: '', fullName: '', phone: '' });
  };
  // Handle sort
  const handleSort = (field) => {
    if (field === sortField) setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDirection('asc'); }
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
        {isLoadingSearch ? (
          <SearchFilterBarShimmer />
        ) : (
          <SearchFilterBar
            searchFields={searchFields}
            handleSearchChange={handleSearchChange}
            clearSearchFields={clearSearchFields}
            sortField={sortField}
            sortDirection={sortDirection}
            handleSort={handleSort}
            searchFieldsConfig={searchFieldsConfig}
          />
        )}
      </div>
      {isLoading ? (
        <DataTableShimmer
          showFilter={true}
        />
      ) : (
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
      )}
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
            onToggleHide={() => setHiddenAccounts(prev => ({ ...prev, [selectedAccount.id]: !prev[selectedAccount.id] }))}
            canWithdraw={false}
          />
          </motion.div>
        )}
      </AnimatePresence>
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

      {/* Export Data Modal */}
      <ExportDataModal 
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        data={exportData}
        onExport={handleExportData}
        title="Xuất dữ liệu phiếu gửi tiền"
        initialSelectedColumns={[
          'id',
          'initialAmount',
          'term',
          'interestRate',
          'interestFrequency',
          'depositType',
          'maturityOption',
          'startDate',
          'endDate',
          'nickname',
          'customer.fullName',
          'customer.idCardNumber',
          'customer.dateOfBirth',
          'customer.email',
          'customer.phoneNumber',
          'totalReceivable',
          'receivedInterest',
        ]}
        columnLabels={{
          id: 'Số tài khoản',
          initialAmount: 'Số tiền gửi',
          term: 'Kỳ hạn',
          interestRate: 'Lãi suất (%)',
          interestFrequency: 'Tần suất nhận lãi',
          depositType: 'Loại tiết kiệm',
          maturityOption: 'Hình thức đáo hạn',
          startDate: 'Ngày bắt đầu',
          endDate: 'Ngày đáo hạn',
          nickname: 'Tên gợi nhớ',
          'customer.fullName': 'Họ tên',
          'customer.dateOfBirth': 'Ngày sinh',
          'customer.idCardNumber': 'Số CCCD',
          'customer.email': 'Email',
          'customer.phoneNumber': 'Số điện thoại',
          'totalReceivable': 'Tổng tiền nhận',
          'receivedInterest': 'Lãi đã nhận'
        }}
        formatData={(value, column) => {
          if (column === 'initialAmount' || column === 'totalReceivable' || column === 'receivedInterest') 
            return formatCurrency(value);
          if (column === 'interestRate') return value * 100 + '%';
          if (column === 'interestFrequency') return getInterestFrequencyLabel(value);
          if (column === 'depositType') return getDepositTypeLabel(value);
          if (column === 'maturityOption') return getMaturityOptionLabel(value);
          if (column === 'startDate' || column === 'endDate') return formatDate(new Date(value));
          if (column === 'customer.dateOfBirth') return formatDate(new Date(value));
          if (column.startsWith('customer.')) return value || 'N/A';
          return value || '';
        }}
        defaultFormat="excel"
        customColumnCategories={{
          account: ['id', 'nickname', 'depositType', 'maturityOption'],
          financial: ['initialAmount', 'term', 'interestRate', 'interestFrequency', 'startDate', 'endDate', 'totalReceivable', 'receivedInterest'],
          customer: ['customer.fullName', 'customer.dateOfBirth', 'customer.idCardNumber', 'customer.email', 'customer.phoneNumber'],
          other: []
        }}
        enableGrouping={true}
      />
    </div>
  );
}