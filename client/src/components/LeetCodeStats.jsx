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
        const response = await fetch(`${backendApi}/api/leetcode/stats/${username}`);
        const responseText = await response.text();
        if (!response.ok) throw new Error(`HTTP ${response.status}: ${responseText}`);

        const data = JSON.parse(responseText);
        setStats(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (username) fetchLeetCodeStats();
    else {
      setError('No username provided');
      setLoading(false);
    }
  }, [username]);

  if (loading) return (
    <div className="min-h-96 p-12 text-center text-slate-300">
      <div className="animate-spin h-12 w-12 mx-auto border-4 border-emerald-500/30 border-t-transparent rounded-full"></div>
      <p className="mt-4">Loading LeetCode stats...</p>
    </div>
  );

  if (error) return (
    <div className="bg-red-900/20 border border-red-500/30 p-8 rounded-xl text-center text-slate-300 overflow-x-auto">
      <h3 className="text-xl font-bold text-red-400">Error</h3>
      <p>{error}</p>
    </div>
  );

  if (!stats) return (
    <div className="bg-slate-900 border border-slate-700/50 p-8 rounded-xl text-center text-slate-300 overflow-x-auto">
      <h3 className="text-xl font-bold text-slate-400">No Data</h3>
      <p>No LeetCode statistics found.</p>
    </div>
  );

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

  const overallProgress = stats.totalQuestions > 0
    ? ((stats.totalSolved / stats.totalQuestions) * 100).toFixed(1)
    : 0;

  return (
    <div className="w-full overflow-x-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 backdrop-blur-xl shadow-2xl">
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-slate-700/50 flex flex-col md:flex-row justify-between gap-6">
        <div className="flex items-center space-x-4 min-w-0">
          {stats.avatar && (
            <img src={stats.avatar} alt={stats.username} className="w-16 h-16 rounded-full border-2 border-emerald-500/50" />
          )}
          <div className="min-w-0">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400 break-words">
              {stats.realName || stats.username}
            </h2>
            <p className="text-slate-400 font-mono break-words">@{stats.username}</p>
            {stats.ranking && (
              <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black px-3 py-1 rounded-full text-sm font-bold mt-2 inline-block">
                #{stats.ranking.toLocaleString()} Global
              </div>
            )}
          </div>
        </div>
        <div className="text-right min-w-0">
          <div className="text-3xl font-bold text-white">{stats.totalSolved}</div>
          <div className="text-slate-400 text-sm">Problems Solved</div>
          <div className="text-emerald-400 text-sm font-medium mt-1">{overallProgress}% Complete</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-700/50 bg-slate-800/50 overflow-x-auto">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'problems', label: 'Problems' },
          { id: 'profile', label: 'Profile' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'text-emerald-400 border-b-2 border-emerald-500 bg-emerald-500/5'
                : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/30'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6 md:p-8 text-slate-300 space-y-8 overflow-x-auto">
        {activeTab === 'overview' && (
          <>
            <div className="text-center">
              <ProgressRing percentage={parseFloat(overallProgress)} size={140} strokeWidth={10} />
              <h3 className="text-xl font-bold text-white mt-4">Overall Progress</h3>
              <p>{stats.totalSolved} of {stats.totalQuestions} problems solved</p>
            </div>

            {/* Difficulty Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['easy', 'medium', 'hard'].map((level) => (
                <div key={level} className={`rounded-xl p-6 border border-slate-700/30 bg-gradient-to-br ${getDifficultyColor(level)}/20`}>
                  <div className="text-center">
                    <div className={`text-3xl font-bold text-${level === 'easy' ? 'emerald' : level === 'medium' ? 'amber' : 'red'}-400`}>
                      {stats[level].solved}
                    </div>
                    <div className="text-slate-300 mb-1 capitalize">{level}</div>
                    <div className="text-slate-500 text-sm mb-4">of {stats[level].total}</div>
                    <div className="w-full bg-slate-700 rounded-full h-3 mb-2">
                      <div
                        className={`bg-gradient-to-r ${getDifficultyColor(level)} h-3 rounded-full`}
                        style={{ width: `${stats[level].progress}%` }}
                      ></div>
                    </div>
                    <div className={`text-${level === 'easy' ? 'emerald' : level === 'medium' ? 'amber' : 'red'}-400 font-semibold text-sm`}>
                      {stats[level].progress}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'problems' && (
          <>
            <h3 className="text-xl font-bold text-white">Problem Solving Statistics</h3>
            {['easy', 'medium', 'hard'].map(level => (
              <div key={level} className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/30 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold capitalize">{level} Problems</h4>
                  <span className="px-3 py-1 text-sm rounded-full bg-gradient-to-r text-white font-bold 
                    from-emerald-500 to-green-400">{stats[level].solved} / {stats[level].total}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 text-center gap-4">
                  <div>
                    <div className="text-sm">Solved</div>
                    <div className="text-xl font-bold text-white">{stats[level].solved}</div>
                  </div>
                  <div>
                    <div className="text-sm">Submissions</div>
                    <div className="text-xl font-bold text-white">{stats[level].submissions}</div>
                  </div>
                  <div>
                    <div className="text-sm">Acceptance</div>
                    <div className="text-xl font-bold text-white">{stats[level].acceptanceRate}%</div>
                  </div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className={`bg-gradient-to-r ${getDifficultyColor(level)} h-2 rounded-full`}
                    style={{ width: `${stats[level].progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </>
        )}

        {activeTab === 'profile' && (
          <>
            <h3 className="text-xl font-bold text-white">Profile</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                {stats.company && <p><strong>Company:</strong> {stats.company}</p>}
                {stats.jobTitle && <p><strong>Job Title:</strong> {stats.jobTitle}</p>}
                {stats.school && <p><strong>School:</strong> {stats.school}</p>}
                {stats.countryName && <p><strong>Country:</strong> {stats.countryName}</p>}
              </div>
              <div className="space-y-2 break-words">
                {stats.aboutMe && (
                  <div>
                    <strong>About:</strong>
                    <p className="text-sm">{stats.aboutMe}</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LeetCodeStats;
