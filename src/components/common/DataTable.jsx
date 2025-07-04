import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Edit, Trash, RefreshCcw } from 'lucide-react';
import StatusBadge from '../ui/custom/StatusBadge';
import DataTableFilter from './DataTableFilter';
import DataTableRowShimmer from '../ui/custom/shimmer-types/DataTableRowShimmer';

const DataTable = ({
  data = [],
  columns = [],
  sortField,
  sortDirection,
  handleSort,
  onRowClick,
  onEditClick,
  onDeleteClick,
  keyField = 'id',
  className = '',
  headerClassName = 'bg-gradient-to-r from-blue-500 to-indigo-600',
  renderActions = null,
  emptyMessage = 'Không có dữ liệu để hiển thị',
  isLoading = false,
  // Các props cho tính năng lọc dữ liệu
  filters = {},
  dateRangeFilters = {},
  statusFilters = {}, // Thêm prop cho bộ lọc trạng thái
  changeTableData,
  showSearch = true
}) => {
  // State cho việc hiển thị/ẩn bộ lọc
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // State cho các bộ lọc đang được áp dụng
  const [activeFilters, setActiveFilters] = useState({});
  
  // State cho dữ liệu đã được lọc
  const [filteredData, setFilteredData] = useState(data);
  
  // State cho lazy loading và phân trang
  const [displayedData, setDisplayedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showShimmer, setShowShimmer] = useState(false);
  const [isFilteringData, setIsFilteringData] = useState(false);
  const itemsPerPage = 10;
  
  // Ref cho container để tránh thanh cuộn dọc và theo dõi scroll
  const tableContainerRef = useRef(null);
  const observerRef = useRef(null);
  
  // Cập nhật dữ liệu đã lọc khi data thay đổi
  useEffect(() => {
    applyFilters();
  }, [data, activeFilters]);
  
  // Cập nhật dữ liệu hiển thị khi filteredData thay đổi
  useEffect(() => {
    if (filteredData.length > 0) {
      setCurrentPage(1);
      // Luôn hiển thị shimmer khi filteredData thay đổi
      setDisplayedData([]);
      setShowShimmer(true);
      setIsFilteringData(true);
      
      // Sau 1.5s hiển thị dữ liệu thật
      setTimeout(() => {
        setDisplayedData(filteredData.slice(0, itemsPerPage));
        setShowShimmer(false);
        setIsFilteringData(false);
      }, 1500);
    } else {
      // Hiển thị shimmer ngay cả khi filteredData rỗng
      setDisplayedData([]);
      setShowShimmer(true);
      setIsFilteringData(true);
      
      // Sau 1.5s hiển thị thông báo "không tìm thấy dữ liệu"
      setTimeout(() => {
        setShowShimmer(false);
        setIsFilteringData(false);
      }, 1500);
    }
  }, [filteredData]);
  

  
  // Xử lý khi thay đổi bộ lọc
  const handleFilterChange = (key, value) => {
    // Đánh dấu đang lọc dữ liệu
    setIsFilteringData(true);
    
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      
      // Xóa filter nếu giá trị rỗng hoặc mảng rỗng
      if (value === null || value === undefined || value === '' || 
          (Array.isArray(value) && value.length === 0) ||
          (typeof value === 'object' && value.startDate === null && value.endDate === null)) {
        delete newFilters[key];
      } else {
        newFilters[key] = value;
      }
      
      return newFilters;
    });
  };
  
  // Xử lý xóa tất cả các bộ lọc
  const clearAllFilters = () => {
    // Đánh dấu đang lọc dữ liệu
    setIsFilteringData(true);
    setActiveFilters({});
  };
  
  // Kiểm tra có còn dữ liệu để load không
  const hasMoreData = useCallback(() => {
    return displayedData.length < filteredData.length;
  }, [displayedData.length, filteredData.length]);
  
  // Load thêm dữ liệu
  const loadMoreData = useCallback(() => {
    if (isLoadingMore || !hasMoreData()) return;
    
    setIsLoadingMore(true);
    setShowShimmer(true);
    
    // Hiển thị shimmer trong 1.5s
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const newData = filteredData.slice(startIndex, endIndex);
      
      setDisplayedData(prev => [...prev, ...newData]);
      setCurrentPage(nextPage);
      setShowShimmer(false);
      setIsLoadingMore(false);
    }, 1500);
  }, [currentPage, filteredData, isLoadingMore, hasMoreData]);
  
  // Intersection Observer để phát hiện khi scroll đến cuối
  useEffect(() => {
    // Disconnect observer cũ nếu có
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isLoadingMore && hasMoreData()) {
          loadMoreData();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );
    
    observerRef.current = observer;
    
    // Delay để đảm bảo DOM đã được render
    const timeoutId = setTimeout(() => {
      const targetElement = document.querySelector('[data-scroll-target="true"]');
      if (targetElement && hasMoreData()) {
        observer.observe(targetElement);
      }
    }, 100);
    
    return () => {
      clearTimeout(timeoutId);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isLoadingMore, displayedData, filteredData, hasMoreData, loadMoreData]);
  
  // Áp dụng các bộ lọc vào dữ liệu
  const applyFilters = () => {
    if (!data) {
      setFilteredData([]);
      changeTableData && changeTableData([]);
      return;
    }
    
    if (Object.keys(activeFilters).length === 0) {
      setFilteredData(data);
      changeTableData && changeTableData(data);
      return;
    }
    
    let result = [...data];
    
    // Áp dụng từng bộ lọc
    Object.entries(activeFilters).forEach(([key, value]) => {
      // Bỏ qua các filter không có giá trị
      if (value === null || value === undefined || value === '' || 
          (Array.isArray(value) && value.length === 0) ||
          (typeof value === 'object' && value.startDate === null && value.endDate === null)) {
        return;
      }
      
      // Lọc dựa trên loại filter
      if (Array.isArray(value)) {
        // Lọc theo các tùy chọn đã chọn (options filter hoặc status filter)
        result = result.filter(item => {
          const itemValue = getNestedValue(item, key);
          if (itemValue === undefined || itemValue === null) return false;
          return value.includes(itemValue);
        });
      } else if (typeof value === 'object' && (value.startDate || value.endDate)) {
        // Lọc theo khoảng thời gian (date range filter)
        result = result.filter(item => {
          const dateValue = getNestedValue(item, key);
          
          if (!dateValue) return false;
          
          // Chuyển đổi chuỗi ngày thành đối tượng Date
          const itemDate = parseDate(dateValue);
          if (!itemDate) return false;
          
          let startDate = null;
          let endDate = null;
          
          if (value.startDate) {
            startDate = parseDate(value.startDate);
            // Đặt thời gian là đầu ngày (00:00:00)
            startDate.setHours(0, 0, 0, 0);
          }
          
          if (value.endDate) {
            endDate = parseDate(value.endDate);
            // Đặt thời gian là cuối ngày (23:59:59)
            endDate.setHours(23, 59, 59, 999);
          }
          
          // So sánh với khoảng thời gian
          if (startDate && endDate) {
            return itemDate >= startDate && itemDate <= endDate;
          } else if (startDate) {
            return itemDate >= startDate;
          } else if (endDate) {
            return itemDate <= endDate;
          }
          
          return true;
        });
      } else if (typeof value === 'string' && value !== '') {
        // Lọc theo giá trị đơn (text filter)
        result = result.filter(item => {
          const itemValue = getNestedValue(item, key);
          
          if (itemValue === undefined || itemValue === null) return false;
          
          // Chuyển đổi giá trị thành chuỗi để so sánh
          const stringValue = String(itemValue).toLowerCase();
          const filterValue = value.toLowerCase();
          
          return stringValue.includes(filterValue);
        });
      }
    });
    
    setFilteredData(result);
    changeTableData && changeTableData(result);
  };
  
  // Hàm hỗ trợ lấy giá trị từ nested properties
  const getNestedValue = (item, key) => {
    if (!key.includes('.')) return item[key];
    return key.split('.').reduce((obj, k) => obj && obj[k], item);
  };
  
  // Hàm chuyển đổi chuỗi ngày sang đối tượng Date
  const parseDate = (dateString) => {
    if (!dateString) return null;
    
    // Kiểm tra nếu đã là đối tượng Date
    if (dateString instanceof Date) return dateString;
    
    // Xử lý định dạng DD/MM/YYYY
    if (dateString.includes('/')) {
      const parts = dateString.split('/');
      if (parts.length !== 3) return null;
      
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Tháng trong JS bắt đầu từ 0
      const year = parseInt(parts[2], 10);
      
      return new Date(year, month, day);
    }
    
    // Xử lý định dạng YYYY-MM-DD
    if (dateString.includes('-')) {
      const parts = dateString.split('-');
      if (parts.length !== 3) return null;
      
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Tháng trong JS bắt đầu từ 0
      const day = parseInt(parts[2], 10);
      
      return new Date(year, month, day);
    }
    
    // Thử chuyển đổi trực tiếp
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  };
  
  // Chuyển đổi các filters, statusFilters và dateRangeFilters thành định dạng phù hợp cho DataTableFilter
  const prepareFiltersForComponent = () => {
    const preparedFilters = {};
    
    // Xử lý các bộ lọc thông thường
    Object.entries(filters).forEach(([key, options]) => {
      if (Array.isArray(options)) {
        preparedFilters[key] = {
          type: 'options',
          options: options
        };
      } else if (typeof options === 'object' && options.type === 'status') {
        preparedFilters[key] = {
          type: 'status',
          options: options.values || []
        };
      } else if (typeof options === 'object' && !options.type) {
        // Nếu là object nhưng không có type, giả định là status options
        preparedFilters[key] = {
          type: 'status',
          options: Object.keys(options)
        };
      }
    });
    
    // Xử lý các bộ lọc trạng thái
    Object.entries(statusFilters).forEach(([key, options]) => {
      preparedFilters[key] = {
        type: 'status',
        options: Array.isArray(options) ? options : Object.keys(options)
      };
    });
    
    // Xử lý các bộ lọc khoảng thời gian
    Object.entries(dateRangeFilters).forEach(([key, config]) => {
      preparedFilters[key] = {
        type: 'dateRange',
        label: config.label || columnLabels[key] || key
      };
    });
    
    return preparedFilters;
  };
  
  // Lấy nhãn cột từ key
  const getColumnLabel = (key) => {
    const column = columns.find(col => col.key === key);
    return column ? column.label : key;
  };
  
  // Lấy tất cả các nhãn cột
  const getColumnLabels = () => {
    return columns.reduce((acc, col) => {
      acc[col.key] = col.label;
      return acc;
    }, {});
  };
  
  // Toggle hiển thị/ẩn bộ lọc
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  // Animation variants
  const tableRowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: (i % itemsPerPage) * 0.05, // Chỉ delay cho 10 rows đầu tiên của mỗi batch
        duration: 0.4,
        ease: 'easeOut'
      }
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeInOut' } }
  };

  return (
    <div className={className}>
      {/* Filter section - không có layout animation */}
      {(Object.keys(filters).length > 0 || Object.keys(dateRangeFilters).length > 0 || Object.keys(statusFilters).length > 0) && (
        <DataTableFilter
          filters={prepareFiltersForComponent()}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          onClearFilters={clearAllFilters}
          columnLabels={getColumnLabels()}
        />
      )}
      
      {/* Bảng dữ liệu - chỉ phần này có layout animation */}
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, layout: { type: "tween", ease: "easeOut" } }}
        ref={tableContainerRef}
        className={`bg-white rounded-2xl border border-blue-100 shadow-[0_4px_24px_rgba(0,170,255,0.08)] overflow-hidden`}
        style={{ overflowY: 'hidden' }}
      >
        <div className="overflow-x-auto overflow-y-hidden">
          <table className="min-w-full divide-y divide-blue-100">
            <thead className={headerClassName}>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    scope="col"
                    className={`px-3 sm:px-4 lg:px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider cursor-pointer hover:bg-blue-600/80 transition-colors ${column.className || ''}`}
                    onClick={() => column.sortable !== false && handleSort(column.key)}
                  >
                    <div className="flex items-center">
                      <span>{column.label}</span>
                      {sortField === column.key && (
                        <motion.span
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.4 }}
                        >
                          {sortDirection === 'asc' ? 
                            <ChevronUp className="ml-1 w-4 h-4" /> : 
                            <ChevronDown className="ml-1 w-4 h-4" />
                          }
                        </motion.span>
                      )}
                    </div>
                  </th>
                ))}
                <th 
                  scope="col" 
                  className="px-3 sm:px-4 lg:px-6 py-4 text-right text-xs font-medium text-white uppercase tracking-wider"
                >
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-blue-50">
              <AnimatePresence mode="wait">
                {/* Hiển thị shimmer khi filteredData thay đổi (chỉ khi filtering, không phải load more) */}
                {showShimmer && (isFilteringData || displayedData.length === 0) ? (
                  Array.from({ length: itemsPerPage }, (_, index) => (
                    <DataTableRowShimmer
                      key={`filter-shimmer-${index}`}
                      columnCount={columns.length}
                      index={index}
                    />
                  ))
                ) : displayedData.length === 0 && !isLoading && !showShimmer ? (
                  <tr>
                    <td colSpan={columns.length + 1} className="px-6 py-10 text-center">
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center text-gray-500"
                      >
                        {isLoading ? (
                          <>
                            <RefreshCcw size={32} className="text-blue-400 animate-spin mb-3" />
                            <p>Đang tải dữ liệu...</p>
                          </>
                        ) : (
                          <>
                            <svg className="w-12 h-12 text-blue-200 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p>{Object.keys(activeFilters).length > 0 ? 'Không có dữ liệu phù hợp với bộ lọc' : emptyMessage}</p>
                          </>
                        )}
                      </motion.div>
                    </td>
                  </tr>
                ) : !(showShimmer && (isFilteringData || displayedData.length === 0)) && (
                  <>
                    {/* Hiển thị dữ liệu thực */}
                    {displayedData.map((item, i) => (
                      <motion.tr 
                        key={item[keyField]}
                        custom={i}
                        variants={tableRowVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="hover:bg-blue-50/60 transition-colors cursor-pointer"
                        onClick={() => onRowClick && onRowClick(item)}
                        layoutId={statusFilters.status && statusFilters.status.includes('inTerm') ? `savings-account-card-${item[keyField]}` : `row-${item[keyField]}`}
                        layout
                        transition={{
                          layout: { type: "spring", damping: 15, stiffness: 100 },
                          opacity: { duration: 0.6 }
                        }}
                      >
                        {columns.map((column) => {
                          // Render special components based on column type
                          if (column.type === 'status') {
                            return (
                              <td key={column.key} className={`px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap ${column.className || ''}`}>
                                <StatusBadge status={item[column.key]} />
                              </td>
                            );
                          }
                          
                          // Handle nested properties
                          let value = item[column.key];
                          if (column.key.includes('.')) {
                            const keys = column.key.split('.');
                            value = keys.reduce((obj, key) => obj && obj[key], item);
                          }
                          
                          // Apply formatter if provided
                          if (column.formatter) {
                            value = column.formatter(value, item);
                          }
                          
                          return (
                            <td key={column.key} className={`px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap ${column.className || ''}`}>
                              {column.formatter ? value : (
                                <div className="text-sm text-gray-800">{value}</div>
                              )}
                            </td>
                          );
                        })}
                        <td className="px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2" onClick={(e) => e.stopPropagation()}>
                            {renderActions ? renderActions(item) : (
                              <>
                                {onEditClick && (
                                  <motion.button
                                    onClick={() => onEditClick(item)}
                                    whileHover={{ scale: 1.15, rotate: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="text-blue-600 hover:text-blue-800 p-1.5 rounded-full hover:bg-blue-50"
                                  >
                                    <Edit size={18} />
                                  </motion.button>
                                )}
                                {onDeleteClick && (
                                  <motion.button
                                    onClick={() => onDeleteClick(item)}
                                    whileHover={{ scale: 1.15, rotate: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="text-red-600 hover:text-red-800 p-1.5 rounded-full hover:bg-red-50"
                                  >
                                    <Trash size={18} />
                                  </motion.button>
                                )}
                              </>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                    
                    {/* Hiển thị shimmer rows khi đang load thêm (không phải khi lọc) */}
                    {showShimmer && hasMoreData() && !isFilteringData && displayedData.length > 0 && (
                      Array.from({ length: itemsPerPage }, (_, index) => (
                        <DataTableRowShimmer
                          key={`shimmer-${displayedData.length + index}`}
                          columnCount={columns.length}
                          index={index}
                        />
                      ))
                    )}
                    
                    {/* Invisible element để trigger intersection observer */}
                    {hasMoreData() && !showShimmer && (
                      <tr 
                        data-scroll-target="true"
                        ref={(el) => {
                          if (el && observerRef.current) {
                            observerRef.current.observe(el);
                          }
                        }}
                        style={{ height: '1px' }}
                      >
                        <td colSpan={columns.length + 1} style={{ height: '1px', padding: 0 }}></td>
                      </tr>
                    )}
                    

                  </>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>
      
      {/* Thông báo đã hiển thị tất cả dữ liệu - nằm ngoài bảng */}
      {!hasMoreData() && displayedData.length > 0 && !showShimmer && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center text-gray-500 py-6 mt-4"
        >
          <svg className="w-8 h-8 text-blue-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm font-medium text-gray-600">Đã hiển thị tất cả dữ liệu</p>
          <p className="text-xs text-gray-400 mt-1">Tổng cộng {filteredData.length} mục</p>
        </motion.div>
      )}
    </div>
  );
};

export default DataTable;