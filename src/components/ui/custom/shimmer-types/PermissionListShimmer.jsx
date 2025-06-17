import { motion, AnimatePresence } from 'framer-motion';

const PermissionListShimmer = ({
  cardCount = 8,
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
      className="relative bg-gradient-to-br from-amber-50/90 via-yellow-50/80 to-orange-50/90 rounded-3xl border-4 border-gray-200 shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden backdrop-blur-sm mb-6"
    >
      {/* Background decorative element */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="opacity-[0.11] transform scale-[7] md:scale-[9] translate-y-12 translate-x-20 w-8 h-8 bg-gray-300 rounded relative overflow-hidden">
          <motion.div
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
        </div>
      </div>

      {/* Decorative border effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 opacity-20 rounded-xl" />

      {/* Corner ornaments */}
      <div className="absolute top-2 left-2 w-6 h-6 border-l-4 border-t-4 border-gray-300 rounded-tl-lg opacity-60" />
      <div className="absolute top-2 right-2 w-6 h-6 border-r-4 border-t-4 border-gray-300 rounded-tr-lg opacity-60" />
      <div className="absolute bottom-2 left-2 w-6 h-6 border-l-4 border-b-4 border-gray-300 rounded-bl-lg opacity-60" />
      <div className="absolute bottom-2 right-2 w-6 h-6 border-r-4 border-b-4 border-gray-300 rounded-br-lg opacity-60" />

      {/* Main content */}
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-4">
          {/* Icon section placeholder */}
          <div className="p-4 rounded-2xl bg-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.25)] border-3 border-white/30 w-16 h-16 relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />
          </div>

          {/* Type badge and chevron placeholder */}
          <div className="flex items-center gap-2">
            <div className="w-24 h-8 bg-gray-200 rounded-full relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
            <div className="w-6 h-6 bg-gray-200 rounded relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
          </div>
        </div>

        {/* Title and description placeholder */}
        <div className="mb-4">
          {/* Title placeholder */}
          <div className="w-48 h-6 bg-gray-200 rounded mb-2 relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />
          </div>
          {/* Description placeholder */}
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

        {/* Functions tags placeholder */}
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 3 }, (_, tagIndex) => (
            <div
              key={tagIndex}
              className="w-20 h-6 bg-gray-200 rounded-lg relative overflow-hidden"
            >
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
          ))}
          <div className="w-12 h-6 bg-gray-200 rounded-lg relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />
          </div>
        </div>

        {/* Decorative elements placeholder */}
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-200 rounded-full opacity-20" />
        <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-gray-200 rounded-full opacity-15" />
      </div>

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5 rounded-xl pointer-events-none" />
    </motion.div>
  );

  return (
    <AnimatePresence>
      <div className="grid grid-cols-1 gap-6 mt-6">
        {Array.from({ length: cardCount }, (_, index) => (
          <ShimmerCard key={index} index={index} />
        ))}
      </div>
    </AnimatePresence>
  );
};

export default PermissionListShimmer;