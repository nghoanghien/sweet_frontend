'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Sparkles, AlertCircle } from 'lucide-react';
import CustomDatePicker from './CustomDatePicker';
import SingleSelect from './SingleSelect';
import LoadingOverlay from '@/components/common/LoadingOverlay';

// Placeholder data for dropdowns
const provinces = ["Hà Nội", "TP Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ"];
const districts = {
  "Hà Nội": ["Ba Đình", "Hoàn Kiếm", "Hai Bà Trưng", "Đống Đa", "Tây Hồ"],
  "TP Hồ Chí Minh": ["Quận 1", "Quận 2", "Quận 3", "Quận 4", "Quận 5"],
  "Đà Nẵng": ["Hải Châu", "Thanh Khê", "Sơn Trà", "Ngũ Hành Sơn", "Liên Chiểu"],
  "Hải Phòng": ["Hồng Bàng", "Ngô Quyền", "Lê Chân", "Kiến An", "Hải An"],
  "Cần Thơ": ["Ninh Kiều", "Bình Thủy", "Cái Răng", "Ô Môn", "Thốt Nốt"]
};
const wards = {
  "Ba Đình": ["Phúc Xá", "Trúc Bạch", "Vĩnh Phúc", "Cống Vị", "Liễu Giai"],
  "Quận 1": ["Bến Nghé", "Bến Thành", "Cầu Kho", "Cầu Ông Lãnh", "Đa Kao"],
  "Hải Châu": ["Hải Châu 1", "Hải Châu 2", "Thạch Thang", "Thanh Bình", "Thuận Phước"],
  "Hồng Bàng": ["Hoàng Văn Thụ", "Quang Trung", "Phan Bội Châu", "Phạm Hồng Thái", "Quán Toan"],
  "Ninh Kiều": ["An Hòa", "An Nghiệp", "Cái Khế", "Hưng Lợi", "Tân An"]
};

// Pink color scheme
const colors = {
  primaryPink: '#FF89B0', // Pink Rose
  secondaryPink: '#FFB2CF', // Light pink
  tertiaryPink: '#F06292', // Darker pink
  accentPurple: '#9C27B0', // Purple accent
  lightGray: '#F8F9FA', // Light gray background
  darkText: '#424242', // Dark text
  lightText: '#757575', // Light text
  white: '#FFFFFF', // White
  cardBg: '#FFFFFF', // Card background
  inputBorder: '#FFD6E0', // Input border
  inputFocus: '#FF4081', // Input focus
  gradientStart: '#FF89B0', // Gradient start
  gradientEnd: '#9C27B0', // Gradient end
};

export default function LoginRegistrationForm() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSameAddress, setIsSameAddress] = useState(false);
  const [formSlideDirection, setFormSlideDirection] = useState('');
  const [animateForm, setAnimateForm] = useState(false);
  
  // Form validation states
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  
  // Effect to trigger initial animation
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    setAnimateForm(true);
  }, []);
  
  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    role: 'employee',
    rememberMe: false
  });
  
  // Registration form state
  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    dateOfBirth: '',
    idCard: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'employee',
    permanentAddress: {
      province: '',
      district: '',
      ward: '',
      street: '',
      houseNumber: ''
    },
    contactAddress: {
      province: '',
      district: '',
      ward: '',
      street: '',
      houseNumber: ''
    }
  });
  
  // Available districts and wards based on selected province/district
  const [availableDistricts, setAvailableDistricts] = useState([]);
  const [availableWards, setAvailableWards] = useState([]);
  
  // Contact address districts and wards
  const [contactAvailableDistricts, setContactAvailableDistricts] = useState([]);
  const [contactAvailableWards, setContactAvailableWards] = useState([]);
  
  // Form toggle handler with animation
  const toggleForm = () => {
    setFormSlideDirection(isLogin ? 'slide-left' : 'slide-right');
    setTimeout(() => {
      setIsLogin(!isLogin);
      setFormSlideDirection('');
    }, 300);
  };
  
  // Validation functions
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) ? '' : 'Email không hợp lệ';
  };
  
  const validatePassword = (password) => {
    if (!password) return 'Mật khẩu không được để trống';
    if (password.length < 6) return 'Mật khẩu phải có ít nhất 6 ký tự';
    return '';
  };
  
  const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) return 'Vui lòng xác nhận mật khẩu';
    if (password !== confirmPassword) return 'Mật khẩu không khớp';
    return '';
  };
  
  const validateRequired = (value, fieldName) => {
    return value ? '' : `${fieldName} không được để trống`;
  };
  
  const validatePhone = (phone) => {
    const regex = /^[0-9]{10,11}$/;
    return regex.test(phone) ? '' : 'Số điện thoại không hợp lệ';
  };
  
  const validateIdCard = (idCard) => {
    const regex = /^[0-9]{9,12}$/;
    return regex.test(idCard) ? '' : 'Số CCCD không hợp lệ';
  };
  
  // Handle field blur for validation
  const handleBlur = (e, formType) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [`${formType}.${name}`]: true }));
    
    let errorMessage = '';
    if (name === 'email') {
      errorMessage = validateEmail(value);
    } else if (name === 'password') {
      errorMessage = validatePassword(value);
    } else if (name === 'confirmPassword') {
      errorMessage = validateConfirmPassword(
        formType === 'register' ? registerForm.password : loginForm.password, 
        value
      );
    } else if (name === 'phone') {
      errorMessage = validatePhone(value);
    } else if (name === 'idCard') {
      errorMessage = validateIdCard(value);
    } else if (name === 'fullName') {
      errorMessage = validateRequired(value, 'Họ tên');
    } else if (name === 'dateOfBirth') {
      errorMessage = validateRequired(value, 'Ngày sinh');
    }
    
    setErrors(prev => ({ ...prev, [`${formType}.${name}`]: errorMessage }));
  };
  
  // Get validation class for input fields
  const getValidationClass = (fieldName, formType) => {
    const touchedField = touched[`${formType}.${fieldName}`];
    const errorField = errors[`${formType}.${fieldName}`];
    
    if (!touchedField && !formSubmitted) return '';
    
    if (errorField) {
      return 'border-red-500 bg-red-200 focus:border-red-500 hover:border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.4)] focus:shadow-[0_0_0_2px_rgba(239,68,68,0.4)]';
    }
    
    if (touchedField || formSubmitted) {
      return '';
    }
    
    return '';
  };
  
  // Handle login form change
  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user types and update validation
    let errorMessage = '';
    if (name === 'email') {
      errorMessage = validateEmail(value);
    } else if (name === 'password') {
      errorMessage = validatePassword(value);
    }
    
    // Mark as touched to show validation
    if (!touched[`login.${name}`]) {
      setTouched(prev => ({ ...prev, [`login.${name}`]: true }));
    }
    
    setErrors(prev => ({ ...prev, [`login.${name}`]: errorMessage }));
  };
  
  // Handle registration form change
  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      // Handle nested objects (addresses)
      const [parent, child] = name.split('.');
      setRegisterForm({
        ...registerForm,
        [parent]: {
          ...registerForm[parent],
          [child]: value
        }
      });
      
      // Update available options for districts and wards
      if (parent === 'permanentAddress') {
        if (child === 'province') {
          setAvailableDistricts(districts[value] || []);
          setRegisterForm(prev => ({
            ...prev,
            permanentAddress: {
              ...prev.permanentAddress,
              district: '',
              ward: ''
            }
          }));
        } else if (child === 'district') {
          setAvailableWards(wards[value] || []);
          setRegisterForm(prev => ({
            ...prev,
            permanentAddress: {
              ...prev.permanentAddress,
              ward: ''
            }
          }));
        }
        
        // Update contact address if same as permanent
        if (isSameAddress) {
          setRegisterForm(prev => ({
            ...prev,
            contactAddress: {
              ...prev.permanentAddress,
              [child]: value
            }
          }));
          
          if (child === 'province') {
            setContactAvailableDistricts(districts[value] || []);
          } else if (child === 'district') {
            setContactAvailableWards(wards[value] || []);
          }
        }
      } else if (parent === 'contactAddress') {
        if (child === 'province') {
          setContactAvailableDistricts(districts[value] || []);
          setRegisterForm(prev => ({
            ...prev,
            contactAddress: {
              ...prev.contactAddress,
              district: '',
              ward: ''
            }
          }));
        } else if (child === 'district') {
          setContactAvailableWards(wards[value] || []);
          setRegisterForm(prev => ({
            ...prev,
            contactAddress: {
              ...prev.contactAddress,
              ward: ''
            }
          }));
        }
      }
      
      // Mark the field as touched
      const fieldName = `register.${parent}.${child}`;
      if (!touched[fieldName]) {
        setTouched(prev => ({ ...prev, [fieldName]: true }));
      }
      
    } else {
      // Handle regular form fields
      setRegisterForm({
        ...registerForm,
        [name]: type === 'checkbox' ? checked : value
      });
      
      // Validate as user types
      let errorMessage = '';
      if (name === 'email') {
        errorMessage = validateEmail(value);
      } else if (name === 'password') {
        errorMessage = validatePassword(value);
        
        // Also validate confirmPassword if it's already entered
        if (registerForm.confirmPassword) {
          const confirmError = validateConfirmPassword(value, registerForm.confirmPassword);
          setErrors(prev => ({ ...prev, [`register.confirmPassword`]: confirmError }));
        }
      } else if (name === 'confirmPassword') {
        errorMessage = validateConfirmPassword(registerForm.password, value);
      } else if (name === 'phone') {
        errorMessage = validatePhone(value);
      } else if (name === 'idCard') {
        errorMessage = validateIdCard(value);
      } else if (name === 'fullName') {
        errorMessage = validateRequired(value, 'Họ tên');
      } else if (name === 'dateOfBirth') {
        errorMessage = validateRequired(value, 'Ngày sinh');
      }
      
      // Mark as touched to show validation
      if (!touched[`register.${name}`]) {
        setTouched(prev => ({ ...prev, [`register.${name}`]: true }));
      }
      
      setErrors(prev => ({ ...prev, [`register.${name}`]: errorMessage }));
    }
  };
  
  // Custom date picker change handler
  const handleDateChange = (date) => {
    setRegisterForm(prev => ({
      ...prev,
      dateOfBirth: date
    }));
    
    // Validate and mark as touched
    const errorMessage = validateRequired(date, 'Ngày sinh');
    setErrors(prev => ({ ...prev, [`register.dateOfBirth`]: errorMessage }));
    
    if (!touched[`register.dateOfBirth`]) {
      setTouched(prev => ({ ...prev, [`register.dateOfBirth`]: true }));
    }
  };
  
  // Handle "Same as permanent address" checkbox
  const handleSameAddress = (e) => {
    const { checked } = e.target;
    setIsSameAddress(checked);
    
    if (checked) {
      // Copy permanent address to contact address
      setRegisterForm(prev => ({
        ...prev,
        contactAddress: { ...prev.permanentAddress }
      }));
      setContactAvailableDistricts(availableDistricts);
      setContactAvailableWards(availableWards);
    }
  };
  
  // Handle login submission with validation
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    // Set form as submitted for validation styling
    setFormSubmitted(true);
    
    // Validate all fields
    const validationErrors = {
      'login.email': validateEmail(loginForm.email),
      'login.password': validatePassword(loginForm.password),
    };
    
    setErrors(validationErrors);
    
    // Check if form is valid
    const hasErrors = Object.values(validationErrors).some(error => error !== '');
    
    if (!hasErrors) {
      console.log('Login form submitted:', loginForm);
      // Implement actual login logic here
      // Chuyển hướng đến trang sweet-main sau khi đăng nhập thành công
      router.push('/sweet-main');
    } else {
      // Add shake animation to invalid fields
      const invalidInputs = document.querySelectorAll('.border-red-500');
      invalidInputs.forEach(input => {
        input.classList.add('error-shake');
        setTimeout(() => {
          input.classList.remove('error-shake');
        }, 500);
      });
    }
  };
  
  // Handle registration submission with validation
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    
    // Set form as submitted for validation styling
    setFormSubmitted(true);
    
    // Validate all fields
    const validationErrors = {
      'register.fullName': validateRequired(registerForm.fullName, 'Họ tên'),
      'register.dateOfBirth': validateRequired(registerForm.dateOfBirth, 'Ngày sinh'),
      'register.idCard': validateIdCard(registerForm.idCard),
      'register.email': validateEmail(registerForm.email),
      'register.phone': validatePhone(registerForm.phone),
      'register.password': validatePassword(registerForm.password),
      'register.confirmPassword': validateConfirmPassword(registerForm.password, registerForm.confirmPassword),
    };
    
    setErrors(validationErrors);
    
    // Check if form is valid
    const hasErrors = Object.values(validationErrors).some(error => error !== '');
    
    if (!hasErrors) {
      console.log('Registration form submitted:', registerForm);
      // Implement actual registration logic here
    } else {
      // Add shake animation to invalid fields
      const invalidInputs = document.querySelectorAll('.border-red-500');
      invalidInputs.forEach(input => {
        input.classList.add('error-shake');
        setTimeout(() => {
          input.classList.remove('error-shake');
        }, 500);
      });
      
      // Scroll to first error
      const firstInvalidInput = document.querySelector('.border-red-500');
      if (firstInvalidInput) {
        firstInvalidInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstInvalidInput.focus();
      }
    }
  };
  
  // Error message component
  const ErrorMessage = ({ error, touched, formSubmitted }) => {
    const showError = (error && touched) || (error && formSubmitted);
    
    return (
      <div className={`error-message mt-1 flex items-start text-red-500 text-xs font-medium ${showError ? 'show' : ''}`}>
        {showError && (
          <>
            <AlertCircle className="h-3.5 w-3.5 mr-1 mt-0.5 flex-shrink-0 animate-pulse" />
            <span className="error-text">{error}</span>
          </>
        )}
      </div>
    );
  };
  
  // Valid indicator component
  const ValidIndicator = ({ isValid, touched, formSubmitted }) => {
    const showValid = isValid && (touched || formSubmitted);
    
    return (
      <div className={`valid-indicator absolute right-3.5 top-1/2 transform -translate-y-1/2 ${showValid ? 'show' : ''}`}>
      </div>
    );
  };
  
  return (
    <div className="w-full min-h-screen bg-sky-50 flex items-center justify-center p-4 relative">
      <LoadingOverlay isLoading={isLoading} message='Đang chuyển hướng đăng nhập' />
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#FFB2CF]/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#FFB2CF]/20 to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#F06292]/10 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#9C27B0]/10 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className={`fixed inset-0 pointer-events-none overflow-hidden transition-opacity duration-1000 opacity-100`}>
        {/* Moon Background - với animation chuyển động ngẫu nhiên */}
        <div className="absolute right-1/4 top-1/4 w-32 h-32 md:w-48 md:h-48 bg-pink-300/70 rounded-full blur-sm z-0 animate-float-moon"></div>

        {/* Clouds Animation - với chuyển động ngẫu nhiên liên tục */}
        <div className="absolute inset-0">
          {/* White Clouds */}
          <div className="absolute left-[5%] bottom-[20%] w-64 h-32 bg-white/80 rounded-full blur-md animate-float-random-1"></div>
          <div className="absolute left-[20%] bottom-[30%] w-72 h-40 bg-white/80 rounded-full blur-md animate-float-random-2"></div>
          <div className="absolute right-[25%] bottom-[22%] w-80 h-36 bg-white/80 rounded-full blur-md animate-float-random-3"></div>
          <div className="absolute right-[10%] bottom-[35%] w-64 h-32 bg-white/80 rounded-full blur-md animate-float-random-4"></div>

          {/* Pink Clouds */}
          <div className="absolute left-[5%] bottom-[91%] w-48 h-28 bg-pink-200/60 rounded-full blur-md animate-float-random-5"></div>
          <div className="absolute right-[12%] bottom-[15%] w-56 h-32 bg-pink-200/60 rounded-full blur-md animate-float-random-6"></div>
          <div className="absolute left-[30%] bottom-[45%] w-40 h-24 bg-pink-200/50 rounded-full blur-md animate-float-random-7"></div>
          <div className="absolute right-[75%] bottom-[8%] w-52 h-28 bg-pink-200/50 rounded-full blur-md animate-float-random-8"></div>
        </div>
      </div>
      
      <style jsx global>{`
        .styled-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .styled-scrollbar::-webkit-scrollbar-track {
          background: #FFE6EE;
          border-radius: 10px;
        }
        
        .styled-scrollbar::-webkit-scrollbar-thumb {
          background-color: #FF89B0;
          border-radius: 10px;
        }
        
        .styled-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #F06292;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        /* Enhanced error message animations */
        .error-message {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out, opacity 0.3s ease-out, margin 0.3s ease-out;
          opacity: 0;
          margin-top: 0;
        }
        
        .error-message.show {
          max-height: 60px;
          opacity: 1;
          margin-top: 0.375rem;
        }

        .error-message .error-text {
          position: relative;
          overflow: hidden;
          display: inline-block;
          vertical-align: top;
        }

        .error-message .error-text::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: rgba(239, 68, 68, 0.5);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease-out 0.1s;
        }

        .error-message.show .error-text::after {
          transform: scaleX(1);
        }
        
        /* Enhanced valid indicator animations */
        .valid-indicator {
          opacity: 0;
          transform: scale(0.8) translateY(-50%);
          transition: opacity 0.3s ease-out, transform 0.3s ease-out;
          filter: drop-shadow(0 0 3px rgba(34, 197, 94, 0.4));
        }
        
        .valid-indicator.show {
          opacity: 1;
          transform: scale(1) translateY(-50%);
        }
        
        /* Enhanced error shake animation */
        .error-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        
        @keyframes shake {
          0% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
          100% { transform: translateX(0); }
        }


        /* Focus & hover effects for inputs */
        input:focus, select:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(255, 64, 129, 0.2);
        }

        /* Error focus state */
        input.border-red-500:focus {
          box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.25);
          animation: errorPulse 2s infinite;
        }

        @keyframes errorPulse {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          70% { box-shadow: 0 0 0 4px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }

        /* Valid focus state */
        input.border-green-500:focus {
          box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.25);
        }
        
        /* Date picker animations */
        @keyframes float-random-1 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(10px, -15px); }
          50% { transform: translate(-5px, 10px); }
          75% { transform: translate(-10px, -5px); }
        }
        
        @keyframes float-random-2 {
          0%, 100% { transform: translate(0, 0); }
          20% { transform: translate(-12px, 10px); }
          40% { transform: translate(8px, -12px); }
          60% { transform: translate(-5px, -5px); }
          80% { transform: translate(10px, 8px); }
        }
        
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* SingleSelect Custom Styles */
        /* Customize the SingleSelect component to match the pink theme */
        div[role="combobox"].border-\[\#FFD6E0\] {
          border-color: #FFD6E0;
          background-color: white;
          transition: all 0.3s ease;
        }
        
        div[role="combobox"].border-\[\#FFD6E0\]:hover {
          border-color: #FF4081;
          box-shadow: 0 0 0 1px rgba(255, 64, 129, 0.1);
        }
        
        div[role="combobox"].border-\[\#FFD6E0\].ring-2 {
          border-color: #FF4081;
          box-shadow: 0 0 0 2px rgba(255, 64, 129, 0.2);
        }
        
        /* Customize the dropdown */
        div[role="combobox"] + div div.max-h-96 div:hover {
          background-color: #FFF5F8 !important;
        }
        
        div[role="combobox"] + div div.max-h-96 div.bg-blue-50 {
          background-color: #FFF5F8 !important;
          color: #F06292 !important;
        }
        
        /* Input within SingleSelect */
        div[role="combobox"] + div input {
          border-color: #FFD6E0;
        }
        
        div[role="combobox"] + div input:focus {
          border-color: #FF4081;
          box-shadow: 0 0 0 2px rgba(255, 64, 129, 0.2);
        }
      `}</style>

      <div className={`w-full max-w-5xl bg-white/40 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-700 border border-[#FFD6E0] ${animateForm ? 'animate-fadeIn' : 'opacity-0'}`}>
        {/* Left side - Decorative section with animation */}
        <div className={`w-full md:w-5/12 bg-gradient-to-br from-[#FF89B0] to-[#9C27B0] flex items-center justify-center p-8 transition-all duration-700 relative ${formSlideDirection === 'slide-left' ? 'transform -translate-x-full opacity-0' : formSlideDirection === 'slide-right' ? 'transform translate-x-full opacity-0' : 'opacity-100'}`}>
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/30 blur-xl animate-pulse-slow"></div>
            <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white/20 blur-xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/4 w-20 h-20 rounded-full bg-white/40 blur-md animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
            
            {/* Abstract shapes */}
            <div className="absolute top-[15%] right-[20%] w-12 h-12 rounded-full border-4 border-white/30 animate-float" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-[25%] left-[15%] w-8 h-8 rounded-full bg-white/20 animate-float" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute top-[60%] right-[10%] w-16 h-3 bg-white/20 rounded-full animate-float" style={{ animationDelay: '2.5s' }}></div>
            <div className="absolute bottom-[10%] left-[30%] w-3 h-16 bg-white/20 rounded-full animate-float" style={{ animationDelay: '3.5s' }}></div>
          </div>

          {isLogin ? (
            <div className="w-full space-y-6 relative z-10 transition-all duration-500 text-center">
              <div className="relative inline-block">
                <Sparkles className="h-12 w-12 text-white mx-auto mb-6 animate-float" />
                <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white/30 animate-pulse-slow"></div>
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">Sweet xin chào!</h2>
              <p className="text-pink-100 text-lg">Bạn chưa có tài khoản?</p>
              <button 
                onClick={toggleForm}
                className="px-8 py-3 mt-4 bg-white text-[#F06292] rounded-full font-medium hover:bg-pink-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0"
              >
                Đăng Ký Ngay
              </button>
            </div>
          ) : (
            <div className="w-full space-y-6 relative z-10 transition-all duration-500 text-center">
              <div className="relative inline-block">
                <Sparkles className="h-12 w-12 text-white mx-auto mb-6 animate-float" />
                <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white/30 animate-pulse-slow"></div>
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">Sweet xin chào!</h2>
              <p className="text-pink-100 text-lg">Bạn đã có tài khoản?</p>
              <button 
                onClick={toggleForm}
                className="px-8 py-3 mt-4 bg-white text-[#F06292] rounded-full font-medium hover:bg-pink-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0"
              >
                Đăng Nhập Ngay
              </button>
            </div>
          )}
        </div>
        
        {/* Right side - Form section with animation */}
        <div className={`w-full md:w-7/12 p-8 md:p-10 transition-all duration-700 bg-black/5 backdrop-blur-md ${formSlideDirection === 'slide-left' ? 'transform translate-x-full opacity-0' : formSlideDirection === 'slide-right' ? 'transform -translate-x-full opacity-0' : 'opacity-100'}`}>
          {isLogin ? (
            <div className="space-y-6 transition-all duration-500">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[#F06292] mb-2">Chào mừng quay trở lại!</h2>
              </div>
              
              <form noValidate onSubmit={handleLoginSubmit} className="space-y-5 md:px-16">
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-gray-500 font-medium text-sm">
                    Địa chỉ Email
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={loginForm.email}
                      onChange={handleLoginChange}
                      onBlur={(e) => handleBlur(e, 'login')}
                      className={`w-full px-4 py-3 bg-white border-2 border-[#FFD6E0] rounded-xl focus:outline-none focus:border-[#FF4081] transition-all duration-300 shadow-sm group-hover:border-[#F06292] ${getValidationClass('email', 'login')}`}
                      placeholder="example@email.com"
                      required
                    />
                  </div>
                  <ErrorMessage 
                    error={errors['login.email']} 
                    touched={touched['login.email']} 
                    formSubmitted={formSubmitted}
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label htmlFor="password" className="block text-gray-500 font-medium text-sm">
                    Mật khẩu
                  </label>
                  <div className="relative group">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={loginForm.password}
                      onChange={handleLoginChange}
                      onBlur={(e) => handleBlur(e, 'login')}
                      className={`w-full px-4 py-3 bg-white border-2 border-[#FFD6E0] rounded-xl focus:outline-none focus:border-[#FF4081] transition-all duration-300 shadow-sm group-hover:border-[#F06292] ${getValidationClass('password', 'login')}`}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#F06292]"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    <ValidIndicator 
                      isValid={!errors['login.password']} 
                      touched={touched['login.password']} 
                      formSubmitted={formSubmitted}
                    />
                  </div>
                  <ErrorMessage 
                    error={errors['login.password']} 
                    touched={touched['login.password']} 
                    formSubmitted={formSubmitted}
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="block text-gray-500 font-medium text-sm">
                    Bạn là:
                  </label>
                  <div className="flex space-x-6 mt-1">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="role"
                        value="employee"
                        checked={loginForm.role === "employee"}
                        onChange={handleLoginChange}
                        className="w-4 h-4 text-[#FF4081] focus:ring-[#FF89B0] border-[#FFD6E0]"
                      />
                      <span className="ml-2 text-[#424242]">Khách Hàng</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="role"
                        value="admin"
                        checked={loginForm.role === "admin"}
                        onChange={handleLoginChange}
                        className="w-4 h-4 text-[#FF4081] focus:ring-[#FF89B0] border-[#FFD6E0]"
                      />
                      <span className="ml-2 text-[#424242]">Quản Trị Viên</span>
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    
                  </label>
                  <a href="#" className="text-sm text-[#F06292] hover:text-[#9C27B0] transition-colors font-medium">
                    Forgot password?
                  </a>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-[#FF89B0] to-[#FF4081] text-white rounded-full font-medium shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#F06292] focus:ring-opacity-50 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 mt-2"
                >
                  Đăng nhập
                </button>
                
                <div className="relative flex items-center justify-center mt-2">
                  <div className="flex-grow border-t border-[#FFD6E0]"></div>
                  <span className="flex-shrink mx-4 text-[#9C27B0]">hoặc</span>
                  <div className="flex-grow border-t border-[#FFD6E0]"></div>
                </div>
                
                <button
                  type="button"
                  className="w-full py-3 px-4 bg-white border-2 border-[#FFD6E0] rounded-full text-[#424242] flex items-center justify-center hover:bg-[#FFF5F8] transition-all duration-300 shadow-sm"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Log in with Google
                </button>
              </form>
              
              <div className="text-center mt-6">
                <p className="text-sm text-[#757575]">
                  Don't have an account?{" "}
                  <button
                    onClick={toggleForm}
                    className="text-[#F06292] hover:text-[#9C27B0] transition-colors font-medium"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-5 max-h-[500px] overflow-y-auto pr-2 transition-all duration-500 styled-scrollbar">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-pink-500 mb-2">Tạo tài khoản mới</h2>
              </div>
              
              <form onSubmit={handleRegisterSubmit} className="space-y-5 md:px-12">
                <div className="space-y-1.5">
                  <label htmlFor="fullName" className="block text-gray-500 font-medium text-sm">
                    Họ tên
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={registerForm.fullName}
                      onChange={handleRegisterChange}
                      onBlur={(e) => handleBlur(e, 'register')}
                      className={`w-full px-4 py-3 bg-white border-2 border-[#FFD6E0] rounded-xl focus:outline-none focus:border-[#FF4081] transition-all duration-300 shadow-sm hover:border-[#F06292] ${getValidationClass('fullName', 'register')}`}
                      placeholder="Nhập họ tên của bạn..."
                      required
                    />
                    <ValidIndicator 
                      isValid={!errors['register.fullName']} 
                      touched={touched['register.fullName']} 
                      formSubmitted={formSubmitted}
                    />
                  </div>
                  <ErrorMessage 
                    error={errors['register.fullName']} 
                    touched={touched['register.fullName']} 
                    formSubmitted={formSubmitted}
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label htmlFor="dateOfBirth" className="block text-gray-500 font-medium text-sm">
                    Ngày sinh
                  </label>
                  <CustomDatePicker
                    value={registerForm.dateOfBirth}
                    onChange={handleDateChange}
                    className={`${getValidationClass('dateOfBirth', 'register')} border-[#FFD6E0] hover:border-[#F06292] focus:border-[#FF4081]`}
                  />
                  <ErrorMessage 
                    error={errors['register.dateOfBirth']} 
                    touched={touched['register.dateOfBirth']} 
                    formSubmitted={formSubmitted}
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label htmlFor="idCard" className="block text-gray-500 font-medium text-sm">
                    Số căn cước công dân (CCCD)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="idCard"
                      name="idCard"
                      value={registerForm.idCard}
                      onChange={handleRegisterChange}
                      onBlur={(e) => handleBlur(e, 'register')}
                      className={`w-full px-4 py-3 bg-white border-2 border-[#FFD6E0] rounded-xl focus:outline-none focus:border-[#FF4081] transition-all duration-300 shadow-sm hover:border-[#F06292] ${getValidationClass('idCard', 'register')}`}
                      placeholder="Nhập số CCCD của bạn..."
                      required
                    />
                    <ValidIndicator 
                      isValid={!errors['register.idCard']} 
                      touched={touched['register.idCard']} 
                      formSubmitted={formSubmitted}
                    />
                  </div>
                  <ErrorMessage 
                    error={errors['register.idCard']} 
                    touched={touched['register.idCard']} 
                    formSubmitted={formSubmitted}
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-gray-500 font-medium text-sm">
                    Địa chỉ email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="registerEmail"
                      name="email"
                      value={registerForm.email}
                      onChange={handleRegisterChange}
                      onBlur={(e) => handleBlur(e, 'register')}
                      className={`w-full px-4 py-3 bg-white border-2 border-[#FFD6E0] rounded-xl focus:outline-none focus:border-[#FF4081] transition-all duration-300 shadow-sm hover:border-[#F06292] ${getValidationClass('email', 'register')}`}
                      placeholder="Nhập địa chỉ Email liên hệ..."
                      required
                    />
                    <ValidIndicator 
                      isValid={!errors['register.email']} 
                      touched={touched['register.email']} 
                      formSubmitted={formSubmitted}
                    />
                  </div>
                  <ErrorMessage 
                    error={errors['register.email']} 
                    touched={touched['register.email']} 
                    formSubmitted={formSubmitted}
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="block text-gray-500 font-medium text-sm">
                    Số điện thoại liên hệ
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={registerForm.phone}
                      onChange={handleRegisterChange}
                      onBlur={(e) => handleBlur(e, 'register')}
                      className={`w-full px-4 py-3 bg-white border-2 border-[#FFD6E0] rounded-xl focus:outline-none focus:border-[#FF4081] transition-all duration-300 shadow-sm hover:border-[#F06292] ${getValidationClass('phone', 'register')}`}
                      placeholder="Nhập số điện thoại liên hệ..."
                      required
                    />
                    <ValidIndicator 
                      isValid={!errors['register.phone']} 
                      touched={touched['register.phone']} 
                      formSubmitted={formSubmitted}
                    />
                  </div>
                  <ErrorMessage 
                    error={errors['register.phone']} 
                    touched={touched['register.phone']} 
                    formSubmitted={formSubmitted}
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label htmlFor="registerPassword" className="block text-gray-500 font-medium text-sm">
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="registerPassword"
                      name="password"
                      value={registerForm.password}
                      onChange={handleRegisterChange}
                      onBlur={(e) => handleBlur(e, 'register')}
                      className={`w-full px-4 py-3 bg-white border-2 border-[#FFD6E0] rounded-xl focus:outline-none focus:border-[#FF4081] transition-all duration-300 shadow-sm hover:border-[#F06292] ${getValidationClass('password', 'register')}`}
                      required
                      placeholder="Nhập mật khẩu..."
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#F06292]"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    <ValidIndicator 
                      isValid={!errors['register.password']} 
                      touched={touched['register.password']} 
                      formSubmitted={formSubmitted}
                    />
                  </div>
                  <ErrorMessage 
                    error={errors['register.password']} 
                    touched={touched['register.password']} 
                    formSubmitted={formSubmitted}
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label htmlFor="confirmPassword" className="block text-gray-500 font-medium text-sm">
                    Xác nhận mật khẩu 
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={registerForm.confirmPassword}
                      onChange={handleRegisterChange}
                      onBlur={(e) => handleBlur(e, 'register')}
                      className={`w-full px-4 py-3 bg-white border-2 border-[#FFD6E0] rounded-xl focus:outline-none focus:border-[#FF4081] transition-all duration-300 shadow-sm hover:border-[#F06292] ${getValidationClass('confirmPassword', 'register')}`}
                      required
                      placeholder="Xác nhận mật khẩu..."
                    />
                    <ValidIndicator 
                      isValid={!errors['register.confirmPassword']} 
                      touched={touched['register.confirmPassword']} 
                      formSubmitted={formSubmitted}
                    />
                  </div>
                  <ErrorMessage 
                    error={errors['register.confirmPassword']} 
                    touched={touched['register.confirmPassword']} 
                    formSubmitted={formSubmitted}
                  />
                </div>
                
                {/* Permanent Address */}
                <div className="space-y-2.5 border-t-2 border-gray-300 pt-4 mt-6">
                  <h3 className="block text-pink-500 text-lg bg font-medium text-base">Địa chỉ thường trú</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative w-full mb-4">
                      <label className="block text-gray-500 font-medium mb-1.5 text-sm">
                        Tỉnh/Thành phố
                      </label>
                      <SingleSelect
                        options={provinces}
                        placeholder="Tỉnh/thành phố"
                        value={registerForm.permanentAddress.province}
                        onChange={(selectedOption) => {
                          handleRegisterChange({
                            target: { 
                              name: 'permanentAddress.province', 
                              value: selectedOption 
                            }
                          });
                        }}
                        className="border-2 border-[#FFD6E0] hover:border-[#FF4081]"
                        containerClassName="mb-0"
                        dropdownClassName="border-2 border-[#FFD6E0] shadow-xl backdrop-blur-md bg-white/95"
                        optionClassName="hover:bg-[#FFF5F8] transition-colors duration-200"
                      />
                    </div>
                    
                    <div className="relative w-full mb-4">
                      <label className="block text-gray-500 font-medium mb-1.5 text-sm">
                        Quận/Huyện
                      </label>
                      <SingleSelect
                        options={availableDistricts}
                        placeholder="Quận/Huyện"
                        value={registerForm.permanentAddress.district}
                        onChange={(selectedOption) => {
                          handleRegisterChange({
                            target: { 
                              name: 'permanentAddress.district', 
                              value: selectedOption 
                            }
                          });
                        }}
                        className="border-2 border-[#FFD6E0] hover:border-[#FF4081]"
                        containerClassName="mb-0"
                        dropdownClassName="border-2 border-[#FFD6E0] shadow-xl backdrop-blur-md bg-white/95"
                        optionClassName="hover:bg-[#FFF5F8] transition-colors duration-200"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative w-full mb-4">
                      <label className="block text-gray-500 font-medium mb-1.5 text-sm">
                        Phường/Xã
                      </label>
                      <SingleSelect
                        options={availableWards}
                        placeholder="Phường/xã"
                        value={registerForm.permanentAddress.ward}
                        onChange={(selectedOption) => {
                          handleRegisterChange({
                            target: { 
                              name: 'permanentAddress.ward', 
                              value: selectedOption 
                            }
                          });
                        }}
                        className="border-2 border-[#FFD6E0] hover:border-[#FF4081]"
                        containerClassName="mb-0"
                        dropdownClassName="border-2 border-[#FFD6E0] shadow-xl backdrop-blur-md bg-white/95"
                        optionClassName="hover:bg-[#FFF5F8] transition-colors duration-200"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="block text-gray-500 font-medium text-sm">
                        Tên đường
                      </label>
                      <input
                        type="text"
                        name="permanentAddress.street"
                        value={registerForm.permanentAddress.street}
                        onChange={handleRegisterChange}
                        onBlur={(e) => handleBlur(e, 'register')}
                        className={`w-full px-4 py-3 bg-white border-2 border-[#FFD6E0] rounded-xl focus:outline-none focus:border-[#FF4081] transition-all duration-300 shadow-sm hover:border-[#F06292] ${getValidationClass('street', 'register')}`}
                        placeholder="Nhập tên đường..."
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="block text-gray-500 font-medium text-sm">
                      Số nhà
                    </label>
                    <input
                      type="text"
                      name="permanentAddress.houseNumber"
                      value={registerForm.permanentAddress.houseNumber}
                      onChange={handleRegisterChange}
                      onBlur={(e) => handleBlur(e, 'register')}
                      className={`w-full px-4 py-3 bg-white border-2 border-[#FFD6E0] rounded-xl focus:outline-none focus:border-[#FF4081] transition-all duration-300 shadow-sm hover:border-[#F06292] ${getValidationClass('houseNumber', 'register')}`}
                      placeholder="Nhập số nhà..."
                    />
                  </div>
                </div>
                
                {/* Same Address Option */}
                <div className="flex items-center mt-4">
                  <input
                    type="checkbox"
                    id="sameAddress"
                    checked={isSameAddress}
                    onChange={handleSameAddress}
                    className="w-4 h-4 text-[#FF4081] focus:ring-[#FF89B0] border-[#FFD6E0] rounded"
                  />
                  <label htmlFor="sameAddress" className="ml-2 text-sm text-[#424242]">
                    Địa chỉ liên hệ giống với địa chỉ thường trú
                  </label>
                </div>
                
                {/* Contact Address (visible only if not same as permanent) */}
                {!isSameAddress && (
                  <div className="space-y-2.5 border-t border-[#FFD6E0] pt-4 mt-4">
                    <h3 className="block text-[#F06292] font-medium text-base">Địa chỉ liên hệ</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative w-full mb-4">
                        <label className="block text-gray-500 font-medium mb-1.5 text-sm">
                          Tỉnh/Thành phố
                        </label>
                        <SingleSelect
                          options={provinces}
                          placeholder="Tỉnh/Thành phố"
                          value={registerForm.contactAddress.province}
                          onChange={(selectedOption) => {
                            handleRegisterChange({
                              target: { 
                                name: 'contactAddress.province', 
                                value: selectedOption 
                              }
                            });
                          }}
                          className="border-2 border-[#FFD6E0] hover:border-[#FF4081]"
                          containerClassName="mb-0"
                          dropdownClassName="border-2 border-[#FFD6E0] shadow-xl backdrop-blur-md bg-white/95"
                          optionClassName="hover:bg-[#FFF5F8] transition-colors duration-200"
                        />
                      </div>
                      
                      <div className="relative w-full mb-4">
                        <label className="block text-gray-500 font-medium mb-1.5 text-sm">
                          Quận/Huyện
                        </label>
                        <SingleSelect
                          options={contactAvailableDistricts}
                          placeholder="Quận/Huyện"
                          value={registerForm.contactAddress.district}
                          onChange={(selectedOption) => {
                            handleRegisterChange({
                              target: { 
                                name: 'contactAddress.district', 
                                value: selectedOption 
                              }
                            });
                          }}
                          className="border-2 border-[#FFD6E0] hover:border-[#FF4081]"
                          containerClassName="mb-0"
                          dropdownClassName="border-2 border-[#FFD6E0] shadow-xl backdrop-blur-md bg-white/95"
                          optionClassName="hover:bg-[#FFF5F8] transition-colors duration-200"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative w-full mb-4">
                        <label className="block text-gray-500 font-medium mb-1.5 text-sm">
                          Phường/Xã
                        </label>
                        <SingleSelect
                          options={contactAvailableWards}
                          placeholder="Phường/Xã"
                          value={registerForm.contactAddress.ward}
                          onChange={(selectedOption) => {
                            handleRegisterChange({
                              target: { 
                                name: 'contactAddress.ward', 
                                value: selectedOption 
                              }
                            });
                          }}
                          className="border-2 border-[#FFD6E0] hover:border-[#FF4081]"
                          containerClassName="mb-0"
                          dropdownClassName="border-2 border-[#FFD6E0] shadow-xl backdrop-blur-md bg-white/95"
                          optionClassName="hover:bg-[#FFF5F8] transition-colors duration-200"
                        />
                      </div>
                      
                      <div className="space-y-1.5">
                        <label className="block text-gray-500 font-medium text-sm">
                          Tên Đường
                        </label>
                        <input
                          type="text"
                          name="contactAddress.street"
                          value={registerForm.contactAddress.street}
                          onChange={handleRegisterChange}
                          onBlur={(e) => handleBlur(e, 'register')}
                          className={`w-full px-4 py-3 bg-white border-2 border-[#FFD6E0] rounded-xl focus:outline-none focus:border-[#FF4081] transition-all duration-300 shadow-sm hover:border-[#F06292] ${getValidationClass('street', 'register')}`}
                          placeholder="Nhập tên đường..."
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="block text-gray-500 font-medium text-sm">
                        Số nhà
                      </label>
                      <input
                        type="text"
                        name="contactAddress.houseNumber"
                        value={registerForm.contactAddress.houseNumber}
                        onChange={handleRegisterChange}
                        onBlur={(e) => handleBlur(e, 'register')}
                        className={`w-full px-4 py-3 bg-white border-2 border-[#FFD6E0] rounded-xl focus:outline-none focus:border-[#FF4081] transition-all duration-300 shadow-sm hover:border-[#F06292] ${getValidationClass('houseNumber', 'register')}`}
                        placeholder="Nhập số nhà..."
                      />
                    </div>
                  </div>
                )}
                
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-[#FF89B0] to-[#FF4081] text-white rounded-xl font-medium shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#F06292] focus:ring-opacity-50 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 mt-6"
                >
                  Đăng ký
                </button>
              </form>
              
              <div className="text-center mt-6">
                <p className="text-sm text-[#757575]">
                  Bạn đã có tài khoản?{" "}
                  <button
                    onClick={toggleForm}
                    className="text-[#F06292] hover:text-[#9C27B0] transition-colors font-medium"
                  >
                    Đăng nhập
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}