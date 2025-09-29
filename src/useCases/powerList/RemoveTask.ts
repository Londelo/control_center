import { updatePowerListStatus, createEmptyTask } from '@/logic/powerList';
import { PowerList } from '@/types/powerList';

type RemoveTaskArgs = {
  currentPowerList: PowerList | null;
  setCurrentPowerList: (powerList: PowerList) => void;
};

const RemoveTask = ({ currentPowerList, setCurrentPowerList }: RemoveTaskArgs) =>
  (taskId: string) => {
    if (!currentPowerList) return;

    // Find the index of the task to remove
    const taskIndex = currentPowerList.tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) return;

    // Create a new empty task to replace the deleted one
    const newEmptyTask = createEmptyTask();

    // Replace the task at the found index with the new empty task
    const updatedTasks = [ ...currentPowerList.tasks, newEmptyTask ].filter(
      task => task.id !== taskId
    );

    const updatedList = updatePowerListStatus({
      ...currentPowerList,
      tasks: updatedTasks,
    });

    setCurrentPowerList(updatedList);
  };

export default RemoveTask;
