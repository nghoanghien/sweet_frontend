import React from 'react';
import ContentLoader from 'react-content-loader';

const ListHistoryShimmer = ({
  speed = 2,
  backgroundColor = '#e8ebee',
  foregroundColor = '#cfcfcf',
  itemCount = 4,
  ...props
}) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  if (isMobile) {
    // Mobile version
    return (
      <ContentLoader
        speed={speed}
        width={350}
        height={itemCount * 120 + 80}
        viewBox={`0 0 350 ${itemCount * 120 + 80}`}
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}
        {...props}
      >
        {Array.from({ length: itemCount }, (_, index) => {
          const yPos = 60 + (index * 120);
          const isLast = index === itemCount - 1;
          
          return [
            // Timeline line (except for last item)
            !isLast && <rect key={`line-${index}`} x="49" y={yPos + 40} width="2" height="80" />,
            // Date circle
            <circle key={`date-circle-${index}`} cx="50" cy={yPos - 20} r="25" />,
            // Date text placeholder
            <rect key={`date-${index}`} x="35" y={yPos - 10} rx="3" ry="3" width="30" height="8" />,
            <rect key={`date-sub-${index}`} x="30" y={yPos} rx="3" ry="3" width="40" height="6" />,
            // Transaction item
            <rect key={`item-bg-${index}`} x="90" y={yPos - 10} rx="8" ry="8" width="240" height="60" />,
            // Icon
            <circle key={`icon-${index}`} cx="110" cy={yPos + 10} r="15" />,
            // Content
            <rect key={`title-${index}`} x="135" y={yPos - 5} rx="4" ry="4" width="120" height="12" />,
            <rect key={`amount-${index}`} x="135" y={yPos + 15} rx="4" ry="4" width="80" height="10" />,
            // Expand icon
            <rect key={`expand-${index}`} x="300" y={yPos + 5} rx="3" ry="3" width="20" height="20" />
          ];
        }).flat().filter(Boolean)}
      </ContentLoader>
    );
  }

  // Desktop version
  return (
    <ContentLoader
      speed={speed}
      width={800}
      height={itemCount * 140 + 100}
      viewBox={`0 0 800 ${itemCount * 140 + 100}`}
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}
      {...props}
    >
      {Array.from({ length: itemCount }, (_, index) => {
        const yPos = 80 + (index * 140);
        const isLast = index === itemCount - 1;
        
        return [
          // Timeline line (except for last item)
          !isLast && <rect key={`line-${index}`} x="69" y={yPos + 50} width="2" height="90" />,
          // Date circle
          <circle key={`date-circle-${index}`} cx="70" cy={yPos - 30} r="30" />,
          // Date text placeholder
          <rect key={`date-${index}`} x="50" y={yPos - 15} rx="4" ry="4" width="40" height="10" />,
          <rect key={`date-sub-${index}`} x="45" y={yPos - 2} rx="3" ry="3" width="50" height="8" />,
          // Time indicator
          <circle key={`time-${index}`} cx="70" cy={yPos + 20} r="8" />,
          <rect key={`time-text-${index}`} x="55" y={yPos + 35} rx="3" ry="3" width="30" height="6" />,
          // Transaction item
          <rect key={`item-bg-${index}`} x="120" y={yPos - 15} rx="12" ry="12" width="650" height="70" />,
          // Icon
          <circle key={`icon-${index}`} cx="150" cy={yPos + 20} r="20" />,
          // Content
          <rect key={`title-${index}`} x="185" y={yPos - 5} rx="4" ry="4" width="200" height="14" />,
          <rect key={`amount-${index}`} x="185" y={yPos + 20} rx="4" ry="4" width="120" height="12" />,
          // Expand icon
          <rect key={`expand-${index}`} x="730" y={yPos + 10} rx="4" ry="4" width="25" height="25" />
        ];
      }).flat().filter(Boolean)}
    </ContentLoader>
  );
};

export default ListHistoryShimmer;