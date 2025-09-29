import { createPowerList, getMostRecentTasks } from '@/logic/powerList';
import db from '@/logic/powerList/db';
import { PowerLists } from '@/types/powerList';

export type GetTodaysPowerList = {
  today: string;
  allPowerLists: PowerLists
};

const getTodaysPowerList = ({
  today,
  allPowerLists
}: GetTodaysPowerList) => {
  let powerList = allPowerLists[today]

  if (!powerList) {
    const { tasks: recentTasks, standardTasks: recentStandardTasks } = getMostRecentTasks(allPowerLists);
    powerList = createPowerList(today, recentTasks, recentStandardTasks);
    db.saveTasksForDate(today, powerList);
    return powerList
  }

  return powerList
};

export default getTodaysPowerList;
