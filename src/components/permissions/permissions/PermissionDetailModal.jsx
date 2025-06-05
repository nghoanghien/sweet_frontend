import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Check, Users, Settings } from 'lucide-react';

const PermissionDetailModal = ({ isOpen, onClose, permission }) => {
  if (!isOpen || !permission) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="bg-white rounded-3xl shadow-xl w-full max-w-2xl max-h-[95vh] flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className={`px-8 py-6 flex justify-between items-center rounded-t-3xl shadow-[0_4px_30px_rgba(0,170,255,0.12)] border-b-2 border-blue-100
              bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-600 text-white`}>
              <div className="flex items-center gap-3">
                <Shield size={32} className="mr-3 text-white drop-shadow-lg" />
                <h3 className="text-2xl font-bold tracking-wide drop-shadow">{permission.name}</h3>
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
            
            {/* Content - Added overflow-y-auto for scrolling */}
            <div className="p-6 overflow-y-auto">
              {/* Type badge */}
              <div className="mb-6 flex items-center">
                <span className={`px-4 py-2 rounded-2xl text-base font-semibold flex items-center shadow-[0_2px_12px_rgba(0,170,255,0.08)] border border-blue-100
                  bg-gradient-to-r from-blue-50 via-indigo-50 to-white text-blue-700 gap-2`}>
                  {permission.type === 'customer' ? (
                    <><Users size={20} className="mr-2 text-blue-500" />Quyền khách hàng</>
                  ) : (
                    <><Settings size={20} className="mr-2 text-indigo-500" />Quyền nhân viên</>
                  )}
                </span>
              </div>
              
              {/* Description */}
              <div className="mb-6">
                <h4 className="text-base font-semibold text-blue-600 mb-2">Mô tả:</h4>
                <p className="text-gray-800 italic bg-blue-50/60 rounded-xl p-3 border border-blue-100 shadow-sm">{permission.description}</p>
              </div>
              
              {/* Functions */}
              <div>
                <h4 className="text-base font-semibold text-blue-600 mb-3">Chức năng:</h4>
                <div className="bg-gradient-to-br from-blue-50/80 to-white rounded-2xl p-5 border border-blue-100 shadow-[0_2px_12px_rgba(0,170,255,0.06)]">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {permission.functions && permission.functions.map((func, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.12, duration: 0.35 }}
                      >
                        <span className={`p-2 rounded-full mr-3 flex-shrink-0 bg-blue-100 text-blue-600 shadow-sm`}>
                          <Check size={18} />
                        </span>
                        <span className="text-gray-800 font-medium">{func}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="px-8 py-5 bg-gradient-to-r from-blue-50 via-indigo-50 to-white border-t-2 border-blue-100 flex justify-end rounded-b-3xl">
              <motion.button
                onClick={onClose}
                className="px-6 py-2 bg-blue-100 text-blue-700 rounded-xl font-semibold shadow hover:bg-blue-200 transition-all"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
              >
                Đóng
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PermissionDetailModal; 