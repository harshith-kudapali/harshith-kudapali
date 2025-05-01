// src/components/SkillBar.jsx
import React, { useEffect, useState } from 'react';

const SkillBar = ({ skill, percentage, color = 'blue' }) => {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    setTimeout(() => {
      setWidth(percentage);
    }, 100);
  }, [percentage]);
  
  const getColorClass = () => {
    switch(color) {
      case 'green': return 'bg-green-500';
      case 'red': return 'bg-red-500';
      case 'yellow': return 'bg-yellow-500';
      case 'purple': return 'bg-purple-500';
      case 'pink': return 'bg-pink-500';
      default: return 'bg-blue-500';
    }
  };
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-gray-300 font-mono">{skill}</span>
        <span className="text-gray-400 text-sm">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${getColorClass()}`} 
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SkillBar;