import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TransactionHistoryShimmer = ({
  dateCount = 3,
  transactionsPerDate = 2,
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

  const DateGroupShimmer = ({ dateIndex }) => (
    <div className="relative z-10">
      {/* Date marker */}
      <div className="sticky-date-marker">
        <div className="flex items-center mb-0">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shadow-lg z-20 translate-x-1 sm:translate-x-0 sticky-date-circle relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            />
            <div className="w-5 h-5 bg-white/30 rounded relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
            </div>
          </div>
          <div className="ml-3 py-1 p-3 bg-gradient-to-br from-gray-200/50 to-gray-300/50 rounded-2xl bg-white/70 backdrop-blur-sm sticky-date-info relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />
            {/* Date placeholder */}
            <div className="w-20 h-4 bg-gray-200 rounded mb-1 relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
            {/* Transaction count placeholder */}
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
      </div>

      {/* Transactions for this date */}
      <div className="ml-6 space-y-4">
        {Array.from({ length: transactionsPerDate }, (_, txIndex) => (
          <TransactionShimmer key={txIndex} transactionIndex={txIndex} />
        ))}
      </div>
    </div>
  );

  const TransactionShimmer = ({ transactionIndex }) => (
    <div className="relative">
      {/* Connection dot with time */}
      <div className="absolute left-0 top-6 flex items-center">
        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 transform -translate-x-1.5 z-10 relative overflow-hidden">
          <motion.div
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
        </div>
        <div className="w-8 h-2.5 bg-gray-200 rounded-3xl ml-1 transform -translate-x-16 relative overflow-hidden">
          <motion.div
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          />
        </div>
      </div>

      {/* Transaction card */}
      <div className="ml-6">
        <motion.div
          custom={transactionIndex}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
        >
          {/* Collapsed view */}
          <div className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 flex-1">
                {/* Transaction icon */}
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shadow-sm relative overflow-hidden">
                  <motion.div
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  />
                  <div className="w-5 h-5 bg-white/30 rounded relative overflow-hidden">
                    <motion.div
                      variants={shimmerVariants}
                      initial="initial"
                      animate="animate"
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  {/* Description placeholder */}
                  <div className="w-32 h-4 bg-gray-200 rounded relative overflow-hidden">
                    <motion.div
                      variants={shimmerVariants}
                      initial="initial"
                      animate="animate"
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                    />
                  </div>
                  {/* Amount placeholder */}
                  <div className="w-24 h-3 bg-gray-200 rounded relative overflow-hidden">
                    <motion.div
                      variants={shimmerVariants}
                      initial="initial"
                      animate="animate"
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Expand/collapse button */}
              <div className="p-2 rounded-full bg-gray-100 w-9 h-9 relative overflow-hidden flex items-center justify-center">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                />
                <div className="w-4 h-4 bg-gray-200 rounded relative overflow-hidden">
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
        </motion.div>
      </div>
    </div>
  );

  const SearchBarShimmer = () => (
    <div className="relative mb-6">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-2 border border-indigo-100/50 backdrop-blur-sm">
        <div className="relative bg-white rounded-xl border border-gray-200 p-3 flex items-center gap-3">
          {/* Search icon placeholder */}
          <div className="w-5 h-5 bg-gray-200 rounded relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />
          </div>
          {/* Search input placeholder */}
          <div className="flex-1 h-4 bg-gray-200 rounded relative overflow-hidden">
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
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="space-y-6"
    >
      <div className="bg-white rounded-2xl md:border border-gray-200 shadow-sm md:p-6 space-y-6">
        {/* Search bar shimmer */}
        <SearchBarShimmer />

        {/* Timeline Transaction List */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-200 to-gray-300 z-0 relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            />
          </div>

          <div className="space-y-8">
            {Array.from({ length: dateCount }, (_, dateIndex) => (
              <DateGroupShimmer key={dateIndex} dateIndex={dateIndex} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TransactionHistoryShimmer;