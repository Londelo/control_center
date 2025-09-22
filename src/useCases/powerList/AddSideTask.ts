import { createEmptyTask, updateTaskListStatus } from '@/logic/powerList';
import { TaskList } from '@/types/powerList';

type AddSideTaskArgs = {
  currentTaskList: TaskList | null;
  setCurrentTaskList: (taskList: TaskList) => void;
};

const AddSideTask = ({ currentTaskList, setCurrentTaskList }: AddSideTaskArgs) => () => {
  if (!currentTaskList) return;

  const newTask = createEmptyTask();
  const updatedSideTasks = [...currentTaskList.sideTasks, newTask];

  const updatedList = updateTaskListStatus({
    ...currentTaskList,
    sideTasks: updatedSideTasks,
  });

  setCurrentTaskList(updatedList);
};

export default AddSideTask;
