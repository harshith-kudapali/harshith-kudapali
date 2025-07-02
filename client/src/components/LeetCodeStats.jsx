// src/components/LeetCodeStats.jsx
import React, { useState, useEffect } from 'react';
import { backendApi } from '../App';

const LeetCodeStats = ({ username }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchLeetCodeStats = async () => {
      try {
        console.log('Fetching LeetCode stats for username:', username);
        console.log('Making request to:', `${backendApi}/api/leetcode/stats/${username}`);
        
        const response = await fetch(`${backendApi}/api/leetcode/stats/${username}`);
        console.log('Response status:', response.status);
        
        const responseText = await response.text();
        console.log('Raw response text:', responseText);
        
        if (!response.ok) {
          console.error('Response not OK:', response.status, responseText);
          throw new Error(`HTTP ${response.status}: ${responseText}`);
        }
        
        let data;
        try {
          data = JSON.parse(responseText);
          console.log('Parsed JSON data:', data);
        } catch (parseError) {
          console.error('Failed to parse JSON:', parseError);
          throw new Error(`Invalid JSON response: ${parseError.message}`);
        }
        
        setStats(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching LeetCode stats:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    if (username) {
      fetchLeetCodeStats();
    } else {
      setError('No username provided');
      setLoading(false);
    }
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-96 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 backdrop-blur-xl shadow-2xl">
        <div className="flex flex-col justify-center items-center h-full p-12">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-emerald-500/30 rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="mt-6 text-slate-400 font-medium">Loading LeetCode stats...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-red-950/50 via-slate-900 to-slate-900 rounded-2xl p-8 border border-red-500/30 backdrop-blur-xl shadow-2xl">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-red-400 mb-2">Error Loading Stats</h3>
          <p className="text-slate-300 mb-2">Could not load LeetCode statistics.</p>
          <p className="text-slate-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700/50 backdrop-blur-xl shadow-2xl">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-slate-700/50 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-400 mb-2">No Data Available</h3>
          <p className="text-slate-300">No LeetCode statistics found for this user.</p>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'from-emerald-500 to-green-400';
      case 'medium': return 'from-amber-500 to-yellow-400';
      case 'hard': return 'from-red-500 to-pink-400';
      default: return 'from-slate-500 to-slate-400';
    }
  };

  const ProgressRing = ({ percentage, size = 120, strokeWidth = 8, color = 'emerald' }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-slate-700"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            className={`text-${color}-500 transition-all duration-1000 ease-out`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{percentage}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 backdrop-blur-xl shadow-2xl overflow-hidden">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 p-8 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {stats.avatar && (
              <img 
                src={stats.avatar} 
                alt={stats.username}
                className="w-16 h-16 rounded-full border-2 border-emerald-500/50 shadow-lg"
              />
            )}
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                {stats.realName || stats.username}
              </h2>
              <p className="text-slate-400 font-mono">@{stats.username}</p>
              {stats.ranking && (
                <div className="flex items-center mt-2">
                  <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                    #{stats.ranking.toLocaleString()} Global
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="text-right">
            <div className="text-3xl font-bold text-white mb-1">{stats.totalSolved}</div>
            <div className="text-slate-400 text-sm">Problems Solved</div>
            <div className="text-emerald-400 text-sm font-medium mt-1">
              {stats.overallProgress}% Complete
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-slate-700/50 bg-slate-800/50">
        {[
          { id: 'overview', label: 'Overview', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
          { id: 'problems', label: 'Problems', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
          { id: 'profile', label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-6 py-4 font-medium text-sm transition-all duration-200 ${
              activeTab === tab.id
                ? 'text-emerald-400 border-b-2 border-emerald-500 bg-emerald-500/5'
                : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/30'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tab.icon}></path>
            </svg>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Overall Progress */}
            <div className="text-center">
              <ProgressRing 
                percentage={parseFloat(stats.overallProgress)} 
                size={140} 
                strokeWidth={10}
                color="emerald"
              />
              <h3 className="text-xl font-bold text-white mt-4">Overall Progress</h3>
              <p className="text-slate-400">{stats.totalSolved} of {stats.totalQuestions} problems solved</p>
            </div>

            {/* Difficulty Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Easy', solved: stats.easySolved, total: stats.easyTotal, progress: stats.easyProgress, color: 'emerald', bgColor: 'from-emerald-500/20 to-green-500/20' },
                { name: 'Medium', solved: stats.mediumSolved, total: stats.mediumTotal, progress: stats.mediumProgress, color: 'amber', bgColor: 'from-amber-500/20 to-yellow-500/20' },
                { name: 'Hard', solved: stats.hardSolved, total: stats.hardTotal, progress: stats.hardProgress, color: 'red', bgColor: 'from-red-500/20 to-pink-500/20' }
              ].map((difficulty) => (
                <div key={difficulty.name} className={`bg-gradient-to-br ${difficulty.bgColor} rounded-xl p-6 border border-slate-600/30`}>
                  <div className="text-center">
                    <div className={`text-3xl font-bold text-${difficulty.color}-400 mb-2`}>
                      {difficulty.solved}
                    </div>
                    <div className="text-slate-300 font-medium mb-1">{difficulty.name}</div>
                    <div className="text-slate-500 text-sm mb-4">of {difficulty.total}</div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-700 rounded-full h-3 mb-2">
                      <div 
                        className={`bg-gradient-to-r ${getDifficultyColor(difficulty.name)} h-3 rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${difficulty.progress}%` }}
                      ></div>
                    </div>
                    <div className={`text-${difficulty.color}-400 font-semibold text-sm`}>
                      {difficulty.progress}%
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/30">
                <div className="text-slate-400 text-sm mb-2">Acceptance Rate</div>
                <div className="text-2xl font-bold text-emerald-400">{stats.overallAcceptanceRate}%</div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/30">
                <div className="text-slate-400 text-sm mb-2">Reputation</div>
                <div className="text-2xl font-bold text-blue-400">{stats.reputation || 0}</div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/30">
                <div className="text-slate-400 text-sm mb-2">Solutions</div>
                <div className="text-2xl font-bold text-purple-400">{stats.solutionCount}</div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/30">
                <div className="text-slate-400 text-sm mb-2">Post Views</div>
                <div className="text-2xl font-bold text-orange-400">{stats.postViewCount?.toLocaleString() || 0}</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'problems' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-6">Problem Solving Statistics</h3>
            
            {/* Detailed Stats */}
            {[
              { 
                name: 'Easy Problems', 
                solved: stats.easySolved, 
                total: stats.easyTotal, 
                submissions: stats.easySubmissions,
                acceptance: stats.easyAcceptanceRate,
                color: 'emerald',
                gradient: 'from-emerald-500 to-green-400'
              },
              { 
                name: 'Medium Problems', 
                solved: stats.mediumSolved, 
                total: stats.mediumTotal, 
                submissions: stats.mediumSubmissions,
                acceptance: stats.mediumAcceptanceRate,
                color: 'amber',
                gradient: 'from-amber-500 to-yellow-400'
              },
              { 
                name: 'Hard Problems', 
                solved: stats.hardSolved, 
                total: stats.hardTotal, 
                submissions: stats.hardSubmissions,
                acceptance: stats.hardAcceptanceRate,
                color: 'red',
                gradient: 'from-red-500 to-pink-400'
              }
            ].map((category) => (
              <div key={category.name} className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/30">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white">{category.name}</h4>
                  <div className={`bg-gradient-to-r ${category.gradient} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                    {category.solved} / {category.total}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-slate-400 text-sm mb-1">Solved</div>
                    <div className={`text-2xl font-bold text-${category.color}-400`}>{category.solved}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-slate-400 text-sm mb-1">Submissions</div>
                    <div className="text-2xl font-bold text-slate-300">{category.submissions}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-slate-400 text-sm mb-1">Acceptance</div>
                    <div className={`text-2xl font-bold text-${category.color}-400`}>{category.acceptance}%</div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${category.gradient} h-2 rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${(category.solved / category.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-6">Profile Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Info */}
              <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/30">
                <h4 className="text-lg font-semibold text-white mb-4">Personal Details</h4>
                <div className="space-y-4">
                  {stats.company && (
                    <div>
                      <div className="text-slate-400 text-sm">Company</div>
                      <div className="text-white font-medium">{stats.company}</div>
                    </div>
                  )}
                  {stats.jobTitle && (
                    <div>
                      <div className="text-slate-400 text-sm">Job Title</div>
                      <div className="text-white font-medium">{stats.jobTitle}</div>
                    </div>
                  )}
                  {stats.school && (
                    <div>
                      <div className="text-slate-400 text-sm">School</div>
                      <div className="text-white font-medium">{stats.school}</div>
                    </div>
                  )}
                  {stats.countryName && (
                    <div>
                      <div className="text-slate-400 text-sm">Location</div>
                      <div className="text-white font-medium">{stats.countryName}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/30">
                <h4 className="text-lg font-semibold text-white mb-4">Social Links</h4>
                <div className="space-y-3">
                  {stats.githubUrl && (
                    <a href={stats.githubUrl} target="_blank" rel="noopener noreferrer" 
                       className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span>GitHub</span>
                    </a>
                  )}
                  {stats.linkedinUrl && (
                    <a href={stats.linkedinUrl} target="_blank" rel="noopener noreferrer"
                       className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {stats.twitterUrl && (
                    <a href={stats.twitterUrl} target="_blank" rel="noopener noreferrer"
                       className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                      <span>Twitter</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* About Me */}
            {stats.aboutMe && (
              <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/30">
                <h4 className="text-lg font-semibold text-white mb-4">About</h4>
                <p className="text-slate-300 leading-relaxed">{stats.aboutMe}</p>
              </div>
            )}

            {/* Skills */}
            {stats.skillTags && stats.skillTags.length > 0 && (
              <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/30">
                <h4 className="text-lg font-semibold text-white mb-4">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {stats.skillTags.map((skill, index) => (
                    <span key={index} className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-500/30">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Badges */}
            {stats.badges && stats.badges.length > 0 && (
              <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/30">
                <h4 className="text-lg font-semibold text-white mb-4">Badges</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {stats.badges.slice(0, 8).map((badge) => (
                    <div key={badge.id} className="flex items-center space-x-3 bg-slate-700/30 rounded-lg p-3">
                      {badge.icon && (
                        <img src={badge.icon} alt={badge.displayName} className="w-8 h-8" />
                      )}
                      <div>
                        <div className="text-white text-sm font-medium">{badge.displayName}</div>
                        {badge.creationDate && (
                          <div className="text-slate-400 text-xs">
                            {new Date(badge.creationDate * 1000).getFullYear()}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeetCodeStats;