// src/components/ProjectCard.jsx
import React, { useState } from 'react';

const ProjectCard = ({ title, description, tags, image, link, repo }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative bg-gray-800 rounded-lg overflow-hidden border border-blue-500/20 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={image || "/api/placeholder/800/600"} 
          alt={title} 
          className={`w-full h-full object-cover transition-all duration-500 ${isHovered ? 'scale-110 blur-sm brightness-50' : ''}`}
        />
        
        {isHovered && (
          <div className="absolute inset-0 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
              <p className="text-gray-300 text-sm">{description}</p>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <a 
                  href={repo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-gray-900 bg-opacity-70 rounded-md text-blue-400 hover:bg-opacity-90 text-sm transition-all"
                >
                  Code
                </a>
                {link && (
                  <a 
                    href={link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-blue-600 bg-opacity-70 rounded-md text-white hover:bg-opacity-90 text-sm transition-all"
                  >
                    Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {!isHovered && (
        <div className="p-4">
          <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
          <div className="flex flex-wrap gap-1 mt-2">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="px-2 py-1 text-xs rounded-md bg-blue-500 bg-opacity-20 text-blue-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;