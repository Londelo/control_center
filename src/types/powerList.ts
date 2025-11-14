
export interface Task {
  id: string;
  text: string;
  description?: string;
  reason?: string;
  time: { needed: number, left: number, resetDates?: string[], losingStreak?: number }
  completed: boolean;
}

export interface PowerList {
  id: string;
  date: string;
  tasks: Task[];
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
