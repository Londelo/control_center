import { createEmptyTask, updatePowerListStatus } from '@/logic/powerList';
import { PowerList } from '@/types/powerList';

type AddSideTaskArgs = {
  currentPowerList: PowerList | null;
  setCurrentPowerList: (powerList: PowerList) => void;
};

const AddSideTask = ({ currentPowerList, setCurrentPowerList }: AddSideTaskArgs) => () => {
  if (!currentPowerList) return;

  const newTask = createEmptyTask();
  const updatedSideTasks = [...currentPowerList.sideTasks, newTask];

  const updatedList = updatePowerListStatus({
    ...currentPowerList,
    sideTasks: updatedSideTasks,
  });

  setCurrentPowerList(updatedList);
};

export default AddSideTask;
