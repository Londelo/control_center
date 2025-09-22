import { TaskList } from '@/types/powerList';

type SaveTaskListArgs = {
  currentTaskList: TaskList | null;
  currentDate: string;
  today: string;
  setCurrentTaskList: (taskList: TaskList) => void;
  updateTaskListStatus: (taskList: TaskList, isToday: boolean) => TaskList;
  saveTasksForDate: (date: string, taskList: TaskList) => void;
  setIsEditing: (isEditing: boolean) => void;
};

const SaveTaskList = ({
  currentTaskList,
  currentDate,
  today,
  setCurrentTaskList,
  updateTaskListStatus,
  saveTasksForDate,
  setIsEditing,
}: SaveTaskListArgs) => () => {
  if (!currentTaskList) return;

  const updatedList = updateTaskListStatus(currentTaskList, currentDate === today);
  setCurrentTaskList(updatedList);
  saveTasksForDate(currentDate, updatedList);
  setIsEditing(false);
};

export default SaveTaskList;
