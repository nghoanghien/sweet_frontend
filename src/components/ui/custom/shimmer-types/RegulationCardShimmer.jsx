import { motion, AnimatePresence } from 'framer-motion';

const RegulationCardShimmer = ({
  cardCount = 6,
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

  const ShimmerCard = ({ index }) => (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,170,255,0.13)] border-2 border-blue-100 overflow-hidden flex flex-col"
    >
      {/* Header Section with gradient background */}
      <div className="relative">
        <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 h-36 w-full flex items-center justify-center shadow-[0_4px_32px_rgba(0,170,255,0.10)] relative overflow-hidden">
          <motion.div
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
          <div className="text-center px-3 relative z-10">
            {/* Title placeholder */}
            <div className="w-32 h-6 bg-white/30 rounded mb-2 relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
            </div>
            {/* Date placeholder */}
            <div className="w-40 h-4 bg-white/30 rounded relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
            </div>
          </div>
        </div>
        
        {/* Status badge placeholder */}
        <div className="absolute bottom-0 right-0 transform translate-y-1/2 mr-4 px-4 py-2 rounded-full shadow-lg border-2 border-white bg-gray-200 relative overflow-hidden">
          <motion.div
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          />
          <div className="w-16 h-4 bg-gray-300 rounded" />
        </div>
      </div>

      {/* Creator Info placeholder */}
      <div className="relative flex items-center bg-white pl-3 pr-4 py-2 rounded-2xl shadow-md mt-[-28px] ml-4 w-fit z-10 border border-blue-100">
        <div className="w-8 h-8 bg-gray-200 rounded-full mr-3 flex-shrink-0 relative overflow-hidden">
          <motion.div
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          />
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

      {/* Content Section */}
      <div className="flex-1 p-5">
        {/* Savings type tags placeholder */}
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="w-20 h-6 bg-gray-200 rounded-full relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />
          </div>
          <div className="w-24 h-6 bg-gray-200 rounded-full relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />
          </div>
        </div>
        
        {/* Regulation details placeholder */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-32 h-4 bg-gray-200 rounded relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
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
          <div className="flex items-center justify-between">
            <div className="w-36 h-4 bg-gray-200 rounded relative overflow-hidden">
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
        
        {/* Description placeholder */}
        <div className="mt-4 bg-blue-50/60 rounded-2xl p-3 border border-blue-100 shadow-sm">
          <div className="space-y-2">
            <div className="w-full h-3 bg-gray-200 rounded relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
            <div className="w-3/4 h-3 bg-gray-200 rounded relative overflow-hidden">
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
      
      {/* Footer placeholder */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-t border-blue-100">
        <div className="w-full py-3 bg-white shadow-md border border-blue-100 rounded-xl relative overflow-hidden">
          <motion.div
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          />
          <div className="flex items-center justify-center">
            <div className="w-24 h-4 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: cardCount }, (_, index) => (
          <ShimmerCard key={index} index={index} />
        ))}
      </div>
    </AnimatePresence>
  );
};

export default RegulationCardShimmer;