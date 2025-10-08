import PowerListDB from '@/backend/powerList';
import { updatePowerListStatus } from '@/logic/powerList';
import { PowerList } from '@/types/powerList';

type SavePowerListArgs = {
  currentPowerList: PowerList | null;
  currentDate: string;
  today: string;
  setCurrentPowerList: (powerList: PowerList) => void;
  setIsEditing: (isEditing: boolean) => void;
  updatePowerListsItem: (date: string, powerList: PowerList) => void;
};

const SavePowerList = ({
  currentPowerList,
  currentDate,
  today,
  setCurrentPowerList,
  setIsEditing,
  updatePowerListsItem
}: SavePowerListArgs) => async () => {
  if (!currentPowerList) return;

  const updatedList = updatePowerListStatus(currentPowerList, currentDate === today);
  setCurrentPowerList(updatedList);
  await PowerListDB.saveList(updatedList);
  updatePowerListsItem(currentDate, updatedList);
  setIsEditing(false);
};

export default SavePowerList;
