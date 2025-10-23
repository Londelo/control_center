import { Standard } from '@/types/standards';

type RemoveStandardTaskArgs = {
  currentStandardTasks: Standard;
  setCurrentStandardTasks: (standard: Standard) => void;
};

const RemoveStandardTask = ({ currentStandardTasks, setCurrentStandardTasks }: RemoveStandardTaskArgs) =>
  (taskIndex: number) => {
    const updatedTasks = currentStandardTasks.tasks.filter((_, index) => index !== taskIndex);
    setCurrentStandardTasks({ ...currentStandardTasks, tasks: updatedTasks });
  };

export default RemoveStandardTask;
