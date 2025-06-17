import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PermissionsShimmer = ({
  permissionCount = 4,
  ...props
}) => {
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

  const PermissionShimmerCard = ({ index }) => (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="rounded-2xl p-6 border shadow-lg relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 border-blue-100"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 opacity-0"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      />
      
      <div className="relative z-10">
        {/* Header section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {/* Icon placeholder */}
            <div className="p-3 rounded-xl shadow-md mr-4 bg-gradient-to-r from-gray-200 to-gray-300 w-12 h-12 relative overflow-hidden flex items-center justify-center">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
            </div>
            {/* Title placeholder */}
            <div className="w-32 h-5 bg-gray-200 rounded relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
          </div>
          
          {/* Chevron placeholder */}
          <div className="w-5 h-5 bg-gray-200 rounded relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />
          </div>
        </div>
        
        {/* Description placeholder */}
        <div className="w-48 h-3 bg-gray-200 rounded relative overflow-hidden">
          <motion.div
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          />
        </div>
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        {/* Header shimmer */}
        <div className="mb-4 flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-200 rounded relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />
          </div>
          <div className="w-24 h-5 bg-gray-200 rounded relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />
          </div>
        </div>
        
        {/* Permission cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: permissionCount }, (_, index) => (
            <PermissionShimmerCard key={index} index={index} />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PermissionsShimmer;