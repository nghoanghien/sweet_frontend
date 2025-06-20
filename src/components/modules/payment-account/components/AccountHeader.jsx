import React from 'react';
import { CreditCard, Eye, EyeOff, Plus, Wallet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AccountHeader = ({ 
  accounts, 
  totalBalance, 
  hideAllSensitiveInfo, 
  toggleAllSensitiveInfo,
  formatCurrency,
}) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-700 to-blue-500 bg-clip-text text-transparent mb-1">Tài khoản thanh toán</h2>
          <p className="text-gray-500 text-sm">Quản lý tài khoản thanh toán của khách hàng</p>
        </motion.div>
        
        {/* Thông tin tổng hợp và nút hiển thị */}
        <motion.div 
          className="flex flex-col pt-4 sm:flex-row gap-3 sm:items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div              
            className="relative group bg-white/90 backdrop-blur-xl p-4 rounded-3xl shadow-lg border border-indigo-200/50 flex items-center space-x-4"             
            whileHover={{ 
              boxShadow: "0 20px 40px -10px rgba(79, 70, 229, 0.2)", 
              y: -4,
              scale: 1.02 
            }}             
            transition={{ duration: 0.3, type: "spring", stiffness: 400, damping: 25 }}           
          >             
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-200/30 to-blue-200/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 pointer-events-none"></div>
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center shadow-lg">               
              <CreditCard size={20} className="text-white" />             
            </div>             
            <div className="relative">               
              <p className="text-xs text-slate-500 font-medium mb-1">Tổng số tài khoản</p>               
              <p className="text-base font-bold text-gray-800">{accounts.length} tài khoản</p>             
            </div>           
          </motion.div>                      

          <motion.div              
            className="relative group bg-white/90 backdrop-blur-xl p-4 rounded-3xl shadow-lg border border-green-200/50 flex items-center space-x-4"             
            whileHover={{ 
              boxShadow: "0 20px 40px -10px rgba(16, 185, 129, 0.2)", 
              y: -4,
              scale: 1.02 
            }}             
            transition={{ duration: 0.3, type: "spring", stiffness: 400, damping: 25 }}           
          >             
            <div className="absolute inset-0 bg-gradient-to-r from-green-200/30 to-emerald-200/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 pointer-events-none"></div>
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">               
              <Wallet size={20} className="text-white" />             
            </div>             
            <div className="relative">               
              <p className="text-xs text-slate-500 font-medium mb-1">Tổng số dư</p>               
              <p className="text-base font-bold text-gray-800">                 
                {hideAllSensitiveInfo                   
                  ? "••••••••"                    
                  : formatCurrency(totalBalance)}               
              </p>             
            </div>           
          </motion.div>
          
          <div className="flex space-x-2">
            {/* Nút ẩn/hiện tất cả */}
            <motion.button 
              onClick={toggleAllSensitiveInfo}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <AnimatePresence mode="wait">
                {hideAllSensitiveInfo ? (
                  <motion.div 
                    key="show"
                    className="flex items-center space-x-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Eye size={16} />
                    <span>Hiện tất cả</span>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="hide"
                    className="flex items-center space-x-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <EyeOff size={16} />
                    <span>Ẩn tất cả</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AccountHeader;