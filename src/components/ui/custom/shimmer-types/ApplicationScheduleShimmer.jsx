import { motion, AnimatePresence } from 'framer-motion';

const ApplicationScheduleShimmer = () => {
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

  // Generate shimmer calendar days (42 days for 6 weeks)
  const generateShimmerCalendarDays = () => {
    const days = [];
    for (let i = 0; i < 42; i++) {
      days.push(
        <motion.div
          key={i}
          custom={i}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white p-4 min-h-[120px] border border-gray-100 relative overflow-hidden"
        >
          <motion.div
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          />
          
          {/* Day number placeholder */}
          <div className="w-6 h-6 bg-gray-200 rounded mb-2 relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />
          </div>
          
          {/* Random regulation dots for some days */}
          {Math.random() > 0.7 && (
            <div className="space-y-1">
              <div className="w-3 h-3 bg-gray-300 rounded-full relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                />
              </div>
              {Math.random() > 0.5 && (
                <div className="w-3 h-3 bg-gray-300 rounded-full relative overflow-hidden">
                  <motion.div
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                  />
                </div>
              )}
            </div>
          )}
        </motion.div>
      );
    }
    return days;
  };

  // Generate shimmer timeline items
  const generateShimmerTimeline = () => {
    const items = [];
    for (let i = 0; i < 5; i++) {
      items.push(
        <motion.div
          key={i}
          custom={i}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="relative pl-10"
        >
          {/* Timeline dot placeholder */}
          <div className="absolute left-0 top-4 h-12 w-12 rounded-full border-4 border-white shadow-lg z-10 bg-gray-200 relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />
          </div>
          
          {/* Regulation card placeholder */}
          <div className="relative p-6 rounded-2xl ml-4 bg-white border-2 border-gray-100 shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-48 h-6 bg-gray-200 rounded relative overflow-hidden">
                  <motion.div
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                  />
                </div>
                <div className="w-12 h-4 bg-gray-200 rounded relative overflow-hidden">
                  <motion.div
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                  />
                </div>
              </div>
              <div className="w-24 h-6 bg-gray-200 rounded-xl relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                />
              </div>
            </div>
            
            {/* Description */}
            <div className="mt-2 space-y-2">
              <div className="w-full h-4 bg-gray-200 rounded relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                />
              </div>
              <div className="w-3/4 h-4 bg-gray-200 rounded relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                />
              </div>
            </div>
            
            {/* Footer info */}
            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center space-x-6">
                <div className="w-32 h-4 bg-gray-200 rounded relative overflow-hidden">
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
        </motion.div>
      );
    }
    return items;
  };

  return (
    <div className="space-y-6">
      {/* Header placeholder - excluding navigation and search */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4"
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-48 h-8 bg-gray-200 rounded relative overflow-hidden">
          <motion.div
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          />
        </div>
        
        {/* View mode toggle placeholder */}
        <div className="flex bg-white rounded-xl p-1 shadow-sm border border-gray-200">
          <div className="w-20 h-8 bg-gray-200 rounded-lg mr-1 relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />
          </div>
          <div className="w-20 h-8 bg-gray-200 rounded-lg relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />
          </div>
        </div>
      </motion.div>

      {/* Current month regulations placeholder */}
      <motion.div
        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="w-40 h-5 bg-gray-200 rounded mb-4 relative overflow-hidden">
          <motion.div
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="w-32 h-8 bg-gray-200 rounded-xl relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Days of week header placeholder */}
      <div className="grid grid-cols-7 gap-px">
        {Array.from({ length: 7 }, (_, index) => (
          <div key={index} className="py-3 bg-gradient-to-br from-indigo-50 via-blue-50 to-white rounded-2xl shadow-sm border border-indigo-100">
            <div className="w-6 h-5 bg-gray-200 rounded mx-auto relative overflow-hidden">
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

      {/* Calendar grid placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="grid grid-cols-7 gap-px bg-indigo-100 rounded-2xl shadow-[0_2px_16px_rgba(99,102,241,0.08)] border border-indigo-100 overflow-hidden"
      >
        {generateShimmerCalendarDays()}
      </motion.div>

      {/* Timeline view placeholder (alternative) */}
      <motion.div
        className="bg-gradient-to-br from-indigo-50 via-blue-50 to-white rounded-2xl p-8 shadow-[0_8px_40px_rgba(79,70,229,0.10)] border-2 border-indigo-100 hidden"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="relative pb-6">
          {/* Timeline line */}
          <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-indigo-100"></div>
          <div className="space-y-8">
            {generateShimmerTimeline()}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ApplicationScheduleShimmer;