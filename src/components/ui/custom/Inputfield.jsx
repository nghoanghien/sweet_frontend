import { motion, AnimatePresence } from 'framer-motion';

const InputField = ({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  placeholder = "", 
  disabled = false,
  error = "",
  required = false,
  onBlur = () => {}
}) => (
  <motion.div 
    layout
    transition={{ duration: 0.3, type: "spring" }}
    className="mb-3 sm:mb-2"
  >
    <label className="block text-gray-700 font-medium mb-2 pl-2">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input 
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      disabled={disabled}
      placeholder={placeholder}
      className={`w-full border ${disabled ? 'bg-gray-100 text-gray-500' : 'bg-white'} p-3 sm:p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out
        focus:ring-2 focus:outline-none focus:border-transparent 
        ${error ? 'border-red-500 bg-red-50 focus:ring-red-200 focus:bg-red-100' : 'focus:ring-emerald-200 focus:bg-emerald-50'}`
      }
      required={required}
    />
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

export default InputField;