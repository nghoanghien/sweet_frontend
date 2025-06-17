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

const GroupedBarChartShimmer = ({
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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
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
            <div className="w-56 h-5 bg-gray-200 rounded relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
            </div>
          </div>
          
          {/* Best term badge shimmer */}
          <div className="w-24 h-6 bg-gray-200 rounded-full relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            />
          </div>
        </div>
        
        {/* Chart Container */}
        <div className="h-80 w-full relative overflow-hidden">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-4">
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
          
          {/* Chart area */}
          <div className="ml-16 h-full flex items-end justify-between px-4">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                {/* Bars group */}
                <div className="flex space-x-1 items-end">
                  {/* Income bar */}
                  <div 
                    className="w-6 bg-gray-200 rounded-t relative overflow-hidden"
                    style={{ height: `${Math.random() * 120 + 40}px` }}
                  >
                    <motion.div
                      variants={shimmerVariants}
                      initial="initial"
                      animate="animate"
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    />
                  </div>
                  {/* Expense bar */}
                  <div 
                    className="w-6 bg-gray-200 rounded-t relative overflow-hidden"
                    style={{ height: `${Math.random() * 100 + 30}px` }}
                  >
                    <motion.div
                      variants={shimmerVariants}
                      initial="initial"
                      animate="animate"
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    />
                  </div>
                  {/* Difference bar */}
                  <div 
                    className="w-6 bg-gray-200 rounded-t relative overflow-hidden"
                    style={{ height: `${Math.random() * 80 + 20}px` }}
                  >
                    <motion.div
                      variants={shimmerVariants}
                      initial="initial"
                      animate="animate"
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    />
                  </div>
                </div>
                
                {/* X-axis label */}
                <div className="w-8 h-3 bg-gray-200 rounded relative overflow-hidden">
                  <motion.div
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-6 flex justify-center space-x-6">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-center">
              {/* Color indicator */}
              <div className="w-3 h-3 bg-gray-200 rounded mr-2 relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </div>
              {/* Label */}
              <div className="w-16 h-3 bg-gray-200 rounded relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GroupedBarChartShimmer;