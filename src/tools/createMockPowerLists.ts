import PowerListDB from '@/backend/powerList';
import StandardsDB from '@/backend/standards';
import { createPowerList, createEmptyTask, calculateWinLoss } from '@/logic/powerList';
import { createEmptyStandardTask } from '@/logic/standards';
import { Task } from '@/types/powerList';
import { StandardTask } from '@/types/standards';

const NUM_POWER_LISTS = 30
const DATE_OFFSET = 0

const createMockTasks = (): Task[] => {
  return Array.from({ length: 5 }, () => {
    const task = createEmptyTask();
    task.text = 'power list item';
    task.description = 'a description'
    task.completed = true
    return task;
  });
};

const createMockStandardTasks = (dateString: string): StandardTask[] => {
  return Array.from({ length: 2 }, () => {
    const task = createEmptyStandardTask(dateString);
    task.text = 'standard item';
    task.completed = true
    return task;
  });
};

const getDateOffset = (today: string, offset: number): string => {
  const date = new Date(today);
  date.setDate(date.getDate() - offset);
  return date.toLocaleDateString();
};

const initializeLastViewedDate = async (today: string): Promise<void> => {
  const lastViewedDate = new Date(today);
  lastViewedDate.setDate(lastViewedDate.getDate() - DATE_OFFSET);
  await PowerListDB.updateLastViewedDate(lastViewedDate.toLocaleDateString());
};

const createMockPowerLists = async (today: string) => {
  await PowerListDB.clearAllData();
  await StandardsDB.clearAllData();

  await initializeLastViewedDate(today);

  const tasks = createMockTasks();

  for (let i = DATE_OFFSET; i < NUM_POWER_LISTS; i++) {
    const dateString = getDateOffset(today, i);

    const powerList = createPowerList(dateString, tasks);
    const { isWin, isLoss } = calculateWinLoss(powerList)

    powerList.isComplete = true;
    powerList.isWin = isWin,
    powerList.isLoss = isLoss

    const standardTasks = createMockStandardTasks(dateString);

    await PowerListDB.saveList(powerList);
    await StandardsDB.saveList(standardTasks);
  }
};

export default createMockPowerLists;
