import { createPowerList, getMostRecentTasks, isPowerListComplete } from '@/logic/powerList';
import db from '@/logic/powerList/db';
import { PowerList, PowerLists } from '@/types/powerList';

export type LoadPowerListForDateArgs = {
  setCurrentPowerList: (PowerList: PowerList) => void;
  setIsEditing: (isEditing: boolean) => void;
  today: string;
  allPowerLists: PowerLists
};

const LoadPowerListForDate = ({
  setCurrentPowerList,
  setIsEditing,
  today,
  allPowerLists
}: LoadPowerListForDateArgs) => async (date: string) => {
  let powerList = allPowerLists[date]

  if (!powerList) {
    if (date === today) {
      const { tasks: recentTasks, standardTasks: recentStandardTasks } = getMostRecentTasks(allPowerLists);
      powerList = createPowerList(date, recentTasks, recentStandardTasks);
      db.saveTasksForDate(date, powerList);
    } else {
      powerList = createPowerList(date);
    }
  }

  setCurrentPowerList(powerList);
  setIsEditing(!isPowerListComplete(powerList));
};

export default LoadPowerListForDate;
