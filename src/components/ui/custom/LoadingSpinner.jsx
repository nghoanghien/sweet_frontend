import React from 'react';

const LoadingSpinner = ({ size = 48, color = '#3B82F6' }) => {
  return (
    <div className="flex items-center justify-center">
      <div 
        className="relative animate-spin"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        {/* Main spinning ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg, ${color} 90deg, transparent 180deg, ${color} 270deg, transparent 360deg)`,
            animation: 'spin 2.5s linear infinite',
          }}
        />
        
        {/* Inner white circle to create ring effect */}
        <div
          className="absolute bg-white rounded-full"
          style={{
            top: '6px',
            left: '6px',
            right: '6px',
            bottom: '6px',
          }}
        />
        
        {/* Glowing effect */}
        <div
          className="absolute inset-0 rounded-full opacity-30 blur-sm"
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg, ${color} 90deg, transparent 180deg, ${color} 270deg, transparent 360deg)`,
            animation: 'spin 1.5s linear infinite',
          }}
        />
        
        {/* Small dots for extra visual appeal */}
        <div
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: color,
            top: '2px',
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
        
        <div
          className="absolute w-1.5 h-1.5 rounded-full opacity-60"
          style={{
            backgroundColor: color,
            bottom: '2px',
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'pulse 1.5s ease-in-out infinite 0.75s',
          }}
        />
      </div>
      
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: translateX(-50%) scale(1);
          }
          50% {
            opacity: 0.6;
            transform: translateX(-50%) scale(0.8);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;