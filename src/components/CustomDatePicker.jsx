import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const CustomDatePicker = ({ 
  value, 
  onChange, 
  min, 
  disabled = false,
  required = false, 
  className = "",
  isEditing = true
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const [showAbove, setShowAbove] = useState(false);
  const [showYearSelector, setShowYearSelector] = useState(false);
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  
  const buttonRef = useRef(null);
  const pickerRef = useRef(null);
  const yearSelectorRef = useRef(null);
  const monthSelectorRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const parseInitialDate = () => {
    try {
      return value ? new Date(value) : new Date();
    } catch (e) {
      return new Date();
    }
  };

  const [selectedDate, setSelectedDate] = useState(parseInitialDate());
  const [currentMonth, setCurrentMonth] = useState(parseInitialDate().getMonth());
  const [currentYear, setCurrentYear] = useState(parseInitialDate().getFullYear());

  const months = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
  const shortMonths = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"];
  const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  // Generate list of years (from current year - 100 to current year)
  const currentYearInJs = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYearInJs - 99 + i);

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setSelectedDate(date);
      setCurrentMonth(date.getMonth());
      setCurrentYear(date.getFullYear());
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showPicker && 
          buttonRef.current && 
          pickerRef.current && 
          !buttonRef.current.contains(event.target) && 
          !pickerRef.current.contains(event.target)) {
        handleClose();
      }
      
      // Handle year selector clicks
      if (showYearSelector && 
          yearSelectorRef.current && 
          !yearSelectorRef.current.contains(event.target)) {
        setShowYearSelector(false);
      }
      
      // Handle month selector clicks
      if (showMonthSelector && 
          monthSelectorRef.current && 
          !monthSelectorRef.current.contains(event.target)) {
        setShowMonthSelector(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showPicker, showYearSelector, showMonthSelector]);

  const updatePosition = () => {
    if (!buttonRef.current) return;
  
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const pickerHeight = 300;
    const windowHeight = window.innerHeight;
    const spaceBelow = windowHeight - buttonRect.bottom;
    const shouldShowAbove = spaceBelow < pickerHeight && buttonRect.top > pickerHeight;
  
    setShowAbove(shouldShowAbove);
    setPosition({
      top: shouldShowAbove ? buttonRect.top - pickerHeight - 10 : buttonRect.bottom + 5,
      left: buttonRect.left,
    });
    setButtonPosition({
      top: buttonRect.top,
      left: buttonRect.left,
      width: buttonRect.width,
      height: buttonRect.height,
    });
  };
  
  const [positionReady, setPositionReady] = useState(false);

  const handleOpen = () => {
    if (disabled || !isEditing) return;
    updatePosition();
    setPositionReady(true);
    setShowPicker(true);
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 0);
  };

  const handleClose = () => {
    setIsAnimating(true);
    setShowYearSelector(false);
    setShowMonthSelector(false);
    setTimeout(() => {
      setShowPicker(false);
      setIsAnimating(false);
    }, 150);
  };

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

  const generateCalendarDays = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const nextMonth = (e) => {
    e.preventDefault();
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const prevMonth = (e) => {
    e.preventDefault();
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleDateSelect = (e, day) => {
    e.preventDefault();
    if (day) {
      const newDate = new Date(currentYear, currentMonth, day);
      setSelectedDate(newDate);
      // Convert to ISO string and remove the time part
      const isoString = newDate.toISOString().split('T')[0];
      onChange(isoString);
      handleClose();
    }
  };

  const formatDisplayDate = (date) => {
    // Format as YYYY-MM-DD
    return date.toISOString().split('T')[0];
  };

  const isDateDisabled = (date) => {
    if (!min) return false;
    const minDate = new Date(min);
    return date < minDate;
  };

  const PortalButton = () => (
    <button
        type="button"
        ref={buttonRef}
        onClick={handleOpen}
        disabled={disabled || !isEditing}
        style={{
          position: 'fixed',
          top: `${buttonPosition.top}px`,
          left: `${buttonPosition.left}px`,
          width: `${buttonPosition.width}px`,
          height: `${buttonPosition.height}px`,
          zIndex: 9999,
        }}
        className={`w-full px-4 py-3 z-50 bg-white border-2 rounded-xl shadow-sm transition-all duration-300 text-left ${className}`}
      >
        <span className="flex items-center gap-2">
          <Calendar className="text-[#F06292] h-5 w-5" />
          <span className="text-[#424242]">{formatDisplayDate(selectedDate)}</span>
        </span>
      </button>
  );

  return (
    <>
      <button
        type="button"
        ref={buttonRef}
        onClick={handleOpen}
        disabled={disabled || !isEditing}
        className={`w-full px-4 py-3 z-50 bg-white border-2 rounded-xl shadow-sm transition-all duration-300 text-left ${className}`}
      >
        <span className="flex items-center gap-2">
          <Calendar className="text-[#F06292] h-5 w-5" />
          <span className="text-[#424242]">{formatDisplayDate(selectedDate)}</span>
        </span>
      </button>

      <AnimatePresence>
        {showPicker && positionReady && (
          <>
            {/* Overlay with blur effect */}
            {createPortal(
              <motion.div
                onClick={handleClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"
              />,
              document.body
            )}
            {createPortal(<PortalButton />, document.body)}

            {createPortal(
              <motion.div
                ref={pickerRef}
                initial={{ opacity: 0, scale: 0.95, y: showAbove ? 10 : -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: showAbove ? 10 : -10 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: "fixed",
                  top: `${position.top}px`,
                  left: `${position.left}px`,
                  width: `${buttonPosition.width}px`,
                  zIndex: 50,
                }}
                className="overflow-visible"
              >
                <div className="bg-white rounded-xl shadow-xl border-2 border-[#FFD6E0] p-3 animate-fadeIn">
                  <div className="bg-[#FFF5F8] p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-3 relative">
                      <button
                        type="button"
                        onClick={prevMonth}
                        className="p-1.5 hover:bg-[#FFE6EE] rounded-full text-[#F06292] transition-colors duration-200"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      <div className="flex gap-1">
                        {/* Month Selector */}
                        <div className="relative">
                          <button
                            type="button"
                            onClick={toggleMonthSelector}
                            className="font-medium text-[#F06292] flex items-center justify-center px-2 py-1 hover:bg-[#FFE6EE] rounded-full transition-colors duration-200"
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
                                ref={monthSelectorRef}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.15 }}
                                className="absolute z-10 mt-1 bg-white border-2 border-[#FFD6E0] rounded-xl shadow-lg max-h-52 overflow-auto styled-scrollbar w-32 left-1/2 transform -translate-x-1/2"
                                style={{ top: "calc(100% + 4px)" }}
                              >
                                <div className="grid grid-cols-3 gap-1 p-2">
                                  {shortMonths.map((month, index) => (
                                    <button
                                      key={month}
                                      type="button"
                                      onClick={(e) => selectMonth(e, index)}
                                      className={`p-1.5 rounded-lg text-sm transition-colors duration-150 ${
                                        index === currentMonth
                                          ? "bg-[#FFB2CF] text-white font-medium"
                                          : "text-[#424242] hover:bg-[#FFE6EE]"
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
                            className="font-medium text-[#F06292] flex items-center justify-center px-2 py-1 hover:bg-[#FFE6EE] rounded-full transition-colors duration-200"
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
                                ref={yearSelectorRef}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.15 }}
                                className="absolute z-10 mt-1 bg-white border-2 border-[#FFD6E0] rounded-xl shadow-lg max-h-52 overflow-auto styled-scrollbar w-32 left-1/2 transform -translate-x-1/2"
                                style={{ top: "calc(100% + 4px)" }}
                              >
                                {years.map((year) => (
                                  <button
                                    key={year}
                                    type="button"
                                    onClick={(e) => selectYear(e, year)}
                                    className={`w-full px-3 py-1.5 text-center text-sm hover:bg-[#FFE6EE] transition-colors duration-150 ${
                                      year === currentYear
                                        ? "bg-[#FFB2CF] text-white font-medium"
                                        : "text-[#424242]"
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
                        className="p-1.5 hover:bg-[#FFE6EE] rounded-full text-[#F06292] transition-colors duration-200"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1.5 mb-2">
                      {days.map((day) => (
                        <div
                          key={day}
                          className="text-center text-xs font-medium text-gray-500"
                        >
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1.5">
                      {generateCalendarDays().map((day, index) => {
                        const currentDate = day
                          ? new Date(currentYear, currentMonth, day)
                          : null;
                        const isDisabled = currentDate
                          ? isDateDisabled(currentDate)
                          : true;

                        return (
                          <button
                            type="button"
                            key={index}
                            onClick={(e) =>
                              !isDisabled && handleDateSelect(e, day)
                            }
                            className={`
                              p-1.5 rounded-lg text-sm font-medium transition-all duration-200
                              ${
                                !day
                                  ? "invisible"
                                  : isDisabled
                                  ? "text-gray-300 cursor-not-allowed"
                                  : "hover:bg-[#FFB2CF] hover:text-white"
                              }
                              ${
                                day === selectedDate.getDate() &&
                                currentMonth === selectedDate.getMonth() &&
                                currentYear === selectedDate.getFullYear()
                                  ? "bg-[#FF89B0] text-white"
                                  : "text-[#424242]"
                              }
                            `}
                            disabled={isDisabled}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>,
              document.body
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomDatePicker;