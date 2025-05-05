// NotFound.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, RefreshCcw, Gamepad } from "lucide-react";
import useSound from "use-sound";
import SnakeGame from "../components/SnakeGame";

export default function NotFound() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState([]);
  const [hoveringButton, setHoveringButton] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const rafId = useRef(null);
  const lastUpdate = useRef(Date.now());
  const TRAIL_LENGTH = 10;
  const UPDATE_INTERVAL = 30;
  const navigate = useNavigate();

  const [playClick] = useSound("/click.mp3", {
    volume: 0.5,
    interrupt: true,
  });

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener to update when orientation changes or browser resizes
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    // Only set up cursor tracking if not on mobile
    if (isMobile) return;
    
    const updateCursor = (e) => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const { clientX: x, clientY: y } = e;
        setCursor({ x, y });

        const now = Date.now();
        if (now - lastUpdate.current > UPDATE_INTERVAL) {
          lastUpdate.current = now;
          setTrail((prev) => [{ x, y, id: now }, ...prev].slice(0, TRAIL_LENGTH));
        }
      });
    };

    document.addEventListener("mousemove", updateCursor);
    document.addEventListener("mousedown", () => setIsClicking(true));
    document.addEventListener("mouseup", () => setIsClicking(false));

    return () => {
      document.removeEventListener("mousemove", updateCursor);
      document.removeEventListener("mousedown", () => setIsClicking(true));
      document.removeEventListener("mouseup", () => setIsClicking(false));
      cancelAnimationFrame(rafId.current);
    };
  }, [isMobile]);

  const buttonHover = (hovering) => () => {
    if (!isMobile) {
      setHoveringButton(hovering);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden ${!isMobile ? 'cursor-none' : ''}`}>
      {/* Trail Effect - Only show on non-mobile */}
      {!isMobile && trail.map((pos, i) => (
        <div
          key={pos.id}
          className="fixed z-40 pointer-events-none select-none"
          style={{
            left: pos.x,
            top: pos.y,
            transform: "translate(-50%, -50%) scale(0.7)",
            opacity: 0.4 - i * 0.05,
            willChange: "transform",
          }}
        >
          <div
            className="w-6 h-6 rounded-full text-xs text-white font-bold flex items-center justify-center"
            style={{
              background: "radial-gradient(circle, rgba(59,130,246,0.8), rgba(147,197,253,0.4))",
              boxShadow: "0 0 15px rgba(59,130,246,0.6)",
            }}
          >
            404
          </div>
        </div>
      ))}

      {/* Main Cursor - Only show on non-mobile */}
      {!isMobile && (
        <div
          className={`fixed z-50 pointer-events-none transition-transform duration-100 select-none ${isClicking ? "scale-75" : ""}`}
          style={{
            left: cursor.x,
            top: cursor.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className={`
              w-8 h-8 rounded-full text-xs text-white font-bold flex items-center justify-center
              ${hoveringButton ? "animate-pulse-fast" : ""}
              ${isClicking ? "ring-4 ring-blue-400 ring-opacity-50" : ""}
            `}
            style={{
              background: "radial-gradient(circle, rgba(59,130,246,1), rgba(96,165,250,0.8))",
              boxShadow: "0 0 15px 5px rgba(59,130,246,0.7)",
            }}
          >
            404
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl w-full flex flex-col lg:flex-row justify-center items-center gap-6 animate-fade-in">
        <div className="text-center lg:w-1/2">
          <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse">
            404
          </h1>

          <h2 className="text-2xl font-bold text-white mt-4 mb-2">Oops! Page Not Found</h2>
          <p className="text-gray-400 mb-8">
            The page you're trying to reach doesn't exist, or has been moved.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
            <Button
              text="Go Home"
              Icon={Home}
              onClick={() => {
                playClick();
                navigate("/");
              }}
              onMouseEnter={buttonHover(true)}
              onMouseLeave={buttonHover(false)}
            />
            <Button
              text="Go Back"
              Icon={ArrowLeft}
              onClick={() => {
                playClick();
                navigate(-1);
              }}
              onMouseEnter={buttonHover(true)}
              onMouseLeave={buttonHover(false)}
            />
            <Button
              text="Try Again"
              Icon={RefreshCcw}
              onClick={() => {
                playClick();
                window.location.reload();
              }}
              onMouseEnter={buttonHover(true)}
              onMouseLeave={buttonHover(false)}
            />
          </div>

          {/* Play Game Button */}
          <div className="flex justify-center">
            <Button
              className="bg-green-500 hover:bg-green-600"
              text="Disappointed? Play Game"
              Icon={Gamepad}
              onClick={() => {
                playClick();
                setShowGame(true);
              }}
              onMouseEnter={buttonHover(true)}
              onMouseLeave={buttonHover(false)}
            />
          </div>
        </div>

        {/* Snake Game Section */}
        {showGame && (
          <div className="w-full lg:w-1/2 max-w-[500px] h-[650px] sm:h-[650px] mt-6 lg:mt-0 border border-blue-400 rounded-lg overflow-hidden shadow-lg bg-black">
            <SnakeGame />
          </div>
        )}
      </div>

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-blue-500 rounded-full opacity-70 animate-ping"
            style={{
              width: `${Math.random() * 12 + 4}px`,
              height: `${Math.random() * 12 + 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 2 + 1}s`,
              animationDelay: `${Math.random()}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        @keyframes pulse-fast {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
        }
        .animate-pulse-fast {
          animation: pulse-fast 0.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

function Button({ text, Icon, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 active:scale-95 ${className}`}
    >
      <Icon size={18} />
      <span>{text}</span>
    </button>
  );
}