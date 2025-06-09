import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Calculator } from 'lucide-react';

// Component để animate từng chữ số
const AnimatedDigit = ({ digit, index }) => {
  const [currentDigit, setCurrentDigit] = useState(digit);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (currentDigit !== digit) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setCurrentDigit(digit);
        setIsAnimating(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [digit, currentDigit]);

  return (
    <motion.span
      key={`${digit}-${index}`}
      className="inline-block"
      animate={isAnimating ? {
        y: [0, -10, 0],
        scale: [1, 1.1, 1],
      } : {}}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
        delay: index * 0.05, // Stagger animation for each digit
      }}
    >
      {currentDigit}
    </motion.span>
  );
};

// Component để animate toàn bộ số tiền
const AnimatedCurrency = ({ amount, prefix = "" }) => {
  const [prevAmount, setPrevAmount] = useState(amount);
  const [isGlowing, setIsGlowing] = useState(false);
  
  useEffect(() => {
    if (prevAmount !== amount) {
      setIsGlowing(true);
      setPrevAmount(amount);
      
      // Turn off glow after animation
      const timer = setTimeout(() => {
        setIsGlowing(false);
      }, 600);
      
      return () => clearTimeout(timer);
    }
  }, [amount, prevAmount]);

  const formatNumberWithAnimation = (num) => {
    const formatted = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formatted.split('').map((char, index) => {
      if (/\d/.test(char)) {
        return <AnimatedDigit key={`${char}-${index}-${num}`} digit={char} index={index} />;
      }
      return <span key={`${char}-${index}`}>{char}</span>;
    });
  };

  return (
    <motion.span
      className={`transition-all duration-300 ${
        isGlowing ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : ''
      }`}
      animate={isGlowing ? {
        textShadow: [
          "0 0 0px rgba(255,255,255,0)",
          "0 0 10px rgba(255,255,255,0.8)",
          "0 0 0px rgba(255,255,255,0)"
        ]
      } : {}}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {prefix}{formatNumberWithAnimation(amount)}
    </motion.span>
  );
};

const MobileBottomCard = ({ calculatedInterest, formatCurrency, step }) => {
  const [glowIntensity, setGlowIntensity] = useState(0);
  const prevInterestRef = useRef(calculatedInterest.interestAmount);
  const prevTotalRef = useRef(calculatedInterest.totalAmount);

  useEffect(() => {
    // Check if either interest or total amount changed
    if (
      prevInterestRef.current !== calculatedInterest.interestAmount ||
      prevTotalRef.current !== calculatedInterest.totalAmount
    ) {
      setGlowIntensity(1);
      
      // Gradually reduce glow
      const timer = setTimeout(() => {
        setGlowIntensity(0);
      }, 600);

      prevInterestRef.current = calculatedInterest.interestAmount;
      prevTotalRef.current = calculatedInterest.totalAmount;
      
      return () => clearTimeout(timer);
    }
  }, [calculatedInterest.interestAmount, calculatedInterest.totalAmount]);

  return (
    <div className="fixed bottom-20 left-0 right-0 md:left-1/2 md:transform md:-translate-x-1/2 z-50">
      <AnimatePresence>
        {step === 3 && (
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.8 }}
            animate={{ 
              y: 0, 
              opacity: 1, 
              scale: 1 
            }}
            exit={{ 
              y: 100, 
              opacity: 0, 
              scale: 0.8,
              transition: {
                duration: 0.4,
                ease: "backIn"
              }
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="mx-4 mb-4"
          >
            <motion.div
              className="bg-gradient-to-r from-pink-500/40 via-rose-500/40 to-pink-600/40 rounded-3xl p-4 border border-pink-200/20 backdrop-blur-sm relative overflow-hidden"
              animate={{
                boxShadow: glowIntensity > 0 ? [
                  "0 0 0px rgba(236, 72, 153, 0)",
                  "0 0 70px rgba(236, 72, 153, 0.7)",
                  "0 0 40px rgba(236, 72, 153, 0.5)",
                  "0 0 0px rgba(236, 72, 153, 0)"
                ] : "0 0 0px rgba(236, 72, 153, 0)"                
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {/* Floating decorative elements */}
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-br from-pink-300/60 to-white/40 blur-sm animate-pulse" />
              <div
                className="absolute top-2 left-2 w-2 h-2 rounded-full bg-white/30 blur-sm animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />

              <div className="relative flex items-center justify-between text-white">
                {/* Interest Amount */}
                <div className="flex text-center items-center gap-2 md:ml-6">
                  <motion.div 
                    className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm"
                    animate={glowIntensity > 0 ? {
                      scale: [1, 1.1, 1],
                      backgroundColor: [
                        "rgba(255,255,255,0.2)",
                        "rgba(255,255,255,0.4)",
                        "rgba(255,255,255,0.2)"
                      ]
                    } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    <TrendingUp size={14} className="text-white" />
                  </motion.div>
                  <div>
                    <p className="text-xs text-pink-100 font-medium">
                      Lãi dự kiến
                    </p>
                    <p className="text-sm font-bold text-white">
                      <AnimatedCurrency 
                        amount={calculatedInterest.interestAmount} 
                        prefix="+"
                      />
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-px h-8 bg-white/30" />

                {/* Total Amount */}
                <div className="flex items-center gap-2 md:mr-4">
                  <motion.div 
                    className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm"
                    animate={glowIntensity > 0 ? {
                      scale: [1, 1.1, 1],
                      backgroundColor: [
                        "rgba(255,255,255,0.2)",
                        "rgba(255,255,255,0.4)",
                        "rgba(255,255,255,0.2)"
                      ]
                    } : {}}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <Calculator size={14} className="text-white" />
                  </motion.div>
                  <div>
                    <p className="text-xs text-pink-100 font-medium">
                      Tổng nhận
                    </p>
                    <p className="text-sm font-bold text-white">
                      <AnimatedCurrency amount={calculatedInterest.totalAmount} />
                    </p>
                  </div>
                </div>
              </div>

              {/* Enhanced glow effect */}
              <motion.div 
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400/20 to-rose-400/20 blur-xl -z-10"
                animate={{
                  opacity: glowIntensity > 0 ? [0.2, 0.6, 0.3, 0.2] : 0.2,
                  scale: glowIntensity > 0 ? [1, 1.05, 1] : 1
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              
              {/* Additional pulsing glow when values change */}
              <AnimatePresence>
                {glowIntensity > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: [0, 0.4, 0],
                      scale: [0.8, 1.2, 1.4],
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-300/30 to-rose-300/30 blur-2xl -z-20"
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileBottomCard;