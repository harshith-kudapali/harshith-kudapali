import React from 'react';

const DevelopmentTicker = () => (
  <>
    {/* Inline CSS for marquee animation */}
    <style>{`
      @keyframes marquee {
        0%   { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
      }
      .animate-marquee {
        display: inline-block;
        min-width: 100%;
        animation: marquee 15s linear infinite;
      }
    `}</style>

    <div className="w-full bg-yellow-400 text-black font-bold font-mono relative overflow-hidden h-5 flex items-center border-b border-yellow-500 z-30">
      <div className="inline-block whitespace-nowrap animate-marquee text-xs min-w-full">
        🚧&nbsp;&nbsp;This website is still under development. Features & content may change. 🚧&nbsp;&nbsp;
      </div>
    </div>
  </>
);

export default DevelopmentTicker;
