import PowerListDB from '@/backend/powerList';
import StandardsDB from '@/backend/standards';
import { PowerList } from '@/types/powerList';
import { Standard } from '@/types/standards';
import { v4 } from 'uuid';

const overWritePowerList = async (today: string): Promise<void> => {
  const allPowerLists = await PowerListDB.getAllPowerLists();
  const allStandards = await StandardsDB.getAllStandardsLists();

  const todaysPowerList = allPowerLists[today];
  const todaysStandards = allStandards[today];

  if (!todaysPowerList || !todaysStandards) {
    return;
  }

  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateString = date.toLocaleDateString();

    const newPowerList: PowerList = {
      id: todaysPowerList.id,
      date: dateString,
      tasks: todaysPowerList.tasks,
      isWin: false,
      isLoss: false,
      isComplete: false
    };

    const newStandard: Standard = {
      id: todaysStandards.id,
      date: dateString,
      tasks: todaysStandards.tasks
    };

    await PowerListDB.save(newPowerList);
    await StandardsDB.save(newStandard);
  }
};

export default overWritePowerList;
