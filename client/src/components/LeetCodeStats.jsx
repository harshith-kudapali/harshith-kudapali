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
        const res = await fetch(`${backendApi}/api/leetcode/stats/${username}`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status}: ${text}`);
        }
        const data = await res.json();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (username) fetchLeetCodeStats();
    else {
      setError('No username provided');
      setLoading(false);
    }
  }, [username]);

  if (loading) return (<...loading UI...>);
  if (error)   return (<...error UI...>);
  if (!stats)  return (<...no-data UI...>);

  // Compute overall progress
  const overallProgress = stats.totalQuestions > 0
    ? ((stats.totalSolved / stats.totalQuestions) * 100).toFixed(1)
    : '0.0';

  const difficulties = [
    { key: 'easy', label: 'Easy', color: 'emerald', bg: 'from-emerald-500/20 to-green-500/20' },
    { key: 'medium', label: 'Medium', color: 'amber', bg: 'from-amber-500/20 to-yellow-500/20' },
    { key: 'hard', label: 'Hard', color: 'red', bg: 'from-red-500/20 to-pink-500/20' },
  ];

  return (
    <div className="...widget wrapper classes...">
      {/* Header */}
      <div className="...header classes...">
        <img src={stats.avatar} alt={stats.username} className="w-16 h-16 rounded-full" />
        <h2>{stats.realName || stats.username}</h2>
        <p>@{stats.username}</p>
        <div>{stats.ranking && `#${stats.ranking.toLocaleString()} Global`}</div>
        <div>
          <span>{stats.totalSolved}</span>
          <span>Problems Solved</span>
          <span>{overallProgress}% Complete</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        {['overview', 'problems', 'profile'].map(tabId => (
          <button
            key={tabId}
            onClick={() => setActiveTab(tabId)}
            className={activeTab === tabId ? 'active-tab' : ''}
          >
            {tabId.charAt(0).toUpperCase() + tabId.slice(1)}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === 'overview' && (
          <>
            {/* Overall Progress Ring */}
            <ProgressRing percentage={parseFloat(overallProgress)} />

            <div className="grid grid-cols-3 gap-6">
              {difficulties.map(({ key, label, color, bg }) => {
                const d = stats[key];
                return (
                  <div key={key} className={`bg-gradient-to-br ${bg} rounded-xl p-6`}>
                    <div className={`text-3xl font-bold text-${color}-400`}>
                      {d.solved}
                    </div>
                    <div className="text-slate-300">{label}</div>
                    <div className="text-slate-500">of {d.total}</div>
                    <div className="w-full bg-slate-700 rounded-full h-3 my-2">
                      <div
                        className={`bg-gradient-to-r ${getDifficultyColor(label)} h-3 rounded-full`}
                        style={{ width: `${d.progress}%` }}
                      />
                    </div>
                    <div className={`text-${color}-400 font-semibold`}>
                      {d.progress}%
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {activeTab === 'problems' && (
          <div className="space-y-6">
            {difficulties.map(({ key, label, color, bg }) => {
              const d = stats[key];
              return (
                <div key={key} className="bg-slate-800/30 rounded-xl p-6">
                  <div className="flex justify-between mb-4">
                    <h4>{label} Problems</h4>
                    <div className={`bg-gradient-to-r ${bg} text-white px-3 py-1 rounded-full`}>
                      {d.solved} / {d.total}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 text-center">
                    <div>
                      <div className="text-slate-400">Solved</div>
                      <div className={`text-2xl font-bold text-${color}-400`}>
                        {d.solved}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-400">Submissions</div>
                      <div className="text-2xl font-bold text-slate-300">
                        {d.submissions}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-400">Acceptance</div>
                      <div className={`text-2xl font-bold text-${color}-400`}>
                        {d.acceptanceRate}%
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {stats.company && <KeyValue label="Company" value={stats.company} />}
              {stats.jobTitle && <KeyValue label="Job Title" value={stats.jobTitle} />}
              {stats.school && <KeyValue label="School" value={stats.school} />}
              {stats.countryName && <KeyValue label="Location" value={stats.countryName} />}
            </div>

            <SocialLinks urls={{
              github: stats.githubUrl,
              linkedin: stats.linkedinUrl,
              twitter: stats.twitterUrl,
            }} />

            {stats.aboutMe && (
              <Section title="About">
                <p>{stats.aboutMe}</p>
              </Section>
            )}

            {stats.skillTags?.length > 0 && (
              <Section title="Skills">
                {stats.skillTags.map((tag,i) => (
                  <span key={i}>{tag}</span>
                ))}
              </Section>
            )}

            {stats.badges?.length > 0 && (
              <Section title="Badges">
                {stats.badges.slice(0,8).map(badge => (
                  <BadgeCard key={badge.id} badge={badge} />
                ))}
              </Section>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper components
const ProgressRing = ({ percentage, size = 140, strokeWidth = 10, color = 'emerald' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI * 2;
  const dash = `${(percentage / 100) * circumference} ${circumference}`;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size/2} cy={size/2} r={radius} className="stroke-slate-700" strokeWidth={strokeWidth} fill="none"/>
      <circle cx={size/2} cy={size/2} r={radius} strokeWidth={strokeWidth}
        strokeDasharray={dash} strokeLinecap="round"
        className={`stroke-${color}-500 transition-all duration-1000`} fill="none"/>
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
        className="text-white font-bold">{percentage}%</text>
    </svg>
  );
};

const KeyValue = ({ label, value }) => (
  <div>
    <div className="text-slate-400 text-sm">{label}</div>
    <div className="text-white font-medium">{value}</div>
  </div>
);

const Section = ({ title, children }) => (
  <div className="bg-slate-800/30 rounded-xl p-6">
    <h4 className="text-lg font-semibold text-white mb-4">{title}</h4>
    {children}
  </div>
);

const BadgeCard = ({ badge }) => (
  <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg">
    {badge.icon && <img src={badge.icon} className="w-8 h-8" alt={badge.displayName}/>}
    <div>
      <div className="text-white">{badge.displayName}</div>
      {badge.creationDate && <div className="text-slate-400 text-xs">{new Date(badge.creationDate * 1000).getFullYear()}</div>}
    </div>
  </div>
);

const getDifficultyColor = (label) => {
  switch (label.toLowerCase()) {
    case 'easy': return 'from-emerald-500 to-green-400';
    case 'medium': return 'from-amber-500 to-yellow-400';
    case 'hard': return 'from-red-500 to-pink-400';
    default: return 'from-slate-500 to-slate-400';
  }
};

export default LeetCodeStats;
