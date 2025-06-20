import React, { useState, useEffect, useRef } from "react";
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CalendarDatePicker = ({
  className = "",
  value = "",
  onChange,
  label = "",
  error = "",
  required = false,
  onBlur = () => {},
  disabled = false,
  placeholder = "DD/MM/YYYY",
  allowFutureDates = false,
  allowPastDates = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(value);
  const datePickerRef = useRef(null);
  
  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);
  const [showYearSelector, setShowYearSelector] = useState(false);
  const [showMonthSelector, setShowMonthSelector] = useState(false);

  // Create today's date for comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset hours to get accurate date comparison

  // Parse value to date object when value changes externally
  useEffect(() => {
    if (value) {
      let dateValue;
      
      // Handle Date object
      if (value instanceof Date) {
        dateValue = value;
      }
      // Handle string value
      else if (typeof value === 'string') {
        const parts = value.split('/');
        if (parts.length === 3) {
          const day = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10) - 1;
          const year = parseInt(parts[2], 10);
          dateValue = new Date(year, month, day);
        }
      }
      
      if (dateValue && !isNaN(dateValue.getTime())) {
        const day = dateValue.getDate();
        const month = dateValue.getMonth();
        const year = dateValue.getFullYear();
        
        setSelectedDay(day);
        setCurrentMonth(month);
        setCurrentYear(year);
        
        // Format to DD/MM/YYYY string for display
        const formattedDay = String(day).padStart(2, '0');
        const formattedMonth = String(month + 1).padStart(2, '0');
        const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
        setInternalValue(formattedDate);
      }
    } else {
      setSelectedDay(null);
      setInternalValue("");
    }
  }, [value]);

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

  // Check if a date is in the future
  const isFutureDate = (day) => {
    if (!day) return false;
    const dateToCheck = new Date(currentYear, currentMonth, day);
    return dateToCheck > today;
  };

  // Check if a date is in the past
  const isPastDate = (day) => {
    if (!day) return false;
    const dateToCheck = new Date(currentYear, currentMonth, day);
    return dateToCheck < today;
  };

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
    // Check if the date is in the future and if future dates are allowed
    const isInFuture = isFutureDate(day);
    const isInPast = isPastDate(day);
    if (day && (allowFutureDates || !isInFuture)
      && (allowPastDates || !isInPast)
    ) {
      setSelectedDay(day);
      const formattedDay = String(day).padStart(2, '0');
      const formattedMonth = String(currentMonth + 1).padStart(2, '0');
      const formattedDate = `${formattedDay}/${formattedMonth}/${currentYear}`;
      setInternalValue(formattedDate);
      
      // Return Date object if original value was Date object, otherwise return string
      const selectedDate = new Date(currentYear, currentMonth, day);
      if (value instanceof Date) {
        onChange(selectedDate);
      } else {
        onChange(formattedDate);
      }
      setIsOpen(false);
    }
  };

  // Handle manual input change
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    
    // Try to parse the date
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = newValue.match(dateRegex);
    
    if (match) {
      const day = parseInt(match[1], 10);
      const month = parseInt(match[2], 10) - 1;
      const year = parseInt(match[3], 10);
      
      // Check if the date is in the future and if future dates are allowed
      const selectedDate = new Date(year, month, day);
      if (!allowFutureDates && selectedDate > today) {
        // Don't update if it's a future date and future dates are not allowed
        return;
      }
      if (!allowPastDates && selectedDate < today) {
        // Don't update if it's a past date and past dates are not allowed
        return;
      }
      setSelectedDay(day);
      setCurrentMonth(month);
      setCurrentYear(year);
      
      // Return Date object if original value was Date object, otherwise return string
      if (value instanceof Date) {
        onChange(selectedDate);
      } else {
        onChange(newValue);
      }
    } else if (newValue === '') {
      setSelectedDay(null);
      onChange(value instanceof Date ? null : '');
    }
  };

  // Toggle the date picker
  const toggleDatePicker = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setIsFocused(true);
    }
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
          <div
            className={`
              w-full border p-3 sm:p-4 rounded-xl shadow-md
              cursor-pointer flex items-center gap-2 
              hover:shadow-lg transition-all duration-300 ease-in-out 
              ${disabled ? 'bg-gray-100 text-gray-500' : 'bg-white'}
              ${isFocused && !disabled ? "ring-2 ring-emerald-200 bg-emerald-50" : ""}
              ${error ? 'border-red-500 bg-red-50 focus:ring-red-200 focus:bg-red-100' : ''}
            `}
            onClick={toggleDatePicker}
          >
            <Calendar size={18} className="text-gray-400" />
            <input
              type="text"
              className={`
                flex-grow bg-transparent border-none focus:outline-none p-0
                ${disabled ? 'text-gray-500' : 'text-black'}
                ${!internalValue ? 'text-gray-400' : ''}
              `}
              placeholder={placeholder}
              value={internalValue}
              onChange={handleInputChange}
              onFocus={() => !disabled && setIsFocused(true)}
              onBlur={() => {
                if (!isOpen) setIsFocused(false);
              }}
              disabled={disabled}
            />
            {!disabled && (<motion.svg
              animate={{ rotate: isOpen ? 180 : 0 }}
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
                        const isInFuture = isFutureDate(day);
                        const isInPast = isPastDate(day);
                        return (
                          <button
                            type="button"
                            key={`day-${index}`}
                            onClick={(e) => day && (!isInFuture || allowFutureDates) && (!isInPast || allowPastDates) && handleDateSelect(e, day)}
                            disabled={!day || (isInFuture && !allowFutureDates) || (isInPast && !allowPastDates)}
                            className={`
                              p-2 text-center rounded-lg text-sm font-medium
                              ${!day ? "invisible" : ((isInFuture && !allowFutureDates) || (isInPast && !allowPastDates)) ? "cursor-not-allowed text-gray-400" : "cursor-pointer"}
                              ${
                                day === selectedDay && currentMonth === new Date(internalValue.split('/')[2] || 0, (internalValue.split('/')[1] || 0) - 1, internalValue.split('/')[0] || 0).getMonth() && currentYear === parseInt(internalValue.split('/')[2] || 0)
                                  ? "bg-blue-500 text-white"
                                  : ((isInFuture && !allowFutureDates) || (isInPast && !allowPastDates)) ? "text-gray-400" : "hover:bg-blue-200 text-gray-700"
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
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CalendarDatePicker;