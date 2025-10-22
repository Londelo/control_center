import ToDoTodayDB from '@/backend/todoToday';
import { ToDoTask, ToDoLists } from '@/types/todoToday';

type OnInitArgs = {
  today: string;
  setAllToDos: (todos: ToDoLists) => void;
  setCurrentToDoTasks: (tasks: ToDoTask[]) => void;
  setShowToDoSection: (show: boolean) => void;
};

const OnInit = ({
  today,
  setAllToDos,
  setCurrentToDoTasks,
  setShowToDoSection
}: OnInitArgs) => async () => {
  const allToDos = await ToDoTodayDB.getAllToDoLists();
  setAllToDos(allToDos);

  const todaysTasks = allToDos[today] || [];
  setCurrentToDoTasks(todaysTasks);

  if (todaysTasks.length > 0) {
    setShowToDoSection(true);
  }
};

export default OnInit;
