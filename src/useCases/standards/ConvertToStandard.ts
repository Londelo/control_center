import { createEmptyStandardTask } from '@/logic/standards';
import { Standard } from '@/types/standards';
import { Task } from '@/types/powerList';

type ConvertToStandardArgs = {
  currentStandardTasks: Standard;
  setCurrentStandardTasks: (standard: Standard) => void;
};

const ConvertToStandard = ({
  currentStandardTasks,
  setCurrentStandardTasks
}: ConvertToStandardArgs) =>
  (task: Task) => {
    const newStandardTask = {
      ...createEmptyStandardTask(),
      text: task.text
    };

    const updatedTasks = [...currentStandardTasks.tasks, newStandardTask];
    setCurrentStandardTasks({ ...currentStandardTasks, tasks: updatedTasks });
  };

export default ConvertToStandard;
