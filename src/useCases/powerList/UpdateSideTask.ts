import { TaskList } from '@/types/powerList';
import { updateTaskListStatus } from '@/logic/powerList'

type UpdateSideTaskArgs = {
  currentTaskList: TaskList | null;
  setCurrentTaskList: (taskList: TaskList) => void;
};

const UpdateSideTask = ({ currentTaskList, setCurrentTaskList }: UpdateSideTaskArgs) =>
  ( taskId: string, text: string ) => {
    if (!currentTaskList) return;
    const updatedSideTasks = currentTaskList.sideTasks.map(task =>
      task.id === taskId ? { ...task, text } : task
    );
    const updatedList = updateTaskListStatus({
      ...currentTaskList,
      sideTasks: updatedSideTasks,
    });
    setCurrentTaskList(updatedList);
  };

export default UpdateSideTask;
