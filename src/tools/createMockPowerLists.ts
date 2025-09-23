import { createPowerList, createEmptyTask } from '@/logic/powerList';
import db from '@/logic/powerList/db';

const createMockPowerLists = (today: string) => {
  // Clear all existing data
  db.clearAllData();

  // Create 5 PowerLists starting from today
  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateString = date.toLocaleDateString();

    // Create tasks with "power list item" text
    const tasks = Array.from({ length: 5 }, () => {
      const task = createEmptyTask();
      task.text = 'power list item';
      return task;
    });

    // Create side tasks with "side item" text
    const sideTasks = Array.from({ length: 2 }, () => {
      const task = createEmptyTask();
      task.text = 'side item';
      return task;
    });

    // Create the PowerList
    const powerList = createPowerList(dateString, tasks, sideTasks);
    powerList.isComplete = true;

    // Save to database
    db.saveTasksForDate(dateString, powerList);
  }
};

export default createMockPowerLists;
