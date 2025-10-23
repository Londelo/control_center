import { Standard } from '@/types/standards';

type UpdateStandardTaskArgs = {
  currentStandardTasks: Standard;
  setCurrentStandardTasks: (standard: Standard) => void;
};

const UpdateStandardTask = ({ currentStandardTasks, setCurrentStandardTasks }: UpdateStandardTaskArgs) =>
  (taskIndex: number, text: string) => {
    const updatedTasks = currentStandardTasks.tasks.map((task, index) =>
      index === taskIndex ? { ...task, text } : task
    );
    setCurrentStandardTasks({ ...currentStandardTasks, tasks: updatedTasks });
  };

export default UpdateStandardTask;
