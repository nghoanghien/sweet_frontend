import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { 
  FileText, 
  X, 
  Eye, 
  AlertCircle, 
  Download, 
  File,
  ChevronDown,
  ChevronUp,
  User,
  Mail,
  Phone,
  Calendar,
  Hash,
  MapPin,
  Check,
  Info
} from 'lucide-react';
import { FaFilePdf, FaFileExcel } from 'react-icons/fa';

/**
 * ExportDataModal - A reusable component for exporting data with customizable columns
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls the visibility of the modal
 * @param {Function} props.onClose - Function to call when closing the modal
 * @param {Array} props.data - Array of data objects to be exported
 * @param {Function} props.onExport - Function to call when exporting data (receives data and format)
 * @param {Object} props.initialSelectedColumns - Initial state of selected columns (default: all columns)
 * @param {string} props.title - Title of the export modal (default: "Xuất dữ liệu")
 * @param {Object} props.columnLabels - Custom labels for columns (default: column keys)
 * @param {Function} props.formatData - Custom function to format data before preview (optional)
 * @param {string} props.defaultFormat - Default export format (default: "pdf")
 * @param {Object} props.customColumnCategories - Custom categories for columns grouping (optional)
 * @param {boolean} props.enableGrouping - Enable/disable column grouping feature (default: true)
 */
