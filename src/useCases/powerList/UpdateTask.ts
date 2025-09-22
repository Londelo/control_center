import { Task, TaskList } from '@/types/powerList';
import { updateTaskListStatus } from '@/logic/powerList'

type UpdateTaskArgs = {
  currentTaskList: TaskList | null;
  setCurrentTaskList: (taskList: TaskList) => void;
};

const UpdateTask = ({ currentTaskList, setCurrentTaskList }: UpdateTaskArgs) =>
  (taskId: string, text: string ) => {
    if (!currentTaskList) return;

    const updatedTasks = currentTaskList.tasks.map((task: Task) =>
      task.id === taskId ? { ...task, text } : task
    );

    const updatedList = updateTaskListStatus({
      ...currentTaskList,
      tasks: updatedTasks,
    });

    setCurrentTaskList(updatedList);
  };

export default UpdateTask;
