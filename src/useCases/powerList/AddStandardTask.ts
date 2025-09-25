import { createEmptyTask, updatePowerListStatus } from '@/logic/powerList';
import { PowerList } from '@/types/powerList';

type AddStandardTaskArgs = {
  currentPowerList: PowerList | null;
  setCurrentPowerList: (powerList: PowerList) => void;
};

const AddStandardTask = ({ currentPowerList, setCurrentPowerList }: AddStandardTaskArgs) => () => {
  if (!currentPowerList) return;

  const newTask = createEmptyTask();
  const updatedStandardTasks = [...currentPowerList.standardTasks, newTask];

  const updatedList = updatePowerListStatus({
    ...currentPowerList,
    standardTasks: updatedStandardTasks,
  });

  setCurrentPowerList(updatedList);
};

export default AddStandardTask;
