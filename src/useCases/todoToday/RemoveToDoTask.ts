import { ToDoList } from '@/types/todoToday';

type RemoveToDoTaskArgs = {
  currentToDoTasks: ToDoList;
  setCurrentToDoTasks: (todoList: ToDoList) => void;
};

const RemoveToDoTask = ({ currentToDoTasks, setCurrentToDoTasks }: RemoveToDoTaskArgs) => (taskId: string) => {
  const updatedTasks = currentToDoTasks.tasks.filter((task) => task.id !== taskId);
  setCurrentToDoTasks({ ...currentToDoTasks, tasks: updatedTasks });
};

export default RemoveToDoTask;
