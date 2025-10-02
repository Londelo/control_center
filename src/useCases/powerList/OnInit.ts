"use client"

import db from '@/logic/powerList/db';
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
}: OnInitArgs) => () => {
  setIsLoading(true);

  if(process.env.NEXT_PUBLIC_MOCK_TASKS) {
    console.warn("MOCKING POWER LISTS")
    createMockPowerLists(today);
  }

  let allPowerLists = db.getAllPowerLists();
  allPowerLists = handleMissedDays({ allPowerLists, today })
  allPowerLists = handleLostDays({ allPowerLists, today })
  allPowerLists = calculateHabitCompletion({ allPowerLists })

  const todaysPowerList = getTodaysPowerList({
    today,
    allPowerLists,
  });

  setPowerLists({ ...allPowerLists, [today]: todaysPowerList});

  db.updateLastViewedDate(today);
  setCurrentPowerList(todaysPowerList);
  setIsEditing(!isPowerListComplete(todaysPowerList));
  setIsLoading(false);
};

export default OnInit;
