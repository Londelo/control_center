import db from '@/logic/powerList/db';
import { getMostRecentTasks, createPowerList } from '@/logic/powerList';
import { PowerLists } from '@/types/powerList';

export function generateMissedDays(lastDate: string, currentDate: string): string[] {
  const missed: string[] = [];
  const start = new Date(lastDate);
  const end = new Date(currentDate);

  start.setDate(start.getDate() + 1); // Start from day after last date

  while (start < end) {
    missed.push(start.toLocaleDateString());
    start.setDate(start.getDate() + 1);
  }

  return missed;
}

const HandleMissedDays = (allPowerLists: PowerLists) => (today: string) => {
  const lastViewedDate = db.getLastViewedDate();

  if (lastViewedDate && lastViewedDate !== today) {
    const missedDays = generateMissedDays(lastViewedDate, today)
    for (const missedDay of missedDays) {
      const { tasks: recentTasks, standardTasks: recentStandardTasks } = getMostRecentTasks(allPowerLists);
      const missedList = createPowerList(missedDay, recentTasks, recentStandardTasks);
      missedList.isLoss = true;
      missedList.isComplete = true;
      db.saveTasksForDate(missedDay, missedList);
    }
  }
};

export default HandleMissedDays
