import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Archive, Clock, AlertTriangle } from 'lucide-react';

const StatusBadge = ({ status }) => {
  // Cấu hình cho từng loại trạng thái
  const statusConfig = {
    active: {
      icon: <CheckCircle className="w-3.5 h-3.5 mr-1" />,
      text: 'Hoạt động',
      className: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200',
      iconColor: 'text-green-500'
    },
    closed: {
      icon: <Archive className="w-3.5 h-3.5 mr-1" />,
      text: 'Đã đóng',
      className: 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200',
      iconColor: 'text-gray-500'
    },
    inTerm: {
      icon: <Clock className="w-3.5 h-3.5 mr-1" />,
      text: 'Chưa đáo hạn',
      className: 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200',
      iconColor: 'text-blue-500'
    },
    matured: {
      icon: <AlertTriangle className="w-3.5 h-3.5 mr-1" />,
      text: 'Hết kỳ hạn',
      className: 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border border-orange-200',
      iconColor: 'text-orange-500'
    },
    disabled: {
      icon: <XCircle className="w-3.5 h-3.5 mr-1" />,
      text: 'Vô hiệu hóa',
      className: 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border border-red-200',
      iconColor: 'text-red-500'
    }
  };

  // Lấy cấu hình dựa trên trạng thái, nếu không có thì dùng disabled làm mặc định
  const config = statusConfig[status] || statusConfig.disabled;

  return (
    <motion.span 
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm ${config.className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}
      transition={{ duration: 0.2 }}
    >
      <motion.span 
        className={`${config.iconColor} font-semibold`}
        initial={{ rotate: -10 }}
        animate={{ rotate: 0 }}
        whileHover={{ rotate: 10 }}
      >
        {config.icon}
      </motion.span>
      {config.text}
    </motion.span>
  );
};

export default StatusBadge;