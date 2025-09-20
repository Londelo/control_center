import { Task, TaskList, DayStats, TaskStats, AppStats } from '@/types/powerList';

export function normalizeTaskList(taskList: TaskList): TaskList {
  return {
    ...taskList,
    sideTasks: taskList.sideTasks || [],
    tasks: taskList.tasks || Array.from({ length: 5 }, (_, i) => createEmptyTask(i)),
  };
}

export function createEmptyTask(index: number): Task {
  return {
    id: `task-${Date.now()}-${index}`,
    text: '',
    completed: false,
    createdAt: new Date().toISOString(),
  };
}

export function createTaskList(date: string, tasks?: Task[], sideTasks?: Task[]): TaskList {
  const defaultTasks = tasks || Array.from({ length: 5 }, (_, i) => createEmptyTask(i));
  const defaultSideTasks = sideTasks || [];

  return {
    id: `list-${date}`,
    date,
    tasks: defaultTasks,
    sideTasks: defaultSideTasks,
    isWin: false,
    isLoss: false,
    isComplete: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function isTaskListComplete(taskList: TaskList): boolean {
  return taskList.tasks.every(task => task.text.trim() !== '');
}

export function calculateWinLoss(taskList: TaskList): { isWin: boolean; isLoss: boolean } {
  if (!isTaskListComplete(taskList)) {
    return { isWin: false, isLoss: true };
  }

  const completedTasks = taskList.tasks.filter(task => task.completed).length;
  const isWin = completedTasks === 5;
  const isLoss = !isWin;

  return { isWin, isLoss };
}

export function updateTaskListStatus(taskList: TaskList): TaskList {
  const { isWin, isLoss } = calculateWinLoss(taskList);

  return {
    ...taskList,
    isWin,
    isLoss,
    isComplete: isTaskListComplete(taskList),
    updatedAt: new Date().toISOString(),
  };
}

export function generateMissedDays(lastDate: string, currentDate: string): string[] {
  const missed: string[] = [];
  const start = new Date(lastDate);
  const end = new Date(currentDate);

  start.setDate(start.getDate() + 1); // Start from day after last date

  while (start < end) {
    missed.push(start.toISOString().split('T')[0]);
    start.setDate(start.getDate() + 1);
  }

  return missed;
}

export function getMostRecentTasks(taskHistory: Record<string, TaskList>): { tasks: Task[], sideTasks: Task[] } {
  const dates = Object.keys(taskHistory).sort().reverse();

  for (const date of dates) {
    const taskList = normalizeTaskList(taskHistory[date]);
    if (taskList && isTaskListComplete(taskList)) {
      const tasks = taskList.tasks.map((task, index) => ({
        ...createEmptyTask(index),
        text: task.text,
      }));
      const sideTasks = taskList.sideTasks.map((task, index) => ({
        ...createEmptyTask(index),
        text: task.text,
      }));
      return { tasks, sideTasks };
    }
  }

  return {
    tasks: Array.from({ length: 5 }, (_, i) => createEmptyTask(i)),
    sideTasks: []
  };
}

export function calculateAppStats(taskHistory: Record<string, TaskList>): AppStats {
  const taskLists = Object.values(taskHistory);
  const completeLists = taskLists.filter(list => isTaskListComplete(list));

  const totalWins = completeLists.filter(list => list.isWin).length;
  const totalLosses = completeLists.filter(list => list.isLoss).length;
  const winRate = completeLists.length > 0 ? (totalWins / completeLists.length) * 100 : 0;

  // Calculate current streak
  const sortedDates = Object.keys(taskHistory).sort().reverse();
  let currentStreak = 0;

  for (const date of sortedDates) {
    const taskList = taskHistory[date];
    if (taskList && isTaskListComplete(taskList) && taskList.isWin) {
      currentStreak++;
    } else {
      break;
    }
  }

  // Calculate longest streak
  let longestStreak = 0;
  let tempStreak = 0;

  for (const date of sortedDates.reverse()) {
    const taskList = taskHistory[date];
    if (taskList && isTaskListComplete(taskList) && taskList.isWin) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  return {
    totalWins,
    totalLosses,
    currentStreak,
    longestStreak,
    winRate: Math.round(winRate),
  };
}
