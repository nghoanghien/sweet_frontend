import React from 'react';
import { motion } from 'framer-motion';

const TextShimmer = ({
  width = '100%',
  height = 20,
  className = '',
  rounded = 'md',
  backgroundColor = 'bg-gray-200',
  shimmerColor = 'bg-white/60',
  speed = 1.5,
  delay = 0,
  lines = 1,
  lineSpacing = 8,
  widthVariation = true,
  ...props
}) => {
  // Shimmer animation variants
  const shimmerVariants = {
    initial: { x: '-100%' },
    animate: {
      x: '100%',
      transition: {
        repeat: Infinity,
        duration: speed,
        ease: 'linear',
        delay: delay
      }
    }
  };

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: delay
      }
    }
  };

  // Generate rounded class based on prop
  const getRoundedClass = () => {
    const roundedClasses = {
      none: '',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      '2xl': 'rounded-2xl',
      '3xl': 'rounded-3xl',
      full: 'rounded-full'
    };
    return roundedClasses[rounded] || 'rounded-md';
  };

  // Generate line widths with variation
  const getLineWidth = (lineIndex) => {
    if (!widthVariation) return '100%';
    
    const variations = ['100%', '85%', '92%', '78%', '95%'];
    return variations[lineIndex % variations.length];
  };

  // Convert width/height to style object
  const getStyle = () => {
    const style = {};
    
    if (typeof width === 'number') {
      style.width = `${width}px`;
    } else if (typeof width === 'string') {
      style.width = width;
    }
    
    if (typeof height === 'number') {
      style.height = `${height}px`;
    } else if (typeof height === 'string') {
      style.height = height;
    }
    
    return style;
  };

  // Single line component
  const ShimmerLine = ({ lineIndex, isLast }) => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`
        ${backgroundColor} 
        ${getRoundedClass()}
        relative overflow-hidden
        ${className}
      `}
      style={{
        ...getStyle(),
        width: getLineWidth(lineIndex),
        marginBottom: isLast ? 0 : `${lineSpacing}px`
      }}
      {...props}
    >
      <motion.div
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-${shimmerColor.replace('bg-', '')} to-transparent`}
      />
    </motion.div>
  );

  // Multiple lines
  if (lines > 1) {
    return (
      <div className="space-y-0">
        {Array.from({ length: lines }, (_, index) => (
          <ShimmerLine 
            key={index} 
            lineIndex={index} 
            isLast={index === lines - 1}
          />
        ))}
      </div>
    );
  }

  // Single line
  return <ShimmerLine lineIndex={0} isLast={true} />;
};

export default TextShimmer;