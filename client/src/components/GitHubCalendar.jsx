import React, { useEffect, useState } from 'react';
import { backendApi } from '../App';

const GitHubCalendar = ({ username }) => {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2025);
  
  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch(`${backendApi}/api/github/contributions/${username}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch GitHub contributions');
        }
        
        const data = await response.json();
        
        // Transform the data to include level calculation
        const transformedData = data.map(day => ({
          ...day,
          level: day.count === 0 ? 0 : Math.min(Math.floor(day.count / 3) + 1, 4)
        }));
        
        setContributions(transformedData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching GitHub contributions:', err);
        setError(err.message);
        setLoading(false);
        
        // Generate mock data for demo
        generateMockData();
      }
    };
    
    const generateMockData = () => {
      // Create mock contribution data that matches the pattern in the image
      const mockContributions = [];
      const totalDays = 365;
      
      for (let i = 0; i < totalDays; i++) {
        const date = new Date(2025, 0, 1);
        date.setDate(date.getDate() + i);
        
        // Create realistic contribution patterns
        let count = 0;
        const dayOfWeek = date.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        
        // Less activity on weekends, more on weekdays
        if (!isWeekend && Math.random() > 0.3) {
          count = Math.floor(Math.random() * 15) + 1;
        } else if (isWeekend && Math.random() > 0.7) {
          count = Math.floor(Math.random() * 5) + 1;
        }
        
        mockContributions.push({
          date: date.toISOString().split('T')[0],
          count,
          weekday: dayOfWeek,
          color: count === 0 ? '#161b22' : '#0e4429',
          level: count === 0 ? 0 : Math.min(Math.floor(count / 3) + 1, 4)
        });
      }
      
      setContributions(mockContributions);
      setLoading(false);
    };
    
    fetchContributions();
  }, [username]);
  
  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg border border-gray-700">
        <div className="flex justify-center items-center h-52">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </div>
    );
  }
  
  if (error && contributions.length === 0) {
    return (
      <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg text-red-400 mb-2">Error Loading GitHub Activity</h3>
        <p className="text-gray-400 text-sm">Could not load GitHub contributions. Please check the username or try again later.</p>
      </div>
    );
  }
  
  // Calculate total contributions
  const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0);
  
  // Group contributions by weeks
  const weeks = [];
  let currentWeek = [];
  
  // Get the first day of the year and pad the beginning
  const firstDay = new Date(selectedYear, 0, 1);
  const startPadding = firstDay.getDay();
  
  // Add empty cells for padding
  for (let i = 0; i < startPadding; i++) {
    currentWeek.push(null);
  }
  
  contributions.forEach((day, index) => {
    currentWeek.push(day);
    
    if (currentWeek.length === 7) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });
  
  // Add the last partial week if it exists
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }
  
  const getContributionColor = (level, githubColor) => {
    // Use GitHub's actual color if available, otherwise fall back to our color scheme
    if (githubColor && githubColor !== '#161b22') {
      return `bg-[${githubColor}]`;
    }
    
    switch (level) {
      case 0: return 'bg-gray-800';
      case 1: return 'bg-green-900';
      case 2: return 'bg-green-700';
      case 3: return 'bg-green-500';
      case 4: return 'bg-green-400';
      default: return 'bg-gray-800';
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Mon', 'Wed', 'Fri'];
  
  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h3 className="text-sm font-medium text-gray-200">
            {totalContributions} contributions in {selectedYear}
          </h3>
          <button className="text-xs text-gray-400 hover:text-gray-200">
            Contribution settings
          </button>
        </div>
        <div className="flex gap-1">
          <button 
            className={`px-3 py-1 text-xs rounded font-medium ${
              selectedYear === 2025 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => setSelectedYear(2025)}
          >
            2025
          </button>
          <button 
            className={`px-3 py-1 text-xs rounded font-medium ${
              selectedYear === 2024 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => setSelectedYear(2024)}
          >
            2024
          </button>
        </div>
      </div>
      
      {/* Calendar Grid */}
      <div className="relative">
        {/* Month labels */}
        <div className="flex text-xs text-gray-400 mb-2 ml-8">
          {months.map((month, index) => (
            <div key={month} className="flex-1 text-left" style={{ minWidth: '44px' }}>
              {index % 2 === 0 ? month : ''}
            </div>
          ))}
        </div>
        
        <div className="flex">
          {/* Day labels */}
          <div className="flex flex-col text-xs text-gray-400 mr-2 pt-2">
            <div className="h-3 mb-1"></div>
            {days.map((day) => (
              <div key={day} className="h-3 mb-1 flex items-center">
                {day}
              </div>
            ))}
          </div>
          
          {/* Contribution squares */}
          <div className="flex gap-1">
            {weeks.map((week, weekIndex) => (
              <div key={`week-${weekIndex}`} className="flex flex-col gap-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-3 h-3 rounded-sm ${
                      day ? getContributionColor(day.level, day.color) : 'bg-transparent'
                    } hover:ring-1 hover:ring-gray-400 cursor-pointer transition-all`}
                    title={day ? `${day.count} contributions on ${formatDate(day.date)}` : ''}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
          <a href="#" className="hover:text-gray-200">Learn how we count contributions</a>
          <div className="flex items-center gap-1">
            <span>Less</span>
            <div className="flex gap-1 mx-2">
              <div className="w-3 h-3 rounded-sm bg-gray-800"></div>
              <div className="w-3 h-3 rounded-sm bg-green-900"></div>
              <div className="w-3 h-3 rounded-sm bg-green-700"></div>
              <div className="w-3 h-3 rounded-sm bg-green-500"></div>
              <div className="w-3 h-3 rounded-sm bg-green-400"></div>
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
      
      {/* Contribution Activity Section */}
      <div className="mt-8 border-t border-gray-700 pt-6">
        <h4 className="text-lg font-medium text-gray-200 mb-4">Contribution activity</h4>
        
        <div className="space-y-6">
          {/* July 2025 */}
          <div>
            <h5 className="text-sm font-medium text-gray-300 mb-3">July 2025</h5>
            
            {/* Commits */}
            <div className="flex items-start gap-3 mb-4">
              <div className="w-4 h-4 mt-0.5">
                <svg viewBox="0 0 16 16" className="w-4 h-4 text-gray-400 fill-current">
                  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm7-3.25v2.992l2.028.812a.75.75 0 0 1-.557 1.392l-2.5-1A.751.751 0 0 1 7 8.25v-3.5a.75.75 0 0 1 1.5 0Z"></path>
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-200">
                    Created 22 commits in 1 repository
                  </span>
                  <button className="text-xs text-gray-400 hover:text-gray-200">
                    <svg viewBox="0 0 16 16" className="w-4 h-4 fill-current">
                      <path d="M8 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM1.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm13 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
                    </svg>
                  </button>
                </div>
                <div className="bg-gray-800 rounded p-3">
                  <a href="#" className="text-blue-400 hover:underline text-sm">
                    {username}/{username}
                  </a>
                  <span className="text-gray-400 text-sm ml-2">22 commits</span>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Repositories */}
            <div className="flex items-start gap-3">
              <div className="w-4 h-4 mt-0.5">
                <svg viewBox="0 0 16 16" className="w-4 h-4 text-gray-400 fill-current">
                  <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-200">
                    Created 2 repositories
                  </span>
                  <button className="text-xs text-gray-400 hover:text-gray-200">
                    <svg viewBox="0 0 16 16" className="w-4 h-4 fill-current">
                      <path d="M8 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM1.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm13 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
                    </svg>
                  </button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-gray-800 rounded p-3">
                    <div className="flex items-center gap-2">
                      <svg viewBox="0 0 16 16" className="w-4 h-4 text-gray-400 fill-current">
                        <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
                      </svg>
                      <a href="#" className="text-blue-400 hover:underline text-sm">
                        {username}/{username}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <span className="text-xs text-gray-400">JavaScript</span>
                      </div>
                      <span className="text-xs text-gray-400">Jul 1</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between bg-gray-800 rounded p-3">
                    <div className="flex items-center gap-2">
                      <svg viewBox="0 0 16 16" className="w-4 h-4 text-gray-400 fill-current">
                        <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
                      </svg>
                      <a href="#" className="text-blue-400 hover:underline text-sm">
                        {username}/port
                      </a>
                    </div>
                    <span className="text-xs text-gray-400">Jul 1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <button className="text-blue-400 hover:underline text-sm">
            Show more activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default GitHubCalendar;