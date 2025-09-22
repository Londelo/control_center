import { TaskList } from '@/types/powerList';

type LoadTaskListForDateArgs = {
  setIsLoading: (isLoading: boolean) => void;
  setCurrentTaskList: (taskList: TaskList) => void;
  setIsEditing: (isEditing: boolean) => void;
  today: string;
  currentDate: string;
  powerList: any;
  generateMissedDays: (lastAccessDate: string, today: string) => string[];
  createTaskList: (date: string, tasks?: any[], sideTasks?: any[]) => TaskList;
  getMostRecentTasks: (allHistory: any) => { tasks: any[]; sideTasks: any[] };
  normalizeTaskList: (taskList: TaskList) => TaskList;
  isTaskListComplete: (taskList: TaskList) => boolean;
};

const LoadTaskListForDate = ({
  setIsLoading,
  setCurrentTaskList,
  setIsEditing,
  today,
  currentDate,
  powerList,
  generateMissedDays,
  createTaskList,
  getMostRecentTasks,
  normalizeTaskList,
  isTaskListComplete,
}: LoadTaskListForDateArgs) => async (date: string) => {
  setIsLoading(true);
  try {
    let taskList = powerList.getTasksByDate(date);
    if (!taskList) {
      if (date === today) {
        const lastAccessDate = powerList.getLastAccessDate();
        const allHistory = powerList.getAllTaskHistory();
        if (lastAccessDate && lastAccessDate !== today) {
          const missedDays = generateMissedDays(lastAccessDate, today);
          for (const missedDay of missedDays) {
            const missedList = createTaskList(missedDay);
            const { tasks: recentTasks } = getMostRecentTasks(allHistory);
            const hadTasks = recentTasks.some(task => task.text.trim() !== '');
            if (hadTasks) {
              missedList.tasks = recentTasks;
              missedList.isLoss = true;
              missedList.isComplete = true;
            } else {
              missedList.isLoss = false;
              missedList.isComplete = false;
            }
            powerList.saveTasksForDate(missedDay, missedList);
          }
        }
        const { tasks: recentTasks, sideTasks: recentSideTasks } = getMostRecentTasks(allHistory);
        taskList = createTaskList(date, recentTasks, recentSideTasks);
        powerList.saveTasksForDate(date, taskList);
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
