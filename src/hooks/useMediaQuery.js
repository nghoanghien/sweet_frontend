import { useState, useEffect } from 'react';

/**
 * Hook để kiểm tra kích thước màn hình và xác định nếu đang ở chế độ mobile
 * @returns {Object} Object chứa biến isMobile
 */
export const useMediaQuery = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  return { isMobile };
};

export default useMediaQuery;