import { createPowerList, createEmptyTask, createEmptyStandardTask } from '@/logic/powerList';
import db from '@/logic/powerList/db';

const createMockPowerLists = (today: string) => {
  // Clear all existing data
  db.clearAllData();

  db.updateLastViewedDate(today)

  // Create tasks with "power list item" text
  const tasks = Array.from({ length: 5 }, () => {
    const task = createEmptyTask();
    task.text = 'power list item';
    return task;
  });

  // Create standard tasks with "standard item" text
  const standardTasks = Array.from({ length: 2 }, () => {
    const task = createEmptyStandardTask();
    task.text = 'standard item';
    return task;
  });

  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateString = date.toLocaleDateString();

    // Create the PowerList
    const powerList = createPowerList(dateString, tasks, standardTasks);
    powerList.isComplete = true;

    // Save to database
    db.saveTasksForDate(dateString, powerList);
  }
};

export default createMockPowerLists;
