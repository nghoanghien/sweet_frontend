import React from 'react';
import { motion } from 'framer-motion';
import TextShimmer from './TextShimmer';

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

// Step 1 Shimmer - Deposit Type Selection
export const DepositTypeShimmer = () => {
  return (
    <div className="space-y-6">
      {/* Section Title */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-4 h-4 bg-gradient-to-br from-pink-200 to-rose-300 rounded-md relative overflow-hidden">
          <motion.div
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
        </div>
        <div className="w-32 h-5 bg-gray-200 rounded relative overflow-hidden">
          <motion.div
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          />
        </div>
      </div>

      {/* Deposit Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Standard Deposit Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={0}
          className="relative backdrop-blur-2xl rounded-2xl md:rounded-3xl p-4 md:p-6 bg-white/20 border border-white/30 overflow-hidden"
        >
          {/* Liquid effect background */}
          <div className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden">
            <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-white/10 to-pink-100/10" />
          </div>

          <div className="relative z-10">
            {/* Header with icon and title */}
            <div className="flex items-center gap-3 md:gap-4 mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-pink-100/60 backdrop-blur-sm relative overflow-hidden flex items-center justify-center">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </div>
              <div className="flex-1">
                <div className="w-28 h-5 bg-gray-200 rounded mb-2 relative overflow-hidden">
                  <motion.div
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                  />
                </div>
                <div className="w-36 h-3 bg-gray-200 rounded relative overflow-hidden">
                  <motion.div
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Features list */}
            <div className="space-y-3">
              {[1, 2, 3].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-200 rounded-full relative overflow-hidden flex-shrink-0">
                    <motion.div
                      variants={shimmerVariants}
                      initial="initial"
                      animate="animate"
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    />
                  </div>
                  <div className={`h-3 bg-gray-200 rounded relative overflow-hidden ${
                    index === 0 ? 'w-32' : index === 1 ? 'w-28' : 'w-36'
                  }`}>
                    <motion.div
                      variants={shimmerVariants}
                      initial="initial"
                      animate="animate"
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Glass reflection effect */}
          <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-tr from-white/20 to-transparent opacity-60 pointer-events-none" />
        </motion.div>

        {/* Flexible Deposit Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={1}
          className="relative backdrop-blur-2xl rounded-2xl md:rounded-3xl p-4 md:p-6 bg-white/20 border border-white/30 overflow-hidden"
        >
          {/* Liquid effect background */}
          <div className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden">
            <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-white/10 to-blue-100/10" />
          </div>

          <div className="relative z-10">
            {/* Header with icon and title */}
            <div className="flex items-center gap-3 md:gap-4 mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-blue-100/60 backdrop-blur-sm relative overflow-hidden flex items-center justify-center">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </div>
              <div className="flex-1">
                <div className="w-32 h-5 bg-gray-200 rounded mb-2 relative overflow-hidden">
                  <motion.div
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                  />
                </div>
                <div className="w-40 h-3 bg-gray-200 rounded relative overflow-hidden">
                  <motion.div
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Features list */}
            <div className="space-y-3">
              {[1, 2, 3].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-200 rounded-full relative overflow-hidden flex-shrink-0">
                    <motion.div
                      variants={shimmerVariants}
                      initial="initial"
                      animate="animate"
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    />
                  </div>
                  <div className={`h-3 bg-gray-200 rounded relative overflow-hidden ${
                    index === 0 ? 'w-36' : index === 1 ? 'w-32' : 'w-28'
                  }`}>
                    <motion.div
                      variants={shimmerVariants}
                      initial="initial"
                      animate="animate"
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Glass reflection effect */}
          <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-tr from-white/20 to-transparent opacity-60 pointer-events-none" />
        </motion.div>
      </div>
    </div>
  );
};

