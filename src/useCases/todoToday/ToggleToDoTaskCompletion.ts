import { ToDoList } from '@/types/todoToday';

type ToggleToDoTaskCompletionArgs = {
  currentToDoTasks: ToDoList;
  setCurrentToDoTasks: (todoList: ToDoList) => void;
  isEditing: boolean;
};

const ToggleToDoTaskCompletion = ({
  currentToDoTasks,
  setCurrentToDoTasks,
  isEditing
}: ToggleToDoTaskCompletionArgs) => (taskIndex: number) => {
  if (isEditing) return;

  const updatedTasks = currentToDoTasks.tasks.map((task, index) =>
    index === taskIndex ? { ...task, completed: !task.completed } : task
  );
  setCurrentToDoTasks({ ...currentToDoTasks, tasks: updatedTasks });
};

export default ToggleToDoTaskCompletion;
