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

const ReportSearchBarShimmer = ({
  ...props
}) => {
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="w-full bg-gradient-to-r from-blue-50/80 to-white rounded-2xl shadow-[0_4px_20px_rgba(99,102,241,0.10)] p-5 border border-blue-100"
      >
        <div className="relative">
          {/* Search Icon Placeholder */}
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <div className="w-5 h-5 bg-gray-200 rounded relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
            </div>
          </div>
          
          {/* Input Field Placeholder */}
          <div className="w-full pl-14 pr-14 py-3 bg-white border border-blue-100 rounded-xl shadow-inner relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            />
            {/* Placeholder text shimmer */}
            <div className="w-64 h-4 bg-gray-200 rounded relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
            </div>
          </div>
          
          {/* Clear Button Placeholder */}
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <div className="p-1 rounded-full bg-gray-100 shadow-sm w-6 h-6 relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
            </div>
          </div>
        </div>
        
        {/* Suggestions Section */}
        <div className="flex items-center mt-4">
          {/* "Gợi ý:" label shimmer */}
          <div className="w-12 h-4 bg-gray-200 rounded mr-2 relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            />
          </div>
          
          {/* Suggestion buttons shimmer */}
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="mr-2 px-4 py-1.5 bg-white rounded-full border border-blue-100 shadow-sm w-16 h-7 relative overflow-hidden"
            >
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReportSearchBarShimmer;