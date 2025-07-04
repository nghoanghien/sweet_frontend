import React, { useRef } from 'react';
import { Eye, EyeOff, Lock as LockIcon, Unlock as UnlockIcon, Calendar, CreditCard } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { maskAccountNumber, formatCurrency } from '@/utils/accountUtils';

const AccountCard = ({ account, isHidden, onToggleHide, onViewDetail }) => {
  const cardRef = useRef(null);

  return (
    <AnimatePresence mode='wait'>
      <motion.div 
      ref={cardRef} 
      layoutId={`payment-account-card-${account.id}`}
      className="bg-white backdrop-blur-md rounded-2xl shadow-md hover:shadow-lg overflow-hidden account-card group"
      transition={{ duration: 0.2, type: "spring", stiffness: 150, damping: 20 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onViewDetail}
    >
      <div className={`p-5 ${account.color} relative overflow-hidden group-hover:shadow-lg`}>
        {/* Hiệu ứng hover */}
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute -inset-1 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 animate-shimmer"></div>
        
        <div className="flex justify-between items-start relative z-10">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <CreditCard size={24} className="text-white" />
            </div>
            <div className="text-white">
              <h3 className="font-medium text-sm group-hover:text-white/95">{account.type}</h3>
              <p className="text-xs text-white/80 font-mono tracking-wide group-hover:text-white">
                {isHidden ? 
                  maskAccountNumber(account.accountNumber) : 
                  <span className="animate-fadeIn">{account.accountNumber}</span>}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            {/* Eye toggle button */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onToggleHide(account.id);
              }}
              className="rounded-full p-1.5 bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:rotate-12 hover:scale-110"
              aria-label={isHidden ? "Hiển thị thông tin" : "Ẩn thông tin"}
            >
              {isHidden ? 
                <Eye size={16} className="text-white" /> : 
                <EyeOff size={16} className="text-white" />
              }
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4 relative overflow-hidden group-hover:bg-gradient-to-b from-white to-gray-50 transition-all duration-500">
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer-effect opacity-0 group-hover:opacity-100"></div>
        
        {/* Key information in the footer */}
        <div className="flex items-center justify-between mb-3 relative z-10">
          <div className="flex flex-col">
            <p className="text-xs text-slate-500 mb-1 group-hover:text-indigo-500 transition-colors duration-300">Số dư</p>
            <p className="text-base font-semibold text-slate-800 transition-all duration-300 font-mono">
              {isHidden ? 
                <span className="text-slate-400">••••••••</span> : 
                <span className="animate-fadeIn">{formatCurrency(account.balance)}</span>
              }
            </p>
          </div>
        </div>
        
        {/* Bottom date info */}
        <div className="border-t border-slate-100 pt-3 flex justify-between items-center relative z-10">
          <div className="flex items-center space-x-1 text-xs text-slate-500">
            <Calendar size={12} className="text-slate-400 group-hover:text-slate-500 transition-colors duration-300" />
            <span className="group-hover:text-slate-600 transition-colors duration-300">{account.openDate}</span>
          </div>
          <button 
            onClick={onViewDetail} 
            className={`${account.color} text-white text-xs font-medium px-4 py-1.5 rounded-full hover:shadow-md transition-all duration-300 transform group-hover:scale-105 hover:translate-y-[-2px]`}>
            Chi tiết
          </button>
        </div>
      </div>
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .shimmer-effect {
          background-size: 200% 100%;
          animation: shimmer 2s infinite linear;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in;
        }
        
        .tooltip-lock {
          transition: opacity 0.3s, visibility 0.3s, transform 0.3s;
        }
        
        .lock-button:hover + .tooltip-lock {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
      `}</style>
    </motion.div>
    </AnimatePresence>
  );
};

export default AccountCard;