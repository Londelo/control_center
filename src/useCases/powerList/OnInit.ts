import db from '@/logic/powerList/db';
import createMockPowerLists from '@/tools/createMockPowerLists';
import { PowerLists, PowerList } from '@/types/powerList';
import {
  HandleMissedDays,
  HandleLostDays,
  LoadPowerListForDate
} from '@/useCases/powerList';

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

  createMockPowerLists(today);

  const allPowerLists = db.getAllPowerLists();
  setPowerLists(allPowerLists);

  const handleMissedDays = HandleMissedDays(allPowerLists)
  const handleLostDays = HandleLostDays(allPowerLists)
  const loadPowerListForDate = LoadPowerListForDate({
    today,
    allPowerLists,
    setCurrentPowerList,
    setIsEditing
  })


  handleMissedDays(today);
  handleLostDays(today);
  loadPowerListForDate(today);

  db.updateLastViewedDate(today);

  setIsLoading(false);
};

export default OnInit;
