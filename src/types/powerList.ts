import { BaseTask, BaseTaskList } from './shared';

export interface Task extends BaseTask {
  description?: string;
  reason?: string;
  time: { needed: number, left: number, resetDates?: string[], losingStreak?: number }
}

export interface PowerList extends BaseTaskList<Task> {
  isWin: boolean;
  isLoss: boolean;
  isComplete: boolean;
  createdAt?: string;
  updatedAt?: string;
  standardTasks?: import('@/types/standards').StandardTask[];
}

export type PowerLists = {
  [date: string]: PowerList
}

export interface PowerListStats {
  totalWins: number;
  totalLosses: number;
  currentStreak: number;
  longestStreak: number;
  winRate: number;
}
