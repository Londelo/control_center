import { createEmptyStandardTask } from '@/logic/standards';
import { Standard } from '@/types/standards';

type AddStandardTaskArgs = {
  currentStandardTasks: Standard;
  setCurrentStandardTasks: (standard: Standard) => void;
};

const AddStandardTask = ({ currentStandardTasks, setCurrentStandardTasks }: AddStandardTaskArgs) => () => {
  const newTask = createEmptyStandardTask();
  const updatedTasks = [...currentStandardTasks.tasks, newTask];
  setCurrentStandardTasks({ ...currentStandardTasks, tasks: updatedTasks });
};

export default AddStandardTask;