// Step 2 Shimmer - Source Account Selection
export const SourceAccountShimmer = ({ accountCount = 3 }) => {
  return (
    <div className="space-y-4">
      {/* Section Title */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-4 h-4 bg-gradient-to-br from-pink-200 to-rose-300 rounded-md relative overflow-hidden">
          <motion.div
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
        </div>
        <div className="w-28 h-5 bg-gray-200 rounded relative overflow-hidden">
          <motion.div
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          />
        </div>
      </div>

      {/* Horizontal scrollable source accounts */}
      <div className="overflow-x-auto no-scrollbar pb-3 md:pb-4 -mx-1 md:-mx-2 px-1 md:px-2">
        <div className="flex gap-3 md:gap-4">
          {/* Cash at counter option */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={0}
            className="flex-shrink-0 w-52 md:w-64 relative backdrop-blur-2xl rounded-2xl md:rounded-3xl p-4 md:p-6 bg-white/20 border border-white/30 overflow-hidden"
          >
            {/* Liquid effect background */}
            <div className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden">
              <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-white/10 to-pink-100/10" />
            </div>

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-amber-100/60 backdrop-blur-sm relative overflow-hidden flex items-center justify-center">
                  <motion.div
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="w-32 h-4 bg-gray-200 rounded mb-1 relative overflow-hidden">
                    <motion.div
                      variants={shimmerVariants}
                      initial="initial"
                      animate="animate"
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                    />
                  </div>
                  <div className="w-28 h-3 bg-gray-200 rounded relative overflow-hidden">
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

            {/* Glass reflection effect */}
            <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-tr from-white/20 to-transparent opacity-60 pointer-events-none" />
          </motion.div>

          {/* Payment account cards */}
          {Array.from({ length: accountCount }, (_, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={index + 1}
              className="flex-shrink-0 w-52 md:w-64 relative backdrop-blur-2xl rounded-2xl md:rounded-3xl p-4 md:p-6 bg-white/20 border border-white/30 overflow-hidden"
            >
              {/* Liquid effect background */}
              <div className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden">
                <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-white/10 to-slate-100/10" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-24 h-4 bg-gray-200 rounded relative overflow-hidden">
                    <motion.div
                      variants={shimmerVariants}
                      initial="initial"
                      animate="animate"
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                    />
                  </div>
                </div>
                <div className="w-32 h-3 bg-gray-200 rounded mb-2 relative overflow-hidden">
                  <motion.div
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                  />
                </div>
                <div className="w-28 h-5 bg-gray-200 rounded relative overflow-hidden">
                  <motion.div
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                  />
                </div>
              </div>

              {/* Glass reflection effect */}
              <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-tr from-white/20 to-transparent opacity-60 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Minimum Amount and Available Balance Shimmer
export const AmountInfoShimmer = () => {
  return (
    <div className="space-y-4">
      {/* Minimum amount section */}
      <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur-sm border border-blue-200/50 rounded-2xl p-4 relative overflow-hidden">
        <motion.div
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-200 rounded-lg relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            />
          </div>
          <div className="flex-1">
            <TextShimmer width="128px" height="16px" />
            <div className="mt-1">
              <TextShimmer width="96px" height="24px" />
            </div>
          </div>
        </div>
      </div>

      {/* Available balance section */}
      <div className="bg-gradient-to-r from-emerald-50/80 to-green-50/80 backdrop-blur-sm border border-emerald-200/50 rounded-2xl p-4 relative overflow-hidden">
        <motion.div
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-200 rounded-lg relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            />
          </div>
          <div className="flex-1">
            <TextShimmer width="112px" height="16px" />
            <div className="mt-1">
              <TextShimmer width="128px" height="24px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Amount Input Shimmer
export const AmountInputShimmer = () => {
  return (
    <div className="space-y-4">
      {/* Label */}
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-gradient-to-br from-pink-200 to-rose-300 rounded-md relative overflow-hidden">
          <motion.div
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
        </div>
        <div className="w-20 h-4 bg-gray-200 rounded relative overflow-hidden">
          <motion.div
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          />
        </div>
      </div>

      {/* Input field */}
      <div className="relative backdrop-blur-2xl rounded-2xl p-4 bg-white/20 border border-white/30 overflow-hidden">
        <motion.div
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />
        <div className="relative z-10">
          <div className="w-full h-12 bg-gray-200 rounded-xl relative overflow-hidden">
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
};

// Default export for backward compatibility
const NewSavingsAccountModalShimmer = {
  DepositTypeShimmer,
  SourceAccountShimmer,
  AmountInfoShimmer,
  AmountInputShimmer
};

export default NewSavingsAccountModalShimmer;