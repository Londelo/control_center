import StandardsDB from '@/backend/standards';
import { getMostRecentStandardTasks, createStandard } from '@/logic/standards';
import { Standards } from '@/types/standards';
import PowerListDB from '@/backend/powerList';

export type HandleMissedStandardsDays = {
  today: string;
  allStandards: Standards
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
}: HandleMissedStandardsDays): Promise<Standards> => {
  const lastViewedDate = PowerListDB.getLastViewedDate();
  let updatedStandards: Standards = { ...allStandards };

  if (lastViewedDate && lastViewedDate !== today) {
    const missedDays = generateMissedDays(lastViewedDate, today);
    for (const missedDay of missedDays) {
      const recentStandardTasks = getMostRecentStandardTasks(allStandards);
      const missedStandard = createStandard(missedDay, recentStandardTasks);
      await StandardsDB.save(missedStandard);
      updatedStandards[missedDay] = missedStandard;
    }
  }

  return updatedStandards;
};

export default handleMissedStandardsDays;
