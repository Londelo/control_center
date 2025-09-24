import db from '@/logic/powerList/db';
import createMockPowerLists from '@/tools/createMockPowerLists';
import { PowerLists } from '@/types/powerList';

type OnInitArgs = {
  today: string;
  setPowerLists: (powerLists: PowerLists) => void;
  handleMissedDays: (today: string) => void;
  handleLostDays: (today: string) => void;
  loadPowerListForDate: (date: string) => void;
};

const OnInit = ({
  today,
  setPowerLists,
  handleMissedDays,
  handleLostDays,
  loadPowerListForDate
}: OnInitArgs) => () => {
  // Get all existing power lists and last viewed date
  const allPowerLists = db.getAllPowerLists();
  const lastViewedDate = db.getLastViewedDate();
  
  // Set the power lists in state
  setPowerLists(allPowerLists);
  
  // Create mock data if needed (this should probably be conditional in real app)
  createMockPowerLists(today);
  
  // Handle missed days and lost days
  handleMissedDays(today);
  handleLostDays(today);
  
  // Load the current day's power list
  loadPowerListForDate(today);
  
  // Update last viewed date
  db.updateLastViewedDate(today);
};

export default OnInit;