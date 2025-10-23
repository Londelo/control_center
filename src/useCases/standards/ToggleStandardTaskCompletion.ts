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
}: ToggleStandardTaskCompletionArgs) => (taskIndex: number) => {
  if (isEditing) return;

  const updatedTasks = currentStandardTasks.tasks.map((task, index) =>
    index === taskIndex ? { ...task, completed: !task.completed } : task
  );

  setCurrentStandardTasks({ ...currentStandardTasks, tasks: updatedTasks });
};

export default ToggleStandardTaskCompletion;
