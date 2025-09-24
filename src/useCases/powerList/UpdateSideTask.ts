import { PowerList } from '@/types/powerList';
import { updatePowerListStatus } from '@/logic/powerList'

type UpdateSideTaskArgs = {
  currentPowerList: PowerList | null;
  setCurrentPowerList: (powerList: PowerList) => void;
};

const UpdateSideTask = ({ currentPowerList, setCurrentPowerList }: UpdateSideTaskArgs) =>
  ( taskId: string, text: string ) => {
    if (!currentPowerList) return;
    const updatedSideTasks = currentPowerList.sideTasks.map(task =>
      task.id === taskId ? { ...task, text } : task
    );
    const updatedList = updatePowerListStatus({
      ...currentPowerList,
      sideTasks: updatedSideTasks,
    });
    setCurrentPowerList(updatedList);
  };

export default UpdateSideTask;
