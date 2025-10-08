"use client"

import PowerListDB from '@/backend/powerList';

import createMockPowerLists from '@/tools/createMockPowerLists';
import { PowerLists, PowerList } from '@/types/powerList';
import {
  handleMissedDays,
  handleLostDays,
  calculateHabitCompletion,
  getTodaysPowerList,
  isPowerListComplete
} from '@/logic/powerList';

type OnInitArgs = {
  today: string;
  setPowerLists: (powerLists: PowerLists) => void;
  setIsLoading: (isLoading: boolean) => void;
  setCurrentPowerList: (PowerList: PowerList) => void;
  setIsEditing: (isEditing: boolean) => void;
}

const OnInit = ({
  today,
  setPowerLists,
  setIsLoading,
  setCurrentPowerList,
  setIsEditing
}: OnInitArgs) => async () => {
  setIsLoading(true);

  if(process.env.NEXT_PUBLIC_MOCK_TASKS) {
    console.warn("MOCKING POWER LISTS")
    await createMockPowerLists(today);
  }

  let allPowerLists = await PowerListDB.getAllPowerLists();
  allPowerLists = await handleMissedDays({ allPowerLists, today })
  allPowerLists = await handleLostDays({ allPowerLists, today })
  allPowerLists = await calculateHabitCompletion({ allPowerLists })

  const todaysPowerList = await getTodaysPowerList({
    today,
    allPowerLists,
  });

  setPowerLists({ ...allPowerLists, [today]: todaysPowerList});

  await PowerListDB.updateLastViewedDate(today);
  setCurrentPowerList(todaysPowerList);
  setIsEditing(!isPowerListComplete(todaysPowerList));
  setIsLoading(false);
};

export default OnInit;
