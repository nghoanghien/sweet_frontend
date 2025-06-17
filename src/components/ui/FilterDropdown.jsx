import React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FilterDropdown = ({
  isOpen,
  onToggle,
  selectedValue,
  options,
  placeholder,
  buttonClassName,
  dropdownClassName,
  optionClassName,
  icon: Icon,
  getOptionIcon,
  getOptionLabel,
  getOptionValue
}) => {
  const handleOptionClick = (option) => {
    const value = getOptionValue ? getOptionValue(option) : option.value;
    onToggle(false);
    // Gọi callback để cập nhật giá trị
    if (option.onClick) {
      option.onClick(value);
    }
  };

  const getSelectedLabel = () => {
    if (!selectedValue || selectedValue === 'all') {
      return placeholder;
    }
    const selectedOption = options.find(opt => 
      getOptionValue ? getOptionValue(opt) === selectedValue : opt.value === selectedValue
    );
    return selectedOption ? 
      (getOptionLabel ? getOptionLabel(selectedOption) : selectedOption.label) : 
      placeholder;
  };

  const getSelectedIcon = () => {
    if (!selectedValue || selectedValue === 'all') {
      return Icon;
    }
    const selectedOption = options.find(opt => 
      getOptionValue ? getOptionValue(opt) === selectedValue : opt.value === selectedValue
    );
    if (selectedOption && getOptionIcon) {
      return getOptionIcon(selectedOption);
    }
    return Icon;
  };

  const getSelectedIconColor = () => {
    // Nếu button có gradient (active state), dùng màu trắng
    if (buttonClassName && buttonClassName.includes('gradient')) {
      return 'text-white';
    }
    if (selectedValue === 'disabled') {
      return 'text-red-500';
    }
    if (optionClassName && optionClassName.includes('emerald')) {
      return 'text-emerald-500';
    }
    return 'text-blue-500';
  };

  const getChevronColor = () => {
    // Nếu button có gradient (active state), dùng màu trắng
    if (buttonClassName && buttonClassName.includes('gradient')) {
      return 'text-white';
    }
    if (optionClassName && optionClassName.includes('emerald')) {
      return 'text-emerald-500';
    }
    return 'text-blue-500';
  };

  const SelectedIcon = getSelectedIcon();

  return (
    <div className="relative dropdown-container">
      <button
        onClick={() => onToggle(!isOpen)}
        className={`px-4 py-3 rounded-2xl flex items-center gap-2 text-base font-semibold shadow transition-all w-full sm:min-w-[180px] sm:w-auto justify-between relative ${
          buttonClassName || 'bg-gray-100 text-gray-600 hover:bg-blue-50 border border-blue-100'
        }`}
      >
        <div className="flex items-center gap-3">
          {SelectedIcon && <SelectedIcon size={20} className={getSelectedIconColor()} />}
          <span className="text-base font-semibold">{getSelectedLabel()}</span>
        </div>
        <ChevronDown 
          size={18} 
          className={`transition-transform ${getChevronColor()} ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-full left-0 mt-2 border rounded-xl shadow-xl z-50 min-w-[200px] overflow-hidden backdrop-blur-md bg-white/30 ${
              dropdownClassName || 'border-blue-200'
            }`}
          >
            {options.map((option, index) => {
              const OptionIcon = getOptionIcon ? getOptionIcon(option) : option.icon;
              const label = getOptionLabel ? getOptionLabel(option) : option.label;
              const iconColor = option.value === 'disabled' ? 'text-red-500' : 
                              (optionClassName && optionClassName.includes('emerald')) ? 'text-emerald-500' : 'text-blue-500';
              const textColor = (optionClassName && optionClassName.includes('emerald')) ? 'text-emerald-700' : 'text-blue-700';
              
              return (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`w-full px-5 py-4 text-left text-base hover:bg-blue-50 flex items-center gap-4 transition-colors last:border-b-0 ${
                    optionClassName || ''
                  }`}
                >
                  {OptionIcon && <OptionIcon size={18} className={iconColor} />}
                  <span className={`font-medium ${textColor}`}>{label}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterDropdown;