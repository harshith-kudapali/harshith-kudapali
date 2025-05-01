// src/components/LeetCodeStats.jsx
import React, { useState, useEffect } from 'react';

const LeetCodeStats = ({ username }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeetCodeStats = async () => {
      try {
        // In a real implementation, this would call your backend API
        const response = await fetch(`/api/leetcode/stats/${username}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch LeetCode stats');
        }
        
        const data = await response.json();
        setStats(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching LeetCode stats:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchLeetCodeStats();
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
      </div>
    );
  }

  // Mock data for demonstration
  const mockStats = {
    totalSolved: 389,
    totalQuestions: 2341,
    easySolved: 154,
    easyTotal: 634,
    mediumSolved: 197,
    mediumTotal: 1279,
    hardSolved: 38,
    hardTotal: 428,
    acceptanceRate: '53.8%',
    ranking: 26549,
    contributionPoints: 2842,
    reputation: 2,
    submissions: {
      lastYear: [4, 2, 0, 5, 7, 3, 0, 0, 2, 4, 5, 1, 0, 3, 6, 2, 0, 0, 4, 5, 2, 0, 1]
    }
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 border border-blue-500/30">
      <h3 className="text-xl font-mono mb-4 text-blue-400">LeetCode Progress</h3>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-300">Total Solved</span>
          <span className="text-blue-300 font-mono">{mockStats.totalSolved} / {mockStats.totalQuestions}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-blue-500 h-2.5 rounded-full" 
            style={{ width: `${(mockStats.totalSolved / mockStats.totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-green-400 text-lg font-bold">{mockStats.easySolved}</div>
          <div className="text-gray-400 text-xs">Easy</div>
          <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
            <div 
              className="bg-green-500 h-1.5 rounded-full" 
              style={{ width: `${(mockStats.easySolved / mockStats.easyTotal) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-yellow-400 text-lg font-bold">{mockStats.mediumSolved}</div>
          <div className="text-gray-400 text-xs">Medium</div>
          <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
            <div 
              className="bg-yellow-500 h-1.5 rounded-full" 
              style={{ width: `${(mockStats.mediumSolved / mockStats.mediumTotal) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-red-400 text-lg font-bold">{mockStats.hardSolved}</div>
          <div className="text-gray-400 text-xs">Hard</div>
          <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
            <div 
              className="bg-red-500 h-1.5 rounded-full" 
              style={{ width: `${(mockStats.hardSolved / mockStats.hardTotal) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-900 bg-opacity-70 p-3 rounded border border-blue-500/20">
          <div className="text-gray-400 text-xs mb-1">Acceptance Rate</div>
          <div className="text-white font-mono text-lg">{mockStats.acceptanceRate}</div>
        </div>
        <div className="bg-gray-900 bg-opacity-70 p-3 rounded border border-blue-500/20">
          <div className="text-gray-400 text-xs mb-1">Global Ranking</div>
          <div className="text-white font-mono text-lg">#{mockStats.ranking}</div>
        </div>
      </div>
    </div>
  );
};

export default LeetCodeStats;