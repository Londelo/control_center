import { PowerLists } from '@/types/powerList';

export type CalculateHabitCompletion = {
  allPowerLists: PowerLists
};

const calculateHabitCompletion = ({allPowerLists}:CalculateHabitCompletion): PowerLists => {
  // Track completion count for each unique task text
  const taskCompletionMap = new Map<string, number>();
  const updatedPowerLists: PowerLists = {...allPowerLists};

  // Sort dates to process PowerLists chronologically
  const sortedDates = Object.keys(updatedPowerLists).sort((a, b) =>
    new Date(a).getTime() - new Date(b).getTime()
  );

  // First pass: count completions for each task text
  for (const date of sortedDates) {
    const powerList = updatedPowerLists[date];

    for (const task of powerList.tasks) {
      if (task.text.trim() && task.completed) {
        const currentCount = taskCompletionMap.get(task.id) || 0;
        taskCompletionMap.set(task.id, currentCount + 1);
      }

      task.time.left = task.time.needed - ( taskCompletionMap.get(task.id) || 0 )
    }
  }

  return updatedPowerLists;
};

export default calculateHabitCompletion;
