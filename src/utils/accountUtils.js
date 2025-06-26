import React from 'react';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

// Lấy thông tin trạng thái tài khoản
export const getStatusInfo = (status) => {
  switch (status) {
    case 'active':
      return {
        icon: <CheckCircle size={14} className="text-green-500 mr-1" />,
        text: 'Hoạt động',
        textColor: 'text-green-600',
        bgColor: 'bg-green-100'
      };
    case 'locked':
      return {
        icon: <AlertCircle size={14} className="text-amber-500 mr-1" />,
        text: 'Tạm khóa',
        textColor: 'text-amber-600',
        bgColor: 'bg-amber-100'
      };
    case 'permanent_locked':
      return {
        icon: <XCircle size={14} className="text-red-500 mr-1" />,
        text: 'Khóa vĩnh viễn',
        textColor: 'text-red-600',
        bgColor: 'bg-red-100'
      };
    default:
      return {
        icon: <AlertCircle size={14} className="text-gray-500 mr-1" />,
        text: 'Không xác định',
        textColor: 'text-gray-600',
        bgColor: 'bg-gray-100'
      };
  }
};

// Format tiền tệ
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(amount);
};

// Ẩn số tài khoản
export const maskAccountNumber = (accountNumber) => {
  if (!accountNumber) return '';
  const lastFourDigits = accountNumber.slice(-4);
  return '•••• •••• •••• ' + lastFourDigits;
};

// Lấy thông tin kênh giao dịch
export const getChannelInfo = (channel) => {
  switch (channel) {
    case 'internet_banking':
      return {
        name: 'Internet Banking',
        icon: <span className="text-blue-500 mr-1">🌐</span>
      };
    case 'atm':
      return {
        name: 'ATM',
        icon: <span className="text-amber-500 mr-1">🏧</span>
      };
    case 'mobile_app':
      return {
        name: 'Mobile App',
        icon: <span className="text-green-500 mr-1">📱</span>
      };
    case 'counter':
      return {
        name: 'Tại quầy giao dịch',
        icon: <span className="text-purple-500 mr-1">🏦</span>
      };
    default:
      return {
        name: 'Khác',
        icon: <span className="text-gray-500 mr-1">📋</span>
      };
  }
};

/**
 * Format date từ chuỗi ISO hoặc Date object sang định dạng "DD/MM/YYYY"
 * @param {string | Date} date - Ngày cần format
 * @returns {string} Ngày đã được format
 */
export const formatDate = (date) => {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
};

/**
 * Format time từ chuỗi ISO hoặc Date object sang định dạng "HH:mm"
 * @param {string | Date} date - Thời gian cần format
 * @returns {string} Thời gian đã được format
 */
export const formatTime = (date) => {
  const d = new Date(date);
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};

// Ví dụ sử dụng:
// const date = new Date();
// console.log(formatDate(date)); // Output: "23/03/2024"
// console.log(formatTime(date)); // Output: "15:30" 