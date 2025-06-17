import { motion, AnimatePresence } from 'framer-motion';

const RoleCardShimmer = ({
  cardCount = 9,
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
        delay: index * 0.08,
        duration: 0.4,
        ease: 'easeOut'
      }
    })
  };

  const ShimmerCard = ({ index }) => {
    // Alternate between customer and staff styles for variety
    const isCustomer = index < 3;
    const cardStyle = isCustomer ? {
      gradient: "from-emerald-50/90 via-teal-50/50 to-white",
      border: "border-emerald-200/60",
      iconBg: "bg-emerald-100/70",
      shadow: "shadow-[0_4px_25px_rgba(16,185,129,0.12)]"
    } : {
      gradient: "from-violet-50/90 via-purple-50/50 to-white",
      border: "border-violet-200/60", 
      iconBg: "bg-violet-100/70",
      shadow: "shadow-[0_4px_25px_rgba(139,92,246,0.12)]"
    };

    return (
      <motion.div
        custom={index}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className={`bg-gradient-to-br ${cardStyle.gradient} rounded-2xl ${cardStyle.shadow} p-6 border-2 ${cardStyle.border} relative`}
      >
        {/* Background icon placeholder */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div className="opacity-[0.08] transform scale-[6] translate-y-16 translate-x-24 w-6 h-6 bg-gray-200 rounded relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            />
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center mb-4">
          <div className={`mr-5 p-3 rounded-2xl ${cardStyle.iconBg} shadow-sm w-12 h-12 relative overflow-hidden`}>
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />
          </div>
          <div className="flex-1">
            {/* Title placeholder */}
            <div className="w-32 h-5 bg-gray-200 rounded mb-2 relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
            {/* Description placeholder */}
            <div className="space-y-1">
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

        {/* Permission badges placeholder */}
        <div className="mb-4">
          {/* Label placeholder */}
          <div className="w-16 h-3 bg-gray-200 rounded mb-3 relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />
          </div>
          
          {/* Permission badges */}
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 3 }, (_, badgeIndex) => (
              <div
                key={badgeIndex}
                className="flex items-center w-24 h-7 bg-gray-200 rounded-xl relative overflow-hidden"
              >
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                />
              </div>
            ))}
            {/* Expand button placeholder */}
            <div className="flex items-center w-16 h-7 bg-gray-200 rounded-xl relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Account count placeholder */}
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-200 rounded mr-2 relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
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

          {/* Action buttons placeholder */}
          <div className="flex gap-2">
            <div className="w-9 h-9 bg-gray-200 rounded-xl relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
            <div className="w-9 h-9 bg-gray-200 rounded-xl relative overflow-hidden">
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
  };

  return (
    <AnimatePresence>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: cardCount }, (_, index) => (
          <ShimmerCard key={index} index={index} />
        ))}
      </div>
    </AnimatePresence>
  );
};

export default RoleCardShimmer;