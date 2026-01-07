import { updatePowerListStatus } from '@/logic/powerList';
import { PowerList } from '@/types/powerList';

type RemoveTaskArgs = {
  currentPowerList: PowerList | null;
  setCurrentPowerList: (powerList: PowerList) => void;
};

const RemoveTask = ({ currentPowerList, setCurrentPowerList }: RemoveTaskArgs) =>
  (taskId: string) => {
    if (!currentPowerList) return;

    const updatedTasks = currentPowerList.tasks.filter(task => task.id !== taskId);

    const updatedList = updatePowerListStatus({
      ...currentPowerList,
      tasks: updatedTasks,
    });

    setCurrentPowerList(updatedList);
  };

export default RemoveTask;
