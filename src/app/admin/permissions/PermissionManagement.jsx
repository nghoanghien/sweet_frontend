import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Shield, UserCheck } from 'lucide-react';

// Import các component con
import PermissionList from '@/components/modules/permissions/permissions/PermissionList'
import RoleManagement from '@/components/modules/permissions/roles/RoleManagement';
import AccountManagement from '@/components/modules/permissions/accounts/AccountManagement';
import PermissionHeader from '@/components/modules/permissions/ui/PermissionHeader';
import TabNavigation from '@/components/modules/permissions/ui/TabNavigation';
import SwipeConfirmationModal from '@/components/modals/ConfirmationModal/SwipeConfirmationModal';
import ExportNotification from '@/components/common/ExportNotification';

const PermissionManagement = () => {
  // State cho tab đang active
  const [activeTab, setActiveTab] = useState('permissions');
  
  // State cho modal xác nhận
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    description: '',
    type: 'warning',
    confirmDetails: null,
    onConfirm: () => {},
  });

  // State cho thông báo
  const [notification, setNotification] = useState({
    isVisible: false,
    message: '',
    type: 'success',
    format: 'pdf',
  });
  
  // Danh sách các tab
  const tabs = [
    { id: 'permissions', name: 'Quyền hạn', icon: <Shield size={20} /> },
    { id: 'roles', name: 'Vai trò', icon: <UserCheck size={20} /> },
    { id: 'accounts', name: 'Tài khoản', icon: <Users size={20} /> },
  ];

  // State để lưu trữ thông tin người dùng hiện tại
  const [currentUser, setCurrentUser] = useState({
    id: 'user123',
    name: 'Nguyễn Văn A',
    role: 'Quản trị viên'
  });

  // Hàm hiển thị modal xác nhận
  const showConfirmModal = (title, description, type, details, onConfirm) => {
    setConfirmModal({
      isOpen: true,
      title,
      description,
      type,
      confirmDetails: details,
      onConfirm,
    });
  };

  // Hàm đóng modal xác nhận
  const closeConfirmModal = () => {
    setConfirmModal(prev => ({ ...prev, isOpen: false }));
  };

  // Hàm hiển thị thông báo
  const showNotification = (message, type = 'success', format = 'pdf') => {
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

  // Ví dụ hàm xử lý xóa quyền
  const handleDeletePermission = (permission) => {
    showConfirmModal(
      'Xóa quyền',
      `Bạn có chắc chắn muốn xóa quyền "${permission.name}"?`,
      'danger',
      { 'Tên quyền': permission.name, 'Mã quyền': permission.code },
      () => {
        // Xử lý xóa quyền ở đây
        console.log('Đã xóa quyền:', permission);
        showNotification('Xóa quyền thành công!', 'success');
      }
    );
  };

  // Ví dụ hàm xử lý thêm quyền
  const handleAddPermission = (permission) => {
    showConfirmModal(
      'Thêm quyền mới',
      'Xác nhận thêm quyền mới vào hệ thống?',
      'success',
      { 'Tên quyền': permission.name, 'Mã quyền': permission.code },
      () => {
        // Xử lý thêm quyền ở đây
        console.log('Đã thêm quyền:', permission);
        showNotification('Thêm quyền thành công!', 'success');
      }
    );
  };

  // Ví dụ hàm xử lý cập nhật quyền
  const handleUpdatePermission = (permission) => {
    showConfirmModal(
      'Cập nhật quyền',
      `Xác nhận cập nhật quyền "${permission.name}"?`,
      'warning',
      { 'Tên quyền': permission.name, 'Mã quyền': permission.code },
      () => {
        // Xử lý cập nhật quyền ở đây
        console.log('Đã cập nhật quyền:', permission);
        showNotification('Cập nhật quyền thành công!', 'success');
      }
    );
  };

  // Truyền các hàm xử lý xuống các component con
  const getTabContent = () => {
    switch (activeTab) {
      case 'permissions':
        return <PermissionList 
          onDelete={handleDeletePermission}
          onAdd={handleAddPermission}
          onUpdate={handleUpdatePermission}
        />;
      case 'roles':
        return <RoleManagement />;
      case 'accounts':
        return <AccountManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto md:pl-2 p-0 md:p-6 max-w-7xl">
      {/* Header */}
      <PermissionHeader 
        currentUser={currentUser}
        title="Quản lý phân quyền"
        description="Quản lý quyền hạn, vai trò và tài khoản trong hệ thống"
      />
      
      {/* Tab Navigation */}
      <div className="mb-8">
        <TabNavigation 
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
      
      {/* Tab Content */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeTab}
          className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-6 sm:p-8 border border-gray-100"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.98 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
          {getTabContent()}
        </motion.div>
      </AnimatePresence>

      {/* SwipeConfirmationModal */}
      <SwipeConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={closeConfirmModal}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        description={confirmModal.description}
        type={confirmModal.type}
        confirmDetails={confirmModal.confirmDetails}
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
    </div>
  );
};

export default PermissionManagement; 