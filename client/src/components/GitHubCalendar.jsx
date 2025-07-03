import React, { useEffect, useState } from 'react';
import { backendApi } from '../App';
import axios from 'axios'

const GitHubCalendar = ({ username }) => {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await axios.get(`${backendApi}/api/github/contributions/${username}`);
        console.log(response);
        
        if (response.status !== 200) {
          throw new Error('Failed to fetch GitHub contributions');
        }
        
        const data = response.data;
        
        // Transform the data to include level calculation
        const transformedData = data.map(day => ({
          ...day,
          level: day.count === 0 ? 0 : Math.min(Math.floor(day.count / 3) + 1, 4)
        }));
        
        setContributions(transformedData);
        setLoading(false);
        setError(null);
      } catch (err) {
        console.error('Error fetching GitHub contributions:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchContributions();
  }, [username, selectedYear]);
  
  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
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
  
  // Filter contributions by selected year
  const filteredContributions = contributions.filter(day => {
    const year = new Date(day.date).getFullYear();
    return year === selectedYear;
  });
  
  // Calculate total contributions for the selected year
  const totalContributions = filteredContributions.reduce((sum, day) => sum + day.count, 0);
  
  // Create a proper calendar grid
  const createCalendarGrid = () => {
    const weeks = [];
    const year = selectedYear;
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    
    // Create a map of dates to contributions for quick lookup
    const contributionMap = {};
    filteredContributions.forEach(contrib => {
      contributionMap[contrib.date] = contrib;
    });
    
    // Start from the first Sunday of the year or before
    const firstSunday = new Date(startDate);
    firstSunday.setDate(startDate.getDate() - startDate.getDay());
    
    let currentDate = new Date(firstSunday);
    
    // Generate exactly 53 weeks to match GitHub's layout
    for (let weekIndex = 0; weekIndex < 53; weekIndex++) {
      const week = [];
      
      for (let day = 0; day < 7; day++) {
        const dateString = currentDate.toISOString().split('T')[0];
        const contribution = contributionMap[dateString];
        
        if (contribution) {
          week.push(contribution);
        } else if (currentDate.getFullYear() === year) {
          // Add placeholder for days in the current year without data
          week.push({
            date: dateString,
            count: 0,
            weekday: currentDate.getDay(),
            color: '#ebedf0',
            level: 0
          });
        } else {
          // Add null for days outside the year
          week.push(null);
        }
        
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      weeks.push(week);
    }
    
    return weeks;
  };
  
  const weeks = createCalendarGrid();
  
  const getContributionColor = (contribution) => {
    if (!contribution) return '#161b22'; // Dark background for empty cells
    
    // Use GitHub's provided color, with fallback for different contribution levels
    if (contribution.color && contribution.color !== '#ebedf0') {
      return contribution.color;
    }
    
    // Fallback color scheme for different levels (GitHub's actual colors)
    switch (contribution.level) {
      case 0: return '#161b22'; // Dark background for no contributions
      case 1: return '#0e4429'; // Dark green
      case 2: return '#006d32'; // Medium green
      case 3: return '#26a641'; // Bright green
      case 4: return '#39d353'; // Brightest green
      default: return '#161b22';
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
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']; // Abbreviated to single letters for all 7 days
  
  // Calculate month positions for labels - Fixed to show all months properly
  const getMonthLabels = () => {
    const labels = [];
    const monthPositions = {};
    
    weeks.forEach((week, weekIndex) => {
      week.forEach((day) => {
        if (day && day.date) {
          const date = new Date(day.date);
          const month = date.getMonth();
          const year = date.getFullYear();
          
          // Only process days from the selected year
          if (year === selectedYear) {
            // Mark position for first occurrence of each month
            if (monthPositions[month] === undefined) {
              monthPositions[month] = weekIndex;
            }
          }
        }
      });
    });
    
    // Create labels for all months that have positions
    for (let month = 0; month < 12; month++) {
      if (monthPositions[month] !== undefined) {
        labels.push({
          month: months[month],
          position: monthPositions[month]
        });
      }
    }
    
    return labels;
  };
  
  const monthLabels = getMonthLabels();
  
  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700 p-4 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-4 flex-wrap">
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
      <div className="overflow-x-auto">
        <div className="min-w-max">
          {/* Month labels - Fixed positioning */}
          <div className="relative mb-2 ml-8">
            <div className="flex relative h-4">
              {monthLabels.map((label, index) => (
                <div
                  key={`${label.month}-${index}`}
                  className="absolute text-xs text-gray-400 whitespace-nowrap"
                  style={{ left: `${label.position * 13}px` }}
                >
                  {label.month}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex">
            {/* Day labels - Now showing all 7 days */}
            <div className="flex flex-col text-xs text-gray-400 mr-2 pt-1">
              {days.map((day, index) => (
                <div key={`${day}-${index}`} className="h-3 mb-1 flex items-center justify-center w-6">
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
                      className="w-3 h-3 rounded-sm hover:ring-1 hover:ring-gray-400 cursor-pointer transition-all"
                      style={{ 
                        backgroundColor: getContributionColor(day),
                        border: day ? '1px solid #30363d' : '1px solid #21262d'
                      }}
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
                <div className="w-3 h-3 rounded-sm border border-gray-700" style={{ backgroundColor: '#161b22' }}></div>
                <div className="w-3 h-3 rounded-sm border border-gray-700" style={{ backgroundColor: '#0e4429' }}></div>
                <div className="w-3 h-3 rounded-sm border border-gray-700" style={{ backgroundColor: '#006d32' }}></div>
                <div className="w-3 h-3 rounded-sm border border-gray-700" style={{ backgroundColor: '#26a641' }}></div>
                <div className="w-3 h-3 rounded-sm border border-gray-700" style={{ backgroundColor: '#39d353' }}></div>
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contribution Activity Section */}
      <div className="mt-8 border-t border-gray-700 pt-6">
        <h4 className="text-lg font-medium text-gray-200 mb-4">Contribution activity</h4>
        
        <div className="space-y-6">
          {/* Current Year Summary */}
          <div>
            <h5 className="text-sm font-medium text-gray-300 mb-3">
              {selectedYear} Summary
            </h5>
            
            {/* Commits */}
            <div className="flex items-start gap-3 mb-4">
              <div className="w-4 h-4 mt-0.5 flex-shrink-0">
                <svg viewBox="0 0 16 16" className="w-4 h-4 text-gray-400 fill-current">
                  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm7-3.25v2.992l2.028.812a.75.75 0 0 1-.557 1.392l-2.5-1A.751.751 0 0 1 7 8.25v-3.5a.75.75 0 0 1 1.5 0Z"></path>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-200">
                    {totalContributions} contributions in {selectedYear}
                  </span>
                </div>
                <div className="bg-gray-800 rounded p-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <a href={`https://github.com/${username}`} className="text-blue-400 hover:underline text-sm">
                        {username}
                      </a>
                      <span className="text-gray-400 text-sm">{totalContributions} contributions</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      {selectedYear}
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: totalContributions > 0 ? '100%' : '0%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <a 
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline text-sm"
          >
            View profile on GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default GitHubCalendar;