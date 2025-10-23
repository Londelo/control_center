import { createStandard, getMostRecentStandardTasks } from '@/logic/standards';
import StandardsDB from '@/backend/standards';
import { Standards, Standard } from '@/types/standards';

export type GetTodaysStandardsList = {
  today: string;
  allStandards: Standards
};

const getTodaysStandardsList = async ({
  today,
  allStandards
}: GetTodaysStandardsList): Promise<Standard> => {
  let todaysStandard = allStandards[today];

  if (!todaysStandard) {
    const recentStandardTasks = getMostRecentStandardTasks(allStandards);
    todaysStandard = createStandard(today, recentStandardTasks);
    await StandardsDB.save(todaysStandard);
    return todaysStandard;
  }

  return todaysStandard;
};

export default getTodaysStandardsList;
