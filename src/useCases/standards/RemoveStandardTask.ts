import { Standard } from '@/types/standards';

type RemoveStandardTaskArgs = {
  currentStandardTasks: Standard;
  setCurrentStandardTasks: (standard: Standard) => void;
};

const RemoveStandardTask = ({ currentStandardTasks, setCurrentStandardTasks }: RemoveStandardTaskArgs) =>
  (taskId: string) => {
    const updatedTasks = currentStandardTasks.tasks.filter((task) => task.id !== taskId);
    setCurrentStandardTasks({ ...currentStandardTasks, tasks: updatedTasks });
  };

export default RemoveStandardTask;
