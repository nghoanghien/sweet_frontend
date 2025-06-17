import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, Info, ArrowRight, Search, DollarSign, TrendingUp, ChevronDown, User } from 'lucide-react';
import RegulationTooltip from './RegulationTooltip';
import ApplicationScheduleShimmer from '@/components/ui/custom/shimmer-types/ApplicationScheduleShimmer';

const ApplicationSchedule = () => {
  // State for current date and view month/year
  const [today] = useState(new Date());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [hoveredRegulation, setHoveredRegulation] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState('month'); // 'month' or 'timeline'
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedRegulation, setHighlightedRegulation] = useState(null);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const monthDropdownRef = useRef(null);

  // Turn off loading after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  const yearDropdownRef = useRef(null);
  // Animation state for sliding calendar
  const [slideDirection, setSlideDirection] = useState(null); // 'left' | 'right' | null
  const [targetMonth, setTargetMonth] = useState(null);
  const [targetYear, setTargetYear] = useState(null);
  const animatingRef = useRef(false);

  // Color mappings for Tailwind
  const colorMappings = {
    indigo: {
      bg: 'bg-indigo-50',
      bgHighlight: 'bg-indigo-500',
      text: 'text-indigo-800',
      textHighlight: 'text-white',
      border: 'border-indigo-300',
      badge: 'bg-indigo-100 text-indigo-800',
      dot: 'bg-indigo-500',
    },
    emerald: {
      bg: 'bg-emerald-50',
      bgHighlight: 'bg-emerald-500',
      text: 'text-emerald-800',
      textHighlight: 'text-white',
      border: 'border-emerald-300',
      badge: 'bg-emerald-100 text-emerald-800',
      dot: 'bg-emerald-500',
    },
    amber: {
      bg: 'bg-amber-50',
      bgHighlight: 'bg-amber-500',
      text: 'text-amber-800',
      textHighlight: 'text-white',
      border: 'border-amber-300',
      badge: 'bg-amber-100 text-amber-800',
      dot: 'bg-amber-500',
    },
    rose: {
      bg: 'bg-rose-50',
      bgHighlight: 'bg-rose-500',
      text: 'text-rose-800',
      textHighlight: 'text-white',
      border: 'border-rose-300',
      badge: 'bg-rose-100 text-rose-800',
      dot: 'bg-rose-500',
    },
    blue: {
      bg: 'bg-blue-50',
      bgHighlight: 'bg-blue-500',
      text: 'text-blue-800',
      textHighlight: 'text-white',
      border: 'border-blue-300',
      badge: 'bg-blue-100 text-blue-800',
      dot: 'bg-blue-500',
    },
    purple: {
      bg: 'bg-purple-50',
      bgHighlight: 'bg-purple-500',
      text: 'text-purple-800',
      textHighlight: 'text-white',
      border: 'border-purple-300',
      badge: 'bg-purple-100 text-purple-800',
      dot: 'bg-purple-500',
    },
  };

  // Mock data for regulations with application dates
  // In a real app, this would come from an API or context
  const [regulations, setRegulations] = useState([
    {
      id: 'reg123',
      name: 'Quy định lãi suất cơ bản',
      applicationDate: '2023-06-16',
      color: 'indigo',
      creator: 'Trần Thị B',
      minimumDeposit: 1000000,
      noTermRate: 0.2,
      description: 'Quy định lãi suất cơ bản áp dụng cho mọi sản phẩm tiết kiệm',
    },
    {
      id: 'reg456',
      name: 'Quy định lãi suất mùa hè',
      applicationDate: '2023-07-15',
      color: 'emerald',
      creator: 'Nguyễn Văn A',
      minimumDeposit: 2000000,
      noTermRate: 0.3,
      description: 'Quy định lãi suất ưu đãi cho mùa hè với nhiều khuyến mãi đặc biệt',
    },
    {
      id: 'reg789',
      name: 'Quy định lãi suất mùa thu',
      applicationDate: '2023-09-01',
      color: 'amber',
      creator: 'Trần Thị B',
      minimumDeposit: 3000000,
      noTermRate: 0.4,
      description: 'Quy định lãi suất mới cho mùa thu với ưu đãi đặc biệt cho khách hàng VIP',
    },
    {
      id: 'reg101',
      name: 'Quy định lãi suất cuối năm',
      applicationDate: '2023-12-01',
      color: 'rose',
      creator: 'Lê Văn C',
      minimumDeposit: 3500000,
      noTermRate: 0.5,
      description: 'Quy định lãi suất đặc biệt cho dịp cuối năm và Tết Nguyên Đán',
    },
    {
      id: 'reg102',
      name: 'Quy định lãi suất đầu năm',
      applicationDate: '2024-02-10',
      color: 'blue',
      creator: 'Nguyễn Văn A',
      minimumDeposit: 2500000,
      noTermRate: 0.45,
      description: 'Quy định lãi suất mới cho đầu năm 2024',
    },
  ]);

  // Filter regulations based on search term
  const filteredRegulations = searchTerm 
    ? regulations.filter(reg => 
        reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : regulations;

  // Helper function to get month name
  const getMonthName = (month) => {
    const monthNames = [
      'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
      'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
    ];
    return monthNames[month];
  };

  // Helper to animate to a target month/year
  const animateToMonthYear = (month, year) => {
    if (viewMonth === month && viewYear === year) return;
    setTargetMonth(month);
    setTargetYear(year);
    animatingRef.current = true;
    // Determine direction
    if (year > viewYear || (year === viewYear && month > viewMonth)) {
      setSlideDirection('right');
    } else {
      setSlideDirection('left');
    }
  };

  // Effect to animate month change step by step
  useEffect(() => {
    if (targetMonth === null || targetYear === null || !animatingRef.current) return;
    if (viewMonth === targetMonth && viewYear === targetYear) {
      setSlideDirection(null);
      setTargetMonth(null);
      setTargetYear(null);
      animatingRef.current = false;
      return;
    }
    const timeout = setTimeout(() => {
      let nextMonth = viewMonth;
      let nextYear = viewYear;
      if (slideDirection === 'right') {
        if (nextMonth === 11) {
          nextMonth = 0;
          nextYear += 1;
        } else {
          nextMonth += 1;
        }
      } else if (slideDirection === 'left') {
        if (nextMonth === 0) {
          nextMonth = 11;
          nextYear -= 1;
        } else {
          nextMonth -= 1;
        }
      }
      setViewMonth(nextMonth);
      setViewYear(nextYear);
    }, 180); // Adjust speed as needed
    return () => clearTimeout(timeout);
  }, [targetMonth, targetYear, slideDirection, viewMonth, viewYear]);

  // Navigate to previous month
  const goToPreviousMonth = () => {
    let prevMonth = viewMonth === 0 ? 11 : viewMonth - 1;
    let prevYear = viewMonth === 0 ? viewYear - 1 : viewYear;
    animateToMonthYear(prevMonth, prevYear);
  };

  // Navigate to next month
  const goToNextMonth = () => {
    let nextMonth = viewMonth === 11 ? 0 : viewMonth + 1;
    let nextYear = viewMonth === 11 ? viewYear + 1 : viewYear;
    animateToMonthYear(nextMonth, nextYear);
  };

  // Return to current month
  const goToCurrentMonth = () => {
    animateToMonthYear(today.getMonth(), today.getFullYear());
  };

  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get day of week for first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Format date to YYYY-MM-DD for comparison
  const formatDateForComparison = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Format date for display
  const formatDateForDisplay = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  // Get regulation for a specific date
  const getRegulationForDate = (dateString) => {
    // Sort regulations by application date in ascending order
    const sortedRegulations = [...regulations].sort((a, b) => 
      new Date(a.applicationDate) - new Date(b.applicationDate)
    );
    
    // Find the latest regulation that applies to this date
    for (let i = sortedRegulations.length - 1; i >= 0; i--) {
      if (dateString >= sortedRegulations[i].applicationDate) {
        return sortedRegulations[i];
      }
    }
    
    // If no regulation applies, return null
    return null;
  };

  // Check if a date is the first day of a regulation's application
  const isFirstDayOfRegulation = (dateString) => {
    return regulations.some(reg => reg.applicationDate === dateString);
  };

  // Get next regulation after a given one
  const getNextRegulation = (currentReg) => {
    const sortedRegulations = [...regulations].sort((a, b) => 
      new Date(a.applicationDate) - new Date(b.applicationDate)
    );
    
    const currentIndex = sortedRegulations.findIndex(reg => reg.id === currentReg.id);
    
    if (currentIndex !== -1 && currentIndex < sortedRegulations.length - 1) {
      return sortedRegulations[currentIndex + 1];
    }
    
    return null;
  };

  // Handle mouse enter on a day with regulation
  const handleMouseEnter = (e, regulation) => {
    if (regulation) {
      setHoveredRegulation(regulation);
      setTooltipPosition({ 
        x: e.clientX, 
        y: e.clientY 
      });
    }
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setHoveredRegulation(null);
  };

  // Handle regulation click in legend
  const handleRegulationClick = (regulation) => {
    if (highlightedRegulation && highlightedRegulation.id === regulation.id) {
      setHighlightedRegulation(null);
    } else {
      setHighlightedRegulation(regulation);
      const date = new Date(regulation.applicationDate);
      animateToMonthYear(date.getMonth(), date.getFullYear());
    }
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDayOfMonth = getFirstDayOfMonth(viewYear, viewMonth);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-indigo-100 bg-white rounded-2xl"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(viewYear, viewMonth, day);
      const dateString = formatDateForComparison(date);
      const isToday = dateString === formatDateForComparison(today);
      const regulation = getRegulationForDate(dateString);
      const isFirstDay = isFirstDayOfRegulation(dateString);
      const isHighlighted = highlightedRegulation && regulation && regulation.id === highlightedRegulation.id;

      let colorSet = colorMappings.indigo;
      if (regulation) colorSet = colorMappings[regulation.color] || colorSet;

      // Hiệu ứng động cho border, shadow, scale
      let borderClass = 'border-indigo-100';
      let bgClass = 'bg-white';
      let textClass = 'text-indigo-700';
      let shadowClass = '';
      let scale = 1;
      let ringClass = '';
      let fontWeight = 'font-semibold';
      let cursor = regulation ? 'cursor-pointer' : '';
      let hoverBg = regulation ? 'hover:bg-gradient-to-br hover:from-indigo-50 hover:to-blue-50' : 'hover:bg-indigo-50';
      let zIndex = '';

      if (regulation) {
        bgClass = isFirstDay ? colorSet.bgHighlight : colorSet.bg;
        textClass = isFirstDay ? colorSet.textHighlight : colorSet.text;
        borderClass = isFirstDay ? 'border-2 border-white' : `border-2 ${colorSet.border}`;
        fontWeight = isFirstDay ? 'font-extrabold' : 'font-bold';
        if (isHighlighted) {
          scale = 1.08;
          ringClass = `ring-2 ring-offset-2 ring-offset-white ${colorSet.bgHighlight}`;
          shadowClass = 'shadow-xl';
          zIndex = 'z-20';
        } else {
          shadowClass = 'shadow-md';
        }
      }
      if (isToday) {
        ringClass += ' ring-2 ring-blue-400 ring-inset';
        shadowClass += ' animate-pulse';
        zIndex = 'z-30';
      }

      days.push(
        <motion.div
          key={day}
          whileHover={regulation ? { scale: 1.04, boxShadow: '0 0 16px #6366f1' } : { scale: 1.01 }}
          whileTap={regulation ? { scale: 0.98 } : {}}
          animate={{ scale }}
          className={`h-24 border ${borderClass} ${bgClass} ${textClass} ${shadowClass} ${ringClass} ${fontWeight} ${hoverBg} ${cursor} ${zIndex} p-2 transition-all duration-200 rounded-2xl relative select-none`}
          onMouseEnter={(e) => handleMouseEnter(e, regulation)}
          onMouseLeave={handleMouseLeave}
          onClick={() => regulation && handleRegulationClick(regulation)}
        >
          <div className="flex justify-between items-start">
            <span className={`text-lg ${isToday ? 'font-extrabold text-blue-600 drop-shadow' : ''} ${fontWeight}`}>{day}</span>
            {isFirstDay && regulation && (
              <motion.span
                className="text-xs px-2 py-0.5 rounded-full bg-white/40 text-white font-bold shadow animate-fadeIn"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 1.8, repeatType: 'loop' }}
              >
                Mới
              </motion.span>
            )}
          </div>
          {regulation && (
            <div className="mt-1 space-y-0.5">
              <div className={`text-xs font-bold ${textClass} truncate`}>{regulation.name}</div>
              <div className={`text-xs ${textClass} opacity-80`}>#{regulation.id.substring(3)}</div>
            </div>
          )}
          {isToday && (
            <motion.div className="absolute bottom-2 right-2">
              <motion.span
                className="w-3 h-3 bg-blue-500 rounded-full inline-block shadow-lg"
                animate={{ scale: [1, 1.3, 1], boxShadow: [
                  '0 0 0 0 #3b82f6',
                  '0 0 0 8px #3b82f633',
                  '0 0 0 0 #3b82f6'
                ] }}
                transition={{ repeat: Infinity, duration: 1.8, repeatType: 'loop' }}
              />
            </motion.div>
          )}
        </motion.div>
      );
    }

    return days;
  };

  // Generate timeline view
  const generateTimelineView = () => {
    // Sort regulations by application date in descending order (newest first)
    const sortedRegulations = [...regulations].sort((a, b) => 
      new Date(b.applicationDate) - new Date(a.applicationDate)
    );
    const todayString = formatDateForComparison(today);
    const currentRegulation = getRegulationForDate(todayString);
    return (
      <div className="relative pb-6">
        {/* Timeline line */}
        <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-indigo-100"></div>
        <div className="space-y-8">
          {sortedRegulations.map((reg, index) => {
            const colorSet = colorMappings[reg.color] || colorMappings.indigo;
            const isCurrentRegulation = currentRegulation && reg.id === currentRegulation.id;
            const isHighlighted = highlightedRegulation && reg.id === highlightedRegulation.id;
            let borderClass = 'border-indigo-100';
            if (isHighlighted) {
              if (reg.color === 'indigo') borderClass = 'border-indigo-500 shadow-xl';
              else if (reg.color === 'emerald') borderClass = 'border-emerald-500 shadow-xl';
              else if (reg.color === 'amber') borderClass = 'border-amber-500 shadow-xl';
              else if (reg.color === 'rose') borderClass = 'border-rose-500 shadow-xl';
              else if (reg.color === 'blue') borderClass = 'border-blue-500 shadow-xl';
              else if (reg.color === 'purple') borderClass = 'border-purple-500 shadow-xl';
            }
            const [year, month, day] = reg.applicationDate.split('-');
            const shortDate = `${day}/${month}`;
            return (
              <motion.div key={reg.id} className="relative pl-10" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06, duration: 0.5 }}>
                {/* Timeline dot */}
                <motion.div
                  className={`absolute left-0 top-4 h-12 w-12 rounded-full border-4 border-white shadow-lg z-10 flex flex-col items-center justify-center ${colorSet.bgHighlight}`}
                  animate={{ scale: isCurrentRegulation ? [1, 1.13, 1] : 1, boxShadow: isCurrentRegulation ? [
                    '0 0 0 0 #6366f1',
                    '0 0 0 12px #6366f122',
                    '0 0 0 0 #6366f1'
                  ] : undefined }}
                  transition={{ repeat: isCurrentRegulation ? Infinity : 0, duration: 2.2, repeatType: 'loop' }}
                >
                  {isCurrentRegulation && (
                    <span className="animate-pulse absolute inline-flex h-full w-full rounded-full opacity-60 bg-white"></span>
                  )}
                  <span className="text-lg font-extrabold text-white leading-none drop-shadow">{shortDate}</span>
                  <span className="text-xs text-white/80 leading-none mt-0.5">{year}</span>
                </motion.div>
                {/* Regulation card */}
                <motion.div
                  whileHover={{ scale: 1.03, boxShadow: '0 0 32px #6366f1' }}
                  whileTap={{ scale: 0.98 }}
                  animate={isHighlighted ? { scale: 1.06 } : { scale: 1 }}
                  className={`relative p-6 rounded-2xl transition-all duration-200 ml-4 bg-white ${borderClass} border-2 shadow-lg ${isCurrentRegulation ? 'border-indigo-500' : ''} cursor-pointer select-none`}
                  onClick={() => handleRegulationClick(reg)}
                >
                  {isCurrentRegulation && (
                    <div className="absolute -top-3 -left-3 px-3 py-1 bg-indigo-600 text-white text-xs rounded-full shadow font-bold animate-fadeIn">Hiện hành</div>
                  )}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <h3 className={`text-xl font-extrabold ${colorSet.text}`}>{reg.name}</h3>
                      <span className="text-xs text-indigo-400 font-bold">#{reg.id.substring(3)}</span>
                    </div>
                    <span className="text-base font-semibold text-gray-600 bg-white/70 px-3 py-1 rounded-xl border border-indigo-100 shadow-sm">
                      {formatDateForDisplay(reg.applicationDate)}
                    </span>
                  </div>
                  <div className="mt-2 text-base text-gray-600 font-medium italic">{reg.description}</div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-1">
                        <DollarSign size={18} className="text-gray-600" />
                        <span className="text-base text-gray-600 font-bold">
                          {new Intl.NumberFormat('vi-VN').format(reg.minimumDeposit)} VND
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp size={18} className="text-gray-600" />
                        <span className="text-base text-gray-600 font-bold">{reg.noTermRate}%</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-base text-blue-700 font-semibold">
                      <User size={18} className="text-blue-400" />
                      <span>{reg.creator}</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (monthDropdownRef.current && !monthDropdownRef.current.contains(event.target)) {
        setShowMonthDropdown(false);
      }
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target)) {
        setShowYearDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Function to get regulations active in the current view month
  const getRegulationsForCurrentMonth = () => {
    const firstDayOfMonth = new Date(viewYear, viewMonth, 1);
    const lastDayOfMonth = new Date(viewYear, viewMonth + 1, 0);
    
    const firstDayString = formatDateForComparison(firstDayOfMonth);
    const lastDayString = formatDateForComparison(lastDayOfMonth);
    
    // Get regulations that start in this month
    const regulationsStartingThisMonth = regulations.filter(reg => {
      const regDate = reg.applicationDate;
      return regDate >= firstDayString && regDate <= lastDayString;
    });
    
    // Get regulations that are active during this month
    const activeRegulations = regulations.filter(reg => {
      const regDate = new Date(reg.applicationDate);
      
      // If regulation starts before or during this month
      if (regDate <= lastDayOfMonth) {
        // Find the next regulation after this one
        const nextReg = getNextRegulation(reg);
        
        // If there's no next regulation or it starts after this month, this regulation is active
        if (!nextReg || new Date(nextReg.applicationDate) > firstDayOfMonth) {
          return true;
        }
      }
      
      return false;
    });
    
    // Combine and deduplicate
    const combinedRegulations = [...new Map(
      [...regulationsStartingThisMonth, ...activeRegulations].map(reg => [reg.id, reg])
    ).values()];
    
    // Assign random colors if not already assigned
    return combinedRegulations.map(reg => {
      if (!reg.color) {
        const availableColors = ['indigo', 'emerald', 'amber', 'rose', 'blue', 'purple'];
        const usedColors = combinedRegulations
          .filter(r => r.color)
          .map(r => r.color);
        
        const availableColorsLeft = availableColors.filter(color => !usedColors.includes(color));
        reg.color = availableColorsLeft.length > 0 
          ? availableColorsLeft[0] 
          : availableColors[Math.floor(Math.random() * availableColors.length)];
      }
      return reg;
    });
  };
  
  // Get regulations for the current month
  const currentMonthRegulations = getRegulationsForCurrentMonth();
  
  // Filter regulations based on search term
  const searchResults = searchTerm 
    ? regulations.filter(reg => 
        reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  if (isLoading) {
    return <ApplicationScheduleShimmer />;
  }

  return (
    <div className="space-y-6">
      {/* Header with navigation and view toggle */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4"
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="flex items-center space-x-2">
          {viewMode === 'month' ? (
            <div className="flex items-center">
              <motion.button
                whileHover={{ scale: 1.13, backgroundColor: '#e0e7ff' }}
                whileTap={{ scale: 0.95 }}
                onClick={goToPreviousMonth}
                className="p-2 rounded-full bg-gradient-to-br from-indigo-100 via-blue-100 to-white shadow hover:bg-indigo-200 transition-all mr-1 border border-indigo-100"
              >
                <ChevronLeft size={20} className="text-indigo-500" />
              </motion.button>
              <div className="flex items-center space-x-1 relative">
                {/* Month dropdown */}
                <div className="relative" ref={monthDropdownRef}>
                  <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowMonthDropdown(!showMonthDropdown)}
                    className="flex items-center text-2xl font-extrabold text-indigo-500 hover:text-indigo-500 transition-colors px-2 py-1 rounded-xl bg-white/70"
                  >
                    {getMonthName(viewMonth)}
                    <ChevronDown size={18} className="ml-1 text-indigo-400" />
                  </motion.button>
                  {showMonthDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-0 mt-1 bg-white shadow-xl rounded-xl border border-indigo-100 py-1 z-20 w-44 animate-fadeIn"
                    >
                      {Array.from({ length: 12 }, (_, i) => (
                        <button
                          key={i}
                          onClick={() => { animateToMonthYear(i, viewYear); setShowMonthDropdown(false); }}
                          className={`w-full text-left px-4 py-2 text-base rounded-lg transition-all ${
                            i === viewMonth ? 'bg-indigo-50 text-indigo-600 font-bold' : 'hover:bg-indigo-50 text-gray-600'
                          }`}
                        >
                          {getMonthName(i)}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
                {/* Year dropdown */}
                <div className="relative" ref={yearDropdownRef}>
                  <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowYearDropdown(!showYearDropdown)}
                    className="flex items-center text-2xl font-extrabold text-indigo-500 hover:text-indigo-500 transition-colors px-2 py-1 rounded-xl bg-white/70"
                  >
                    {viewYear}
                    <ChevronDown size={18} className="ml-1 text-indigo-400" />
                  </motion.button>
                  {showYearDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-0 mt-1 bg-white shadow-xl rounded-xl border border-indigo-100 py-1 z-20 w-28 max-h-60 overflow-y-auto animate-fadeIn"
                    >
                      {Array.from({ length: 10 }, (_, i) => (
                        <button
                          key={i}
                          onClick={() => { animateToMonthYear(viewMonth, today.getFullYear() - 5 + i); setShowYearDropdown(false); }}
                          className={`w-full text-left px-4 py-2 text-base rounded-lg transition-all ${
                            today.getFullYear() - 5 + i === viewYear ? 'bg-indigo-50 text-indigo-600 font-bold' : 'hover:bg-indigo-50 text-gray-600'
                          }`}
                        >
                          {today.getFullYear() - 5 + i}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.13, backgroundColor: '#e0e7ff' }}
                whileTap={{ scale: 0.95 }}
                onClick={goToNextMonth}
                className="p-2 rounded-full bg-gradient-to-br from-indigo-100 via-blue-100 to-white shadow hover:bg-indigo-200 transition-all ml-1 border border-indigo-100"
              >
                <ChevronRight size={20} className="text-indigo-500" />
              </motion.button>
            </div>
          ) : (
            <h2 className="text-2xl font-bold text-blue-600 tracking-tight drop-shadow-sm">
              Dòng thời gian quy định
            </h2>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {/* Search input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm quy định..."
              className="pl-10 pr-3 py-2 text-base border-2 border-indigo-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 bg-white/80 shadow-inner text-indigo-700 placeholder-indigo-300 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300" />
          </div>
          {/* View toggle */}
          <div className="flex rounded-xl shadow border border-indigo-100 bg-white/80">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setViewMode('month')}
              className={`px-4 py-2 text-base rounded-l-xl font-semibold transition-all duration-200 ${
                viewMode === 'month'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow'
                  : 'bg-white text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              Tháng
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setViewMode('timeline')}
              className={`px-4 py-2 text-base rounded-r-xl font-semibold transition-all duration-200 ${
                viewMode === 'timeline'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow'
                  : 'bg-white text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              Dòng thời gian
            </motion.button>
          </div>
          {viewMode === 'month' && (
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.97 }}
              onClick={goToCurrentMonth}
              className="px-4 py-2 text-base bg-gradient-to-r from-indigo-100 via-blue-100 to-white text-indigo-700 rounded-xl border border-indigo-100 shadow hover:bg-indigo-50 font-semibold transition-all"
            >
              Hôm nay
            </motion.button>
          )}
        </div>
      </motion.div>
      
      {/* Legend for current month */}
      {viewMode === 'month' && currentMonthRegulations.length > 0 && (
        <motion.div
          className="flex flex-wrap gap-3 items-center mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-base text-gray-600 font-semibold mr-2">Quy định trong tháng:</span>
          {currentMonthRegulations.map((reg) => {
            const colorSet = colorMappings[reg.color] || colorMappings.indigo;
            const isHighlighted = highlightedRegulation && reg.id === highlightedRegulation.id;
            let borderHighlightClass = 'border-indigo-100';
            if (isHighlighted) {
              if (reg.color === 'indigo') borderHighlightClass = 'border-indigo-500 shadow-lg';
              else if (reg.color === 'emerald') borderHighlightClass = 'border-emerald-500 shadow-lg';
              else if (reg.color === 'amber') borderHighlightClass = 'border-amber-500 shadow-lg';
              else if (reg.color === 'rose') borderHighlightClass = 'border-rose-500 shadow-lg';
              else if (reg.color === 'blue') borderHighlightClass = 'border-blue-500 shadow-lg';
              else if (reg.color === 'purple') borderHighlightClass = 'border-purple-500 shadow-lg';
            }
            return (
              <motion.div
                key={reg.id}
                whileHover={{ scale: 1.07, boxShadow: '0 0 16px rgba(99,102,241,0.13)' }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center space-x-2 px-3 py-2 rounded-xl bg-white border-2 ${borderHighlightClass} transition-all duration-200 cursor-pointer select-none group shadow-sm`}
                onClick={() => handleRegulationClick(reg)}
                animate={isHighlighted ? { scale: 1.08 } : { scale: 1 }}
              >
                <motion.span
                  className={`w-4 h-4 rounded-full border-2 border-white shadow ${colorSet.bgHighlight}`}
                  animate={{ scale: [1, 1.18, 1], boxShadow: [
                    '0 0 0 0 rgba(99,102,241,0.18)',
                    '0 0 0 8px rgba(99,102,241,0.10)',
                    '0 0 0 0 rgba(99,102,241,0.18)'] }}
                  transition={{ repeat: Infinity, duration: 2.2, repeatType: 'loop' }}
                />
                <span className="text-base font-bold text-gray-600 group-hover:text-indigo-900 transition-all">{reg.name}</span>
                <span className="text-xs text-indigo-400 font-semibold">#{reg.id.substring(3)}</span>
              </motion.div>
            );
          })}
        </motion.div>
      )}
      
      {/* Search results */}
      {searchTerm && searchResults.length > 0 && (
        <motion.div
          className="bg-white rounded-2xl p-5 border-2 border-indigo-100 shadow-lg mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-base font-bold text-gray-600 mb-3">Kết quả tìm kiếm:</h3>
          <div className="flex flex-wrap gap-3">
            {searchResults.map((reg) => {
              const colorSet = colorMappings[reg.color] || colorMappings.indigo;
              const isHighlighted = highlightedRegulation && reg.id === highlightedRegulation.id;
              let borderHighlightClass = 'border-indigo-100';
              if (isHighlighted) {
                if (reg.color === 'indigo') borderHighlightClass = 'border-indigo-500 shadow-lg';
                else if (reg.color === 'emerald') borderHighlightClass = 'border-emerald-500 shadow-lg';
                else if (reg.color === 'amber') borderHighlightClass = 'border-amber-500 shadow-lg';
                else if (reg.color === 'rose') borderHighlightClass = 'border-rose-500 shadow-lg';
                else if (reg.color === 'blue') borderHighlightClass = 'border-blue-500 shadow-lg';
                else if (reg.color === 'purple') borderHighlightClass = 'border-purple-500 shadow-lg';
              }
              return (
                <motion.div
                  key={reg.id}
                  whileHover={{ scale: 1.07, boxShadow: '0 0 16px #6366f1' }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border-2 ${borderHighlightClass} transition-all duration-200 cursor-pointer select-none group shadow-sm`}
                  onClick={() => handleRegulationClick(reg)}
                  animate={isHighlighted ? { scale: 1.08 } : { scale: 1 }}
                >
                  <motion.span
                    className={`w-4 h-4 rounded-full border-2 border-white shadow ${colorSet.bgHighlight}`}
                    animate={{ scale: [1, 1.18, 1], boxShadow: [
                      '0 0 0 0 rgba(99,102,241,0.18)',
                      '0 0 0 8px rgba(99,102,241,0.10)',
                      '0 0 0 0 rgba(99,102,241,0.18)'] }}
                    transition={{ repeat: Infinity, duration: 2.2, repeatType: 'loop' }}
                  />
                  <span className="text-base font-bold text-gray-600 group-hover:text-indigo-900 transition-all">{reg.name}</span>
                  <span className="text-xs text-indigo-400 font-semibold">#{reg.id.substring(3)}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
      
      {searchTerm && searchResults.length === 0 && (
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <p className="text-sm text-gray-500">Không tìm thấy quy định nào phù hợp.</p>
        </div>
      )}
      
      {/* Calendar or Timeline view */}
      {viewMode === 'month' ? (
        <>
          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-px">
            {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day, index) => (
              <div 
                key={day} 
                className="py-3 text-center font-extrabold text-gray-600 bg-gradient-to-br from-indigo-50 via-blue-50 to-white text-lg tracking-wide rounded-2xl shadow-sm select-none border border-indigo-100"
              >
                {day}
              </div>
            ))}
          </div>
          {/* Calendar grid */}
          <motion.div
            key={viewMonth + '-' + viewYear}
            initial={{ x: slideDirection === 'left' ? -60 : slideDirection === 'right' ? 60 : 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: slideDirection === 'left' ? 60 : slideDirection === 'right' ? -60 : 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="grid grid-cols-7 gap-px bg-indigo-100 rounded-2xl shadow-[0_2px_16px_rgba(99,102,241,0.08)] border border-indigo-100"
          >
            {generateCalendarDays()}
          </motion.div>
        </>
      ) : (
        <motion.div
          className="bg-gradient-to-br from-indigo-50 via-blue-50 to-white rounded-2xl p-8 shadow-[0_8px_40px_rgba(79,70,229,0.10)] border-2 border-indigo-100"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {generateTimelineView()}
        </motion.div>
      )}
      
      {/* Tooltip */}
      <AnimatePresence>
        {hoveredRegulation && (
          <RegulationTooltip 
            regulation={hoveredRegulation}
            position={tooltipPosition}
            colorMappings={colorMappings}
            regulations={regulations}
            getNextRegulation={getNextRegulation}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ApplicationSchedule;
