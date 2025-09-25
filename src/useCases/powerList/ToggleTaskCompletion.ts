import { PowerList } from '@/types/powerList';
import { updatePowerListStatus } from '@/logic/powerList';
import db from '@/logic/powerList/db';

type ToggleTaskCompletionArgs = {
  currentPowerList: PowerList | null;
  isEditing: boolean;
  currentDate: string;
  today: string;
  setCurrentPowerList: (powerList: PowerList) => void;
  updatePowerListsItem: (date: string, powerList: PowerList) => void;
};

const ToggleTaskCompletion = ({
  currentPowerList,
  isEditing,
  currentDate,
  today,
  setCurrentPowerList,
  updatePowerListsItem
}: ToggleTaskCompletionArgs) => (taskId: string) => {
  if (!currentPowerList || isEditing) return;

  const task =
    currentPowerList.tasks.find(t => t.id === taskId) ||
    currentPowerList.standardTasks.find(t => t.id === taskId);
  if (!task) return;

  const newCompletedStatus = !task.completed;

  // Update local state for both task lists
  const updatedTasks = currentPowerList.tasks.map(t =>
    t.id === taskId ? { ...t, completed: newCompletedStatus } : t
  );

  const updatedStandardTasks = currentPowerList.standardTasks.map(t =>
    t.id === taskId ? { ...t, completed: newCompletedStatus } : t
  );

  const updatedList = updatePowerListStatus({
    ...currentPowerList,
    tasks: updatedTasks,
    standardTasks: updatedStandardTasks,
  }, currentDate === today);

  // Save to database - this will persist the win/loss status
  db.saveTasksForDate(currentDate, updatedList);

  setCurrentPowerList(updatedList);
  updatePowerListsItem(currentDate, updatedList);
};

export default ToggleTaskCompletion;
