import { createPowerList, getMostRecentTasks } from '@/logic/powerList';
import PowerListDB from '@/backend/powerList';
import { PowerLists } from '@/types/powerList';

export type GetTodaysPowerList = {
  today: string;
  allPowerLists: PowerLists
};

const getTodaysPowerList = async ({
  today,
  allPowerLists
}: GetTodaysPowerList) => {
  let powerList = allPowerLists[today]

  if (!powerList) {
    const recentTasks = getMostRecentTasks(allPowerLists);
    powerList = createPowerList(
      today,
      recentTasks.map(task => ({ ...task, completed: false }))
    );
    await PowerListDB.save(powerList);
    return powerList
  }

  return powerList
};

export default getTodaysPowerList;
