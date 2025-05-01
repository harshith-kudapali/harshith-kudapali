// src/components/GitHubCalendar.jsx
import React, { useEffect, useState } from 'react';

const GitHubCalendar = ({ username }) => {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchContributions = async () => {
      try {
        // In a real implementation, this would be a call to your backend API
        // which would then fetch the GitHub contribution data
        const response = await fetch(`/api/github/contributions/${username}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch GitHub contributions');
        }
        
        const data = await response.json();
        setContributions(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching GitHub contributions:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchContributions();
  }, [username]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-52 bg-gray-800 bg-opacity-50 rounded-lg border border-blue-500/30">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 border border-blue-500/30">
        <h3 className="text-xl text-red-400 mb-2">Error Loading GitHub Activity</h3>
        <p className="text-gray-300">Could not load GitHub contributions. Please check the username or try again later.</p>
      </div>
    );
  }
  
  // For demo purposes, let's create a mock calendar grid
  const mockWeeks = 52;
  const mockDays = 7;
  const colorLevels = ['bg-gray-800', 'bg-green-900', 'bg-green-700', 'bg-green-500', 'bg-green-300'];
  
  return (
    <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 border border-blue-500/30">
      <h3 className="text-xl font-mono mb-4 text-blue-400">GitHub Contributions</h3>
      
      <div className="overflow-x-auto">
        <div className="flex space-x-1" style={{ width: `${mockWeeks * 12}px` }}>
          {Array.from({ length: mockWeeks }).map((_, weekIndex) => (
            <div key={`week-${weekIndex}`} className="flex flex-col space-y-1">
              {Array.from({ length: mockDays }).map((_, dayIndex) => {
                // Generate random contribution level for demo
                const level = Math.floor(Math.random() * 5);
                
                return (
                  <div
                    key={`day-${weekIndex}-${dayIndex}`}
                    className={`w-3 h-3 rounded ${colorLevels[level]} hover:ring-1 hover:ring-white transition-all`}
                    title={`${Math.floor(Math.random() * 10)} contributions on Date`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <span className="text-xs text-gray-400">Less</span>
        <div className="flex space-x-1">
          {colorLevels.map((color, index) => (
            <div key={`legend-${index}`} className={`w-3 h-3 rounded ${color}`} />
          ))}
        </div>
        <span className="text-xs text-gray-400">More</span>
      </div>
    </div>
  );
};

export default GitHubCalendar;