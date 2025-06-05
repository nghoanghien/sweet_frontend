import React from 'react';
import { X, CreditCard, CheckCircle, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NewAccountModal = ({ isOpen, onClose, onCreateAccount }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div 
            className="bg-gradient-to-b from-white to-slate-50 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative border border-white/60"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.4
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative p-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white overflow-hidden">
              <motion.div 
                className="absolute w-40 h-40 rounded-full bg-white/10 top-[-60px] right-[-20px] blur-sm"
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [0.5, 0.7, 0.5]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <div className="flex justify-between items-center relative z-10">
                <h2 className="text-xl font-semibold tracking-wide">Tạo tài khoản mới</h2>
                <button 
                  onClick={onClose}
                  className="rounded-full h-9 w-9 flex items-center justify-center bg-white/20 hover:bg-white/30 transition-all duration-200 border border-white/40 backdrop-blur-sm"
                  aria-label="Đóng"
                >
                  <X size={18} className="text-white" />
                </button>
              </div>
              
              <div className="flex items-center mt-4 relative z-10">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md flex items-center justify-center p-1 border border-white/40 shadow-lg">
                  <CreditCard size={28} className="text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-white/90">Tạo tài khoản thanh toán mới với số dư ban đầu là 0đ</p>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center mr-3">
                    <CheckCircle size={18} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Tài khoản sẽ được tạo với:</p>
                  </div>
                </div>
                
                <ul className="space-y-3 ml-11">
                  <motion.li 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <CheckCircle size={12} className="text-green-600" />
                    </div>
                    <p className="text-sm text-slate-600">Số tài khoản ngẫu nhiên 16 chữ số</p>
                  </motion.li>
                  <motion.li 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <CheckCircle size={12} className="text-green-600" />
                    </div>
                    <p className="text-sm text-slate-600">Số dư khởi tạo: 0đ</p>
                  </motion.li>
                  <motion.li 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <CheckCircle size={12} className="text-green-600" />
                    </div>
                    <p className="text-sm text-slate-600">Thiết kế thẻ với màu ngẫu nhiên</p>
                  </motion.li>
                  <motion.li 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <CheckCircle size={12} className="text-green-600" />
                    </div>
                    <p className="text-sm text-slate-600">Trạng thái: Hoạt động</p>
                  </motion.li>
                </ul>
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={onCreateAccount}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center"
                >
                  <Plus size={18} className="mr-2" />
                  Tạo tài khoản mới
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewAccountModal;