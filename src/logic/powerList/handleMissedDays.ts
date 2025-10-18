import PowerListDB from '@/backend/powerList';
import { getMostRecentTasks, createPowerList } from '@/logic/powerList';
import { PowerLists } from '@/types/powerList';

export type HandleMissedDays = {
  today: string;
  allPowerLists: PowerLists
};

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


const handleMissedDays = async ({
  today,
  allPowerLists
}: HandleMissedDays) => {
  const lastViewedDate = PowerListDB.getLastViewedDate();
  let updatedPowerLists: PowerLists = { ...allPowerLists };

  if (lastViewedDate && lastViewedDate !== today) {
    const missedDays = generateMissedDays(lastViewedDate, today);
    for (const missedDay of missedDays) {
      const recentTasks = getMostRecentTasks(allPowerLists);
      const missedList = createPowerList(
        missedDay,
        recentTasks.map(task => ({ ...task, completed: false }))
      );
      missedList.isLoss = true;
      missedList.isComplete = true;
      await PowerListDB.saveList(missedList);
      updatedPowerLists[missedDay] = missedList;
    }
  }

  return updatedPowerLists;
};

export default handleMissedDays
