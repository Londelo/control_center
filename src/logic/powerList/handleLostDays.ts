import { PowerLists } from '@/types/powerList';
import PowerListDB from '@/backend/powerList';

export type HandleLostDays = {
  today: string;
  allPowerLists: PowerLists
};


const handleLostDays = async ({
  today,
  allPowerLists
}: HandleLostDays) => {
  const updatedPowerLists: PowerLists = { ...allPowerLists };

  for (const date in allPowerLists) {
    const powerList = allPowerLists[date];
    // Only process past dates (not today) that are not wins and not already marked as losses
    if (date !== today && !powerList.isWin && !powerList.isLoss) {
      const updatedPowerList = {
        ...powerList,
        isLoss: true,
        isComplete: true,
        updatedAt: new Date().toISOString(),
      };
      await PowerListDB.saveList(updatedPowerList);
      updatedPowerLists[date] = updatedPowerList;
    }
  }

  return updatedPowerLists;
};

export default handleLostDays;
