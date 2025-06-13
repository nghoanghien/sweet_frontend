import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Clock, 
  ArrowDownLeft, 
  ArrowUpRight, 
  CreditCard, 
  Wallet, 
  Building,
  CheckCircle2, 
  ChevronDown,
  ChevronUp,
  Calendar,
  Search,
  User
} from 'lucide-react';
import SearchBar, { highlightText } from '../ui/SearchBar';

function EmployeeTransactionHistory({ employee }) {
  // State for expanded transaction items
  const [expandedTransactions, setExpandedTransactions] = useState({});
  // State for search functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState(employee?.transactions || []);
  const [isSearching, setIsSearching] = useState(false);
  
  // Filter transactions with animation effect
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      if (!searchTerm.trim()) {
        setFilteredTransactions(employee?.transactions || []);
      } else {
        const searchTermLower = searchTerm.toLowerCase();
        const filtered = (employee?.transactions || []).filter(transaction => {
          // Search across multiple fields
          return (
            (transaction.type && transaction.type.toLowerCase().includes(searchTermLower)) ||
            (transaction.description && transaction.description.toLowerCase().includes(searchTermLower)) ||
            (transaction.date && transaction.date.toLowerCase().includes(searchTermLower)) ||
            (transaction.time && transaction.time.toLowerCase().includes(searchTermLower)) ||
            (transaction.channel && transaction.channel.toLowerCase().includes(searchTermLower)) ||
            (transaction.note && transaction.note.toLowerCase().includes(searchTermLower)) ||
            (transaction.amount && transaction.amount.toString().includes(searchTermLower))
          );
        });
        setFilteredTransactions(filtered);
      }
      setIsSearching(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchTerm, employee?.transactions]);
  
  // Toggle transaction expansion
  const toggleTransaction = (transactionId) => {
    setExpandedTransactions(prev => ({
      ...prev,
      [transactionId]: !prev[transactionId]
    }));
  };
  
  // Helper function to get transaction icon based on transaction type
  const getTransactionIcon = (transactionType) => {
    if (transactionType === 'incoming') {
      return <ArrowDownLeft size={20} className="text-white" />;
    } else {
      return <ArrowUpRight size={20} className="text-white" />;
    }
  };
  
  // Helper function to get source account type display
  const getSourceAccountTypeDisplay = (transaction) => {
    // Assuming we have a sourceAccountType field in the transaction
    // This is a placeholder - you'll need to adjust based on your actual data structure
    const sourceType = transaction.sourceAccountType || "Tài khoản thanh toán";
    
    switch(sourceType) {
      case "Tài khoản thanh toán":
        return <span className="text-blue-600">Tài khoản thanh toán</span>;
      case "Phiếu gửi tiền":
        return <span className="text-green-600">Phiếu gửi tiền</span>;
      case "Tiền mặt tại quầy":
        return <span className="text-amber-600">Tiền mặt tại quầy</span>;
      case "Ngân hàng":
        return <span className="text-purple-600">Ngân hàng</span>;
      default:
        return <span className="text-gray-600">{sourceType}</span>;
    }
  };
  
  // Helper function to get destination account type display
  const getDestAccountTypeDisplay = (transaction) => {
    // Assuming we have a destAccountType field in the transaction
    // This is a placeholder - you'll need to adjust based on your actual data structure
    const destType = transaction.destAccountType || "Tài khoản thanh toán";
    
    switch(destType) {
      case "Tài khoản thanh toán":
        return <span className="text-blue-600">Tài khoản thanh toán</span>;
      case "Phiếu gửi tiền":
        return <span className="text-green-600">Phiếu gửi tiền</span>;
      case "Tiền mặt tại quầy":
        return <span className="text-amber-600">Tiền mặt tại quầy</span>;
      case "Ngân hàng":
        return <span className="text-purple-600">Ngân hàng</span>;
      default:
        return <span className="text-gray-600">{destType}</span>;
    }
  };
  
  // Helper function to get transaction type display
  const getTransactionTypeDisplay = (transaction) => {
    // Assuming we have a transactionType field in the transaction
    // This is a placeholder - you'll need to adjust based on your actual data structure
    const txnType = transaction.transactionType || "Gửi tiền vào tài khoản thanh toán";
    
    switch(txnType) {
      case "Gửi tiền vào tài khoản thanh toán":
        return <span className="text-blue-600">Gửi tiền vào TKTT</span>;
      case "Rút tiền từ tài khoản thanh toán":
        return <span className="text-red-600">Rút tiền từ TKTT</span>;
      case "Gửi tiền vào phiếu gửi tiền":
        return <span className="text-green-600">Gửi tiền vào PGT</span>;
      case "Rút tiền từ phiếu gửi tiền":
        return <span className="text-orange-600">Rút tiền từ PGT</span>;
      case "Tất toán phiếu gửi tiền":
        return <span className="text-purple-600">Tất toán PGT</span>;
      case "Trả tiền lãi":
        return <span className="text-teal-600">Trả tiền lãi</span>;
      case "Đáo hạn phiếu gửi tiền":
        return <span className="text-indigo-600">Đáo hạn PGT</span>;
      default:
        return <span className="text-gray-600">{txnType}</span>;
    }
  };
  
  // Helper function to get channel display
  const getChannelDisplay = (transaction) => {
    // Assuming we have a channel field in the transaction
    const channel = transaction.channel || "counter";
    
    switch(channel) {
      case "counter":
        return (
          <div className="flex items-center gap-2">
            <Building size={14} className="text-purple-600" />
            <span>Giao dịch tại quầy</span>
          </div>
        );
      case "online":
        return (
          <div className="flex items-center gap-2">
            <CreditCard size={14} className="text-blue-600" />
            <span>Giao dịch trực tuyến</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2">
            <Building size={14} className="text-gray-600" />
            <span>{channel}</span>
          </div>
        );
    }
  };
  
  // Group transactions by date
  const groupTransactionsByDate = (transactions) => {
    if (!transactions || transactions.length === 0) return {};
    
    const grouped = {};
    
    transactions.forEach(transaction => {
      const date = transaction.date;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(transaction);
    });
    
    return grouped;
  };
  
  // Get grouped transactions
  const groupedTransactions = groupTransactionsByDate(filteredTransactions);
  
  // Sort dates in descending order (newest first)
  const sortedDates = Object.keys(groupedTransactions).sort((a, b) => {
    // Assuming date format is DD/MM/YYYY
    const partsA = a.split('/');
    const partsB = b.split('/');
    
    const dateA = new Date(partsA[2], partsA[1] - 1, partsA[0]);
    const dateB = new Date(partsB[2], partsB[1] - 1, partsB[0]);
    
    return dateB - dateA; // Descending order
  });
  
  return (
    <motion.div
      key="transaction-history-tab"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="space-y-6"
    >
      <div className="bg-white rounded-2xl md:border border-gray-200 shadow-sm md:p-6 space-y-6">

        {/* Enhanced Search Section */}
        <div className="relative mb-6">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-2 border border-indigo-100/50 backdrop-blur-sm">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              placeholder="Tìm kiếm giao dịch..."
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
              <span>
                Tìm thấy <strong>{filteredTransactions.length}</strong> kết quả
                cho "<em>{searchTerm}</em>"
              </span>
            </div>
          )}
        </div>

        {/* Timeline Transaction List */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-500 z-0"></div>

          {sortedDates.length > 0 ? (
            <div className="space-y-8">
              {sortedDates.map((date, dateIndex) => (
                <div key={date} className="relative z-10">
                  {/* Sticky Date marker */}
                  <div className="sticky-date-marker">
                    <div className="flex items-center mb-0">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg z-20 translate-x-1 sm:translate-x-0 sticky-date-circle ">
                        <Calendar size={20} className="text-white" />
                      </div>
                      <div className="ml-3 py-1 p-3 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-2xl bg-white/70 backdrop-blur-sm sticky-date-info">
                        <h4 className="font-semibold text-gray-800 text-base">
                          {date}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {groupedTransactions[date].length} giao dịch
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Transactions for this date */}
                  <div className="ml-6 space-y-4">
                    {groupedTransactions[date].map((transaction, txIndex) => (
                      <div key={`${date}-${txIndex}`} className="relative">
                        {/* Connection dot with time */}
                        <div className="absolute left-0 top-6 flex items-center">
                          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 transform -translate-x-1.5 z-10"></div>
                          <div className="text-[11px] text-blue-700 font-bold bg-white/0 px-2 py-0.5 rounded-3xl ml-1 transform -translate-x-16">
                            {transaction.time || "77:77"}
                          </div>
                          <div className='absolute left-0 -top-0.5'>
                          </div>
                        </div>

                        {/* Transaction card */}
                        <div className="ml-6">
                          <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 overflow-hidden">
                            {/* Collapsed view - always visible */}
                            <div
                              className="p-4 cursor-pointer"
                              onClick={() =>
                                toggleTransaction(`${date}-${txIndex}`)
                              }
                            >
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3 flex-1">
                                  {/* Transaction icon */}
                                  <div
                                    className={`h-10 w-10 rounded-xl ${
                                      transaction.type === "incoming"
                                        ? "bg-gradient-to-br from-teal-500 to-cyan-600"
                                        : "bg-gradient-to-br from-rose-500 to-pink-600"
                                    } flex items-center justify-center shadow-sm`}
                                  >
                                    {getTransactionIcon(transaction.type)}
                                  </div>

                                  <div>
                                    <h5 className="font-medium text-gray-800">
                                      {highlightText(
                                        transaction.description,
                                        searchTerm
                                      )}
                                    </h5>
                                    <p className="text-sm text-gray-500">
                                      {transaction.type === "incoming"
                                        ? "Tiền nhận"
                                        : "Tiền trả"}
                                      :{" "}
                                      <span
                                        className={`font-semibold ${
                                          transaction.type === "incoming"
                                            ? "text-teal-600"
                                            : "text-rose-600"
                                        }`}
                                      >
                                        {transaction.type === "incoming"
                                          ? "+"
                                          : "-"}
                                        {transaction.amount.toLocaleString(
                                          "vi-VN"
                                        )}{" "}
                                        đ
                                      </span>
                                    </p>
                                  </div>
                                </div>

                                {/* Expand/collapse button */}
                                <button
                                  className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                                  aria-label={
                                    expandedTransactions[`${date}-${txIndex}`]
                                      ? "Thu gọn"
                                      : "Mở rộng"
                                  }
                                >
                                  {expandedTransactions[
                                    `${date}-${txIndex}`
                                  ] ? (
                                    <ChevronUp
                                      size={18}
                                      className="text-gray-500"
                                    />
                                  ) : (
                                    <ChevronDown
                                      size={18}
                                      className="text-gray-500"
                                    />
                                  )}
                                </button>
                              </div>
                            </div>

                            {/* Expanded details */}
                            <AnimatePresence>
                              {expandedTransactions[`${date}-${txIndex}`] && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                                    <div className="space-y-4">
                                      {/* Transaction type */}
                                      <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">
                                          Loại giao dịch:
                                        </span>
                                        <div className="font-medium">
                                          {getTransactionTypeDisplay(
                                            transaction
                                          )}
                                        </div>
                                      </div>

                                      {/* Channel */}
                                      <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">
                                          Kênh giao dịch:
                                        </span>
                                        <div className="font-medium">
                                          {getChannelDisplay(transaction)}
                                        </div>
                                      </div>

                                      {/* Source account */}
                                      <div className="flex items-start justify-between text-sm">
                                        <span className="text-gray-500">
                                          Tài khoản nguồn:
                                        </span>
                                        <div className="text-right">
                                          <div className="font-medium flex items-center gap-2">
                                            {transaction.sourceAccountType !==
                                              "Ngân hàng" &&
                                            transaction.sourceAccountType !==
                                              "Tiền mặt tại quầy" &&
                                            transaction.sourceAccountId ? (
                                              <>
                                                <User
                                                  size={14}
                                                  className="text-blue-600"
                                                />
                                                <span>
                                                  {transaction.sourceAccountId}
                                                </span>
                                              </>
                                            ) : (
                                              <span className="text-gray-400">
                                                -
                                              </span>
                                            )}
                                          </div>
                                          <div className="text-xs text-gray-500 mt-1">
                                            {getSourceAccountTypeDisplay(
                                              transaction
                                            )}
                                          </div>
                                        </div>
                                      </div>

                                      {/* Destination account */}
                                      <div className="flex items-start justify-between text-sm">
                                        <span className="text-gray-500">
                                          Tài khoản đích:
                                        </span>
                                        <div className="text-right">
                                          <div className="font-medium flex items-center gap-2">
                                            {transaction.destAccountType !==
                                              "Ngân hàng" &&
                                            transaction.destAccountType !==
                                              "Tiền mặt tại quầy" &&
                                            transaction.destAccountId ? (
                                              <>
                                                <User
                                                  size={14}
                                                  className="text-blue-600"
                                                />
                                                <span>
                                                  {transaction.destAccountId}
                                                </span>
                                              </>
                                            ) : (
                                              <span className="text-gray-400">
                                                -
                                              </span>
                                            )}
                                          </div>
                                          <div className="text-xs text-gray-500 mt-1">
                                            {getDestAccountTypeDisplay(
                                              transaction
                                            )}
                                          </div>
                                        </div>
                                      </div>

                                      {/* Note/Content */}
                                      {transaction.note && (
                                        <div className="flex items-start justify-between text-sm">
                                          <span className="text-gray-500">
                                            Nội dung:
                                          </span>
                                          <span className="font-medium text-gray-700 text-right max-w-xs">
                                            {transaction.note}
                                          </span>
                                        </div>
                                      )}

                                      {/* Status */}
                                      <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">
                                          Trạng thái:
                                        </span>
                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200">
                                          <CheckCircle2
                                            size={14}
                                            className="text-emerald-500"
                                          />
                                          <span>Thành công</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              {searchTerm ? (
                <>
                  <Search size={48} className="text-gray-400 mb-4" />
                  <h4 className="text-lg font-medium text-gray-700 mb-2">
                    Không tìm thấy kết quả
                  </h4>
                  <p className="text-gray-500 max-w-md">
                    Không tìm thấy kết quả nào cho "
                    <em className="font-medium">{searchTerm}</em>"
                  </p>
                  <button
                    onClick={() => setSearchTerm("")}
                    className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-200 text-sm font-medium"
                  >
                    Xóa bộ lọc
                  </button>
                </>
              ) : (
                <>
                  <Wallet size={48} className="text-gray-400 mb-4" />
                  <h4 className="text-lg font-medium text-gray-700 mb-2">
                    Không có giao dịch nào
                  </h4>
                  <p className="text-gray-500 max-w-md">
                    Nhân viên này chưa có giao dịch nào được ghi nhận trong hệ
                    thống.
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        /* Sticky date marker styles */
        .sticky-date-marker {
          position: sticky;
          top: 20px;
          z-index: 30;
          padding: 8px 12px;
          margin: -8px -12px 0px -12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .sticky-date-marker:hover {
          transform: translateY(-2px);
        }

        .sticky-date-circle {
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .sticky-date-circle::before {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3));
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .sticky-date-marker:hover .sticky-date-circle::before {
          opacity: 1;
          animation: pulse-ring 2s infinite;
        }

        .sticky-date-info {
          transition: all 0.3s ease;
        }

        .sticky-date-marker:hover .sticky-date-info {
          transform: translateX(4px);
        }

        @keyframes pulse-ring {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }

        @keyframes pulse-border {
          0% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
          }
          70% {
            box-shadow: 0 0 0 6px rgba(59, 130, 246, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
          }
        }

        .timeline-dot {
          animation: pulse-border 2s infinite;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .sticky-date-marker {
            top: 10px;
            margin: -4px -8px 12px -8px;
            padding: 6px 8px;
          }
          
          .sticky-date-marker .h-12 {
            height: 2.5rem;
            width: 2.5rem;
          }
          
          .sticky-date-marker .h-12 svg {
            width: 16px;
            height: 16px;
          }
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Enhanced timeline line for better visual connection */
        .absolute.left-6 {
          background: linear-gradient(to bottom, 
            rgba(59, 130, 246, 0.8) 0%,
            rgba(147, 51, 234, 0.8) 50%,
            rgba(59, 130, 246, 0.8) 100%
          );
          box-shadow: 0 0 4px rgba(59, 130, 246, 0.3);
        }
      `}</style>
    </motion.div>
  );
}

export default EmployeeTransactionHistory;
