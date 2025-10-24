import { Standard } from '@/types/standards';

type ToggleStandardTaskCompletionArgs = {
  currentStandardTasks: Standard;
  setCurrentStandardTasks: (standard: Standard) => void;
  isEditing: boolean;
};

const ToggleStandardTaskCompletion = ({
  currentStandardTasks,
  setCurrentStandardTasks,
  isEditing
}: ToggleStandardTaskCompletionArgs) => (taskId: string) => {
  if (isEditing) return;

  const updatedTasks = currentStandardTasks.tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );

  setCurrentStandardTasks({ ...currentStandardTasks, tasks: updatedTasks });
};

export default ToggleStandardTaskCompletion;
