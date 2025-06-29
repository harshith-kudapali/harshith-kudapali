import React, { useState, useEffect, useRef } from 'react';

const LoadingScreen = ({onComplete}) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const audioRef = useRef(null);

  const terminalLines = [
    // // { text: "INITIALIZING QUANTUM NEURAL NETWORK...", delay: 10 },
    // { text: "ESTABLISHING SECURE CONNECTION TO MAINFRAME...", delay: 10 },
    // { text: "BYPASSING FIREWALL PROTOCOLS...", delay: 15 },
    // { text: "DECRYPTING ACCESS CREDENTIALS...", delay: 15 },
    // { text: "AUTHENTICATING BIOMETRIC SIGNATURE...", delay: 10 },
    // { text: "LOADING CLASSIFIED DATABASE...", delay: 10 },
    // { text: "SYNCHRONIZING NEURAL INTERFACE...", delay: 10 },
    // { text: "ACCESS GRANTED - WELCOME TO THE MATRIX", delay: 10 }
  ];

  const glitchChars = "!@#$%^&*()_+-=[]{}|;':\",./<>?`~";
  const [glitchText, setGlitchText] = useState("");

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  // Main typing animation
  useEffect(() => {
    if (currentLine >= terminalLines.length) {
      setShowProgressBar(true);
      return;
    }

    const currentLineData = terminalLines[currentLine];
    
    if (currentChar < currentLineData.text.length) {
      const timeout = setTimeout(() => {
        setCurrentChar(prev => prev + 1);
      }, currentLineData.delay);

      return () => clearTimeout(timeout);
    } else {
      // Move to next line after a brief pause
      const timeout = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
        setCurrentChar(0);
      }, 800);

      return () => clearTimeout(timeout);
    }
  }, [currentLine, currentChar]);

  // Progress bar animation
  useEffect(() => {
    if (showProgressBar && progress < 100) {
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + Math.random() * 3 + 1;
          if (newProgress >= 100) {
            setTimeout(() => setIsComplete(true), 1000);
            return 100;
          }
          return newProgress;
        });
      }, 100);

      return () => clearInterval(progressInterval);
    }
  }, [showProgressBar, progress]);

  // Glitch effect for completed state
  useEffect(() => {
    if (isComplete) {
      const glitchInterval = setInterval(() => {
        const randomText = Array.from({ length: 20 }, () => 
          glitchChars[Math.floor(Math.random() * glitchChars.length)]
        ).join('');
        setGlitchText(randomText);
      }, 100);

      const clearGlitch = setTimeout(() => {
        clearInterval(glitchInterval);
        setGlitchText("");
      }, 2000);

      return () => {
        clearInterval(glitchInterval);
        clearTimeout(clearGlitch);
      };
    }
    setTimeout(() => onComplete && onComplete(), 7000);
  }, [isComplete]);

  const renderProgressBar = () => {
    const filledWidth = Math.floor((progress / 100) * 50);
    const emptyWidth = 50 - filledWidth;
    
    return (
      <div className="mt-6">
        <div className="text-green-400 mb-2 font-mono text-sm">
          LOADING... {Math.floor(progress)}%
        </div>
        <div className="flex items-center font-mono text-green-500">
          <span className="mr-2">[</span>
          <span className="text-green-400">
            {'█'.repeat(filledWidth)}
          </span>
          <span className="text-gray-700">
            {'░'.repeat(emptyWidth)}
          </span>
          <span className="ml-2">]</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono overflow-hidden relative">
      {/* Scanline effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-pulse pointer-events-none"></div>
      
      {/* Background matrix rain effect */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          >
            {Math.random() > 0.5 ? '1' : '0'}
          </div>
        ))}
      </div>

      <div className="relative z-10 p-4 sm:p-8">
        {/* Header */}
        <div className="mb-8 border-b border-green-500/30 pb-4">
          <div className="text-green-400 text-xl sm:text-2xl font-bold mb-2">
            ████ SECURE TERMINAL v3.14.159 ████
          </div>
          <div className="text-green-600 text-sm">
            Connection established from: 127.0.0.1:8080
          </div>
          <div className="text-green-600 text-sm">
            Timestamp: {new Date().toISOString()}
          </div>
        </div>

        {/* Terminal output */}
        <div className="space-y-2 mb-8">
          {terminalLines.slice(0, currentLine + 1).map((line, index) => (
            <div key={index} className="flex items-center">
              <span className="text-green-400 mr-2">root@matrix:~$</span>
              <span className="text-green-500">
                {index === currentLine 
                  ? line.text.slice(0, currentChar)
                  : line.text
                }
                {index === currentLine && showCursor && (
                  <span className="bg-green-500 text-black animate-pulse">█</span>
                )}
              </span>
            </div>
          ))}
        </div>

        {/* Progress section */}
        {showProgressBar && (
          <div className="border border-green-500/30 p-4 bg-green-500/5">
            {renderProgressBar()}
            
            {progress > 30 && (
              <div className="mt-4 text-green-400 text-sm">
                <div>→ Quantum encryption keys: SYNCHRONIZED</div>
              </div>
            )}
            
            {progress > 60 && (
              <div className="mt-2 text-green-400 text-sm">
                <div>→ Neural pathways: MAPPED</div>
              </div>
            )}
            
            {progress > 85 && (
              <div className="mt-2 text-green-400 text-sm">
                <div>→ Security protocols: BYPASSED</div>
              </div>
            )}
          </div>
        )}

        {/* Completion state */}
        {isComplete && (
          <div className="mt-8 text-center">
            <div className="text-green-400 text-2xl sm:text-3xl font-bold animate-pulse mb-4">
              ACCESS GRANTED
            </div>
            {glitchText && (
              <div className="text-red-500 font-bold animate-pulse">
                {glitchText}
              </div>
            )}
            <div className="mt-6">
             
            </div>
          </div>
        )}

        {/* System stats */}
        <div className="fixed bottom-4 left-4 right-4 sm:left-8 sm:right-8">
          <div className="flex flex-col sm:flex-row justify-between text-xs text-green-600 space-y-1 sm:space-y-0">
            <div>CPU: {Math.floor(Math.random() * 40 + 60)}% | RAM: {Math.floor(Math.random() * 30 + 70)}%</div>
            <div>NET: {Math.floor(Math.random() * 1000 + 500)}kb/s</div>
            <div>TEMP: {Math.floor(Math.random() * 20 + 35)}°C</div>
          </div>
        </div>
      </div>

      {/* Glitch overlay */}
      {Math.random() > 0.95 && (
        <div className="absolute inset-0 bg-green-500/10 animate-ping pointer-events-none"></div>
      )}
    </div>
  );
};

export default LoadingScreen;