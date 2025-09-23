import { updatePowerListStatus } from '@/logic/powerList';
import db from '@/logic/powerList/db';
import { PowerList } from '@/types/powerList';

type SavePowerListArgs = {
  currentPowerList: PowerList | null;
  currentDate: string;
  today: string;
  setCurrentPowerList: (PowerList: PowerList) => void;
  setIsEditing: (isEditing: boolean) => void;
};

const SavePowerList = ({
  currentPowerList,
  currentDate,
  today,
  setCurrentPowerList,
  setIsEditing,
}: SavePowerListArgs) => () => {
  if (!currentPowerList) return;

  const updatedList = updatePowerListStatus(currentPowerList, currentDate === today);
  setCurrentPowerList(updatedList);
  db.saveTasksForDate(currentDate, updatedList);
  setIsEditing(false);
};

export default SavePowerList;
