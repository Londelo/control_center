import db from '@/logic/powerList/db';
import { getMostRecentTasks, createPowerList } from '@/logic/powerList';

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
  const lastSaveDate = db.getLastSaveDate();
  const allHistory = db.getAllTaskHistory();
  if (lastSaveDate && lastSaveDate !== today) {
    const missedDays = generateMissedDays(lastSaveDate, today)
    for (const missedDay of missedDays) {
      const { tasks: recentTasks, sideTasks: recentSideTasks } = getMostRecentTasks(allHistory);
      const missedList = createPowerList(missedDay, recentTasks, recentSideTasks);
      missedList.isLoss = true;
      missedList.isComplete = true;
      db.saveTasksForDate(missedDay, missedList);
    }
  }
};

export default HandleMissedDays
