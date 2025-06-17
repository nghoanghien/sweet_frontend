import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GridCardShimmer = ({
  cardCount = 3,
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

  const ShimmerCard = ({ index }) => (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-white mb-4 backdrop-blur-md rounded-3xl shadow-md overflow-hidden"
    >
      {/* Header gradient section - matches the actual card header */}
      <div className="p-5 bg-gradient-to-r from-gray-200 to-gray-300 relative overflow-hidden">
        <motion.div
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        />
        
        <div className="flex justify-between items-start relative z-10">
          <div className="flex items-center space-x-3">
            {/* Icon placeholder - matches h-10 w-10 rounded-xl bg-white/20 */}
            <div className="h-10 w-10 rounded-xl bg-white/30 relative overflow-hidden flex items-center justify-center">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
            </div>
            {/* Title and subtitle placeholders */}
            <div className="space-y-1">
              {/* Nickname placeholder - font-medium text-sm */}
              <div className="w-28 h-3.5 bg-white/30 rounded relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </div>
              {/* Deposit number placeholder - text-xs font-mono */}
              <div className="w-24 h-2.5 bg-white/30 rounded relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </div>
            </div>
          </div>
          
          {/* Eye toggle button placeholder - rounded-full p-1.5 bg-white/20 */}
          <div className="rounded-full p-1.5 bg-white/30 w-7 h-7 relative overflow-hidden flex items-center justify-center">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            />
          </div>
        </div>
      </div>
      
      {/* Main content - matches p-4 */}
      <div className="p-4">
        {/* Key information grid - matches grid grid-cols-2 gap-3 mb-4 */}
        <div className="grid grid-cols-2 gap-3 mb-6 mt-1">
          <div className="flex flex-col">
            {/* Label - text-xs text-slate-500 mb-1 */}
            <div className="w-12 h-2.5 bg-gray-200 rounded mb-2 relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
            {/* Value - text-sm font-medium */}
            <div className="w-16 h-4 bg-gray-200 rounded relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
          </div>
          <div className="flex flex-col">
            {/* Label - text-xs text-slate-500 mb-1 */}
            <div className="w-20 h-2.5 bg-gray-200 rounded mb-2 relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
            {/* Value - text-sm font-medium */}
            <div className="w-24 h-4 bg-gray-200 rounded relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
          </div>
        </div>
        
        {/* Progress section - matches mb-3 */}
        <div className="mb-3">
          {/* Progress labels - flex justify-between text-xs mb-1.5 */}
          <div className="flex justify-between mb-1.5">
            <div className="w-24 h-2.5 bg-gray-200 rounded relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
            <div className="w-16 h-2.5 bg-gray-200 rounded relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
          </div>
          {/* Progress bar - h-2 w-full bg-slate-100 rounded-full */}
          <div className="h-2 w-full bg-slate-100 rounded-full relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />
            <div className="absolute left-0 top-0 w-3/4 h-full bg-gray-300 rounded-full" />
          </div>
        </div>
        
        {/* Bottom info - matches border-t border-slate-100 pt-3 flex justify-between items-center */}
        <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
          {/* Left side - date with icon */}
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-gray-200 rounded relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
            <div className="w-16 h-2.5 bg-gray-200 rounded relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
          </div>
          {/* Right side - button - px-4 py-1.5 rounded-full */}
          <div className="w-16 h-6 bg-gray-200 rounded-full relative overflow-hidden">
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

  if (isMobile) {
    return (
      <AnimatePresence>
        <div className="space-y-4 px-4">
          {Array.from({ length: cardCount }, (_, index) => (
            <ShimmerCard key={index} index={index} />
          ))}
        </div>
      </AnimatePresence>
    );
  }

  // Desktop version - 4 cards per row with increased vertical spacing
  return (
    <AnimatePresence>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-6">
        {Array.from({ length: Math.min(cardCount, 4) }, (_, index) => (
          <ShimmerCard key={index} index={index} />
        ))}
      </div>
    </AnimatePresence>
  );
};

export default GridCardShimmer;