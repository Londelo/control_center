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
    const { tasks: recentTasks, standardTasks: recentStandardTasks } = getMostRecentTasks(allPowerLists);
    powerList = createPowerList(
      today,
      recentTasks.map(task => ({ ...task, completed: false })),
      recentStandardTasks.map(task => ({ ...task, completed: false }))
    );
    await PowerListDB.saveList(powerList);
    return powerList
  }

  return powerList
};

export default getTodaysPowerList;
