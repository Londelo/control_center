import db from '@/logic/powerList/db';

const HandleLostDays = () => (today: string) => {
  const allPowerLists = db.getAllPowerLists();

  Object.entries(allPowerLists).forEach(([date, powerList]) => {
    // Only process past dates (not today) that are not wins and not already marked as losses
    if (date !== today && !powerList.isWin && !powerList.isLoss) {
      const updatedPowerList = {
        ...powerList,
        isLoss: true,
        isComplete: true,
        updatedAt: new Date().toISOString(),
      };

      db.saveTasksForDate(date, updatedPowerList);
    }
  });
};

export default HandleLostDays;