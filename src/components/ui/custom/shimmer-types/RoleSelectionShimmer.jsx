import React from 'react';
import { motion } from 'framer-motion';

const RoleSelectionShimmer = () => {
  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.3 }}
    >
      {/* Label shimmer */}
      <div className="flex items-center gap-2 mb-4 pl-2">
        <div className="w-5 h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse"></div>
        <div className="w-16 h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse"></div>
        <div className="w-2 h-5 bg-gradient-to-r from-red-200 via-red-300 to-red-200 rounded animate-pulse"></div>
      </div>
      
      {/* Role cards shimmer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, index) => (
          <motion.div
            key={index}
            className="p-5 rounded-2xl border-2 border-gray-200 bg-white flex items-start relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}
          >
            {/* Shimmer animation overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100 to-transparent opacity-60"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                repeatDelay: 0.5,
                delay: index * 0.2
              }}
            />
            
            {/* Icon shimmer */}
            <div className="p-2 rounded-xl mr-4 flex-shrink-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
              <div className="w-5 h-5 bg-gray-300 rounded"></div>
            </div>
            
            {/* Content shimmer */}
            <div className="flex-1 relative z-10">
              {/* Title shimmer */}
              <div className="w-24 h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-2 animate-pulse"></div>
              
              {/* Description shimmer */}
              <div className="space-y-1">
                <div className="w-full h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse"></div>
                <div className="w-3/4 h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RoleSelectionShimmer;