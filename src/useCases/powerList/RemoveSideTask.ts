import { updatePowerListStatus } from '@/logic/powerList';
import { PowerList } from '@/types/powerList';

type RemoveSideTaskArgs = {
  currentPowerList: PowerList | null;
  setCurrentPowerList: (powerList: PowerList) => void;
};

const RemoveSideTask = ({ currentPowerList, setCurrentPowerList }: RemoveSideTaskArgs) =>
  (taskId: string) => {

    if (!currentPowerList) return;

    const updatedSideTasks = currentPowerList.sideTasks.filter(task => task.id !== taskId);

    const updatedList = updatePowerListStatus({
      ...currentPowerList,
      sideTasks: updatedSideTasks,
    });

    setCurrentPowerList(updatedList);
  };

export default RemoveSideTask;
