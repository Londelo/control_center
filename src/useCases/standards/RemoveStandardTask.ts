import { StandardTask } from '@/types/standards';
import StandardsDB from '@/backend/standards';

type RemoveStandardTaskArgs = {
  currentStandardTasks: StandardTask[];
  setCurrentStandardTasks: (tasks: StandardTask[]) => void;
};

const RemoveStandardTask = ({ currentStandardTasks, setCurrentStandardTasks }: RemoveStandardTaskArgs) =>
  async (taskId: string) => {
    const updatedTasks = currentStandardTasks.filter(task => task.id !== taskId);
    setCurrentStandardTasks(updatedTasks);
    await StandardsDB.removeStandardTask(taskId);
  };

export default RemoveStandardTask;
