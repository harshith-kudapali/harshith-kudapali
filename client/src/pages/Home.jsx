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
  }, [addNotification]);
  
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="text-gray-300">Hello, I'm </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                John Doe
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-300 font-light">
              <span className="font-mono text-blue-400">Engineering Student</span> & <span className="font-mono text-purple-400">Developer</span>
            </h2>
            <p className="text-gray-400 text-lg">
              I build interactive experiences and solve complex problems. Currently focused on web development, 
              machine learning, and exploring new technologies.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/projects" 
                className="px-6 py-3 bg-blue-600 bg-opacity-90 rounded-md text-white font-medium hover:bg-opacity-100 transition-colors shadow-lg shadow-blue-500/20"
              >
                View Projects
              </Link>
              <Link 
                to="/contact" 
                className="px-6 py-3 bg-gray-800 border border-blue-500/30 rounded-md text-gray-300 font-medium hover:bg-gray-700 transition-colors"
              >
                Contact Me
              </Link>
            </div>
            
            <div className="pt-4 flex items-center space-x-4">
              <span className="text-green-400 flex items-center">
                <span className="block w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
                Available for opportunities
              </span>
            </div>
          </div>
          
          <div className="relative flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 blur-lg opacity-30 animate-pulse"></div>
              <img 
                src="/api/placeholder/600/600" 
                alt="Profile" 
                className="rounded-full border-4 border-blue-500/20 w-full h-full object-cover relative z-10"
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-dashed border-blue-400/30 rounded-full animate-spin-slow z-0"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="relative z-10">
        <h2 className="text-2xl font-bold mb-6 text-white">
          <span className="text-blue-400">&lt;</span> Progress Tracker <span className="text-blue-400">/&gt;</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GitHubCalendar username="github-username" />
          <LeetCodeStats username="leetcode-username" />
        </div>
      </section>
      
      {/* Tech Stack */}
      <section className="relative z-10">
        <h2 className="text-2xl font-bold mb-6 text-white">
          <span className="text-blue-400">&lt;</span> Tech Arsenal <span className="text-blue-400">/&gt;</span>
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {['React', 'Node.js', 'PostgreSQL', 'Express', 'TailwindCSS', 'JavaScript', 'TypeScript', 'Python', 'Git', 'Docker', 'CI/CD', 'AWS'].map((tech, index) => (
            <div 
              key={index}
              className="flex flex-col items-center justify-center p-6 bg-gray-800 bg-opacity-50 rounded-lg border border-blue-500/20 hover:border-blue-500/50 transition-all transform hover:-translate-y-1 hover:shadow-md hover:shadow-blue-500/10"
            >
              <div className="w-12 h-12 flex items-center justify-center mb-3 text-2xl text-blue-400">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  {tech.charAt(0)}
                </div>
              </div>
              <span className="text-gray-300 text-sm font-mono">{tech}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;