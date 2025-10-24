import { PowerList, PowerLists } from '@/types/powerList';
import { Standard, Standards } from '@/types/standards';
import { ToDoList, ToDoLists } from '@/types/todoToday';

//TODO: Reconfigure UseCases Folder structure to be useCases/daily/.../...
//this but this file in /daily
type NavigateToDateArgs = {
  currentDate: string;
  powerLists: PowerLists;
  allStandards: Standards;
  allToDos: ToDoLists;
  setCurrentDate: (date: string) => void;
  setCurrentPowerList: (PowerList: PowerList) => void;
  setCurrentStandardTasks: (standard: Standard) => void;
  setCurrentToDoTasks: (toDoList: ToDoList) => void;
  setShowToDoSection: (show: boolean) => void;
  canNavigateForward: boolean;
  canNavigateBackward: boolean;
};

const NavigateToDate = ({
  currentDate,
  setCurrentDate,
  powerLists,
  allStandards,
  allToDos,
  setCurrentPowerList,
  setCurrentStandardTasks,
  setCurrentToDoTasks,
  setShowToDoSection,
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
  const currentToDos = allToDos[newDate];
  setCurrentDate(newDate);
  setCurrentPowerList(currentPowerList);
  setCurrentStandardTasks(currentStandards);
  setCurrentToDoTasks(currentToDos);
  setShowToDoSection(currentToDos?.tasks?.length > 0);
};

export default NavigateToDate;
