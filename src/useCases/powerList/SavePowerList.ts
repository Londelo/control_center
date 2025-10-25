import PowerListDB from '@/backend/powerList';
import { updatePowerListStatus } from '@/logic/powerList';
import { PowerList } from '@/types/powerList';

type SavePowerListArgs = {
  currentPowerList: PowerList | null;
  currentDate: string;
  today: string;
  setIsEditing: (isEditing: boolean) => void;
  updatePowerListState: (powerList: PowerList) => void;
};

const SavePowerList = ({
  currentPowerList,
  currentDate,
  today,
  setIsEditing,
  updatePowerListState
}: SavePowerListArgs) => async () => {
  if (!currentPowerList) return;

  const updatedList = updatePowerListStatus(currentPowerList, currentDate === today);
  await PowerListDB.save(updatedList);
  updatePowerListState(updatedList);
  setIsEditing(false);
};

export default SavePowerList;
