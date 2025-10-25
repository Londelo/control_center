import { createEmptyToDoTask } from '@/logic/todoToday';
import { ToDoList } from '@/types/todoToday';

type AddToDoTaskArgs = {
  currentToDoTasks: ToDoList;
  setCurrentToDoTasks: (todoList: ToDoList) => void;
};

const AddToDoTask = ({ currentToDoTasks, setCurrentToDoTasks }: AddToDoTaskArgs) => () => {
  const newTask = createEmptyToDoTask();
  const updatedTasks = [...currentToDoTasks.tasks, newTask];
  setCurrentToDoTasks({ ...currentToDoTasks, tasks: updatedTasks });
};

export default AddToDoTask;
