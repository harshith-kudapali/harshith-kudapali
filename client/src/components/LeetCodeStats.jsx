import React, { useState, useEffect } from 'react';
import { backendApi } from '../App';

const LeetCodeStats = ({ username }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeetCodeStats = async () => {
      try {
        const response = await fetch(`${backendApi}/api/leetcode/stats/${username}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();

        // Map backend fields to frontend expected fields
        const mappedStats = {
          username: data.username,
          realName: data.realName || '',
          avatar: data.avatar,
          ranking: data.ranking,
          reputation: data.reputation,
          aboutMe: data.aboutMe,
          school: data.school,
          company: data.company,
          jobTitle: data.jobTitle,
          countryName: data.countryName,
          githubUrl: data.githubUrl,
          twitterUrl: data.twitterUrl,
          linkedinUrl: data.linkedinUrl,
          totalSolved: data.totalSolved,
          totalQuestions: data.totalQuestions,
          overallProgress: ((data.totalSolved / data.totalQuestions) * 100).toFixed(1),
          overallAcceptanceRate: data.overallAcceptanceRate,

          easySolved: data.easy.solved,
          easyTotal: data.easy.total,
          easyProgress: data.easy.progress,
          easySubmissions: data.easy.submissions,
          easyAcceptanceRate: data.easy.acceptanceRate,

          mediumSolved: data.medium.solved,
          mediumTotal: data.medium.total,
          mediumProgress: data.medium.progress,
          mediumSubmissions: data.medium.submissions,
          mediumAcceptanceRate: data.medium.acceptanceRate,

          hardSolved: data.hard.solved,
          hardTotal: data.hard.total,
          hardProgress: data.hard.progress,
          hardSubmissions: data.hard.submissions,
          hardAcceptanceRate: data.hard.acceptanceRate,

          solutionCount: data.solutionCount,
          postViewCount: data.postViewCount,
          categoryDiscussCount: data.categoryDiscussCount,
          skillTags: data.skillTags,
          badges: data.badges,
          upcomingBadges: data.upcomingBadges,
          activeBadge: data.activeBadge
        };

        setStats(mappedStats);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (username) {
      fetchLeetCodeStats();
    } else {
      setError("Username not provided.");
      setLoading(false);
    }
  }, [username]);

  // Loading and Error UI (already correctly built in your code)
  if (loading) return <div className="text-white p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
  if (!stats) return <div className="text-white p-4">No stats found.</div>;

  // Replace the below with your detailed rendering UI
  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-2">{stats.realName || stats.username}</h2>
      <p>Total Solved: {stats.totalSolved} / {stats.totalQuestions}</p>
      <p>Acceptance Rate: {stats.overallAcceptanceRate}%</p>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Easy</h3>
        <p>Solved: {stats.easySolved} / {stats.easyTotal}</p>
        <p>Acceptance Rate: {stats.easyAcceptanceRate}%</p>
        <p>Progress: {stats.easyProgress}%</p>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Medium</h3>
        <p>Solved: {stats.mediumSolved} / {stats.mediumTotal}</p>
        <p>Acceptance Rate: {stats.mediumAcceptanceRate}%</p>
        <p>Progress: {stats.mediumProgress}%</p>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Hard</h3>
        <p>Solved: {stats.hardSolved} / {stats.hardTotal}</p>
        <p>Acceptance Rate: {stats.hardAcceptanceRate}%</p>
        <p>Progress: {stats.hardProgress}%</p>
      </div>
    </div>
  );
};

export default LeetCodeStats;
