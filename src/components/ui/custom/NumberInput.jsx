import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

/**
 * A custom number input component that properly formats decimal numbers
 * and provides validation, fixes the issue with displaying .1 instead of 0.1
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
}) => {
  // Internal display value (string format)
  const [displayValue, setDisplayValue] = useState('');
  
  // Format value for display when the external value changes
  useEffect(() => {
    if (value === null || value === undefined || value === '') {
      setDisplayValue('');
      return;
    }

    // Format number to always show proper decimal places
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      if (allowDecimal) {
        setDisplayValue(numValue.toFixed(decimalPlaces));
      } else {
        setDisplayValue(Math.floor(numValue).toString());
      }
    } else {
      setDisplayValue('');
    }
  }, [value, allowDecimal, decimalPlaces]);

  // Handle input change
  const handleChange = (e) => {
    // If input is disabled, don't process changes
    if (disableDirectInput) {
      return;
    }
    
    let inputValue = e.target.value;
    
    // Allow empty input
    if (inputValue === '') {
      setDisplayValue('');
      onChange('');
      return;
    }
    
    // Replace comma with dot for decimal inputs
    inputValue = inputValue.replace(',', '.');
    
    // Validate input is a number format
    const regex = allowDecimal ? /^-?\d*\.?\d*$/ : /^-?\d*$/;
    if (!regex.test(inputValue)) {
      return;
    }
    
    // Update the display value
    setDisplayValue(inputValue);
    
    // Parse to number and update parent
    let numValue;
    try {
      numValue = allowDecimal ? parseFloat(inputValue) : parseInt(inputValue);
    } catch (e) {
      numValue = NaN;
    }
    
    // Only send valid numbers to parent
    if (!isNaN(numValue)) {
      onChange(numValue);
    } else if (inputValue === '' || inputValue === '-' || (allowDecimal && inputValue === '.')) {
      // Keep display value for incomplete input but send empty value to parent
      onChange('');
    }
  };

  // Handle blur event (format display)
  const handleBlur = (e) => {
    if (displayValue === '') {
      return;
    }
    
    // Format the number properly on blur
    let numValue;
    try {
      numValue = allowDecimal ? parseFloat(displayValue) : parseInt(displayValue);
    } catch (e) {
      numValue = NaN;
    }
    
    if (!isNaN(numValue)) {
      if (allowDecimal) {
        // Enforce decimal places on blur
        setDisplayValue(numValue.toFixed(decimalPlaces));
      } else {
        setDisplayValue(numValue.toString());
      }
      
      // Enforce min/max constraints
      if (numValue < min) {
        onChange(min);
      } else if (numValue > max) {
        onChange(max);
      }
    } else {
      // Invalid number, reset to empty
      setDisplayValue('');
      onChange('');
    }
    
    // Call parent onBlur if provided
    if (onBlur) {
      onBlur(e);
    }
  };

  // Highlight color classes based on the highlightColor prop
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
        {/* Prefix (if provided) */}
        {prefix && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 font-semibold pointer-events-none select-none">
            {prefix}
          </span>
        )}
        
        {/* Input field */}
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
          onBlur={handleBlur}
          onKeyPress={onKeyPress}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          disabled={disableDirectInput}
          readOnly={disableDirectInput}
        />
        
        {/* Suffix (if provided) */}
        {suffix && (
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500 font-semibold pointer-events-none select-none">
            {suffix}
          </span>
        )}
      </motion.div>
      
      {/* Error message */}
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