import React, { useState, useRef, useEffect } from 'react';
import { User, FileText, Clock, ChevronRight, Sparkles } from 'lucide-react';

const AnimatedTabNavigation = ({ 
  activeTab, 
  onTabChange, 
  tabs = [],
  variant = 'blue',
  className = '',
  showScrollbar = false,
  haveChevron=true,
  alwaysMini=false 
}) => {
  const [hoveredTab, setHoveredTab] = useState(null);
  const [tabPositions, setTabPositions] = useState({});
  const [activeTabPosition, setActiveTabPosition] = useState({ left: 0, width: 0 });
  const tabRefs = useRef({});
  const containerRef = useRef(null);

  // Enhanced variants với gradient và glow
  const variants = {
    indigo: {
      gradient: 'from-indigo-500 via-purple-500 to-pink-500',
      activeGlow: 'shadow-indigo-500/30',
      activeBg: 'bg-gradient-to-r from-indigo-50 to-purple-50',
      hoverBg: 'hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50',
      border: 'border-indigo-100',
      background: 'bg-gradient-to-br from-indigo-50/30 via-white to-purple-50/20'
    },
    blue: {
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      activeGlow: 'shadow-blue-500/30',
      activeBg: 'bg-gradient-to-r from-blue-50 to-cyan-50',
      hoverBg: 'hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-cyan-50/50',
      border: 'border-blue-100',
      background: 'bg-gradient-to-br from-blue-50/30 via-white to-cyan-50/20'
    },
    cyan: {
      gradient: 'from-cyan-500 via-teal-500 to-emerald-500',
      activeGlow: 'shadow-cyan-500/30',
      activeBg: 'bg-gradient-to-r from-cyan-50 to-teal-50',
      hoverBg: 'hover:bg-gradient-to-r hover:from-cyan-50/50 hover:to-teal-50/50',
      border: 'border-cyan-100',
      background: 'bg-gradient-to-br from-cyan-50/30 via-white to-teal-50/20'
    },
    teal: {
      gradient: 'from-teal-500 via-emerald-500 to-green-500',
      activeGlow: 'shadow-teal-500/30',
      activeBg: 'bg-gradient-to-r from-teal-50 to-emerald-50',
      hoverBg: 'hover:bg-gradient-to-r hover:from-teal-50/50 hover:to-emerald-50/50',
      border: 'border-teal-100',
      background: 'bg-gradient-to-br from-teal-50/30 via-white to-emerald-50/20'
    },
    purple: {
      gradient: 'from-purple-500 via-pink-500 to-rose-500',
      activeGlow: 'shadow-purple-500/30',
      activeBg: 'bg-gradient-to-r from-purple-50 to-pink-50',
      hoverBg: 'hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-pink-50/50',
      border: 'border-purple-100',
      background: 'bg-gradient-to-br from-purple-50/30 via-white to-pink-50/20'
    }
  };

  const currentVariant = variants[variant] || variants.indigo;

  // Default tabs
  const defaultTabs = [
    { id: 'information', label: 'Thông tin cá nhân', icon: User },
    { id: 'payment', label: 'Tài khoản thanh toán', icon: FileText },
    { id: 'deposits', label: 'Tiền gửi', icon: Clock }
  ];

  const tabList = tabs.length > 0 ? tabs : defaultTabs;

  // Calculate active tab position for sliding indicator
  useEffect(() => {
    const activeTabEl = tabRefs.current[activeTab];
    if (activeTabEl && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const tabRect = activeTabEl.getBoundingClientRect();
      
      setActiveTabPosition({
        left: tabRect.left - containerRect.left,
        width: tabRect.width
      });
    }
  }, [activeTab, tabList]);

  return (
    <div className={`relative w-full px-0 pb-0 ${currentVariant.background} ${className}`}>
      {/* Floating orbs background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-2 left-8 w-16 h-16 bg-gradient-to-r from-white/10 to-transparent rounded-full blur-xl animate-pulse" />
        <div className="absolute top-4 right-12 w-12 h-12 bg-gradient-to-r from-white/15 to-transparent rounded-full blur-lg animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-2 left-1/3 w-8 h-8 bg-gradient-to-r from-white/20 to-transparent rounded-full blur-md animate-pulse" style={{animationDelay: '2s'}} />
      </div>

      {/* Tab container */}
      <div 
        ref={containerRef}
        className={`relative w-full flex justify-center space-x-2 ${
          showScrollbar ? '' : 'scrollbar-hide'
        }`}
        style={showScrollbar ? {} : { scrollbarWidth: "none" }}
      >
        {/* Sliding active indicator */}
        {/* <div 
          className={`absolute bottom-0 h-1 bg-gradient-to-r ${currentVariant.gradient} rounded-full transition-all duration-500 ease-out transform ${currentVariant.activeGlow} shadow-lg`}
          style={{
            left: `${activeTabPosition.left}px`,
            width: `${activeTabPosition.width}px`,
            boxShadow: `0 0 20px rgba(99, 102, 241, 0.4), 0 0 40px rgba(99, 102, 241, 0.2)`
          }}
        /> */}

        {tabList.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isHovered = hoveredTab === tab.id;
          
          return (
            <button
              key={tab.id}
              ref={(el) => tabRefs.current[tab.id] = el}
              onClick={() => onTabChange(tab.id)}
              onMouseEnter={() => setHoveredTab(tab.id)}
              onMouseLeave={() => setHoveredTab(null)}
              className={`
                ${alwaysMini ? 'px-2 md:px-5' : 'px-2 md:px-6'}
                relative pb-2 py-4 font-medium text-sm rounded-b-3xl transition-all duration-500 ease-out
                backdrop-blur-sm border-2 border-white/20
                ${isActive 
                  ? `text-gray-800 ${currentVariant.activeBg} transform -translate-y-2 ${currentVariant.activeGlow} shadow-xl scale-105` 
                  : `text-gray-600 bg-white/30 ${currentVariant.hoverBg} hover:transform -translate-y-4 hover:-translate-y-1 hover:scale-102 shadow-lg`
                }
                group overflow-hidden
              `}
            >
              {/* Gradient overlay for active tab */}
              {isActive && (
                <div className={`absolute inset-0 bg-gradient-to-r ${currentVariant.gradient} opacity-5 rounded-2xl`} />
              )}

              {/* Shimmer effect */}
              <div className={`
                absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                transform -translate-x-full transition-transform duration-1000 rounded-2xl
                ${isHovered ? 'translate-x-full' : ''}
              `} />

              {/* Sparkle effects for active tab */}
              {isActive && (
                <>
                  <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full animate-ping opacity-60" />
                  <div className="absolute top-2 left-2 w-1 h-1 bg-white rounded-full animate-ping opacity-40" style={{animationDelay: '0.5s'}} />
                  <div className="absolute bottom-1 right-3 w-0.5 h-0.5 bg-white rounded-full animate-ping opacity-60" style={{animationDelay: '1s'}} />
                </>
              )}

              {/* Tab content */}
              <div className={` 
                ${alwaysMini ? 'flex flex-col space-y-1 space-x-0 md:space-x-0' : 'flex flex-col md:flex-row space-y-1 md:space-y-0 space-x-0 sm:space-x-3'}
                relative z-10 justify-center items-center transition-all duration-300
                
                ${isActive ? 'scale-100' : 'scale-95 group-hover:scale-100'}
              `}>
                {/* Icon container */}
                <div className={`
                  relative flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-xl transition-all duration-300
                  ${isActive 
                    ? `bg-gradient-to-r ${currentVariant.gradient} text-white shadow-lg` 
                    : 'bg-white/40 text-gray-600 group-hover:bg-white/60'
                  }
                `}>
                  <Icon 
                    size={16} 
                    className={`transition-all duration-300 ${
                      isActive ? 'animate-pulse scale-110' : 'group-hover:scale-110'
                    }`}
                  />
                  
                  {/* Icon glow */}
                  {isActive && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${currentVariant.gradient} rounded-xl blur-md opacity-40 animate-pulse`} />
                  )}
                </div>

                {/* Label */}
                <span className={`
                  whitespace-normal font-semibold text-sm md:text-md transition-all duration-300
                  ${isActive ? 'text-gray-800' : 'text-gray-600 group-hover:text-gray-800'}
                `}>
                  {tab.label}
                </span>
                
                {/* Active indicator */}
                {isActive && haveChevron && (
                  <div className="hidden md:flex items-center space-x-1">
                    <ChevronRight 
                      size={14} 
                      className="animate-pulse opacity-70"
                    />
                  </div>
                )}
              </div>

              {/* Ripple effect on click */}
              <div className={`
                absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none
                ${isActive ? 'bg-gradient-to-r from-white/10 via-white/5 to-white/10 animate-pulse' : ''}
              `} />

              {/* Hover glow */}
              {isHovered && !isActive && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 via-white/10 to-white/20 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scale-102 {
          transform: scale(1.02);
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @media (max-width: 640px) {
          .space-x-2 > :not([hidden]) ~ :not([hidden]) {
            margin-left: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedTabNavigation;
