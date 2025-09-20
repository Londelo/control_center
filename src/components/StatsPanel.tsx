import { AppStats } from '@/types/powerList';
import { Check } from 'lucide-react';

interface StatsPanelProps {
  stats: AppStats;
}

export function StatsPanel({ stats }: StatsPanelProps) {
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