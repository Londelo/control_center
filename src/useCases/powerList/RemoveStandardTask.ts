import { updatePowerListStatus } from '@/logic/powerList';
import { PowerList } from '@/types/powerList';

type RemoveStandardTaskArgs = {
  currentPowerList: PowerList | null;
  setCurrentPowerList: (powerList: PowerList) => void;
};

const RemoveStandardTask = ({ currentPowerList, setCurrentPowerList }: RemoveStandardTaskArgs) =>
  (taskId: string) => {

    if (!currentPowerList) return;

    const updatedStandardTasks = (currentPowerList.standardTasks || []).filter(task => task.id !== taskId);

    const updatedList = updatePowerListStatus({
      ...currentPowerList,
      standardTasks: updatedStandardTasks,
    });

    setCurrentPowerList(updatedList);
  };

export default RemoveStandardTask;
