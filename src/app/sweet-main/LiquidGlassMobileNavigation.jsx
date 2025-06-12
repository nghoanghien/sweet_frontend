import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Home, 
  Wallet, 
  Users, 
  Receipt, 
  PiggyBank, 
  LineChart, 
  Settings, 
  Lock, 
  LogOut,
  Circle,
  ChevronLeft
} from 'lucide-react';

const AssistiveTouchNavigation = ({
  profileData = { fullName: "Người dùng", email: "user@example.com" },
  activeSection = "overview",
  onSectionChange = () => {},
  onProfileClick = () => {},
  customerMenuItems = [
    { id: "overview", icon: Home, text: "Trang chủ" },
    { id: "deposits", icon: Wallet, text: "Quản lý tiền gửi" }
  ],
  adminMenuItems = [
    { id: "customers", icon: Users, text: "Quản lý khách hàng" },
    { id: "employees", icon: User, text: "Quản lý nhân viên" },
    { id: "deposit-slips", icon: Receipt, text: "Quản lý phiếu gửi tiền" },
    { id: "savings-products", icon: PiggyBank, text: "Quản lý sản phẩm tiết kiệm" },
    { id: "sales-reports", icon: LineChart, text: "Báo cáo doanh số" },
    { id: "settings", icon: Settings, text: "Cài đặt hệ thống" },
    { id: "permissions", icon: Lock, text: "Quản lý phân quyền" }
  ],
  onLogout = () => {},
  isCustomer = true,
  isAdmin = true
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 20, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [currentLevel, setCurrentLevel] = useState('main');
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const buttonRef = useRef(null);
  const hideTimeoutRef = useRef(null);
  const showTimeoutRef = useRef(null);

  // Auto-hide/show button logic
  useEffect(() => {
    const resetHideTimer = () => {
      setIsButtonVisible(true);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
      }

      showTimeoutRef.current = setTimeout(() => {
        if (!isMenuOpen && !isDragging) {
          hideTimeoutRef.current = setTimeout(() => {
            setIsButtonVisible(false);
          }, 4000);
        }
      }, 100);
    };

    resetHideTimer();
    
    const handleUserActivity = () => {
      if (!isMenuOpen) {
        resetHideTimer();
      }
    };

    document.addEventListener('mousemove', handleUserActivity);
    document.addEventListener('touchstart', handleUserActivity);
    document.addEventListener('scroll', handleUserActivity);

    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
      }
      document.removeEventListener('mousemove', handleUserActivity);
      document.removeEventListener('touchstart', handleUserActivity);
      document.removeEventListener('scroll', handleUserActivity);
    };
  }, [isMenuOpen, isDragging]);

  const handleSectionChange = (sectionId) => {
    if (sectionId === "logout") {
      onLogout();
    } else {
      onSectionChange(sectionId);
    }
    handleMenuClose();
  };

  const handleButtonClick = () => {
    if (!isDragging) {
      setIsMenuOpen(true);
      setCurrentLevel('main');
      setIsButtonVisible(false);
    }
  };

  const handleMenuClose = () => {
    setIsMenuClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsMenuClosing(false);
      setCurrentLevel('main');
      setIsButtonVisible(true);
    }, 250);
  };

  const snapToEdge = (x, y) => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const buttonSize = 60;
    const margin = 10;
    
    const centerX = x + buttonSize / 2;
    const centerY = y + buttonSize / 2;
    
    let newX, newY;
    
    if (centerX < screenWidth / 2) {
      newX = margin;
    } else {
      newX = screenWidth - buttonSize - margin;
    }
    
    newY = Math.max(margin, Math.min(screenHeight - buttonSize - margin, y));
    
    return { x: newX, y: newY };
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(false);
    setDragStart({
      x: e.clientX - buttonPosition.x,
      y: e.clientY - buttonPosition.y
    });
  };

  const handleMouseMove = (e) => {
    if (dragStart.x !== 0 || dragStart.y !== 0) {
      setIsDragging(true);
      const newX = Math.max(0, Math.min(window.innerWidth - 60, e.clientX - dragStart.x));
      const newY = Math.max(0, Math.min(window.innerHeight - 60, e.clientY - dragStart.y));
      setButtonPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      const snappedPosition = snapToEdge(buttonPosition.x, buttonPosition.y);
      setButtonPosition(snappedPosition);
    }
    setDragStart({ x: 0, y: 0 });
    setTimeout(() => setIsDragging(false), 100);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const touch = e.touches[0];
    setDragStart({
      x: touch.clientX - buttonPosition.x,
      y: touch.clientY - buttonPosition.y
    });
  };

  const handleTouchMove = (e) => {
    if (dragStart.x !== 0 || dragStart.y !== 0) {
      setIsDragging(true);
      const touch = e.touches[0];
      const newX = Math.max(0, Math.min(window.innerWidth - 60, touch.clientX - dragStart.x));
      const newY = Math.max(0, Math.min(window.innerHeight - 60, touch.clientY - dragStart.y));
      setButtonPosition({ x: newX, y: newY });
    }
  };

  const handleTouchEnd = () => {
    if (isDragging) {
      const snappedPosition = snapToEdge(buttonPosition.x, buttonPosition.y);
      setButtonPosition(snappedPosition);
    }
    setDragStart({ x: 0, y: 0 });
    setTimeout(() => setIsDragging(false), 100);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [dragStart, buttonPosition, isDragging]);

  // Menu items for different levels based on permissions
  const getMenuItems = () => {
    switch (currentLevel) {
      case 'customer':
        return customerMenuItems;
      case 'admin':
        return adminMenuItems;
      default:
        // Main level - adjust based on permissions
        const mainItems = [
          { id: 'profile', icon: User, text: 'Hồ sơ', onClick: onProfileClick }
        ];

        // If only customer permissions
        if (isCustomer && !isAdmin) {
          return [
            ...mainItems,
            ...customerMenuItems,
            { id: 'logout', icon: LogOut, text: 'Đăng xuất', isLogout: true }
          ];
        }

        // If only admin permissions
        if (!isCustomer && isAdmin) {
          return [
            ...mainItems,
            { id: 'admin-nav', icon: Settings, text: 'Quản trị', isSubmenu: true, submenu: 'admin' },
            { id: 'logout', icon: LogOut, text: 'Đăng xuất', isLogout: true }
          ];
        }

        // If both permissions (default)
        if (isCustomer && isAdmin) {
          return [
            ...mainItems,
            { id: 'customer-nav', icon: Home, text: 'Khách hàng', isSubmenu: true, submenu: 'customer' },
            { id: 'admin-nav', icon: Settings, text: 'Quản trị', isSubmenu: true, submenu: 'admin' },
            { id: 'logout', icon: LogOut, text: 'Đăng xuất', isLogout: true }
          ];
        }

        return mainItems;
    }
  };

  const handleMenuItemClick = (item) => {
    if (item.isSubmenu) {
      setCurrentLevel(item.submenu);
    } else if (item.onClick) {
      item.onClick();
      handleMenuClose();
    } else {
      handleSectionChange(item.id);
    }
  };

  const handleBackToMain = () => {
    setCurrentLevel('main');
  };

  const menuItems = getMenuItems();
  
  // Determine grid layout based on permissions and menu items
  const getGridLayout = () => {
    const itemCount = menuItems.length;
    
    // Special case for admin-only with 3 items (triangle layout)
    if (!isCustomer && isAdmin && currentLevel === 'main' && itemCount === 3) {
      return { gridSize: 2, isTriangle: true, isStaggered: false };
    }
    
    // Special case for admin menu - use staggered layout
    if (currentLevel === 'admin') {
      return { gridSize: 3, isTriangle: false, isStaggered: true };
    }
    
    // Regular grid layout
    if (itemCount <= 4) {
      return { gridSize: 2, isTriangle: false, isStaggered: false };
    } else {
      return { gridSize: 3, isTriangle: false, isStaggered: false };
    }
  };

  const { gridSize, isTriangle, isStaggered } = getGridLayout();
  
  // Calculate menu dimensions
  const getMenuDimensions = () => {
    if (isTriangle) {
      return { width: 200, height: 160 };
    }
    
    if (isStaggered) {
      const rows = Math.ceil(menuItems.length / 3) + (menuItems.length > 3 ? 1 : 0); // Extra row for staggered layout
      return { width: 280, height: Math.max(rows * 80, 240) };
    }
    
    const width = gridSize === 2 ? 200 : 280;
    const rows = Math.ceil(menuItems.length / gridSize);
    const height = rows * 80;
    
    return { width, height };
  };

  const { width: menuWidth, height: menuHeight } = getMenuDimensions();

  // Render staggered layout for admin menu
  const renderStaggeredLayout = () => {
    const rows = [];
    let itemIndex = 0;
    
    // First row: 3 items
    if (itemIndex < menuItems.length) {
      const firstRowItems = menuItems.slice(itemIndex, itemIndex + 3);
      rows.push(
        <div key="row-0" className="flex justify-center gap-6">
          {firstRowItems.map((item, index) => renderMenuItem(item, itemIndex + index))}
        </div>
      );
      itemIndex += 3;
    }
    
    // Second row: 2 items centered
    if (itemIndex < menuItems.length) {
      const secondRowItems = menuItems.slice(itemIndex, itemIndex + 2);
      rows.push(
        <div key="row-1" className="flex justify-center gap-6">
          {secondRowItems.map((item, index) => renderMenuItem(item, itemIndex + index))}
        </div>
      );
      itemIndex += 2;
    }
    
    // Third row and beyond: remaining items in groups of 3
    while (itemIndex < menuItems.length) {
      const rowItems = menuItems.slice(itemIndex, itemIndex + 3);
      const rowIndex = Math.floor((itemIndex - 5) / 3) + 2;
      rows.push(
        <div key={`row-${rowIndex}`} className="flex justify-center gap-6">
          {rowItems.map((item, index) => renderMenuItem(item, itemIndex + index))}
        </div>
      );
      itemIndex += 3;
    }
    
    return <div className="flex flex-col gap-6">{rows}</div>;
  };

  // Render individual menu item
  // Render individual menu item
