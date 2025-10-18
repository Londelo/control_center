import { updatePowerListStatus } from '@/logic/powerList';
import { createEmptyStandardTask } from '@/logic/standards';
import { PowerList } from '@/types/powerList';

type AddStandardTaskArgs = {
  currentPowerList: PowerList | null;
  setCurrentPowerList: (powerList: PowerList) => void;
};

const AddStandardTask = ({ currentPowerList, setCurrentPowerList }: AddStandardTaskArgs) => () => {
  if (!currentPowerList) return;

  const newTask = createEmptyStandardTask(currentPowerList.date);
  const updatedStandardTasks = [...(currentPowerList.standardTasks || []), newTask];

  const updatedList = updatePowerListStatus({
    ...currentPowerList,
    standardTasks: updatedStandardTasks,
  });

  setCurrentPowerList(updatedList);
};

export default AddStandardTask;
