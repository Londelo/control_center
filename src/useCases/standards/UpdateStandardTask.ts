import { StandardTask } from '@/types/standards';

type UpdateStandardTaskArgs = {
  currentStandardTasks: StandardTask[];
  setCurrentStandardTasks: (tasks: StandardTask[]) => void;
};

const UpdateStandardTask = ({ currentStandardTasks, setCurrentStandardTasks }: UpdateStandardTaskArgs) =>
  (taskId: string, text: string) => {
    const updatedTasks = currentStandardTasks.map(task =>
      task.id === taskId ? { ...task, text } : task
    );
    setCurrentStandardTasks(updatedTasks);
  };

export default UpdateStandardTask;
