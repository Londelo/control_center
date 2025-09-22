type InitializeAppArgs = {
  loadTaskListForDate: (date: string) => Promise<void>;
  currentDate: string;
};

const InitializeApp = ({ loadTaskListForDate, currentDate }: InitializeAppArgs) => async () => {
  await loadTaskListForDate(currentDate);
};

export default InitializeApp;
