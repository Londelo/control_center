"use client"

import { useState, useEffect } from 'react';
import { useDaily } from '@/app/daily/_hooks/useDaily';

export function StatsPanel() {
  const { getStats } = useDaily();
  const [stats, setStats] = useState({
    totalWins: 0,
    totalLosses: 0,
    currentStreak: 0,
    longestStreak: 0,
    winRate: 0,
  });

  useEffect(() => {
    setStats(getStats());
  }, [getStats]);

  return (
    <div className="space-y-3 font-mono text-base text-left">
      <div>Wins: {stats.totalWins}</div>
      <div>Current Streak: {stats.currentStreak}</div>
      <div>Win Rate: {stats.winRate}%</div>
      <div>Best Streak: {stats.longestStreak}</div>
      <div>Total Losses: {stats.totalLosses}</div>
    </div>
  );
}
