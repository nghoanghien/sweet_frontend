"use client";

import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Menu, Phone, X, Percent, Calendar, CreditCard, PiggyBank, TrendingUp, ShieldCheck, CloudSun, Star, Award, Users, Zap, Gift, Play, Maximize2, Heart, ArrowUp, Rocket } from 'lucide-react';
import { FaPlus, FaUser } from "react-icons/fa";

// Tạo component chính
export default function SweetLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showCardSection, setShowCardSection] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showInterestSection, setShowInterestSection] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const featuresRef = useRef(null);
  const cardSectionRef = useRef(null);
  const homeRef = useRef(null);
  const interestRef = useRef(null);

  const scrollToFeatures = () => {
    const navHeight = 60; // Chiều cao của thanh điều hướng cố định
    const featuresTop = featuresRef.current?.getBoundingClientRect().top + window.scrollY;
    
    window.scrollTo({
      top: featuresTop - navHeight,
      behavior: "smooth"
    });
    
    setActiveSection("features");
  };

  const scrollToCardSection = () => {
    const navHeight = 60; // Chiều cao của thanh điều hướng cố định
    const cardSectionTop = cardSectionRef.current?.getBoundingClientRect().top + window.scrollY;
    
    window.scrollTo({
      top: cardSectionTop - navHeight,
      behavior: "smooth"
    });
    
    setActiveSection("products");
  };

  const scrollToInterest = () => {
    const navHeight = 60; // Chiều cao của thanh điều hướng cố định
    const interestTop = interestRef.current?.getBoundingClientRect().top + window.scrollY;
    
    window.scrollTo({
      top: interestTop - navHeight,
      behavior: "smooth"
    });
    
    setActiveSection("interest");
  };

  const scrollToHome = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    setActiveSection("home");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    setActiveSection("home");
  };

  useEffect(() => {
    // Hiệu ứng tải trang
    const pageLoadTimer = setTimeout(() => {
      setPageLoaded(true);
    }, 100);

    // Hiệu ứng xuất hiện ban đầu của các element khác
    const initialAnimationTimer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1800);

    // Theo dõi vị trí cuộn trang
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      setScrollPosition(currentPosition);

      // Hiện nút scroll to top khi cuộn xuống đủ xa
      if (currentPosition > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Xác định section đang active dựa trên vị trí scroll
      const navHeight = 70; // Chiều cao của thanh điều hướng + một khoảng đệm nhỏ
      const homeHeight = homeRef.current?.offsetHeight || 0;
      const featuresTop = featuresRef.current?.getBoundingClientRect().top + window.scrollY - navHeight;
      const productsTop = cardSectionRef.current?.getBoundingClientRect().top + window.scrollY - navHeight;
      const interestTop = interestRef.current?.getBoundingClientRect().top + window.scrollY - navHeight;
      
      if (currentPosition > productsTop - 100) {
        if (activeSection !== "products") setActiveSection("products");
      } else if (currentPosition > interestTop - 100) {
        if (activeSection !== "interest") setActiveSection("interest");
      } else if (currentPosition > featuresTop - 100) {
        if (activeSection !== "features") setActiveSection("features");
      } else {
        if (activeSection !== "home") setActiveSection("home");
      }

      // Hiện phần features khi cuộn đến vị trí thích hợp
      if (featuresRef.current) {
        const featuresTop = featuresRef.current.getBoundingClientRect().top;
        if (featuresTop < window.innerHeight * 0.75) {
          setShowFeatures(true);
        }
      }
      
      // Hiện phần card section khi cuộn đến vị trí thích hợp
      if (cardSectionRef.current) {
        const cardSectionTop = cardSectionRef.current.getBoundingClientRect().top;
        if (cardSectionTop < window.innerHeight * 0.75) {
          setShowCardSection(true);
        }
      }

      // Check if interest section is visible
      if (interestRef.current) {
        const interestTop = interestRef.current.getBoundingClientRect().top;
        if (interestTop < window.innerHeight * 0.75) {
          setShowInterestSection(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(pageLoadTimer);
      clearTimeout(initialAnimationTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Tính toán hiệu ứng dựa trên vị trí cuộn
  const rocketBaseY = 0;
  const rocketFlyDistance = scrollPosition * 0.5;
  const rocketOpacity = Math.max(0, 1 - scrollPosition / 500);
  const rocketRotation = Math.min(15, scrollPosition * 0.03);

  const smokeBaseScale = 1;
  const smokeScrollScale = scrollPosition / 120;
  const smokeScale = Math.min(5, smokeBaseScale + smokeScrollScale);
  const smokeOpacity = Math.max(0, 1 - scrollPosition / 400);
  const smokeFlyDistance = scrollPosition * 0.15;
  
  // Hiệu ứng parallax cho các box trong grid
  const calculateParallax = (speed = 0.03) => {
    return Math.min(30, scrollPosition * speed);
  };

  return (
    <div className="relative pt-20 w-full min-h-screen overflow-x-hidden bg-sky-50">
      {/* Page Load Animation Overlay (Cloud-inspired) */}
      <div
        className={`fixed inset-0 bg-gradient-to-b from-sky-300 via-pink-200 to-transparent origin-top transform transition-transform duration-[1500ms] ease-in-out ${pageLoaded ? 'scale-y-0' : 'scale-y-100'
          } z-[100] flex items-center justify-center pointer-events-none`}
      >
        {!pageLoaded && (
          <div className="text-pink-500 opacity-80 animate-pulse-slow">
            <CloudSun size={72} strokeWidth={1.5} />
          </div>
        )}
      </div>

      {/* Scroll-to-top button */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-pink-500 to-rose-400 rounded-full shadow-lg group transition-all duration-500 ${showScrollTop ? 'opacity-100 translate-y-0 animate-bounce' : 'opacity-0 translate-y-12 pointer-events-none'}`}
        
      >
        <div className="absolute inset-0 rounded-full animate-pulse-ring opacity-0 group-hover:opacity-70"></div>
        <div className="relative w-8 h-8 flex items-center justify-center">
          <div className="absolute inset-0 bg-white/20 rounded-full transform scale-0 group-hover:scale-100 transition-all duration-300"></div>
          <ArrowUp size={20} className="text-white transform group-hover:scale-110 transition-all duration-300" />
        </div>
        
        
        <span className="absolute right-full mr-2 whitespace-nowrap bg-white/90 border border-pink-500 text-pink-600 text-sm font-medium px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transform translate-x-4 -translate-y-8 group-hover:-translate-x-0 transition-all duration-300">
          Lên đầu trang
        </span>
      </button>

      {/* Cloud and Moon animation container */}
      <div className={`fixed inset-0 pointer-events-none overflow-hidden transition-opacity duration-1000 ${animationComplete ? 'opacity-100' : 'opacity-0'}`}>
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

      {/* Pink Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-sky-50 to-pink-200 -z-10"></div>

      {/* Navbar */}
      <nav className={`fixed top-5 left-1/2 transform -translate-x-1/2 w-[55%] z-20 flex justify-between items-center px-3 py-2 bg-pink-300/20 backdrop-blur-lg rounded-full shadow-xl transition-all duration-1000 delay-500 ${animationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
      <div className="flex items-center p-2 border border-pink-600 rounded-full gap-2">
        
        <div className="relative w-7 h-7 transform rotate-45 rounded-md flex items-center justify-center hover:rotate-90 transition-all duration-300">
          <div className="absolute inset-0 rounded-md" style={{ background: 'linear-gradient(135deg, #e91e63, #c2185b)' }}></div>
          <div className="absolute inset-[3px] rounded-md bg-gradient-to-br from-pink-200 to-pink-300 shadow-lg"></div>
          <div className="absolute inset-[6px] rounded-md bg-white"></div>
          <svg className="absolute inset-0 m-auto w-5 h-5 transform -rotate-45 hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="#d81b60" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 1v22"></path>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        </div>
        <div className="text-xl font-light text-pink-600">Sweet</div>
      </div>

        {/* Desktop Menu */}
        <div className="hidden absolute left-1/2 transform -translate-x-1/2 md:flex items-center space-x-6">
          <NavItem text="Trang Chủ" active={activeSection === "home"} onClick={scrollToHome} />
          <NavItem text="Tính Năng" active={activeSection === "features"} onClick={scrollToFeatures} />
          <NavItem text="Lãi Suất" active={activeSection === "interest"} onClick={scrollToInterest} />
          <NavItem text="Sản Phẩm" active={activeSection === "products"} onClick={scrollToCardSection} />
        </div>

        {/* Contact Button */}
        <div className="hidden md:flex items-center">
          <button className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-400 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:bg-pink-700 hover:shadow-lg transform hover:-translate-y-1">
            <FaUser size={16} />
            <span>Đăng Nhập</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-full hover:bg-pink-100 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-30 bg-white transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu} className="p-2 hover:bg-pink-100 rounded-full">
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col items-center space-y-6 p-8">
          <MobileNavItem text="Trang Chủ" active={activeSection === "home"} onClick={() => { toggleMenu(); scrollToHome(); }} />
          <MobileNavItem text="Tính Năng" active={activeSection === "features"} onClick={() => { toggleMenu(); scrollToFeatures(); }} />
          <MobileNavItem text="Lãi Suất" active={activeSection === "interest"} onClick={() => { toggleMenu(); scrollToInterest(); }} />
          <MobileNavItem text="Sản Phẩm" active={activeSection === "products"} onClick={() => { toggleMenu(); scrollToCardSection(); }} />
          <MobileNavItem text="Câu Chuyện" active={false} onClick={toggleMenu} />
          <button className="mt-6 flex items-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-pink-700 w-full justify-center">
            <Phone size={18} />
            <span>Liên Hệ Ngay</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <main 
        ref={homeRef}
        className={`relative z-10 flex flex-col items-center justify-center px-6 py-20 md:py-16 text-center transition-all duration-1000 delay-700 ${animationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="mb-6 translate-y-6 text-lg text-pink-700 font-normal">
          Khám phá tương lai tài chính cùng <span className="text-pink-600 text-4xl font-bold">Sweet</span>
        </div>
        <div className='pr-[570px] translate-y-4'>
          <div className="relative w-7 h-7 transform rotate-45 rounded-md flex items-center justify-center hover:rotate-90 transition-all duration-300">
            <div className="absolute inset-0 rounded-md" style={{ background: 'linear-gradient(135deg, #e91e63, #c2185b)' }}></div>
            <div className="absolute inset-[3px] rounded-md bg-gradient-to-br from-pink-200 to-pink-300 shadow-lg"></div>
            <div className="absolute inset-[6px] rounded-md bg-white"></div>
            <svg className="absolute inset-0 m-auto w-5 h-5 transform -rotate-45 hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="#d81b60" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1v22"></path>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
        </div>
        

        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 max-w-4xl leading-tight">
          Tiết Kiệm Dễ Dàng
          <br />
          <span className="text-pink-600">
            Vững Vàng Tương Lai!
          </span>
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mb-12">
          Giải pháp tiết kiệm hiện đại giúp bạn tối ưu hóa tài chính cá nhân với lãi suất cạnh tranh và công nghệ bảo mật hàng đầu
        </p>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <button className="group flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-black hover:shadow-xl transform hover:-translate-y-1">
            <span>Bắt Đầu Tiết Kiệm</span>
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>

          <button className="flex items-center gap-2 bg-white/80 backdrop-blur-sm text-gray-800 px-8 py-4 rounded-full font-medium border border-gray-200 transition-all duration-300 hover:bg-white hover:shadow-lg transform hover:-translate-y-1">
            Khám Phá Lợi Ích
          </button>
        </div>
      </main>

      {/* Rocket Animation - với hiệu ứng fade và bay lên khi cuộn */}
      <div
        className="fixed bottom-0 left-1/2 w-24 h-60 z-10 transition-all duration-300 ease-out md:bottom-[-90px]" // Thêm md:bottom-[-60px] để hạ thấp tên lửa trên desktop
        style={{
          opacity: rocketOpacity,
          transform: `translateX(-50%) translateY(${rocketBaseY - rocketFlyDistance}px) rotate(${rocketRotation}deg)`,
          display: scrollPosition > 800 ? 'none' : 'block'
        }}
      >
        <RocketModified /> {/* Sử dụng component tên lửa đã sửa đổi */}
      </div>

      {/* Smoke Animation - với hiệu ứng mở rộng, bay lên và mờ dần khi cuộn */}
      <div
        className="fixed bottom-[-20px] left-1/2 w-32 h-40 z-0 transition-all duration-300 ease-out md:bottom-[-80px]" // Thêm md:bottom-[-80px] để hạ thấp khói trên desktop
        style={{
          transform: `translateX(-50%) translateY(${smokeFlyDistance}px) scale(${smokeScale})`,
          opacity: smokeOpacity,
          display: scrollPosition > 700 ? 'none' : 'block'
        }}
      >
        <Smoke />
      </div>


      {/* Features Section - inspired by the image */}
      <section
        ref={featuresRef}
        className="relative mt-24 mx-24 md:mt-32 p-12 pt-20 pb-12 bg-black/5 backdrop-blur-xl rounded-[60px] shadow-2xl min-h-screen z-[5]"
      >
        <div className="container mx-auto px-4 sm:px-6">
          {/* Features Grid Layout */}
          <div className="grid grid-cols-12 grid-rows-9 gap-4 md:gap-x-6 md: gap-y-8 h-auto lg:h-[90vh]">
            {/* Box 1 - Financial experts (Stat Card) */}
            <div className="col-span-12 sm:col-span-6 md:col-span-4 row-span-5 lg:col-span-4 lg:row-span-5 transition-all duration-700 hover:scale-[1.02]">
              <div className={`bg-gray-100 rounded-3xl p-4 shadow-lg relative overflow-hidden h-full transition-all duration-700 delay-100 ${showFeatures ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} group hover:shadow-2xl cursor-pointer`}
                style={{
                  backgroundImage: `url('/images/green-1.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transform: `translateY(-${calculateParallax(0.02)}px)`
                }}>

                {/* Overlay with blur effect */}
                <div className="absolute border border-green-200 top-10 right-48 bottom-48 left-10 rounded-3xl backdrop-blur-md bg-white/15 z-0 transition-all duration-500 group-hover:bg-white/25"></div>
                
                {/* Content */}
                <div className="relative z-10 flex flex-col h-full p-12">
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-500 transition-all duration-300 group-hover:scale-110 group-hover:text-gray-700 origin-left">4000+</h3>
                  <p className="text-sm font-bold text-gray-500 mt-1 mb-5 transition-all duration-300 group-hover:text-gray-700">Khách hàng</p>
                  <div className="relative mt-6 flex-grow">
                    {/* Floating Avatars */}
                    <div className="absolute top-0 left-0 transition-all duration-500 group-hover:translate-x-4">
                      <div className="w-12 h-12 bg-white/5 backdrop-blur-md rounded-full shadow-lg"></div>
                    </div>
                    <div className="absolute top-16 left-8 transition-all duration-500 group-hover:translate-x-6 group-hover:translate-y-2">
                      <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full shadow-lg"></div>
                    </div>
                    <div className="absolute top-4 left-16 transition-all duration-500 group-hover:translate-x-8 group-hover:translate-y-4">
                      <div className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-full shadow-lg"></div>
                    </div>
                  </div>
                  
                  {/* Plus Button with enhanced animation */}
                  <button className="absolute bottom-8 right-8 w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 transition-all duration-500 hover:bg-gray-200 group-hover:rotate-180 group-hover:scale-110 group-hover:bg-white group-hover:shadow-lg">
                    <FaPlus className="transition-all duration-300 group-hover:text-pink-600" />
                  </button>
                  
                  {/* Additional hover element */}
                  <div className="absolute bottom-8 left-8 bg-white/0 px-4 py-2 rounded-full opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 group-hover:bg-white/80">
                    <span className="text-sm font-medium text-gray-700">Xem chi tiết</span>
                  </div>
                </div>
                
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-300/0 via-green-300/10 to-green-300/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -translate-x-full group-hover:translate-x-full rounded-3xl"></div>
              </div>
            </div>

            {/* Box 2 - Interest Rate Card */}
            <div className="col-span-6 sm:col-span-6 md:col-span-2 row-span-2 lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-7 transition-all duration-700 hover:scale-[1.02]">
              <div className={`relative rounded-3xl p-6 shadow-lg text-white h-full transition-all duration-700 delay-200 ${showFeatures ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} group hover:shadow-2xl cursor-pointer`}
                style={{
                  backgroundImage: `url('/images/green-3.webp')`,
                  backgroundSize: '145% 100%',
                  backgroundPosition: 'center',
                  transform: `translateY(-${calculateParallax(0.03)}px)`
                }}>

                {/* Overlay mờ */}
                <div className="absolute inset-[12px] rounded-3xl backdrop-blur-md bg-white/5 z-0 transition-all duration-300 group-hover:bg-white/15"></div>

                {/* Nội dung chính, z-index cao hơn overlay */}
                <div className="relative z-10 flex flex-col h-full">
                  <h3 style={{ textShadow: '0 4px 8px rgba(0,0,0,0.2)' }} className="text-3xl lg:text-4xl font-bold transition-all duration-300 group-hover:scale-110 origin-left">6.0%</h3>
                  <p style={{ textShadow: '0 4px 10px rgba(0,0,0,0.6)' }} className="text-sm font-bold text-white/90 mt-2">Lãi suất ưu đãi cho kỳ hạn từ 6 tháng</p>
                  <div className="mt-auto">
                    <div className="flex items-center mt-4">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-black/20 group-hover:scale-110">
                        <Percent size={16} className="text-white" />
                      </div>
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center ml-2 transition-all duration-300 group-hover:bg-black/20 group-hover:scale-110">
                        <Star size={16} className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Animated border on hover */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                     style={{
                       background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                       backgroundSize: '200% 100%',
                       animation: 'shimmer 2s infinite'
                     }}></div>
              </div>
            </div>


            {/* Box 3 - Flexibility Card */}
            <div className="col-span-6 sm:col-span-6 md:col-span-3 row-span-4 lg:col-span-3 lg:row-span-4 lg:col-start-3 lg:row-start-6 delay-100 transition-all duration-700 hover:scale-[1.02]">
              <div
                className={`relative rounded-3xl shadow-lg h-full transition-all duration-700 delay-300 ${showFeatures ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} group hover:shadow-2xl cursor-pointer`}
                style={{
                  backgroundImage: `url('/images/pink-1.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transform: `translateY(-${calculateParallax(0.04)}px)`
                }}
              >
                {/* lớp mờ đè lên */}
                <div className="absolute inset-[28px] p-5 inset-0 bg-black/2 backdrop-blur-md rounded-3xl z-0 transition-all duration-300 group-hover:bg-white/15" />

                {/* nội dung giữ nguyên, nhưng phải đặt z-10 để nổi lên trên lớp mờ */}
                <div className="relative z-10 text-white p-16 h-full">
                  <div className="flex flex-col h-full">
                    <h3 style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }} className="text-3xl lg:text-4xl font-bold transition-all duration-300 group-hover:scale-110 origin-left">100%</h3>
                    <p style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }} className="text-sm font-bold text-white/90 mt-2">Rút gốc linh hoạt không mất lãi</p>
                    <div className="mt-auto">
                      <div className="flex items-center mt-4">
                        <div className="w-8 h-8 bg-black/10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-black/20 group-hover:scale-110">
                          <Calendar size={16} className="text-white" />
                        </div>
                        <div className="w-8 h-8 bg-black/10 rounded-full flex items-center justify-center ml-2 transition-all duration-300 group-hover:bg-black/20 group-hover:scale-110">
                          <Zap size={16} className="text-white" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Button appears on hover */}
                    <div className="absolute bottom-8 right-8 bg-white/0 p-3 m-2 rounded-full opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 group-hover:bg-black/20 p-2">
                      <ArrowRight size={20} className="text-white" />
                    </div>
                  </div>
                </div>
                
                {/* Pulsing ring effect on hover */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse-slow" 
                     style={{
                       boxShadow: '0 0 0 0 rgba(255,255,255,0.7)',
                       animation: 'pulseBorder 2s infinite'
                     }}></div>
              </div>
            </div>


            {/* Box 4 - Selfie Card (Convenient App) */}
            <div className="col-span-12 sm:col-span-6 md:col-span-3 row-span-5 lg:col-span-3 lg:row-span-5 lg:col-start-5 lg:row-start-1 transition-all duration-700 hover:scale-[1.02]">
              <div className={`bg-gray-100 rounded-3xl overflow-hidden shadow-lg h-full transition-all duration-700 delay-100 ${showFeatures ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} group hover:shadow-2xl cursor-pointer`}
                   style={{ transform: `translateY(-${calculateParallax(0.03)}px)` }}>
                <div className="relative h-full min-h-[240px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-gray-100 p-4 transition-all duration-500 group-hover:from-green-100 group-hover:to-gray-200">
                    <div className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      <div className="w-3 h-3 bg-green-400 rounded-full group-hover:bg-green-500"></div>
                    </div>
                    <p className="text-sm font-bold text-gray-500 mt-1 transition-all duration-300 group-hover:text-gray-700 group-hover:translate-x-1">Giao diện thân thiện</p>
                    <div className="mt-4 w-full h-[calc(100%-40px)] bg-white rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-500">
                      <div className="relative w-full h-full">
                        {/* Placeholder for selfie image */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 transition-all duration-500 group-hover:from-gray-100 group-hover:to-gray-200">
                          <div className="absolute top-0 left-0 w-full h-6 bg-gray-800 flex items-center px-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          </div>
                          
                          {/* App screen content appears on hover */}
                          <div className="absolute inset-8 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center">
                            <div className="w-full h-8 bg-green-100 rounded-lg mb-3"></div>
                            <div className="w-full h-8 bg-gray-100 rounded-lg mb-3"></div>
                            <div className="w-full h-8 bg-pink-100 rounded-lg mb-3"></div>
                            <div className="w-3/4 h-8 bg-gray-100 rounded-lg"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action button appears on hover */}
                    <div className="absolute bottom-8 right-8 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      <button className="flex items-center gap-1 text-sm font-medium text-gray-600 bg-white px-3 py-1.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                        <Maximize2 size={14} />
                        <span>Xem</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Box 5 - "Why Us?" heading */}
            <div className="col-span-12 sm:col-span-12 md:col-span-4 row-span-3 lg:col-span-4 lg:row-span-3 lg:col-start-9 lg:row-start-1 transition-all duration-700 hover:scale-[1.02]">
              <div className={`transform transition-all duration-1000 ease-out ${showFeatures ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                   style={{ transform: `translateY(-${calculateParallax(0.02)}px)` }}>
                <h2 className="text-4xl md:text-6xl font-bold text-center md:text-left mb-4 text-gray-800 group cursor-default">
                  <span className="text-gray-900 inline-block relative">
                    Why 
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 group-hover:w-full transition-all duration-700"></span>
                  </span> 
                  <span className="text-pink-600 inline-block relative">
                    Sweet?
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-800 group-hover:w-full transition-all duration-700 delay-300"></span>
                  </span>
                </h2>
              </div>
            </div>

            {/* Box 6 - Additional Flexibility Card (Terms) */}
            <div className="col-span-12 sm:col-span-6 md:col-span-3 row-span-2 lg:col-span-3 lg:row-span-3 lg:col-start-8 lg:row-start-3 transition-all duration-700 hover:scale-[1.02]">
              <div className={`relative rounded-3xl p-6 shadow-lg text-white h-full transition-all duration-700 delay-100 ${showFeatures ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} group hover:shadow-2xl cursor-pointer overflow-hidden`}
                style={{
                  backgroundImage: `url('/images/pink-6.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transform: `translateY(-${calculateParallax(0.05)}px)`
                }}>
                <div className="flex flex-col h-full relative z-10">
                  <h3 style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }} className="text-3xl lg:text-4xl font-bold transition-all duration-300 group-hover:scale-110 origin-left">1, 3, 6, 12 tháng</h3>
                  <p style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }} className="text-sm font-bold text-white/90 mt-2">Kỳ hạn linh hoạt</p>
                  <div className="mt-auto">
                    <div className="flex items-center mt-4">
                      <div className="w-8 h-8 bg-white/40 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-white/60 group-hover:scale-110">
                        <Calendar size={16} className="text-white" />
                      </div>
                      <div className="w-8 h-8 bg-white/40 rounded-full flex items-center justify-center ml-2 transition-all duration-300 group-hover:bg-white/60 group-hover:scale-110">
                        <Zap size={16} className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Animated background effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1500 ease-in-out"></div>
              </div>
            </div>

            {/* Box 7 - Video Card */}
            <div className="col-span-4 sm:col-span-4 md:col-span-1 row-span-1 lg:col-span-2 lg:row-span-2 lg:col-start-11 lg:row-start-4 transition-all duration-700 hover:scale-[1.02]">
              <div className={`bg-gray-100 rounded-3xl overflow-hidden shadow-lg h-full transition-all duration-700 delay-300 ${showFeatures ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} group hover:shadow-2xl cursor-pointer`}
                   style={{ transform: `translateY(-${calculateParallax(0.04)}px)` }}>
                <div className="relative h-full min-h-[120px] bg-gradient-to-br from-pink-100 to-red-100 transition-all duration-500 group-hover:from-pink-200 group-hover:to-red-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-all duration-500 group-hover:bg-white group-hover:scale-110">
                      <Play size={20} className="text-pink-600 ml-1 transition-all duration-300 group-hover:text-pink-700" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Box 8 - Platform Features Card */}
            <div className="col-span-12 sm:col-span-12 md:col-span-7 row-span-4 lg:col-span-7 lg:row-span-4 lg:col-start-6 lg:row-start-6 transition-all duration-700 hover:scale-[1.02]">
              <div className={`bg-green/50 backdrop-blur-2xl rounded-3xl p-6 shadow-lg h-full transition-all duration-700 delay-600 ${showFeatures ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} group hover:shadow-2xl cursor-pointer`}
                   style={{ transform: `translateY(-${calculateParallax(0.02)}px)` }}>
                <div className="flex flex-col h-full">
                  <h3 className="text-xl font-light text-gray-800 transition-all duration-300 group-hover:translate-x-1">Nền tảng với</h3>
                  <h2 className="text-3xl font-light text-gray-900 mt-1 transition-all duration-300 group-hover:translate-x-1 group-hover:text-pink-600">Các tính năng dẫn đầu thị trường</h2>
                  <div className="mt-6 space-y-4">
                    {/* Feature items */}
                    <div className="flex items-center group/item transition-all duration-300 hover:translate-x-2">
                      <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mr-3 transition-all duration-300 group-hover/item:bg-pink-200 group-hover/item:scale-110">
                        <Calendar size={18} className="text-pink-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 transition-all duration-300 group-hover/item:text-pink-600">Nhiều kỳ hạn hơn</h4>
                        <p className="text-sm text-gray-500 transition-all duration-300 group-hover/item:text-gray-700">Tự do lựa chọn kỳ hạn phù hợp với bạn</p>
                      </div>
                    </div>
                    <div className="flex items-center group/item transition-all duration-300 hover:translate-x-2">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3 transition-all duration-300 group-hover/item:bg-green-200 group-hover/item:scale-110">
                        <Percent size={18} className="text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 transition-all duration-300 group-hover/item:text-green-600">Lãi suất cạnh tranh</h4>
                        <p className="text-sm text-gray-500 transition-all duration-300 group-hover/item:text-gray-700">Mở tài khoản ngay và nhận lấy ưu đãi lãi suất top đầu thị trường</p>
                      </div>
                    </div>
                    
                    {/* Additional feature appears on hover */}
                  </div>
                </div>

                <div className="absolute bottom-8 right-8 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  <button className="flex items-center gap-1 bg-white/50 backdrop-blur-lg text-sm font-medium text-gray-600 bg-white px-3 py-1.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                    <Maximize2 size={14} />
                    <span>Trải Nghiệm Ngay</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className={`m-32 mb-32 flex md:flex-row items-center justify-between text-center transition-all duration-1000 delay-800 ${showInterestSection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <h2 className="text-3xl md:text-6xl font-light text-gray-900 mb-6 transition-all duration-700 delay-100">
          Gửi Ngắn Dài <span className='text-pink-600 font-semibold'>Tùy Ý,</span> Rút Lúc Nào Cũng Quý!
        </h2>
        <div>
          <p className="text-gray-600 text-3xl font-light max-w-2xl mx-auto mb-8 transition-all duration-700 delay-200">
            Giờ đây bạn có thể <span className='text-pink-600 font-normal'>rút tiền mọi lúc mọi nơi</span> (ngay cả khi vừa gửi tiền) mà <span className='text-pink-600 font-normal'>không lo mất lãi</span>.
          </p>
          <button className="group flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-400 text-white px-8 py-4 rounded-full font-medium transition-all duration-700 delay-300 hover:bg-pink-700 hover:shadow-xl transform hover:-translate-y-1 mx-auto">
            <span>Trải Nghiệm Ngay</span>
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Interest Rate Section */}
      <section
        ref={interestRef}
        className="relative z-10 py-12 pt-24 mb-12 rounded-[80px] shadow-2xl overflow-hidden bg-black/5 backdrop-blur-xl mx-24"
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          {/* Title Section */}
          <div className={`text-center mb-16 transition-all duration-1000 ${showInterestSection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
              Linh Hoạt Kỳ Hạn - <span className="text-pink-600 font-semibold">Ngọt Ngào Lãi Suất</span> Cùng Sweet
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-rose-400 mx-auto my-4 rounded-full"></div>
            <p className="text-gray-600 text-xl font-light max-w-3xl mx-auto mb-8">
              Chúng tôi mang đến cho bạn các kỳ hạn đa dạng, tần suất nhận lãi linh hoạt và phương thức đáo hạn phù hợp với nhu cầu tài chính của bạn
            </p>
          </div>

          {/* Three Objects Container */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Object 1: Interest Rate Table */}
            <div className={`relative bg-white/40 backdrop-blur-md rounded-3xl overflow-visible shadow-lg transition-all duration-500 ${showInterestSection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'} group hover:shadow-2xl hover:bg-white/70 hover:scale-[1.02]`}>
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-pink-200/30 to-transparent rounded-bl-full -z-0"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-200/30 to-transparent rounded-tr-full -z-0"></div>
              
              <div className="relative z-10 p-6 overflow-visible">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Percent className="mr-2 text-pink-600" size={24} />
                  <span>Bảng Lãi Suất</span>
                  <span className="ml-2 text-sm font-normal px-2 py-1 bg-pink-100 text-pink-600 rounded-full">Ưu đãi cao</span>
                </h3>
                
                <div className="space-y-2 overflow-visible">
                  {[
                    { term: 1, rate: '3.8%' },
                    { term: 3, rate: '4.2%' },
                    { term: 6, rate: '6.0%', highlight: true },
                    { term: 9, rate: '5.7%' },
                    { term: 12, rate: '5.5%' },
                    { term: 18, rate: '5.0%' },
                    { term: 24, rate: '4.8%' },
                    { term: 30, rate: '4.5%' },
                    { term: 36, rate: '4.2%' }
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className={`relative flex justify-between items-center p-2 rounded-lg transition-all duration-500 ${item.highlight 
                        ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md transform group-hover:scale-110 group-hover:shadow-xl z-20' 
                        : 'hover:bg-white/70 hover:scale-105 hover:translate-x-1'}`}
                    >
                      <span className="font-medium">{item.term} tháng</span>
                      <span className={`text-lg font-bold ${item.highlight ? 'text-white' : 'text-pink-600'}`}>{item.rate}</span>
                      {item.highlight && (
                        <div className="absolute z-50 -right-8 -top-3 bg-yellow-400 text-xs font-bold px-3 py-1.5 rounded-full text-gray-800 shadow-md transform rotate-12 border border-yellow-500 group-hover:scale-125 group-hover:-right-10 group-hover:-top-4 transition-all duration-500">
                          TỐT NHẤT
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-sm text-gray-600 bg-gray-100/70 rounded-lg p-3 group-hover:bg-white transition-all duration-300">
                  <p>Lãi suất thực tế có thể thay đổi theo thời điểm. Vui lòng liên hệ với chúng tôi để biết lãi suất mới nhất.</p>
                </div>
              </div>
            </div>
            
            {/* Object 2: Interest Payment Frequency */}
            <div className={`relative bg-white/40 backdrop-blur-md rounded-3xl overflow-visible shadow-lg transition-all duration-500 ${showInterestSection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'} group hover:shadow-2xl hover:bg-white/60 hover:scale-[1.02] transform rotate-1`}>
              <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-gradient-to-b from-pink-200/30 via-sky-200/30 to-transparent rounded-full blur-md -z-0"></div>
              
              <div className="relative z-10 p-6 overflow-visible">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Calendar className="mr-2 text-pink-600" size={24} />
                  <span>Tần Suất Nhận Lãi</span>
                </h3>
                
                <div className="grid grid-cols-1 gap-4 overflow-visible">
                  {[
                    { 
                      name: 'Đầu kỳ hạn', 
                      desc: 'Nhận lãi ngay khi gửi tiền',
                      highlight: true,
                      icon: <Gift size={20} className="text-pink-600 group-hover:text-white" />
                    },
                    { 
                      name: 'Hàng tháng', 
                      desc: 'Nhận lãi định kỳ mỗi tháng',
                      icon: <Calendar size={20} className="text-pink-600" />
                    },
                    { 
                      name: 'Hàng quý', 
                      desc: 'Nhận lãi định kỳ mỗi ba tháng',
                      icon: <TrendingUp size={20} className="text-pink-600" />
                    },
                    { 
                      name: 'Cuối kỳ hạn', 
                      desc: 'Nhận lãi khi đáo hạn',
                      icon: <Award size={20} className="text-pink-600" />
                    }
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className={`relative rounded-xl p-4 transition-all duration-500 ${item.highlight 
                        ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md transform -rotate-1 group-hover:rotate-0 group-hover:scale-110 group-hover:shadow-xl z-20' 
                        : 'bg-white/50 hover:bg-white hover:scale-105 hover:translate-x-1'}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`rounded-full p-2 transition-all duration-300 ${item.highlight ? 'bg-white/30 group-hover:bg-white/50' : 'bg-pink-100 hover:bg-pink-200'}`}>
                          {item.icon}
                        </div>
                        <div>
                          <h4 className={`font-bold ${item.highlight ? 'text-white' : 'text-gray-800'}`}>{item.name}</h4>
                          <p className={`text-sm ${item.highlight ? 'text-white/90' : 'text-gray-600'}`}>{item.desc}</p>
                        </div>
                      </div>
                      {item.highlight && (
                        <div className="absolute -right-6 -top-2 bg-yellow-400 text-xs font-bold px-3 py-1.5 rounded-full text-gray-800 shadow-md transform rotate-12 border border-yellow-500 group-hover:scale-125 group-hover:-right-6 group-hover:-top-4 transition-all duration-500">
                          LINH HOẠT HƠN
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-sm text-gray-600 bg-gray-100/70 rounded-lg p-3 group-hover:bg-white transition-all duration-300">
                  <p>Đối với tần suất nhận lãi đầu kỳ, bạn có thể rút tiền lãi ngay sau khi gửi tiền.</p>
                </div>
              </div>
            </div>
            
            {/* Object 3: Maturity Options */}
            <div className={`relative bg-white/40 backdrop-blur-md rounded-3xl overflow-visible shadow-lg transition-all duration-500 ${showInterestSection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'} group hover:shadow-2xl hover:bg-white/70 hover:scale-[1.02] transform -rotate-1`}>
              <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-gradient-to-t from-pink-200/30 via-purple-200/30 to-transparent rounded-full blur-md -z-0"></div>
              
              <div className="relative z-10 p-6 overflow-visible">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <CreditCard className="mr-2 text-pink-600" size={24} />
                  <span>Phương Thức Đáo Hạn</span>
                </h3>
                
                <div className="relative mt-6 mb-4 overflow-visible">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-500 to-transparent z-0"></div>
                  
                  {[
                    { 
                      name: 'Nhận cả gốc và lãi', 
                      desc: 'Nhận toàn bộ tiền gốc và lãi khi đáo hạn',
                      icon: <PiggyBank size={20} className="text-pink-600" />
                    },
                    { 
                      name: 'Nhận lãi', 
                      desc: 'Chỉ nhận lãi, giữ lại tiền gốc',
                      icon: <Percent size={20} className="text-pink-600" />
                    },
                    { 
                      name: 'Chuyển gốc sang kỳ hạn mới', 
                      desc: 'Tự động tái tục khoản tiền gốc',
                      icon: <ArrowRight size={20} className="text-pink-600" />
                    },
                    { 
                      name: 'Chuyển gốc và lãi sang kỳ hạn mới', 
                      desc: 'Tăng giá trị tiết kiệm với cả gốc và lãi',
                      highlight: true,
                      icon: <TrendingUp size={20} className="text-pink-600 group-hover:text-white" />
                    }
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className="relative pl-10 mb-6 overflow-visible"
                    >
                      <div className={`absolute left-0 top-1 w-8 h-8 flex items-center justify-center bg-white rounded-full z-10 border-2 ${item.highlight 
                        ? 'border-pink-500 group-hover:border-pink-600' 
                        : 'border-pink-200 hover:border-pink-400'} transition-all duration-500 group-hover:border-pink-500`}>
                        <div className={`absolute inset-1 rounded-full ${item.highlight 
                          ? 'bg-gradient-to-r from-pink-500 to-rose-400 scale-100' 
                          : 'bg-pink-100 scale-0 group-hover:scale-100'} transform transition-transform duration-500`}></div>
                        <span className={`relative z-20 ${item.highlight ? 'group-hover:text-white' : ''}`}>{item.icon}</span>
                      </div>
                      <div className={`${item.highlight 
                        ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-lg' 
                        : 'bg-white/60'} p-4 rounded-xl transition-all duration-500 hover:shadow-md ${item.highlight 
                          ? 'group-hover:scale-110 group-hover:translate-x-2 group-hover:shadow-xl z-20' 
                          : 'hover:bg-white hover:scale-105 hover:translate-x-1'}`}>
                        <h4 className={`font-bold ${item.highlight ? 'text-white' : 'text-gray-800'}`}>{item.name}</h4>
                        <p className={`text-sm ${item.highlight ? 'text-white/90' : 'text-gray-600'}`}>{item.desc}</p>
                        {item.highlight && (
                          <div className="absolute -right-4 -top-2 bg-yellow-400 text-xs font-bold px-3 py-1.5 rounded-full text-gray-800 shadow-md transform rotate-12 border border-yellow-500 group-hover:scale-125 group-hover:-right-10 group-hover:-top-4 transition-all duration-500">
                            TIỆN LỢI HƠN
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-sm text-gray-600 bg-gray-100/70 rounded-lg p-3 group-hover:bg-white transition-all duration-300">
                  <p>Phương thức <span className="font-semibold text-pink-600">"Chuyển gốc và lãi sang kỳ hạn mới"</span> giúp tối ưu hóa lợi nhuận dài hạn với hiệu ứng lãi kép.</p>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-12'>
            <button className="group flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-400 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 delay-200 hover:bg-pink-700 hover:shadow-xl transform hover:-translate-y-1 mx-auto">
              <span>Chớp Lấy Lãi Suất Ưu Đãi Ngay Thôi!</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className={`m-32 mb-32 text-center transition-all duration-1000 delay-800 ${showInterestSection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <h2 className="text-3xl md:text-6xl font-light text-gray-900 mb-6 transition-all duration-700 delay-100">
          Bắt đầu hành trình <span className="text-pink-600 font-semibold">TIẾT KIỆM</span> thông minh ngay hôm nay
        </h2>
        <p className="text-gray-600 text-xl font-light max-w-2xl mx-auto mb-8 transition-all duration-700 delay-200">
          Với lãi suất ưu đãi 6% cho kỳ hạn từ 6 tháng và khả năng rút gốc linh hoạt, Sweet là lựa chọn hoàn hảo cho mục tiêu tài chính của bạn.
        </p>
        <button className="group flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-400 text-white px-8 py-4 rounded-full font-medium transition-all duration-700 delay-300 hover:bg-pink-700 hover:shadow-xl transform hover:-translate-y-1 mx-auto">
          <span>Mở Tài Khoản Ngay</span>
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Card Section from Sweet-3 */}
      <section 
        id="products"
        ref={cardSectionRef}
        className="relative z-10 py-12 m-20 md:py-20 md:pt-8 rounded-[80px] shadow-2xl overflow-hidden bg-black/5 backdrop-blur-xl"
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          {/* Title Section */}
          <div className={`flex flex-col md:flex-row justify-between py-4 transition-all duration-1000 ${showCardSection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            
            <div className='max-w-2xl'>
              <div className="flex items-center gap-2 max-w-2xl">
                <div className="text-5xl font-bold text-pink-600"><span className='text-black font-semibold'>Sản Phẩm </span>Sweet</div>
                <div className="relative w-7 h-7 transform rotate-45 rounded-md flex items-center justify-center hover:rotate-90 transition-all duration-300">
                  <div className="absolute inset-0 rounded-md" style={{ background: 'linear-gradient(135deg, #e91e63, #c2185b)' }}></div>
                  <div className="absolute inset-[3px] rounded-md bg-gradient-to-br from-pink-200 to-pink-300 shadow-lg"></div>
                  <div className="absolute inset-[6px] rounded-md bg-white"></div>
                  <svg className="absolute inset-0 m-auto w-5 h-5 transform -rotate-45 hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="#d81b60" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1v22"></path>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="mt-8 md:mt-0 max-w-xl text-right">
              <p className="text-gray-600 text-2xl font-light">
                Đội ngũ chúng tôi luôn sẵn sàng nâng tầm hành trình tiết kiệm của bạn
              </p>
            </div>
          </div>
          
          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            {/* Savings Plans Card */}
            <div className={`relative group cursor-pointer transition-all duration-1000 ${showCardSection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-40'}`}>
              <div className="absolute inset-0 bg-green-100 rounded-3xl overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.02]"
              style={{
                backgroundImage: `url('/images/green-6.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}>
                <div className="absolute inset-0 bg-white/20" />
                <div className="absolute top-6 right-14 bottom-6 left-14 rounded-3xl backdrop-blur-lg bg-white/30 z-0 transition-all duration-500 group-hover:bg-white/35"></div>
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('/api/placeholder/500/500')] opacity-10"></div>
                </div>
                {/* Glowing effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-300/0 via-green-300/30 to-green-300/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -translate-x-full group-hover:translate-x-full"></div>
              </div>
              
              <div className="relative p-20 h-full flex flex-col items-center justify-center text-center">
                <div className="flex justify-between items-start">
                  <span style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }} className="font-light border border-white text-white inline-block px-6 py-3 bg-black/10 backdrop-blur-sm rounded-full text-lg transition-all duration-300 group-hover:bg-white/30">Tiết kiệm đa dạng kỳ hạn</span>
                </div>
                
                <div className="mt-12">
                  <h2 style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }} className="text-7xl font-normal text-white transition-all duration-300 group-hover:text-white group-hover:scale-105 origin-left">1-36<span className="text-2xl">tháng</span></h2>
                  <h3 style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }} className="text-2xl font-light text-white transition-all duration-300 group-hover:text-white">Đa dạng lựa chọn kỳ hạn</h3>
                  
                  <p style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }} className="mt-4 text-sm text-white/80 max-w-sm transition-all duration-300 group-hover:text-white/90">
                    Khám phá kho tàng kế hoạch tiết kiệm và nghiên cứu lãi suất để có cái nhìn sâu sắc cho mục tiêu tài chính cá nhân
                  </p>
                  
                  <div style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }} className="mt-8 text-white text-2xl transition-all duration-300 group-hover:scale-110 origin-left">
                    <span style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }} className="text-base opacity-80">Tiết kiệm ngay chỉ với </span>100.000 VNĐ 
                  </div>
                  
                  <div className="absolute bottom-56 right-8 w-12 h-12 rounded-full bg-white/0 flex items-center justify-center opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 group-hover:bg-white/90">
                    <ArrowRight size={20} className="text-green-900" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tiết kiệm rút gốc linh hoạt*/}
            <div className={`relative group cursor-pointer transition-all duration-1000 ${showCardSection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-40'}`}>
              <div className="absolute inset-0 bg-green-100 rounded-3xl overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.02]"
              style={{
                backgroundImage: `url('/images/pink-4.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}>
                <div className="absolute inset-0 bg-white/20" />
                <div className="absolute top-6 right-14 bottom-6 left-14 rounded-3xl backdrop-blur-lg bg-white/25 z-0 transition-all duration-500 group-hover:bg-white/35"></div>
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('/api/placeholder/500/500')] opacity-10"></div>
                </div>
                {/* Glowing effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-300/0 via-green-300/30 to-green-300/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -translate-x-full group-hover:translate-x-full"></div>
              </div>
              
              <div className="relative p-20 h-full flex flex-col items-center justify-center text-center">
                <div className="flex justify-between items-start">
                  <span style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }} className="font-light border border-white text-white inline-block px-6 py-3 bg-black/10 backdrop-blur-sm rounded-full text-lg transition-all duration-300 group-hover:bg-white/30">Tiết kiệm rút gốc linh hoạt</span>
                </div>
                
                <div className="mt-12">
                  <h2 style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }} className="text-7xl font-normal text-white transition-all duration-300 group-hover:text-white group-hover:scale-105 origin-left">1-36<span className="text-2xl">tháng</span></h2>
                  <h3 style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }} className="text-2xl font-light text-white transition-all duration-300 group-hover:text-white">Đa dạng lựa chọn kỳ hạn</h3>
                  
                  <p style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }} className="mt-4 text-sm text-white/80 max-w-sm transition-all duration-300 group-hover:text-white/90">
                    Khách hàng có thể rút gốc bất cứ lúc nào (ngay cả khi vừa gửi tiền) - Linh hoạt hơn, tiện lợi hơn!
                  </p>
                  
                  <div style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }} className="mt-8 text-white text-2xl transition-all duration-300 group-hover:scale-110 origin-left">
                    <span style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }} className="text-base opacity-80">Tiết kiệm ngay chỉ với </span>100.000 VNĐ 
                  </div>
                  
                  <div className="absolute bottom-56 right-8 w-12 h-12 rounded-full bg-white/0 flex items-center justify-center opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 group-hover:bg-white/90">
                    <ArrowRight size={20} className="text-green-900" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            
          </div>
          <div className={`m-28 mb-16 text-center transition-all duration-1000 delay-800 ${showFeatures ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <div className="flex text-center items-center justify-center gap-2 animate-reveal">
              <div className="text-7xl font-bold text-pink-600">Sweet</div>
              <div className="relative w-7 h-7 transform rotate-45 rounded-md flex items-center justify-center hover:rotate-90 transition-all duration-300">
                <div className="absolute inset-0 rounded-md" style={{ background: 'linear-gradient(135deg, #e91e63, #c2185b)' }}></div>
                <div className="absolute inset-[3px] rounded-md bg-gradient-to-br from-pink-200 to-pink-300 shadow-lg"></div>
                <div className="absolute inset-[6px] rounded-md bg-white"></div>
                <svg className="absolute inset-0 m-auto w-5 h-5 transform -rotate-45 hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="#d81b60" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1v22"></path>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
            </div>
            <div className="mt-4 text-3xl font-light text-center text-pink-500 animate-fade-in-up">
              Make your money grows sweeter
            </div>
          </div>
      <style jsx global>{`
        @keyframes floatSlow {
          0% { transform: translateY(20px); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateY(-20px); opacity: 0; }
        }
        
        @keyframes floatMedium {
          0% { transform: translateY(15px); opacity: 0; }
          25% { opacity: 0.7; }
          75% { opacity: 0.7; }
          100% { transform: translateY(-15px); opacity: 0; }
        }
        
        @keyframes floatFast {
          0% { transform: translateY(10px); opacity: 0; }
          30% { opacity: 0.6; }
          70% { opacity: 0.6; }
          100% { transform: translateY(-10px); opacity: 0; }
        }
        
        @keyframes reveal {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes fadeInUp {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes pulseBorder {
          0% { box-shadow: 0 0 0 0 rgba(255,255,255,0.7); }
          70% { box-shadow: 0 0 0 10px rgba(255,255,255,0); }
          100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
        }
        
        @keyframes pulseRing {
          0% { box-shadow: 0 0 0 0 rgba(244,114,182,0.7); }
          70% { box-shadow: 0 0 0 15px rgba(244,114,182,0); }
          100% { box-shadow: 0 0 0 0 rgba(244,114,182,0); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(233, 30, 99, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(233, 30, 99, 0); }
          100% { box-shadow: 0 0 0 0 rgba(233, 30, 99, 0); }
        }
        
        .animate-float-slow {
          animation: floatSlow 8s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: floatMedium 6s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .animate-float-fast {
          animation: floatFast 4s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-reveal {
          animation: reveal 1.5s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
          animation-delay: 0.8s;
          opacity: 0;
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .animate-slide-in {
          animation: slideIn 0.3s ease-out forwards;
        }
        
        .animate-pulse-slow {
          animation: pulse 3s infinite ease-in-out;
        }
        
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite linear;
        }

        .animate-bounce {
          animation: bounce 2s infinite ease-in-out;
        }

        .animate-pulse-ring {
          animation: pulse-ring 2s infinite;
        }
      `}</style>
    </div>
  );
}

// Navigation Item Component
const NavItem = ({ text, active = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`relative font-medium transition-colors duration-300 ${active ? 'text-pink-600' : 'text-gray-700 hover:text-pink-600'} bg-transparent border-none outline-none cursor-pointer px-1`}
    >
      {text}
      <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-pink-600 transform origin-left transition-transform duration-500 ${active ? 'scale-x-100' : 'scale-x-0'}`}></span>
    </button>
  );
};

// Mobile Navigation Item Component
const MobileNavItem = ({ text, active = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`relative text-xl font-medium py-3 mb-1 transition-colors duration-300 w-full text-center bg-transparent border-none outline-none cursor-pointer flex flex-col items-center justify-center ${active ? 'text-pink-600' : 'text-gray-700 hover:text-pink-600'}`}
    >
      {text}
      <span className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-pink-600 transition-all duration-500 ${active ? 'opacity-100' : 'opacity-0 scale-x-0'}`}></span>
    </button>
  );
};

// Rocket Component
const RocketModified = () => {
  return (
    <div className="relative w-24 h-60">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-28 bg-gradient-to-b from-white to-gray-200 rounded-t-full rounded-b-lg shadow-lg"></div>
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-gray-300 rounded-b-lg"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 w-8 h-8 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full"></div>
      <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-24 flex justify-between">
        <div className="w-6 h-12 bg-gradient-to-r from-pink-400 to-pink-600 rounded-lg shadow-md transform -rotate-12 skew-y-12"></div>
        <div className="w-6 h-12 bg-gradient-to-l from-pink-400 to-pink-600 rounded-lg shadow-md transform rotate-12 skew-y-[-12deg]"></div>
      </div>
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-sky-300 rounded-full border-2 border-sky-500 shadow-inner"></div>
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-sky-300 rounded-full border border-sky-500 shadow-inner"></div>
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-24 bg-pink-200 rounded-full opacity-50"></div>

      {/* Đã xóa phần "viên đạn" bên dưới tên lửa */}

      {/* Chỉ giữ lại phần lửa đẩy */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 flex justify-between">
      </div>
    </div>
  );
};

// Smoke Animation Component
const Smoke = () => {
  return (
    <div className="relative w-32 h-40">
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 opacity-70">
        <div className="w-8 h-8 bg-white rounded-full blur-md animate-smoke-1"></div>
        <div className="w-10 h-10 bg-white rounded-full blur-md animate-smoke-2"></div>
        <div className="w-6 h-6 bg-white rounded-full blur-md animate-smoke-3"></div>
        <div className="w-12 h-12 bg-white rounded-full blur-md animate-smoke-4"></div>
        <div className="w-9 h-9 bg-white rounded-full blur-md animate-smoke-5"></div>


        <div className="w-7 h-7 bg-pink-200 rounded-full blur-md animate-smoke-pink-1"></div>
        <div className="w-9 h-9 bg-pink-200 rounded-full blur-md animate-smoke-pink-2"></div>
        <div className="w-8 h-8 bg-pink-300 rounded-full blur-md animate-smoke-pink-3"></div>
        <div className="w-10 h-10 bg-pink-200 rounded-full blur-md animate-smoke-pink-4"></div>
      </div>
    </div>
  );
};

// Add the required styles to Tailwind config
/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  theme: {
    extend: {
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 5s ease-in-out infinite',
        'float-slow-reverse': 'floatReverse 7s ease-in-out infinite',
        'float-medium-reverse': 'floatReverse 5s ease-in-out infinite',
        'float-moon': 'floatMoon 15s ease-in-out infinite',
        'float-random-1': 'floatRandom1 20s ease-in-out infinite',
        'float-random-2': 'floatRandom2 25s ease-in-out infinite',
        'float-random-3': 'floatRandom3 22s ease-in-out infinite',
        'float-random-4': 'floatRandom4 18s ease-in-out infinite',
        'float-random-5': 'floatRandom5 24s ease-in-out infinite',
        'float-random-6': 'floatRandom6 28s ease-in-out infinite',
        'float-random-7': 'floatRandom7 21s ease-in-out infinite',
        'float-random-8': 'floatRandom8 26s ease-in-out infinite',
        'smoke-1': 'smoke 2s ease-out infinite',
        'smoke-2': 'smoke 2.5s ease-out 0.3s infinite',
        'smoke-3': 'smoke 2.2s ease-out 0.6s infinite',
        'smoke-4': 'smoke 2.4s ease-out 0.9s infinite',
        'smoke-5': 'smoke 2.3s ease-out 1.2s infinite',
        'smoke-pink-1': 'smoke 2.4s ease-out 0.2s infinite',
        'smoke-pink-2': 'smoke 2.6s ease-out 0.5s infinite',
        'smoke-pink-3': 'smoke 2.3s ease-out 0.8s infinite',
        'smoke-pink-4': 'smoke 2.7s ease-out 1.1s infinite',
        'pulse': 'pulse 1.5s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite linear',
        'pulseBorder': 'pulseBorder 2s infinite',
        'pulseRing': 'pulseRing 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(-20px)' },
          '50%': { transform: 'translateY(0)' },
        },
        floatMoon: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(-15px, 15px)' },
          '50%': { transform: 'translate(0, 25px)' },
          '75%': { transform: 'translate(15px, 10px)' },
        },
        floatRandom1: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(-15px, 10px)' },
          '50%': { transform: 'translate(-5px, -15px)' },
          '75%': { transform: 'translate(10px, 5px)' },
        },
        floatRandom2: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '20%': { transform: 'translate(10px, -10px)' },
          '40%': { transform: 'translate(15px, 5px)' },
          '60%': { transform: 'translate(5px, 15px)' },
          '80%': { transform: 'translate(-10px, 10px)' },
        },
        floatRandom3: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(-10px, 15px)' },
          '66%': { transform: 'translate(15px, -5px)' },
        },
        floatRandom4: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(15px, 10px)' },
          '66%': { transform: 'translate(5px, -15px)' },
        },
        floatRandom5: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(10px, 15px)' },
          '50%': { transform: 'translate(20px, 5px)' },
          '75%': { transform: 'translate(5px, 10px)' },
        },
        floatRandom6: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(-15px, -10px)' },
          '50%': { transform: 'translate(-5px, 15px)' },
          '75%': { transform: 'translate(-10px, 5px)' },
        },
        floatRandom7: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(15px, -15px)' },
          '66%': { transform: 'translate(-10px, 10px)' },
        },
        floatRandom8: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(-15px, -10px)' },
          '66%': { transform: 'translate(10px, 15px)' },
        },
        smoke: {
          '0%': { transform: 'scale(0.8) translate(0, 0)', opacity: 0.8 },
          '100%': { transform: 'scale(2) translate(0, -80px)', opacity: 0 },
        },
        pulse: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.6, transform: 'scale(1.1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        pulseBorder: {
          '0%': { boxShadow: '0 0 0 0 rgba(255, 255, 255, 0.7)' },
          '70%': { boxShadow: '0 0 0 10px rgba(255, 255, 255, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(255, 255, 255, 0)' }
        },
        pulseRing: {
          '0%': { boxShadow: '0 0 0 0 rgba(244, 114, 182, 0.7)' },
          '70%': { boxShadow: '0 0 0 15px rgba(244, 114, 182, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(244, 114, 182, 0)' }
        },
      },
    },
  },
};