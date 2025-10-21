import { ToDoTask } from '@/types/todoToday';
import ToDoTodayDB from '@/backend/todoToday';

type RemoveToDoTaskArgs = {
  currentToDoTasks: ToDoTask[];
  setCurrentToDoTasks: (tasks: ToDoTask[]) => void;
};

const RemoveToDoTask = ({ currentToDoTasks, setCurrentToDoTasks }: RemoveToDoTaskArgs) => async (taskId: string) => {
  const updatedTasks = currentToDoTasks.filter(task => task.id !== taskId);
  setCurrentToDoTasks(updatedTasks);
  await ToDoTodayDB.removeToDoTask(taskId);
};

export default RemoveToDoTask;
