import { createPowerList, createEmptyTask, createEmptyStandardTask, calculateWinLoss } from '@/logic/powerList';
import db from '@/logic/powerList/db';
// import { tasks, standardTasks } from './defaultTasks'

const NUM_POWER_LISTS = 30

const createMockPowerLists = (today: string) => {
  // Clear all existing data
  db.clearAllData();

  db.updateLastViewedDate(today)

  // Create tasks with "power list item" text
  const tasks = Array.from({ length: 5 }, () => {
    const task = createEmptyTask();
    task.text = 'power list item';
    task.completed = true
    return task;
  });

  // Create standard tasks with "standard item" text
  const standardTasks = Array.from({ length: 2 }, () => {
    const task = createEmptyStandardTask();
    task.text = 'standard item';
    task.completed = true
    return task;
  });

  for (let i = 0; i < NUM_POWER_LISTS; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateString = date.toLocaleDateString();

    // Create the PowerList
    const powerList = createPowerList(dateString, tasks, standardTasks);
    const { isWin, isLoss } = calculateWinLoss(powerList)

    powerList.isComplete = true;
    powerList.isWin = isWin,
    powerList.isLoss = isLoss

    // Save to database
    db.saveTasksForDate(dateString, powerList);
  }
};

export default createMockPowerLists;
