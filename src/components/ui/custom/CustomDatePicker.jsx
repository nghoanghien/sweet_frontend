import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';

const CustomDatePicker = ({
  className = "",
  value = "",
  onChange,
  label = "",
  error = "",
  required = false,
  onBlur = () => {},
  disabled = false,
  placeholder = "DD/MM/YYYY"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [internalValue, setInternalValue] = useState(value);
  const datePickerRef = useRef(null);

  // Parse value to day, month, year when value changes externally
  useEffect(() => {
    if (value) {
      const parts = value.split('/');
      if (parts.length === 3) {
        setDay(parts[0]);
        setMonth(parts[1]);
        setYear(parts[2]);
        setInternalValue(value);
      }
    } else {
      setDay("");
      setMonth("");
      setYear("");
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

  // Generate arrays for days, months, and years
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  
  // Generate years from current year - 100 to current year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => String(currentYear - i));

  // Handle date selection
  const handleDateSelection = (type, value) => {
    let newDay = day;
    let newMonth = month;
    let newYear = year;

    if (type === 'day') newDay = value;
    if (type === 'month') newMonth = value;
    if (type === 'year') newYear = value;

    // Only update if all three values are set
    if (newDay && newMonth && newYear) {
      const formattedDate = `${newDay}/${newMonth}/${newYear}`;
      setInternalValue(formattedDate);
      onChange(formattedDate);
    }

    // Update individual state values
    if (type === 'day') setDay(value);
    if (type === 'month') setMonth(value);
    if (type === 'year') setYear(value);
  };

  // Handle manual input change
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    
    // Try to parse the date
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = newValue.match(dateRegex);
    
    if (match) {
      setDay(match[1]);
      setMonth(match[2]);
      setYear(match[3]);
      onChange(newValue);
    } else if (newValue === '') {
      setDay('');
      setMonth('');
      setYear('');
      onChange('');
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
                <div className="p-4 grid grid-cols-3 gap-4">
                  {/* Day Column */}
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2 text-center">Ngày</div>
                    <div className="max-h-48 overflow-y-auto pr-2" style={{ scrollbarWidth: "thin" }}>
                      {days.map((d) => (
                        <motion.div
                          key={`day-${d}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                          className={`p-2 text-center cursor-pointer rounded-lg mb-1 ${
                            day === d ? "bg-blue-100 text-blue-800" : "hover:bg-gray-100"
                          }`}
                          onClick={() => handleDateSelection('day', d)}
                        >
                          {d}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Month Column */}
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2 text-center">Tháng</div>
                    <div className="max-h-48 overflow-y-auto pr-2" style={{ scrollbarWidth: "thin" }}>
                      {months.map((m) => (
                        <motion.div
                          key={`month-${m}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                          className={`p-2 text-center cursor-pointer rounded-lg mb-1 ${
                            month === m ? "bg-blue-100 text-blue-800" : "hover:bg-gray-100"
                          }`}
                          onClick={() => handleDateSelection('month', m)}
                        >
                          {m}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Year Column */}
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2 text-center">Năm</div>
                    <div className="max-h-48 overflow-y-auto pr-2" style={{ scrollbarWidth: "thin" }}>
                      {years.map((y) => (
                        <motion.div
                          key={`year-${y}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                          className={`p-2 text-center cursor-pointer rounded-lg mb-1 ${
                            year === y ? "bg-blue-100 text-blue-800" : "hover:bg-gray-100"
                          }`}
                          onClick={() => handleDateSelection('year', y)}
                        >
                          {y}
                        </motion.div>
                      ))}
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

export default CustomDatePicker;