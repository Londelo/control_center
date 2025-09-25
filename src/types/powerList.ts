
export interface Task {
  id: string;
  text: string;
  description?: string;
  reason?: string;
  time: { needed: number, left: number}
  completed: boolean;
  createdAt: string;
}

export interface StandardTask {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export interface PowerList {
  id: string;
  date: string;
  tasks: Task[];
  standardTasks: StandardTask[];
  isWin: boolean;
  isLoss: boolean;
  isComplete: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PowerLists {
  [date: string]: PowerList
}

export interface PowerListStats {
  totalWins: number;
  totalLosses: number;
  currentStreak: number;
  longestStreak: number;
  winRate: number;
}
