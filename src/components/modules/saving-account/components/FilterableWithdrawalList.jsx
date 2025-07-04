import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Calendar, ArrowUpRight, ArrowDownLeft, CreditCard, TrendingUp, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { formatCurrency } from '@/utils/accountUtils';
import SearchBar, { highlightText } from '../../ui/SearchBar';
import FilterableWithdrawalListShimmer from '@/components/ui/custom/shimmer-types/FilterableWithdrawalListShimmer';

const FilterableWithdrawalList = ({ 
  withdrawals = [], 
  isHidden = false,
  externalIsLoading = false,
  emptyMessage = "Không có lệnh rút tiền nào",
  emptyIcon = <Search size={48} className="text-gray-400" />
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredWithdrawals, setFilteredWithdrawals] = useState(withdrawals);
  const [isSearching, setIsSearching] = useState(false);
  const [internalIsLoading, setInternalIsLoading] = useState(true);
  const [displayedWithdrawals, setDisplayedWithdrawals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const observerRef = useRef();
  const ITEMS_PER_PAGE = 10;

  // Auto turn off internal loading after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setInternalIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Initialize displayed withdrawals when filteredWithdrawals change
  useEffect(() => {
    const initialWithdrawals = filteredWithdrawals.slice(0, ITEMS_PER_PAGE);
    setDisplayedWithdrawals(initialWithdrawals);
    setCurrentPage(1);
    setHasMoreData(filteredWithdrawals.length > ITEMS_PER_PAGE);
  }, [filteredWithdrawals]);

  // Load more withdrawals
  const loadMoreWithdrawals = useCallback(() => {
    if (isLoadingMore || !hasMoreData) return;
    
    setIsLoadingMore(true);
    
    // Simulate loading delay
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const startIndex = (nextPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const newWithdrawals = filteredWithdrawals.slice(startIndex, endIndex);
      
      if (newWithdrawals.length > 0) {
        setDisplayedWithdrawals(prev => [...prev, ...newWithdrawals]);
        setCurrentPage(nextPage);
        setHasMoreData(endIndex < filteredWithdrawals.length);
      } else {
        setHasMoreData(false);
      }
      
      setIsLoadingMore(false);
    }, 1000); // 1 second delay as requested
  }, [currentPage, filteredWithdrawals, isLoadingMore, hasMoreData]);

  // Intersection Observer for infinite scroll
  const lastWithdrawalElementRef = useCallback(node => {
    if (isLoadingMore) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMoreData) {
        loadMoreWithdrawals();
      }
    });
    if (node) observerRef.current.observe(node);
  }, [isLoadingMore, hasMoreData, loadMoreWithdrawals]);

  // Filter withdrawal history với animation effect
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      if (!searchTerm.trim()) {
        setFilteredWithdrawals(withdrawalHistory);
      } else {
        const searchTermLower = searchTerm.toLowerCase();
        const filtered = withdrawals.filter(item => {
          return (
            (item.time && item.time.toLowerCase().includes(searchTermLower)) ||
            (item.channel && item.channel.toLowerCase().includes(searchTermLower)) ||
            (item.status && item.status.toLowerCase().includes(searchTermLower)) ||
            (item.isPartial ? 'một phần' : 'toàn bộ').includes(searchTermLower)
          );
        });
        setFilteredWithdrawals(filtered);
      }
      setIsSearching(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchTerm, withdrawals]);

  const getStatusConfig = (status) => {
    switch (status) {
      case "Thành công":
        return {
          icon: CheckCircle2,
          bgColor: "bg-emerald-50",
          textColor: "text-emerald-700",
          borderColor: "border-emerald-200",
          iconColor: "text-emerald-500"
        };
      default:
        return {
          icon: AlertCircle,
          bgColor: "bg-amber-50",
          textColor: "text-amber-700",
          borderColor: "border-amber-200",
          iconColor: "text-amber-500"
        };
    }
  };

  // Show shimmer if either external or internal loading is true
  if (externalIsLoading || internalIsLoading) {
    return <FilterableWithdrawalListShimmer />;
  }

  return (
    <div className="space-y-6 pb-44 md:pb-24">
      {/* Enhanced Search Section */}
      <div className="relative">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-2 border border-blue-100/50 backdrop-blur-sm">
                   
          <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            placeholder="Nhập từ khóa để tìm kiếm..."
            className="enhanced-search-bar"
          />
          
          {/* Search indicator */}
          {isSearching && (
            <div className="flex items-center gap-2 mt-2 text-xs text-blue-600">
              <div className="w-4 h-4 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <span>Đang tìm kiếm...</span>
            </div>
          )}
        </div>

        {/* Results count with animation */}
        {searchTerm && !isSearching && (
          <div className="mt-3 text-xs text-gray-500 flex items-center gap-2 animate-fade-in">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span>Tìm thấy <strong>{filteredWithdrawals.length}</strong> kết quả cho "<em>{searchTerm}</em>"</span>
          </div>
        )}
      </div>

      {/* Enhanced Withdrawal History List */}
      {displayedWithdrawals.length > 0 ? (
        <div className="space-y-4">
          {displayedWithdrawals.map((item, index) => {
            const statusConfig = getStatusConfig(item.status);
            const StatusIcon = statusConfig.icon;
            const isLastWithdrawal = index === displayedWithdrawals.length - 1;
            
            return (
              <div 
                key={item.id} 
                ref={isLastWithdrawal ? lastWithdrawalElementRef : null}
                className="group relative bg-sky-50 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300 overflow-hidden"
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                {/* Subtle gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-indigo-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Main content */}
                <div className="relative p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center flex-1">
                      {/* Enhanced icon */}
                      <div className="relative">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                          <ArrowUpRight size={20} className="text-white" />
                        </div>
                        {/* Icon decoration */}
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <TrendingUp size={10} className="text-white" />
                        </div>
                      </div>
                      
                      <div className="ml-4 flex-1">
                        <h4 className="font-semibold text-gray-800 text-base mb-1">
                          Rút {highlightText(item.isPartial ? 'một phần' : 'toàn bộ', searchTerm)} tiền gửi
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar size={14} />
                          <span>{highlightText(item.time || "", searchTerm)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced amount display */}
                    <div className="text-right">
                      <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        {isHidden ? '••••••••' : formatCurrency(item.withdrawnAmount)}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">Số tiền rút</div>
                    </div>
                  </div>
                  
                  {/* Enhanced details section */}
                  <div className="space-y-3">
                    {item.channel && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Phương thức:</span>
                        <span className="font-medium text-gray-700 bg-gray-50 px-3 py-1 rounded-full">
                          {highlightText(item.channel, searchTerm)}
                        </span>
                      </div>
                    )}
                    
                    {item.interestAmount !== undefined && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Lãi nhận được:</span>
                        <span className="font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                          {isHidden ? '••••••••' : formatCurrency(item.interestAmount)}
                        </span>
                      </div>
                    )}
                    
                    {item.remainingBalance !== undefined && item.isPartial && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Số dư còn lại:</span>
                        <span className="font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                          {isHidden ? '••••••••' : formatCurrency(item.remainingBalance)}
                        </span>
                      </div>
                    )}
                    
                    {item.status && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Trạng thái:</span>
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${statusConfig.bgColor} ${statusConfig.textColor} ${statusConfig.borderColor}`}>
                          <StatusIcon size={14} className={statusConfig.iconColor} />
                          <span className="font-medium">
                            {highlightText(item.status, searchTerm)}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Clock size={14} />
                        <span>Loại: <strong className="text-blue-600">{item.isPartial ? 'Rút một phần' : 'Rút toàn bộ'}</strong></span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-200 text-sm">
                        Chi tiết →
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Hover border effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-blue-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
          
          {/* Loading more shimmer */}
          {isLoadingMore && (
            <div className="mt-4">
              <FilterableWithdrawalListShimmer 
                itemCount={3}
                showSearchBar={false}
              />
            </div>
          )}
          
          {/* End of list indicator */}
          {!hasMoreData && displayedWithdrawals.length > 0 && (
            <div className="text-center py-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600">
                <CheckCircle2 size={16} />
                <span>Đã hiển thị tất cả lệnh rút tiền</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Enhanced empty state */
        <div className="relative">
          <div className="flex flex-col items-center justify-center py-16 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl border border-gray-100">
            {/* Decorative elements */}
            <div className="absolute top-4 left-4 w-8 h-8 bg-blue-100 rounded-full opacity-20"></div>
            <div className="absolute top-8 right-8 w-6 h-6 bg-indigo-100 rounded-full opacity-30"></div>
            <div className="absolute bottom-6 left-8 w-4 h-4 bg-cyan-100 rounded-full opacity-25"></div>
            
            <div className="relative z-10 text-center">
              <div className="mb-4 p-4 bg-white rounded-2xl shadow-sm inline-block">
                {searchTerm ? (
                  <Search size={48} className="text-gray-400" />
                ) : (
                  emptyIcon
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                {searchTerm ? "Không tìm thấy kết quả" : "Chưa có dữ liệu"}
              </h3>
              <p className="text-gray-500 text-center max-w-sm">
                {searchTerm ? 
                  <>Không tìm thấy kết quả nào cho "<em className="font-medium">{searchTerm}</em>"</> : 
                  (filteredWithdrawals.length === 0 ? emptyMessage : "Đang tải dữ liệu...")
                }
              </p>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
                >
                  Xóa bộ lọc
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .enhanced-search-bar {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 12px;
          transition: all 0.3s ease;
        }
        
        .enhanced-search-bar:focus-within {
          background: rgba(255, 255, 255, 0.95);
          border-color: rgba(59, 130, 246, 0.5);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .group:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default FilterableWithdrawalList;