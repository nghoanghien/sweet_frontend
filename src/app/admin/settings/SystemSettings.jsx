import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Edit2, Save, User, UserCheck } from 'lucide-react';
import SwipeConfirmationModal from '@/components/modals/ConfirmationModal/SwipeConfirmationModal';
import ExportNotification from '@/components/common/ExportNotification';

const SystemSettings = () => {
  // State cho giá trị hiện tại
  const [minEmployeeAge, setMinEmployeeAge] = useState(18);
  const [minCustomerAge, setMinCustomerAge] = useState(16);
  const [minTransactionAmountForPaymentAccount, setMinTransactionAmountForPaymentAccount] = useState(100000);
  const [maxTransactionAmountForPaymentAccount, setMaxTransactionAmountForPaymentAccount] = useState(100000);
  const [minWithdrawalAmountForSavingAccount, setMinWithdrawalAmountForSavingAccount] = useState(100000);
  // State cho giá trị đang chỉnh sửa
  const [editedMinEmployeeAge, setEditedMinEmployeeAge] = useState(minEmployeeAge);
  const [editedMinCustomerAge, setEditedMinCustomerAge] = useState(minCustomerAge);
  const [editedMinTransactionAmountForPaymentAccount, setEditedMinTransactionAmountForPaymentAccount] = useState(minTransactionAmountForPaymentAccount);
  const [editedMaxTransactionAmountForPaymentAccount, setEditedMaxTransactionAmountForPaymentAccount] = useState(maxTransactionAmountForPaymentAccount);
  const [editedMinWithdrawalAmountForSavingAccount, setEditedMinWithdrawalAmountForSavingAccount] = useState(minWithdrawalAmountForSavingAccount);

  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Xử lý lưu thay đổi
  const handleSave = () => {
    setShowConfirmModal(true);
  };

  // Xác nhận thay đổi
  const handleConfirm = () => {
    // Set processing state to true
    setIsProcessing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      try {
        // Update all settings
        setMinEmployeeAge(editedMinEmployeeAge);
        setMinCustomerAge(editedMinCustomerAge);
        setMinTransactionAmountForPaymentAccount(editedMinTransactionAmountForPaymentAccount);
        setMaxTransactionAmountForPaymentAccount(editedMaxTransactionAmountForPaymentAccount);
        setMinWithdrawalAmountForSavingAccount(editedMinWithdrawalAmountForSavingAccount);
        
        // Update UI state
        setIsEditing(false);
        setShowConfirmModal(false);
        setShowSuccessNotification(true);
      } catch (error) {
        console.error('Error updating settings:', error);
        // In a real app, show error notification here
      } finally {
        // Reset processing state
        setIsProcessing(false);
      }
    }, 1500); // 1.5 second delay to simulate API call
  };

  // Hủy chỉnh sửa
  const handleCancel = () => {
    setEditedMinEmployeeAge(minEmployeeAge);
    setEditedMinCustomerAge(minCustomerAge);
    setEditedMinTransactionAmountForPaymentAccount(minTransactionAmountForPaymentAccount);
    setEditedMaxTransactionAmountForPaymentAccount(maxTransactionAmountForPaymentAccount);
    setEditedMinWithdrawalAmountForSavingAccount(minWithdrawalAmountForSavingAccount);
    setIsEditing(false);
  };

  function formatVND(amount) {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  }  

  // Hiệu ứng motion cho card
  const cardMotion = {
    initial: { opacity: 0, y: 24, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.5, ease: 'easeOut' }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-3xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Cài đặt hệ thống</h2>
      <p className="text-gray-500 mb-8">Quản lý các thông số hệ thống quan trọng, đảm bảo tuân thủ quy định và vận hành hiệu quả.</p>

      {/* Tổng quan */}
      <motion.div {...cardMotion} className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Card nhân viên */}
          <motion.div
            whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(0,170,255,0.10)' }}
            className="relative bg-white/80 rounded-2xl p-5 flex items-center shadow-[0_2px_12px_rgba(0,170,255,0.06)] border border-blue-50"
          >
            {/* Background Icon - Large and Faded */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <div className="opacity-[0.09] text-blue-400 transform scale-[2] translate-y-4 translate-x-20">
                <User size={50} strokeWidth={3.2} />
              </div>
            </div>
            <motion.span
              initial={{ scale: 1 }}
              animate={{ scale: 1.1 }}
              transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2, ease: 'easeInOut' }}
              className="mr-4 flex-shrink-0"
            >
              <User size={28} className="text-blue-500" />
            </motion.span>
            <div>
              <p className="text-sm text-gray-500">Độ tuổi <span className='font-bold text-red-500'>TỐI THIỂU</span> nhân viên</p>
              <p className="text-xl font-bold text-gray-800">{minEmployeeAge} tuổi</p>
            </div>
          </motion.div>
          {/* Card khách hàng */}
          <motion.div
            whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(99,102,241,0.10)' }}
            className="relative bg-white/80 rounded-2xl p-5 flex items-center shadow-[0_2px_12px_rgba(99,102,241,0.06)] border border-indigo-50"
          >
            {/* Background Icon - Large and Faded */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <div className="opacity-[0.09] text-blue-400 transform scale-[2] translate-y-4 translate-x-20">
                <UserCheck size={50} strokeWidth={3.2} />
              </div>
            </div>
            <motion.span
              initial={{ scale: 1 }}
              animate={{ scale: 1.1 }}
              transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2.2, ease: 'easeInOut' }}
              className="mr-4 flex-shrink-0"
            >
              <UserCheck size={28} className="text-indigo-500" />
            </motion.span>
            <div>
              <p className="text-sm text-gray-500">Độ tuổi <span className='font-bold text-red-500'>TỐI THIỂU</span> khách hàng</p>
              <p className="text-xl font-bold text-gray-800">{minCustomerAge} tuổi</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(99,102,241,0.10)' }}
            className="relative bg-white/80 rounded-2xl p-5 flex items-center shadow-[0_2px_12px_rgba(99,102,241,0.06)] border border-indigo-50"
          >
            {/* Background Icon - Large and Faded */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <div className="opacity-[0.09] text-blue-400 transform scale-[2] translate-y-8 translate-x-20">
                <CreditCard size={50} strokeWidth={3.2} />
              </div>
            </div>
            <motion.span
              initial={{ scale: 1 }}
              animate={{ scale: 1.1 }}
              transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2.2, ease: 'easeInOut' }}
              className="mr-4 flex-shrink-0"
            >
              <CreditCard size={28} className="text-indigo-500" />
            </motion.span>
            <div>
              <p className="text-sm text-gray-500">Số tiền <span className='font-bold text-red-500'>TỐI THIỂU</span> cho mỗi giao dịch nạp/rút tài khoản thanh toán</p>
              <p className="text-xl font-bold text-gray-800">{formatVND(minTransactionAmountForPaymentAccount)}</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(99,102,241,0.10)' }}
            className="relative bg-white/80 rounded-2xl p-5 flex items-center shadow-[0_2px_12px_rgba(99,102,241,0.06)] border border-indigo-50"
          >
            {/* Background Icon - Large and Faded */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <div className="opacity-[0.09] text-blue-400 transform scale-[2] translate-y-8 translate-x-20">
                <CreditCard size={50} strokeWidth={3.2} />
              </div>
            </div>
            <motion.span
              initial={{ scale: 1 }}
              animate={{ scale: 1.1 }}
              transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2.2, ease: 'easeInOut' }}
              className="mr-4 flex-shrink-0"
            >
              <CreditCard size={28} className="text-indigo-500" />
            </motion.span>
            <div>
              <p className="text-sm text-gray-500">Số tiền <span className='font-bold text-red-500'>TỐI ĐA</span> cho mỗi giao dịch nạp/rút tài khoản thanh toán</p>
              <p className="text-xl font-bold text-gray-800">{formatVND(maxTransactionAmountForPaymentAccount)}</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(99,102,241,0.10)' }}
            className="relative bg-white/80 rounded-2xl p-5 flex items-center shadow-[0_2px_12px_rgba(99,102,241,0.06)] border border-indigo-50"
          >
            {/* Background Icon - Large and Faded */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <div className="opacity-[0.09] text-blue-400 transform scale-[2] translate-y-8 translate-x-20">
                <CreditCard size={50} strokeWidth={3.2} />
              </div>
            </div>
            <motion.span
              initial={{ scale: 1 }}
              animate={{ scale: 1.1 }}
              transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2.2, ease: 'easeInOut' }}
              className="mr-4 flex-shrink-0"
            >
              <CreditCard size={28} className="text-indigo-500" />
            </motion.span>
            <div>
              <p className="text-sm text-gray-500">Số tiền <span className='font-bold text-red-500'>TỐI THIỂU</span> cho giao dịch rút tài khoản tiết kiệm</p>
              <p className="text-xl font-bold text-gray-800">{formatVND(minWithdrawalAmountForSavingAccount)}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Form chỉnh sửa */}
      {isEditing && (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-blue-50/80 to-white rounded-3xl shadow-[0_4px_30px_rgba(0,170,255,0.12)] p-6 mb-8 border border-blue-100"
        >
          <div className="mb-5">
            <label className="block text-base font-semibold text-blue-700 mb-2 flex items-center gap-2">
              <User size={18} className="text-blue-400" /> Độ tuổi tối thiểu nhân viên
            </label>
            <div className="relative">
              <input
                type="number"
                min={16}
                max={100}
                value={editedMinEmployeeAge}
                onChange={e => setEditedMinEmployeeAge(Number(e.target.value))}
                className="w-full border-2 border-blue-100 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 text-base bg-white/80 shadow-inner transition-all duration-200 font-medium text-blue-800 placeholder-blue-300"
                placeholder="Nhập độ tuổi tối thiểu nhân viên..."
              />
              <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" />
            </div>
          </div>
          <div className="mb-5">
            <label className="block text-base font-semibold text-indigo-700 mb-2 flex items-center gap-2">
              <UserCheck size={18} className="text-indigo-400" /> Độ tuổi tối thiểu khách hàng
            </label>
            <div className="relative">
              <input
                type="number"
                min={10}
                max={100}
                value={editedMinCustomerAge}
                onChange={e => setEditedMinCustomerAge(Number(e.target.value))}
                className="w-full border-2 border-indigo-100 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 text-base bg-white/80 shadow-inner transition-all duration-200 font-medium text-indigo-800 placeholder-indigo-300"
                placeholder="Nhập độ tuổi tối thiểu khách hàng..."
              />
              <UserCheck size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-300" />
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-base font-semibold text-indigo-700 mb-2 flex items-center gap-2">
              <UserCheck size={18} className="text-indigo-400" /> Số tiền <span className='font-bold text-red-500'>TỐI THIỂU</span> cho mỗi giao dịch nạp/rút tài khoản thanh toán
            </label>
            <div className="relative">
              <input
                type="number"
                value={editedMinTransactionAmountForPaymentAccount}
                onChange={e => setEditedMinTransactionAmountForPaymentAccount(Number(e.target.value))}
                className="w-full border-2 border-indigo-100 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 text-base bg-white/80 shadow-inner transition-all duration-200 font-medium text-indigo-800 placeholder-indigo-300"
                placeholder="Nhập số tiền tối thiểu trên mỗi giao dịch nạp/rút tài khoản tài khoản thanh toán..."
              />
              <UserCheck size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-300" />
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-base font-semibold text-indigo-700 mb-2 flex items-center gap-2">
              <UserCheck size={18} className="text-indigo-400" /> Số tiền <span className='font-bold text-red-500'>TỐI ĐA</span> cho mỗi giao dịch nạp/rút tài khoản thanh toán
            </label>
            <div className="relative">
              <input
                type="number"
                value={editedMaxTransactionAmountForPaymentAccount}
                onChange={e => setEditedMaxTransactionAmountForPaymentAccount(Number(e.target.value))}
                className="w-full border-2 border-indigo-100 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 text-base bg-white/80 shadow-inner transition-all duration-200 font-medium text-indigo-800 placeholder-indigo-300"
                placeholder="Nhập số tiền tối đa trên mỗi giao dịch nạp/rút tài khoản tài khoản thanh toán..."
              />
              <UserCheck size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-300" />
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-base font-semibold text-indigo-700 mb-2 flex items-center gap-2">
              <UserCheck size={18} className="text-indigo-400" /> Số tiền <span className='font-bold text-red-500'>TỐI THIỂU</span> cho mỗi giao dịch rút tài khoản tiền gửi
            </label>
            <div className="relative">
              <input
                type="number"
                value={editedMinWithdrawalAmountForSavingAccount}
                onChange={e => setEditedMinWithdrawalAmountForSavingAccount(Number(e.target.value))}
                className="w-full border-2 border-indigo-100 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 text-base bg-white/80 shadow-inner transition-all duration-200 font-medium text-indigo-800 placeholder-indigo-300"
                placeholder="Nhập số tiền tối thiểu trên mỗi giao dịch rút tài khoản tiền gửi..."
              />
              <UserCheck size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-300" />
            </div>
          </div>
          
          <div className="flex gap-3 justify-end mt-6">
            <motion.button
              whileHover={{ scale: 1.06, boxShadow: '0 0 12px rgba(0,0,0,0.08)' }}
              whileTap={{ scale: 0.96 }}
              onClick={handleCancel}
              className="px-4 md:px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl shadow-sm hover:bg-gray-200 font-semibold tracking-wide"
            >
              Hủy
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08, boxShadow: '0 0 16px rgba(0,170,255,0.18)' }}
              whileTap={{ scale: 0.96 }}
              onClick={handleSave}
              className="px-4 md:px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-[0_4px_20px_rgba(0,170,255,0.13)] flex items-center font-semibold tracking-wide gap-2"
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
        </motion.div>
      )}

      {/* Nút chỉnh sửa */}
      {!isEditing && (
        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.08, boxShadow: '0 0 16px rgba(0,170,255,0.18)' }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsEditing(true)}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-[0_4px_20px_rgba(0,170,255,0.13)] flex items-center font-semibold tracking-wide gap-2"
          >
            <motion.span
              whileHover={{ rotate: 10 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="inline-flex"
            >
              <Edit2 size={18} />
            </motion.span>
            Chỉnh sửa
          </motion.button>
        </div>
      )}

      {/* Modal xác nhận */}
      <SwipeConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirm}
        title="Xác nhận cập nhật cài đặt"
        description="Bạn có chắc chắn muốn thay đổi các thông số hệ thống này?"
        confirmText="Vuốt để xác nhận"
        type="warning"
        isProcessing={isProcessing}
        confirmDetails={{
          'Độ tuổi tối thiểu nhân viên': `${editedMinEmployeeAge} tuổi`,
          'Độ tuổi tối thiểu khách hàng': `${editedMinCustomerAge} tuổi`,
          'Số tiền tối thiểu mỗi giao dịch TKTT': `${formatVND(editedMinTransactionAmountForPaymentAccount)}`,
          'Số tiền tối đa mỗi giao dịch TKTT': `${formatVND(editedMaxTransactionAmountForPaymentAccount)}`,
          'Số tiền rút tối thiểu TKTK': `${formatVND(editedMinWithdrawalAmountForSavingAccount)}`,
        }}
      />

      {/* Thông báo thành công */}
      <ExportNotification
        isVisible={showSuccessNotification}
        onClose={() => setShowSuccessNotification(false)}
        type="success"
        message="Cập nhật cài đặt thành công!"
        format="Thiết lập cài đặt thành công"
      />
    </div>
  );
};

export default SystemSettings;