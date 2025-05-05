// src/components/HackerTerminal.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import _ from 'lodash';

const HACKER_PHRASES = [
  "Bypassing security protocols...",
  "Initializing UI components...",
  "Accessing portfolio data...",
  "Loading project modules...",
  "Mounting developer profile...",
  "Establishing secure connection...",
  "Deploying frontend systems...",
  "Scanning GitHub repositories...",
  "Processing LeetCode statistics...",
  "Configuring user interface...",
  "Optimizing React components...",
  "Rendering neural interface...",
  "Decrypting project files...",
  "Analyzing code portfolio...",
  "Hacking the mainframe...",
  "Synchronizing development timeline...",
];

const COMPLETION_BADGES = [
  { name: "Interface Initialized", description: "UI components loaded successfully", points: 10 },
  { name: "Data Accessed", description: "Portfolio data retrieved and decrypted", points: 25 },
  { name: "Systems Online", description: "Core modules connected and operational", points: 50 },
  { name: "Access Granted", description: "Profile authentication complete", points: 100 },
  { name: "Master Hacker", description: "All terminal codes successfully entered", points: 150 },
];

const HACKER_CHALLENGES = [
  {
    prompt: "SECURITY BREACH: Enter code 'sudo access grant' to override",
    solution: "sudo access grant",
    reward: 25
  },
  {
    prompt: "FIREWALL DETECTED: Type 'bypass firewall' to continue",
    solution: "bypass firewall",
    reward: 30
  },
  {
    prompt: "ENCRYPTION LOCK: Enter 'decrypt --force' to break encryption",
    solution: "decrypt --force",
    reward: 35
  },
  {
    prompt: "SYSTEM LOCKDOWN: Type 'override security' to proceed",
    solution: "override security",
    reward: 40
  }
];

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [badges, setBadges] = useState([]);
  const [points, setPoints] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [isInteractive, setIsInteractive] = useState(false);
  const [hackingMode, setHackingMode] = useState(false);
  const [userCommandHistory, setUserCommandHistory] = useState([]);
  const [progressPaused, setProgressPaused] = useState(false);
  const [showEscToast, setShowEscToast] = useState(true);

  const terminalRef = useRef(null);
  const terminalInstance = useRef(null);
  const inputRef = useRef(null);
  const completedChallenges = useRef([]);
  const toastRef = useRef(null);



  const audioRefs = useRef({
    keypress: new Audio('/keypress.mp3'),
    alert: new Audio('/alert.mp3'),
    success: new Audio('/success.mp3'),
    error: new Audio('/error.mp3'),
    typing: new Audio('/typing.mp3')
  });

  // Play sound function
  const playSound = (sound) => {
    const audio = audioRefs.current[sound];
    if (audio) {
      audio.volume = sound === 'keypress' ? 0.5 : sound === 'alert' ? 0.7 : 0.8;
      if (audio.paused || audio.ended) {
        audio.currentTime = 0;
        audio.play().catch(e => console.log("Audio play error:", e));
      }
    }
  };

  useEffect(() => {
    if (!showEscToast || !toastRef.current) return;

    const toast = toastRef.current;
    const speed = 0.5;
    let posX = 0;
    let posY = 0;
    let dirX = 1;
    let dirY = 1;

    const updatePosition = () => {
      const parent = toast.parentElement;
      const maxX = parent.offsetWidth - toast.offsetWidth;
      const maxY = parent.offsetHeight - toast.offsetHeight;

      posX += dirX * speed;
      posY += dirY * speed;

      if (posX <= 0 || posX >= maxX) dirX *= -1;
      if (posY <= 0 || posY >= maxY) dirY *= -1;

      toast.style.transform = `translate(${posX}px, ${posY}px)`;

      requestAnimationFrame(updatePosition);
    };

    requestAnimationFrame(updatePosition);
  }, [showEscToast]);


  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setProgress(100);
        playSound('success');
        setShowEscToast(false);
        if (terminalInstance.current) {
          terminalInstance.current.writeln('\x1b[33m>>> ESC KEY DETECTED. SKIPPING LOADING...\x1b[0m');
        }
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    if (isInteractive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInteractive]);
  // Initialize terminal
  useEffect(() => {
    if (!terminalRef.current) return;

    try {
      const term = new Terminal({
        fontFamily: '"Courier New", monospace',
        fontSize: 14,
        cursorBlink: true,
        theme: {
          background: '#0f172a', // Dark blue background
          foreground: '#93c5fd', // Light blue text
          cursor: '#93c5fd',
          selection: 'rgba(147, 197, 253, 0.3)',
        },
      });

      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      term.open(terminalRef.current);
      fitAddon.fit();

      terminalInstance.current = term;

      term.writeln('\x1b[34m>>> INITIALIZING PORTFOLIO INTERFACE...\x1b[0m');
      term.writeln('\x1b[34m>>> LOADING PROFILE: HARSHITH S KUDAPALI...\x1b[0m');
      term.writeln('\x1b[33m>>> CLICK ANYWHERE TO INTERACT WITH THE TERMINAL...\x1b[0m');
      term.writeln('');

      // Make terminal clickable to start interaction
      terminalRef.current.addEventListener('click', () => {
        if (!isInteractive) {
          setIsInteractive(true);
          term.writeln('\x1b[32m>>> INTERACTION MODE ACTIVATED. TYPE "help" FOR COMMANDS\x1b[0m');
          playSound('alert');
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }
      });

      const handleResize = () => fitAddon.fit();
      window.addEventListener('resize', handleResize);

      return () => {
        term.dispose();
        window.removeEventListener('resize', handleResize);
      };
    } catch (error) {
      console.error("Terminal initialization error:", error);
    }
  }, [isInteractive]);

  // Handle user input
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && userInput.trim()) {
      handleCommand(userInput.trim());
      setUserInput('');
    }
  };

  const handleCommand = (command) => {
    setUserCommandHistory(prev => [...prev, command]);

    if (terminalInstance.current) {
      terminalInstance.current.writeln(`\x1b[32m$ ${command}\x1b[0m`);
      playSound('keypress');
    }

    // If there's an active challenge
    if (currentChallenge) {
      if (command.toLowerCase() === currentChallenge.solution.toLowerCase()) {
        if (terminalInstance.current) {
          terminalInstance.current.writeln('\x1b[35m>>> CORRECT CODE ENTERED! SECURITY BYPASSED\x1b[0m');
          playSound('success');
        }
        setPoints(prev => prev + currentChallenge.reward);
        completedChallenges.current.push(currentChallenge);
        setCurrentChallenge(null);
        setProgressPaused(false);

        // Check if all challenges are completed
        if (completedChallenges.current.length === HACKER_CHALLENGES.length && !badges.some(b => b.name === COMPLETION_BADGES[4].name)) {
          setBadges(prev => [...prev, COMPLETION_BADGES[4]]);
          setPoints(prev => prev + COMPLETION_BADGES[4].points);
          if (terminalInstance.current) {
            terminalInstance.current.writeln('\x1b[35m>>> ACHIEVEMENT UNLOCKED: MASTER HACKER\x1b[0m');
          }
        }
      } else {
        if (terminalInstance.current) {
          terminalInstance.current.writeln('\x1b[31m>>> INCORRECT CODE. ACCESS DENIED. TRY AGAIN.\x1b[0m');
          playSound('error');
        }
      }
      return;
    }

    // Handle regular commands
    switch (command.toLowerCase()) {
      case 'help':
        if (terminalInstance.current) {
          terminalInstance.current.writeln('\x1b[36m>>> AVAILABLE COMMANDS:\x1b[0m');
          terminalInstance.current.writeln('  - help: Show this help message');
          terminalInstance.current.writeln('  - status: Show current system status');
          terminalInstance.current.writeln('  - clear: Clear the terminal');
          terminalInstance.current.writeln('  - boost: Boost the loading speed');
          terminalInstance.current.writeln('  - hacking: Toggle hacking mode');
          terminalInstance.current.writeln('  - skip: Skip to complete loading (cheating!)');
        }
        break;
      case 'status':
        if (terminalInstance.current) {
          terminalInstance.current.writeln(`\x1b[36m>>> SYSTEM STATUS:\x1b[0m`);
          terminalInstance.current.writeln(`  - Progress: ${progress}%`);
          terminalInstance.current.writeln(`  - XP Points: ${points}`);
          terminalInstance.current.writeln(`  - Badges: ${badges.length} of ${COMPLETION_BADGES.length}`);
          terminalInstance.current.writeln(`  - Challenges completed: ${completedChallenges.current.length} of ${HACKER_CHALLENGES.length}`);
        }
        break;
      case 'clear':
        if (terminalInstance.current) {
          terminalInstance.current.clear();
        }
        break;
      case 'boost':
        if (terminalInstance.current) {
          terminalInstance.current.writeln('\x1b[35m>>> LOADING SPEED BOOSTED!\x1b[0m');
          playSound('success');
          setProgress(prev => Math.min(prev + 10, 100));
        }
        break;
      case 'hacking':
        setHackingMode(prev => !prev);
        if (terminalInstance.current) {
          terminalInstance.current.writeln(`\x1b[35m>>> HACKING MODE ${hackingMode ? 'DEACTIVATED' : 'ACTIVATED'}!\x1b[0m`);
          playSound('alert');
        }
        break;
      case 'skip':
        if (terminalInstance.current) {
          terminalInstance.current.writeln('\x1b[33m>>> SKIPPING LOADING SEQUENCE...\x1b[0m');
          setProgress(100);
          playSound('success');
        }
        break;
      default:
        if (hackingMode) {
          // In hacking mode, random responses look more authentic
          const responses = [
            '\x1b[32m>>> COMMAND PROCESSED\x1b[0m',
            '\x1b[31m>>> INVALID SYNTAX\x1b[0m',
            '\x1b[33m>>> ATTEMPTING TO PROCESS...\x1b[0m',
            '\x1b[36m>>> ANALYZING INPUT...\x1b[0m'
          ];

          if (terminalInstance.current) {
            terminalInstance.current.writeln(_.sample(responses));
          }

          // Small chance of progress boost in hacking mode
          if (Math.random() > 0.7) {
            setProgress(prev => Math.min(prev + 5, 100));
            if (terminalInstance.current) {
              terminalInstance.current.writeln('\x1b[35m>>> PROGRESS BOOST DETECTED\x1b[0m');
            }
          }
        } else {
          if (terminalInstance.current) {
            terminalInstance.current.writeln('\x1b[31m>>> UNRECOGNIZED COMMAND. TYPE "help" FOR AVAILABLE COMMANDS\x1b[0m');
          }
        }
    }
  };

  // Trigger random challenges
  useEffect(() => {
    if (!isInteractive || progressPaused || progress >= 100) return;

    const availableChallenges = HACKER_CHALLENGES.filter(
      challenge => !completedChallenges.current.includes(challenge)
    );

    if (availableChallenges.length > 0 && Math.random() > 0.85 && progress > 30 && !currentChallenge) {
      const nextChallenge = _.sample(availableChallenges);
      setCurrentChallenge(nextChallenge);
      setProgressPaused(true);

      if (terminalInstance.current) {
        terminalInstance.current.writeln('\x1b[31m>>> ALERT! SECURITY PROTOCOL DETECTED\x1b[0m');
        terminalInstance.current.writeln(`\x1b[33m>>> ${nextChallenge.prompt}\x1b[0m`);
        playSound('alert');
      }
    }
  }, [progress, isInteractive, currentChallenge, progressPaused]);

  // Progress and terminal text simulation
  useEffect(() => {
    if (progress >= 100) {
      if (terminalInstance.current) {
        terminalInstance.current.writeln('\x1b[35m>>> ACCESS GRANTED. WELCOME TO THE PORTFOLIO.\x1b[0m');
        playSound('success');
      }
      setTimeout(() => onComplete && onComplete(), 2000);
      return;
    }

    if (progressPaused) return;

    // Add random hacker phrases
    const interval = setInterval(() => {
      const newPhrase = _.sample(HACKER_PHRASES);
      setCurrentPhrase(newPhrase);

      if (terminalInstance.current) {
        terminalInstance.current.writeln(`\x1b[36m[${new Date().toLocaleTimeString()}]\x1b[0m ${newPhrase}`);

        // Random responses
        if (Math.random() > 0.7) {
          const responseTime = Math.floor(Math.random() * 200) + 50;
          setTimeout(() => {
            const status = Math.random() > 0.2 ? 'SUCCESS' : 'RETRY';
            const color = status === 'SUCCESS' ? '35' : '33'; // Purple for success, yellow for retry
            terminalInstance.current.writeln(`\x1b[${color}m  → ${status}: ${Math.floor(Math.random() * 1000)}ms\x1b[0m`);
            playSound('keypress');
          }, responseTime);
        }
      }

      // Random glitch effect
      if (Math.random() > 0.8) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 1000);
        playSound('alert');
      }

      // Add progress
      setProgress(prev => {
        const increment = Math.floor(Math.random() * 5) + 1;
        return Math.min(prev + increment, 100);
      });

      // Add badges at certain thresholds
      if (progress > 25 && !badges.includes(COMPLETION_BADGES[0])) {
        setBadges(prev => [...prev, COMPLETION_BADGES[0]]);
        setPoints(prev => prev + COMPLETION_BADGES[0].points);
        playSound('success');
      } else if (progress > 50 && !badges.includes(COMPLETION_BADGES[1])) {
        setBadges(prev => [...prev, COMPLETION_BADGES[1]]);
        setPoints(prev => prev + COMPLETION_BADGES[1].points);
        playSound('success');
      } else if (progress > 75 && !badges.includes(COMPLETION_BADGES[2])) {
        setBadges(prev => [...prev, COMPLETION_BADGES[2]]);
        setPoints(prev => prev + COMPLETION_BADGES[2].points);
        playSound('success');
      } else if (progress >= 100 && !badges.includes(COMPLETION_BADGES[3])) {
        setBadges(prev => [...prev, COMPLETION_BADGES[3]]);
        setPoints(prev => prev + COMPLETION_BADGES[3].points);
      }

    }, 600);

    return () => clearInterval(interval);
  }, [progress, badges, onComplete, progressPaused]);

  // Simulated typing effect for user input
  useEffect(() => {
    if (userInput.length > 0) {
      playSound('typing');
    }
  }, [userInput]);

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-900 z-50 text-blue-400 font-mono overflow-hidden">
      {showEscToast && (
        <div
          ref={toastRef}
          className="absolute z-50 px-1 py-1 font-bold rounded shadow-lg text-black bg-yellow-400"
          style={{ top: 0, left: 0 }}
        >
          Press ESC to skip loading
        </div>
      )}


      {/* Header with custom glitch effect */}
      <div className={`py-2 px-4 bg-gray-800 border-b border-blue-500/30 flex justify-between items-center ${isGlitching ? 'glitch-effect' : ''}`}>
        <div className="text-xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          PORTFOLIO OS <span className="text-sm">v3.7</span>
        </div>
        <div className="text-sm">
          <span className="mr-4 text-gray-400">USER: <span className="text-blue-400">VISITOR</span></span>
          <span className="text-purple-400">{points} XP</span>
        </div>
      </div>

      {/* Main grid layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Terminal */}
        <div className="flex-1 flex flex-col p-2 bg-gray-900 overflow-hidden border-r border-blue-500/20">
          <div ref={terminalRef} className="flex-1 overflow-hidden cursor-pointer"></div>

          {/* Terminal input */}
          {isInteractive && (
            <div className="pt-2 flex items-center border-t border-blue-500/20">
              <span className="text-green-400 mr-2">$</span>
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-blue-400 font-mono"
                placeholder="Type commands here..."
                autoFocus
              />
            </div>
          )}
        </div>

        {/* Side panel */}
        <div className="w-80 bg-gray-800 flex flex-col">
          {/* Progress */}
          <div className="p-4 border-b border-blue-500/30">
            <div className="text-sm mb-1 flex justify-between">
              <span>LOADING PROGRESS</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                style={{
                  width: `${progress}%`,
                  transition: 'width 0.3s ease-out',
                  filter: 'drop-shadow(0 0 3px rgba(147, 197, 253, 0.7))'
                }}
              />
            </div>
            <div className="mt-2 text-xs text-gray-300 truncate">
              {currentPhrase || "Initializing..."}
            </div>
          </div>

          {/* Badges */}
          <div className="p-4 flex-1 overflow-auto">
            <div className="text-sm mb-2 flex justify-between items-center">
              <span>ACHIEVEMENTS</span>
              <span className="text-xs text-purple-400">{badges.length}/{COMPLETION_BADGES.length}</span>
            </div>
            {badges.length === 0 ? (
              <div className="text-xs text-gray-500">No achievements unlocked yet</div>
            ) : (
              <div className="space-y-2">
                {badges.map((badge, index) => (
                  <div key={index} className="p-2 bg-gray-700 rounded border border-blue-500/30 hover:border-blue-500/50 transition-all text-xs">
                    <div className="font-bold text-blue-400">{badge.name}</div>
                    <div className="text-gray-400">{badge.description}</div>
                    <div className="text-purple-400 text-right">+{badge.points} XP</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Command history */}
          {isInteractive && userCommandHistory.length > 0 && (
            <div className="p-4 border-t border-blue-500/30">
              <div className="text-xs mb-2">COMMAND HISTORY</div>
              <div className="h-20 overflow-y-auto">
                {userCommandHistory.slice(-5).map((cmd, idx) => (
                  <div key={idx} className="text-xs text-gray-400">
                    $ {cmd}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Current challenge */}
          {currentChallenge && (
            <div className="p-4 border-t border-blue-500/30 bg-gray-700">
              <div className="text-xs mb-1 text-red-400">SECURITY CHALLENGE</div>
              <div className="text-sm mb-2">{currentChallenge.prompt}</div>
              <div className="text-xs text-purple-400">Reward: +{currentChallenge.reward} XP</div>
            </div>
          )}

          {/* System status */}
          <div className="p-4 border-t border-blue-500/30">
            <div className="text-xs">
              <div className="mb-1">SYSTEM STATUS</div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></div>
                <span>Active connection</span>
              </div>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full ${progress >= 100 ? 'bg-green-500' : 'bg-purple-500'} mr-2`}></div>
                <span>Authentication {progress >= 100 ? 'successful' : 'pending'}</span>
              </div>
              {hackingMode && (
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></div>
                  <span>Hacking mode active</span>
                </div>
              )}
              {currentChallenge && (
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2 animate-pulse"></div>
                  <span>Security challenge active</span>
                </div>
              )}
            </div>
          </div>

          {/* Help hint */}
          {isInteractive && (
            <div className="p-2 text-xs text-center text-gray-500">
              Type "help" for available commands
            </div>
          )}
        </div>
      </div>

      {/* CSS for custom glitch effect */}
      <style jsx>{`
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-3px, 3px);
          }
          40% {
            transform: translate(-3px, -3px);
          }
          60% {
            transform: translate(3px, 3px);
          }
          80% {
            transform: translate(3px, -3px);
          }
          100% {
            transform: translate(0);
          }
        }
        
        .glitch-effect {
          animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
          text-shadow: 0 0 4px rgba(147, 197, 253, 0.8);
        }
        
        input::placeholder {
          color: rgba(147, 197, 253, 0.5);
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;