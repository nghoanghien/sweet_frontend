import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextShimmer from './shimmer-types/TextShimmer';
import GridCardShimmer from './shimmer-types/GridCardShimmer';
import PaymentAccountShimmer from './shimmer-types/PaymentAccountShimmer';
// Import các loại shimmer mới
import ListHistoryShimmer from './shimmer-types/ListHistoryShimmer';
import FilterableAccountTransactionListShimmer from './shimmer-types/FilterableAccountTransactionListShimmer';

const PlaceholderShimmer = ({
  type = 'text',
  speed = 2,
  width,
  height,
  backgroundColor = '#e8ebee',
  foregroundColor = '#cfcfcf',
  className = '',
  animate = true,
  count = 1,
  ...props
}) => {
  const shimmerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.2,
        ease: 'easeIn'
      }
    }
  };

  const getShimmerComponent = () => {
    const commonProps = {
      speed,
      width,
      height,
      backgroundColor,
      foregroundColor,
      ...props
    };

    switch (type) {
      case 'text':
        return <TextShimmer {...commonProps} />;
      case 'grid-card':
        return <GridCardShimmer {...commonProps} cardCount={count} />;
      case 'payment-account':
        return <PaymentAccountShimmer {...commonProps} cardCount={count} />;
      case 'list-history':
        return <ListHistoryShimmer {...commonProps} count={count} />;
      case 'filterable-account-transaction-list':
        return <FilterableAccountTransactionListShimmer {...commonProps} itemCount={count} />;
      default:
        return <TextShimmer {...commonProps} />;
    }
  };

  const renderShimmers = () => {
    return Array.from({ length: count }, (_, index) => (
      <div key={index} className={`mb-2 ${index === count - 1 ? 'mb-0' : ''}`}>
        {getShimmerComponent()}
      </div>
    ));
  };

  if (!animate) {
    return (
      <div className={`w-full ${className}`}>
        {renderShimmers()}
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={`w-full ${className}`}
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {renderShimmers()}
      </motion.div>
    </AnimatePresence>
  );
};

export default PlaceholderShimmer;