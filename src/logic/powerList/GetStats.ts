import { calculateAppStats } from '@/logic/powerList/powerListLogic';

type GetStatsArgs = {
  getAllTaskHistory: () => any;
};

const GetStats = ({ getAllTaskHistory }: GetStatsArgs) => () => {
  const allHistory = getAllTaskHistory();
  return calculateAppStats(allHistory);
};

export default GetStats;
