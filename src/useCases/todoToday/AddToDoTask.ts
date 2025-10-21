import { createEmptyToDoTask } from '@/logic/todoToday';
import { ToDoTask } from '@/types/todoToday';

type AddToDoTaskArgs = {
  currentDate: string;
  currentToDoTasks: ToDoTask[];
  setCurrentToDoTasks: (tasks: ToDoTask[]) => void;
};

const AddToDoTask = ({ currentDate, currentToDoTasks, setCurrentToDoTasks }: AddToDoTaskArgs) => () => {
  const newTask = createEmptyToDoTask(currentDate);
  const updatedTasks = [...currentToDoTasks, newTask];
  setCurrentToDoTasks(updatedTasks);
};

export default AddToDoTask;
