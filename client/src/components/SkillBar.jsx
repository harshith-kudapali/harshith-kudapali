// src/components/SkillBar.jsx
import React, { useEffect, useState } from 'react';

const SkillBar = ({ skill, percentage, color = 'blue' }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setWidth(percentage);
    }, 100);
    return () => clearTimeout(timeout);
  }, [percentage]);

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-gray-300 font-mono">{skill}</span>
        <span className="text-gray-400 text-sm">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div 
          className="h-2.5 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%`, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
};

export default SkillBar;
