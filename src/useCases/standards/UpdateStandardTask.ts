import { Standard } from '@/types/standards';

type UpdateStandardTaskArgs = {
  currentStandardTasks: Standard;
  setCurrentStandardTasks: (standard: Standard) => void;
};

const UpdateStandardTask = ({ currentStandardTasks, setCurrentStandardTasks }: UpdateStandardTaskArgs) =>
  (taskId: string, text: string) => {
    const updatedTasks = currentStandardTasks.tasks.map((task) =>
      task.id === taskId ? { ...task, text } : task
    );
    setCurrentStandardTasks({ ...currentStandardTasks, tasks: updatedTasks });
  };

export default UpdateStandardTask;
