import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PaymentAccountShimmer = ({
  cardCount = 1,
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

  // Card animation variants - disabled to prevent jerky movement
  const cardVariants = {
    hidden: { opacity: 1, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.5,
        ease: 'easeOut'
      }
    }
  };

  const ShimmerCard = () => (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-white backdrop-blur-md rounded-2xl shadow-md overflow-hidden"
    >
      {/* Header gradient section - matches payment account header */}
      <div className="relative p-5 bg-gradient-to-r from-gray-100 to-gray-200 overflow-hidden">
        <motion.div
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        />
        
        {/* Icon and account info */}
        <div className="flex justify-between items-start relative z-10">
          <div className="flex items-center space-x-3">
            {/* Icon placeholder */}
            <div className="h-10 w-10 rounded-xl bg-gray-200 relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
            </div>
            
            {/* Account title and number */}
            <div className="space-y-1">
              <div className="w-20 h-3 bg-gray-200 rounded relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </div>
              <div className="w-32 h-2 bg-gray-200 rounded relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </div>
            </div>
          </div>
          
          {/* Eye toggle button placeholder */}
          <div className="rounded-full p-1.5 bg-gray-200 w-8 h-8 relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            />
          </div>
        </div>
      </div>
      
      {/* Main content - matches payment account body */}
      <div className="p-4 space-y-3">
        {/* Balance section */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col space-y-2">
            <div className="w-10 h-2 bg-gray-100 rounded relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
            <div className="w-24 h-4 bg-gray-100 rounded relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
          </div>
        </div>
        
        {/* Bottom section with date and button */}
        <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
          <div className="flex items-center space-x-1">
            {/* Calendar icon placeholder */}
            <div className="w-3 h-3 bg-gray-100 rounded relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
            {/* Date placeholder */}
            <div className="w-16 h-2 bg-gray-100 rounded relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
          </div>
          
          {/* Detail button placeholder */}
          <div className="w-12 h-6 bg-gray-100 rounded-full relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Always show only 1 card for payment account shimmer
  return (
    <AnimatePresence>
      <ShimmerCard />
    </AnimatePresence>
  );
};

export default PaymentAccountShimmer;