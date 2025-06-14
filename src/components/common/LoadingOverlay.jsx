import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * LoadingOverlay - A reusable component to display a loading overlay during page transitions
 * with a "Glow Dot Pulse" animation theme showing glowing coin seeds
 * 
 * @param {Object} props
 * @param {boolean} props.isLoading - Controls the visibility of the loading overlay
 * @param {string} props.message - Custom message to display (optional)
 */
const LoadingOverlay = ({
  isLoading,
  message = 'Đang tải'
}) => {
  // State for managing the current quote and animation cycle
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [loadingDots, setLoadingDots] = useState('.');
  
  const typingSpeed = 60; // ms per character
  const typingRef = useRef(null);
  const quoteTimerRef = useRef(null);
  const dotsTimerRef = useRef(null);
  
  // Inspirational quotes about saving money (expanded with deeper thoughts)
  const savingQuotes = [
    '🌱 "Tiền không mọc trên cây… trừ khi đó là cây kiên nhẫn."',
    '🌿 "Người giàu không tiêu những gì còn lại sau khi tiết kiệm; họ tiết kiệm những gì còn lại sau khi tiêu."',
    '🌞 "Một hạt giống hôm nay là một khu rừng ngày mai."',
    '⏳ "Thời gian + Tiết kiệm = Phép màu kép lãi. Einstein đã nói: lãi kép là kỳ quan thứ 8 của thế giới."',
    '🎯 "Mỗi đồng tiết kiệm hôm nay là một bước tự do tài chính ngày mai."',
    '🔥 "Khát vọng tài chính bắt đầu từ việc nói KHÔNG với những thứ không cần thiết. Vậy nên hãy tiết kiệm ngay hôm nay!"',
    '🏆 "Tiết kiệm là cuộc thi marathon, không phải sprint. Người chiến thắng là người kiên trì nhất."',
    '🌟 "Tự do tài chính không phải là có nhiều tiền để tiêu, mà là có đủ tiền để không phải lo lắng."',
    '🎪 "Tiền trong tài khoản tiết kiệm như lá chắn bảo vệ bạn khỏi những cơn bão bất ngờ của cuộc sống."',
    '🌈 "Mỗi khoản tiết kiệm là một lời hứa bạn giữ với tương lai của chính mình."',
    '⚡ "Sức mạnh thật sự không nằm ở việc kiếm được bao nhiêu, mà ở việc giữ được bao nhiêu."',
    '🎨 "Tiết kiệm là nghệ thuật sống: biết cân bằng giữa hiện tại và tương lai."'
  ];
  
  // Typing effect for quotes
  useEffect(() => {
    if (isLoading) {
      // Start with the first quote
      startTypingEffect();
      
      // Set up interval to change quotes
      quoteTimerRef.current = setInterval(() => {
        setIsTyping(false); // Stop typing current quote
        
        // Wait for fade out, then change quote and start typing again
        setTimeout(() => {
          setCurrentQuoteIndex(prevIndex => (prevIndex + 1) % savingQuotes.length);
          setDisplayedText('');
          setIsTyping(true);
          startTypingEffect();
        }, 500); // Fade out duration
      }, 8000); // Show each quote for 8 seconds
      
      // Start loading dots animation
      startLoadingDotsAnimation();
    }
    
    return () => {
      // Clean up timers
      if (typingRef.current) clearTimeout(typingRef.current);
      if (quoteTimerRef.current) clearInterval(quoteTimerRef.current);
      if (dotsTimerRef.current) clearInterval(dotsTimerRef.current);
    };
  }, [isLoading]);
  
  // Reset when quote changes
  useEffect(() => {
    if (isTyping && isLoading) {
      startTypingEffect();
    }
    
    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [currentQuoteIndex, isTyping, isLoading]);
  
  // Function to handle typing effect
  const startTypingEffect = () => {
    const currentQuote = savingQuotes[currentQuoteIndex];
    let charIndex = 0;
    
    const typeNextChar = () => {
      if (charIndex <= currentQuote.length && isTyping) {
        setDisplayedText(currentQuote.substring(0, charIndex));
        charIndex++;
        
        typingRef.current = setTimeout(typeNextChar, typingSpeed);
      }
    };
    
    typeNextChar();
  };
  
  // Function to animate loading dots
  const startLoadingDotsAnimation = () => {
    dotsTimerRef.current = setInterval(() => {
      setLoadingDots(prev => {
        if (prev.length >= 3) return '.';
        return prev + '.';
      });
    }, 400); // Change dots every 400ms
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-lg"
        >
          {/* Floating particles background */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -Math.random() * 120 - 80],
                  x: [0, (Math.random() - 0.5) * 60],
                  opacity: [0, 0.6, 0],
                  scale: [0, Math.random() + 0.3, 0],
                }}
                transition={{
                  duration: 6 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 6,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
          
          {/* Main animation container */}
          <div className="relative flex flex-col items-center justify-center h-96 w-96">
            
            {/* Glow Dot Pulse Animation - 4 coin seeds */}
            <div className="relative flex items-center justify-center mb-16">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="relative mx-3"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3, // Stagger the animation
                    ease: "easeInOut"
                  }}
                >
                  {/* Outer glow ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0, 0.4, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeOut"
                    }}
                    style={{
                      background: 'radial-gradient(circle, rgba(255, 215, 0, 0.6) 0%, rgba(255, 215, 0, 0) 70%)',
                      width: '60px',
                      height: '60px',
                      left: '-15px',
                      top: '-15px',
                    }}
                  />
                  
                  {/* Middle glow */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300/40 to-amber-400/40"
                    animate={{
                      scale: [1, 1.6, 1],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut"
                    }}
                    style={{
                      width: '45px',
                      height: '45px',
                      left: '-7.5px',
                      top: '-7.5px',
                    }}
                  />
                  
                  {/* Coin seed dot */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 flex items-center justify-center shadow-lg border-2 border-yellow-200/50">
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 2,
                        ease: "linear"
                      }}
                      className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-300 flex items-center justify-center"
                    >
                      <span className="text-amber-800 text-xs font-bold">₫</span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Typing quote animation */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: isTyping ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-24 h-24 flex items-center justify-center w-full px-8"
            >
              <p className="text-white font-medium text-center text-shadow-lg max-w-md leading-relaxed italic">
                {displayedText}
                <span className="inline-block w-0.5 h-5 bg-white ml-1 animate-blink"></span>
              </p>
            </motion.div>
            
            {/* Loading message with animated dots */}
            {message && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-white/80 text-sm font-medium text-center text-shadow-sm absolute bottom-8 left-0 right-0"
              >
                {message}{loadingDots}
              </motion.p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Add custom animation to global styles
const LoadingOverlayWithStyles = ({ ...props }) => {
  return (
    <>
      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        
        .text-shadow-sm {
          text-shadow: 0 1px 3px rgba(0,0,0,0.6);
        }
        
        .text-shadow-lg {
          text-shadow: 0 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.3);
        }
      `}</style>
      <LoadingOverlay {...props} />
    </>
  );
};

export default LoadingOverlayWithStyles;