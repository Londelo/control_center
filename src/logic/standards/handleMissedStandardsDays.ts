import StandardsDB from '@/backend/standards';
import { getMostRecentStandardTasks, createStandardsList } from '@/logic/standards';
import { Standard, StandardTask } from '@/types/standards';
import PowerListDB from '@/backend/powerList';

export type HandleMissedStandardsDays = {
  today: string;
  allStandards: Standard
};

export function generateMissedDays(lastDate: string, currentDate: string): string[] {
  const missed: string[] = [];
  const start = new Date(lastDate);
  const end = new Date(currentDate);

  start.setDate(start.getDate() + 1);

  while (start < end) {
    missed.push(start.toLocaleDateString());
    start.setDate(start.getDate() + 1);
  }

  return missed;
}

const handleMissedStandardsDays = async ({
  today,
  allStandards
}: HandleMissedStandardsDays): Promise<Standard> => {
  const lastViewedDate = PowerListDB.getLastViewedDate();
  let updatedStandards: Standard = { ...allStandards };

  if (lastViewedDate && lastViewedDate !== today) {
    const missedDays = generateMissedDays(lastViewedDate, today);
    for (const missedDay of missedDays) {
      const recentStandardTasks = getMostRecentStandardTasks(allStandards);
      const missedList: StandardTask[] = createStandardsList(
        missedDay,
        recentStandardTasks.map(task => ({ ...task, date: missedDay, completed: false }))
      );
      await StandardsDB.saveList( missedList);
      updatedStandards[missedDay] = missedList;
    }
  }

  return updatedStandards;
};

export default handleMissedStandardsDays;
