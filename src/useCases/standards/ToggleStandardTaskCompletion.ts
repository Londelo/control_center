import { StandardTask } from '@/types/standards';
import StandardsDB from '@/backend/standards';

type ToggleStandardTaskCompletionArgs = {
  currentDate: string;
  currentStandardTasks: StandardTask[];
  setCurrentStandardTasks: (tasks: StandardTask[]) => void;
  isEditing: boolean;
};

const ToggleStandardTaskCompletion = ({
  currentDate,
  currentStandardTasks,
  setCurrentStandardTasks,
  isEditing
}: ToggleStandardTaskCompletionArgs) => async (taskId: string) => {
  if (isEditing) return;

  const updatedTasks = currentStandardTasks.map(task =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );

  setCurrentStandardTasks(updatedTasks);
  await StandardsDB.saveList(currentDate, updatedTasks);
};

export default ToggleStandardTaskCompletion;
