'use client';

import { signIn } from "@/firebase/authenticate";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaGoogle, FaFacebook, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { ArrowRight, CloudSun } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Page load animation effect
    const pageLoadTimer = setTimeout(() => {
      setPageLoaded(true);
    }, 100);

    // Initial appearance animation effect for other elements
    const initialAnimationTimer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1800);

    return () => {
      clearTimeout(pageLoadTimer);
      clearTimeout(initialAnimationTimer);
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email) newErrors.email = true;
    if (!formData.password) newErrors.password = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleSignIn() {
    setIsPending(true);
    try {
      const result = await signIn();
      router.replace('/booking');
    } catch (error) {
      console.error("Login error:", error);
      setIsPending(false);
    }
  }

  return (
    <div className="relative min-h-screen w-full bg-sky-50 flex items-center justify-center p-4 md:p-8 overflow-hidden">
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

      {/* Cloud and Moon animation container */}
      <div className={`fixed inset-0 pointer-events-none overflow-hidden transition-opacity duration-1000 ${animationComplete ? 'opacity-100' : 'opacity-0'}`}>
        {/* Moon Background - animated random movement */}
        <div className="absolute right-1/4 top-1/4 w-32 h-32 md:w-48 md:h-48 bg-pink-300/70 rounded-full blur-sm z-0 animate-float-moon"></div>

        {/* Clouds Animation - with continuous random movement */}
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

      {/* Login Card */}
      <div 
        className={`w-full max-w-md bg-white/40 backdrop-blur-xl p-8 rounded-[40px] shadow-2xl z-10 transition-all duration-1000 delay-500 ${animationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="mb-8 flex justify-center">
          <div className="flex items-center justify-center gap-2">
            <div className="text-3xl md:text-4xl font-bold text-pink-600">Sweet</div>
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
        
        <h2 className="text-2xl md:text-3xl font-light text-center text-gray-800 mb-6">
          Đăng Nhập <span className="text-pink-600 font-semibold">Sweet</span>
        </h2>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                className={`w-full p-4 pl-5 text-base bg-white/70 border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400 backdrop-blur-sm shadow-md transition-all duration-300 ${errors.email ? "ring-2 ring-red-500" : ""}`}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>
          
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              className={`w-full p-4 pl-5 text-base bg-white/70 border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400 backdrop-blur-sm shadow-md transition-all duration-300 ${errors.password ? "ring-2 ring-red-500" : ""}`}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash className="text-pink-600" /> : <FaEye className="text-pink-600" />}
            </button>
          </div>
          
          <button
            type="submit"
            className="group flex items-center justify-center gap-2 w-full py-4 text-base bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-full font-medium transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
          >
            <span>Đăng Nhập</span>
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
          
          <div className="text-center">
            <a href="#" className="text-pink-600 hover:text-pink-800 text-sm md:text-base">Quên mật khẩu?</a>
          </div>
          
          <div className="text-center">
            <span className="text-gray-600 text-sm md:text-base">Bạn chưa có tài khoản? </span>
            <a href="#" className="text-pink-600 hover:text-pink-800 text-sm md:text-base font-semibold">Đăng Ký ngay</a>
          </div>
          
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">Hoặc đăng nhập với</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          
          <div className="flex flex-col space-y-4">
            <button
              type="button"
              className="flex items-center justify-center gap-2 w-full py-3 text-base bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-full font-medium transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
              onClick={handleSignIn}
              disabled={isPending}
            >
              <FaGoogle />
              <span>{isPending ? "Đang xử lý..." : "Đăng nhập với Google"}</span>
            </button>
            
            <button
              type="button"
              className="flex items-center justify-center gap-2 w-full py-3 text-base bg-white/70 text-gray-800 rounded-full font-medium border border-gray-200 transition-all duration-300 hover:bg-white hover:shadow-lg transform hover:-translate-y-1"
              onClick={() => router.push("/in-development")}
            >
              <FaFacebook className="text-blue-600" />
              <span>Đăng nhập với Facebook</span>
            </button>
          </div>
        </form>
        
        <div className="mt-8 text-center text-gray-500 text-sm">
          © 2023 Sweet. Bảo mật thông tin người dùng.
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
        
        @keyframes floatMoon {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-15px, 15px); }
          50% { transform: translate(0, 25px); }
          75% { transform: translate(15px, 10px); }
        }
        
        @keyframes floatRandom1 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-15px, 10px); }
          50% { transform: translate(-5px, -15px); }
          75% { transform: translate(10px, 5px); }
        }
        
        @keyframes floatRandom2 {
          0%, 100% { transform: translate(0, 0); }
          20% { transform: translate(10px, -10px); }
          40% { transform: translate(15px, 5px); }
          60% { transform: translate(5px, 15px); }
          80% { transform: translate(-10px, 10px); }
        }
        
        @keyframes floatRandom3 {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(-10px, 15px); }
          66% { transform: translate(15px, -5px); }
        }
        
        @keyframes floatRandom4 {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(15px, 10px); }
          66% { transform: translate(5px, -15px); }
        }
        
        @keyframes floatRandom5 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(10px, 15px); }
          50% { transform: translate(20px, 5px); }
          75% { transform: translate(5px, 10px); }
        }
        
        @keyframes floatRandom6 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-15px, -10px); }
          50% { transform: translate(-5px, 15px); }
          75% { transform: translate(-10px, 5px); }
        }
        
        @keyframes floatRandom7 {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(15px, -15px); }
          66% { transform: translate(-10px, 10px); }
        }
        
        @keyframes floatRandom8 {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(-15px, -10px); }
          66% { transform: translate(10px, 15px); }
        }
        
        .animate-float-moon {
          animation: floatMoon 15s ease-in-out infinite;
        }
        
        .animate-float-random-1 {
          animation: floatRandom1 20s ease-in-out infinite;
        }
        
        .animate-float-random-2 {
          animation: floatRandom2 25s ease-in-out infinite;
        }
        
        .animate-float-random-3 {
          animation: floatRandom3 22s ease-in-out infinite;
        }
        
        .animate-float-random-4 {
          animation: floatRandom4 18s ease-in-out infinite;
        }
        
        .animate-float-random-5 {
          animation: floatRandom5 24s ease-in-out infinite;
        }
        
        .animate-float-random-6 {
          animation: floatRandom6 28s ease-in-out infinite;
        }
        
        .animate-float-random-7 {
          animation: floatRandom7 21s ease-in-out infinite;
        }
        
        .animate-float-random-8 {
          animation: floatRandom8 26s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 3s infinite ease-in-out;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;