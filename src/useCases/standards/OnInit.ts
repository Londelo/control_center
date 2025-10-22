"use client"

import StandardsDB from '@/backend/standards';
import { Standard, StandardTask } from '@/types/standards';
import getTodaysStandardsList from '@/logic/standards/getTodaysStandardsList';
import handleMissedStandardsDays from '@/logic/standards/handleMissedStandardsDays';

type OnInitArgs = {
  today: string;
  setAllStandards: (standards: Standard) => void;
  setCurrentStandardTasks: (tasks: StandardTask[]) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const OnInit = ({
  today,
  setAllStandards,
  setCurrentStandardTasks,
  setIsLoading: _setIsLoading
}: OnInitArgs) => async () => {
  let allStandards = await StandardsDB.getAllStandardsLists();
  allStandards = await handleMissedStandardsDays({ allStandards, today });

  const todaysStandardsList = await getTodaysStandardsList({
    today,
    allStandards,
  });

  setAllStandards({ ...allStandards, [today]: todaysStandardsList });
  setCurrentStandardTasks(todaysStandardsList);
};

export default OnInit;
