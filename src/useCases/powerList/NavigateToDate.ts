type NavigateToDateArgs = {
  currentDate: string;
  setCurrentDate: (date: string) => void;
  canNavigateForward: boolean;
  canNavigateBackward: boolean;
  loadPowerListForDate: (date: string) => void;
};

const NavigateToDate = ({ currentDate, setCurrentDate, canNavigateForward, canNavigateBackward, loadPowerListForDate }: NavigateToDateArgs) => (direction: 'prev' | 'next') => {
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
  setCurrentDate(newDate);
  loadPowerListForDate(newDate);
};

export default NavigateToDate;
