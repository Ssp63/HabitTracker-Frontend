// src/components/StatsDisplay.jsx

import React from 'react';

// This is a presentational component. Its only job is to receive props and display them.
function StatsDisplay({ stats }) {
  // If for any reason the stats prop is not available yet, we can show a loading state.
  if (!stats) {
    return <p>Loading stats...</p>;
  }

  // We can create an array of our stat data to easily map over it and reduce repetitive JSX.
  const statCards = [
    {
      label: 'Current Streak',
      value: stats.currentStreak,
      unit: 'days',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.362-1.44m0 0a8.25 8.25 0 013.362 1.44m-3.362-1.44L11.638 7.048m.002 0A8.25 8.25 0 0112 5.214" />
        </svg>
      ),
    },
    {
      label: 'Longest Streak',
      value: stats.longestStreak,
      unit: 'days',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 1111.412-8.125m-11.412 8.125a9.75 9.75 0 0011.412-8.125" />
        </svg>
      ),
    },
    {
      label: 'Success Rate',
      value: `${stats.completionPercentage}%`,
      unit: 'overall',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: 'Total Completions',
      value: stats.totalCompletions,
      unit: 'times',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="stats-display-container">
      {statCards.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-info">
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsDisplay;