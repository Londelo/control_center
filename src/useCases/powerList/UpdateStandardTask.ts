import { PowerList } from '@/types/powerList';
import { updatePowerListStatus } from '@/logic/powerList'

type UpdateStandardTaskArgs = {
  currentPowerList: PowerList | null;
  setCurrentPowerList: (powerList: PowerList) => void;
};

const UpdateStandardTask = ({ currentPowerList, setCurrentPowerList }: UpdateStandardTaskArgs) =>
  ( taskId: string, text: string ) => {
    if (!currentPowerList) return;
    const updatedStandardTasks = currentPowerList.standardTasks.map(task =>
      task.id === taskId ? { ...task, text } : task
    );
    const updatedList = updatePowerListStatus({
      ...currentPowerList,
      standardTasks: updatedStandardTasks,
    });
    setCurrentPowerList(updatedList);
  };

export default UpdateStandardTask;
