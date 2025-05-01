// src/components/LoadingScreen.jsx
import React, { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50">
      <div className="text-5xl font-bold text-blue-500 mb-8 animate-pulse">
        INITIALIZING...
      </div>
      <div className="w-64 h-4 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
          style={{ width: `${progress}%`, transition: 'width 0.1s ease-out' }}
        />
      </div>
      <div className="mt-2 text-blue-400 font-mono">
        Loading: {progress}%
      </div>
      <div className="mt-8 text-gray-400 text-sm font-mono max-w-md text-center">
        <span className="typing-effect">
          Connecting neural networks... Calibrating UI systems... Parsing code repositories...
        </span>
      </div>
    </div>
  );
};

export default LoadingScreen;