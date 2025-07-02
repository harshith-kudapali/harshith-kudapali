// src/components/LeetCodeStats.jsx
import React, { useState, useEffect } from 'react';

const LeetCodeStats = ({ username }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeetCodeStats = async () => {
      try {
        console.log('Fetching LeetCode stats for username:', username);
        console.log('Making request to:', `/api/leetcode/stats/${username}`);
        
        const response = await fetch(`/api/leetcode/stats/${username}`);
        
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        console.log('Response content-type:', response.headers.get('content-type'));
        
        // Get the raw response text first
        const responseText = await response.text();
        console.log('Raw response text:', responseText);
        
        if (!response.ok) {
          console.error('Response not OK:', response.status, responseText);
          throw new Error(`HTTP ${response.status}: ${responseText}`);
        }
        
        // Try to parse as JSON
        let data;
        try {
          data = JSON.parse(responseText);
          console.log('Parsed JSON data:', data);
        } catch (parseError) {
          console.error('Failed to parse JSON:', parseError);
          console.error('Response was:', responseText);
          throw new Error(`Invalid JSON response: ${parseError.message}`);
        }
        
        setStats(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching LeetCode stats:', {
          message: err.message,
          stack: err.stack,
          username: username,
          url: `/api/leetcode/stats/${username}`
        });
        setError(err.message);
        setLoading(false);
      }
    };
    
    if (username) {
      fetchLeetCodeStats();
    } else {
      console.warn('No username provided to LeetCodeStats component');
      setError('No username provided');
      setLoading(false);
    }
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
        <h3 className="text-xl text-red-400 mb-2">Error Loading LeetCode Stats</h3>
        <p className="text-gray-300">Could not load LeetCode statistics. Please check the username or try again later.</p>
        <p className="text-gray-400 text-sm mt-2">Error: {error}</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 border border-blue-500/30">
        <h3 className="text-xl text-gray-400 mb-2">No Data Available</h3>
        <p className="text-gray-300">No LeetCode statistics found for this user.</p>
      </div>
    );
  }

  const calculateAcceptanceRate = () => {
    if (stats.totalSolved && stats.totalQuestions) {
      return ((stats.totalSolved / stats.totalQuestions) * 100).toFixed(1) + '%';
    }
    return 'N/A';
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 border border-blue-500/30">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-mono text-blue-400">LeetCode Progress</h3>
        {stats.realName && (
          <span className="text-gray-300 text-sm">{stats.realName}</span>
        )}
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-300">Total Solved</span>
          <span className="text-blue-300 font-mono">{stats.totalSolved} / {stats.totalQuestions}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-blue-500 h-2.5 rounded-full" 
            style={{ width: `${(stats.totalSolved / stats.totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-green-400 text-lg font-bold">{stats.easySolved}</div>
          <div className="text-gray-400 text-xs">Easy</div>
          <div className="text-gray-500 text-xs">/ {stats.easyTotal}</div>
          <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
            <div 
              className="bg-green-500 h-1.5 rounded-full" 
              style={{ width: `${(stats.easySolved / stats.easyTotal) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-yellow-400 text-lg font-bold">{stats.mediumSolved}</div>
          <div className="text-gray-400 text-xs">Medium</div>
          <div className="text-gray-500 text-xs">/ {stats.mediumTotal}</div>
          <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
            <div 
              className="bg-yellow-500 h-1.5 rounded-full" 
              style={{ width: `${(stats.mediumSolved / stats.mediumTotal) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-red-400 text-lg font-bold">{stats.hardSolved}</div>
          <div className="text-gray-400 text-xs">Hard</div>
          <div className="text-gray-500 text-xs">/ {stats.hardTotal}</div>
          <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
            <div 
              className="bg-red-500 h-1.5 rounded-full" 
              style={{ width: `${(stats.hardSolved / stats.hardTotal) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-900 bg-opacity-70 p-3 rounded border border-blue-500/20">
          <div className="text-gray-400 text-xs mb-1">Acceptance Rate</div>
          <div className="text-white font-mono text-lg">{calculateAcceptanceRate()}</div>
        </div>
        <div className="bg-gray-900 bg-opacity-70 p-3 rounded border border-blue-500/20">
          <div className="text-gray-400 text-xs mb-1">Global Ranking</div>
          <div className="text-white font-mono text-lg">
            {stats.ranking ? `#${stats.ranking.toLocaleString()}` : 'N/A'}
          </div>
        </div>
      </div>

      {stats.reputation !== undefined && (
        <div className="mt-4 bg-gray-900 bg-opacity-70 p-3 rounded border border-blue-500/20">
          <div className="text-gray-400 text-xs mb-1">Reputation</div>
          <div className="text-white font-mono text-lg">{stats.reputation}</div>
        </div>
      )}
    </div>
  );
};

export default LeetCodeStats;