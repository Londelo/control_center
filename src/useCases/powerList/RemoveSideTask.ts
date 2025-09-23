import { updateTaskListStatus } from '@/logic/powerList';
import { TaskList } from '@/types/powerList';

type RemoveSideTaskArgs = {
  currentTaskList: TaskList | null;
  setCurrentTaskList: (taskList: TaskList) => void;
};

const RemoveSideTask = ({ currentTaskList, setCurrentTaskList }: RemoveSideTaskArgs) =>
  (taskId: string) => {

    if (!currentTaskList) return;

    const updatedSideTasks = currentTaskList.sideTasks.filter(task => task.id !== taskId);

    const updatedList = updateTaskListStatus({
      ...currentTaskList,
      sideTasks: updatedSideTasks,
    });

    setCurrentTaskList(updatedList);
  };

export default RemoveSideTask;
