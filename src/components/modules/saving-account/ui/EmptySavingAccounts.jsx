'use client';

import React from 'react';
import { PiggyBank, Plus, Sparkles, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EmptySavingAccounts = ({ onOpenNewAccount }) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[500px] p-8 text-center bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 rounded-3xl relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        <motion.div 
          className="absolute top-10 left-10 w-20 h-20 bg-pink-200/30 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-32 right-16 w-16 h-16 bg-rose-200/40 rounded-full blur-lg"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-12 h-12 bg-pink-300/20 rounded-full blur-md"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Main icon with animation */}
      <motion.div 
        className="relative mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          duration: 0.8, 
          delay: 0.2,
          type: "spring",
          stiffness: 200,
          damping: 15
        }}
      >
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full blur-2xl opacity-30 scale-150"></div>
          
          {/* Main icon container */}
          <motion.div 
            className="relative w-24 h-24 bg-gradient-to-br from-pink-400 via-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-2xl"
            whileHover={{ 
              scale: 1.1,
              rotate: 5,
              boxShadow: "0 25px 50px -12px rgba(236, 72, 153, 0.4)"
            }}
            transition={{ duration: 0.3 }}
          >
            <PiggyBank size={40} className="text-white" />
            
            {/* Sparkle effects */}
            <motion.div 
              className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-300 rounded-full flex items-center justify-center"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles size={12} className="text-yellow-600" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Title and description */}
      <motion.div 
        className="mb-8 max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
          Chưa có sổ tiết kiệm nào
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Bắt đầu hành trình tiết kiệm của bạn ngay hôm nay! 
          <br className="hidden sm:block" />
          Tạo sổ tiết kiệm đầu tiên để tích lũy tài sản một cách thông minh.
        </p>
      </motion.div>

      {/* CTA Button - Attractive design with same logic */}
      <motion.button
        onClick={onOpenNewAccount}
        className="relative group bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white px-8 py-4 rounded-2xl shadow-xl font-semibold text-lg overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20  }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 25px 50px -12px rgba(236, 72, 153, 0.4)",
          y: -2
        }}
        whileTap={{ scale: 0.98 }}
        layoutId="savings-account-modal"
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-shimmer"></div>
        
        {/* Button content */}
        <div className="relative flex items-center space-x-3">
          <motion.div 
            className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <Plus size={16} className="text-white" />
          </motion.div>
          <span>Mở tiết kiệm ngay</span>
        </div>
      </motion.button>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 1.5s ease-in-out;
        }
      `}</style>
    </motion.div>
  );
};

export default EmptySavingAccounts;