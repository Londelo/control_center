import { ToDoList } from '@/types/todoToday';

type UpdateToDoTaskArgs = {
  currentToDoTasks: ToDoList;
  setCurrentToDoTasks: (todoList: ToDoList) => void;
};

const UpdateToDoTask = ({ currentToDoTasks, setCurrentToDoTasks }: UpdateToDoTaskArgs) => (taskId: string, text: string) => {
  const updatedTasks = currentToDoTasks.tasks.map((task) =>
    task.id === taskId ? { ...task, text } : task
  );
  setCurrentToDoTasks({ ...currentToDoTasks, tasks: updatedTasks });
};

export default UpdateToDoTask;
