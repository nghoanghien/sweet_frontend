import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const shimmerVariants = {
  initial: { x: '-100%' },
  animate: {
    x: '100%',
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: 'linear'
    }
  }
};

const HorizontalBarChartShimmer = ({
  ...props
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-gradient-to-br from-blue-50/80 to-white rounded-3xl shadow-[0_4px_30px_rgba(0,170,255,0.12)] p-6 border border-blue-100"
      >
        {/* Header */}
        <div className="flex items-center mb-6">
          {/* Icon Shimmer */}
          <div className="w-5 h-5 bg-gray-200 rounded mr-2 relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            />
          </div>
          {/* Title Shimmer */}
          <div className="w-48 h-5 bg-gray-200 rounded relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            />
          </div>
        </div>
        
        {/* Chart Container */}
        <div className="h-64 w-full">
          <div className="space-y-8 py-4">
            {/* First horizontal bar */}
            <div className="flex items-center space-x-4">
              {/* Y-axis label */}
              <div className="w-32 h-4 bg-gray-200 rounded relative overflow-hidden flex-shrink-0">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </div>
              {/* Bar */}
              <div className="flex-1 h-8 bg-gray-200 rounded relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
                {/* Value label on bar */}
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-20 h-3 bg-white/50 rounded relative overflow-hidden">
                  <motion.div
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  />
                </div>
              </div>
            </div>
            
            {/* Second horizontal bar */}
            <div className="flex items-center space-x-4">
              {/* Y-axis label */}
              <div className="w-32 h-4 bg-gray-200 rounded relative overflow-hidden flex-shrink-0">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </div>
              {/* Bar (shorter) */}
              <div className="flex-1 h-8 bg-gray-200 rounded relative overflow-hidden" style={{ width: '75%' }}>
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
                {/* Value label on bar */}
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-20 h-3 bg-white/50 rounded relative overflow-hidden">
                  <motion.div
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* X-axis labels */}
          <div className="flex justify-between mt-4 ml-36">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div key={index} className="w-12 h-3 bg-gray-200 rounded relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HorizontalBarChartShimmer;