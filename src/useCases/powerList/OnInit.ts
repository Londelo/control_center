"use client"

import PowerListDB from '@/backend/powerList';
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
  setCurrentPowerList: (PowerList: PowerList) => void;
  setIsEditing: (isEditing: boolean) => void;
}

const OnInit = ({
  today,
  setPowerLists,
  setCurrentPowerList,
  setIsEditing
}: OnInitArgs) => async () => {
  let allPowerLists = await PowerListDB.getAllPowerLists();
  const todaysPowerList = await getTodaysPowerList({ today, allPowerLists });
  allPowerLists = { ...allPowerLists, [today]: todaysPowerList}
  allPowerLists = await handleMissedDays({ allPowerLists, today })
  allPowerLists = await handleLostDays({ allPowerLists, today })
  allPowerLists = await calculateHabitCompletion({ allPowerLists })

  setPowerLists(allPowerLists);

  await PowerListDB.updateLastViewedDate(today);
  setCurrentPowerList(todaysPowerList);
  setIsEditing(!isPowerListComplete(todaysPowerList));
};

export default OnInit;
