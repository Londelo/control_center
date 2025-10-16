import { createEmptyStandardTask } from '@/logic/standards';
import { StandardTask } from '@/types/standards';

type AddStandardTaskArgs = {
  currentDate: string;
  currentStandardTasks: StandardTask[];
  setCurrentStandardTasks: (tasks: StandardTask[]) => void;
};

const AddStandardTask = ({ currentDate, currentStandardTasks, setCurrentStandardTasks }: AddStandardTaskArgs) => () => {
  const newTask = createEmptyStandardTask(currentDate);
  const updatedTasks = [...currentStandardTasks, newTask];
  setCurrentStandardTasks(updatedTasks);
};

export default AddStandardTask;
