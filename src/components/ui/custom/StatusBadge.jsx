import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Archive, Clock, AlertTriangle } from 'lucide-react';

const StatusBadge = ({ status, active = false }) => {
  // Cấu hình cho từng loại trạng thái
  const statusConfig = {
    active: {
      icon: <CheckCircle className="w-3.5 h-3.5 mr-1" />,
      text: 'Hoạt động',
      className: active 
        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-2 border-green-400 shadow-lg shadow-green-500/30' 
        : 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200',
      iconColor: active ? 'text-white' : 'text-green-500'
    },
    closed: {
      icon: <Archive className="w-3.5 h-3.5 mr-1" />,
      text: 'Đã đóng',
      className: active 
        ? 'bg-gradient-to-r from-gray-600 to-slate-700 text-white border-2 border-gray-400 shadow-lg shadow-gray-500/30' 
        : 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200',
      iconColor: active ? 'text-white' : 'text-gray-500'
    },
    inTerm: {
      icon: <Clock className="w-3.5 h-3.5 mr-1" />,
      text: 'Chưa đáo hạn',
      className: active 
        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-2 border-blue-400 shadow-lg shadow-blue-500/30' 
        : 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200',
      iconColor: active ? 'text-white' : 'text-blue-500'
    },
    matured: {
      icon: <AlertTriangle className="w-3.5 h-3.5 mr-1" />,
      text: 'Hết kỳ hạn',
      className: active 
        ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white border-2 border-orange-400 shadow-lg shadow-orange-500/30' 
        : 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border border-orange-200',
      iconColor: active ? 'text-white' : 'text-orange-500'
    },
    disabled: {
      icon: <XCircle className="w-3.5 h-3.5 mr-1" />,
      text: 'Vô hiệu hóa',
      className: active 
        ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white border-2 border-red-400 shadow-lg shadow-red-500/30' 
        : 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border border-red-200',
      iconColor: active ? 'text-white' : 'text-red-500'
    }
  };

  // Lấy cấu hình dựa trên trạng thái, nếu không có thì dùng disabled làm mặc định
  const config = statusConfig[status] || statusConfig.disabled;

  return (
    <motion.span 
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${config.className} ${
        active ? 'transform scale-105 ring-2 ring-offset-2 ring-current/20' : 'shadow-sm'
      }`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: active ? 1.05 : 1,
        y: active ? -1 : 0
      }}
      whileHover={{ 
        scale: active ? 1.08 : 1.05, 
        boxShadow: active 
          ? '0 8px 25px rgba(0,0,0,0.15)' 
          : '0 1px 8px rgba(0,0,0,0.05)',
        y: active ? -2 : -1
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        duration: 0.2,
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
    >
      <motion.span 
        className={`${config.iconColor} font-semibold`}
        initial={{ rotate: -10 }}
        animate={{ 
          rotate: active ? 5 : 0,
          scale: active ? 1.1 : 1
        }}
        whileHover={{ 
          rotate: active ? 15 : 10,
          scale: active ? 1.2 : 1.1
        }}
        transition={{ duration: 0.2 }}
      >
        {config.icon}
      </motion.span>
      <motion.span
        animate={{ 
          fontWeight: active ? 700 : 600,
          letterSpacing: active ? '0.02em' : '0em'
        }}
        transition={{ duration: 0.2 }}
      >
        {config.text}
      </motion.span>
      {active && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.span>
  );
};

export default StatusBadge;