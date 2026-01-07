import { createEmptyTask, updatePowerListStatus } from '@/logic/powerList';
import { PowerList } from '@/types/powerList';

type AddTaskArgs = {
  currentPowerList: PowerList | null;
  setCurrentPowerList: (powerList: PowerList) => void;
};

const AddTask = ({ currentPowerList, setCurrentPowerList }: AddTaskArgs) => () => {
  if (!currentPowerList) return;

  const newTask = createEmptyTask();
  const updatedTasks = [...currentPowerList.tasks, newTask];

  const updatedList = updatePowerListStatus({
    ...currentPowerList,
    tasks: updatedTasks,
  });

  setCurrentPowerList(updatedList);
};

export default AddTask;
