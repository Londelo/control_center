import { ToDoList } from '@/types/todoToday';

type UpdateToDoTaskArgs = {
  currentToDoTasks: ToDoList;
  setCurrentToDoTasks: (todoList: ToDoList) => void;
};

const UpdateToDoTask = ({ currentToDoTasks, setCurrentToDoTasks }: UpdateToDoTaskArgs) => (taskIndex: number, text: string) => {
  const updatedTasks = currentToDoTasks.tasks.map((task, index) =>
    index === taskIndex ? { ...task, text } : task
  );
  setCurrentToDoTasks({ ...currentToDoTasks, tasks: updatedTasks });
};

export default UpdateToDoTask;
