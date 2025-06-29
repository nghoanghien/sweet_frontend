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
import TransactionHistoryShimmer from '@/components/ui/custom/shimmer-types/TransactionHistoryShimmer';
import { useAllTransactionByEmployeeId } from '@/hooks/useEmployeeTransaction';
import { FaCreditCard } from 'react-icons/fa';

function EmployeeTransactionHistory({ employee }) {
  // State for expanded transaction items
  const [expandedTransactions, setExpandedTransactions] = useState({});
  // State for search functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  // Loading state - starts as true and turns off after 3 seconds
  const { 
    transactions: employeeTransactions, 
    isLoading: isLoadingTransactions, 
    error: transactionError 
  } = useAllTransactionByEmployeeId(employee?.employeeID);
  
  // Thêm console.log để kiểm tra
  console.log('EmployeeTransactionHistory - Data:', {
    employeeId: employee?.employeeID,
    employeeTransactions: employeeTransactions,
    isLoading: isLoadingTransactions,
    error: transactionError
  });

  
  // Thêm useEffect để cập nhật filteredTransactions khi employeeTransactions thay đổi
  useEffect(() => {
    setFilteredTransactions(employeeTransactions || []);
  }, [employeeTransactions]);

  // Filter transactions with animation effect
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      if (!searchTerm.trim()) {
        // Sử dụng employeeTransactions thay vì employee?.transactions
        setFilteredTransactions(employeeTransactions || []);
      } else {
        const searchTermLower = searchTerm.toLowerCase();
        // Sử dụng employeeTransactions thay vì employee?.transactions
        const filtered = (employeeTransactions || []).filter(transaction => {
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
  }, [searchTerm, employeeTransactions]);

  // Show shimmer loading state khi đang tải dữ liệu
  if (isLoadingTransactions) {
    return <TransactionHistoryShimmer dateCount={3} transactionsPerDate={2} />;
  }
  
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
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">Tài khoản thanh toán</span>;
      case "Phiếu gửi tiền":
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">Phiếu gửi tiền</span>;
      case "Tiền mặt tại quầy":
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">Tiền mặt tại quầy</span>;
      case "Ngân hàng":
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">Ngân hàng</span>;
      default:
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">{sourceType}</span>;
    }
  };
  
  // Helper function to get destination account type display
  const getDestAccountTypeDisplay = (transaction) => {
    // Assuming we have a destAccountType field in the transaction
    // This is a placeholder - you'll need to adjust based on your actual data structure
    const destType = transaction.destAccountType || "Tài khoản thanh toán";
    
    switch(destType) {
      case "Tài khoản thanh toán":
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">Tài khoản thanh toán</span>;
      case "Phiếu gửi tiền":
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">Phiếu gửi tiền</span>;
      case "Tiền mặt tại quầy":
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">Tiền mặt tại quầy</span>;
      case "Ngân hàng":
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">Ngân hàng</span>;
      default:
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">{destType}</span>;
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
  
  // Group transactions by date and sort by time within each date
  const groupTransactionsByDate = (transactions) => {
    console.log("transactions: ", transactions);
    if (!transactions || transactions.length === 0) return {};
    
    const grouped = {};
    
    transactions.forEach(transaction => {
      const date = transaction.date;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(transaction);
    });

    // Sort transactions within each date by time (newest first)
    Object.keys(grouped).forEach(date => {
      grouped[date].sort((a, b) => {
        // Assuming time format is HH:MM
        const timeA = a.time || "00:00";
        const timeB = b.time || "00:00";
        
        const [hoursA, minutesA] = timeA.split(':').map(Number);
        const [hoursB, minutesB] = timeB.split(':').map(Number);
        
        const totalMinutesA = hoursA * 60 + minutesA;
        const totalMinutesB = hoursB * 60 + minutesB;
        
        return totalMinutesB - totalMinutesA; // Descending order (newest first)
      });
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
  
  // Thêm console.log cho sortedDates
  console.log('sortedDates:', {
    originalTransactions: employeeTransactions,
    uniqueDates: [...new Set(employeeTransactions?.map((t) => t.date) || [])],
    sortedDates: sortedDates
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
      {/* Sticky Enhanced Search Section */}
      <div className="sticky top-0 z-50 bg-white rounded-2xl">
        <div className="relative">
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
            <div className="mt-3 mb-3 mr-4 text-xs text-gray-500 flex items-center gap-2 animate-fade-in">
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
              <span>
                Tìm thấy <strong>{filteredTransactions.length}</strong> kết quả
                cho "<em>{searchTerm}</em>"
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl md:border border-gray-200 shadow-sm md:p-6 space-y-6">

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
                      <div className="ml-3 py-1 p-3 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-2xl bg-white/90 backdrop-blur-sm sticky-date-info border border-white/50">
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
                          <motion.div 
                            className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                            whileHover={{ 
                              scale: 1.02,
                              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                              borderColor: "rgb(147 197 253)"
                            }}
                            transition={{ 
                              type: "spring",
                              stiffness: 400,
                              damping: 25
                            }}
                          >
                            {/* Collapsed view - always visible */}
                            <motion.div
                              className="p-4 cursor-pointer relative"
                              onClick={() =>
                                toggleTransaction(`${date}-${txIndex}`)
                              }
                              whileTap={{ scale: 0.98 }}
                              transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                              {/* Gradient overlay on hover */}
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/50 group-hover:to-purple-50/50 transition-all duration-300 rounded-2xl"></div>
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3 flex-1">
                                  {/* Transaction icon */}
                                  <motion.div
                                    className={`h-10 w-10 rounded-xl ${
                                      transaction.type === "incoming"
                                        ? "bg-gradient-to-br from-teal-500 to-cyan-600"
                                        : "bg-gradient-to-br from-rose-500 to-pink-600"
                                    } flex items-center justify-center shadow-sm relative z-10`}
                                    whileHover={{ 
                                      scale: 1.1,
                                      rotate: [0, -10, 10, 0],
                                      boxShadow: "0 8px 25px -8px rgba(0, 0, 0, 0.3)"
                                    }}
                                    transition={{ 
                                      type: "spring",
                                      stiffness: 400,
                                      damping: 15
                                    }}
                                  >
                                    <motion.div
                                      whileHover={{ scale: 1.2 }}
                                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                    >
                                      {getTransactionIcon(transaction.type)}
                                    </motion.div>
                                  </motion.div>

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
                                      <motion.span
                                        className={`font-semibold ${
                                          transaction.type === "incoming"
                                            ? "text-teal-600"
                                            : "text-rose-600"
                                        }`}
                                        whileHover={{ 
                                          scale: 1.05,
                                          textShadow: "0 0 8px rgba(0, 0, 0, 0.3)"
                                        }}
                                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                      >
                                        {transaction.type === "incoming"
                                          ? "+"
                                          : "-"}
                                        {transaction.amount.toLocaleString(
                                          "vi-VN"
                                        )}{" "}
                                        đ
                                      </motion.span>
                                    </p>
                                  </div>
                                </div>

                                {/* Expand/collapse button */}
                                <motion.button
                                  className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 relative z-10"
                                  aria-label={
                                    expandedTransactions[`${date}-${txIndex}`]
                                      ? "Thu gọn"
                                      : "Mở rộng"
                                  }
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                >
                                  <motion.div
                                    animate={{ 
                                      rotate: expandedTransactions[`${date}-${txIndex}`] ? 180 : 0 
                                    }}
                                    transition={{ 
                                      type: "spring",
                                      stiffness: 300,
                                      damping: 20
                                    }}
                                  >
                                    <ChevronDown
                                      size={18}
                                      className="text-gray-500"
                                    />
                                  </motion.div>
                                </motion.button>
                              </div>
                            </motion.div>

                            {/* Expanded details */}
                            <AnimatePresence>
                              {expandedTransactions[`${date}-${txIndex}`] && (
                                <motion.div
                                  initial={{ 
                                    height: 0, 
                                    opacity: 0,
                                    scale: 0.95
                                  }}
                                  animate={{ 
                                    height: "auto", 
                                    opacity: 1,
                                    scale: 1
                                  }}
                                  exit={{ 
                                    height: 0, 
                                    opacity: 0,
                                    scale: 0.95
                                  }}
                                  transition={{ 
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30,
                                    mass: 0.8
                                  }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                                    <motion.div 
                                      className="space-y-4"
                                      variants={{
                                        hidden: { opacity: 0 },
                                        visible: {
                                          opacity: 1,
                                          transition: {
                                            staggerChildren: 0.1,
                                            delayChildren: 0.1
                                          }
                                        }
                                      }}
                                      initial="hidden"
                                      animate="visible"
                                    >
                                      {/* Transaction type */}
                                      <motion.div 
                                        className="flex items-center justify-between text-sm"
                                        variants={{
                                          hidden: { opacity: 0, x: -20 },
                                          visible: { opacity: 1, x: 0 }
                                        }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                      >
                                        <span className="text-gray-500">
                                          Loại giao dịch:
                                        </span>
                                        <motion.div 
                                          className="font-medium"
                                          whileHover={{ scale: 1.02 }}
                                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                        >
                                          {getTransactionTypeDisplay(
                                            transaction
                                          )}
                                        </motion.div>
                                      </motion.div>

                                      {/* Channel */}
                                      <motion.div 
                                        className="flex items-center justify-between text-sm"
                                        variants={{
                                          hidden: { opacity: 0, x: 20 },
                                          visible: { opacity: 1, x: 0 }
                                        }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                      >
                                        <span className="text-gray-500">
                                          Kênh giao dịch:
                                        </span>
                                        <motion.div 
                                          className="font-medium"
                                          whileHover={{ scale: 1.02 }}
                                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                        >
                                          {getChannelDisplay(transaction)}
                                        </motion.div>
                                      </motion.div>

                                      {/* Source account */}
                                      <motion.div 
                                        className="flex items-start justify-between text-sm"
                                        variants={{
                                          hidden: { opacity: 0, y: 20 },
                                          visible: { opacity: 1, y: 0 }
                                        }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                      >
                                        <span className="text-gray-500">
                                          Tài khoản nguồn:
                                        </span>
                                        <div className="text-right space-y-2">
                                          {transaction.sourceAccountType === "Tiền mặt tại quầy" ? (
                                            <motion.div 
                                              className="font-medium"
                                              whileHover={{ scale: 1.05 }}
                                              transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                            >
                                              {getSourceAccountTypeDisplay(transaction)}
                                            </motion.div>
                                          ) : (
                                            <>
                                              <div className="font-medium flex items-center gap-2 justify-end">
                                                {transaction.sourceAccountId ? (
                                                  <>
                                                    <CreditCard
                                                      size={14}
                                                      className="text-blue-600"
                                                    />
                                                    <motion.span 
                                                      className="font-mono text-sm bg-gray-50 px-2 py-1 rounded border"
                                                      whileHover={{ 
                                                        scale: 1.05,
                                                        backgroundColor: "rgb(243 244 246)",
                                                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
                                                      }}
                                                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                                    >
                                                      {transaction.sourceAccountId}
                                                    </motion.span>
                                                  </>
                                                ) : (
                                                  <span className="text-gray-400 italic">
                                                    Không có số tài khoản
                                                  </span>
                                                )}
                                              </div>
                                              <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                              >
                                                {getSourceAccountTypeDisplay(transaction)}
                                              </motion.div>
                                            </>
                                          )}
                                        </div>
                                      </motion.div>

                                      {/* Destination account */}
                                      <motion.div 
                                        className="flex items-start justify-between text-sm"
                                        variants={{
                                          hidden: { opacity: 0, y: 20 },
                                          visible: { opacity: 1, y: 0 }
                                        }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                      >
                                        <span className="text-gray-500">
                                          Tài khoản đích:
                                        </span>
                                        <div className="text-right space-y-2">
                                          {transaction.destAccountType === "Tiền mặt tại quầy" ? (
                                            <motion.div 
                                              className="font-medium"
                                              whileHover={{ scale: 1.05 }}
                                              transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                            >
                                              {getDestAccountTypeDisplay(transaction)}
                                            </motion.div>
                                          ) : (
                                            <>
                                              <div className="font-medium flex items-center gap-2 justify-end">
                                                {transaction.destAccountId ? (
                                                  <>
                                                    <CreditCard
                                                      size={14}
                                                      className="text-blue-600"
                                                    />
                                                    <motion.span 
                                                      className="font-mono text-sm bg-gray-50 px-2 py-1 rounded border"
                                                      whileHover={{ 
                                                        scale: 1.05,
                                                        backgroundColor: "rgb(243 244 246)",
                                                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
                                                      }}
                                                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                                    >
                                                      {transaction.destAccountId}
                                                    </motion.span>
                                                  </>
                                                ) : (
                                                  <span className="text-gray-400 italic">
                                                    Không có số tài khoản
                                                  </span>
                                                )}
                                              </div>
                                              <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                              >
                                                {getDestAccountTypeDisplay(transaction)}
                                              </motion.div>
                                            </>
                                          )}
                                        </div>
                                      </motion.div>

                                      {/* Note/Content */}
                                      {transaction.note && (
                                        <motion.div 
                                          className="flex items-start justify-between text-sm"
                                          variants={{
                                            hidden: { opacity: 0, y: 20 },
                                            visible: { opacity: 1, y: 0 }
                                          }}
                                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        >
                                          <span className="text-gray-500">
                                            Nội dung:
                                          </span>
                                          <motion.span 
                                            className="font-medium text-gray-700 text-right max-w-xs"
                                            whileHover={{ 
                                              scale: 1.02,
                                              color: "rgb(55 65 81)"
                                            }}
                                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                          >
                                            {transaction.note}
                                          </motion.span>
                                        </motion.div>
                                      )}

                                      {/* Status */}
                                      <motion.div 
                                        className="flex items-center justify-between text-sm"
                                        variants={{
                                          hidden: { opacity: 0, y: 20 },
                                          visible: { opacity: 1, y: 0 }
                                        }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                      >
                                        <span className="text-gray-500">
                                          Trạng thái:
                                        </span>
                                        <motion.div 
                                          className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200"
                                          whileHover={{ 
                                            scale: 1.05,
                                            boxShadow: "0 4px 12px rgba(16, 185, 129, 0.25)",
                                            backgroundColor: "rgb(209 250 229)"
                                          }}
                                          whileTap={{ scale: 0.95 }}
                                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                        >
                                          <motion.div
                                            whileHover={{ 
                                              rotate: [0, -10, 10, 0],
                                              scale: 1.2
                                            }}
                                            transition={{ 
                                              type: "spring", 
                                              stiffness: 400, 
                                              damping: 15,
                                              duration: 0.6
                                            }}
                                          >
                                            <CheckCircle2
                                              size={14}
                                              className="text-emerald-500"
                                            />
                                          </motion.div>
                                          <motion.span
                                            whileHover={{ 
                                              fontWeight: "600",
                                              letterSpacing: "0.025em"
                                            }}
                                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                          >
                                            Thành công
                                          </motion.span>
                                        </motion.div>
                                      </motion.div>
                                    </motion.div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
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
          top: 70px; /* Adjusted to account for sticky search section */
          z-index: 40; /* Lower than search section but higher than content */
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

        /* Sticky search section styles */
        .sticky.top-0 {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Smooth transition for sticky elements */
        .sticky {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .sticky-date-marker {
            top: 100px; /* Adjusted for mobile sticky search section */
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
