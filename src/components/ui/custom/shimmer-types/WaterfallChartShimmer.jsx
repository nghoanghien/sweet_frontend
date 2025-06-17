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

const WaterfallChartShimmer = ({
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
          <div className="w-40 h-5 bg-gray-200 rounded relative overflow-hidden">
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
          
          {/* Chart area with waterfall bars */}
          <div className="ml-16 h-full flex items-end justify-between px-4">
            {/* Start bar */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-8 bg-gray-200 rounded-t relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </div>
              <div className="w-12 h-3 bg-gray-200 rounded relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </div>
            </div>
            
            {/* Income bar (tall) */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-32 bg-gray-200 rounded-t relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </div>
              <div className="w-8 h-3 bg-gray-200 rounded relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </div>
            </div>
            
            {/* Expense bar (negative/downward) */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-24 bg-gray-200 rounded-t relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </div>
              <div className="w-8 h-3 bg-gray-200 rounded relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </div>
            </div>
            
            {/* End/Difference bar */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-20 bg-gray-200 rounded-t relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </div>
              <div className="w-16 h-3 bg-gray-200 rounded relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </div>
            </div>
          </div>
          
          {/* Connecting lines shimmer */}
          <div className="absolute bottom-16 left-20 right-4 flex justify-between items-center">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="w-8 h-0.5 bg-gray-200 relative overflow-hidden">
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
        
        {/* Legend */}
        <div className="mt-6 flex justify-center space-x-6">
          {[1, 2, 3, 4].map((_, index) => (
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
              <div className="w-12 h-3 bg-gray-200 rounded relative overflow-hidden">
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

export default WaterfallChartShimmer;