const renderMenuItem = (item, index) => {
  const IconComponent = item.icon;
  const isActive = activeSection === item.id;
  
  const className = `bg-white/50 backdrop-blur-sm border border-white shadow-[0_0_20px_rgba(0,0,0,0.1)] menu-item w-24 h-24 rounded-[3rem] cursor-pointer flex flex-col items-center justify-center ${
    item.isLogout ? 'logout' : ''
  } ${isActive ? 'ring-2 ring-blue-400 bg-sky-500/20 border-0' : ''}`;
  
  const content = (
    <>
      <IconComponent 
        size={32} 
        className={`mb-1 ${item.isLogout ? 'text-red-500' : 'text-gray-700'}`} 
        strokeWidth={1.9}
      />
      <span className={`text-xs font-semibold text-center leading-tight ${
        item.isLogout ? 'text-red-500' : 'text-gray-700'
      }`} style={{ fontSize: '10px' }}>
        {item.text}
      </span>
    </>
  );
  
  // Sử dụng motion.div cho item có id là "profile"
  if (item.id === 'profile') {
    return (
      <motion.div
        key={`${currentLevel}-${item.id}-${index}`}
        layoutId="profile-section"
        className={className}
        onClick={() => handleMenuItemClick(item)}
      >
        {content}
      </motion.div>
    );
  }
  
  // Sử dụng div thông thường cho các item khác
  return (
    <div
      key={`${currentLevel}-${item.id}-${index}`}
      className={className}
      onClick={() => handleMenuItemClick(item)}
    >
      {content}
    </div>
  );
};

  return (
    <>
      <style jsx>{`
        .assistive-touch-button {
          background: rgba(211, 159, 101, 0.45);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1),
                      inset 0 1px 0 rgba(255, 255, 255, 0.5);
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .assistive-touch-button.visible {
          opacity: 1;
          transform: scale(1);
          animation: buttonAppear 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .assistive-touch-button.hidden {
          opacity: 0.25;
          transform: scale(0.7);
          animation: buttonDisappear 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .assistive-touch-button.dragging {
          transform: scale(1.05);
          box-shadow: 0 16px 50px rgba(0, 0, 0, 0.2);
        }

        .assistive-touch-button:active {
          transform: scale(0.95);
        }

        .menu-overlay {
          backdrop-filter: blur(20px);
          background: rgba(0, 0, 0, 0.1);
        }

        .menu-container {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 
              0 25px 80px rgba(0, 0, 0, 0.15),
              inset 0 1px 0 rgba(255, 255, 255, 0.8),
              inset 0 0 18px 12px rgba(255, 255, 255, 0.7);
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .menu-item {
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08),
                      inset 0 1px 0 rgba(255, 255, 255, 0.7);
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .menu-item:hover {
          background: rgba(255, 255, 255, 0.8);
          transform: scale(1.05);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12),
                      inset 0 1px 0 rgba(255, 255, 255, 1);
        }

        .menu-item:active {
          transform: scale(0.95);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15),
                      inset 0 1px 0 rgba(255, 255, 255, 0.8);
        }

        .menu-item.logout:hover {
          background: rgba(255, 59, 48, 0.15);
        }

        .back-button {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .back-button:hover {
          background: rgba(255, 255, 255, 0.8);
          transform: scale(1.05);
        }

        .triangle-layout {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .triangle-top {
          display: flex;
          justify-content: center;
        }

        .triangle-bottom {
          display: flex;
          gap: 40px;
        }

        @keyframes buttonAppear {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          60% {
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes buttonDisappear {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0.25;
            transform: scale(0.7);
          }
        }

        @keyframes menuAppear {
          0% {
            opacity: 0;
            transform: scale(0.1);
          }
          60% {
            transform: scale(1.08);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes menuDisappear {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0.1);
          }
        }

        @keyframes levelChange {
          0% {
            opacity: 0;
            transform: translateX(30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .menu-appear {
          animation: menuAppear 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .menu-disappear {
          animation: menuDisappear 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .level-change {
          animation: levelChange 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .button-snap {
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }
      `}</style>

      {/* Floating AssistiveTouch Button */}
      {!isMenuOpen && (
        <div
          ref={buttonRef}
          className={`assistive-touch-button fixed w-15 h-15 rounded-full cursor-pointer select-none z-50 flex items-center justify-center ${
            isDragging ? 'dragging' : (isButtonVisible ? 'visible' : 'hidden')
          } ${!isDragging ? 'button-snap' : ''}`}
          style={{
            left: `${buttonPosition.x}px`,
            top: `${buttonPosition.y}px`,
            width: '60px',
            height: '60px'
          }}
          onClick={handleButtonClick}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onMouseEnter={() => setIsButtonVisible(true)}
        >
          <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-white/60"></div>
          </div>
        </div>
      )}

      {/* Menu Overlay */}
      {(isMenuOpen || isMenuClosing) && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center"
          onClick={handleMenuClose}
        >
          {/* Menu Container */}
          <div
            className={`menu-container rounded-3xl p-6 ${
              isMenuClosing ? 'menu-disappear' : 'menu-appear level-change'
            }`}
            style={{
              width: `${menuWidth + 70}px`,
              minHeight: `${menuHeight + 50}px`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Back Button */}
            {currentLevel !== 'main' && (
              <div className="mb-4">
                <button
                  onClick={handleBackToMain}
                  className="back-button w-8 h-8 rounded-full flex items-center justify-center"
                >
                  <ChevronLeft size={16} className="text-gray-600" />
                </button>
              </div>
            )}

            {/* Menu Layout */}
            {isTriangle ? (
              <div className="triangle-layout">
                <div className="triangle-top">
                  {(() => {
                    const item = menuItems[0];
                    return renderMenuItem(item, 0);
                  })()}
                </div>
                <div className="triangle-bottom">
                  {menuItems.slice(1).map((item, index) => renderMenuItem(item, index + 1))}
                </div>
              </div>
            ) : isStaggered ? (
              renderStaggeredLayout()
            ) : (
              <div className={`grid gap-6 ${gridSize === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                {menuItems.map((item, index) => renderMenuItem(item, index))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AssistiveTouchNavigation;