import { AppStats } from '@/types/powerList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsPanelProps {
  stats: AppStats;
}

export function StatsPanel({ stats }: StatsPanelProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      <Card className="bg-gray-50 border-gray-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Wins</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{stats.totalWins}</div>
        </CardContent>
      </Card>

      <Card className="bg-gray-50 border-gray-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Losses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{stats.totalLosses}</div>
        </CardContent>
      </Card>

      <Card className="bg-gray-50 border-gray-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Win Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{stats.winRate}%</div>
        </CardContent>
      </Card>

      <Card className="bg-gray-50 border-gray-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Current Streak</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{stats.currentStreak}</div>
        </CardContent>
      </Card>

      <Card className="bg-gray-50 border-gray-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Best Streak</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{stats.longestStreak}</div>
        </CardContent>
      </Card>
    </div>
  );
}
