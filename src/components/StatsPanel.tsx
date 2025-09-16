import { AppStats } from '@/types/powerList';

interface StatsPanelProps {
  stats: AppStats;
}

export function StatsPanel({ stats }: StatsPanelProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6 pb-2">
          <h3 className="text-sm font-medium text-gray-600">Wins</h3>
        </div>
        <div className="p-6 pt-0">
          <div className="text-2xl font-bold text-gray-900">{stats.totalWins}</div>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6 pb-2">
          <h3 className="text-sm font-medium text-gray-600">Losses</h3>
        </div>
        <div className="p-6 pt-0">
          <div className="text-2xl font-bold text-gray-900">{stats.totalLosses}</div>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6 pb-2">
          <h3 className="text-sm font-medium text-gray-600">Win Rate</h3>
        </div>
        <div className="p-6 pt-0">
          <div className="text-2xl font-bold text-gray-900">{stats.winRate}%</div>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6 pb-2">
          <h3 className="text-sm font-medium text-gray-600">Current Streak</h3>
        </div>
        <div className="p-6 pt-0">
          <div className="text-2xl font-bold text-gray-900">{stats.currentStreak}</div>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6 pb-2">
          <h3 className="text-sm font-medium text-gray-600">Best Streak</h3>
        </div>
        <div className="p-6 pt-0">
          <div className="text-2xl font-bold text-gray-900">{stats.longestStreak}</div>
        </div>
      </div>
    </div>
  );
}