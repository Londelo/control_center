import { PowerList, Task } from '@/types/powerList';
import { updatePowerListStatus } from '@/logic/powerList';
import PowerListDB from '@/backend/powerList';

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
}: ToggleTaskCompletionArgs) => async (taskId: string) => {
  if (!currentPowerList || isEditing) return;

  const task = currentPowerList.tasks.find(t => t.id === taskId);
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

  const updatedTasks = currentPowerList.tasks.map(getUpdatedTask);

  const updatedList = updatePowerListStatus({
    ...currentPowerList,
    tasks: updatedTasks,
  }, currentDate === today);

  await PowerListDB.save(updatedList);

  setCurrentPowerList(updatedList);
  updatePowerListsItem(currentDate, updatedList);
};

export default ToggleTaskCompletion;
