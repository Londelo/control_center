import { PowerList, PowerLists } from '@/types/powerList';

type NavigateToDateArgs = {
  currentDate: string;
  powerLists: PowerLists
  setCurrentDate: (date: string) => void;
  setCurrentPowerList: (PowerList: PowerList) => void;
  canNavigateForward: boolean;
  canNavigateBackward: boolean;
};

const NavigateToDate = ({ currentDate, setCurrentDate, powerLists, setCurrentPowerList, canNavigateForward, canNavigateBackward }: NavigateToDateArgs) => (direction: 'prev' | 'next') => {
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
  const currentPowerList = powerLists[newDate]
  setCurrentDate(newDate);
  setCurrentPowerList(currentPowerList)
};

export default NavigateToDate;
