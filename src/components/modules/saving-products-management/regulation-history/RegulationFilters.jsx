import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ArrowUp, ArrowDown, Check, Clock3, Grid, List, Ban, ChevronDown } from 'lucide-react';

const RegulationFilters = ({
  statusFilter,
  onStatusFilterChange,
  sortOrder,
  onSortOrderChange,
  viewMode,
  onViewModeChange
}) => {
  // Mobile menu state
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Status filter options
  const statusOptions = [
    { id: 'all', label: 'Tất cả' },
    { id: 'applied', label: 'Đã áp dụng', icon: <Check size={14} className="mr-1" /> },
    { id: 'pending', label: 'Chờ áp dụng', icon: <Clock3 size={14} className="mr-1" /> },
    { id: 'cancelled', label: 'Đã hủy', icon: <Ban size={14} className="mr-1" /> }
  ];
  
  // Sort order options
  const sortOptions = [
    { id: 'asc', label: 'Tăng dần', icon: <ArrowUp size={14} className="mr-1" /> },
    { id: 'desc', label: 'Giảm dần', icon: <ArrowDown size={14} className="mr-1" /> }
  ];
  
  // View mode options
  const viewOptions = [
    { id: 'grid', label: 'Dạng lưới', icon: <Grid size={14} className="mr-1" /> },
    { id: 'list', label: 'Dạng danh sách', icon: <List size={14} className="mr-1" /> }
  ];
  
  // Toggle mobile filters
  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen);
  };

  return (
    <div className="mb-6">
      <div className="bg-gradient-to-br from-blue-50/80 to-white rounded-2xl shadow-[0_4px_24px_rgba(0,170,255,0.08)] border-2 border-blue-100 p-4 sm:p-6">
        {/* Mobile filter toggle */}
        <div className="md:hidden mb-3">
          <button 
            onClick={toggleMobileFilters}
            className="w-full flex items-center justify-between bg-gradient-to-r from-blue-100/80 to-indigo-100/80 p-4 rounded-xl shadow-sm border-2 border-blue-200 hover:bg-blue-50/60 transition-all font-bold text-blue-700 text-base"
          >
            <div className="flex items-center text-gray-700 font-medium">
              <Filter size={16} className="mr-2" />
              <span>Bộ lọc & Sắp xếp</span>
            </div>
            <ChevronDown 
              size={16} 
              className={`transition-transform duration-200 ${mobileFiltersOpen ? 'rotate-180' : ''}`} 
            />
          </button>
        </div>
        
        {/* Mobile layout - collapsible */}
        <AnimatePresence>
          {(mobileFiltersOpen || window.innerWidth >= 768) && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex flex-col md:flex-row gap-4">
                {/* Status filter */}
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-blue-800 mb-2 flex items-center">
                    <Filter size={14} className="mr-1" />
                    Trạng thái
                  </h3>
                  
                  <div className="flex flex-wrap gap-2">
                    {statusOptions.map(option => (
                      <motion.button
                        key={option.id}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onStatusFilterChange(option.id)}
                        className={`px-4 py-2 text-base rounded-xl flex items-center font-semibold shadow-sm border-2 transition-all
                          ${statusFilter === option.id 
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-400' 
                            : 'bg-white text-blue-700 border-gray-200 hover:bg-blue-50/60'
                          }
                        `}
                      >
                        {option.icon}
                        {option.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                {/* Bottom row for mobile, aligned row for desktop */}
                <div className="flex flex-col sm:flex-row gap-3 mt-3 md:mt-0">
                  {/* Sort order */}
                  <div className="sm:w-64 flex-1 md:flex-none">
                    <h3 className="text-sm font-bold text-blue-800 mb-2">Sắp xếp</h3>
                    
                    <div className="flex bg-blue-50 rounded-xl p-1 border border-blue-100">
                      {sortOptions.map(option => (
                        <motion.button
                          key={option.id}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onSortOrderChange(option.id)}
                          className={`flex-1 px-3 py-2 text-base rounded-lg flex items-center justify-center font-semibold transition-all
                            ${sortOrder === option.id 
                              ? 'bg-white shadow-sm text-indigo-600 border border-blue-300' 
                              : 'text-blue-700 hover:bg-blue-50/60 border border-transparent'
                            }
                          `}
                        >
                          {option.icon}
                          <span className="hidden xs:inline">{option.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  
                  {/* View mode */}
                  <div className="flex bg-blue-50 rounded-xl p-1 border border-blue-100 flex-1 md:w-auto">
                    {viewOptions.map(option => (
                      <motion.button
                        key={option.id}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onViewModeChange(option.id)}
                        className={`flex-1 px-3 py-2 text-base rounded-lg flex items-center justify-center font-semibold transition-all
                          ${viewMode === option.id 
                            ? 'bg-white shadow-sm text-indigo-600 border border-blue-300' 
                            : 'text-blue-700 hover:bg-blue-50/60 border border-transparent'
                          }
                        `}
                      >
                        {option.icon}
                        <span className="hidden xs:inline">{option.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RegulationFilters; 