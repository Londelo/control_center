import { PowerList, StandardTask, Task } from '@/types/powerList';
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

  const getUpdatedTask = (task: Task) => {
    const shouldDecrementTimeLeft = newCompletedStatus && task.id === taskId && task.time && typeof task.time.left === 'number';
    return task.id === taskId
      ? {
          ...task,
          completed: newCompletedStatus,
          time: shouldDecrementTimeLeft
            ? { ...task.time, left: task.time.left - 1 }
            : task.time
        }
      : task;
  };

  const getUpdatedStandardTask = (task: StandardTask) =>
    task.id === taskId ? { ...task, completed: newCompletedStatus } : task;

  const updatedTasks = currentPowerList.tasks.map(getUpdatedTask);
  const updatedStandardTasks = currentPowerList.standardTasks.map(getUpdatedStandardTask);

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
