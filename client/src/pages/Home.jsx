// src/pages/Home.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import GitHubCalendar from '../components/GitHubCalendar';
import LeetCodeStats from '../components/LeetCodeStats';

const Home = ({ addNotification }) => {
  useEffect(() => {
    // Simulate connection established
    const timer = setTimeout(() => {
      addNotification('Systems online. All modules functioning at optimal capacity.', 'info');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="space-y-8 sm:space-y-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6 text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-gray-300 block sm:inline">Hello, I'm </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 block sm:inline">
                Harshith S Kudapali
              </span>
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-light">
              <span className="font-mono text-blue-400">Engineering Student</span> 
              <span className="block sm:inline"> & </span>
              <span className="font-mono text-purple-400">Developer</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0">
              I build interactive experiences and solve complex problems. Currently focused on web development, 
              machine learning, and exploring new technologies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link 
                to="/projects" 
                className="px-6 py-3 bg-blue-600 bg-opacity-90 rounded-md text-white font-medium hover:bg-opacity-100 transition-colors shadow-lg shadow-blue-500/20 text-center"
              >
                View Projects
              </Link>
              <Link 
                to="/contact" 
                className="px-6 py-3 bg-gray-800 border border-blue-500/30 rounded-md text-gray-300 font-medium hover:bg-gray-700 transition-colors text-center"
              >
                Contact Me
              </Link>
            </div>
            
            <div className="pt-4 flex items-center justify-center lg:justify-start">
              <span className="text-green-400 flex items-center text-sm sm:text-base">
                <span className="block w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
                Available for opportunities
              </span>
            </div>
          </div>
          
          <div className="relative flex justify-center order-1 lg:order-2 mb-6 lg:mb-0">
            <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 blur-lg opacity-30 animate-pulse"></div>
              <img 
                src="/profilePic.png" 
                alt="Harshith S Kudapali - Profile Picture" 
                className="w-full h-full rounded-full border-4 border-blue-500/20 object-cover relative z-10"
              />
              <div className="absolute inset-0 border-4 border-dashed border-blue-400/30 rounded-full animate-spin-slow z-0"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="relative z-10">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white text-center lg:text-left">
          <span className="text-blue-400">&lt;</span> Progress Tracker <span className="text-blue-400">/&gt;</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="w-full">
            <GitHubCalendar username="harshith-kudapali" />
          </div>
          <div className="w-full">
            <LeetCodeStats username="harshy03" />
          </div>
        </div>
      </section>
      
      {/* Tech Stack */}
      <section className="relative z-10">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white text-center lg:text-left">
          <span className="text-blue-400">&lt;</span> Tech Arsenal <span className="text-blue-400">/&gt;</span>
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {['React', 'Node.js', 'PostgreSQL', 'Express', 'TailwindCSS', 'JavaScript', 'TypeScript', 'Python', 'Git', 'Docker', 'CI/CD', 'AWS'].map((tech, index) => (
            <div 
              key={index}
              className="flex flex-col items-center justify-center p-3 sm:p-4 lg:p-6 bg-gray-800 bg-opacity-50 rounded-lg border border-blue-500/20 hover:border-blue-500/50 transition-all transform hover:-translate-y-1 hover:shadow-md hover:shadow-blue-500/10 min-h-[80px] sm:min-h-[100px]"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex items-center justify-center mb-2 sm:mb-3 text-lg sm:text-xl lg:text-2xl text-blue-400">
                <div className="w-full h-full rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <span className="text-xs sm:text-sm lg:text-base font-bold">
                    {tech.charAt(0)}
                  </span>
                </div>
              </div>
              <span className="text-gray-300 text-xs sm:text-sm font-mono text-center leading-tight">{tech}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;