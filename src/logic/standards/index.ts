import { StandardTask, Standards } from '@/types/standards';
import { v4 } from 'uuid';

export function createEmptyStandardTask(date: string): StandardTask {
  return {
    id: v4(),
    date,
    text: '',
    completed: false
  };
}

export function normalizeStandardsList(_date: string, standardTasks?: StandardTask[]): StandardTask[] {
  return standardTasks || [];
}

export function getMostRecentStandardTasks(allStandards: Standards): StandardTask[] {
  const dates = Object.keys(allStandards).sort().reverse();

  for (const date of dates) {
    const standardTasks = allStandards[date];
    if (standardTasks && standardTasks.length > 0) {
      const hasCompleteData = standardTasks.every(task => task.text.trim() !== '');
      if (hasCompleteData) {
        return standardTasks.map(task => ({
          ...task,
          id: v4(),
          completed: false
        }));
      }
    }
  }

  return [];
}

export function createStandardsList(date: string, standardTasks?: StandardTask[]): StandardTask[] {
  const defaultStandardTasks = standardTasks || [];
  return defaultStandardTasks.map(task => ({
    ...task,
    date,
    completed: false
  }));
}
