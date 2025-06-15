import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

/**
 * A custom number input component that preserves user input
 * and only formats when necessary
 */
const NumberInput = ({ 
  value,
  onChange,
  onBlur,
  onKeyPress,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  prefix = '',
  suffix = '',
  required = false,
  label = '',
  placeholder = '',
  error = '',
  allowDecimal = true,
  decimalPlaces = 1,
  className = '',
  highlightChange = false,
  highlightColor = 'green',
  disableDirectInput = false,
  autoFormat = false, // New prop to control auto-formatting
}) => {
  // Internal display value (string format)
  const [displayValue, setDisplayValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  // Only format when value changes from external source (not from user input)
  useEffect(() => {
    // Don't format if user is currently typing
    if (isFocused) return;
    
    if (value === null || value === undefined || value === '') {
      setDisplayValue('');
      return;
    }

    // Only format if autoFormat is enabled or value is significantly different
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      const currentNum = parseFloat(displayValue);
      
      // Only auto-format if the values are different (external change)
      if (isNaN(currentNum) || Math.abs(numValue - currentNum) > 0.001) {
        if (allowDecimal && autoFormat) {
          setDisplayValue(numValue.toFixed(decimalPlaces));
        } else {
          setDisplayValue(numValue.toString());
        }
      }
    }
  }, [value, allowDecimal, decimalPlaces, autoFormat, isFocused, displayValue]);

  // Handle input change
  const handleChange = (e) => {
    if (disableDirectInput) return;
    
    let inputValue = e.target.value;
    
    // Allow empty input
    if (inputValue === '') {
      setDisplayValue('');
      onChange('');
      return;
    }
    
    // Replace comma with dot for decimal inputs
    inputValue = inputValue.replace(',', '.');
    
    // Validate input format
    const regex = allowDecimal ? /^-?\d*\.?\d*$/ : /^-?\d*$/;
    if (!regex.test(inputValue)) {
      return; // Don't update if invalid format
    }
    
    // Update display value immediately (preserve user input)
    setDisplayValue(inputValue);
    
    // Parse and send to parent
    const numValue = allowDecimal ? parseFloat(inputValue) : parseInt(inputValue);
    
    if (!isNaN(numValue)) {
      // Đảm bảo giá trị được cập nhật và không bị mất
      setTimeout(() => {
        onChange(numValue);
      }, 0);
    } else if (inputValue === '' || inputValue === '-' || (allowDecimal && (inputValue === '.' || inputValue.endsWith('.')))) {
      // Keep partial input in display but send empty to parent
      onChange('');
    }
  };

  // Handle focus
  const handleFocus = (e) => {
    setIsFocused(true);
  };

  // Handle blur event
  const handleBlur = (e) => {
    setIsFocused(false);
    
    if (displayValue === '' || displayValue === '-') {
      setDisplayValue('');
      onChange('');
      if (onBlur) onBlur(e);
      return;
    }
    
    // Parse the final value
    const numValue = allowDecimal ? parseFloat(displayValue) : parseInt(displayValue);
    
    if (!isNaN(numValue)) {
      // Apply min/max constraints
      let finalValue = numValue;
      if (finalValue < min) {
        finalValue = min;
      } else if (finalValue > max) {
        finalValue = max;
      }
      
      // Only format if autoFormat is enabled or value was constrained
      if (autoFormat || finalValue !== numValue) {
        if (allowDecimal && autoFormat) {
          setDisplayValue(finalValue.toFixed(decimalPlaces));
        } else {
          setDisplayValue(finalValue.toString());
        }
      }
      
      // Đảm bảo giá trị được cập nhật và không bị xóa
      setTimeout(() => {
        onChange(finalValue);
      }, 0);
    } else {
      // Invalid input - clear it
      setDisplayValue('');
      onChange('');
    }
    
    if (onBlur) onBlur(e);
  };

  // Highlight color classes
  const getHighlightClasses = () => {
    if (!highlightChange) return '';
    
    const colorMap = {
      green: 'border-green-300 bg-green-50 focus:ring-green-200',
      red: 'border-red-300 bg-red-50 focus:ring-red-200',
      blue: 'border-blue-300 bg-blue-50 focus:ring-blue-200',
      indigo: 'border-indigo-300 bg-indigo-50 focus:ring-indigo-200',
    };
    
    return colorMap[highlightColor] || colorMap.green;
  };

  return (
    <div className="w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <motion.div
        className="relative flex"
        initial={highlightChange ? { scale: 1.04, boxShadow: (highlightColor === 'red' ? '0 0 0 2px #ef4444' : '0 0 0 2px #22d3ee') } : {}}
        animate={highlightChange ? { scale: 1, boxShadow: '0 0 0 0px #fff' } : {}}
        transition={{ duration: 0.5 }}
      >
        {prefix && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 font-semibold pointer-events-none select-none">
            {prefix}
          </span>
        )}
        
        <input
          type="text"
          inputMode="numeric"
          className={`
            w-full px-5 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 text-base font-semibold transition-all duration-200
            ${error ? 'border-red-300 focus:ring-red-200 bg-red-50' : 
              getHighlightClasses() || 'border-gray-200 focus:ring-blue-200'}
            ${prefix ? 'pl-10' : ''}
            ${suffix ? 'pr-16' : 'pr-5'}
            ${disableDirectInput ? 'bg-gray-100 cursor-not-allowed' : ''}
            ${highlightChange ? (highlightColor === 'red' ? 'shadow-[0_0_8px_0_rgba(239,68,68,0.15)]' : 'shadow-[0_0_8px_0_rgba(34,211,238,0.15)]') : ''}
            ${className}
          `}
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyPress={onKeyPress}
          placeholder={placeholder}
          disabled={disableDirectInput}
          readOnly={disableDirectInput}
        />
        
        {suffix && (
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500 font-semibold pointer-events-none select-none">
            {suffix}
          </span>
        )}
      </motion.div>
      
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="mt-1 text-xs text-red-600 flex items-center"
          >
            <AlertCircle size={12} className="mr-1" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NumberInput;