const ExportDataModal = ({ 
  isOpen, 
  onClose, 
  data = [],
  onExport,
  initialSelectedColumns = null,
  title = "Xuất dữ liệu",
  columnLabels = null,
  formatData = null,
  defaultFormat = "pdf",
  customColumnCategories = null,
  enableGrouping = true
}) => {
  // Initialize selected columns based on first data item or provided initialSelectedColumns
  const [selectedColumns, setSelectedColumns] = useState({});
  const [exportFormat, setExportFormat] = useState(defaultFormat);
  const [previewData, setPreviewData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Refs for animation
  const tableRef = useRef(null);
  const tableContainerRef = useRef(null);
  const lastToggledColumn = useRef(null);
  const previousSelectedColumns = useRef({});
  const isFirstRender = useRef(true);
  
  // State for tracking column animations
  const [columnAnimations, setColumnAnimations] = useState({});
  const [lastAddedColumn, setLastAddedColumn] = useState(null);
  const [lastRemovedColumn, setLastRemovedColumn] = useState(null);
  
  // State for ghost columns (visual duplicates during animation)
  const [ghostColumns, setGhostColumns] = useState({});
  
  // State for collapsible sections
  const [expandedSections, setExpandedSections] = useState({
    personal: true,
    contact: true,
    address: true,
    other: true
  });
  
  // Column categories
  const defaultColumnCategories = {
    personal: ['fullName', 'birthDate', 'age', 'idNumber', 'code'],
    contact: ['email', 'phone'],
    address: ['permanentAddress', 'contactAddress'],
    other: ['registrationDate', 'status']
  };
  
  // Use custom categories if provided, otherwise use default
  const columnCategories = customColumnCategories || defaultColumnCategories;
  
  // Get section title
  const getSectionTitle = (section) => {
    if (!enableGrouping && section === 'all') {
      return 'Tất cả các cột';
    }
    
    switch(section) {
      case 'personal': return 'Thông tin cá nhân';
      case 'contact': return 'Thông tin liên hệ';
      case 'address': return 'Thông tin địa chỉ';
      case 'account': return 'Thông tin tài khoản';
      case 'financial': return 'Thông tin tài chính';
      case 'customer': return 'Thông tin khách hàng';
      case 'other': return 'Thông tin khác';
      default: return section.charAt(0).toUpperCase() + section.slice(1).replace(/([A-Z])/g, ' $1');
    }
  };
  
  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // Initialize selected columns
  useEffect(() => {
    if (initialSelectedColumns && Array.isArray(initialSelectedColumns)) {
      const columns = {};
      initialSelectedColumns.forEach(column => {
        columns[column] = true;
      });
      setSelectedColumns(columns);
    } else if (initialSelectedColumns && typeof initialSelectedColumns === 'object') {
      setSelectedColumns(initialSelectedColumns);
    } else if (data && data.length > 0) {
      const firstItem = data[0];
      const columns = {};
      
      // Check if we have columnCategories to use as a guide
      if (enableGrouping && columnCategories) {
        // Add only top-level columns defined in columnCategories
        Object.values(columnCategories).flat().forEach(column => {
          if (column.includes('.')) {
            // For dot notation columns, add them directly
            columns[column] = true;
          } else {
            // For top-level columns, check if they exist in the data
            if (column in firstItem) {
              columns[column] = true;
            }
          }
        });
      } else {
        // No columnCategories, process all columns including nested ones
        const processObject = (obj, prefix = '') => {
          Object.keys(obj).forEach(key => {
            if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
              // For complex objects, add the top-level property only, not its children
              columns[`${prefix}${key}`] = true;
              
              // Don't recursively process nested objects
              // processObject(obj[key], `${prefix}${key}.`);
            } else {
              // Add the column
              columns[`${prefix}${key}`] = true;
            }
          });
        };
        
        processObject(firstItem);
      }
      
      setSelectedColumns(columns);
    }
  }, [data, initialSelectedColumns, columnCategories, enableGrouping]);
  
  // Generate column labels
  const getColumnLabels = () => {
    if (columnLabels) return columnLabels;
    
    const labels = {};
    if (data && data.length > 0) {
      Object.keys(data[0]).forEach(key => {
        // Convert camelCase to Title Case as default label
        labels[key] = key
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase());
      });
    }
    return labels;
  };
  
  // Format data for display
  const formatValue = (value, column) => {
    if (formatData) {
      return formatData(value, column);
    }
    
    // Default formatting
    if (value === null || value === undefined) return '';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  };
  
  // Get value from nested object using dot notation
  const getNestedValue = (obj, path) => {
    if (!path.includes('.')) return obj[path];
    
    const parts = path.split('.');
    let value = obj;
    
    for (const part of parts) {
      if (value && typeof value === 'object') {
        value = value[part];
      } else {
        return undefined;
      }
    }
    
    return value;
  };
  
  // Generate preview data based on selected columns
  useEffect(() => {
    if (data && data.length > 0) {
      const preview = data.slice(0, 3).map(item => {
        const row = {};
        
        Object.keys(selectedColumns).forEach(column => {
          if (selectedColumns[column]) {
            // Use getNestedValue for nested properties
            const value = getNestedValue(item, column);
            row[column] = formatValue(value, column);
          }
        });
        
        return row;
      });
      
      setPreviewData(preview);
    }
  }, [selectedColumns, data]);
  
  // Find the position of a column in the table
  const findColumnPosition = (column) => {
    if (!tableRef.current) return { left: 0, width: 0 };
    
    const columnElement = tableRef.current.querySelector(`[data-column="${column}"]`);
    if (!columnElement) return { left: 0, width: 0 };
    
    const rect = columnElement.getBoundingClientRect();
    const tableRect = tableRef.current.getBoundingClientRect();
    
    return {
      left: rect.left - tableRect.left + tableRef.current.scrollLeft,
      width: rect.width
    };
  };
  
  // Toggle column selection with animation tracking
  const toggleColumn = (column) => {
    // Store the column being toggled for animation reference
    lastToggledColumn.current = column;
    
    // Store previous state for comparison
    previousSelectedColumns.current = {...selectedColumns};
    
    // Create ghost effect for animation
    if (selectedColumns[column]) {
      // Column is being removed
      setLastRemovedColumn(column);
      
      // Capture position before removing
      const position = findColumnPosition(column);
      
      // Small delay to ensure position is captured correctly
      setTimeout(() => {
        setGhostColumns(prev => ({
          ...prev,
          [column]: { value: true, position }
        }));
      }, 10);
      
      // Remove ghost after animation completes
      setTimeout(() => {
        setGhostColumns(prev => {
          const newGhosts = {...prev};
          delete newGhosts[column];
          return newGhosts;
        });
      }, 500);
    } else {
      // Column is being added
      setLastAddedColumn(column);
    }
    
    // Update selected columns
    setSelectedColumns(prev => ({
      ...prev,
      [column]: !prev[column]
    }));
    
    // Set animation state for this column
    setColumnAnimations(prev => ({
      ...prev,
      [column]: !selectedColumns[column] ? 'adding' : 'removing'
    }));
    
    // After animation completes, reset the animation state
    setTimeout(() => {
      setColumnAnimations(prev => ({
        ...prev,
        [column]: null
      }));
      
      // Reset last added/removed column
      if (selectedColumns[column]) {
        setLastRemovedColumn(null);
      } else {
        setLastAddedColumn(null);
      }
    }, 500); // Match this with the animation duration
  };
  
  // Toggle all columns in a section with animations
  const toggleSectionColumns = (section, value) => {
    const newSelectedColumns = { ...selectedColumns };
    const columnsToAnimate = {};
    const newGhostColumns = { ...ghostColumns };
    
    // Store previous state
    previousSelectedColumns.current = {...selectedColumns};
    
    // Update columns and track which ones are changing
    columnCategories[section].forEach(column => {
      if (column in newSelectedColumns) {
        // Only animate columns that are actually changing
        if (newSelectedColumns[column] !== value) {
          columnsToAnimate[column] = value ? 'adding' : 'removing';
          
          // Create ghost effect for columns being removed
          if (newSelectedColumns[column] && !value) {
            newGhostColumns[column] = { 
              value: true, 
              position: findColumnPosition(column) 
            };
            
            // Mark this as the last removed column
            setLastRemovedColumn(column);
          }
          
          // Mark this as the last added column if it's being added
          if (!newSelectedColumns[column] && value) {
            setLastAddedColumn(column);
          }
        }
        
        newSelectedColumns[column] = value;
      }
    });
    
    // Update selected columns
    setSelectedColumns(newSelectedColumns);
    
    // Set ghost columns for animation
    setGhostColumns(newGhostColumns);
    
    // Set animation states
    setColumnAnimations(prev => ({
      ...prev,
      ...columnsToAnimate
    }));
    
    // Reset animation states after animation completes
    setTimeout(() => {
      // Reset column animations
      const resetAnimations = {};
      Object.keys(columnsToAnimate).forEach(column => {
        resetAnimations[column] = null;
      });
      
      setColumnAnimations(prev => ({
        ...prev,
        ...resetAnimations
      }));
      
      // Remove ghosts
      setGhostColumns({});
      
      // Reset last added/removed column
      setLastAddedColumn(null);
      setLastRemovedColumn(null);
    }, 500); // Match this with the animation duration
  };
  
  // Scroll table to show newly added or removed column
  useEffect(() => {
    // Skip on first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    if (tableContainerRef.current && lastToggledColumn.current) {
      const column = lastToggledColumn.current;
      
      // Find the column element
      const columnElement = tableContainerRef.current.querySelector(`[data-column="${column}"]`);
      
      if (columnElement) {
        // Calculate the position to scroll to
        const containerRect = tableContainerRef.current.getBoundingClientRect();
        const columnRect = columnElement.getBoundingClientRect();
        const containerScrollLeft = tableContainerRef.current.scrollLeft;
        
        // Calculate if column is visible
        const columnLeftInView = columnRect.left >= containerRect.left;
        const columnRightInView = columnRect.right <= containerRect.right;
        
        // Only scroll if column is not fully visible
        if (!columnLeftInView || !columnRightInView) {
          // Calculate target scroll position to center the column
          const scrollTarget = containerScrollLeft + 
            (columnRect.left + columnRect.width / 2 - containerRect.left - containerRect.width / 2);
          
          // Smooth scroll to the target position
          tableContainerRef.current.scrollTo({
            left: scrollTarget,
            behavior: 'smooth'
          });
        }
      }
    }
  }, [selectedColumns]);
  
  // Check if any column is selected
  const hasSelectedColumns = Object.values(selectedColumns).some(value => value);
  
  // Check if all columns in a section are selected
  const areSectionColumnsSelected = (section) => {
    // Check if section exists in columnCategories and is an array
    if (!columnCategories || !columnCategories[section] || !Array.isArray(columnCategories[section])) {
      return false;
    }
    
    // Check if the section has any columns
    if (columnCategories[section].length === 0) {
      return false;
    }
    
    // Check if selectedColumns exists
    if (!selectedColumns) {
      return false;
    }
    
    return columnCategories[section].every(column => 
      selectedColumns[column] === true
    );
  };
  
  // Check if some columns in a section are selected
  const areSomeSectionColumnsSelected = (section) => {
    // Check if section exists in columnCategories and is an array
    if (!columnCategories || !columnCategories[section] || !Array.isArray(columnCategories[section])) {
      return false;
    }
    
    // Check if the section has any columns
    if (columnCategories[section].length === 0) {
      return false;
    }
    
    // Check if selectedColumns exists
    if (!selectedColumns) {
      return false;
    }
    
    return columnCategories[section].some(column => 
      selectedColumns[column] === true
    ) && !areSectionColumnsSelected(section);
  };
  
  // Handle export action
  const handleExport = () => {
    setIsProcessing(true);
    
    // Prepare export data
    const exportData = data.map(item => {
      const row = {};
      
      // Process columns from columnCategories first
      if (enableGrouping && columnCategories) {
        Object.entries(columnCategories).forEach(([category, columns]) => {
          if (Array.isArray(columns)) {
            columns.forEach(column => {
              // Check if this column is selected or is a complex object
              const isSelected = selectedColumns[column];
              const isComplexObject = item[column] !== null && 
                                     typeof item[column] === 'object' && 
                                     !Array.isArray(item[column]);
              
              if (isSelected || isComplexObject) {
                // Handle nested properties like 'customer.fullName'
                if (column.includes('.')) {
                  const parts = column.split('.');
                  let value = item;
                  
                  // Navigate through the nested properties
                  for (const part of parts) {
                    if (value && typeof value === 'object') {
                      value = value[part];
                    } else {
                      value = undefined;
                      break;
                    }
                  }
                  
                  // Format the value if needed
                  if (formatData) {
                    row[column] = formatData(value, column);
                  } else {
                    row[column] = value;
                  }
                } 
                // Handle complex objects like addresses
                else if (isComplexObject) {
                  // Format the complex object if formatData is provided
                  if (formatData) {
                    row[column] = formatData(item[column], column);
                  } else {
                    // Default formatting for complex objects
                    row[column] = JSON.stringify(item[column]);
                  }
                } 
                // Handle regular properties
                else {
                  // Format the value if needed
                  if (formatData) {
                    row[column] = formatData(item[column], column);
                  } else {
                    row[column] = item[column];
                  }
                }
              }
            });
          }
        });
      }
      
      // Process any remaining selected columns not in columnCategories
      Object.keys(selectedColumns).forEach(column => {
        // Skip if already processed
        if (column in row) return;
        
        if (selectedColumns[column]) {
          // Handle nested properties like 'customer.fullName'
          if (column.includes('.')) {
            const parts = column.split('.');
            let value = item;
            
            // Navigate through the nested properties
            for (const part of parts) {
              if (value && typeof value === 'object') {
                value = value[part];
              } else {
                value = undefined;
                break;
              }
            }
            
            // Format the value if needed
            if (formatData) {
              row[column] = formatData(value, column);
            } else {
              row[column] = value;
            }
          } else {
            // Format the value if needed
            if (formatData) {
              row[column] = formatData(item[column], column);
            } else {
              row[column] = item[column];
            }
          }
        }
      });
      
      return row;
    });
    
    // Simulate export process
    setTimeout(() => {
      onExport(exportData, exportFormat);
      setIsProcessing(false);
      onClose();
    }, 1000);
  };
  
  // Categorize columns
  const categorizeColumns = () => {
    const categorized = {};
    const labels = getColumnLabels();
    
    // If grouping is disabled, return all columns in a single category
    if (!enableGrouping) {
      categorized.all = Object.keys(selectedColumns).map(column => ({
        key: column,
        label: labels[column] || column
      }));
      return categorized;
    }
    
    // Initialize categories
    Object.keys(columnCategories).forEach(category => {
      categorized[category] = [];
    });
    
    // Make sure 'other' category exists
    if (!categorized.other) {
      categorized.other = [];
    }
    
    // First, ensure all columns from columnCategories are included
    // This is important for nested properties like 'customer.fullName' and complex objects like addresses
    Object.entries(columnCategories).forEach(([category, columns]) => {
      if (Array.isArray(columns)) {
        columns.forEach(column => {
          // Check if this column is already in the categorized list
          const alreadyIncluded = categorized[category].some(item => item.key === column);
          
          // Check if column exists in selectedColumns or if it's a complex object
          const isInSelectedColumns = column in selectedColumns;
          
          // Check if it's a complex object in the data
          let isComplexObject = false;
          if (data && data.length > 0 && !isInSelectedColumns) {
            // Check if this is a complex object property in the first data item
            const firstItem = data[0];
            if (firstItem && typeof firstItem === 'object') {
              isComplexObject = column in firstItem && 
                                firstItem[column] !== null && 
                                typeof firstItem[column] === 'object' && 
                                !Array.isArray(firstItem[column]);
            }
          }
          
          // If not already included and it's either in selectedColumns or is a complex object, add it
          if (!alreadyIncluded && (isInSelectedColumns || isComplexObject)) {
            categorized[category].push({
              key: column,
              label: labels[column] || column
            });
          }
        });
      }
    });
    
    // Then categorize any remaining columns that weren't explicitly categorized
    Object.keys(selectedColumns).forEach(column => {
      // Check if this column is already categorized
      let found = false;
      
      for (const category in categorized) {
        if (categorized[category].some(item => item.key === column)) {
          found = true;
          break;
        }
      }
      
      // If not found in any category, add to "other"
      if (!found) {
        categorized.other.push({
          key: column,
          label: labels[column] || column
        });
      }
    });
    
    return categorized;
  };
  
  const categorizedColumns = categorizeColumns();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <style jsx global>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
              height: 6px;
            }
            
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
              border-radius: 10px;
            }
            
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #cbd5e1;
              border-radius: 10px;
            }
            
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #94a3b8;
            }
          `}</style>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl w-full max-w-5xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] overflow-hidden border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-[0_4px_20px_rgba(66,99,235,0.25)]">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{title} <span className="text-sm">(Dữ liệu xuất ra sẽ bao gồm {data.length} bản ghi đã được lọc trước đó ở phần tìm kiếm)</span></h2>
                <motion.button 
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isProcessing}
                >
                  <X size={20} />
                </motion.button>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Column selection */}
                <div className="md:col-span-1 bg-gray-50 p-5 rounded-xl shadow-[0_5px_25px_rgba(0,0,0,0.05)] border border-indigo-100/50 hover:shadow-[0_8px_30px_rgba(79,70,229,0.1)] transition-all duration-500 relative overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-300/10 to-indigo-300/10 rounded-full blur-xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-indigo-400/10 to-purple-300/10 rounded-full blur-xl translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>
                  
                  <div className="relative">
                    <h3 className="font-medium text-gray-800 mb-5 flex items-center">
                      <div className="mr-2 p-2 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-lg text-white shadow-md">
                        <FileText size={18} />
                      </div>
                      <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent font-semibold text-lg">
                        Chọn cột dữ liệu
                      </span>
                      <div className="bg-indigo-100 text-indigo-700 ml-3 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                        {Object.values(selectedColumns).filter(Boolean).length} cột
                      </div>
                    </h3>
                    
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-indigo-100">
                      {Object.keys(categorizedColumns).map(section => (
                        <div 
                          key={section} 
                          className="border border-indigo-200/50 rounded-xl overflow-hidden bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 relative group"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                          
                          {/* Section header */}
                          <motion.div 
                            className="flex items-center justify-between p-3.5 cursor-pointer bg-gradient-to-r from-white to-indigo-50/30 transition-colors border-b border-indigo-100/30"
                            onClick={() => toggleSection(section)}
                            whileHover={{ backgroundColor: 'rgba(238, 242, 255, 0.6)' }}
                          >
                            <div className="flex items-center">
                              
                              <span className="font-medium text-gray-700">{getSectionTitle(section)}</span>
                              <span className="ml-2 text-xs px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full shadow-sm">
                                {categorizedColumns[section].filter(({key}) => selectedColumns[key]).length}/{categorizedColumns[section].length}
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              {/* Select all checkbox */}
                              <div 
                                className={`relative w-5 h-5 rounded-md flex items-center justify-center transition-all cursor-pointer overflow-hidden ${
                                  areSectionColumnsSelected(section) 
                                    ? 'bg-gradient-to-r from-indigo-500 to-blue-500 shadow-[0_0_0_1px_rgba(79,70,229,0.2)]' 
                                    : 'bg-white border border-gray-300'
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleSectionColumns(section, !areSectionColumnsSelected(section));
                                }}
                              >
                                <motion.div
                                  initial={{ y: areSectionColumnsSelected(section) ? 0 : -20 }}
                                  animate={{ y: areSectionColumnsSelected(section) ? 0 : -20 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {areSectionColumnsSelected(section) && (
                                    <Check size={12} className="text-white" />
                                  )}
                                </motion.div>
                              </div>
                              
                              {/* Expand/collapse icon with animation */}
                              <motion.div
                                animate={{ rotate: expandedSections[section] ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full p-1.5 hover:shadow-md transition-all"
                              >
                                <ChevronDown size={16} className="text-indigo-600" />
                              </motion.div>
                            </div>
                          </motion.div>
                          
                          {/* Section content */}
                          <AnimatePresence>
                            {expandedSections[section] && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden bg-gradient-to-b from-white to-indigo-50/30"
                              >
                                <div className="border-t border-indigo-50">
                                  {categorizedColumns[section].map(({ key, label }) => (
                                    <motion.div 
                                      key={key}
                                      className={`flex items-center px-4 py-3 border-b border-indigo-50 last:border-b-0 transition-all duration-100 relative ${
                                        selectedColumns[key] 
                                          ? 'bg-gradient-to-r from-indigo-50/80 to-blue-50/80' 
                                          : 'hover:bg-indigo-50/30'
                                      }`}
                                      whileHover={{ x: 8, backgroundColor: selectedColumns[key] ? 'rgba(224, 231, 255, 0.6)' : 'rgba(238, 242, 255, 0.3)' }}
                                    >
                                      <div 
                                        className={`relative w-5 h-5 rounded-md flex items-center justify-center mr-3 transition-all cursor-pointer overflow-hidden ${
                                          selectedColumns[key] 
                                            ? 'bg-gradient-to-r from-indigo-500 to-blue-500 shadow-[0_0_0_1px_rgba(79,70,229,0.2)]' 
                                            : 'bg-white border border-gray-300'
                                        }`}
                                        onClick={() => toggleColumn(key)}
                                      >
                                        <motion.div
                                          initial={{ y: selectedColumns[key] ? 0 : -20 }}
                                          animate={{ y: selectedColumns[key] ? 0 : -20 }}
                                          transition={{ duration: 0.2 }}
                                        >
                                          {selectedColumns[key] && (
                                            <Check size={12} className="text-white" />
                                          )}
                                        </motion.div>
                                      </div>
                                      
                                      <div 
                                        className="flex items-center flex-1 cursor-pointer" 
                                        onClick={() => toggleColumn(key)}
                                      >
                                        <span className={`text-sm relative transition-colors duration-200 ${
                                          selectedColumns[key] ? 'text-indigo-700 font-medium' : 'text-gray-700'
                                        }`}>
                                          {label}
                                        </span>
                                        
                                        {selectedColumns[key] && (
                                          <div className="flex items-center ml-2">
                                            <motion.span
                                              initial={{ opacity: 0, scale: 0 }}
                                              animate={{ opacity: 1, scale: 1 }}
                                              exit={{ opacity: 0, scale: 0 }}
                                              className="w-2 h-2 rounded-full bg-indigo-500"
                                            />
                                          </div>
                                        )}
                                      </div>
                                      
                                      {/* Glow effect for selected items */}
                                      {selectedColumns[key] && (
                                        <motion.div 
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          exit={{ opacity: 0 }}
                                          transition={{ duration: 0.3 }}
                                          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-blue-500 rounded-r-full"
                                        />
                                      )}
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                    
                    {/* Selected columns counter */}
                    
                  </div>
                  
                  {/* Format selection */}
                  <div className="pt-8 relative">
                    <h3 className="font-medium text-gray-800 mb-4 flex items-center">
                      <div className="mr-2 p-2 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-lg text-white shadow-md">
                        <FileText size={18} />
                      </div>
                      <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent font-semibold text-lg">
                        Định dạng xuất
                      </span>
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <motion.div
                        whileHover={{ y: -3, scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`p-4 border rounded-xl cursor-pointer flex flex-col items-center relative overflow-hidden ${
                          exportFormat === 'pdf' 
                            ? 'border-red-300 shadow-[0_5px_20px_rgba(239,68,68,0.15)] bg-gradient-to-br from-red-50 to-red-100/50' 
                            : 'border-gray-200 hover:border-red-200 hover:shadow-[0_5px_15px_rgba(0,0,0,0.05)]'
                        } transition-all duration-300`}
                        onClick={() => setExportFormat('pdf')}
                      >
                        {exportFormat === 'pdf' && (
                          <div className="absolute inset-0 pointer-events-none" />
                        )}
                        <div className={`p-3 rounded-full mb-2 ${
                          exportFormat === 'pdf' ? 'bg-red-100' : 'bg-gray-100'
                        } transition-colors duration-300`}>
                          <FaFilePdf size={28} className={exportFormat === 'pdf' ? 'text-red-500' : 'text-gray-400'} />
                        </div>
                        <span className={`text-sm ${exportFormat === 'pdf' ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                          PDF
                        </span>
                        {exportFormat === 'pdf' && (
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-3 right-3 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-md"
                          >
                            <Check size={12} className="text-white" />
                          </motion.div>
                        )}
                      </motion.div>
                      
                      <motion.div
                        whileHover={{ y: -3, scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`p-4 border rounded-xl cursor-pointer flex flex-col items-center relative overflow-hidden ${
                          exportFormat === 'excel' 
                            ? 'border-green-300 shadow-[0_5px_20px_rgba(34,197,94,0.15)] bg-gradient-to-br from-green-50 to-green-100/50' 
                            : 'border-gray-200 hover:border-green-200 hover:shadow-[0_5px_15px_rgba(0,0,0,0.05)]'
                        } transition-all duration-300`}
                        onClick={() => setExportFormat('excel')}
                      >
                        {exportFormat === 'excel' && (
                          <div className="absolute inset-0 pointer-events-none" />
                        )}
                        <div className={`p-3 rounded-full mb-2 ${
                          exportFormat === 'excel' ? 'bg-green-100' : 'bg-gray-100'
                        } transition-colors duration-300`}>
                          <FaFileExcel size={28} className={exportFormat === 'excel' ? 'text-green-600' : 'text-gray-400'} />
                        </div>
                        <span className={`text-sm ${exportFormat === 'excel' ? 'text-green-600 font-medium' : 'text-gray-600'}`}>
                          Excel
                        </span>
                        {exportFormat === 'excel' && (
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-3 right-3 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-md"
                          >
                            <Check size={12} className="text-white" />
                          </motion.div>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </div>
                
                {/* Preview */}
                <div className="md:col-span-2">
                  <h3 className="font-medium text-gray-800 mb-5 flex items-center">
                    <div className="mr-2 p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg text-white shadow-md">
                      <Eye size={18} />
                    </div>
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent font-semibold text-lg">
                      Xem trước dữ liệu
                    </span>
                  </h3>
                  
                  {hasSelectedColumns ? (
                    <div className="border border-blue-200/50 rounded-xl overflow-hidden shadow-[0_5px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(66,153,225,0.1)] transition-all duration-500 relative bg-white/80 backdrop-blur-sm">
                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-300/5 to-indigo-300/5 rounded-full blur-xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-400/5 to-indigo-300/5 rounded-full blur-xl translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>
                      
                      <div className="overflow-x-auto relative" ref={tableContainerRef}>
                        <motion.div 
                          className="min-w-full relative" 
                          ref={tableRef}
                          layout="position"
                          layoutRoot
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 30,
                            duration: 0.4
                          }}
                        >
                          <table className="min-w-full divide-y divide-blue-100">
                            <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                              <tr className="relative">
                                {/* Ghost headers for columns being removed */}
                                {Object.entries(ghostColumns).map(([column, ghost]) => (
                                  <motion.th
                                    key={`ghost-${column}`}
                                    className="absolute px-4 py-3.5 text-left text-xs font-medium text-gray-600/40 uppercase tracking-wider border-r border-blue-100/30 pointer-events-none"
                                    style={{ 
                                      left: ghost.position.left,
                                      width: ghost.position.width,
                                      zIndex: 5
                                    }}
                                    initial={{ opacity: 0.9 }}
                                    animate={{ 
                                      opacity: 0,
                                      y: -10,
                                      scale: 0.9
                                    }}
                                    transition={{ 
                                      duration: 0.4
                                    }}
                                  >
                                    <div className="flex items-center space-x-1.5">
                                      <span>{getColumnLabels()[column] || column}</span>
                                    </div>
                                  </motion.th>
                                ))}
                                
                                <AnimatePresence initial={false} mode="sync">
                                  {Object.keys(selectedColumns).map(column => (
                                    selectedColumns[column] && (
                                      <motion.th 
                                        key={column}
                                        data-column={column}
                                        className={`px-4 py-3.5 text-left text-xs font-medium uppercase tracking-wider border-r border-blue-100/30 last:border-r-0 relative ${
                                          column === lastAddedColumn ? 'text-blue-700' : 'text-gray-600'
                                        }`}
                                        initial={{ 
                                          opacity: 0, 
                                          width: 0,
                                          scale: 0.8
                                        }}
                                        animate={{ 
                                          opacity: 1, 
                                          width: 'auto',
                                          scale: 1
                                        }}
                                        exit={{ 
                                          opacity: 0, 
                                          width: 0,
                                          scale: 0.8
                                        }}
                                        transition={{ 
                                          type: "spring",
                                          stiffness: 300,
                                          damping: 25,
                                          duration: 0.4
                                        }}
                                        layout="position"
                                      >
                                        <div className="flex items-center space-x-1.5">
                                          <span>{getColumnLabels()[column] || column}</span>
                                        </div>
                                        
                                        {/* Highlight effect for newly added column */}
                                        {column === lastAddedColumn && (
                                          <motion.div
                                            className="absolute inset-0 bg-blue-200/30 z-0"
                                            initial={{ opacity: 1 }}
                                            animate={{ opacity: 0 }}
                                            transition={{ duration: 1.5 }}
                                          />
                                        )}
                                        
                                        {/* Clone effect when adding a column */}
                                        {columnAnimations[column] === 'adding' && (
                                          <motion.div
                                            className="absolute inset-0 bg-blue-100/30 z-10"
                                            initial={{ opacity: 0.8, scale: 1.1 }}
                                            animate={{ opacity: 0, scale: 1 }}
                                            transition={{ duration: 0.5 }}
                                          />
                                        )}
                                      </motion.th>
                                    )
                                  ))}
                                </AnimatePresence>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-blue-50">
                              {previewData.map((row, index) => (
                                <motion.tr 
                                  key={index} 
                                  className="hover:bg-blue-50/50 transition-colors duration-200 relative"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ 
                                    duration: 0.3,
                                    delay: index * 0.1
                                  }}
                                  layout="position"
                                >
                                  {/* Ghost cells for columns being removed */}
                                  {Object.entries(ghostColumns).map(([column, ghost]) => (
                                    <motion.td
                                      key={`ghost-${column}-${index}`}
                                      className="absolute px-4 py-3.5 whitespace-nowrap text-sm text-gray-700/40 border-r border-blue-50 pointer-events-none"
                                      style={{ 
                                        left: ghost.position.left,
                                        width: ghost.position.width,
                                        zIndex: 5
                                      }}
                                      initial={{ opacity: 0.9 }}
                                      animate={{ 
                                        opacity: 0,
                                        y: 10,
                                        scale: 0.9
                                      }}
                                      transition={{ 
                                        duration: 0.4,
                                        delay: index * 0.05
                                      }}
                                    >
                                      {row[column]}
                                    </motion.td>
                                  ))}
                                  
                                  <AnimatePresence initial={false} mode="sync">
                                    {Object.keys(selectedColumns).map(column => (
                                      selectedColumns[column] && (
                                        <motion.td 
                                          key={column}
                                          data-column={column}
                                          className={`px-4 py-3.5 whitespace-nowrap text-sm border-r border-blue-50 last:border-r-0 relative ${
                                            column === lastAddedColumn ? 'text-blue-700 font-medium' : 'text-gray-700'
                                          }`}
                                          initial={{ 
                                            opacity: 0, 
                                            width: 0,
                                            x: columnAnimations[column] === 'adding' ? -20 : 0,
                                            scale: columnAnimations[column] === 'adding' ? 0.8 : 1
                                          }}
                                          animate={{ 
                                            opacity: 1, 
                                            width: 'auto',
                                            x: 0,
                                            scale: 1
                                          }}
                                          exit={{ 
                                            opacity: 0, 
                                            width: 0,
                                            x: columnAnimations[column] === 'removing' ? 20 : 0,
                                            scale: columnAnimations[column] === 'removing' ? 0.8 : 1
                                          }}
                                          transition={{ 
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 25,
                                            duration: 0.4,
                                            delay: index * 0.05
                                          }}
                                          layout="position"
                                        >
                                          {/* Highlight effect for newly added column */}
                                          {column === lastAddedColumn && (
                                            <motion.div
                                              className="absolute inset-0 bg-blue-100/30 z-0"
                                              initial={{ opacity: 1 }}
                                              animate={{ opacity: 0 }}
                                              transition={{ duration: 1.5 }}
                                            />
                                          )}
                                          
                                          {/* Clone effect when adding a column */}
                                          {columnAnimations[column] === 'adding' && (
                                            <motion.div
                                              className="absolute inset-0 bg-blue-100/30 z-10"
                                              initial={{ opacity: 0.8, scale: 1.1 }}
                                              animate={{ opacity: 0, scale: 1 }}
                                              transition={{ duration: 0.5 }}
                                            />
                                          )}
                                          
                                          {/* Clone effect when removing a column */}
                                          {columnAnimations[column] === 'removing' && (
                                            <motion.div
                                              className="absolute inset-0 bg-red-100/20 z-10"
                                              initial={{ opacity: 0 }}
                                              animate={{ opacity: 0.8 }}
                                              exit={{ opacity: 0 }}
                                              transition={{ duration: 0.3 }}
                                            />
                                          )}
                                          
                                          {/* Duplicate content for clone effect */}
                                          {columnAnimations[column] === 'adding' && (
                                            <motion.div
                                              className="absolute inset-0 flex items-center px-4 text-blue-700 font-medium"
                                              initial={{ opacity: 0.8, scale: 1.1, x: -10 }}
                                              animate={{ opacity: 0, scale: 1, x: 0 }}
                                              transition={{ duration: 0.4 }}
                                            >
                                              {row[column]}
                                            </motion.div>
                                          )}
                                          
                                          {row[column]}
                                        </motion.td>
                                      )
                                    ))}
                                  </AnimatePresence>
                                </motion.tr>
                              ))}
                            </tbody>
                          </table>
                        </motion.div>
                      </div>
                      
                      {data.length > 3 && (
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2.5 text-xs text-gray-600 flex items-center justify-center border-t border-blue-100/50">
                          <Info size={14} className="mr-1.5 text-blue-500" />
                          <span>Hiển thị <span className="font-medium text-blue-700">3</span>/<span className="font-medium text-indigo-700">{data.length}</span> bản ghi</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="border border-blue-200/50 rounded-xl p-10 text-center shadow-[0_5px_30px_rgba(0,0,0,0.05)] bg-white/80 backdrop-blur-sm">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0.5 }}
                          animate={{ 
                            scale: [0.8, 1.1, 1],
                            opacity: [0.5, 1, 0.8, 1] 
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                          }}
                        >
                          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center mb-5 shadow-inner">
                            <AlertCircle size={40} className="text-blue-300" />
                          </div>
                        </motion.div>
                        <p className="text-gray-600 font-medium text-lg mb-2">Vui lòng chọn ít nhất một cột dữ liệu</p>
                        <p className="text-gray-500 text-sm max-w-md mx-auto">Các cột được chọn từ danh sách bên trái sẽ hiển thị ở đây để bạn có thể xem trước dữ liệu trước khi xuất</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Export file preview */}
                  <motion.div 
                    className="mt-6 bg-gradient-to-br from-white to-blue-50/30 rounded-xl p-5 border border-blue-200/50 shadow-[0_5px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(66,153,225,0.08)] transition-all duration-500 relative overflow-hidden"
                    initial={false}
                    animate={{ height: hasSelectedColumns ? 'auto' : 0, opacity: hasSelectedColumns ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-300/5 to-indigo-300/5 rounded-full blur-xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    
                    {hasSelectedColumns && (
                      <>
                        <h4 className="font-medium text-gray-700 mb-4 flex items-center">
                          <div className="mr-2 p-1.5 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg text-white shadow-md">
                            <File size={16} />
                          </div>
                          <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent font-medium">
                            Thông tin file xuất
                          </span>
                        </h4>
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <motion.div 
                              className="p-3.5 bg-white rounded-lg border border-blue-100/50 transition-all duration-200 group"
                              whileHover={{ 
                                y: -3, 
                                boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
                                borderColor: "rgba(66, 153, 225, 0.3)"
                              }}
                            >
                              <div className="flex items-center">
                                <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg text-blue-500 mr-3 shadow-sm group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300">
                                  {exportFormat === 'pdf' ? 
                                    <FaFilePdf size={16} className={exportFormat === 'pdf' ? 'text-red-500' : 'text-blue-500'} /> : 
                                    <FaFileExcel size={16} className={exportFormat === 'excel' ? 'text-green-500' : 'text-blue-500'} />
                                  }
                                </div>
                                <div>
                                  <div className="text-gray-500 text-xs">Định dạng</div>
                                  <div className="font-medium text-gray-800 group-hover:text-blue-700 transition-colors">
                                    {exportFormat === 'pdf' ? 'PDF Document' : 'Excel Document'}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                            
                            <motion.div 
                              className="p-3.5 bg-white rounded-lg border border-blue-100/50 transition-all duration-200 group"
                              whileHover={{ 
                                y: -3, 
                                boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
                                borderColor: "rgba(66, 153, 225, 0.3)"
                              }}
                            >
                              <div className="flex items-center">
                                <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg text-green-500 mr-3 shadow-sm group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300">
                                  <Hash size={16} />
                                </div>
                                <div>
                                  <div className="text-gray-500 text-xs">Số bản ghi</div>
                                  <div className="font-medium text-gray-800 group-hover:text-blue-700 transition-colors">{data.length}</div>
                                </div>
                              </div>
                            </motion.div>
                            
                            <motion.div 
                              className="p-3.5 bg-white rounded-lg border border-blue-100/50 transition-all duration-200 group"
                              whileHover={{ 
                                y: -3, 
                                boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
                                borderColor: "rgba(66, 153, 225, 0.3)"
                              }}
                            >
                              <div className="flex items-center">
                                <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg text-amber-500 mr-3 shadow-sm group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300">
                                  <Info size={16} />
                                </div>
                                <div>
                                  <div className="text-gray-500 text-xs">Số cột</div>
                                  <div className="font-medium text-gray-800 group-hover:text-blue-700 transition-colors">
                                    {Object.values(selectedColumns).filter(Boolean).length}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          </div>
                          
                          <motion.div 
                            className="p-3.5 bg-white rounded-lg border border-blue-100/50 transition-all duration-200 group"
                            whileHover={{ 
                              y: -3, 
                              boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
                              borderColor: "rgba(66, 153, 225, 0.3)"
                            }}
                          >
                            <div className="flex items-center">
                              <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg text-blue-500 mr-3 shadow-sm group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300">
                                <Calendar size={16} />
                              </div>
                              <div>
                                <div className="text-gray-500 text-xs">Tên file</div>
                                <div className="font-medium text-gray-800 group-hover:text-blue-700 transition-colors truncate max-w-full">
                                  data-export-{new Date().toISOString().split('T')[0]}.
                                  {exportFormat === 'pdf' ? 'pdf' : 'xlsx'}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4 bg-gradient-to-r from-gray-50 to-gray-100">
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
                className="px-6 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-100 transition-colors border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.1)]"
                disabled={isProcessing}
              >
                <span className="flex items-center">
                  <X size={18} className="mr-2" />
                  Hủy bỏ
                </span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleExport}
                className={`px-6 py-3 rounded-xl flex items-center space-x-2 ${
                  hasSelectedColumns 
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white hover:shadow-[0_4px_20px_rgba(66,99,235,0.3)]' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                } shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-all duration-300 relative overflow-hidden`}
                disabled={!hasSelectedColumns || isProcessing}
              >
                {/* Background animation for enabled button */}
                {hasSelectedColumns && !isProcessing && (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                )}
                
                {isProcessing ? (
                  <>
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span className="ml-2 relative z-10">Đang xử lý...</span>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center relative z-10">
                    <Download size={18} className="mr-2" />
                    <span>Xuất dữ liệu</span>
                  </div>
                )}
                
                {/* Glow effect for enabled button */}
                {hasSelectedColumns && !isProcessing && (
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-600 to-blue-500 opacity-30 blur-xl rounded-xl" />
                )}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExportDataModal;