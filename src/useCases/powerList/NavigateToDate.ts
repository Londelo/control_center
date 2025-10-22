import { PowerList, PowerLists } from '@/types/powerList';
import { Standard, StandardTask } from '@/types/standards';

type NavigateToDateArgs = {
  currentDate: string;
  powerLists: PowerLists;
  allStandards: Standard;
  setCurrentDate: (date: string) => void;
  setCurrentPowerList: (PowerList: PowerList) => void;
  setCurrentStandardTasks: (tasks: StandardTask[]) => void;
  canNavigateForward: boolean;
  canNavigateBackward: boolean;
};

const NavigateToDate = ({
  currentDate,
  setCurrentDate,
  powerLists,
  allStandards,
  setCurrentPowerList,
  setCurrentStandardTasks,
  canNavigateForward,
  canNavigateBackward
}: NavigateToDateArgs) => (direction: 'prev' | 'next') => {
  if (direction === 'next' && !canNavigateForward) {
    return;
  }

  if (direction === 'prev' && !canNavigateBackward) {
    return;
  }

  const currentDateObject = new Date(currentDate);
  const isPreviousDirection = direction === 'prev';
  currentDateObject.setDate(currentDateObject.getDate() + (isPreviousDirection ? -1 : 1));
  const newDate = currentDateObject.toLocaleDateString();
  const currentPowerList = powerLists[newDate];
  const currentStandards = allStandards[newDate];
  setCurrentDate(newDate);
  setCurrentPowerList(currentPowerList);
  setCurrentStandardTasks(currentStandards);
};

export default NavigateToDate;
