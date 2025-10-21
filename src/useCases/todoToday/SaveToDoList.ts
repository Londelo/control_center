import ToDoTodayDB from '@/backend/todoToday';
import { ToDoTask } from '@/types/todoToday';

type SaveToDoListArgs = {
  currentDate: string;
  currentToDoTasks: ToDoTask[];
};

const SaveToDoList = ({
  currentDate,
  currentToDoTasks
}: SaveToDoListArgs) => async () => {
  const tasksWithDate = currentToDoTasks.map(task => ({
    ...task,
    date: currentDate
  }));

  await ToDoTodayDB.saveList(tasksWithDate);
};

export default SaveToDoList;
