import { motion } from 'framer-motion';

const AccountListItemShimmer = ({ delay = 0 }) => {
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

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="hover:bg-gray-50"
    >
      {/* User info */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {/* Avatar placeholder */}
          <div className="w-12 h-12 rounded-2xl bg-gray-200 relative overflow-hidden flex items-center justify-center shadow-lg">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />
          </div>
          <div className="ml-4">
            {/* Name placeholder */}
            <div className="w-32 h-4 bg-gray-200 rounded mb-2 relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
            {/* Email placeholder */}
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
      </td>

      {/* Account type */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-24 h-7 bg-gray-200 rounded-2xl relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />
          </div>
        </div>
      </td>

      {/* Role */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="w-20 h-4 bg-gray-200 rounded relative overflow-hidden">
          <motion.div
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          />
        </div>
      </td>

      {/* Phone */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="w-28 h-4 bg-gray-200 rounded relative overflow-hidden">
          <motion.div
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          />
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="w-24 h-7 bg-gray-200 rounded-2xl relative overflow-hidden">
          <motion.div
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          />
        </div>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-center gap-2">
          {/* View button placeholder */}
          <div className="w-10 h-10 rounded-xl bg-gray-200 relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />
          </div>
          
          {/* Edit button placeholder */}
          <div className="w-10 h-10 rounded-xl bg-gray-200 relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />
          </div>
          
          {/* Reset password button placeholder */}
          <div className="w-10 h-10 rounded-xl bg-gray-200 relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />
          </div>
          
          {/* Disable button placeholder */}
          <div className="w-10 h-10 rounded-xl bg-gray-200 relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />
          </div>
        </div>
      </td>
    </motion.tr>
  );
};

export default AccountListItemShimmer;