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
}: ToggleToDoTaskCompletionArgs) => (taskId: string) => {
  if (isEditing) return;

  const updatedTasks = currentToDoTasks.tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  setCurrentToDoTasks({ ...currentToDoTasks, tasks: updatedTasks });
};

export default ToggleToDoTaskCompletion;
