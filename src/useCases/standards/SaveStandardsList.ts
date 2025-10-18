import StandardsDB from '@/backend/standards';
import { StandardTask } from '@/types/standards';

type SaveStandardsListArgs = {
  currentDate: string;
  currentStandardTasks: StandardTask[];
};

const SaveStandardsList = ({
  currentDate,
  currentStandardTasks
}: SaveStandardsListArgs) => async () => {
  const tasksWithDate = currentStandardTasks.map(task => ({
    ...task,
    date: currentDate
  }));

  await StandardsDB.saveList(currentDate, tasksWithDate);
};

export default SaveStandardsList;
