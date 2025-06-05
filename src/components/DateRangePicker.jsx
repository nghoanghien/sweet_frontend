import React, { useState, useEffect, useRef } from "react";
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useMediaQuery from "../hooks/useMediaQuery";

const DateRangePicker = ({
  className = "",
  startDate = "",
  endDate = "",
  onStartDateChange,
  onEndDateChange,
  label = "",
  error = "",
  required = false,
  onBlur = () => {},
  disabled = false,
  startPlaceholder = "DD/MM/YYYY",
  endPlaceholder = "DD/MM/YYYY"
}) => {
  // Kiểm tra nếu đang ở chế độ mobile
  const { isMobile } = useMediaQuery();
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [internalStartDate, setInternalStartDate] = useState(startDate);
  const [internalEndDate, setInternalEndDate] = useState(endDate);
  const [selectedField, setSelectedField] = useState('start'); // 'start' or 'end'
  const datePickerRef = useRef(null);
  
  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedStartDay, setSelectedStartDay] = useState(null);
  const [selectedEndDay, setSelectedEndDay] = useState(null);
  const [showYearSelector, setShowYearSelector] = useState(false);
  const [showMonthSelector, setShowMonthSelector] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to beginning of the day

  // Parse value to date objects when values change externally
  useEffect(() => {
    if (startDate) {
      const parts = startDate.split('/');
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        
        setSelectedStartDay(day);
        if (selectedField === 'start') {
          setCurrentMonth(month);
          setCurrentYear(year);
        }
        setInternalStartDate(startDate);
      }
    } else {
      setSelectedStartDay(null);
      setInternalStartDate("");
    }
  }, [startDate, selectedField]);

  useEffect(() => {
    if (endDate) {
      const parts = endDate.split('/');
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        
        setSelectedEndDay(day);
        if (selectedField === 'end') {
          setCurrentMonth(month);
          setCurrentYear(year);
        }
        setInternalEndDate(endDate);
      }
    } else {
      setSelectedEndDay(null);
      setInternalEndDate("");
    }
  }, [endDate, selectedField]);

  // Handle click outside to close the date picker
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsFocused(false);
        onBlur();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onBlur]);

  // Month names
  const months = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", 
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
  ];
  
  const shortMonths = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"];
  const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  // Generate years (from current year - 100 to current year)
  const yearNow = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => yearNow - i);

  // Generate calendar days
  const generateCalendarDays = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const calendarDays = [];

    // Add empty slots for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push(i);
    }

    return calendarDays;
  };

  // Check if a day is in the selected range
  const isDayInRange = (day) => {
    if (!selectedStartDay || !selectedEndDay || !day) return false;
    
    const startDate = new Date(currentYear, currentMonth, selectedStartDay);
    const endDate = new Date(currentYear, currentMonth, selectedEndDay);
    const currentDate = new Date(currentYear, currentMonth, day);
    
    return currentDate > startDate && currentDate < endDate;
  };

  // Check if a date is in the future
  const isFutureDate = (day) => {
    if (!day) return false;
    const dateToCheck = new Date(currentYear, currentMonth, day);
    return dateToCheck > today;
  };

  // Handle month navigation
  const prevMonth = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Toggle selectors
  const toggleYearSelector = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowYearSelector(!showYearSelector);
    setShowMonthSelector(false);
  };

  const toggleMonthSelector = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMonthSelector(!showMonthSelector);
    setShowYearSelector(false);
  };

  // Handle selections
  const selectYear = (e, year) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentYear(year);
    setShowYearSelector(false);
  };

  const selectMonth = (e, monthIndex) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentMonth(monthIndex);
    setShowMonthSelector(false);
  };

  // Handle date selection
  const handleDateSelect = (e, day) => {
    e.preventDefault();
    e.stopPropagation();
    if (!day || isFutureDate(day)) return; // Prevent selecting future dates
    
    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(currentMonth + 1).padStart(2, '0');
    const formattedDate = `${formattedDay}/${formattedMonth}/${currentYear}`;
    
    if (selectedField === 'start') {
      setSelectedStartDay(day);
      setInternalStartDate(formattedDate);
      onStartDateChange(formattedDate);
      
      // If end date exists, ensure start date is not after it
      if (internalEndDate) {
        const endDateObj = new Date(
          parseInt(internalEndDate.split('/')[2]), 
          parseInt(internalEndDate.split('/')[1]) - 1, 
          parseInt(internalEndDate.split('/')[0])
        );
        const newStartDateObj = new Date(currentYear, currentMonth, day);
        
        if (newStartDateObj > endDateObj) {
          // If start date would be after end date, update end date
          setSelectedEndDay(day);
          setInternalEndDate(formattedDate);
          onEndDateChange(formattedDate);
        }
      }
      
      // Automatically switch to end date picker after selecting start date
      if (!internalEndDate) {
        setSelectedField('end');
      } else {
        setIsOpen(false);
      }
    } else {
      // Ensure end date is not before start date
      const startDateObj = internalStartDate ? new Date(
        parseInt(internalStartDate.split('/')[2]), 
        parseInt(internalStartDate.split('/')[1]) - 1, 
        parseInt(internalStartDate.split('/')[0])
      ) : null;
      
      const newEndDateObj = new Date(currentYear, currentMonth, day);
      
      if (startDateObj && newEndDateObj < startDateObj) {
        // If end date would be before start date, update start date instead
        setSelectedStartDay(day);
        setInternalStartDate(formattedDate);
        onStartDateChange(formattedDate);
      } else {
        setSelectedEndDay(day);
        setInternalEndDate(formattedDate);
        onEndDateChange(formattedDate);
        setIsOpen(false);
      }
    }
  };

  // Handle manual input change
  const handleStartDateChange = (e) => {
    const newValue = e.target.value;
    setInternalStartDate(newValue);
    
    // Try to parse the date
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = newValue.match(dateRegex);
    
    if (match) {
      const day = parseInt(match[1], 10);
      const month = parseInt(match[2], 10) - 1;
      const year = parseInt(match[3], 10);
      
      setSelectedStartDay(day);
      if (selectedField === 'start') {
        setCurrentMonth(month);
        setCurrentYear(year);
      }
      onStartDateChange(newValue);
    } else if (newValue === '') {
      setSelectedStartDay(null);
      onStartDateChange('');
    }
  };

  const handleEndDateChange = (e) => {
    const newValue = e.target.value;
    setInternalEndDate(newValue);
    
    // Try to parse the date
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = newValue.match(dateRegex);
    
    if (match) {
      const day = parseInt(match[1], 10);
      const month = parseInt(match[2], 10) - 1;
      const year = parseInt(match[3], 10);
      
      setSelectedEndDay(day);
      if (selectedField === 'end') {
        setCurrentMonth(month);
        setCurrentYear(year);
      }
      onEndDateChange(newValue);
    } else if (newValue === '') {
      setSelectedEndDay(null);
      onEndDateChange('');
    }
  };

  // Toggle the date picker
  const toggleDatePicker = (field = null) => {
    if (disabled) return;
    
    if (field) {
      setSelectedField(field);
      
      // Set calendar to the appropriate month/year based on selected field
      if (field === 'start' && internalStartDate) {
        const parts = internalStartDate.split('/');
        if (parts.length === 3) {
          setCurrentMonth(parseInt(parts[1], 10) - 1);
          setCurrentYear(parseInt(parts[2], 10));
        }
      } else if (field === 'end' && internalEndDate) {
        const parts = internalEndDate.split('/');
        if (parts.length === 3) {
          setCurrentMonth(parseInt(parts[1], 10) - 1);
          setCurrentYear(parseInt(parts[2], 10));
        }
      }
    }
    
    setIsOpen(!isOpen);
    setIsFocused(true);
  };

  return (
    <motion.div 
      layout
      transition={{ duration: 0.3, type: "spring" }}
      className={`${className} mb-3 sm:mb-2`}
    >
      <label className="block text-gray-700 font-medium mb-2 pl-4">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative" ref={datePickerRef}>
        <motion.div
          className={`relative w-full ${isOpen ? "z-40" : ""}`}
          initial={false}
          animate={{ scale: isOpen ? 1.02 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className={`flex ${isMobile ? 'flex-col' : ''} gap-2 items-center`}>
            {/* Start Date Field */}
            <div
              className={`
                flex-1 border p-3 sm:p-4 rounded-xl shadow-md
                cursor-pointer flex items-center gap-2 
                hover:shadow-lg transition-all duration-300 ease-in-out 
                ${disabled ? 'bg-gray-100 text-gray-500' : 'bg-white'}
                ${isFocused && selectedField === 'start' && !disabled ? "ring-2 ring-emerald-200 bg-emerald-50" : ""}
                ${error && error.start ? 'border-red-500 bg-red-50 focus:ring-red-200 focus:bg-red-100' : ''}
              `}
              onClick={() => toggleDatePicker('start')}
            >
              <Calendar size={18} className="text-gray-400" />
              <input
                type="text"
                className={`
                  flex-grow bg-transparent border-none focus:outline-none p-0
                  ${disabled ? 'text-gray-500' : 'text-black'}
                  ${!internalStartDate ? 'text-gray-400' : ''}
                `}
                placeholder={startPlaceholder}
                value={internalStartDate}
                onChange={handleStartDateChange}
                onFocus={() => {
                  if (!disabled) {
                    setIsFocused(true);
                    setSelectedField('start');
                  }
                }}
                onBlur={() => {
                  if (!isOpen) setIsFocused(false);
                }}
                disabled={disabled}
              />
              {!disabled && (<motion.svg
                animate={{ rotate: isOpen && selectedField === 'start' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="ml-auto w-5 h-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </motion.svg>
              )}
            </div>
            
            {!isMobile && (
              <div className="flex items-center justify-center">
                <ArrowRight size={20} className="text-gray-400" />
              </div>
            )}
            {isMobile && (
              <div className="w-full flex items-center justify-center my-1">
                <div className="w-1/3 h-px bg-gray-300"></div>
                <div className="mx-2 text-gray-400 text-xs">đến</div>
                <div className="w-1/3 h-px bg-gray-300"></div>
              </div>
            )}
            
            {/* End Date Field */}
            <div
              className={`
                flex-1 border p-3 sm:p-4 rounded-xl shadow-md
                cursor-pointer flex items-center gap-2 
                hover:shadow-lg transition-all duration-300 ease-in-out 
                ${disabled ? 'bg-gray-100 text-gray-500' : 'bg-white'}
                ${isFocused && selectedField === 'end' && !disabled ? "ring-2 ring-emerald-200 bg-emerald-50" : ""}
                ${error && error.end ? 'border-red-500 bg-red-50 focus:ring-red-200 focus:bg-red-100' : ''}
              `}
              onClick={() => toggleDatePicker('end')}
            >
              <Calendar size={18} className="text-gray-400" />
              <input
                type="text"
                className={`
                  flex-grow bg-transparent border-none focus:outline-none p-0
                  ${disabled ? 'text-gray-500' : 'text-black'}
                  ${!internalEndDate ? 'text-gray-400' : ''}
                `}
                placeholder={endPlaceholder}
                value={internalEndDate}
                onChange={handleEndDateChange}
                onFocus={() => {
                  if (!disabled) {
                    setIsFocused(true);
                    setSelectedField('end');
                  }
                }}
                onBlur={() => {
                  if (!isOpen) setIsFocused(false);
                }}
                disabled={disabled}
              />
              {!disabled && (<motion.svg
                animate={{ rotate: isOpen && selectedField === 'end' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="ml-auto w-5 h-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </motion.svg>
              )}
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {isOpen && !disabled && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-30"
                onClick={() => setIsOpen(false)}
              ></motion.div>
              
              {/* Date Picker Dropdown */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute w-full mt-2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg z-50 overflow-hidden"
              >
                <div className="p-4">
                  {/* Range Selection Header */}
                  <div className="flex justify-between items-center pb-3 mb-2 border-b border-blue-200">
                    <button
                      type="button"
                      onClick={() => setSelectedField('start')}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                        selectedField === 'start' 
                          ? 'bg-blue-500 text-white' 
                          : 'text-blue-600 hover:bg-blue-100'
                      }`}
                    >
                      {internalStartDate || 'Ngày bắt đầu'}
                    </button>
                    
                    <div className="text-blue-600">
                      <ArrowRight size={20} />
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => setSelectedField('end')}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                        selectedField === 'end' 
                          ? 'bg-blue-500 text-white' 
                          : 'text-blue-600 hover:bg-blue-100'
                      }`}
                    >
                      {internalEndDate || 'Ngày kết thúc'}
                    </button>
                  </div>
                
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={prevMonth}
                      className="p-1.5 hover:bg-blue-100 rounded-full text-blue-600 transition-colors duration-200"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="flex gap-2">
                      {/* Month Selector */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={toggleMonthSelector}
                          className="font-medium text-blue-600 flex items-center justify-center px-2 py-1 hover:bg-blue-100 rounded-full transition-colors duration-200"
                        >
                          <span>{months[currentMonth]}</span>
                          <ChevronDown 
                            className={`ml-1 w-4 h-4 transition-transform duration-200 ${showMonthSelector ? 'transform rotate-180' : ''}`} 
                          />
                        </button>

                        {/* Month selector dropdown */}
                        <AnimatePresence>
                          {showMonthSelector && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.15 }}
                              className="absolute z-10 mt-1 bg-white border-2 border-blue-200 rounded-xl shadow-lg max-h-52 overflow-auto w-36 left-1/2 transform -translate-x-1/2"
                              style=
                              {{ top: "calc(100% + 4px)",
                                 left: "calc(100% - 125px)"
                               }}
                            >
                              <div className="grid grid-cols-3 gap-1 p-2">
                                {shortMonths.map((month, index) => (
                                  <button
                                    key={month}
                                    type="button"
                                    onClick={(e) => selectMonth(e, index)}
                                    className={`p-1.5 rounded-lg text-sm transition-colors duration-150 ${
                                      index === currentMonth
                                        ? "bg-blue-500 text-white font-medium"
                                        : "text-gray-700 hover:bg-blue-100"
                                    }`}
                                  >
                                    {month}
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Year Selector */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={toggleYearSelector}
                          className="font-medium text-blue-600 flex items-center justify-center px-2 py-1 hover:bg-blue-100 rounded-full transition-colors duration-200"
                        >
                          <span>{currentYear}</span>
                          <ChevronDown 
                            className={`ml-1 w-4 h-4 transition-transform duration-200 ${showYearSelector ? 'transform rotate-180' : ''}`} 
                          />
                        </button>

                        {/* Year selector dropdown */}
                        <AnimatePresence>
                          {showYearSelector && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.15 }}
                              className="absolute z-10 mt-1 bg-white border-2 border-blue-200 rounded-xl shadow-lg max-h-52 overflow-auto w-32 left-1/2 transform -translate-x-1/2"
                              style={{ top: "calc(100% + 4px)",
                                left: "calc(100% - 105px)"
                               }}
                            >
                              {years.map((year) => (
                                <button
                                  key={year}
                                  type="button"
                                  onClick={(e) => selectYear(e, year)}
                                  className={`w-full px-3 py-1.5 text-center text-sm hover:bg-blue-100 transition-colors duration-150 ${
                                    year === currentYear
                                      ? "bg-blue-500 text-white font-medium"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {year}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={nextMonth}
                      className="p-1.5 hover:bg-blue-100 rounded-full text-blue-600 transition-colors duration-200"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Calendar Grid */}
                  <div className="p-3 rounded-lg">
                    {/* Days of week header */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {days.map((day) => (
                        <div
                          key={day}
                          className="text-center text-xs font-medium text-gray-500"
                        >
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Calendar days */}
                    <div className="grid grid-cols-7 gap-1">
                      {generateCalendarDays().map((day, index) => {
                        // Determine if this day is selected or in range
                        const isStartDay = day === selectedStartDay && 
                          currentMonth === (internalStartDate ? parseInt(internalStartDate.split('/')[1], 10) - 1 : -1) && 
                          currentYear === (internalStartDate ? parseInt(internalStartDate.split('/')[2], 10) : -1);
                        
                        const isEndDay = day === selectedEndDay && 
                          currentMonth === (internalEndDate ? parseInt(internalEndDate.split('/')[1], 10) - 1 : -1) && 
                          currentYear === (internalEndDate ? parseInt(internalEndDate.split('/')[2], 10) : -1);
                        
                        const isInRange = day && internalStartDate && internalEndDate && isDayInRange(day);
                        
                        // Check if the date is in the future
                        const isFuture = isFutureDate(day);
                        
                        return (
                          <button
                            type="button"
                            key={`day-${index}`}
                            onClick={(e) => day && !isFuture && handleDateSelect(e, day)}
                            disabled={!day || isFuture}
                            className={`
                              p-2 text-center rounded-lg text-sm font-medium
                              ${!day ? "invisible" : isFuture ? "cursor-not-allowed text-gray-300 bg-gray-50" : "cursor-pointer"}
                              ${isStartDay 
                                ? "bg-blue-500 text-white" 
                                : isEndDay 
                                  ? "bg-indigo-500 text-white"
                                  : isInRange
                                    ? "bg-blue-100 text-blue-800"
                                    : !isFuture
                                      ? "hover:bg-blue-200 text-gray-700"
                                      : ""
                              }
                            `}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p 
            key="error"
            initial={{ opacity: 0, y: -5, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -5, height: 0 }}
            transition={{ duration: 0.3 }}
            className="text-xs text-red-500 px-4 p-1 mt-1"
          >
            {typeof error === 'string' ? error : (error.start || error.end)}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DateRangePicker;