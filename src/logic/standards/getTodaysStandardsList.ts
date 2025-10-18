import { createStandardsList, getMostRecentStandardTasks } from '@/logic/standards';
import StandardsDB from '@/backend/standards';
import { Standards, StandardTask } from '@/types/standards';

export type GetTodaysStandardsList = {
  today: string;
  allStandards: Standards
};

const getTodaysStandardsList = async ({
  today,
  allStandards
}: GetTodaysStandardsList): Promise<StandardTask[]> => {
  let standardsList = allStandards[today];

  if (!standardsList) {
    const recentStandardTasks = getMostRecentStandardTasks(allStandards);
    standardsList = createStandardsList(
      today,
      recentStandardTasks.map(task => ({ ...task, date: today, completed: false }))
    );
    await StandardsDB.saveList(today, standardsList);
    return standardsList;
  }

  return standardsList;
};

export default getTodaysStandardsList;
