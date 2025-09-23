import { createPowerList, getMostRecentTasks, isPowerListComplete, normalizePowerList } from '@/logic/powerList';
import db from '@/logic/powerList/db';
import { PowerList } from '@/types/powerList';

type LoadPowerListForDateArgs = {
  setIsLoading: (isLoading: boolean) => void;
  setCurrentPowerList: (PowerList: PowerList) => void;
  setIsEditing: (isEditing: boolean) => void;
  today: string;
};

const LoadPowerListForDate = ({
  setIsLoading,
  setCurrentPowerList,
  setIsEditing,
  today,
}: LoadPowerListForDateArgs) => async (date: string) => {
  setIsLoading(true);
  let PowerList = db.getTasksByDate(date);

  if (!PowerList) {
    if (date === today) {
      const allTasks = db.getAllTaskHistory();
      const { tasks: recentTasks, sideTasks: recentSideTasks } = getMostRecentTasks(allTasks);
      PowerList = createPowerList(date, recentTasks, recentSideTasks);
      db.saveTasksForDate(date, PowerList);
    } else {
      PowerList = createPowerList(date);
    }
  }
  setCurrentPowerList(PowerList);
  setIsEditing(!isPowerListComplete(PowerList));
  setIsLoading(false);};

export default LoadPowerListForDate;
