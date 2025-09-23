import { PowerList } from '@/types/powerList';
import { updatePowerListStatus } from '@/logic/powerList';
import db from '@/logic/powerList/db';

type ToggleTaskCompletionArgs = {
  currentPowerList: PowerList | null;
  isEditing: boolean;
  currentDate: string;
  setCurrentPowerList: (powerList: PowerList) => void;
};

const ToggleTaskCompletion = ({
  currentPowerList,
  isEditing,
  currentDate,
  setCurrentPowerList
}: ToggleTaskCompletionArgs) => (taskId: string) => {
  if (!currentPowerList || isEditing) return;

  const task =
    currentPowerList.tasks.find(t => t.id === taskId) ||
    currentPowerList.sideTasks.find(t => t.id === taskId);
  if (!task) return;

  const newCompletedStatus = !task.completed;

  // Update in backend
  db.updateTaskStatus(currentDate, taskId, newCompletedStatus);

  // Update local state for both task lists
  const updatedTasks = currentPowerList.tasks.map(t =>
    t.id === taskId ? { ...t, completed: newCompletedStatus } : t
  );

  const updatedSideTasks = currentPowerList.sideTasks.map(t =>
    t.id === taskId ? { ...t, completed: newCompletedStatus } : t
  );

  const updatedList = updatePowerListStatus({
    ...currentPowerList,
    tasks: updatedTasks,
    sideTasks: updatedSideTasks,
  });

  setCurrentPowerList(updatedList);
};

export default ToggleTaskCompletion;
