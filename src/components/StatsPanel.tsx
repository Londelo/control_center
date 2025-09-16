import { AppStats } from '@/types/powerList';

interface StatsPanelProps {
  stats: AppStats;
}

export function StatsPanel({ stats }: StatsPanelProps) {
  return (
    <div>
      <div>
        <div>
          <h3>Wins</h3>
        </div>
        <div>
          <div>{stats.totalWins}</div>
        </div>
      </div>

      <div>
        <div>
          <h3>Losses</h3>
        </div>
        <div>
          <div>{stats.totalLosses}</div>
        </div>
      </div>

      <div>
        <div>
          <h3>Win Rate</h3>
        </div>
        <div>
          <div>{stats.winRate}%</div>
        </div>
      </div>

      <div>
        <div>
          <h3>Current Streak</h3>
        </div>
        <div>
          <div>{stats.currentStreak}</div>
        </div>
      </div>

      <div>
        <div>
          <h3>Best Streak</h3>
        </div>
        <div>
          <div>{stats.longestStreak}</div>
        </div>
      </div>
    </div>
  );
}