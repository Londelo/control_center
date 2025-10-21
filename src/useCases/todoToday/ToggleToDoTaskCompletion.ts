import { ToDoTask } from '@/types/todoToday';

type ToggleToDoTaskCompletionArgs = {
  currentToDoTasks: ToDoTask[];
  setCurrentToDoTasks: (tasks: ToDoTask[]) => void;
  isEditing: boolean;
};

const ToggleToDoTaskCompletion = ({
  currentToDoTasks,
  setCurrentToDoTasks,
  isEditing
}: ToggleToDoTaskCompletionArgs) => (taskId: string) => {
  if (isEditing) return;

  const updatedTasks = currentToDoTasks.map(task =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  setCurrentToDoTasks(updatedTasks);
};

export default ToggleToDoTaskCompletion;
