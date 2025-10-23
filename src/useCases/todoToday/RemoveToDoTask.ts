import { ToDoList } from '@/types/todoToday';

type RemoveToDoTaskArgs = {
  currentToDoTasks: ToDoList;
  setCurrentToDoTasks: (todoList: ToDoList) => void;
};

const RemoveToDoTask = ({ currentToDoTasks, setCurrentToDoTasks }: RemoveToDoTaskArgs) => (taskIndex: number) => {
  const updatedTasks = currentToDoTasks.tasks.filter((_, index) => index !== taskIndex);
  setCurrentToDoTasks({ ...currentToDoTasks, tasks: updatedTasks });
};

export default RemoveToDoTask;
