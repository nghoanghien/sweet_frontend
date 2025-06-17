import React from 'react';
import { motion } from 'framer-motion';

// Animation variants for shimmer effect
const shimmerVariants = {
  initial: { opacity: 0.6 },
  animate: {
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

// Search Bar Shimmer Component
const SearchBarShimmer = () => {
  return (
    <motion.div 
      className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-2 border border-blue-100/50 backdrop-blur-sm"
      variants={cardVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div 
        className="h-12 bg-gray-200 rounded-xl"
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
        style={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          borderRadius: '12px'
        }}
      />
    </motion.div>
  );
};

// Transaction Item Shimmer Component
const TransactionItemShimmer = ({ index }) => {
  return (
    <motion.div 
      className="group relative bg-sky-50 rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      transition={{ delay: index * 0.05 }}
    >
      {/* Main content */}
      <div className="relative p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center flex-1">
            {/* Icon placeholder */}
            <motion.div 
              className="h-12 w-12 rounded-xl bg-gray-200 flex items-center justify-center"
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
            />
            
            <div className="ml-4 flex-1">
              {/* Transaction type placeholder */}
              <motion.div 
                className="h-4 bg-gray-200 rounded mb-2"
                style={{ width: '65%' }}
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
              />
              {/* Time placeholder */}
              <motion.div 
                className="h-3 bg-gray-200 rounded"
                style={{ width: '45%' }}
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
              />
            </div>
          </div>
          
          {/* Amount placeholder */}
          <div className="text-right">
            <motion.div 
              className="h-5 bg-gray-200 rounded mb-1"
              style={{ width: '90px' }}
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
            />
            <motion.div 
              className="h-3 bg-gray-200 rounded"
              style={{ width: '50px' }}
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
            />
          </div>
        </div>
        
        {/* Details section */}
        <div className="space-y-3">
          {/* Channel placeholder */}
          <div className="flex items-center justify-between text-sm">
            <motion.div 
              className="h-3 bg-gray-200 rounded"
              style={{ width: '60px' }}
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
            />
            <motion.div 
              className="h-6 bg-gray-200 rounded-full"
              style={{ width: '110px' }}
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
            />
          </div>
          
          {/* Content placeholder */}
          <div className="flex items-start justify-between text-sm gap-3">
            <motion.div 
              className="h-3 bg-gray-200 rounded"
              style={{ width: '70px' }}
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
            />
            <motion.div 
              className="h-3 bg-gray-200 rounded"
              style={{ width: '140px' }}
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
            />
          </div>
          
          {/* Status placeholder */}
          <div className="flex items-center justify-between text-sm">
            <motion.div 
              className="h-3 bg-gray-200 rounded"
              style={{ width: '70px' }}
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
            />
            <motion.div 
              className="h-7 bg-gray-200 rounded-full"
              style={{ width: '95px' }}
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
            />
          </div>
          
          {/* Bottom section */}
          <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
            <motion.div 
              className="h-3 bg-gray-200 rounded"
              style={{ width: '130px' }}
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
            />
            <motion.div 
              className="h-3 bg-gray-200 rounded"
              style={{ width: '60px' }}
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main FilterableTransactionListShimmer Component
const FilterableTransactionListShimmer = ({ itemCount = 5 }) => {
  return (
    <div className="space-y-6 pb-44 md:pb-24">
      {/* Search Section Shimmer */}
      <div className="relative mb-6">
        <SearchBarShimmer />
      </div>

      {/* Transaction List Shimmer */}
      <div className="space-y-4">
        {Array.from({ length: itemCount }, (_, index) => (
          <TransactionItemShimmer key={index} index={index} />
        ))}
      </div>
    </div>
  );
};

export default FilterableTransactionListShimmer;