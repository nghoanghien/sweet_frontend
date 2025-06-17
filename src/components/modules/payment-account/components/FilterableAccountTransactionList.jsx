import React, { useState, useEffect } from 'react';
import { Search, ArrowUpRight, ArrowDownLeft, Calendar, CreditCard, TrendingUp, Clock, CheckCircle2, AlertCircle, Wallet } from 'lucide-react';
import { formatCurrency, getChannelInfo } from '../../../../utils/accountUtils';
import SearchBar, { highlightText } from '../../ui/SearchBar'
import  FilterableAccountTransactionListShimmer  from '@/components/ui/custom/shimmer-types/FilterableAccountTransactionListShimmer';

const FilterableAccountTransactionList = ({ 
  transactions = [], 
  isHidden = false,
  isLoading: externalIsLoading = false,
  emptyMessage = "Không có giao dịch nào",
  emptyIcon = <Wallet size={48} className="text-gray-400" />
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);
  const [isSearching, setIsSearching] = useState(false);
  const [internalIsLoading, setInternalIsLoading] = useState(true);

  // Auto-hide loading after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setInternalIsLoading(false);
    }, 2000); // Loading sẽ tắt sau 2 giây

    return () => clearTimeout(timer);
  }, []);

  // Filter transactions với animation effect
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      if (!searchTerm.trim()) {
        setFilteredTransactions(transactions);
      } else {
        const searchTermLower = searchTerm.toLowerCase();
        const filtered = transactions.filter(transaction => {
          // Search across multiple fields
          return (
            (transaction.type && transaction.type.toLowerCase().includes(searchTermLower)) ||
            (transaction.time && transaction.time.toLowerCase().includes(searchTermLower)) ||
            (transaction.channel && transaction.channel.toLowerCase().includes(searchTermLower)) ||
            (transaction.content && transaction.content.toLowerCase().includes(searchTermLower)) ||
            (getChannelInfo(transaction.channel).name.toLowerCase().includes(searchTermLower))
          );
        });
        setFilteredTransactions(filtered);
      }
      setIsSearching(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchTerm, transactions]);

  // Get enhanced transaction icon
  const getTransactionIcon = (transaction) => {
    if (transaction.isIncoming) {
      return <ArrowDownLeft size={20} className="text-white" />;
    } else {
      return <ArrowUpRight size={20} className="text-white" />;
    }
  };

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

  // Show shimmer when loading (either external or internal)
  if (externalIsLoading || internalIsLoading) {
    return (
      <FilterableAccountTransactionListShimmer 
        itemCount={5}
        showSearchBar={true}
      />
    );
  }

  return (
    <div className="space-y-6 mb-56">
      {/* Enhanced Search Section */}
      <div className="relative">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-2 border border-indigo-100/50 backdrop-blur-sm">
          <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            placeholder="Tìm kiếm giao dịch tài khoản..."
            className="enhanced-search-bar"
          />
          
          {/* Search indicator */}
          {isSearching && (
            <div className="flex items-center gap-2 mt-2 text-xs text-indigo-600">
              <div className="w-4 h-4 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              <span>Đang tìm kiếm...</span>
            </div>
          )}
        </div>

        {/* Results count with animation */}
        {searchTerm && !isSearching && (
          <div className="mt-3 text-xs text-gray-500 flex items-center gap-2 animate-fade-in">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
            <span>Tìm thấy <strong>{filteredTransactions.length}</strong> kết quả cho "<em>{searchTerm}</em>"</span>
          </div>
        )}
      </div>

      {/* Enhanced Transaction List */}
      {filteredTransactions.length > 0 ? (
        <div className="space-y-4">
          {filteredTransactions.map((transaction, index) => {
            const channelInfo = getChannelInfo(transaction.channel);
            const statusConfig = transaction.status ? getStatusConfig(transaction.status) : null;
            const StatusIcon = statusConfig?.icon;
            
            return (
              <div 
                key={transaction.id} 
                className="group relative bg-sky-50 bg-gradient-to-r from-slate-50 to-purple-50/30 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-purple-100/50 transition-all duration-300 overflow-hidden"
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                {/* Subtle gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-50/30 via-transparent to-pink-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Main content */}
                <div className="relative p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center flex-1">
                      {/* Enhanced icon */}
                      <div className="relative">
                        <div className={`h-12 w-12 rounded-xl ${
                          transaction.isIncoming 
                            ? 'bg-gradient-to-br from-teal-500 to-cyan-600' 
                            : 'bg-gradient-to-br from-rose-500 to-pink-600'
                        } flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300`}>
                          {getTransactionIcon(transaction)}
                        </div>
                        {/* Icon decoration */}
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <TrendingUp size={10} className="text-white" />
                        </div>
                      </div>
                      
                      <div className="ml-4 flex-1">
                        <h4 className="font-semibold text-gray-800 text-base mb-1">
                          {highlightText(transaction.type, searchTerm)}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar size={14} />
                          <span>{highlightText(transaction.time, searchTerm)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced amount display */}
                    <div className="text-right">
                      <div className={`text-lg font-bold ${
                        transaction.isIncoming 
                          ? 'bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent' 
                          : 'bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent'
                      }`}>
                        {isHidden ? 
                          '••••••••' : 
                          (transaction.isIncoming ? '+' : '-') + formatCurrency(transaction.amount)
                        }
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {transaction.isIncoming ? 'Tiền vào' : 'Tiền ra'}
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced details section */}
                  <div className="space-y-3">
                    {/* Channel information with enhanced styling */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 flex items-center gap-2">
                        <CreditCard size={14} />
                        Kênh giao dịch:
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-white rounded-lg shadow-sm border border-gray-100">
                          {channelInfo.icon}
                        </div>
                        <span className="font-medium text-gray-700 bg-gradient-to-r from-purple-50 to-pink-50 px-3 py-1.5 rounded-full border border-purple-100">
                          {highlightText(channelInfo.name, searchTerm)}
                        </span>
                      </div>
                    </div>
                    
                    {transaction.content && (
                      <div className="flex items-start justify-between text-sm gap-3">
                        <span className="text-gray-500 whitespace-nowrap">Nội dung:</span>
                        <span className="font-medium text-gray-700 text-right">
                          {highlightText(transaction.content, searchTerm)}
                        </span>
                      </div>
                    )}
                    
                    {transaction.status && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Trạng thái:</span>
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${statusConfig.bgColor} ${statusConfig.textColor} ${statusConfig.borderColor}`}>
                          <StatusIcon size={14} className={statusConfig.iconColor} />
                          <span className="font-medium">
                            {highlightText(transaction.status, searchTerm)}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Clock size={14} />
                        <span>
                          Số dư sau: <strong className="text-indigo-600">
                            {isHidden ? '••••••••' : formatCurrency(transaction.balanceAfter)}
                          </strong>
                        </span>
                      </div>
                      <button className="text-indigo-600 hover:text-indigo-700 font-medium hover:underline transition-colors duration-200 text-sm">
                        Chi tiết →
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Hover border effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-indigo-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Enhanced empty state */
        <div className="relative">
          <div className="flex flex-col items-center justify-center py-16 bg-gradient-to-br from-gray-50 to-purple-50/30 rounded-2xl border border-gray-100">
            {/* Decorative elements */}
            <div className="absolute top-4 left-4 w-8 h-8 bg-purple-100 rounded-full opacity-20"></div>
            <div className="absolute top-8 right-8 w-6 h-6 bg-pink-100 rounded-full opacity-30"></div>
            <div className="absolute bottom-6 left-8 w-4 h-4 bg-indigo-100 rounded-full opacity-25"></div>
            
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
                  emptyMessage
                }
              </p>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-200 text-sm font-medium"
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
          border: 1px solid rgba(147, 51, 234, 0.2);
          border-radius: 12px;
          transition: all 0.3s ease;
        }
        
        .enhanced-search-bar:focus-within {
          background: rgba(255, 255, 255, 0.95);
          border-color: rgba(147, 51, 234, 0.5);
          box-shadow: 0 0 0 3px rgba(147, 51, 234, 0.1);
        }
        
        .group:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default FilterableAccountTransactionList;