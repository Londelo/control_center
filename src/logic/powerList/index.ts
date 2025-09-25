import { DEFAULT_TIME_NEEDED } from '@/enums/powerList';
import { Task, PowerList, PowerListStats, StandardTask } from '@/types/powerList';
import { v4 } from 'uuid'

export function normalizePowerList(powerList: PowerList): PowerList {
  return {
    ...powerList,
    standardTasks: powerList.standardTasks || [],
    tasks: powerList.tasks || Array.from({ length: 5 }, () => createEmptyTask()),
  };
}

export function createEmptyTask(): Task {
  return {
    id: v4(),
    text: '',
    time: { needed: DEFAULT_TIME_NEEDED, left: DEFAULT_TIME_NEEDED },
    completed: false,
    createdAt: new Date().toISOString(),
  };
}

export function createEmptyStandardTask(): StandardTask {
  return {
    id: v4(),
    text: '',
    completed: false,
    createdAt: new Date().toISOString(),
  };
}

export function createPowerList(date: string, tasks?: Task[], standardTasks?: StandardTask[]): PowerList {
  const defaultTasks = tasks || Array.from({ length: 5 }, () => createEmptyTask());
  const defaultStandardTasks = standardTasks || [];
  let powerList = {
    id: v4(),
    date,
    tasks: defaultTasks,
    standardTasks: defaultStandardTasks,
    isWin: false,
    isLoss: false,
    isComplete: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  powerList.isComplete = isPowerListComplete(powerList)

  return powerList;
}

export function isPowerListComplete(powerList: PowerList): boolean {
  return powerList.tasks.every(task => task.text.trim() !== '');
}

export function calculateWinLoss(powerList: PowerList, isToday: boolean = false): { isWin: boolean; isLoss: boolean } {

  const completedTasks = powerList.tasks.filter(task => task.completed).length;
  const isWin = completedTasks === 5;

  if (!isWin) {
    // Only today can be "in progress", other dates are losses if incomplete
    if (isToday) {
      return { isWin: false, isLoss: false };
    } else {
      return { isWin: false, isLoss: true };
    }
  }

  const isLoss = !isWin;
  return { isWin, isLoss };
}

export function updatePowerListStatus(powerList: PowerList, isToday: boolean = false): PowerList {
  const { isWin, isLoss } = calculateWinLoss(powerList, isToday);

  return {
    ...powerList,
    isWin,
    isLoss,
    isComplete: isPowerListComplete(powerList),
    updatedAt: new Date().toISOString(),
  };
}

export function getMostRecentTasks(taskHistory: Record<string, PowerList>): { tasks: Task[], standardTasks: StandardTask[] } {
  const dates = Object.keys(taskHistory).sort().reverse();

  for (const date of dates) {
    const powerList = normalizePowerList(taskHistory[date]);
    if (powerList && isPowerListComplete(powerList)) {
      const tasks = powerList.tasks.map((task) => ({
        ...createEmptyTask(),
        text: task.text,
      }));
      const standardTasks = powerList.standardTasks.map((task) => ({
        ...createEmptyStandardTask(),
        text: task.text,
      }));
      return { tasks, standardTasks };
    }
  }

  return {
    tasks: Array.from({ length: 5 }, () => createEmptyTask()),
    standardTasks: []
  };
}

export function calculatePowerListStats(taskHistory: Record<string, PowerList>): PowerListStats {
  const powerLists = Object.values(taskHistory);
  // Only count completed lists for stats
  const completeLists = powerLists.filter(list => isPowerListComplete(list));

  const totalWins = completeLists.filter(list => list.isWin).length;
  const totalLosses = completeLists.filter(list => list.isLoss).length;
  const winRate = completeLists.length > 0 ? (totalWins / completeLists.length) * 100 : 0;

  // Calculate current streak
  const sortedDates = Object.keys(taskHistory).sort().reverse();
  let currentStreak = 0;

  for (const date of sortedDates) {
    const powerList = taskHistory[date];
    // Only count completed lists for streak calculation
    if (powerList && isPowerListComplete(powerList) && powerList.isWin) {
      currentStreak++;
    } else if (powerList && isPowerListComplete(powerList)) {
      // Break streak only on completed losses, not in-progress days
      break;
    }
  }

  // Calculate longest streak
  let longestStreak = 0;
  let tempStreak = 0;

  for (const date of sortedDates.reverse()) {
    const powerList = taskHistory[date];
    if (powerList && isPowerListComplete(powerList) && powerList.isWin) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else if (powerList && isPowerListComplete(powerList)) {
      // Reset streak only on completed losses, not in-progress days
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
