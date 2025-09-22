import { Task, TaskList } from '@/types/powerList';

type AddSideTaskArgs = {
  currentTaskList: TaskList | null;
  setCurrentTaskList: (taskList: TaskList) => void;
  createEmptyTask: (index: number) => Task;
  updateTaskListStatus: (taskList: TaskList) => TaskList;
};

const AddSideTask = ({ currentTaskList, setCurrentTaskList, createEmptyTask, updateTaskListStatus }: AddSideTaskArgs) => () => {
  if (!currentTaskList) return;

  const newTask = createEmptyTask(currentTaskList.sideTasks.length);
  const updatedSideTasks = [...currentTaskList.sideTasks, newTask];

  const updatedList = updateTaskListStatus({
    ...currentTaskList,
    sideTasks: updatedSideTasks,
  });

  setCurrentTaskList(updatedList);
};

export default AddSideTask;
