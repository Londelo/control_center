export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export interface PowerList {
  id: string;
  date: string;
  tasks: Task[];
  sideTasks: Task[];
  isWin: boolean;
  isLoss: boolean;
  isComplete: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DayStats {
  date: string;
  isWin: boolean;
  isLoss: boolean;
  completedTasks: number;
  totalTasks: number;
}

export interface TaskStats {
  taskText: string;
  completions: number;
  attempts: number;
  successRate: number;
}

export interface PowerListStats {
  totalWins: number;
  totalLosses: number;
  currentStreak: number;
  longestStreak: number;
  winRate: number;
}
