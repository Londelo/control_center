import { updateTaskListStatus } from '@/logic/powerList';
import powerList from '@/controllers/powerList';
import { TaskList } from '@/types/powerList';

type SaveTaskListArgs = {
  currentTaskList: TaskList | null;
  currentDate: string;
  today: string;
  setCurrentTaskList: (taskList: TaskList) => void;
  setIsEditing: (isEditing: boolean) => void;
};

const SaveTaskList = ({
  currentTaskList,
  currentDate,
  today,
  setCurrentTaskList,
  setIsEditing,
}: SaveTaskListArgs) => () => {
  if (!currentTaskList) return;

  const updatedList = updateTaskListStatus(currentTaskList, currentDate === today);
  setCurrentTaskList(updatedList);
  powerList.saveTasksForDate(currentDate, updatedList);
  setIsEditing(false);
};

export default SaveTaskList;
