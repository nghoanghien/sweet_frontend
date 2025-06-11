import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, History, Calendar, ChevronDown } from 'lucide-react';

// Import the tab components
import InterestRateRegulations from '../../../components/modules/saving-products-management/interest-rates/InterestRateRegulations';
import RegulationHistory from '../../../components/modules/saving-products-management/regulation-history/RegulationHistory';
import ApplicationSchedule from '../../../components/modules/saving-products-management/application-schedule/ApplicationSchedule';

// Custom hook for responsive design
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const updateMatches = () => setMatches(mediaQuery.matches);
    
    mediaQuery.addEventListener('change', updateMatches);
    
    return () => {
      mediaQuery.removeEventListener('change', updateMatches);
    };
  }, [query]);

  return matches;
};

const SavingsProductManagement = () => {
  const [activeTab, setActiveTab] = useState('interest-rates');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Media queries for responsive design
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1023px)');

  const tabs = [
    {
      id: 'interest-rates',
      label: 'Quy định lãi suất',
      icon: <Settings size={20} />,
      component: <InterestRateRegulations />
    },
    {
      id: 'regulation-history',
      label: 'Lịch sử quy định',
      icon: <History size={20} />,
      component: <RegulationHistory />
    },
    {
      id: 'application-schedule',
      label: 'Lịch trình áp dụng',
      icon: <Calendar size={20} />,
      component: <ApplicationSchedule />
    }
  ];
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <div className="container mx-auto md:pl-0 p-3 md:p-6 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Quản lý sản phẩm tiết kiệm
        </h1>
        
        {/* Mobile dropdown menu */}
        {isMobile && (
          <div className="relative">
            <motion.button 
              onClick={toggleMobileMenu}
              whileTap={{ scale: 0.97 }}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2.5 rounded-xl shadow-[0_4px_20px_rgba(79,70,229,0.3)]"
            >
              <span className="font-medium">{tabs.find(tab => tab.id === activeTab)?.label}</span>
              <ChevronDown 
                size={18} 
                className={`transition-transform duration-300 ${mobileMenuOpen ? 'rotate-180' : ''}`}
              />
            </motion.button>
            
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div 
                  className="absolute right-0 mt-3 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] z-20 min-w-[180px] overflow-hidden border border-indigo-50"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="py-2">
                    {tabs.map((tab) => (
                      <motion.button
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        className={`
                          flex items-center space-x-3 px-5 py-3 w-full text-left
                          ${activeTab === tab.id
                            ? 'bg-indigo-50 text-indigo-600 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                          }
                        `}
                      >
                        <motion.span
                          animate={activeTab === tab.id ? { scale: 1.18, filter: 'drop-shadow(0_0_8px_rgba(0,170,255,0.4))' } : { scale: 1, filter: 'none' }}
                          whileHover={{ scale: 1.13, filter: 'drop-shadow(0_0_8px_rgba(0,170,255,0.18))' }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        >
                          {tab.icon}
                        </motion.span>
                        <span>{tab.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
      
      {/* Tab navigation - Only on tablet and desktop */}
      {!isMobile && (
        <motion.div 
          className="bg-white md:mx-36 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.06)] mb-8 p-1.5 border border-gray-100"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex space-x-1 sm:space-x-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    relative flex items-center justify-center space-x-2 px-4 sm:px-5 py-3 sm:py-4 rounded-xl flex-1 transition-all
                    ${isActive
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-[0_4px_20px_rgba(79,70,229,0.25)]'
                      : 'hover:bg-indigo-50 text-gray-600 hover:text-indigo-600'
                    }
                  `}
                >
                  <motion.span
                    className="hidden md:font-bold sm:block"
                    animate={isActive ? { scale: 1.18, filter: 'drop-shadow(0_0_8px_rgba(0,170,255,0.4))' } : { scale: 1, filter: 'none' }}
                    whileHover={{ scale: 1.13, filter: 'drop-shadow(0_0_8px_rgba(0,170,255,0.18))' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    {tab.icon}
                  </motion.span>
                  <span className={`text-sm md:font-extrabold ${isTablet ? 'text-xs' : 'sm:text-base'} truncate`}>{tab.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}
      
      {/* Tab content */}
      <div className="relative">
        <AnimatePresence mode="wait" initial={false}>
          {tabs.map(tab =>
            tab.id === activeTab && (
              <motion.div
                key={tab.id}
                className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-2 sm:p-8 border border-gray-100"
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.98 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                {tab.component}
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SavingsProductManagement; 