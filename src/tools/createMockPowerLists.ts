import PowerListDB from '@/backend/powerList';
import StandardsDB from '@/backend/standards';
import { createPowerList, createEmptyTask, calculateWinLoss } from '@/logic/powerList';
import { createStandard } from '@/logic/standards';
import { Task } from '@/types/powerList';
import { StandardTask } from '@/types/standards';
import { v4 } from 'uuid';

const NUM_POWER_LISTS = 30
const DATE_OFFSET = 0

const createMockTasks = (): Task[] => {
  return Array.from({ length: 3 }, () => {
    const task = createEmptyTask();
    task.text = 'power list item';
    task.description = 'a description'
    task.completed = true
    return task;
  });
};

const createMockStandardTasks = (): StandardTask[] => {
  return Array.from({ length: 2 }, () => {
    return {
      id: v4(),
      text: 'standard item',
      completed: true
    };
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

    const mockTasks = createMockStandardTasks();
    const standard = createStandard(dateString, mockTasks);

    await PowerListDB.save(powerList);
    await StandardsDB.save(standard);
  }
};

export default createMockPowerLists;
