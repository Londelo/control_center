import { createPowerList, getMostRecentTasks, isPowerListComplete } from '@/logic/powerList';
import db from '@/logic/powerList/db';
import { PowerList, PowerLists } from '@/types/powerList';

type LoadPowerListForDateArgs = {
  setIsLoading: (isLoading: boolean) => void;
  setCurrentPowerList: (PowerList: PowerList) => void;
  setIsEditing: (isEditing: boolean) => void;
  setPowerLists: (allPowerLists: PowerLists) => void;
  today: string;
};

const LoadPowerListForDate = ({
  setIsLoading,
  setCurrentPowerList,
  setIsEditing,
  setPowerLists,
  today,
}: LoadPowerListForDateArgs) => async (date: string) => {
  setIsLoading(true);
  let powerList = db.getTasksByDate(date);
  const allPowerLists = db.getAllPowerLists();

  if (!powerList) {
    if (date === today) {
      const { tasks: recentTasks, sideTasks: recentSideTasks } = getMostRecentTasks(allPowerLists);
      powerList = createPowerList(date, recentTasks, recentSideTasks);
      db.saveTasksForDate(date, powerList);
    } else {
      powerList = createPowerList(date);
    }
  }
  setCurrentPowerList(powerList);
  setPowerLists(allPowerLists)
  setIsEditing(!isPowerListComplete(powerList));
  setIsLoading(false);};

export default LoadPowerListForDate;
