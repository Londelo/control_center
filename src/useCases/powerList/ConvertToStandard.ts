import { createEmptyStandardTask, updatePowerListStatus } from '@/logic/powerList';
import { PowerList } from '@/types/powerList';
import RemoveTask from './RemoveTask'

type ConvertToStandardArgs = {
  currentPowerList: PowerList | null;
  setCurrentPowerList: (powerList: PowerList) => void;
};

const ConvertToStandard = ({ currentPowerList, setCurrentPowerList }: ConvertToStandardArgs) =>
  (taskId: string) => {
    if (!currentPowerList) return;

    // Find the task to convert
    const taskToConvert = currentPowerList.tasks.find(task => task.id === taskId);
    if (!taskToConvert) return;

    // Create a new standard task from the power list task
    const newStandardTask = {
      ...createEmptyStandardTask(),
      text: taskToConvert.text,
    };

    // Add the new standard task to the standards list
    const updatedStandardTasks = [...currentPowerList.standardTasks, newStandardTask];

    // Update the power list with both the new standard task and updated tasks
    const updatedList = updatePowerListStatus({
      ...currentPowerList,
      standardTasks: updatedStandardTasks,
    });

    RemoveTask({currentPowerList: updatedList, setCurrentPowerList})(taskId)
  };

export default ConvertToStandard;
