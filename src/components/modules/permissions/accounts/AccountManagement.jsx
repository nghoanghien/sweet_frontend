import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, Search, Filter, Grid, List, Settings } from 'lucide-react';
import AccountCard from '../ui/AccountCard';
import AccountListItem from './AccountListItem';
import AccountFormModal from './AccountFormModal';
import AccountDetailModal from './AccountDetailModal';
import ResetPasswordModal from './ResetPasswordModal';
import SwipeConfirmationModal from '@/components/modals/ConfirmationModal/SwipeConfirmationModal';
import ExportNotification from '@/components/common/ExportNotification';

const AccountManagement = () => {
  // State cho modal
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // State cho filter và view
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
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
  
  // Mock data cho danh sách tài khoản
  const [accountsList, setAccountsList] = useState([
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
    }
  ]);

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
    if (filter !== 'all' && account.type !== filter) {
      return false;
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

        {/* Add account button */}
        <motion.button
          onClick={handleAddAccount}
          className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl shadow-[0_4px_20px_rgba(0,170,255,0.13)] flex items-center font-semibold tracking-wide gap-2"
          whileHover={{
            scale: 1.08,
            boxShadow: "0 0 16px rgba(0,170,255,0.18)",
          }}
          whileTap={{ scale: 0.96 }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Plus size={20} className="mr-0" />
          Thêm tài khoản
        </motion.button>
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
            <Search
              size={20}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400"
            />
            <input
              type="text"
              placeholder="Tìm kiếm tài khoản..."
              className="pl-12 pr-4 py-3 border-2 border-indigo-100 rounded-2xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 text-base bg-white/80 shadow-inner transition-all duration-200 font-medium text-blue-800 placeholder-indigo-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>

          <motion.div
            className="flex gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-2xl flex items-center gap-2 text-base font-semibold shadow transition-all
                ${
                  filter === "all"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-[0_4px_20px_rgba(0,170,255,0.13)]"
                    : "bg-gray-100 text-gray-600 hover:bg-blue-50 border border-blue-100"
                }`}
            >
              <Filter size={18} />
              Tất cả
            </button>
            <button
              onClick={() => setFilter("customer")}
              className={`px-3 py-2 rounded-xl flex items-center gap-1 text-sm ${
                filter === "customer"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Users size={16} />
              Khách hàng
            </button>
            <button
              onClick={() => setFilter("staff")}
              className={`px-3 py-2 rounded-xl flex items-center gap-1 text-sm ${
                filter === "staff"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Settings size={16} />
              Nhân viên
            </button>
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
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAccounts.map((account, index) => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 30px rgba(0,170,255,0.10)",
              }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
            >
              <AccountCard
                account={account}
                onView={handleViewAccount}
                onEdit={handleEditAccount}
                onDisable={handleToggleDisable}
                onResetPassword={handleResetPassword}
              />
            </motion.div>
          ))}

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
      ) : (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
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
                {filteredAccounts.map((account, index) => (
                  <AccountListItem
                    key={account.id}
                    account={account}
                    onView={handleViewAccount}
                    onEdit={handleEditAccount}
                    onDisable={handleToggleDisable}
                    onResetPassword={handleResetPassword}
                    delay={index * 0.05}
                  />
                ))}

                {filteredAccounts.length === 0 && (
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