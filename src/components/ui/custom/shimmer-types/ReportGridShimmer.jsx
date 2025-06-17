import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ReportGridShimmer = ({
  itemCount = 6,
  ...props
}) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  // Shimmer animation variants
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

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: 'easeOut'
      }
    })
  };

  const ShimmerReportCard = ({ index }) => (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-br from-blue-50/80 to-white rounded-2xl shadow-[0_4px_24px_rgba(99,102,241,0.10)] p-6 flex flex-col relative border border-blue-100 transition-all duration-300 overflow-hidden"
    >
      {/* Month/Year Badge placeholder - matches absolute top-5 left-5 */}
      <div className="absolute top-0 -left-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl shadow-md w-16 h-8 relative overflow-hidden">
        <motion.div
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        />
      </div>
      
      {/* Main Content - matches mt-16 mb-4 */}
      <div className="mt-8 mb-4">
        {/* Title section with icon - matches flex items-center mb-4 */}
        <div className="flex items-center mb-4">
          {/* Calendar icon placeholder - matches size={18} */}
          <div className="w-4.5 h-4.5 bg-gray-200 rounded mr-2 relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />
          </div>
          {/* Title placeholder - matches text-xl font-bold */}
          <div className="w-48 h-6 bg-gray-200 rounded relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />
          </div>
        </div>
        
        {/* Capital Info section - matches space-y-3 mb-4 */}
        <div className="space-y-3 mb-4">
          {/* First capital info item - matches flex items-center */}
          <div className="flex items-center">
            {/* DollarSign icon placeholder - matches size={18} flex-shrink-0 */}
            <div className="w-4.5 h-4.5 bg-gray-200 rounded mr-2 flex-shrink-0 relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
            <div>
              {/* Label placeholder - matches text-xs */}
              <div className="w-24 h-3 bg-gray-200 rounded mb-1 relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                />
              </div>
              {/* Value placeholder - matches text-base font-semibold */}
              <div className="w-32 h-5 bg-gray-200 rounded relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                />
              </div>
            </div>
          </div>
          
          {/* Second capital info item - matches flex items-center */}
          <div className="flex items-center">
            {/* TrendingUp icon placeholder - matches size={18} flex-shrink-0 */}
            <div className="w-4.5 h-4.5 bg-gray-200 rounded mr-2 flex-shrink-0 relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
            <div>
              {/* Label placeholder - matches text-xs */}
              <div className="w-28 h-3 bg-gray-200 rounded mb-1 relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                />
              </div>
              {/* Value placeholder - matches text-base font-semibold */}
              <div className="w-36 h-5 bg-gray-200 rounded relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* View Report Button placeholder - matches w-full py-3 rounded-xl mt-auto */}
      <div className="w-full bg-gray-200 rounded-xl h-12 mt-auto relative overflow-hidden flex items-center justify-center">
        <motion.div
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
        />
        {/* Eye icon placeholder - matches size={18} mr-2 */}
        <div className="w-4.5 h-4.5 bg-gray-300 rounded mr-2 relative overflow-hidden">
          <motion.div
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
        </div>
        {/* Button text placeholder */}
        <div className="w-20 h-4 bg-gray-300 rounded relative overflow-hidden">
          <motion.div
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
        </div>
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: itemCount }, (_, index) => (
          <ShimmerReportCard key={index} index={index} />
        ))}
      </div>
    </AnimatePresence>
  );
};

export default ReportGridShimmer;