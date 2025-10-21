import { ToDoTask } from '@/types/todoToday';

type UpdateToDoTaskArgs = {
  currentToDoTasks: ToDoTask[];
  setCurrentToDoTasks: (tasks: ToDoTask[]) => void;
};

const UpdateToDoTask = ({ currentToDoTasks, setCurrentToDoTasks }: UpdateToDoTaskArgs) => (taskId: string, text: string) => {
  const updatedTasks = currentToDoTasks.map(task =>
    task.id === taskId ? { ...task, text } : task
  );
  setCurrentToDoTasks(updatedTasks);
};

export default UpdateToDoTask;
