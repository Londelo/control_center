import db from '@/logic/powerList/db';
import createMockPowerLists from '@/tools/createMockPowerLists';
import { PowerLists, PowerList } from '@/types/powerList';
import {
  HandleMissedDays,
  HandleLostDays,
  LoadPowerListForDate,
  CalculateHabitCompletion
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

  createMockPowerLists(today);

  const allPowerLists = db.getAllPowerLists();
  setPowerLists(allPowerLists);

  const handleMissedDays = HandleMissedDays(allPowerLists)
  const handleLostDays = HandleLostDays(allPowerLists)

  const loadPowerListForDate = LoadPowerListForDate({
    today,
    allPowerLists: allPowerLists,
    setCurrentPowerList,
    setIsEditing
  })

  handleMissedDays(today);
  handleLostDays(today);

  // Re-fetch updated PowerLists after handling missed/lost days
  const updatedPowerLists = db.getAllPowerLists();
  const calculateHabitCompletion = CalculateHabitCompletion(updatedPowerLists);
  const finalPowerLists = calculateHabitCompletion();

  // Update state with final processed PowerLists
  setPowerLists(finalPowerLists);

  // Load current date with updated data
  loadPowerListForDate(today);

  db.updateLastViewedDate(today);

  setIsLoading(false);
};

export default OnInit;
