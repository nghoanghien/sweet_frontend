import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, DollarSign, TrendingUp, User } from 'lucide-react';

const RegulationTooltip = ({ regulation, position, colorMappings, regulations, getNextRegulation }) => {
  // Format currency for display
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  // Tính ngày kết thúc
  let endDate = null;
  if (getNextRegulation) {
    const nextReg = getNextRegulation(regulation);
    if (nextReg) {
      // Ngày kết thúc là ngày trước ngày áp dụng của quy định tiếp theo
      const nextDate = new Date(nextReg.applicationDate);
      nextDate.setDate(nextDate.getDate() - 1);
      endDate = formatDate(nextDate.toISOString().split('T')[0]);
    }
  }

  // Calculate position with offset to avoid cursor covering tooltip
  const tooltipX = position.x + 15;
  const tooltipY = position.y + 15;

  // Get color set for this regulation
  const colorSet = colorMappings[regulation.color] || colorMappings.indigo;

  return (
    <motion.div
      className="fixed z-50 w-72 bg-white/80 backdrop-blur-md to-white rounded-3xl shadow-[0_8px_32px_rgba(79,70,229,0.18)] border-2 border-transparent hover:border-indigo-300 p-4 animate-fadeIn"
      style={{
        left: tooltipX,
        top: tooltipY,
      }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.22, type: 'spring', stiffness: 320, damping: 22 }}
    >
      <div className="space-y-4">
        {/* Header with color indicator */}
        <div className="flex items-center space-x-3">
          <motion.span
            className={`w-4 h-4 rounded-full shadow-lg border-2 border-white ${colorSet.bgHighlight}`}
            animate={{ scale: [1, 1.18, 1], boxShadow: [
              '0 0 0 0 rgba(99,102,241,0.18)',
              '0 0 0 8px rgba(99,102,241,0.10)',
              '0 0 0 0 rgba(99,102,241,0.18)'] }}
            transition={{ repeat: Infinity, duration: 2.2, repeatType: 'loop' }}
          />
          <h3 className="font-extrabold text-indigo-700 text-lg tracking-tight drop-shadow-sm">
            {regulation.name}
          </h3>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Calendar size={18} className="text-gray-600 animate-fadeIn" />
          <span className="text-gray-600 font-medium">
            Áp dụng từ: <span className="font-bold text-gray-600">{formatDate(regulation.applicationDate)}</span>
          </span>
        </div>
        {/* Ngày kết thúc */}
        <div className="flex items-center space-x-2 text-sm">
          <Calendar size={18} className="text-gray-400 animate-fadeIn" />
          <span className="text-gray-600 font-medium">
            Kết thúc: <span className="font-bold text-gray-600">{endDate ? endDate : 'Chưa kết thúc'}</span>
          </span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <User size={18} className="text-gray-600 animate-fadeIn" />
          <span className="text-gray-600 font-medium">
            Người tạo: <span className="font-bold text-gray-600">{regulation.creator}</span>
          </span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <DollarSign size={18} className="text-gray-600 animate-fadeIn" />
          <span className="text-gray-600 font-medium">
            Số tiền gửi tối thiểu: <span className="font-bold text-gray-600">{formatCurrency(regulation.minimumDeposit)}</span>
          </span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <TrendingUp size={18} className="text-gray-600 animate-fadeIn" />
          <span className="text-gray-600 font-medium">
            Lãi suất không kỳ hạn: <span className="font-bold text-gray-600">{regulation.noTermRate}%</span>
          </span>
        </div>
        {regulation.description && (
          <div className="mt-2 text-indigo-600 text-sm italic bg-indigo-50/60 rounded-xl p-2 border border-indigo-100 shadow-sm animate-fadeIn">
            {regulation.description}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RegulationTooltip; 