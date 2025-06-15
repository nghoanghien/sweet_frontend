import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * LoadingOverlay - A reusable component to display a loading overlay during page transitions
 * with a "Glow Dot Pulse" animation theme showing glowing coin seeds
 * 
 * @param {Object} props
 * @param {boolean} props.isLoading - Controls the visibility of the loading overlay
 * @param {string} props.message - Custom message to display (optional)
 * @param {boolean} props.isSimple - If true, shows simple version without quotes and backdrop blur
 * @param {string} props.size - Size of the component: 'xs', 'sm', 'md', 'lg', 'xl'
 * @param {number} props.coinCount - Number of coins to display (default: 4)
 * @param {string} props.animationType - Animation type: 'pulse', 'spring-trail', or 'spinner'
 */
const LoadingOverlay = ({
  isLoading,
  message = 'Đang tải',
  isSimple = false,
  size = 'xl',
  coinCount = 5,
  animationType = 'spring-trail'
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
  
  // Size configurations
  const sizeConfig = {
    xs: {
      container: 'h-24 w-24',
      coin: 'w-3 h-3',
      coinInner: 'w-2 h-2',
      coinSpacing: 'mx-1',
      glowOuter: { width: '24px', height: '24px', left: '-6px', top: '-6px' },
      glowMiddle: { width: '18px', height: '18px', left: '-3px', top: '-3px' },
      text: 'text-xs',
      textBottom: 'bottom-2',
      quoteBottom: 'bottom-8',
      quoteHeight: 'h-12',
      fontSize: 'text-xs'
    },
    sm: {
      container: 'h-32 w-32',
      coin: 'w-4 h-4',
      coinInner: 'w-3 h-3',
      coinSpacing: 'mx-1.5',
      glowOuter: { width: '32px', height: '32px', left: '-8px', top: '-8px' },
      glowMiddle: { width: '24px', height: '24px', left: '-4px', top: '-4px' },
      text: 'text-sm',
      textBottom: 'bottom-3',
      quoteBottom: 'bottom-10',
      quoteHeight: 'h-16',
      fontSize: 'text-sm'
    },
    md: {
      container: 'h-64 w-64',
      coin: 'w-6 h-6',
      coinInner: 'w-4 h-4',
      coinSpacing: 'mx-2',
      glowOuter: { width: '48px', height: '48px', left: '-12px', top: '-12px' },
      glowMiddle: { width: '36px', height: '36px', left: '-6px', top: '-6px' },
      text: 'text-base',
      textBottom: 'bottom-4',
      quoteBottom: 'bottom-16',
      quoteHeight: 'h-20',
      fontSize: 'text-base'
    },
    lg: {
      container: 'h-96 w-96',
      coin: 'w-8 h-8',
      coinInner: 'w-6 h-6',
      coinSpacing: 'mx-3',
      glowOuter: { width: '60px', height: '60px', left: '-15px', top: '-15px' },
      glowMiddle: { width: '45px', height: '45px', left: '-7.5px', top: '-7.5px' },
      text: 'text-base',
      textBottom: 'bottom-8',
      quoteBottom: 'bottom-24',
      quoteHeight: 'h-24',
      fontSize: 'text-base'
    },
    xl: {
      container: 'h-[32rem] w-[32rem]',
      coin: 'w-12 h-12',
      coinInner: 'w-8 h-8',
      coinSpacing: 'mx-4',
      glowOuter: { width: '80px', height: '80px', left: '-20px', top: '-20px' },
      glowMiddle: { width: '60px', height: '60px', left: '-10px', top: '-10px' },
      text: 'text-lg',
      textBottom: 'bottom-12',
      quoteBottom: 'bottom-32',
      quoteHeight: 'h-32',
      fontSize: 'text-lg'
    }
  };

  const currentSize = sizeConfig[size] || sizeConfig.lg;
  
  // Inspirational quotes about saving money (only used when not simple)
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
  
  // Animation variants
  const getAnimationVariants = (index) => {
    if (animationType === 'spring-trail') {
      return {
        animate: {
          y: [0, -20, 0],
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
        },
        transition: {
          duration: 2,
          repeat: Infinity,
          delay: index * 0.2,
          ease: [0.43, 0.13, 0.23, 0.96], // Spring easing
        }
      };
    } else if (animationType === 'spinner') {
      // For spinner, the central coin stays still
      return {
        animate: {
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8],
        },
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      };
    } else {
      // Default pulse animation
      return {
        animate: {
          scale: [1, 1.3, 1],
          opacity: [0.7, 1, 0.7],
        },
        transition: {
          duration: 1.5,
          repeat: Infinity,
          delay: index * 0.3,
          ease: "easeInOut"
        }
      };
    }
  };

  const getGlowAnimationVariants = (index) => {
    if (animationType === 'spring-trail') {
      return {
        outer: {
          animate: {
            scale: [1, 2.5, 1],
            opacity: [0, 0.5, 0],
            rotate: [0, 180, 360],
          },
          transition: {
            duration: 2,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeOut"
          }
        },
        middle: {
          animate: {
            scale: [1, 1.8, 1],
            opacity: [0.3, 0.9, 0.3],
            rotate: [0, -90, -180],
          },
          transition: {
            duration: 2,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut"
          }
        }
      };
    } else if (animationType === 'spinner') {
      // For spinner, the central coin has gentle glow
      return {
        outer: {
          animate: {
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.6, 0.2],
          },
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        },
        middle: {
          animate: {
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4],
          },
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }
      };
    } else {
      // Default glow animation
      return {
        outer: {
          animate: {
            scale: [1, 2, 1],
            opacity: [0, 0.4, 0],
          },
          transition: {
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.3,
            ease: "easeOut"
          }
        },
        middle: {
          animate: {
            scale: [1, 1.6, 1],
            opacity: [0.3, 0.8, 0.3],
          },
          transition: {
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.3,
            ease: "easeInOut"
          }
        }
      };
    }
  };
  
  // Typing effect for quotes (only when not simple)
  useEffect(() => {
    if (isLoading && !isSimple) {
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
    }
    
    if (isLoading) {
      // Start loading dots animation
      startLoadingDotsAnimation();
    }
    
    return () => {
      // Clean up timers
      if (typingRef.current) clearTimeout(typingRef.current);
      if (quoteTimerRef.current) clearInterval(quoteTimerRef.current);
      if (dotsTimerRef.current) clearInterval(dotsTimerRef.current);
    };
  }, [isLoading, isSimple]);
  
  // Reset when quote changes (only when not simple)
  useEffect(() => {
    if (isTyping && isLoading && !isSimple) {
      startTypingEffect();
    }
    
    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [currentQuoteIndex, isTyping, isLoading, isSimple]);
  
  // Function to handle typing effect
  const startTypingEffect = () => {
    if (isSimple) return;
    
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

  const containerClass = isSimple 
    ? "fixed inset-0 z-50 flex items-center justify-center bg-transparent"
    : "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-lg";

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className={containerClass}
        >
          {/* Floating particles background (only when not simple) */}
          {!isSimple && (
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
          )}
          
          {/* Main animation container */}
          <div className={`relative flex flex-col items-center justify-center ${currentSize.container}`}>
            
            {/* Coin Animation */}
            <div className={`relative flex items-center justify-center ${isSimple ? 'mb-4' : 'mb-16'}`}>
              {animationType === 'spinner' ? (
                // Spinner animation with central coin and rotating elements
                <div className="relative">
                  {/* Rotating orbit rings */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-yellow-300/30"
                    style={{
                      width: currentSize.glowOuter.width,
                      height: currentSize.glowOuter.height,
                      left: currentSize.glowOuter.left,
                      top: currentSize.glowOuter.top,
                    }}
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  
                  <motion.div
                    className="absolute inset-0 rounded-full border border-amber-400/40"
                    style={{
                      width: currentSize.glowMiddle.width,
                      height: currentSize.glowMiddle.height,
                      left: currentSize.glowMiddle.left,
                      top: currentSize.glowMiddle.top,
                    }}
                    animate={{ rotate: [360, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />

                  {/* Orbiting small dots */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-yellow-400 rounded-full shadow-lg"
                      style={{
                        left: '50%',
                        top: '50%',
                        marginLeft: '-4px',
                        marginTop: '-4px',
                      }}
                      animate={{
                        rotate: [0, 360],
                        x: [0, Math.cos((i * 120) * Math.PI / 180) * (parseInt(currentSize.glowMiddle.width) / 2 - 4)],
                        y: [0, Math.sin((i * 120) * Math.PI / 180) * (parseInt(currentSize.glowMiddle.height) / 2 - 4)],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.8,
                        ease: "linear"
                      }}
                    />
                  ))}

                  {/* Central stationary coin */}
                  <motion.div
                    className="relative"
                    animate={getAnimationVariants(0).animate}
                    transition={getAnimationVariants(0).transition}
                  >
                    {/* Central coin glow effects */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={getGlowAnimationVariants(0).outer.animate}
                      transition={getGlowAnimationVariants(0).outer.transition}
                      style={{
                        background: 'radial-gradient(circle, rgba(255, 215, 0, 0.6) 0%, rgba(255, 215, 0, 0) 70%)',
                        width: currentSize.glowOuter.width,
                        height: currentSize.glowOuter.height,
                        left: currentSize.glowOuter.left,
                        top: currentSize.glowOuter.top,
                      }}
                    />
                    
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300/40 to-amber-400/40"
                      animate={getGlowAnimationVariants(0).middle.animate}
                      transition={getGlowAnimationVariants(0).middle.transition}
                      style={{
                        width: currentSize.glowMiddle.width,
                        height: currentSize.glowMiddle.height,
                        left: currentSize.glowMiddle.left,
                        top: currentSize.glowMiddle.top,
                      }}
                    />
                    
                    {/* Central coin (stationary) */}
                    <div className={`${currentSize.coin} rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 flex items-center justify-center shadow-lg border-2 border-yellow-200/50`}>
                      <div className={`${currentSize.coinInner} rounded-full bg-gradient-to-br from-yellow-100 to-yellow-300 flex items-center justify-center`}>
                        <span className={`text-amber-800 ${currentSize.fontSize === 'text-xs' ? 'text-[8px]' : currentSize.fontSize === 'text-sm' ? 'text-[10px]' : currentSize.fontSize === 'text-base' ? 'text-xs' : currentSize.fontSize === 'text-lg' ? 'text-sm' : 'text-base'} font-bold`}>₫</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ) : (
                // Original multiple coins animation
                [...Array(coinCount)].map((_, i) => {
                  const coinVariant = getAnimationVariants(i);
                  const glowVariants = getGlowAnimationVariants(i);
                  
                  return (
                    <motion.div
                      key={i}
                      className={`relative ${currentSize.coinSpacing}`}
                      animate={coinVariant.animate}
                      transition={coinVariant.transition}
                    >
                      {/* Outer glow ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={glowVariants.outer.animate}
                        transition={glowVariants.outer.transition}
                        style={{
                          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.6) 0%, rgba(255, 215, 0, 0) 70%)',
                          width: currentSize.glowOuter.width,
                          height: currentSize.glowOuter.height,
                          left: currentSize.glowOuter.left,
                          top: currentSize.glowOuter.top,
                        }}
                      />
                      
                      {/* Middle glow */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300/40 to-amber-400/40"
                        animate={glowVariants.middle.animate}
                        transition={glowVariants.middle.transition}
                        style={{
                          width: currentSize.glowMiddle.width,
                          height: currentSize.glowMiddle.height,
                          left: currentSize.glowMiddle.left,
                          top: currentSize.glowMiddle.top,
                        }}
                      />
                      
                      {/* Coin seed dot */}
                      <div className={`${currentSize.coin} rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 flex items-center justify-center shadow-lg border-2 border-yellow-200/50`}>
                        <motion.div
                          animate={{
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                          className={`${currentSize.coinInner} rounded-full bg-gradient-to-br from-yellow-100 to-yellow-300 flex items-center justify-center`}
                        >
                          <span className={`text-amber-800 ${currentSize.fontSize === 'text-xs' ? 'text-[8px]' : currentSize.fontSize === 'text-sm' ? 'text-[10px]' : currentSize.fontSize === 'text-base' ? 'text-xs' : currentSize.fontSize === 'text-lg' ? 'text-sm' : 'text-base'} font-bold`}>₫</span>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
            
            {/* Typing quote animation (only when not simple) */}
            {!isSimple && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: isTyping ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className={`absolute ${currentSize.quoteBottom} ${currentSize.quoteHeight} flex items-center justify-center w-full px-8`}
              >
                <p className={`text-white font-medium text-center text-shadow-lg max-w-md leading-relaxed italic ${currentSize.fontSize}`}>
                  {displayedText}
                  <span className="inline-block w-0.5 h-5 bg-white ml-1 animate-blink"></span>
                </p>
              </motion.div>
            )}
            
            {/* Loading message with animated dots */}
            {message && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={`${isSimple ? 'text-gray-600' : 'text-white/80'} ${currentSize.text} font-medium text-center ${isSimple ? '' : 'text-shadow-sm'} absolute ${currentSize.textBottom} left-0 right-0`}
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