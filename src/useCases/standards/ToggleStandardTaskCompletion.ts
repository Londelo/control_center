import { Standard } from '@/types/standards';
import StandardsDB from '@/backend/standards';

type ToggleStandardTaskCompletionArgs = {
  currentStandardTasks: Standard;
  isEditing: boolean;
  updateStandardState: (standard: Standard) => void;
};

const ToggleStandardTaskCompletion = ({
  currentStandardTasks,
  isEditing,
  updateStandardState
}: ToggleStandardTaskCompletionArgs) => async (taskId: string) => {
  if (isEditing) return;

  const updatedTasks = currentStandardTasks.tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );

  const updatedStandard = { ...currentStandardTasks, tasks: updatedTasks }

  await StandardsDB.save(updatedStandard)
  updateStandardState(updatedStandard)
};

export default ToggleStandardTaskCompletion;
