import { PowerList } from '@/types/powerList';
import { updatePowerListStatus, isPowerListComplete } from '@/logic/powerList';
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
    currentPowerList.sideTasks.find(t => t.id === taskId);
  if (!task) return;

  const newCompletedStatus = !task.completed;

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
  }, currentDate === today);

  // Save to database - this will persist the win/loss status
  db.saveTasksForDate(currentDate, updatedList);

  setCurrentPowerList(updatedList);
  updatePowerListsItem(currentDate, updatedList);
};

export default ToggleTaskCompletion;
