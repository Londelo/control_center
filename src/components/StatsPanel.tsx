import { AppStats } from '@/types/powerList';

interface StatsPanelProps {
  stats: AppStats;
}

export function StatsPanel({ stats }: StatsPanelProps) {
  return (
    <div className="space-y-3 font-mono text-base">
      <div className="flex items-start gap-3">
        <div className="w-5 h-5 border-2 border-black flex items-center justify-center flex-shrink-0 mt-0.5">
          <Check className="w-3 h-3" />
        </div>
        <span>Wins: {stats.totalWins}</span>
      </div>
      
      <div className="flex items-start gap-3">
        <div className="w-5 h-5 border-2 border-black flex items-center justify-center flex-shrink-0 mt-0.5">
          <Check className="w-3 h-3" />
        </div>
        <span>Current Streak: {stats.currentStreak}</span>
      </div>
      
      <div className="flex items-start gap-3">
        <div className="w-5 h-5 border-2 border-black flex-shrink-0 mt-0.5"></div>
        <span>Win Rate: {stats.winRate}%</span>
      </div>
      
      <div className="flex items-start gap-3">
        <div className="w-5 h-5 border-2 border-black flex items-center justify-center flex-shrink-0 mt-0.5">
          <Check className="w-3 h-3" />
        </div>
        <span>Best Streak: {stats.longestStreak}</span>
      </div>
      
      <div className="flex items-start gap-3">
        <div className="w-5 h-5 border-2 border-black flex items-center justify-center flex-shrink-0 mt-0.5">
          <Check className="w-3 h-3" />
        </div>
        <span>Total Losses: {stats.totalLosses}</span>
      </div>
    </div>
  );
}