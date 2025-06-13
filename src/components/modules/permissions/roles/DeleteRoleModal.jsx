import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Trash2, UserMinus } from 'lucide-react';
import SwipeConfirmationModal from '@/components/modals/ConfirmationModal/SwipeConfirmationModal';

const DeleteRoleModal = ({ isOpen, onClose, onConfirm, role }) => {
  // State cho modal xác nhận
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    description: '',
    type: 'danger',
    confirmDetails: null,
    onConfirm: () => {},
    isProcessing: false,
  });

  if (!isOpen || !role) return null;

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

  // Xử lý khi xác nhận xóa vai trò
  const handleDelete = () => {
    const confirmDetails = {
      'Tên vai trò': role.name,
      'Loại vai trò': role.type === 'staff' ? 'Nhân viên' : 'Khách hàng',
      'Số tài khoản ảnh hưởng': role.accountCount || 0
    };
    
    showConfirmModal(
      'Xóa vai trò',
      `Xác nhận xóa vai trò "${role.name}"?`,
      'danger',
      confirmDetails,
      () => {
        // Cập nhật trạng thái đang xử lý
        setConfirmationProcessing(true);
        
        // Giả lập thời gian xử lý API
        setTimeout(() => {
          try {
            // Tạo thông tin thông báo
        const notificationInfo = {
          message: 'Xóa vai trò thành công!',
          type: 'success',
          format: `Đã xóa vai trò "${role.name}" thành công!`
        };
        
        // Gọi hàm onConfirm từ props với thông tin thông báo
        onConfirm(notificationInfo);
            
            // Đóng modal chính ngay lập tức
            onClose();
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

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-3xl shadow-xl w-full max-w-md max-h-[95vh] flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            layoutId={`delete-role-${role.id}`}
            transition={{ duration: 0.2, type: "spring", stiffness: 150, damping: 18 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-8 py-6 flex justify-between items-center rounded-t-3xl shadow-[0_4px_30px_rgba(239,68,68,0.12)] border-b-2 border-red-100 bg-gradient-to-r from-red-500 via-red-400 to-rose-600 text-white">
              <div className="flex items-center gap-3">
                <Trash2 size={32} className="mr-3 text-white drop-shadow-lg" />
                <h3 className="text-2xl font-bold tracking-wide drop-shadow">Xóa vai trò</h3>
              </div>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-all"
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.92 }}
              >
                <X size={28} />
              </motion.button>
            </div>
            
            {/* Content */}
            <div className="p-7 overflow-y-auto">
              <div className="flex items-center justify-center mb-4">
                <motion.div
                  className="bg-red-100 p-5 rounded-full text-red-500 shadow-[0_2px_12px_rgba(239,68,68,0.10)]"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  <AlertTriangle size={44} />
                </motion.div>
              </div>
              
              <h4 className="text-xl font-bold text-center text-gray-800 mb-2">
                Bạn có chắc chắn muốn xóa vai trò này?
              </h4>
              
              <p className="text-center text-gray-600 mb-4">
                Vai trò <span className="font-semibold text-red-600">{role.name}</span> sẽ bị xóa vĩnh viễn.
              </p>
              
              {role.accountCount > 0 && (
                <motion.div
                  className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-4 shadow-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <div className="flex items-start">
                    <UserMinus className="text-amber-500 mr-3 mt-0.5 flex-shrink-0" size={22} />
                    <div>
                      <p className="text-amber-700 font-semibold">Cảnh báo quan trọng</p>
                      <p className="text-amber-600 text-sm mt-1">
                        Hiện có <span className="font-semibold">{role.accountCount} tài khoản</span> đang được gán vai trò này.
                        Khi xóa, tất cả các tài khoản này sẽ được chuyển sang vai trò "Không có quyền" và sẽ không thể thực hiện bất kỳ thao tác nào.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Footer */}
            <div className="px-8 py-5 bg-gradient-to-r from-rose-50 via-red-50 to-white border-t-2 border-red-100 flex justify-end gap-3 rounded-b-3xl">
              <motion.button
                onClick={onClose}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold shadow hover:bg-gray-200 transition-all"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
              >
                Hủy
              </motion.button>
              <motion.button
                onClick={handleDelete}
                className="px-6 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl font-semibold shadow-md flex items-center hover:from-red-600 hover:to-rose-700 transition-all"
                whileHover={{ scale: 1.08, boxShadow: '0 4px 20px rgba(239,68,68,0.18)' }}
                whileTap={{ scale: 0.96 }}
              >
                <Trash2 size={20} className="mr-2" />
                Xác nhận xóa
              </motion.button>
            </div>
          </motion.div>

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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteRoleModal;