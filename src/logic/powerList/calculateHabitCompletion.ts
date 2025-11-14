import { PowerLists } from '@/types/powerList';

export type CalculateHabitCompletion = {
  allPowerLists: PowerLists
};

const calculateHabitCompletion = ({allPowerLists}:CalculateHabitCompletion): PowerLists => {
  type TaskTracker = { count: number, lastDayWon: number, losingStreak: number, resetDates: string[] }
  const defaultTaskTracker = { count: 0, lastDayWon: -1, losingStreak: 0, resetDates: [] }
  const taskCompletionMap = new Map<string, TaskTracker>();
  const updatedPowerLists: PowerLists = {...allPowerLists};

  const sortedDates = Object.keys(updatedPowerLists).sort((a, b) =>
    new Date(a).getTime() - new Date(b).getTime()
  );

  for (const date of sortedDates) {
    const powerList = updatedPowerLists[date];
    const day = Number(new Date(date).getDate())

    for (const task of powerList.tasks) {
      const { count, lastDayWon, losingStreak, resetDates } = taskCompletionMap.get(task.id) || defaultTaskTracker;

      let newTaskTracker: TaskTracker = {
        count: task.completed ? count + 1 : count,
        lastDayWon: task.completed ? day : lastDayWon,
        losingStreak: task.completed ? 0 : losingStreak + 1,
        resetDates
      }

      if(losingStreak >= 3) {
        task.time.left = task.time.needed
        newTaskTracker = { ...defaultTaskTracker, resetDates: [ ...resetDates, date ] }
      } else if(losingStreak === 2) {
        task.time.left = task.time.needed - newTaskTracker.count
      } else {
        task.time.left = task.time.needed - newTaskTracker.count
      }

      task.time.losingStreak = losingStreak
      task.time.resetDates = newTaskTracker.resetDates
      taskCompletionMap.set(task.id, newTaskTracker);
    }
  }

  return updatedPowerLists;
};

export default calculateHabitCompletion;
