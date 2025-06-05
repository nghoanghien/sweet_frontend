import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const CustomSelect = ({
  className="",
  options = [],
  placeholder = "Chọn...",
  onChange,
  value = "",
  label = "",
  error = "",
  required = false,
  onBlur = () => {},
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsFocused(false);
        onBlur();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onBlur]);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setIsFocused(true);
    }
  };

  const handleOptionSelect = (option) => {
    onChange(option);
    setIsOpen(false);
    onBlur();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      layout
      transition={{ duration: 0.3, type: "spring" }}
      className={`mb-3 sm:mb-2`}
    >
      <label className="block text-gray-700 font-medium mb-2 pl-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className={`relative w-full`} ref={dropdownRef}>
        <motion.div
          className={`relative w-full ${isOpen ? "z-40" : ""}`}
          initial={false}
          animate={{ scale: isOpen ? 1.02 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className={clsx(
              `${className}`,
              "w-full border p-3 sm:p-4 rounded-xl shadow-md",
              "cursor-pointer flex items-center gap-2",
              "hover:shadow-lg transition-all duration-300 ease-in-out",
              disabled ? 'bg-gray-100 text-gray-500' : 'bg-white',
              isFocused && !disabled ? "ring-2 ring-emerald-200 bg-emerald-50" : "",
              error ? 'border-red-500 bg-red-50 focus:ring-red-200 focus:bg-red-100' : ''
            )}
            onClick={toggleDropdown}
            onFocus={() => !disabled && setIsFocused(true)}
            onBlur={(e) => {
              if (!dropdownRef.current?.contains(e.relatedTarget)) {
                setIsFocused(false);
              }
            }}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            tabIndex={disabled ? -1 : 0}
          >
            {value ? (
              <span className={`${disabled ? 'text-gray-500' : 'text-black'}`}>{value}</span>
            ) : (
              <span className="text-gray-400">{placeholder}</span>
            )}

            {!disabled && (
              <motion.svg
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
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute w-full mt-2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg z-50 overflow-hidden"
              >
                <div className="p-2 border-b border-gray-200">
                  <input
                    type="text"
                    className="w-full p-2 border-2 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Tìm kiếm..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                <motion.div
                  className="max-h-60 overflow-auto"
                  initial={false}
                  animate={{ height: "auto" }}
                  style={{ scrollbarWidth: "thin" }}
                >
                  {filteredOptions.map((option) => (
                    <motion.div
                      key={option}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`px-5 p-3 cursor-pointer hover:bg-gray-100 ${
                        value === option
                          ? "bg-blue-50 text-black"
                          : "text-gray-700"
                      }`}
                      onClick={() => handleOptionSelect(option)}
                    >
                      {option}
                    </motion.div>
                  ))}

                  {filteredOptions.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-3 text-center text-gray-500"
                    >
                      Không tìm thấy kết quả
                    </motion.div>
                  )}
                </motion.div>
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

export default CustomSelect;