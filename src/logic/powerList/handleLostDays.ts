import { PowerLists } from '@/types/powerList';
import db from '@/logic/powerList/db';

export type HandleLostDays = {
  today: string;
  allPowerLists: PowerLists
};


const handleLostDays = ({
  today,
  allPowerLists
}: HandleLostDays) => {
  const updatedPowerLists: PowerLists = { ...allPowerLists };

  Object.entries(allPowerLists).forEach(([date, powerList]) => {
    // Only process past dates (not today) that are not wins and not already marked as losses
    if (date !== today && !powerList.isWin && !powerList.isLoss) {
      const updatedPowerList = {
        ...powerList,
        isLoss: true,
        isComplete: true,
        updatedAt: new Date().toISOString(),
      };
      db.saveTasksForDate(date, updatedPowerList);
      updatedPowerLists[date] = updatedPowerList;
    }
  });

  return updatedPowerLists;
};

export default handleLostDays;
