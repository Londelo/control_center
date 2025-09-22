import { Task, TaskList } from '@/types/powerList';

type UpdateTaskArgs = {
  currentTaskList: TaskList | null;
  setCurrentTaskList: (taskList: TaskList) => void;
  updateTaskListStatus: (taskList: TaskList) => TaskList;
};

const UpdateTask = ({ currentTaskList, setCurrentTaskList, updateTaskListStatus }: UpdateTaskArgs) =>
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
