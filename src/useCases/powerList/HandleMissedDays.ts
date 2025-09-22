import powerList from '@/controllers/powerList';
import { getMostRecentTasks, createTaskList } from '@/logic/powerList';

export function generateMissedDays(lastDate: string, currentDate: string): string[] {
  const missed: string[] = [];
  const start = new Date(lastDate);
  const end = new Date(currentDate);

  start.setDate(start.getDate() + 1); // Start from day after last date

  while (start < end) {
    missed.push(start.toLocaleDateString());
    start.setDate(start.getDate() + 1);
  }

  return missed;
}

const HandleMissedDays = () => (today: string) => {
  const lastSaveDate = powerList.getLastSaveDate();
  const allHistory = powerList.getAllTaskHistory();
  if (lastSaveDate && lastSaveDate !== today) {
    const missedDays = generateMissedDays(lastSaveDate, today)
    for (const missedDay of missedDays) {
      const { tasks: recentTasks, sideTasks: recentSideTasks } = getMostRecentTasks(allHistory);
      const missedList = createTaskList(missedDay, recentTasks, recentSideTasks);
      missedList.isLoss = true;
      missedList.isComplete = true;
      powerList.saveTasksForDate(missedDay, missedList);
    }
  }
};

export default HandleMissedDays
