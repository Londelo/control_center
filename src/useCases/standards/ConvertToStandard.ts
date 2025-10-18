import { createEmptyStandardTask } from '@/logic/standards';
import { StandardTask } from '@/types/standards';
import { Task } from '@/types/powerList';
import StandardsDB from '@/backend/standards';

type ConvertToStandardArgs = {
  currentDate: string;
  currentStandardTasks: StandardTask[];
  setCurrentStandardTasks: (tasks: StandardTask[]) => void;
};

const ConvertToStandard = ({
  currentDate,
  currentStandardTasks,
  setCurrentStandardTasks
}: ConvertToStandardArgs) =>
  async (task: Task) => {
    const newStandardTask: StandardTask = {
      ...createEmptyStandardTask(currentDate),
      text: task.text,
      date: currentDate
    };

    const updatedTasks = [...currentStandardTasks, newStandardTask];
    setCurrentStandardTasks(updatedTasks);
    await StandardsDB.saveStandardsList(currentDate, updatedTasks);
  };

export default ConvertToStandard;
