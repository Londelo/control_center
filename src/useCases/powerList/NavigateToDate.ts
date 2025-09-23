
type NavigateToDateArgs = {
  currentDate: string;
  today: string;
  setCurrentDate: (date: string) => void
};

const NavigateToDate = ({ currentDate, today, setCurrentDate }: NavigateToDateArgs) => (direction: 'prev' | 'next') => {
  const isFutureNavigation = direction === 'next' && currentDate >= today;
  if (isFutureNavigation) return;

  const currentDateObject = new Date(currentDate);
  const isPreviousDirection = direction === 'prev';
  currentDateObject.setDate(currentDateObject.getDate() + (isPreviousDirection ? -1 : 1));
  const newDate = currentDateObject.toLocaleDateString();
  setCurrentDate(newDate);
};

export default NavigateToDate;
