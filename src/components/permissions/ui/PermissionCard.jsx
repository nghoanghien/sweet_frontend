import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ChevronRight, Lock } from 'lucide-react';

const PermissionCard = ({ permission, onClick }) => {
  // Hàm chọn icon dựa trên loại quyền
  const getPermissionIcon = (permissionType) => {
    switch (permissionType) {
      case 'customer':
        return <Shield className="text-blue-500 drop-shadow" size={28} />;
      case 'staff':
        return <Lock className="text-indigo-600 drop-shadow" size={28} />;
      default:
        return <Shield className="text-gray-400" size={28} />;
    }
  };

  return (
    <motion.div
      onClick={onClick}
      className="bg-gradient-to-br from-blue-50/80 to-white rounded-2xl shadow-[0_4px_20px_rgba(0,170,255,0.10)] p-6 border-2 border-blue-100 cursor-pointer transition-all"
      whileHover={{ 
        scale: 1.045, 
        boxShadow: '0 8px 36px rgba(0,170,255,0.16)',
        borderColor: '#60a5fa' 
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <motion.div
            className="mr-5 p-3 rounded-2xl bg-blue-100/60 shadow-sm"
            whileHover={{ rotate: [0, -10, 10, -5, 0] }}
            transition={{ duration: 0.5 }}
          >
            {getPermissionIcon(permission.type)}
          </motion.div>
          <div>
            <h3 className="font-bold text-lg text-blue-800 mb-1">{permission.name}</h3>
            <p className="text-sm text-blue-600 italic">{permission.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1.5 text-xs font-semibold rounded-2xl shadow-sm border border-blue-100 bg-gradient-to-r ${
            permission.type === 'customer' 
              ? 'from-blue-100 via-blue-50 to-white text-blue-700' 
              : 'from-indigo-100 via-blue-50 to-white text-indigo-700'
          }`}>
            {permission.type === 'customer' ? 'Khách hàng' : 'Nhân viên'}
          </span>
          <ChevronRight size={22} className="text-blue-300 ml-1" />
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {permission.functions && permission.functions.map((func, index) => (
          <motion.span
            key={index}
            className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-xl text-xs font-semibold shadow-sm border border-blue-100 transition-all"
            whileHover={{ scale: 1.08, backgroundColor: '#dbeafe', color: '#1e40af' }}
          >
            {func}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default PermissionCard; 