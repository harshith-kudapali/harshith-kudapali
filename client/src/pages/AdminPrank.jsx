import { useState, useEffect, useRef } from 'react';
import { AlertCircle, Terminal, MessageSquare, Mail, AlertTriangle, Download, ShieldAlert, Zap } from 'lucide-react';
import axios from "axios"
import { backendApi } from '../App';
import AdminPannel from '../components/AdminPannel';
// CSS animation styles
const styles = `
  @keyframes float {
    0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
    10% { opacity: 0.7; }
    90% { opacity: 0.7; }
    100% { transform: translate(var(--tx, 100px), var(--ty, 100px)) rotate(var(--tr, 180deg)); opacity: 0; }
  }

  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes typing {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }

  .animate-float {
    animation: float 8s infinite;
  }

  .animate-slideIn {
    animation: slideIn 0.3s forwards;
  }

  .animate-fadeIn {
    animation: fadeIn 0.5s forwards;
  }

  .animation-delay-100 {
    animation-delay: 0.1s;
  }

  .animation-delay-200 {
    animation-delay: 0.2s;
  }
`;

export default function PanicAdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [panicLevel, setPanicLevel] = useState(0);
  const [messages, setMessages] = useState([]);
  const [terminalLines, setTerminalLines] = useState([]);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showEmailAlert, setShowEmailAlert] = useState(false);
  const [showSystemAlert, setShowSystemAlert] = useState(false);
  const messagesEndRef = useRef(null);
  const terminalRef = useRef(null);
  const timeoutsRef = useRef([]);
  const getPassword = async () => {
    try {
      const response = await axios.get(`${backendApi}/api/getotp`)
      console.log(response);
      console.log(response.status);
      return response.data
    }
    catch {
      console.error("error in getting password")
    }
  }
  const [otp, setotp] = useState(0)
  useEffect(() => {
    const fetchOtp = async () => {
      const data = await getPassword();
      if (data && data.code) {
        setotp(data.code.toString()); // Make sure it's a string to compare properly
      }
    };
    fetchOtp();
  }, []);

  // Boss messages sequence
  const bossMessages = [
    { type: 'boss', text: "Hey, can we talk? It's urgent.", delay: 2000 },
    { type: 'boss', text: "I just got out of a meeting with the board.", delay: 6000 },
    { type: 'boss', text: "I hate to do this over message, but we're letting you go effective immediately.", delay: 10000 },
    { type: 'boss', text: "Please don't come to the office tomorrow. IT will revoke your access in the next hour.", delay: 15000 },
    { type: 'boss', text: "We've noticed unauthorized access to company servers from your account.", delay: 20000 },
    { type: 'boss', text: "Security team is looking into it. This is serious.", delay: 25000 },
    { type: 'boss', text: "They're saying there's suspicious activity from your IP right now. What are you doing?", delay: 30000 }
  ];

  // Terminal commands
  const terminalCommands = [
    { text: "$ initiating remote connection...", delay: 3000 },
    { text: "$ accessing admin credentials...", delay: 5000 },
    { text: "$ bypassing security protocols...", delay: 7000 },
    { text: "$ injecting payload...", delay: 9000 },
    { text: "$ installing keylogger...", delay: 11000 },
    { text: "$ downloading personal files...", delay: 13000 },
    { text: "$ encrypting system...", delay: 15000 },
    { text: "$ preparing ransom demand...", delay: 17000 },
    { text: "$ CRITICAL ERROR: SYSTEM COMPROMISED", delay: 19000 }
  ];

  // Handle password check
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Check if password is correct
    if (newPassword === otp.toString()) {
      setIsAuthenticated(true);
    }
  };

  // Sequence of panic events
  useEffect(() => {
    if (!isAuthenticated) {
      // Start with WhatsApp messages
      bossMessages.forEach((msg, index) => {
        const timeoutId = setTimeout(() => {
          if (!isAuthenticated) {
            setMessages(prev => [...prev, msg]);
          }

          // After a few messages, show the password input
          if (index === 2) {
            setShowPasswordInput(true);
          }

          // After more messages, show the terminal
          if (index === 3) {
            setShowTerminal(true);
            // Start terminal sequence
            terminalCommands.forEach((cmd, termIndex) => {
              const termTimeoutId = setTimeout(() => {
                if (!isAuthenticated) {
                  setTerminalLines(prev => [...prev, cmd.text]);
                }
              }, termIndex * 2000);
              timeoutsRef.current.push(termTimeoutId);
            });
          }

          // Show email alert after several messages
          if (index === 4) {
            setShowEmailAlert(true);
          }

          // Show system alert near the end
          if (index === 5) {
            const systemAlertTimeoutId = setTimeout(() => {
              if (!isAuthenticated) {
                setShowSystemAlert(true);
              }
            }, 3000);
            timeoutsRef.current.push(systemAlertTimeoutId);

            // Download virus file as the final event
            const downloadTimeoutId = setTimeout(() => {
              if (!isAuthenticated) {
                const element = document.createElement('a');
                const file = new Blob(
                  ["GOTCHA! This was just a joke! \n\nI created this fake 'panic admin page' as a fun way to protect my admin dashboard. There's no actual virus or security breach - just a creative security measure to discourage unauthorized access. If you're seeing this, you probably tried to access my admin panel. Nice try! \n\nSincerely,\nHarshith"],
                  { type: 'text/plain' }
                );
                element.href = URL.createObjectURL(file);
                element.download = 'CRITICAL_SECURITY_WARNING.txt';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
              }
            }, 5000);
            timeoutsRef.current.push(downloadTimeoutId);
          }

          // Gradually increase panic level for visual effects
          if (index > 0) {
            setPanicLevel(index);
          }
        }, msg.delay);
        timeoutsRef.current.push(timeoutId);
      });
    }

    // Cleanup function to clear timeouts
    return () => {
      timeoutsRef.current.forEach(timeoutId => clearTimeout(timeoutId));
    };
  }, [isAuthenticated]);

  // If authenticated, show real admin page
  if (isAuthenticated) {
    return (

      <AdminPannel />

    );
  }

  // Panic admin page
  return (
    <div className="min-h-screen text-white p-4 font-mono relative overflow-hidden">
      {/* Hidden password input that appears after some panic */}
      {showPasswordInput && (
        <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center">
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter emergency override code"
            className="bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded-md w-80 opacity-80"
          />
        </div>
      )}

      {/* WhatsApp-like messages from boss */}
      <div className="max-w-md mx-auto mb-8 bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-700">
        {/* WhatsApp header */}
        <div className="bg-green-800 p-3 flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold mr-3 overflow-hidden">
            <img src="/api/placeholder/40/40" alt="Boss profile" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Michael Scott (Boss)</h3>
              <div className="text-xs text-gray-300">3:42 PM</div>
            </div>
            <p className="text-xs text-gray-300 flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
              Online
            </p>
          </div>
        </div>

        {/* Chat wallpaper with WhatsApp pattern */}
        <div
          className="h-96 overflow-y-auto p-3 flex flex-col space-y-2"
          style={{
            backgroundColor: '#0D1418',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23192C3A' fill-opacity='0.4'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        >
          {/* Date header */}
          <div className="self-center bg-gray-800 rounded-full px-3 py-1 text-xs mb-2">
            Today
          </div>

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-xs p-2 rounded-lg shadow-md ${msg.type === 'boss'
                  ? 'bg-gray-700 self-start rounded-bl-none'
                  : 'bg-green-700 self-end rounded-br-none'
                } ${index === messages.length - 1 ? 'animate-fadeIn' : ''}`}
            >
              {msg.text}
              <div className="text-right text-xs text-gray-400 mt-1 flex justify-end items-center">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                {msg.type !== 'boss' && (
                  <svg className="w-4 h-4 ml-1 text-gray-300" viewBox="0 0 16 15" fill="currentColor">
                    <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" />
                  </svg>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator when appropriate */}
          {messages.length > 0 && messages.length < bossMessages.length && (
            <div className="bg-gray-700 self-start rounded-lg rounded-bl-none p-3 max-w-xs animate-pulse flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animation-delay-100"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animation-delay-200"></div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* WhatsApp input area */}
        <div className="bg-gray-800 p-2 flex items-center">
          <button className="text-gray-400 p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </button>
          <button className="text-gray-400 p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
            </svg>
          </button>
          <input
            type="text"
            className="bg-gray-700 rounded-full px-4 py-2 flex-grow mx-2"
            placeholder="Type a message..."
            disabled
          />
          <button className="bg-green-600 w-10 h-10 rounded-full flex items-center justify-center text-white" disabled>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"></path>
              <path d="M19.071 4.929c-3.899-3.898-10.243-3.898-14.143 0-3.898 3.899-3.898 10.243 0 14.143 3.899 3.898 10.243 3.898 14.143 0 3.899-3.9 3.899-10.244 0-14.143zm-4.242 9.9l-9.9-9.9 1.414-1.414 9.9 9.9-1.414 1.414z"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Terminal window */}
      {showTerminal && (
        <div className="max-w-2xl mx-auto mb-8 bg-black rounded-lg overflow-hidden shadow-lg border border-gray-700">
          <div className="bg-gray-800 p-2 flex items-center">
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-sm">Terminal - Remote Connection</div>
          </div>
          <div
            ref={terminalRef}
            className="h-60 overflow-y-auto p-3 font-mono text-green-400 text-sm"
          >
            {terminalLines.map((line, index) => (
              <div key={index} className="mb-1">
                {line}
                {index === terminalLines.length - 1 && (
                  <span className="inline-block w-2 h-4 bg-green-400 ml-1 animate-pulse"></span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Email alert popup */}
      {showEmailAlert && (
        <div className="fixed top-4 right-4 w-80 bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 z-40 animate-slideIn">
          <div className="bg-gray-700 p-2 flex items-center">
            <Mail size={16} className="mr-2 text-red-400" />
            <div className="text-sm font-semibold">New Email - HR Department</div>
          </div>
          <div className="p-3">
            <div className="font-semibold mb-1">Subject: Termination Notice</div>
            <div className="text-sm text-gray-300 mb-3">
              This is to inform you that your employment has been terminated effective immediately due to security policy violations...
            </div>
            <div className="flex justify-end space-x-2">
              <button className="text-xs bg-gray-700 px-3 py-1 rounded hover:bg-gray-600">
                Dismiss
              </button>
              <button className="text-xs bg-blue-600 px-3 py-1 rounded hover:bg-blue-500">
                View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* System alert popup */}
      {showSystemAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full shadow-2xl border-2 border-red-500 animate-pulse">
            <div className="flex items-center mb-4">
              <AlertTriangle size={24} className="text-red-500 mr-2" />
              <h2 className="text-xl font-bold text-red-500">CRITICAL SECURITY ALERT</h2>
            </div>
            <p className="mb-4">
              Your system has been compromised. Malicious software is being installed.
            </p>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: '76%' }}></div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="flex items-center">
                <Download size={16} className="mr-1 text-red-400" />
                <span className="text-sm">ransomware.exe</span>
              </span>
              <span className="text-sm">76% complete</span>
            </div>
            <div className="text-center">
              <button className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 transition-colors">
                Cancel (Disabled)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Random warning indicators - appear sequentially */}
      <div className="fixed top-2 left-2 z-30">
        <div className="flex flex-col space-y-2">
          {panicLevel >= 1 && (
            <div className="bg-red-600 text-white px-3 py-1 rounded-md text-xs flex items-center animate-pulse animate-fadeIn">
              <ShieldAlert size={12} className="mr-1" /> Firewall breach detected
            </div>
          )}
          {panicLevel >= 2 && (
            <div className="bg-yellow-600 text-white px-3 py-1 rounded-md text-xs flex items-center animate-fadeIn">
              <Zap size={12} className="mr-1" /> System resources compromised
            </div>
          )}
          {panicLevel >= 3 && (
            <div className="bg-red-600 text-white px-3 py-1 rounded-md text-xs flex items-center animate-pulse animate-fadeIn">
              <AlertCircle size={12} className="mr-1" /> Security breach in progress
            </div>
          )}
          {panicLevel >= 4 && (
            <div className="bg-orange-600 text-white px-3 py-1 rounded-md text-xs flex items-center animate-fadeIn">
              <Download size={12} className="mr-1" /> Unauthorized data transfer
            </div>
          )}
        </div>
      </div>

      {/* Floating alert icons - appear gradually */}
      {Array.from({ length: panicLevel * 2 }).map((_, index) => (
        <div
          key={index}
          className="fixed z-20 animate-float"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 10}s`,
            '--tx': `${Math.random() * 200 - 100}px`,
            '--ty': `${Math.random() * 200 - 100}px`,
            '--tr': `${Math.random() * 360}deg`
          }}
        >
          <AlertCircle
            size={24 + Math.random() * 24}
            className="text-red-500 opacity-70"
          />
        </div>
      ))}

      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </div>
  );
}
