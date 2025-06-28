import React from 'react';
import { motion } from 'framer-motion';

const AccountCardShimmer = ({ cardCount = 9 }) => {
  // Shimmer animation variants
  const shimmerVariants = {
    initial: { backgroundPosition: '-200% 0' },
    animate: {
      backgroundPosition: '200% 0',
      transition: {
        duration: 2,
        ease: 'linear',
        repeat: Infinity,
      },
    },
  };

  // Card animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
  };

  // Shimmer card component
  const ShimmerCard = ({ index }) => {
    // Alternate between customer and staff styles
    const isCustomer = index % 2 === 0;
    
    const cardStyle = isCustomer ? {
      gradient: "from-emerald-50/90 via-teal-50/50 to-white",
      border: "border-emerald-200/60",
      iconBg: "bg-emerald-100/70",
      shadow: "shadow-[0_4px_25px_rgba(16,185,129,0.12)]",
      roleBg: "bg-emerald-50",
      avatarBg: "bg-emerald-300"
    } : {
      gradient: "from-violet-50/90 via-purple-50/50 to-white",
      border: "border-violet-200/60",
      iconBg: "bg-violet-100/70",
      shadow: "shadow-[0_4px_25px_rgba(139,92,246,0.12)]",
      roleBg: "bg-violet-50",
      avatarBg: "bg-violet-300"
    };

    return (
      <motion.div
        className={`relative bg-gradient-to-br ${cardStyle.gradient} rounded-3xl ${cardStyle.shadow} p-6 border-2 ${cardStyle.border} overflow-hidden`}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        transition={{
          delay: index * 0.1,
          duration: 0.6,
          type: "spring",
          damping: 15,
          stiffness: 100,
        }}
      >
        {/* View button shimmer ở góc trên phải */}
        <motion.div
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 border border-gray-200 shadow-sm"
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
          style={{
            background: 'linear-gradient(90deg, #f3f4f6 25%, rgba(255,255,255,0.8) 50%, #f3f4f6 75%)',
            backgroundSize: '200% 100%',
          }}
        />

        {/* Header với avatar và thông tin cơ bản */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            {/* Avatar shimmer - tăng kích thước và bo tròn hơn */}
            <motion.div
              className={`w-16 h-16 rounded-3xl ${cardStyle.avatarBg} shadow-lg relative overflow-hidden`}
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              style={{
                background: `linear-gradient(90deg, ${cardStyle.avatarBg} 25%, rgba(255,255,255,0.4) 50%, ${cardStyle.avatarBg} 75%)`,
                backgroundSize: '200% 100%',
              }}
            />
            
            <div className="flex-1">
              {/* Name shimmer - tăng kích thước */}
              <motion.div
                className="h-6 bg-gray-200 rounded-lg mb-2 max-w-[180px]"
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                style={{
                  background: 'linear-gradient(90deg, #e5e7eb 25%, rgba(255,255,255,0.8) 50%, #e5e7eb 75%)',
                  backgroundSize: '200% 100%',
                }}
              />
              
              {/* Email shimmer */}
              <motion.div
                className="h-4 bg-gray-200 rounded-lg max-w-[220px]"
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                style={{
                  background: 'linear-gradient(90deg, #e5e7eb 25%, rgba(255,255,255,0.8) 50%, #e5e7eb 75%)',
                  backgroundSize: '200% 100%',
                }}
              />
            </div>
          </div>
        </div>

        {/* Role info shimmer */}
        <div className="mb-4">
          <div className={`flex items-center px-4 py-3 rounded-xl ${cardStyle.roleBg} border border-opacity-50 ${isCustomer ? 'border-emerald-200' : 'border-violet-200'}`}>
            {/* Role icon shimmer với background trắng */}
            <motion.div
              className="mr-3 p-2 rounded-lg bg-white shadow-sm w-10 h-10"
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              style={{
                background: 'linear-gradient(90deg, #ffffff 25%, rgba(255,255,255,0.6) 50%, #ffffff 75%)',
                backgroundSize: '200% 100%',
              }}
            />
            
            <div className="flex-1">
              {/* Role name shimmer */}
              <motion.div
                className="h-4 bg-gray-200 rounded mb-1 w-28"
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                style={{
                  background: 'linear-gradient(90deg, #e5e7eb 25%, rgba(255,255,255,0.8) 50%, #e5e7eb 75%)',
                  backgroundSize: '200% 100%',
                }}
              />
              
              {/* Account type shimmer */}
              <motion.div
                className="h-3 bg-gray-200 rounded w-20"
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                style={{
                  background: 'linear-gradient(90deg, #e5e7eb 25%, rgba(255,255,255,0.8) 50%, #e5e7eb 75%)',
                  backgroundSize: '200% 100%',
                }}
              />
            </div>
          </div>
        </div>

        {/* Action buttons shimmer - căn giữa và tăng padding */}
        <div className="flex flex-wrap justify-center gap-2">
          {/* Edit button */}
          <motion.div
            className={`h-10 rounded-xl w-16 ${isCustomer ? 'bg-emerald-100' : 'bg-violet-100'} border`}
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            style={{
              background: `linear-gradient(90deg, ${isCustomer ? '#a7f3d0' : '#ddd6fe'} 25%, rgba(255,255,255,0.8) 50%, ${isCustomer ? '#a7f3d0' : '#ddd6fe'} 75%)`,
              backgroundSize: '200% 100%',
            }}
          />
          
          {/* Reset password button */}
          <motion.div
            className="h-10 bg-amber-100 rounded-xl w-24 border border-amber-200"
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            style={{
              background: 'linear-gradient(90deg, #fde68a 25%, rgba(255,255,255,0.8) 50%, #fde68a 75%)',
              backgroundSize: '200% 100%',
            }}
          />
          
          {/* Disable button */}
          <motion.div
            className="h-10 bg-red-100 rounded-xl w-16 border border-red-200"
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            style={{
              background: 'linear-gradient(90deg, #fecaca 25%, rgba(255,255,255,0.8) 50%, #fecaca 75%)',
              backgroundSize: '200% 100%',
            }}
          />
        </div>
      </motion.div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: cardCount }, (_, index) => (
        <ShimmerCard key={`account-shimmer-${index}`} index={index} />
      ))}
    </div>
  );
};

export default AccountCardShimmer;