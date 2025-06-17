import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FilterableWithdrawalListShimmer = ({
  itemCount = 5,
  showSearchBar = true,
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

  const SearchBarShimmer = () => (
    <div className="relative">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-2 border border-blue-100/50 backdrop-blur-sm">
        {/* Search input shimmer - khớp với SearchBar component */}
        <div className="relative bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-blue-100/50 overflow-hidden enhanced-search-bar">
          <motion.div
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          />
          <div className="flex items-center gap-3 relative z-10">
            {/* Search icon placeholder - khớp với Search icon */}
            <div className="w-5 h-5 bg-gray-200 rounded relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
            {/* Search text placeholder - khớp với placeholder text */}
            <div className="w-52 h-4 bg-gray-200 rounded relative overflow-hidden">
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
  );

  const WithdrawalItemShimmer = ({ index }) => (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="group relative bg-sky-50 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300 overflow-hidden"
      style={{
        animationDelay: `${index * 50}ms`
      }}
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-indigo-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Main content */}
      <div className="relative p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center flex-1">
            {/* Enhanced icon shimmer */}
            <div className="relative">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shadow-md relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </div>
              {/* Icon decoration shimmer */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </div>
            </div>
            
            <div className="ml-4 flex-1">
              {/* Withdrawal type shimmer - khớp với h4 font-semibold text-base */}
              <div className="w-48 h-5 bg-gray-200 rounded mb-1 relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                />
              </div>
              {/* Date shimmer - khớp với Calendar icon + text-sm */}
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 bg-gray-200 rounded relative overflow-hidden">
                  <motion.div
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                  />
                </div>
                <div className="w-28 h-3.5 bg-gray-200 rounded relative overflow-hidden">
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
          
          {/* Enhanced amount display shimmer - khớp với text-lg font-bold */}
          <div className="text-right">
            <div className="w-24 h-6 bg-gray-200 rounded mb-1 relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
            <div className="w-16 h-3 bg-gray-200 rounded relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
          </div>
        </div>
        
        {/* Enhanced details section shimmer */}
        <div className="space-y-3">
          {/* Channel information shimmer - khớp với channel section */}
          <div className="flex items-center justify-between text-sm">
            <div className="w-20 h-3.5 bg-gray-200 rounded relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
            <div className="bg-gray-50 px-3 py-1 rounded-full">
              <div className="w-16 h-4 bg-gray-200 rounded relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                />
              </div>
            </div>
          </div>
          
          {/* Interest amount shimmer - khớp với interestAmount section */}
          <div className="flex items-center justify-between text-sm">
            <div className="w-24 h-3.5 bg-gray-200 rounded relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
            <div className="bg-green-50 px-3 py-1 rounded-full">
              <div className="w-20 h-4 bg-gray-200 rounded relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                />
              </div>
            </div>
          </div>
          
          {/* Remaining balance shimmer - khớp với remainingBalance section */}
          <div className="flex items-center justify-between text-sm">
          <div className="w-20 h-3.5 bg-gray-200 rounded relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
            <div className="bg-blue-50 px-3 py-1 rounded-full">
              <div className="w-20 h-4 bg-gray-200 rounded relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                />
              </div>
            </div>
          </div>
          
          {/* Status shimmer - khớp với status section */}
          <div className="flex items-center justify-between text-sm">
          <div className="w-16 h-3.5 bg-gray-200 rounded relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
            {/* Status badge shimmer - có thể là emerald hoặc amber */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-emerald-50 border-emerald-200">
              <div className="w-3.5 h-3.5 bg-gray-200 rounded relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                />
              </div>
              <div className="w-16 h-4 bg-gray-200 rounded relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                />
              </div>
            </div>
          </div>
          
          {/* Bottom section shimmer - khớp với Clock icon + withdrawal type + Chi tiết button */}
          <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 bg-gray-200 rounded relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                />
              </div>
              {/* Withdrawal type text - khớp với "Loại: Rút một phần/toàn bộ" */}
              <div className="w-32 h-3.5 bg-gray-200 rounded relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                />
              </div>
            </div>
            {/* Chi tiết button */}
            <div className="w-16 h-3.5 bg-gray-200 rounded relative overflow-hidden">
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
      
      {/* Hover border effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-blue-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </motion.div>
  );

  return (
    <AnimatePresence>
      <div className="space-y-6 pb-44 md:pb-24">
        {/* Search bar shimmer */}
        {showSearchBar && (
          <SearchBarShimmer />
        )}
        
        {/* Withdrawal list shimmer */}
        <div className="space-y-4">
          {Array.from({ length: itemCount }, (_, index) => (
            <WithdrawalItemShimmer key={index} index={index} />
          ))}
        </div>
        
        {/* Enhanced search bar CSS */}
        <style jsx>{`
          .enhanced-search-bar {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(59, 130, 246, 0.2);
            border-radius: 12px;
            transition: all 0.3s ease;
          }
          
          .enhanced-search-bar:focus-within {
            background: rgba(255, 255, 255, 0.95);
            border-color: rgba(59, 130, 246, 0.5);
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }
          
          .group:hover {
            transform: translateY(-2px);
          }
        `}</style>
      </div>
    </AnimatePresence>
  );
};

export default FilterableWithdrawalListShimmer;