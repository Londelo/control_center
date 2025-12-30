import { StandardTask, Standards, Standard } from '@/types/standards';
import { sortDateDescending } from '@/utils/dates';
import { v4 } from 'uuid';

export function createEmptyStandardTask(): StandardTask {
  return {
    id: v4(),
    text: '',
    completed: false
  };
}

export function getMostRecentStandardTasks(allStandards: Standards): StandardTask[] {
  const dates = sortDateDescending(Object.keys(allStandards));

  for (const date of dates) {
    const standard = allStandards[date];
    if (standard?.tasks && standard.tasks.length > 0) {
      const hasCompleteData = standard.tasks.every(task => task.text.trim() !== '');
      if (hasCompleteData) {
        return standard.tasks.map(task => ({
          id: v4(),
          text: task.text,
          completed: false
        }));
      }
    }
  }

  return [];
}

export function createStandard(date: string, tasks?: StandardTask[]): Standard {
  const defaultTasks = tasks || [];
  return {
    id: v4(),
    date,
    tasks: defaultTasks.map(task => ({
      id: task.id || v4(),
      text: task.text,
      completed: false
    }))
  };
}
