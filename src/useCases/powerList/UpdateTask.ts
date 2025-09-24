import { Task, PowerList } from '@/types/powerList';
import { updatePowerListStatus } from '@/logic/powerList'

type UpdateTaskArgs = {
  currentPowerList: PowerList | null;
  setCurrentPowerList: (powerList: PowerList) => void;
};

const UpdateTask = ({ currentPowerList, setCurrentPowerList }: UpdateTaskArgs) =>
  (taskId: string, text: string ) => {
    if (!currentPowerList) return;

    const updatedTasks = currentPowerList.tasks.map((task: Task) =>
      task.id === taskId ? { ...task, text } : task
    );

    //TODO: Broken params???
    const updatedList = updatePowerListStatus({
      ...currentPowerList,
      tasks: updatedTasks,
    });

    setCurrentPowerList(updatedList);
  };

export default UpdateTask;
