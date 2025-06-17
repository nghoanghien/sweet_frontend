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

const DonutChartShimmer = ({
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
        <div className="flex items-center mb-4">
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
        <div className="flex items-center justify-center">
          <div className="relative w-56 h-56">
            {/* Donut Chart Shimmer */}
            <div className="w-full h-full rounded-full border-[40px] border-gray-200 relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
            </div>
            
            {/* Center Content Shimmer */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* Percentage Shimmer */}
              <div className="w-16 h-8 bg-gray-200 rounded mb-2 relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </div>
              {/* Label Shimmer */}
              <div className="w-20 h-3 bg-gray-200 rounded relative overflow-hidden">
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
        
        {/* Legend Shimmer */}
        <div className="mt-6 flex justify-center space-x-6">
          {[1, 2].map((_, index) => (
            <div key={index} className="flex items-center">
              {/* Color indicator */}
              <div className="w-3 h-3 bg-gray-200 rounded-full mr-2 relative overflow-hidden">
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

export default DonutChartShimmer;