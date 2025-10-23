import { PowerList, PowerLists } from '@/types/powerList';
import { Standard, Standards } from '@/types/standards';

//TODO: Reconfigure UseCases Folder structure to be useCases/daily/.../...
//this but this file in /daily
type NavigateToDateArgs = {
  currentDate: string;
  powerLists: PowerLists;
  allStandards: Standards;
  setCurrentDate: (date: string) => void;
  setCurrentPowerList: (PowerList: PowerList) => void;
  setCurrentStandardTasks: (standard: Standard) => void;
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
}: NavigateToDateArgs) => (direction: 'backward' | 'forward') => {
  if (direction === 'forward' && !canNavigateForward) {
    return;
  }

  if (direction === 'backward' && !canNavigateBackward) {
    return;
  }

  const currentDateObject = new Date(currentDate);
  const isPreviousDirection = direction === 'backward';
  currentDateObject.setDate(currentDateObject.getDate() + (isPreviousDirection ? -1 : 1));
  const newDate = currentDateObject.toLocaleDateString();
  const currentPowerList = powerLists[newDate];
  const currentStandards = allStandards[newDate];
  setCurrentDate(newDate);
  setCurrentPowerList(currentPowerList);
  setCurrentStandardTasks(currentStandards);
};

export default NavigateToDate;
