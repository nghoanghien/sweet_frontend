'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronsRight } from 'lucide-react';
import styles from './SwipeToConfirm.module.css';

const SwipeToConfirm = ({ 
  onComplete, 
  text = "Quẹt để thanh toán", 
  disabled = false,
  className = "",
  type = "primary" // primary, success, warning, danger
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const sliderRef = useRef(null);
  const knobRef = useRef(null);
  const initialTouchPos = useRef(null);
  
  // Track slider width for calculations
  const [sliderWidth, setSliderWidth] = useState(0);
  
  useEffect(() => {
    if (sliderRef.current) {
      setSliderWidth(sliderRef.current.offsetWidth);
    }
    
    const handleResize = () => {
      if (sliderRef.current) {
        setSliderWidth(sliderRef.current.offsetWidth);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Reset when disabled state changes
  useEffect(() => {
    if (disabled) {
      resetSlider();
    }
  }, [disabled]);
  
  const startDrag = (e) => {
    if (disabled || isComplete) return;
    
    const pos = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    initialTouchPos.current = pos;
    setIsDragging(true);
  };
  
  const onDrag = (e) => {
    if (!isDragging || disabled || isComplete) return;
    
    // Prevent scrolling when dragging
    e.preventDefault();
    
    const pos = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const knobWidth = knobRef.current ? knobRef.current.offsetWidth : 50;
    const maxDrag = sliderWidth - knobWidth - 8; // 8px is padding
    
    // Calculate drag distance
    const dragDistance = pos - initialTouchPos.current;
    
    // Calculate new position with constraints
    const newPosition = Math.max(0, Math.min(dragDistance, maxDrag));
    setDragPosition(newPosition);
    
    // Check if complete
    if (newPosition >= maxDrag * 0.95) { // 95% threshold for completion
      setIsComplete(true);
      setDragPosition(maxDrag);
      setIsDragging(false);
      onComplete && onComplete();
    }
  };
  
  const endDrag = () => {
    if (!isDragging || isComplete) return;
    setIsDragging(false);
    
    // If not completed, reset position
    if (!isComplete) {
      resetSlider();
    }
  };
  
  const resetSlider = () => {
    setDragPosition(0);
    setIsComplete(false);
  };
  
  // Calculate completion percentage for background gradient
  const completionPercent = Math.min(100, (dragPosition / (sliderWidth - (knobRef.current?.offsetWidth || 50) - 8)) * 100);
  
  // Get background colors based on type
  const getBackgroundColors = () => {
    switch(type) {
      case 'success':
        return {
          start: '#16a34a', // green-500
          end:   '#22c55e'  // green-600
        };
      case 'warning':
        return {
          start:  '#d97706' , // amber-500
          end:  '#f59e0b'  // amber-600
        };
      case 'danger':
        return {
          start: '#ef4444', // red-500
          end: '#dc2626'    // red-600
        };
      case 'pink':
        return {
          start: '#db2777', // pink-500
          end: '#ec4899'  // pink-600
        };
      case 'withdrawal': 
        return {
          start: '#0ea5e9', // sky-500
          end: '#38bdf8'    // sky-600
        };
      case 'deposit':
        return {
          start: '#0ea5e9', // green-500
          end: '#38bdf8'    // green-600
        };
      default:
        return {
          start: '#0ea5e9', // sky-500
          end: '#38bdf8'    // sky-600
        };
    }
  };
  
  const colors = getBackgroundColors();
  
  return (
    <div 
      ref={sliderRef}
      className={`relative flex items-center rounded-full h-14 w-80 sm:w-80 shadow-md select-none overflow-hidden ${className} ${disabled ? 'opacity-70' : ''}`}
      style={{
        background: `linear-gradient(to right, ${colors.start} ${completionPercent}%, ${colors.end} ${completionPercent}%)`,
      }}
    >
      {/* Shimmering overlay effect */}
      <div className={`absolute inset-0 z-0 ${styles.shimmerOverlay}`} />
      
      {/* Touch/click capture area */}
      <div 
        className="absolute inset-0 z-10"
        onMouseDown={startDrag}
        onTouchStart={startDrag}
        onMouseMove={onDrag}
        onTouchMove={onDrag}
        onMouseUp={endDrag}
        onTouchEnd={endDrag}
        onMouseLeave={endDrag}
      />
      
      {/* Slider Knob with shimmering effect */}
      <div
        ref={knobRef}
        className="absolute left-0 top-1/2 -translate-y-1/2 p-1.5 z-20 pointer-events-none"
        style={{
          transform: `translate(${dragPosition}px, -50%)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out'
        }}
      >
        <div className="bg-white rounded-full h-11 w-11 flex items-center justify-center shadow-md overflow-hidden">
          <div className={styles.shimmerContainer}>
            <ChevronsRight size={28} className={`text-neutral-700 ${styles.shimmerIcon}`} strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Text with shimmering effect */}
      <span className="flex-grow text-center text-white text-lg font-semibold pl-10 pr-4">
        {text}
      </span>
    </div>
  );
};

export default SwipeToConfirm;