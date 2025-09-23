import { createTaskList, getMostRecentTasks, isTaskListComplete, normalizeTaskList } from '@/logic/powerList';
import db from '@/logic/powerList/db';
import { TaskList } from '@/types/powerList';

type LoadTaskListForDateArgs = {
  setIsLoading: (isLoading: boolean) => void;
  setCurrentTaskList: (taskList: TaskList) => void;
  setIsEditing: (isEditing: boolean) => void;
  today: string;
};

const LoadTaskListForDate = ({
  setIsLoading,
  setCurrentTaskList,
  setIsEditing,
  today,
}: LoadTaskListForDateArgs) => async (date: string) => {
  setIsLoading(true);
  try {
    let taskList = db.getTasksByDate(date);
    if (!taskList) {
      if (date === today) {
        const allTasks = db.getAllTaskHistory();
        const { tasks: recentTasks, sideTasks: recentSideTasks } = getMostRecentTasks(allTasks);
        taskList = createTaskList(date, recentTasks, recentSideTasks);
        db.saveTasksForDate(date, taskList);
      } else {
        taskList = createTaskList(date);
      }
    } else {
      taskList = normalizeTaskList(taskList);
    }
    setCurrentTaskList(taskList);
    setIsEditing(!isTaskListComplete(taskList));
  } catch (error) {
    console.error('Error initializing app:', error);
    const fallbackList = createTaskList(date);
    setCurrentTaskList(fallbackList);
    setIsEditing(true);
  } finally {
    setIsLoading(false);
  }
};

export default LoadTaskListForDate;
